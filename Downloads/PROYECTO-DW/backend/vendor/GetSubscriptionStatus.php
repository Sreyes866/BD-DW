<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];

$query = "SELECT is_subscribed, expiryDate FROM users WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    echo json_encode([
        'is_subscribed' => $row['is_subscribed'],
        'expiryDate' => $row['expiryDate']
    ]);
} else {
    echo json_encode(['message' => 'Error al recuperar el estado de la suscripción']);
}

$conn->close();
?>