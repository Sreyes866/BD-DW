<?php
// Configuración CORS y conexión a la base de datos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['username']) || !isset($data['password']) || !isset($data['email']) || !isset($data['nationality'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

$name = $data['name'];
$username = $data['username'];
$password = $data['password'];
$email = $data['email'];
$nationality = $data['nationality'];  // Nueva variable para la nacionalidad
$role = 'logged_in_visitor';

// Actualización de la consulta SQL para incluir la nacionalidad
$sql = "INSERT INTO users (name, username, password, email, role, nationality) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Actualización del bind_param para incluir la nacionalidad
$stmt->bind_param("ssssss", $name, $username, $password, $email, $role, $nationality);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Usuario registrado']);
} else {
    echo json_encode(['message' => 'Error al registrar usuario', 'error' => $stmt->error]);
}

$conn->close();
?>