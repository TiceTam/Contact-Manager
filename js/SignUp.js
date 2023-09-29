let signUpButton = document.getElementById("signupButton");
let signUpError = document.getElementById("signUpError");

// let currentUser = {}

signupButton.addEventListener('click',()=>{
    let firstName = document.getElementById("typeFName").value;
    let lastName = document.getElementById("typeLName").value;
    let username = document.getElementById("typeUsername").value;
    let password = document.getElementById("typePassword").value;

    let currentUser = {
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "password": password
     }

    fetch("API/Registration.php",{
        "method": "POST",
        "headers": {
            "Content-Type" : "application/json; charset=utf-8"
        },

        "body" : JSON.stringify(currentUser)

        })
        .then(function(response){
          console.log("it worked?");
        return response.text();
        
        })
        .then(function(data){
            console.log(data);
            if (data != null) {
                let info = JSON.parse(data);
                signUp(info);
            }
            else {
                console.log("Null data returned")
            }
        });
        // .catch((error){
            
        //     console.log(data.error)
        // });

});

function signUp(data){
    
    if(data.error == ""){
        sessionStorage.setItem("userID", data.id);
        window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
    }
    else{
        signUpError.innerHTML = "Username Already Exists";
    }
}
