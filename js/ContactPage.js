

let contactIDs = [];

//initial loading of contacts.
loadContacts();

let mysearch = document.getElementById("mysearch");


mysearch.addEventListener('keypress',function(event){
    if (event.key == "Enter"){
        searchContacts();
    }
});

function addContact(){
    let firstname = document.getElementById("typeFirstName").value;
    let lastname = document.getElementById("typeLastName").value;
    let email = document.getElementById("typeEmail").value;
    let phone = document.getElementById("typePhone").value;
    let userID = sessionStorage.getItem("userID");

    let contact = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phone": phone,
        "userID": userID
    }
    
    fetch("API/AddContact.php",{
        "method": "POST",
        "headers": {
            "Content-Type" : "application/json; charset=utf-8"
        },

        "body" : JSON.stringify(contact)

    }).then(function(response){
        console.log(response);
        return response.text();
            
    }).then(function(data){
        loadContacts();
    });

}
//TODO: Edit contact functionality will go here. The Edit button is already setup to trigger this function.
function editContact(){
    let rownum = document.getElementById("editButton").parentNode.parentNode.rowIndex;
    let contactID = contactIDs[rownum];

    table = document.getElementById("contactTable");

    let row = document.getElementById("editButton").parentNode.parentNode;

    let firstname = row.childNodes[1];
    let lastname = row.childNodes[2];
    let email = row.childNodes[3];
    let phone = row.childNodes[4];
    let buttons = row.childNodes[5];

    let firstnameVal = firstname.innerText;
    let lastnameVal = lastname.innerText;
    let emailVal = email.innerText;
    let phoneVal = phone.innerText;
    let buttonVal = buttons.innerHTML;
    
    newRow = table.insertRow(rownum);
    
    let c1 = newRow.insertCell(1);
    let c2 = newRow.insertCell(2);
    let c3 = newRow.insertCell(3);
    let c4 = newRow.insertCell(4);
    let c5 = newRow.insertCell(5);
   
    
    c1.innerHTML = "<input type='text' value='" + firstnameVal + "' id='typeFNameEdit'>";
    c2.innerHTML = "<input type='text' value='" + lastnameVal + "' id='typeLNameEdit'>";
    c3.innerHTML = "<input type='text' value='" + emailVal + "' id='typeEmailEdit'>";
    c4.innerHTML = "<input type='text' value='" + phoneVal + "' id='typePhoneEdit'>";
    c5.innerHTML = "<button id ='confirmEdit'>Confirm</button><button id = 'cancelEdit'>Cancel</button>";

    let confirmEdit = document.getElementById("confirmEdit");
    let cancelEdit = document.getElementById("cancelEdit");

    confirmEdit.addEventListener('click', ()=>{
        let firstnameInput = document.getElementById("typeFNameEdit").value;
        let lastnameInput = document.getElementById("typeLNameEdit").value;
        let emailInput = document.getElementById("typeEmailEdit").value;
        let phoneInput = document.getElementById("typePhoneEdit").value;
        
        let contact = {
            "contactID": contactID,
            "firstname": firstnameInput,
            "lastname": lastnameInput,
            "email": emailInput,
            "phone": phoneInput
        }

        fetch("API/UpdateContact.php",{
            "method": "POST",
            "headers": {
                "Content-Type" : "application/json; charset=utf-8"
            },
    
            "body" : JSON.stringify(contact)
    
        }).then(function(response){
            return response.text();
                
        }).then(function(data){
            loadContacts();
        });
    });

    cancelEdit.addEventListener('click', ()=>{
        firstname.innerText = firstnameVal;
        lastname.innerText = lastnameVal;
        email.innerText = emailVal;
        phone.innerText = phoneVal;
        buttons.innerHTML = buttonVal;
    });


}



function deleteContact(){
    let rownum = document.getElementById("deleteButton").parentNode.parentNode.rowIndex;
    let contactID = contactIDs[rownum];

    let contact = {
        "contactID": contactID
    }

   
        fetch("API/DeleteContact.php",{
            "method": "POST",
            "headers": {
                "Content-Type" : "application/json; charset=utf-8"
            },
    
            "body" : JSON.stringify(contact)
    
        }).then(function(response){
            return response.text();
                
        }).then(function(data){
            loadContacts();
        });

    
}

function searchContacts(){
    let userID = sessionStorage.getItem("userID");
    let name = document.getElementById("mysearch").value;

    let search = {
        "userID": userID,
        "name": name
    }

    fetch("API/SearchContacts.php",{
        "method": "POST",
        "headers": {
            "Content-Type" : "application/json; charset=utf-8"
        },

        "body" : JSON.stringify(search)

    }).then(function(response){
        return response.text();
            
    }).then(function(data){
        console.log(data);
        let info = JSON.parse(data);
        load(info);
    });

}






function loadContacts(){

    let userID = sessionStorage.getItem("userID");

    let currentUser = {
        "userID": userID
    }

    fetch("API/LoadContacts.php",{
        "method": "POST",
        "headers": {
            "Content-Type" : "application/json; charset=utf-8"
        },

        "body" : JSON.stringify(currentUser)

    }).then(function(response){
        return response.text();
            
    }).then(function(data){
        console.log(data);
        let info = JSON.parse(data);
        load(info);
    });
}





function load(info){
    contacts = info.results
    table = document.getElementById("contactTable");
    table
    for(var i = 1;i<table.rows.length;){
        table.deleteRow(i);
    }

    for(i = 1; i <= contacts.length; i++){
        contactIDs[i-1] = contacts[i-1].ID;

        let row = table.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        let c5 = row.insertCell(4);
        let c6 = row.insertCell(5);

        c1.innerText = i;
        c2.innerText = contacts[i-1].firstname
        c3.innerText = contacts[i-1].lastname
        c4.innerText = contacts[i-1].email
        c5.innerText = contacts[i-1].phone
        c6.innerHTML = "<button id ='editButton' onClick='editContact()'>Edit</button><button id = 'deleteButton' onClick= 'deleteContact()'>Delete</button>";
    }

}