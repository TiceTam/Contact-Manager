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
            console.log("Got a response");
            text = response.json()
            return text
        })
        // // takes string, should convert to object
        // .then((text) => {
        //     console.log(text)
        //     if (text != null && text != "") {
        //         let info = JSON.parse(text)
        //         return info
        //     }
        //     else {
        //         console.log("The responses string is null")
        //     }
            // window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
        // })
        // gets the object
        .then((info) => {
            console.log("Passing JSON to signup")
            signUp(info)
        });

});
// needs a Javascript object
function signUp(info){
    let data = JSON.parse(info)
    if(data.error == "" || data.error == null){
        // sessionStorage.setItem("userID", data.id);
        // Registration should just be rerouted to login to get id
        window.location.href = "http://cop4331groupfifteen.xyz/login_page.html";
    }
    else{
        signUpError.innerHTML = "Username Already Exists";
    }
}
