<?php

require_once '../connection.php';

// prevents html insertion attack
function clean($value) {
    return htmlspecialchars($value);
}

// lists suppliers in the database
function list_suppliers() {

    global $conn;
    
    $sql = 'select * from suppliers order by id desc limit 20';
    $sql = $conn->query($sql);

    $result_array = [];

    while($row = $sql->fetch_assoc()) {
        array_push($result_array, $row);
    }

    if(sizeof($result_array) > 0) {
        header('Content-Type: application/json');
        echo json_encode($result_array);
    }

    else echo 'empty';

}

// creates a new supplier
function create_new_supplier($name, $contact, $location, $date) {

    global $conn;

    $name       = clean($name);
    $contact    = clean($contact);
    $location   = clean($location);
    $date       = clean($date);

    $sql = 'insert into suppliers (name, contact, location, date) VALUES (?,?,?,?)';
    $sql = $conn->prepare($sql);

    $sql->bind_param('ssss', $name, $contact, $location, $date);
    
    if($sql->execute()) {
        return true;
    }

    return false;
}

