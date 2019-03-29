<?php
	header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
	header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once '../config/dbclass.php';
	include_once '../entities/sponsor.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$sponsor = new Sponsor($connection);

	$data = json_decode(file_get_contents("php://input"));

  // Ensure correct data sent
  if (empty($data->tier_id) || 
      empty($data->name)) {
    echo '{ "message": "Unable to create sponsor. Please provide tier_id and name." }';
    die();
  }

  // Go ahead and add in
  $sponsor->tier_id = $data->tier_id;
  $sponsor->name = $data->name;

  if ($sponsor->create()) {
    echo '{ "message": "Sponsor was created." }';
  }
  else {
    echo '{ "message": "Unable to create sponsor." }';
  }
?>
