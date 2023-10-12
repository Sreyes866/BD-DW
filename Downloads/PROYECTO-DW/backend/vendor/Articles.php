<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include ('db_connect.php');
include('cors.php');

$sql = "SELECT * FROM Articles";
$stmt = $conn->prepare($sql);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $articles = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($articles);
} else {
    echo json_encode(['message' => 'Error al obtener artículos']);
}

$conn->close();
?>