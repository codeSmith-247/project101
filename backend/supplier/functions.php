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

function date_search($start_date, $end_date, $search) {

    global $conn;
    
    $start_date = $start_date == '' ? '01/01/2002' : $start_date;
    $end_date = $start_date == '' ? '01/01/2002' : date('m/d/Y');

    $start_date=date("Y-m-d H:i:s",strtotime($start_date));
    $end_date=date("Y-m-d H:i:s",strtotime($end_date));

    $search = "%$search%";
   
    $sql = 'select * from suppliers where date >= timestamp(?) and date <= timestamp(?) and ( name like ? or contact like ? or location like ?) and state != "deleted" order by id desc limit 20';
    $sql = $conn->prepare($sql);

    $sql->bind_param('sssss', $start_date, $end_date, $search, $search, $search);

    if($sql->execute()) {
        $result_array = [];

        $sql = $sql->get_result();

        while($row = $sql->fetch_assoc()) {
            array_push($result_array, $row);
        }

        header('Content-Type: application/json');
        echo json_encode($result_array);
        return true;
    }

    echo 'error';
    return false;
}

function input_search($search) {

    global $conn;

    $search = "%$search%";
   
    $sql = 'select * from suppliers where (name like ? or contact like ? or location like ?) and state != "deleted" order by id desc limit 20';
    $sql = $conn->prepare($sql);

    $sql->bind_param('sss', $search, $search, $search);

    if($sql->execute()) {
        $result_array = [];

        $sql = $sql->get_result();

        while($row = $sql->fetch_assoc()) {
            array_push($result_array, $row);
        }

        header('Content-Type: application/json');
        echo json_encode($result_array);
        return true;
    }

    echo 'error';
    return false;
}


function show_more($start_date, $end_date, $search, $last_id) {

    global $conn;
    
    $start_date = $start_date == '' ? '01/01/2002' : $start_date;
    $end_date = $start_date == '' ? '01/01/2002' : date('m/d/Y');

    $start_date=date("Y-m-d H:i:s",strtotime($start_date));
    $end_date=date("Y-m-d H:i:s",strtotime($end_date));

    $search = "%$search%";
   
    $sql = 'select * from suppliers where date >= timestamp(?) and date <= timestamp(?) and ( name like ? or contact like ? or location like ?) and id < ? and state != "deleted" order by id desc limit 20';
    $sql = $conn->prepare($sql);

    $sql->bind_param('ssssss', $start_date, $end_date, $search, $search, $search, $last_id);

    if($sql->execute()) {
        $result_array = [];

        $sql = $sql->get_result();

        while($row = $sql->fetch_assoc()) {
            array_push($result_array, $row);
        }

        header('Content-Type: application/json');
        echo json_encode($result_array);
        return true;
    }

    echo 'error';
    return false;
}
