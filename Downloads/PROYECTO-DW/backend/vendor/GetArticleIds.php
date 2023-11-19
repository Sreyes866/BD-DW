<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include('db_connect.php');

$query = "SELECT id FROM Articles"; 
$result = $conn->query($query);

$articleIds = array();

while($row = $result->fetch_assoc()) {
    array_push($articleIds, $row['id']);
}

echo json_encode($articleIds);

$conn->close();
?>