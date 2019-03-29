<?php
	class Attendee {
		// Connection
		private $connection;

		// Columns
		public $att_id;
		public $room_id;
		public $name;
		public $email;
		public $type_name;
		public $type_id;
		public $fee;

		// Constructor
		public function __construct($connection) {
			$this->connection = $connection;
		}

		// Create
		public function create() {
			$query = "
					INSERT INTO attendee
					(name, att_type_id, email) 
					VALUES ('".$this->name."','".$this->type_id."','".$this->email."')
					";

			if ($this->room_id != "null") {
				$query = "
					INSERT INTO attendee
					(name, att_type_id, room_id, email) 
					VALUES ('".$this->name."','".$this->type_id."','".$this->room_id."','".$this->email."')
					";
			}
			

			$stmt = $this->connection->prepare($query);

			try {
				$stmt->execute();
			}
			catch (PDOException $e) {
				return false;
			}

			return true;
		}

		// Read
		public function read() {
			$query = "
				SELECT  att_id, room_id, name, email, type_name, fee
				FROM attendee JOIN attendee_type
				USING(att_type_id)
				ORDER BY type_name DESC
				";

			$stmt = $this->connection->prepare($query);
			$stmt->execute();

			return $stmt;
		}

		// Update
		public function update() {

		}

		// Delete
		public function delete() {

		}
	}