// Dashboard specific functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard()
})

function initializeDashboard() {
  // Set default active tab
  showTab("items")
}

function showTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content")
  tabContents.forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((button) => {
    button.classList.remove("active")
  })

  // Show selected tab content
  const selectedTab = document.getElementById(`${tabName}-tab`)
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  // Add active class to selected tab button
  const selectedButton = document.querySelector(`[onclick="showTab('${tabName}')"]`)
  if (selectedButton) {
    selectedButton.classList.add("active")
  }
}

// Handle user menu dropdown (if implemented)
function toggleUserMenu() {
  const userMenu = document.querySelector(".user-menu")
  // Implementation for user dropdown menu
}

