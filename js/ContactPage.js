
let contactIDs = [];

//initial loading of contacts.
loadContacts();

let mysearch = document.getElementById("mysearch");
let deleteButton = document.getElementById("deleteButton");


deleteButton.addEventListener('click', ()=>{
    let rownum = deleteButton.parentNode.parentNode.rowIndex;
    console.log(rownum);
    let contactID = contactIDs[rownum];

    deleteContact(contactID);
});

mysearch.addEventListener('keypress',function(event){
    if (event.key == "Enter"){
        searchContacts();
    }
});


function deleteContact(contactID){
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
        console.log(data);
        let info = JSON.parse(data);
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
        c6.innerHTML = "<button id ='editButton'>Edit</button><button id = 'deleteButton'>Delete</button>";
    }

}