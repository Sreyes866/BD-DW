<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];

// Generar un token
$token = bin2hex(random_bytes(50));

$sql = "UPDATE users SET reset_token = ? WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $token, $email);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Token generado']);
} else {
    echo json_encode(['message' => 'Error generando token']);
}

$conn->close();
?>