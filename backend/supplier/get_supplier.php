<?php

require_once 'functions.php';

$id = $_POST['id'];

$result = supplier_exists($id);

if($result) {
    $result_array = [];

    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }

    header('Content-Type: application/json');
    echo json_encode($result_array);
}
else echo 'not_exists';