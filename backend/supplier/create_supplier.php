<?php

require_once 'functions.php';

$name       = $_POST['name'];
$contact    = $_POST['contact'];
$location   = $_POST['location'];
$date       = $_POST['date'];

create_new_supplier($name, $contact, $location, $date);

