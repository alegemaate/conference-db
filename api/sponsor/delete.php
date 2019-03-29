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
  if (!isset($data->spn_id)) {
    echo '{ "message": "Unable to delete sponsor. Please provide spn_id." }';
    die();
  }

  // Go ahead and add in
  $sponsor->spn_id = $data->spn_id;

  if ($sponsor->delete()) {
    echo '{ "message": "Sponsor was deleted." }';
  }
  else {
    echo '{ "message": "Unable to delete sponsor." }';
  }
?>
