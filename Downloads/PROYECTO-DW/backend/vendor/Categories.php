<?php

// db_connect.php
include ('db_connect.php');

$sql = "SELECT * FROM Categories";
$result = $conn->query($sql);

$categories = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($categories, $row);
    }
}

echo json_encode($categories);

$conn->close();
?>

