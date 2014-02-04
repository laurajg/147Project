<?php
	//set off all error for security purposes
error_reporting(0);


//define some contstant
	//define( "DB_DSN", "mysql:host=localhost;dbname=codecalltut" ); //this constant will be use as our connectionstring/dsn

	//define( "DB_USERNAME", "root" ); //username of the database
	//define( "DB_PASSWORD", "" ); //password of the database

	define("DB_DSN", "sqlite:");
	define("DB_USERNAME",  "./users.db");
	define( "CLS_PATH", "class" ); //the class path of our project

include_once( CLS_PATH . "/user.php" );

?>


<?php # sqlite.php - creates a handle to your database.
  $dbname = "./users.db";
  try {
    $db = new PDO("sqlite:" . $dbname);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec("PRAGMA foreign_keys = ON;");
  } catch (PDOException $e) {
    "SQLite connection failed: " . $e->getMessage();
    exit();
  }
?>
