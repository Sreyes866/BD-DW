<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include('db_connect.php');

$input = json_decode(file_get_contents('php://input'), true);
$categoryName = $input['categoryName'];
$recent = $input['recent'];

$query = $conn->prepare("SELECT GetArticleByCategoryName(?, ?) AS articleDetails");
$query->bind_param("si", $categoryName, $recent);
$query->execute();
$result = $query->get_result();
$row = $result->fetch_assoc();

if ($row) {
    $details = explode('|', $row['articleDetails']); 
    echo json_encode(['title' => $details[0], 'content' => $details[1]]);
} else {
    echo json_encode(['error' => 'No article found']);
}

$conn->close();
?>