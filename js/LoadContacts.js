document.addEventListener("DOMContentLoaded", function () {
    
    let userId = ###; // replace with the actual user ID

    const contactsContainer = document.getElementById("contactsContainer"); // replace with actual container ID.

    function loadContactsForUser(userId) {
        // send an API request to fetch contacts for specific user
        fetch(`API/LoadContacts.php?userID=${userId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.results.length > 0) {
                    contactsContainer.innerHTML = '';

                    // iterate through the contacts and display them in the container
                    data.results.forEach((contact) => {
                        displayContact(contact);
                    });
                } else {
                    // no contacts found
                    contactsContainer.innerHTML = '<p>No contacts found.</p>';
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                // errors during request
                contactsContainer.innerHTML = '<p>Error occurred while loading contacts.</p>';
            });
    }

    // display a contact in the container
    function displayContact(contact) {
        // creates new HTML element for the contact (div, list, table, etc)
        const contactElement = document.createElement("div");
        contactElement.classList.add("contact");
        contactElement.innerHTML = `
            <p>Name: ${contact.firstname} ${contact.lastname}</p>
            <p>Email: ${contact.email}</p>
        `;
        // can add more to this div also need to change this to look like our table, this is quick thing to print out/test

        // append the contact element to the container
        contactsContainer.appendChild(contactElement);
    }

    // load contacts for the current user when the page loads
    loadContactsForUser(userId);
});
