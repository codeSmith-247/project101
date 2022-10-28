<?php

$host = 'localhost';
$database = 'Cementogram';
$username = 'root';
$password = '';

$conn = mysqli_connect($host, $username, $password, $database);

if($conn->connect_errno) {
    echo "There is a problem with the database connection";
}

