<?php 
include_once("config.php"); //include the config
?>


<?php
//if user did not click registration button show the registration field.
 if( !(isset( $_POST['register'] ) ) ) { ?>



<!DOCTYPE html>
<html>
	<head>
		<title>Codecall Tutorials - Secured Login with php5</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
	</head>
	
	<body>
		<header id="head" >
		 <p>Codecall tutorials User Registration</p>
		 <p><a href="register.php"><span id="register">Register</span></a></p>
		</header>
		
		<div id="main-wrapper">
		 <div id="register-wrapper">
			 <form method="post">
				 <ul>
					 <li>
						 <label for="usn">Username : </label>
						 <input type="text" id="usn" maxlength="30" required autofocus name="username" />
					 </li>
					
					 <li>
						 <label for="passwd">Password : </label>
						 <input type="password" id="passwd" maxlength="30" required name="password" />
					 </li>
						
						<li>
						 <label for="conpasswd">Confirm Password : </label>
						 <input type="password" id="conpasswd" maxlength="30" required name="conpassword" />
					 </li>
					 <li class="buttons">
						 <input type="submit" name="register" value="Register" />
							<input type="button" name="cancel" value="Cancel" onclick="location.href='index.php'" />
					 </li>
					
				 </ul>
			 </form>
			</div>
		</div>
	
	</body>
</html>

<?php 

//if register button was clicked.
} else {
echo "we clicked register";
	$usr = new Users; //create new instance of the class Users
	$usr->storeFormValues( $_POST ); //store form values

//if the entered password is match with the confirm password then register him
if( $_POST['password'] == $_POST['conpassword'] ) {
//echo $usr->register($_POST); 
echo "we are here";
} else {
//if not then say that he must enter the same password to the confirm box.
echo "Password and Confirm password not match"; 
}
}
?>