<?php
	class Session {
		// Connection
		private $connection;

		// Columns
		public $name;
		public $building;
		public $room_number;
		public $start_time;
		public $end_time;
		public $id;
		public $date;

		// Constructor
		public function __construct($connection) {
			$this->connection = $connection;
		}

		// Create
		public function create() {

		}

		// Read
		public function read() {
			$query = "
				SELECT name,ses_id,  building, room_number, date, start_time, end_time
				FROM session JOIN room
				USING (room_id) JOIN timeslot
				USING (timeslot_id)";

			$stmt = $this->connection->prepare($query);
			$stmt->execute();

			return $stmt;
		}

		// Update
		public function update() {
			$query = "
				UPDATE session JOIN timeslot
				USING (timeslot_id)
				SET 
				date='".$this->date."',
				end_time='".$this->end_time."',
				start_time='".$this->start_time."' 
				WHERE ses_id='".$this->id."'";

			$stmt = $this->connection->prepare($query);
			try {
				$stmt->execute();
			}
			catch (PDOException $e) {
				return false;
			}

			return true;
		}

		// Delete
		public function delete() {

		}
	}