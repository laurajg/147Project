<?php 
include_once("config.php"); //include the config
?>
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
	//$usr = new Users; //create new instance of the class Users
	//$usr->storeFormValues( $_POST ); //store form values

	//if the entered password is match with the confirm password then register him
	if( $_POST['password'] == $_POST['conpassword'] ) {
		//echo $usr->register($_POST); 
		
		$name = $_POST['username'];
		$password = $_POST['password'];
	
		try {
			$db->beginTransaction();
			$query = "Insert into Users values('$name', '$password', '')";
			$db -> exec($query);
			$query2 = "update currUser set currUser= '$name' ";
			$db -> exec($query2);
			$db->commit();
			
			include('./header.html'); 
			echo "<p> Your Account has been successfully <br/> setup and you are logged in </p>";
			include('./succesfulRegistration.html');
		
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