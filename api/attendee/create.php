<?php
	header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
	header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once '../config/dbclass.php';
	include_once '../entities/attendee.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$attendee = new Attendee($connection);

	$data = json_decode(file_get_contents("php://input"));

  // Ensure correct data sent
  if (empty($data->name) || 
      empty($data->email) ||
      empty($data->type_id) ||
      empty($data->room_id)) {
    echo '{ "message": "Unable to create attendee. Please provide name, email, type_id and room_id." }';
    die();
  }

  $attendee->name = $data->name;
  $attendee->email = $data->email;
  $attendee->type_id = $data->type_id;
  $attendee->room_id = $data->room_id;
  

  if ($attendee->create()) {
    echo '{ "message": "Attendee was created." }';
  }
  else {
    echo '{ "message": "Unable to create attendee." }';
  }
?>
