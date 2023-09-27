let loginButton = document.getElementById("loginButton");


loginButton.addEventListener('click',()=>{
    let username = document.getElementById("typeEmail").value;
    let password = document.getElementById("typePassword").value;

    let currentUser = {
        "username": username,
        "password": password
    }

    fetch("API/Login.php",{
        "method": "POST",
        "headers": {
            "Content-Type" : "application/json; charset=utf-8"
        },

        "body" : JSON.stringify(currentUser)

        })
        .then(function(response){
          console.log("it worked?");
        return response.json();
        
        })
        .then(function(data){
          console.log(data);
        });

});