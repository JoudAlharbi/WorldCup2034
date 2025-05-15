<?php
//Error Reporting in PHP
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require "DB.php";
$db = new DB();

if (isset($_POST['fullname']) && isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])) {
    
    if ($db->dbConnect()) {
        if ($db->signUp("user", $_POST['fullname'], $_POST['email'], $_POST['username'], $_POST['password'])) {
            echo "Sign Up Success";
        } else echo "Sign up Failed";
    } else echo "Error: Database connection";
} else echo "All fields are required";

//debugging statements to check the values of $_POST
var_dump($_POST);
?>