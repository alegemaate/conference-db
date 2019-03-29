<?php 
	class DBClass {
	  // Connect
		private $host = 'localhost';
		private $db   = 'conference_db';
		private $user = 'conference';
		private $pass = '';
		private $charset = 'utf8mb4';

		public $conn;

		// Get database connection
		public function getConnection() {
			$this->conn = null;

			try {
				$dsn = "mysql:host=".$this->host.";dbname=".$this->db.";charset=".$this->charset."";
				$options = [
			    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			    PDO::ATTR_EMULATE_PREPARES   => false,
				];

		 		$this->conn = new PDO($dsn, $this->user, $this->pass, $options);
			} 
			catch (PDOException $e) {
		   	throw new PDOException($e->getMessage(), (int)$e->getCode());
			}

			return $this->conn;
		}
	}
?>