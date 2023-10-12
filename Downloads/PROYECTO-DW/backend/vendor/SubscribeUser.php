<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

// Debug: Mostrar los datos recibidos
file_put_contents('debug.txt', print_r($data, true));

if (!$data) {
    echo json_encode(['message' => 'No data received']);
    exit();
}

$username = $data['username'] ?? '';
$expiryDate = $data['expiryDate'] ?? '';

if (!$username || !$expiryDate) {
    echo json_encode(['message' => 'Username or expiryDate missing']);
    exit();
}

$sql = "UPDATE users SET is_subscribed = 1, expiryDate = ? WHERE username = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['message' => 'Error preparing statement', 'error' => $conn->error]);
    exit();
}

$stmt->bind_param("ss", $expiryDate, $username);

if ($stmt->execute()) {
    echo json_encode(['message' => 'User subscribed successfully']);
} else {
    echo json_encode(['message' => 'Subscription failed', 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>