<?php

    $input = json_decode(file_get_contents('php://input'), true);
    $userID = $input['userID'];
    
    
    $conn = new mysqli("localhost", "nstuh", "COP4331Contact", "COP4331");

    if($conn->$connect_error){
        returnWithError($conn->connect_error);
    }
    
    else {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE userID= '$userID'");
        $stmt->execute();
        

        $stmt->close();
        $conn->close();
    }



?>