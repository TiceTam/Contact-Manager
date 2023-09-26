<?php
    $input = json_decode(file_get_contents('php://input'), true);
    $conn = new mysqli("localhost", "nstuh", "COP4331Contact", "COP4331");

    if($conn->$connect_error){
        returnWithError($conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID = ?");
    $stmt->bind_param("s", $input["userID"]);
    $stmt->execute();

    $result = $stmt->get_result();

    $contacts = "";
    $count = 0

    while($row = $result->fetch_assoc()){
            
        if( $count > 0 )
		{
			$contacts .= ",";
		}
        $count++;

        $contacts .= '{"name": "' .$row["Name"].'", "phone" : "' . $row["Phone"]. '", "email" : "' . $row["Email"]. '", "userID" : "' . $row["UserID"].'", "ID" : "' . $row["ID"]. '"}';
    }

    returnWithInfo($contacts);

    $conn->close();
    $stmt->close();

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
?>