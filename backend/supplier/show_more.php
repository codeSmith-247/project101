<?php

require_once 'functions.php';

$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$search = $_POST['search'];
$last_id = $_POST['last_id'];

// $start_date = $_GET['start_date'];
// $end_date = $_GET['end_date'];

show_more($start_date, $end_date, $search, $last_id);
