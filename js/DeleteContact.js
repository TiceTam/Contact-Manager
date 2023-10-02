document.addEventListener("DOMContentLoaded", function () {
    let deleteConButton = document.getElementById("deleteConButton"); // need to create a delete button

    // event listener for the "Delete" button
    deleteConButton.addEventListener('click', () => {
        // need a way to get id based on what contact we are on so that it can delete it
        let contactIdToDelete = ###; // replace with the actual contact ID

        // Send an API request to delete the contact
        fetch(`API/DeleteContact.php?id=${contactIdToDelete}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Contact deleted successfully!");
                    // we then need to remove the contact from the user interface, but dont know how we are implmenting the contact list(NEED TO DO LATER)
                } else {
                    alert("Error deleting contact.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred.");
            });
    });
});
