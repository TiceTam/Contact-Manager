<?php 
    
    $input = json_decode(file_get_contents('php://input'), true);
	$userID = $input['userID'];
	$firstname = $input['firstname'];
	$lastname = $input['lastname'];
	$email = $input['email'];
	$phone = $input['phone'];

    $conn = new mysqli("localhost", "nstuh", "COP4331Contact", "COP4331");

    if($conn->$connect_error){
        returnWithError($conn->connect_error);
    }
	else{
		$stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, EmailAddress, PhoneNumber, UserID) SET ('?','?','?','?','?')");
		$stmt->bind_param("sssss", $firstname, $lastname, $email, $phone, $userID);
		$stmt->execute();

		$err = "Successful";
		returnWithInfo($err);

		$stmt->close();
		$conn->close();
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
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}


    //compile data into json format and return info to the front end
    function returnWithInfo($id )
	{
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>