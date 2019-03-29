<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../config/dbclass.php';
	include_once '../entities/job.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$job = new Job($connection);

	// set response code - 200 OK
	http_response_code(200);

	$stmt = $job->read();
	$count = $stmt->rowCount();

	if($count > 0){
    $jobs = array(
    	"body" => [],
    	"count" => $count
    );


    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);

      // Create job entry
      $s  = array(
        "job_id" => $job_id,
        "spn_id" => $spn_id,
        "title" => $title,
        "city" => $city,
        "province" => $province,
        "pay_rate" => $pay_rate
      );
      array_push($jobs["body"], $s);
    }

    echo json_encode($jobs);
	}
	else {
    echo json_encode(
      array("body" => array(), "count" => 0)
    );
	}
?>
