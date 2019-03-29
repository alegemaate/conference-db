<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../config/dbclass.php';
	include_once '../entities/attendee_type.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$type = new AttendeeType($connection);

	// set response code - 200 OK
	http_response_code(200);

	$stmt = $type->read();
	$count = $stmt->rowCount();

	if($count > 0){
    $types = array(
    	"body" => [],
    	"count" => $count
    );

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);

      // Create type entry
      $s  = array(
        "att_type_id" => $att_type_id,
        "type_name" => $type_name,
        "fee" => $fee
      );
      array_push($types["body"], $s);
    }

    echo json_encode($types);
	}
	else {
    echo json_encode(
      array("body" => array(), "count" => 0)
    );
	}
?>
