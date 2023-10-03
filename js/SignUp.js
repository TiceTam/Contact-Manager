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
            console.log("Got a response");
            console.log("response text is" + response.text())
            let data = JSON.parse(response)
            return data;
        })
        // no data should pass to frontend on registration?
        .then((data) => {
            // puts it back into a json
            signUp(data)
            // window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
        })
        .catch((data) => {
            signUpError.innerHTML = "Username Already Exists";
        });

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
