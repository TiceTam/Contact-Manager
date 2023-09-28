let signUpButton = document.getElementById("signupButton");
let signUpError = document.getElementById("signUpError");

let currentUser = {}

signupButton.addEventListener('click',()=>{
    currentUser.username = document.getElementById("typeEmail").value;
    currentUser.password = document.getElementById("typePassword").value;

    // let currentUser = {
    //     "username": username,
    //     "password": password
    // }

    fetch("API/Login.php",{
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
          let info = JSON.parse(data);
          signUp(info);
        });
        // .catch((error){
            
        //     console.log(data.error)
        // });

});

function signUp(data){
    
    if(data.error == ""){
        sessionStorage.setItem("userID", data.id);
        window.location.href = "http://cop4331groupfifteen.xyz/contact_page.html";
    }
    else{
        signUpError.innerHTML = "Username or Password Incorrect";
    }
}
