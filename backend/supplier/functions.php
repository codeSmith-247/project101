<?php

require_once '../connection.php';

// prevents html insertion attack
function clean($value) {
    return htmlspecialchars($value);
}

// lists suppliers in the database
function list_suppliers() {

    global $conn;
    
    $sql = 'select * from suppliers where state = "active" order by id desc limit 20';
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

//check if supplier exists 
function supplier_exists($search) {
    global $conn;

    $sql = 'select * from suppliers where contact = ? or id = ? and state = "active";';
    $sql = $conn->prepare($sql);
    $sql->bind_param('ss', $search, $search);

    $sql->execute();
    
    $sql = $sql->get_result();

    if($sql->num_rows > 0) {
        return $sql;
    }

    return false;
}

// creates a new supplier
function create_new_supplier($name, $contact, $location, $date) {

    global $conn;

    $name       = clean($name);
    $contact    = clean($contact);
    $location   = clean($location);
    $date       = clean($date);

    if($date == '') {
        $date = date('m/d/Y');
    }

    if(!supplier_exists($contact)) {
        $sql = 'insert into suppliers (name, contact, location, date) VALUES (?,?,?,?)';
        $sql = $conn->prepare($sql);
    
        $sql->bind_param('ssss', $name, $contact, $location, $date);
        
        if($sql->execute()) {
            echo 'success';
            return true;
        }
    }
    else {
        echo "exists";
        return false;
    }


    echo 'error';
    return false;

}

// update a supplier
function update_supplier($name, $contact, $location, $date, $id) {

    global $conn;

    $name       = clean($name);
    $contact    = clean($contact);
    $location   = clean($location);
    $date       = clean($date);

    if($date == '') {
        $date = date('m/d/Y');
    }

    if(supplier_exists($id)) {
        $sql = 'update suppliers set name = ?, contact = ?, location = ?, date = ? where id = ? and state != "deleted";';
        $sql = $conn->prepare($sql);
    
        $sql->bind_param('ssssi', $name, $contact, $location, $date, $id);
        
        if($sql->execute()) {
            echo 'success';
            return true;
        }
    }
    else {
        echo "not_exists";
        return false;
    }


    echo 'error';
    return false;

}

// delete supplier
function delete_supplier($id) {
    global $conn;

    if(supplier_exists($id)) {
        $sql = 'update suppliers set state = "deleted", contact = concat(contact, "_del") where id = ?;';
        $sql = $conn->prepare($sql);

        $sql->bind_param('i', $id);

        if($sql->execute()) {
            echo 'success';
            return true;
        }

        echo 'error';
        return false;
    }
}