<?php
include('db_connect.php');

$token = $_GET['token'];

$sql = "SELECT * FROM users WHERE token=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $sql = "UPDATE users SET token=NULL WHERE token=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    echo "Registro confirmado";
} else {
    echo "Token inválido o expirado";
}

$conn->close();
?>