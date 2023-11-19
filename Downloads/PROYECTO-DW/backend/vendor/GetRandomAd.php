<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

$query = "SELECT id, image_url, link_url, page_name FROM ads ORDER BY RAND() LIMIT 1";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $ad = $result->fetch_assoc();
    echo json_encode($ad);
} else {
    echo json_encode(['message' => 'No se encontraron anuncios']);
}

$conn->close();
?>