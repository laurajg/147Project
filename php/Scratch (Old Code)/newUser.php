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
  include ('./sqlitedb.php');
?>

<?php 
  include ('./navbar.html');
?>

<!-- GET AND SAVE CURRENT USER -->
<?php
$query = "select currUser from currUser";  
  try {
    $result = $db->query($query);
    $row = $result->fetch();
    $currUser = $row["currUser"];
  } catch (PDOException $e) {
    echo "Current user query failed: " . $e->getMessage();
  }
?>
  
<?php
	if ($_POST['newUserID']) {
		$name = $_POST['newUserID'];
		$password = $_POST['newUserPassword'];
		
	
		try {
			$db->beginTransaction();
			$query = "Insert into Users values('$name', '$password', '')";
			$db -> exec($query);
			$query2 = "update currUser set currUser= '$name' ";
			$db -> exec($query2);
			$db->commit();
			echo "<p> Your Account has been successfully <br/> setup and you are logged in </p>";
			
		} catch (Exception $e) {
    		try {
    			$db->rollBack();
    		} catch (PDOException $pe) {
				echo "Unable to Create User Account " . $e->getMessage();
	   		 }
		} 	
	}	
?>




<div id="main">

	<div id="createAccount">
		<div class="titleRow"> Add a New User Account: </div>

			<form method="POST" action="newUser.php">
				<p>
				<table>
					<tr> <td class="bold"> User ID: </td> <td> <input type="text" name="newUserID"/> </td></tr>
					<tr><td></td><td></td></tr>
					<tr> <td class="bold"> Email: </td> <td><input type="text" name="newUserPassword"/> </td></tr>
					<tr><td></td><td></td></tr>
					<tr> <td class="bold"> Password: </td> <td><input type="password" name="newUserPassword"/> </td></tr>
				</table>
				<input class= "submitButton newSubmit" type="submit" value="Submit">
			</form>
			
			<form action="http://www.stanford.edu/~laurajg/cgi-bin/147/home.php">
  		 		 <input  class = "submitButton newSubmit" type="submit" value="Back">
			</form>
			
			<br/>
	</div> <!-- end create account div --> 
	

<?php
	if ($_POST['newUserID']) {
		$name = $_POST['newUserID'];
		$password = $_POST['newUserPassword'];
	
		try {
			$db->beginTransaction();
			$query = "Insert into Users values('$name', '$password', '')";
			$db -> exec($query);
			$query2 = "update currUser set currUser= '$name' ";
			$db -> exec($query2);
			$db->commit();
			echo "<p> Your Account has been successfully <br/> setup and you are logged in </p>";
			
		} catch (Exception $e) {
    		try {
    			$db->rollBack();
    			echo "<p> Sorry that username is already taken. Please try another </p>";
    		} catch (PDOException $pe) {
				echo "<p> Unable to Create User Account </p>" . $e->getMessage();
	   		 }
		} 	
	}	
?>



	
	
</div> <!-- end main div -->
</body>
</html>