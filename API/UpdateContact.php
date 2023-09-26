<?php
    $input = json_decode(file_get_contents("php://input", true));
    $conn = new mysqli("localhost", "nstuh", "COP4331Contact", "COP4331");

    if($conn->$connect_error){
        returnWithError($conn->connect_error);
    }

    $stmt = $conn->prepare("UPDATE Contacts SET (FirstName = ?, LastName = ?, PhoneNumber = ?, EmailAddress = ? WHERE ID = ?");
    $stmt->bind_param("sssss", $input["firstname"], $input["lastname"], $input["phone"], $input["email"], $input["contactID"]);
    $stmt->execute();

    returnWithInfo($input["contactID"]);
    
    $stmt->close();
    $conn->close();
    

    function returnWithInfo( $id )
	{
		$retValue = '{"id":"' . $id . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
    
?>