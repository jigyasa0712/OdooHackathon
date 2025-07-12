// Add item form functionality
let uploadedPhotos = []
let itemTags = []

document.addEventListener("DOMContentLoaded", () => {
  initializeAddItemForm()
})

function initializeAddItemForm() {
  const form = document.getElementById("addItemForm")
  const photoInput = document.getElementById("photoInput")
  const tagInput = document.getElementById("tagInput")

  if (form) {
    form.addEventListener("submit", handleFormSubmit)
  }

  if (photoInput) {
    photoInput.addEventListener("change", handlePhotoUpload)
  }

  if (tagInput) {
    tagInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addTag()
      }
    })
  }
}

function triggerFileUpload() {
  const photoInput = document.getElementById("photoInput")
  photoInput.click()
}

function handlePhotoUpload(e) {
  const files = Array.from(e.target.files)

  files.forEach((file) => {
    if (uploadedPhotos.length >= 8) {
      alert("Maximum 8 photos allowed")
      return
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadedPhotos.push({
          file: file,
          url: e.target.result,
          id: Date.now() + Math.random(),
        })
        updatePhotoGrid()
      }
      reader.readAsDataURL(file)
    }
  })

  // Clear the input
  e.target.value = ""
}

function updatePhotoGrid() {
  const grid = document.getElementById("photoGrid")

  grid.innerHTML = ""

  // Add existing photos
  uploadedPhotos.forEach((photo, index) => {
    const photoDiv = document.createElement("div")
    photoDiv.className = "photo-preview"
    photoDiv.innerHTML = `
            <img src="${photo.url}" alt="Upload ${index + 1}">
            <button type="button" class="photo-remove" onclick="removePhoto(${photo.id})">
                <i class="fas fa-times"></i>
            </button>
            ${index === 0 ? '<div class="photo-main-badge">Main</div>' : ""}
        `
    grid.appendChild(photoDiv)
  })

  // Add upload slot if less than 8 photos
  if (uploadedPhotos.length < 8) {
    const uploadSlot = document.createElement("div")
    uploadSlot.className = "photo-upload-slot"
    uploadSlot.onclick = triggerFileUpload
    uploadSlot.innerHTML = `
            <i class="fas fa-upload"></i>
            <span>Add Photo</span>
        `
    grid.appendChild(uploadSlot)
  }
}

function removePhoto(photoId) {
  uploadedPhotos = uploadedPhotos.filter((photo) => photo.id !== photoId)
  updatePhotoGrid()
}

function addTag() {
  const tagInput = document.getElementById("tagInput")
  const tagValue = tagInput.value.trim().toLowerCase()

  if (tagValue && !itemTags.includes(tagValue) && itemTags.length < 10) {
    itemTags.push(tagValue)
    updateTagsList()
    tagInput.value = ""
  } else if (itemTags.length >= 10) {
    alert("Maximum 10 tags allowed")
  } else if (itemTags.includes(tagValue)) {
    alert("Tag already exists")
  }
}

function removeTag(tagValue) {
  itemTags = itemTags.filter((tag) => tag !== tagValue)
  updateTagsList()
}

function updateTagsList() {
  const tagsList = document.getElementById("tagsList")

  tagsList.innerHTML = itemTags
    .map(
      (tag) => `
        <div class="tag">
            ${tag}
            <button type="button" class="tag-remove" onclick="removeTag('${tag}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `,
    )
    .join("")
}

function handleFormSubmit(e) {
  e.preventDefault()

  // Validate form
  if (uploadedPhotos.length === 0) {
    alert("Please add at least one photo")
    return
  }

  // Collect form data
  const formData = {
    title: document.getElementById("itemTitle").value,
    description: document.getElementById("itemDescription").value,
    category: document.getElementById("itemCategory").value,
    type: document.getElementById("itemType").value,
    size: document.getElementById("itemSize").value,
    condition: document.getElementById("itemCondition").value,
    points: document.getElementById("itemPoints").value,
    photos: uploadedPhotos,
    tags: itemTags,
  }

  console.log("Form submitted:", formData)

  // Simulate form submission
  alert("Item listed successfully! Redirecting to dashboard...")

  // In a real app, you would send this data to your backend
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

// Handle category change to update type options
document.addEventListener("change", (e) => {
  if (e.target.id === "itemCategory") {
    updateTypeOptions(e.target.value)
  }
})

function updateTypeOptions(category) {
  const typeSelect = document.getElementById("itemType")
  const typeOptions = {
    tops: ["t-shirt", "blouse", "shirt", "tank-top", "sweater"],
    bottoms: ["jeans", "pants", "shorts", "skirt", "leggings"],
    dresses: ["casual-dress", "formal-dress", "maxi-dress", "mini-dress"],
    outerwear: ["jacket", "coat", "blazer", "cardigan", "hoodie"],
    shoes: ["sneakers", "boots", "heels", "flats", "sandals"],
    accessories: ["bag", "jewelry", "scarf", "hat", "belt"],
  }

  typeSelect.innerHTML = '<option value="">Select type</option>'

  if (typeOptions[category]) {
    typeOptions[category].forEach((type) => {
      const option = document.createElement("option")
      option.value = type
      option.textContent = type
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      typeSelect.appendChild(option)
    })
  }
}
