<?php

// db_connect.php
include ('db_connect.php');

$sql = "SELECT * FROM SubCategories";
$result = $conn->query($sql);

$subcategories = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($subcategories, $row);
    }
}

echo json_encode($subcategories);

$conn->close();
?>
