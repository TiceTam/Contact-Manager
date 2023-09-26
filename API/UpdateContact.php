<?php
    $input = json_decode(file_get_contents('php://input', true));
    $firstname = $input['firstname'];
    $lastname = $input['lastname'];
    $email = $input['email'];
    $phoneNumber = $input['phone'];
    $contactID = $input['contactID'];
    
    $conn = new mysqli("localhost", "nstuh", "COP4331Contact", "COP4331");

    if($conn->$connect_error){
        returnWithError($conn->connect_error);
    }else{
        $sqlUpdate = "UPDATE Contacts SET FirstName = '$firstname' , LastName = '$lastname', EmailAddress = '$email', PhoneNumber = '$phoneNumber' WHERE ID = '$contactID'";
	

        if(($sqlQuery = $conn->query($sqlUpdate)) === TRUE)
        {
            $returnString = '{"firstname":"' . $firstname . '", "lastname": "'.$lastname.'","phone":"' . $phoneNumber . '","email":"' . $email . '"}';
            echo $returnString;
        }
        else 
        {
            echo "Error: Did not update";
        }

	$conn -> close();

    }
    
?>