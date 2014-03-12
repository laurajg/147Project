<?php 
  include ('./sqlitedb.php');
?>

<?php
//if user did not click registration button show the registration field.
 if( !(isset( $_POST['password'] ) ) ) { 
    include ('./header.html'); 
   include ('./password.html'); 
  
//if register button was clicked.
} else {
	$name = $_POST["username"];
	$email = $_POST["email"];
	
	$query = "select * from Users where UserID='$name';";

	try {
		 $result = $db->query($query);
   		 $row = $result->fetch();
		//if that username exists
		if (!empty($row["UserID"])) {
			 $password = $row["AccountPassword"];
			 $from = "team@glance.com"; // sender
  		 	 $subject = "Your Glance Application Password";
    		 $message = "Hi $name your password is '$password'";
    		 // message lines should not exceed 70 characters (PHP rule), so wrap it
   			 $message = wordwrap($message, 70);
   			 // send mail
    		mail($email,$subject,$message,"From: $from\n");
    		
    		include ('./header.html'); 
			echo "<div class=\"error\"> We have emailed you your password, you should receive it soon </div>";
			include('./password.html');
		}
		else {
			include ('./header.html'); 
			echo "<div class=\"error\"> We don't have the username ".$name ." in our system. <br/> Try again a different username or <a href=\"registration.php\"> Register </a> </div>";
			include('./password.html');
		}
		
	} catch (PDOException $e) {
    	try {
    		$db->rollBack();
    		include ('./header.html'); 
			echo $e->getMessage();
  		 	include ('./password.html'); 

    	} catch (PDOException $pe) {
			echo $e->getMessage();
	   	 }
	} 	
}

?>
 