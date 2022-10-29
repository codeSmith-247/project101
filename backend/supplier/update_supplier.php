<?php

require_once 'functions.php';

$name       = $_POST['name'];
$contact    = $_POST['contact'];
$location   = $_POST['location'];
$date       = $_POST['date'];
$id         = $_POST['id'];

update_supplier($name, $contact, $location, $date, $id);

