<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../config/dbclass.php';
	include_once '../entities/sponsor.php';

	$dbclass = new DBClass();
	$connection = $dbclass->getConnection();

	$sponsor = new Sponsor($connection);

	// set response code - 200 OK
	http_response_code(200);

	$stmt = $sponsor->read();
	$count = $stmt->rowCount();

	if($count > 0){
    $sponsors = array(
    	"body" => [],
    	"count" => $count
    );

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);

      // Create sponsor entry
      if (isset($name)) {
        $s  = array(
          "spn_id" => $spn_id,
          "tier_id" => $tier_id,
          "name" => $name,
          "emails_sent" => $emails_sent,
          "emails_allowed" => $emails_allowed,
          "tier_name" => $tier_name,
          "fund_level" => $fund_level,
        );
        array_push($sponsors["body"], $s);
      }
    }

    echo json_encode($sponsors);
	}
	else {
    echo json_encode(
      array("body" => array(), "count" => 0)
    );
	}
?>
