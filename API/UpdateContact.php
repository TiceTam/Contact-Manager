<?php
    $input = json_decode(file_get_contents('php://input', true));
    $firstname = $input['firstname'];
    $lastname = $input['lastname'];
    $email = $input['email'];
    $phone = $input['phone'];
    $contactID = $input['contactID'];

    
    $conn = new mysqli("localhost", "nstuh", "COP4331Contact", "COP4331");

    if($conn->$connect_error){
        returnWithError($conn->connect_error);
    }else{

        $stmt = $conn->prepare("UPDATE Contacts SET FirstName = '?', LastName = '?', EmailAddress = '?', PhoneNumber = '?' WHERE ID = '?'");
        $stmt->bind_param("sssss", $firstname, $lastname, $email, $phone, $contactID);
        $stmt->execute();

        returnWithInfo($firstname, $lastname, $email, $phone, $contactID);
        
        $conn->close();
        $stmt->close();
        
    }

     //Sends json string to front end.
     function sendResultInfoAsJson( $obj )
     {
         header('Content-type: application/json');
         echo $obj;
     }
     
     //returns an error to the front end
     function returnWithError( $err )
     {
         $retValue = '{"id":0, "firstname": "", "lastname":"", "email":"", "phone":"", "contactID":"", "error":"' . $err . '"}';
         sendResultInfoAsJson( $retValue );
     }
     
     function returnWithInfo($firstname, $lastname, $email, $phone, $contactID){
        $retValue = '{"id":"'.$contactID.'", "firstname": "'.$firstname.'", "lastname":"'.$lastname.'", "email":"'.$email.'", "phone":"'.$phone.'", "contactID":"'.$contactID.'", "error":""}';
        sendResultInfoAsJson($retValue);
     }
    
?>