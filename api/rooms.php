<?php
	header("Access-Control-Allow-Origin: *");

	include("db_connect.php");

	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);

	// Ensure we are requesting SOMETHING
	if (empty($_POST['hotel_room']) && empty($_POST['get_hotel_rooms'])) 
		die();

	if ($_POST) {
		// set response code - 200 OK
		http_response_code(200);

		$results = array();
		$stmt = null;

		if (!empty($_POST['get_hotel_rooms'])) {
			$stmt = $pdo->query('SELECT room_number, building, room_id FROM room WHERE capacity > 0');
		}
		else if(!empty($_POST['hotel_room'])) {
			$stmt = $pdo->query("
				SELECT * FROM
				(
				    (SELECT * FROM member WHERE room_id = 8) AS MEMS
				    JOIN
				    (SELECT * FROM room WHERE room_id = 8) AS ROOMS
				    WHERE MEMS.room_ud
				)
				WHERE 1
			");
		}

		// Send back results
		while ($row = $stmt->fetch()) {
		  array_push($results, $row);
		}

		echo json_encode(
			[
				"results" => $results
			]
		);
	}
	else {
		// tell the user about error
		echo json_encode(
			[
				"message" => "Something went wrong"
			]
		);
	}
?>
