<? php

$userID = $password = $goal = "";

if(isset($_POST['newUserID']))
	$userID = fix_string($_POST['newUserID']);
if(isset($_POST['newUserPassword']))
	$userID = fix_string($_POST['newUserPassword']);

$fail = validate_userID($userID);
$fail .= validate_password($password);



?>

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