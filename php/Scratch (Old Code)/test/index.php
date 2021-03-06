<?php 
  include ('./sqlitedb.php');
?>

<?php
//if user did not click the login button show the login form
 if( !(isset( $_POST['login'] ) ) ) { ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Secured Login with php5</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
    </head>
    
    <body>
    
        <header id="head" >
         <p>User Login</p>
         <p><a href="register.php"><span id="register">Register</span></a></p>
        </header>
        
        <div id="main-wrapper">
         <div id="login-wrapper">
             <form method="post" action="">
                 <ul>
                     <li>
                         <label for="usn">Username : </label>
                         <input type="text" maxlength="30" required autofocus name="username" />
                     </li>
                    
                     <li>
                         <label for="passwd">Password : </label>
                         <input type="password" maxlength="30" required name="password" />
                     </li>
                     <li class="buttons">
                         <input type="submit" name="login" value="Log me in" />
                            <input type="button" name="register" value="Register" onclick="location.href='register.php'" />
                     </li>
                    
                 </ul>
             </form>
                
            </div>
        </div>
    
    </body>
</html>

<?php 
//else look at the database and see if he entered the correct details
} else {
$usr = new Users;
$usr->storeFormValues($_POST);

//if our function userLogin() returns true then the user is valid, display welcome else say it's incorrect.
if( $usr->userLogin() ) {
echo "Welcome"; 
} else {
echo "Incorrect Username/Password"; 
}
}
?>