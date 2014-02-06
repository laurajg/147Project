<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8" />
<title> Add or Update User Account </title>
<link href="style.css" rel="stylesheet" type="text/css">

</script>
</head>
<body>



<?php 
  include ('./navbar.html');
?>



<div id="main">
	<div class="homeText">
		Stay inspired and achieve your goals! (Actual tbd!)
	</div>
	<div id="createAccount" class="homeButtons">
		
		<form action="http://www.stanford.edu/~laurajg/cgi-bin/147/login.php">
  		  <input class = "submitButton" type="submit" value="Log In">
		</form>

		<br/>
		
		<form action="http://www.stanford.edu/~laurajg/cgi-bin/147/registration.php">
  		  <input  class = "submitButton" type="submit" value="Create Account">
		</form>
			
	</div> <!-- end create account div --> 
	<div class="footer">
		<a href="terms.html"> Terms and Conditions </a>
		
	</div>
</div> <!-- end main div -->
</body>
</html>