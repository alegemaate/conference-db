<?php
	class SponsorTier {
		// Connection
		private $connection;

		// Columns
		public $tier_id;
		public $name;
		public $fund_level;
		public $emails_allowed;

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
				SELECT * FROM sponsor_tier
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