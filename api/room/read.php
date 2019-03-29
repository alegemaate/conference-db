<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../config/dbclass.php';
	include_once '../entities/room.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$room = new Room($connection);

	// set response code - 200 OK
	http_response_code(200);

	$stmt = $room->read();
	$count = $stmt->rowCount();

	if($count > 0){
    $rooms = array(
    	"body" => [],
    	"count" => $count
    );

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);

      // Create room entry
      if (!isset($rooms["body"][$room_id])) {
      	$rooms["body"][$room_id] = array(
      		"room_id" => $room_id,
          "room_number" => $room_number,
	      	"building" => $building,
	      	"capacity" => $capacity,
	      	"occupants" => []
	      );
      }

      // Create member entry
      if (isset($name)) {
        $p  = array(
          "name" => $name
        );
        array_push($rooms["body"][$room_id]["occupants"], $p);
      }
    }

    echo json_encode($rooms);
	}
	else {
    echo json_encode(
      array("body" => array(), "count" => 0)
    );
	}
?>
