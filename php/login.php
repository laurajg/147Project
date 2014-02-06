

<?php 
  include ('./sqlitedb.php');
?>

<?php
//if user did not click registration button show the registration field.
 if( !(isset( $_POST['login'] ) ) ) { 
    include ('./header.html'); 
   include ('./login.html'); 
  
//if register button was clicked.
} else {
	
	$name = $_POST['username'];
	$password = $_POST['password'];
	$query = "select * from Users where UserID='$name';";
	
	try {
		 $result = $db->query($query);
   		 $row = $result->fetch();
		//if that username exists
		if (!empty($row["UserID"])) {

			if($row["AccountPassword"] == $password) {
				$query2 = "update CurrUser set currUser= '$name' ";
				$db -> exec($query2);
				include('./header.html'); 
				echo '<p class="welcome"> Welcome '. $name .' </p>';
				//include('./succesfulRegistration.html');
			} else {
				include('./header.html'); 
				echo '<div class="error"> Invalid Password. <a href="password.php"> Forgot your password? </a> </div>';
				include('./login.html');
			}
		} 
		else {
			include ('./header.html'); 
			echo "<div class=\"error\"> We don't have the username ".$name ." in our system. <br/> Try again or <a href=\"registration.php\"> Register </a> </div>";
			include('./login.html');
		}
		
	} catch (PDOException $e) {
    	try {
    		$db->rollBack();
    		include ('./header.html'); 
			echo $e->getMessage();
  		 	include ('./register.html'); 

    	} catch (PDOException $pe) {
			echo $e->getMessage();
	   	 }
	} 	
}

?>