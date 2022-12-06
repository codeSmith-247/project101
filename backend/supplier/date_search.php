<?php

require_once 'functions.php';

$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$search = $_POST['search'];

// $start_date = $_GET['start_date'];
// $end_date = $_GET['end_date'];

date_search($start_date, $end_date, $search);
