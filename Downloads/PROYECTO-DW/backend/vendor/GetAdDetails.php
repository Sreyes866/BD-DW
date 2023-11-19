<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);
$adId = $data['adId'];

$query = "SELECT page_name, COUNT(*) as totalClicks FROM ad_clicks WHERE ad_id = ? GROUP BY page_name";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $adId);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $details = [];
    while ($row = $result->fetch_assoc()) {
        $details[] = $row;
    }
    echo json_encode(['status' => 'success', 'details' => $details]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error fetching details']);
}

$stmt->close();
$conn->close();
?>