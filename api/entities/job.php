<?php
	class Job {
		// Connection
		private $connection;

		// Columns
		private $job_id;
		private $spn_id;
		private $title;
		private $city;
		private $province;
		private $pay_rate;

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
				SELECT *
				FROM job
				ORDER BY pay_rate DESC
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