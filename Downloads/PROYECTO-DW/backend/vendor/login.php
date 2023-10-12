<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

$username = $data['username'];
$password = $data['password'];  // Contraseña sin encriptación

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

if ($user && $password === $user['password']) {
    echo json_encode([
        'message' => 'Usuario autenticado', 
        'user' => [
            'role' => $user['role'],
            'name' => $user['name'],  // Añadir esta línea
            'email' => $user['email'],  // Añadido
            'password' => $user['password'],  // Añadido
            'is_subscribed' => $user['is_subscribed'],  // Añadido
            'expiryDate' => $user['expiryDate']  // Añadido
        ]
    ]);
} else {
        echo json_encode(['message' => 'Usuario o contraseña incorrectos']);
    }
} else {
    echo json_encode(['message' => 'Error en la autenticación', 'error' => $stmt->error]);
}

$conn->close();
?>