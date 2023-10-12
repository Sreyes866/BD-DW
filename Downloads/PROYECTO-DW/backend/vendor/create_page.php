<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include ('db_connect.php');


// Create pages for categories
$sql = "SELECT * FROM Categories";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $filename = $row['name'] . '.html';
    $content = '<h1>' . $row['name'] . '</h1>';
    file_put_contents($filename, $content);
}

// Create pages for subcategories
$sql = "SELECT * FROM SubCategories";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $filename = $row['name'] . '.html';
    $content = '<h1>' . $row['name'] . '</h1>';
    file_put_contents($filename, $content);
}

$conn->close();
?>