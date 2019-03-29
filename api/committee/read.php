<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../config/dbclass.php';
	include_once '../entities/committee.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$committee = new Committee($connection);

	// set response code - 200 OK
	http_response_code(200);

	$stmt = $committee->read();
	$count = $stmt->rowCount();

	if($count > 0){
    $committees = array(
    	"body" => [],
    	"count" => $count
    );

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);

      // Create committee entry
      if (!isset($committees["body"][$com_id])) {
      	$committees["body"][$com_id] = array(
      		"com_id" => $com_id,
	      	"com_name" => $com_name,
	      	"chair_id" => $chair_id,
	      	"members" => []
	      );
      }

      // Create member entry
      $p  = array(
        "mem_name" => $mem_name,
        "mem_id" => $mem_id
      );

      array_push($committees["body"][$com_id]["members"], $p);
    }

    echo json_encode($committees);
	}
	else {
    echo json_encode(
      array("body" => array(), "count" => 0)
    );
	}
?>
