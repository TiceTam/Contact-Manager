document.addEventListener("DOMContentLoaded", function () {

  let addConButton = document.getElementById("addConButton");
  addConButton.addEventListener('click',()=>{

    let firstName = document.getElementById("typeFName").value;
    let lastName = document.getElementById("typeLName").value;
    let email = document.getElementById("typeEmail").value;

    let newUser = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
     }
    fetch("API/ADDContact.php", {
        method: "POST",
        "headers": {
        "Content-Type" : "application/json; charset=utf-8"
        },
        "body" : JSON.stringify(newUser)
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert("Contact added successfully!");
        } else {
            alert("Error adding contact. Please try again.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
  }); 
});
