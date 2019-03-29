<?php
	class Sponsor {
		// Connection
		private $connection;

		// Columns
		public $spn_id;
		public $tier_id;
		public $name;
		public $emails_sent;
		public $emails_allowed;
		public $tier_name;
		public $fund_level;

		// Constructor
		public function __construct($connection) {
			$this->connection = $connection;
		}

		// Create
		public function create() {
			$query = "
				INSERT INTO sponsor
				(tier_id, name) 
				VALUES ('".$this->tier_id."','".$this->name."')
				";

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
				SELECT sponsor.*, sponsor_tier.name AS tier_name, sponsor_tier.fund_level, sponsor_tier.emails_allowed 
				FROM sponsor JOIN sponsor_tier
				ON sponsor.tier_id = sponsor_tier.tier_id
				ORDER BY fund_level DESC
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
			$this->connection->beginTransaction();

			// Remove attendees
			$query = "
				DELETE a, b
				FROM sponsor_attendee a
				LEFT JOIN attendee b
				ON a.att_id = b.att_id
				WHERE a.spn_id=".$this->spn_id.";";


			$stmt = $this->connection->prepare($query);
			
			try {
				$stmt->execute();
			}
			catch (PDOException $e) {
				$this->connection->rollBack();
				return false;
			}

			// Remove jobs
			$query = "
				DELETE
				FROM job
				WHERE spn_id=".$this->spn_id."";


			$stmt = $this->connection->prepare($query);
			
			try {
				$stmt->execute();
			}
			catch (PDOException $e) {
				$this->connection->rollBack();
				return false;
			}

			// Remove sponsor
			$query = "
				DELETE
				FROM sponsor
				WHERE spn_id=".$this->spn_id."";


			$stmt = $this->connection->prepare($query);
			
			try {
				$stmt->execute();
			}
			catch (PDOException $e) {
				$this->connection->rollBack();
				return false;
			}


			$this->connection->commit();

			return true;
		}
	}