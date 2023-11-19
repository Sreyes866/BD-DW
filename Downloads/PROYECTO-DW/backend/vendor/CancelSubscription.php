<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

$username = $data['username'];

$sql = "UPDATE users SET is_subscribed = 0 WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Suscripción cancelada']);
} else {
    echo json_encode(['message' => 'Error al cancelar la suscripción', 'error' => $stmt->error]);
}

$conn->close();
?>