from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database setup
DATABASE = 'rewear.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Create the users table on startup
create_table()

# API routes
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, last_name, email, password]):
        return jsonify({"message": "All fields are required"}), 400

    conn = get_db_connection()
    try:
        # Check if user already exists
        cursor = conn.cursor()
        cursor.execute("SELECT email FROM users WHERE email = ?", (email,))
        if cursor.fetchone():
            return jsonify({"message": "User already exists"}), 409

        # Hash the password and store the new user
        password_hash = generate_password_hash(password)
        cursor.execute("INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
                       (first_name, last_name, email, password_hash))
        conn.commit()
        return jsonify({"message": "User created successfully"}), 201

    except sqlite3.IntegrityError:
        return jsonify({"message": "User with this email already exists"}), 409
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"message": "Email and password are required"}), 400

    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT password_hash FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

        if user and check_password_hash(user['password_hash'], password):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401

    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)