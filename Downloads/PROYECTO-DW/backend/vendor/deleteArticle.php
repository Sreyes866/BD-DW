<?php
include ('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];

$sql = "DELETE FROM Articles WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Artículo eliminado']);
} else {
    echo json_encode(['message' => 'Error al eliminar artículo']);
}

$conn->close();
?>
