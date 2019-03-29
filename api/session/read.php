<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  include_once '../config/dbclass.php';
  include_once '../entities/session.php';

  $dbclass = new DBClass();
  $connection = $dbclass->getConnection();

  $session = new Session($connection);

  // set response code - 200 OK
  http_response_code(200);

  $stmt = $session->read();
  $count = $stmt->rowCount();

  if($count > 0){
    $sessions = array(
      "body" => [],
      "count" => $count
    );

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);

      // Create session entry
      if (isset($name)) {
        $s  = array(
          "name" => $name,
          "building" => $building,
          "room_number" => $room_number,
          "start_time" => $start_time,
          "end_time" => $end_time,
          "date" => $date,
          "ses_id" => $ses_id
        );
        array_push($sessions["body"], $s);
      }
    }

    echo json_encode($sessions);
  }
  else {
    echo json_encode(
      array("body" => array(), "count" => 0)
    );
  }
?>
