<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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