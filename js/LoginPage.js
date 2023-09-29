
let loginButton = document.getElementById("loginButton");
let loginError = document.getElementById("loginError");


loginButton.addEventListener('click',()=>{
    let username = document.getElementById("typeUsername").value;
    let password = document.getElementById("typePassword").value;

    let currentUser = {
        "username": username,
        "password": password
    }

    if(username == "" || password == ""){
        loginError.innerHTML = "Missing Fields";
    }
    else
    {

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
            login(info);
            });
    }

});

function login(data){
    
    if(data.error == ""){
        sessionStorage.setItem("userID", data.id);
        window.location.href = "http://cop4331groupfifteen.xyz/contact_page.html";
    }
    else{
        loginError.innerHTML = "Username or Password Incorrect";
    }
}
