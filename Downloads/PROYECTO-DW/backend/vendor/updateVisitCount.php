<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));
$articleId = $data->articleId;

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Primero, asegúrate de que visit_count no sea NULL
$sql = "UPDATE Articles SET visit_count = IFNULL(visit_count, 0) + 1 WHERE id = ?";
$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $articleId);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Visit count updated successfully']);
} else {
    echo json_encode(['error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
