<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$query = "DELETE FROM ads WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Anuncio eliminado exitosamente']);
} else {
    echo json_encode(['message' => 'Error al eliminar anuncio']);
}

$stmt->close();
$conn->close();
?>