// Contact page functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeContactPage()
})

function initializeContactPage() {
  const contactForm = document.getElementById("contactForm")
  const faqItems = document.querySelectorAll(".faq-item")

  // FAQ functionality
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })

  if (contactForm) {
    // Contact form functionality
    contactForm.addEventListener("submit", handleContactSubmit)

    // Form validation
    const inputs = contactForm.querySelectorAll("input, textarea, select")

    inputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearErrors)
    })

    function validateField(e) {
      const field = e.target
      const value = field.value.trim()

      // Remove existing error styling
      field.classList.remove("error")

      // Validate based on field type
      if (field.hasAttribute("required") && !value) {
        showFieldError(field, "This field is required")
        return false
      }

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          showFieldError(field, "Please enter a valid email address")
          return false
        }
      }

      return true
    }

    function showFieldError(field, message) {
      field.classList.add("error")

      // Remove existing error message
      const existingError = field.parentNode.querySelector(".error-message")
      if (existingError) {
        existingError.remove()
      }

      // Add new error message
      const errorDiv = document.createElement("div")
      errorDiv.className = "error-message"
      errorDiv.textContent = message
      errorDiv.style.color = "#d17b63"
      errorDiv.style.fontSize = "0.75rem"
      errorDiv.style.marginTop = "0.25rem"

      field.parentNode.appendChild(errorDiv)
    }

    function clearErrors(e) {
      const field = e.target
      field.classList.remove("error")

      const errorMessage = field.parentNode.querySelector(".error-message")
      if (errorMessage) {
        errorMessage.remove()
      }
    }
  }
}

function handleContactSubmit(e) {
  e.preventDefault()

  const contactForm = document.getElementById("contactForm")
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Thank you for your message! We'll get back to you within 24 hours.")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
}

// Handle social card clicks
document.addEventListener("click", (e) => {
  const socialCard = e.target.closest(".social-card")
  if (socialCard) {
    e.preventDefault()

    // Get the social platform
    const platform = socialCard.classList[1] // instagram, twitter, etc.

    // In a real app, these would be actual social media URLs
    const socialUrls = {
      instagram: "https://instagram.com/rewear_official",
      twitter: "https://twitter.com/rewear",
      facebook: "https://facebook.com/rewear",
      linkedin: "https://linkedin.com/company/rewear",
    }

    if (socialUrls[platform]) {
      window.open(socialUrls[platform], "_blank")
    }
  }
})
