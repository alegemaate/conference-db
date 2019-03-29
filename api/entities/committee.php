<?php
	class Committee {
		// Connection
		private $connection;

		// Columns
		private $com_id;
		private $com_name;
		private $chair_id;
		private $mem_name;
		private $mem_id;

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
				SELECT COM_MEMBER.name AS com_name, com_id, chair_id, member.name AS mem_name, member.mem_id
				FROM member JOIN
				(
				    SELECT committee.com_id, committee.name, chair_id, mem_id
				    FROM committee JOIN committee_member
				    USING (com_id)
				) AS COM_MEMBER
				USING (mem_id)";

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