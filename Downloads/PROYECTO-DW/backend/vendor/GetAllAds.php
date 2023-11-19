<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$query  = "SELECT id, image_url, link_url, page_name FROM ads";  // Incluido page_name
$result = $conn->query($query); 

if ($result->num_rows > 0) {
    $ads = array();
    while ($row = $result->fetch_assoc()) {
        array_push($ads, $row);
    }
    echo json_encode($ads);
} else {
    echo json_encode(array("message" => "No se encontraron anuncios"));
}

$conn->close();
?>
