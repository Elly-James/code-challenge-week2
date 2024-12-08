// Initialize an array to store items
const arrayToStoreItems = [];

// Function to add functionality to purchase and delete buttons
function addButtonFunctionality(purchasedBtn, deleteBtn, itemElement) {
    // Add functionality to the purchased button
    purchasedBtn.addEventListener("click", () => handlePurchasedClick(purchasedBtn, itemElement));

    // Add functionality to the delete button
    deleteBtn.addEventListener("click", () => handleDeleteClick(deleteBtn, itemElement));
}

// Handle form submission to add a new item
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    const newItemInput = document.querySelector("#new-item");
    const newItemValue = newItemInput.value.trim(); // Get and trim the input value

    if (newItemValue) {
        // Add the new item to the array
        arrayToStoreItems.push(newItemValue);

        // Display the new item on the page
        const itemContainer = document.querySelector("#item-container");
        const newItemElement = document.createElement("p");

        // Add buttons for the new item
        newItemElement.innerHTML = `
            ${newItemValue}
            <button class="purchased_btn"></button>
            <button class="delete_btn"></button>
        `;
        itemContainer.appendChild(newItemElement);

        // Attach button event listeners
        const purchasedBtn = newItemElement.querySelector(".purchased_btn");
        const deleteBtn = newItemElement.querySelector(".delete_btn");

        addButtonFunctionality(purchasedBtn, deleteBtn, newItemElement);

        // Clear the input field
        newItemInput.value = "";
    } else {
        alert("Please enter an item before submitting.");
    }
});

// Function to handle the purchased button click
function handlePurchasedClick(button, itemElement) {
    button.style.color = "white"; // Set text color to white
    button.style.backgroundColor = "green"; // Set button background to green
    button.textContent = "\u2713"; // Use Unicode for checkmark ✓ (U+2713)
    itemElement.style.textDecoration = "line-through"; // Strike through the item text
    itemElement.style.color = "grey"; // Optional: Change text color to grey
}

// Function to handle the delete button click
function handleDeleteClick(button, itemElement) {
    if (!button.dataset.clicked) {
        // First click: mark the button with an 'X'
        button.textContent = "X"; // Add an 'X' to the button
        button.style.color = "white"; // Change text color to white
        button.dataset.clicked = "true"; // Mark the button as clicked
    } else {
        // Second click: delete the entire item
        itemElement.remove();
    }
}

// Initialize functionality for existing items in the DOM
document.querySelectorAll("#item-container p").forEach((itemElement) => {
    const purchasedBtn = itemElement.querySelector(".purchased_btn");
    const deleteBtn = itemElement.querySelector(".delete_btn");

    if (purchasedBtn && deleteBtn) {
        addButtonFunctionality(purchasedBtn, deleteBtn, itemElement);
    }
});

// Create an alert when "The List is Now Okay" button is clicked
document.querySelector("#alert").addEventListener("click", () => {
    alert("My list is now okay and updated");
});

// Print the shopping list when "Print My List" button is clicked
document.querySelector("#print").addEventListener("click", () => {
    console.log("Shopping List:", arrayToStoreItems.join(", "));
    alert("Printing.....Check the console for the shopping list.");
});
