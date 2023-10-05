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
        // response should be a promise JSON
        .then(function(response){
            // console.log("Got a response");
            // text = response.json()
            // return text
            return response.text()
        })
        .then((data) =>{
            console.log(data)
            let info = JSON.parse(data)
            signUp(info);
        })
        .catch((error){
            signUpError.innterHTML = "Username Already Exists";
        });
});
// needs a Javascript object
function signUp(info){
    if(info.error == ""){
        // sessionStorage.setItem("userID", data.id);
        // Registration should just be rerouted to login to get id
        window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
    }
    else{
        signUpError.innerHTML = "Username Already Exists";
    }
}
