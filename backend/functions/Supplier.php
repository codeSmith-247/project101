<?php

require_once '../connection.php';

function list_suppliers() {
    
    $sql = 'select * from suppliers order by id desc limit 20';
    $sql = $this->conn->prepare($sql);
    $sql->execute();

    
}
