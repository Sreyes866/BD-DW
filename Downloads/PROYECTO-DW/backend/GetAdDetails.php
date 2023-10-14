<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $adId = $data['adId'];

    if (isset($adId)) {
        $countQuery = "SELECT COUNT(*) as total_clicks, page_name FROM ad_clicks WHERE ad_id = ?";
        $countStmt = $conn->prepare($countQuery);
        $countStmt->bind_param("i", $adId);
        $countStmt->execute();
        
        $countResult = $countStmt->get_result();
        $countData = $countResult->fetch_assoc();

        if ($countData['total_clicks'] > 0) {
            echo json_encode(['status' => 'success', 'totalClicks' => $countData['total_clicks'], 'pageName' => $countData['page_name']]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se encontraron detalles para el anuncio']);
        }

        $countStmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ID de anuncio no proporcionado']);
    }
}

$conn->close();
?>