// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Initialize featured items
  loadFeaturedItems()

  // Initialize form handlers
  initializeAuthForms()

  // Initialize smooth scrolling
  initializeSmoothScrolling()
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  mobileMenu.classList.toggle("active")
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }
}

function switchModal(currentModalId, targetModalId) {
  closeModal(currentModalId)
  setTimeout(() => openModal(targetModalId), 100)
}

// Password toggle
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.nextElementSibling
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.className = "fas fa-eye-slash"
  } else {
    input.type = "password"
    icon.className = "fas fa-eye"
  }
}

// Smooth scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

// Featured items data and loading
const featuredItemsData = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    brand: "Levi's",
    size: "M",
    condition: "Excellent",
    points: 150,
    image: "https://via.placeholder.com/300x400/4ade80/ffffff?text=Denim+Jacket",
    user: "Sarah M.",
    rating: 4.9,
    location: "New York",
  },
  {
    id: 2,
    title: "Designer Silk Blouse",
    brand: "Zara",
    size: "S",
    condition: "Like New",
    points: 200,
    image: "https://via.placeholder.com/300x400/06b6d4/ffffff?text=Silk+Blouse",
    user: "Emma K.",
    rating: 5.0,
    location: "Los Angeles",
  },
  {
    id: 3,
    title: "Wool Winter Coat",
    brand: "H&M",
    size: "L",
    condition: "Good",
    points: 180,
    image: "https://via.placeholder.com/300x400/8b5cf6/ffffff?text=Winter+Coat",
    user: "Mike R.",
    rating: 4.8,
    location: "Chicago",
  },
  {
    id: 4,
    title: "Summer Floral Dress",
    brand: "Forever 21",
    size: "M",
    condition: "Excellent",
    points: 120,
    image: "https://via.placeholder.com/300x400/f59e0b/ffffff?text=Floral+Dress",
    user: "Lisa T.",
    rating: 4.7,
    location: "Miami",
  },
]

function loadFeaturedItems() {
  const grid = document.getElementById("featuredItemsGrid")
  if (!grid) return

  grid.innerHTML = featuredItemsData
    .map(
      (item) => `
        <div class="item-card">
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
                <button class="item-favorite">
                    <i class="far fa-heart"></i>
                </button>
                <div class="item-condition">${item.condition}</div>
            </div>
            <div class="item-content">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-brand">${item.brand} • Size ${item.size}</p>
                
                <div class="item-details">
                    <div class="item-points">
                        <i class="fas fa-coins"></i>
                        <span>${item.points} pts</span>
                    </div>
                    <div class="item-rating">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                </div>
                
                <div class="item-user">
                    <div class="user-info">
                        <h4>${item.user}</h4>
                        <p>${item.location}</p>
                    </div>
                </div>
                
                <div class="item-actions">
                    <button class="btn btn-primary btn-small">Swap Request</button>
                    <button class="btn btn-outline btn-small">Redeem</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Auth form handlers
function initializeAuthForms() {
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup)
  }
}

function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  // Simulate login process
  console.log("Login attempt:", { email, password })

  // Show success message and redirect
  alert("Login successful! Redirecting to dashboard...")
  closeModal("loginModal")

  // In a real app, you would handle authentication here
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

function handleSignup(e) {
  e.preventDefault()
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (password !== confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  // Simulate signup process
  console.log("Signup attempt:", { firstName, lastName, email, password })

  // Show success message and redirect
  alert("Account created successfully! Welcome to ReWear!")
  closeModal("signupModal")

  // In a real app, you would handle registration here
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    const modalId = e.target.id
    closeModal(modalId)
  }
})

// Close modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal.active")
    if (activeModal) {
      closeModal(activeModal.id)
    }
  }
})

// Handle favorite button clicks
document.addEventListener("click", (e) => {
  if (e.target.closest(".item-favorite")) {
    const button = e.target.closest(".item-favorite")
    const icon = button.querySelector("i")

    if (icon.classList.contains("far")) {
      icon.classList.remove("far")
      icon.classList.add("fas")
      button.style.color = "#ef4444"
    } else {
      icon.classList.remove("fas")
      icon.classList.add("far")
      button.style.color = ""
    }
  }
})
