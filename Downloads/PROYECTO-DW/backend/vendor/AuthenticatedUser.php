<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('db_connect.php');

$token = ''; 


$username = validate_token($token);

$sql = "SELECT name, role FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        echo json_encode([
            'name' => $user['name'],
            'role' => $user['role'],
        ]);
    } else {
        echo json_encode(['message' => 'Usuario no encontrado']);
    }
} else {
    echo json_encode(['message' => 'Error en la consulta', 'error' => $stmt->error]);
}

$conn->close();

function validate_token($token) {
    
    return '';
}
?>
