<?php 
  include ('./sqlitedb.php');
?>

<?php
//if user did not click registration button show the registration field.
 if( !(isset( $_POST['register'] ) ) ) { 
    include ('./header.html'); 
   include ('./register.html'); 
  
//if register button was clicked.
} else {
	
	//if the entered password is match with the confirm password then register him
	if( $_POST['password'] == $_POST['conpassword'] ) {
		
		$name = $_POST['username'];
		$password = $_POST['password'];
		$email = $_POST['email'];
	
		try {
			$db->beginTransaction();
			$query = "Insert into Users values('$name', '$password', '$email')";
			$db -> exec($query);
			$query2 = "update CurrUser set currUser= '$name' ";
			$db -> exec($query2);
			$db->commit();
			
			include('./header.html'); 
			echo '<p class="welcome"> Welcome '. $name .' </p>';
			//include('./succesfulRegistration.html');
		
		} catch (Exception $e) {
    		try {
    			$db->rollBack();
    			include ('./header.html'); 
    			echo '<div class="error"> Sorry that username is already taken, please try another </div>';
  		 		include ('./register.html'); 

    		} catch (PDOException $pe) {
				echo "<p> Unable to Create User Account </p>" . $e->getMessage();
	   		 }
		} 		
		
	
	} else {
		//if not then say that he must enter the same password to the confirm box.
		  include('./header.html'); 
  		  echo '<div class="error">	Error: Password and Confirm Password Do not Match </div>';
  		  include ('./register.html'); 
	}
}

?>