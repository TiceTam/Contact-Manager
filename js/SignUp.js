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
        // response should be a JSON
        .then(function(response){
            console.log("Got a response");
            return response.json()
        })
        // takes json
        .then((data) => {
            // puts it back into a json
            let info = JSON.parse(data)
            signUp(info)
            // window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
        })
        // .catch((data) => {
        //     signUpError.innerHTML = "Username Already Exists";
        // });

});

function signUp(data){
    if(data.error == "" || data.error == null){
        // sessionStorage.setItem("userID", data.id);
        // Registration should just be rerouted to login to get id
        window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
    }
    else{
        signUpError.innerHTML = "Username Already Exists";
    }
}
