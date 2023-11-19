<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$new_password = $data['newPassword'];

// Verificar si el correo electrónico existe
$sql_check = "SELECT * FROM users WHERE email = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {
    // El correo electrónico existe, actualizar la contraseña
    $sql = "UPDATE users SET password = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $new_password, $email);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Contraseña actualizada']);
    } else {
        echo json_encode(['message' => 'Error actualizando contraseña']);
    }
} else {
    // El correo electrónico no existe
    echo json_encode(['message' => 'Correo electrónico no encontrado']);
}

$conn->close();
?>