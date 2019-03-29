<?php
	header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
	header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once '../config/dbclass.php';
	include_once '../entities/session.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$session = new Session($connection);

	$data = json_decode(file_get_contents("php://input"));

  // Ensure correct data sent
  if (empty($data->id) || 
      empty($data->start) ||
      empty($data->end) ||
      empty($data->date)) {
    echo '{ "message": "Unable to modified event. Please provide id, date, start and end." }';
    die();
  }

  // Go ahead and add in
  $session->id = $data->id;
  $session->start_time = $data->start;
  $session->end_time = $data->end;
  $session->date = $data->date;

  if ($session->update()) {
    echo '{ "message": "Event was modified." }';
  }
  else {
    echo '{ "message": "Unable to modify event." }';
  }
?>
