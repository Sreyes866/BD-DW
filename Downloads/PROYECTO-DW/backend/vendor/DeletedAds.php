<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

// Primero, elimina los registros relacionados en la tabla ad_clicks
$query = "DELETE FROM ad_clicks WHERE ad_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->close();

// Luego, elimina el anuncio de la tabla ads
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