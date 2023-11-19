<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With");
header("Access-Control-Allow-Max-Age: 86400");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$image_url = $data['image_url'];
$link_url = $data['link_url'];

$query = "UPDATE ads SET image_url = ?, link_url = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssi", $image_url, $link_url, $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Anuncio actualizado exitosamente']);
} else {
    echo json_encode(['message' => 'Error al actualizar anuncio']);
}

$stmt->close();
$conn->close();
?>