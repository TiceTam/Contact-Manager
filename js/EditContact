document.addEventListener("DOMContentLoaded", function () {
    let editConButton = document.getElementById("editConButton"); //need to make an edit button

    // function to populate the form with contact data for editing
    function populateFormForEdit(contactData) {
        document.getElementById("typeFName").value = contactData.firstName;
        document.getElementById("typeLName").value = contactData.lastName;
        document.getElementById("typeEmail").value = contactData.email;
    }

    // event listener for the "Edit" button
    editConButton.addEventListener('click', () => {
        // assumes that we have a way to get id of contact we edit
        let contactIdToEdit = ###; // Replace with the actual contact ID

        // Fetch the contact data by its ID
        fetch(`API/GetContactById.php?id=${contactIdToEdit}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // we then populate the form fields with contact data for editing
                    populateFormForEdit(data.contact);
                } else {
                    alert("Error fetching contact data.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    });

    // event listener for "Save Changes" button (we need to implement/create)
    let saveChangesButton = document.getElementById("saveChangesButton"); // Replace with actual button ID when we create

    saveChangesButton.addEventListener('click', () => {
        let firstNameInput = document.getElementById("typeFName").value;
        let lastNameInput = document.getElementById("typeLName").value;
        let emailInput = document.getElementById("typeEmail").value;

        let editedUser = {
            "firstName": firstNameInput,
            "lastName": lastNameInput,
            "email": emailInput
        }

        // assumes we have the contact ID available
        let contactIdToEdit = ###; // Replace with the actual contact ID

        // Send an API request to update the contact
        fetch(`API/UpdateContact.php?id=${contactIdToEdit}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(editedUser)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Contact updated successfully!");
                } else {
                    alert("Error updating contact.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred.");
            });
    });
});
