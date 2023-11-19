<?php
header('Content-Type: application/json');

include('db_connect.php');


$sql = "SELECT id, name, role, nationality FROM users WHERE role = 'author'";
$stmt = $conn->prepare($sql);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
} else {
    echo json_encode(['message' => 'Error al obtener usuarios', 'error' => $stmt->error]);
}

$conn->close();
?>

