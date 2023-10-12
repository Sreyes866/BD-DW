<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');  


$name = $_POST['userName'] ?? '';

$query = "SELECT is_subscribed FROM users WHERE name = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("s", $name);
$stmt->execute();

$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    echo json_encode($row);
} else {
    echo json_encode(['message' => 'No user found']);
}

$conn->close();
?>
