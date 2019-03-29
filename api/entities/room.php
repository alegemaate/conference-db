<?php
	class Room {
		// Connection
		private $connection;

		// Columns
		private $room_id;
		private $building;
		private $room_number;
		private $capacity;
		private $name;

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
				SELECT ROOMS.*, name FROM
				(
					(SELECT room_id, name FROM attendee) AS ATTS
			    RIGHT JOIN
			    (SELECT room_id, building, room_number, capacity FROM room) AS ROOMS
			   	ON ATTS.room_id = ROOMS.room_id
				)";

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