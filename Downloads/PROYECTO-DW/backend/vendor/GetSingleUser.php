<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php'); // Asegúrate de tener este archivo con la configuración de conexión a la base de datos

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}
$username = $data['username'];

// Agregamos 'id' a la selección
$sql = "SELECT id, name, username, password, email, role, is_subscribed, expiryDate FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        // Debugging (puedes quitar esta línea en producción)
        // var_dump($user);

        // Incluimos 'id' en la respuesta
        echo json_encode([
            'message' => 'Información del usuario',
            'user' => [
                'id' => $user['id'], // Asegúrate de que 'id' se incluya aquí
                'name' => $user['name'],
                'username' => $user['username'],
                'email' => $user['email'],
                'password' => $user['password'], // Considera la seguridad de exponer la contraseña, incluso si está hasheada
                'role' => $user['role'],
                'is_subscribed' => $user['is_subscribed'],
                'expiryDate' => $user['expiryDate']
            ]
        ]);
    } else {
        echo json_encode(['message' => 'Usuario no encontrado']);
    }
} else {
    echo json_encode(['message' => 'Error en la consulta', 'error' => $stmt->error]);
}

$conn->close();
?>
