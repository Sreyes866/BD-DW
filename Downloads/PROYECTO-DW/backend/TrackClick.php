<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);
$adId = $data['adId'];
$pageName = $data['pageName'] ?? 'announcements';  // Utiliza el valor enviado desde el frontend si está disponible

$query = "INSERT INTO ad_clicks (ad_id, page_name, clicked_at) VALUES (?, ?, NOW())";
$stmt = $conn->prepare($query);
$stmt->bind_param("is", $adId, $pageName);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Click registrado']);
} else {
    echo json_encode(['message' => 'Error registrando click']);
}

$stmt->close();
$conn->close();
?>
