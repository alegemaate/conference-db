<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../config/dbclass.php';
	include_once '../entities/attendee.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$attendee = new Attendee($connection);

	// set response code - 200 OK
	http_response_code(200);

	$stmt = $attendee->read();
	$count = $stmt->rowCount();

	if($count > 0){
    $attendees = array(
    	"body" => [],
    	"count" => $count
    );


    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);

      // Create attendee entry
      $s  = array(
        "att_id" => $att_id,
        "room_id" => $room_id,
        "name" => $name,
        "email" => $email,
        "type_name" => $type_name,
        "fee" => $fee
      );
      array_push($attendees["body"], $s);
    }

    echo json_encode($attendees);
	}
	else {
    echo json_encode(
      array("body" => array(), "count" => 0)
    );
	}
?>
