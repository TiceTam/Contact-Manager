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
        if (data != null && data != "") {
            console.log(data);
            let info = JSON.parse(data);
        }
        // no data should pass to frontend on registration
        else {
            console.log("Null data returned")
            signUp();
        }
        });
        // .catch((error){
            
        //     console.log(data.error)
        // });

});

function signUp(){
    
    if(data.error == ""){
        // sessionStorage.setItem("userID", data.id);
        // Registration should just be rerouted to login to get id
        window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
    }
    else{
        signUpError.innerHTML = "Username Already Exists";
    }
}
