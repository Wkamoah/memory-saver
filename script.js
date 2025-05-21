document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById("imageUpload");
    const noteInput = document.getElementById("noteInput").value;
    const dateInput = document.getElementById("dateInput").value; 
    const file = fileInput.files[0];
    
    if (!file || !noteInput) return alert("Please add both image, describe what happned and add date!");
    
    // Convert image to Base64 for localStorage
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Save to localStorage
        const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
        savedItems.push({ image: imageData, note: noteInput, date: dateInput });
        localStorage.setItem("savedItems", JSON.stringify(savedItems));
        
        // Display saved items
        displaySavedItems();
        
        // Reset form
        fileInput.value = "";
        document.getElementById("noteInput").value = "";
        document.getElementById("dateInput").value = ""; // Reset date input
    };
    reader.readAsDataURL(file);
});

function displaySavedItems() {
    const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    const container = document.getElementById("savedItems");
    container.innerHTML = "";
    
    savedItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "saved-item";
        div.innerHTML = `
            <img src="${item.image}" alt="Saved Image">
            <p><strong>Date:</strong> ${item.date}</p>
            <p>${item.note}</p>
            <button class="delete-memory" data-index="${index}">Delete</button>
        `;
        container.appendChild(div);
    });

    // Add event listeners for delete buttons
    container.querySelectorAll('.delete-memory').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            const items = JSON.parse(localStorage.getItem("savedItems")) || [];
            items.splice(idx, 1);
            localStorage.setItem("savedItems", JSON.stringify(items));
            displaySavedItems();
        });
    });
}

// Load saved items on page load
displaySavedItems();



// Back to Top Button Logic
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.textContent = '↑';
    document.body.appendChild(backToTopButton);

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to the top when the button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});