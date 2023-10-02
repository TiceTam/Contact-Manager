<?php
    $input = json_decode(file_get_contents('php://input'),true);
    $userID = $input['userID'];
    $name = $input['contactID'];

    $conn = new mysqli("localhost", "nstuh", "COP4331Contact", "COP4331");

    if($conn->connect_error){
        returnWithError($conn->connect_error);
    }
    else{
        $stmt = $conn->prepare("SELECT * FROM Contacts WHERE (UserID = ?) AND (FirstName LIKE '%?%' OR LastName LIKE '%?%')");
        $stmt->bind_param("sss", $userID, $name, $name);
        $stmt->execute();

        $result = $stmt->get_result();

        $contacts = "";
        $count = 0;

        while($row = $result->fetch_assoc()){
                
            if( $count > 0 )
            {
                $contacts .= ",";
            }
            $count++;

            $contacts .= '{"firstname": "' .$row["FirstName"].'", "lastname": "'.$row["LastName"].'", "phone" : "' . $row["PhoneNumber"]. '", "email" : "' . $row["EmailAddress"]. '", "userID" : "' . $row["UserID"].'", "ID" : "' . $row["ID"]. '"}';
        }   
        returnWithInfo($contacts);

        $conn->close();
        $stmt->close();
    }


    function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

    function returnWithError( $err )
	{
		$retValue = '{"results":[],"error":"'.$err.'"}';
		sendResultInfoAsJson( $retValue );
	}




?>