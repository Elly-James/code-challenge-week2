// Initializing an array to store items

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
    event.preventDefault();                                               // Prevent page reload on form submission when we click submit button
    const newItemInput = document.querySelector("#new-item");
    const newItemValue = newItemInput.value.trim();                       // Get and trim the input value

    if (newItemValue) {
        // Add the new item to the array

        arrayToStoreItems.push(newItemValue);

        // Display the new item on the page

        const itemContainer = document.querySelector("#item-container");
        const newItemElement = document.createElement("p");               // Creates a paragraph to display the value added

        // Add buttons for the new item                                  //Remember innerHTML will add an element in the DOM without displaying the tags
        newItemElement.innerHTML = `
            ${newItemValue}
            <button class="purchased_btn"></button>
            <button class="delete_btn"></button>
        `;


        itemContainer.appendChild(newItemElement);                   //This will add the created p tags above together with the buttons to the parent element

        // Attach button event listeners

        const purchasedBtn = newItemElement.querySelector(".purchased_btn");
        const deleteBtn = newItemElement.querySelector(".delete_btn");

        addButtonFunctionality(purchasedBtn, deleteBtn, newItemElement);

        // It clears the text input field by setting its value to an empty string
        //By clearing the input field, it ensures a better user experience by resetting
        // the field so the user doesn't have to manually delete the text before typing the next item.


        newItemInput.value = "";
    } else {                                                        //The user gets this when they try to submit without entering a value
        alert("Please enter an item before submitting.");
    }
});




// Function to handle the purchased button click

function handlePurchasedClick(button, itemElement) {
    button.style.color = "white";                                         // Set text color to white
    button.style.backgroundColor = "green";                                // Set button background to green
    button.textContent = "\u2713";                                          // Use Unicode for checkmark ✓ (U+2713)
    itemElement.style.textDecoration = "line-through";                        // Strike through the item text
    itemElement.style.color = "grey";                                       // Optional: Change text color to grey
}

// Function to handle the delete button click

function handleDeleteClick(button, itemElement) {
    if (!button.dataset.clicked) {                              //  this checks if the button has been clicked before.
                                                                // if the button does not have a data-clicked value or it is undefined.


        // First click: mark the button with an 'X'

        button.textContent = "X";                                              // Add an 'X' to the button
        button.style.color = "white";                                           // Change text color to white
        button.dataset.clicked = "true";                                        // Mark the button as clicked
    } else {

        // Second click: delete the entire item together with the buttons
        itemElement.remove();
    }
}

// Initializing functionality for existing items in the DOM


document.querySelectorAll("#item-container p").forEach((itemElement) => {
    const purchasedBtn = itemElement.querySelector(".purchased_btn");               //Here we first get the items initially found in the list to add events
    const deleteBtn = itemElement.querySelector(".delete_btn");


    /* f a user clicks the buttons of the items in the list it either will
     purchase or delete according to the button clicked

     *Therefore we pass in the function addButtonFunctionally to do the work as a callback
    */

    if (purchasedBtn && deleteBtn) {
        addButtonFunctionality(purchasedBtn, deleteBtn, itemElement);             
    }
});



// Create an alert when "The List is Now Okay" button is clicked
//When a user clicks the button they get an alert message

document.querySelector("#alert").addEventListener("click", () => {
    alert("My list is now okay and updated");
});

// Print the shopping list when "Print My List" button is clicked
//When a user clicks the button they get an alert message



document.querySelector("#print").addEventListener("click", () => {
    console.log("Shopping List:", arrayToStoreItems.join(", "));                        // Joins all elements of the arrayToStoreItems array into a single string.
                                                                                        // Each element is separated by a comma and a space (, ) and the array is printed in the console of the browser.
   
    alert("Printing.....Check the console for the shopping list.");
});
