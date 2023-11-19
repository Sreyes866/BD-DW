<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexión a la base de datos
include('db_connect.php');

$query = "SELECT page_name, COUNT(*) as click_count FROM ad_clicks GROUP BY page_name";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $clickData = array();
    while($row = $result->fetch_assoc()) {
        $clickData[] = $row;
    }
    echo json_encode($clickData);
} else {
    echo json_encode(["message" => "No clicks data found"]);
}

$conn->close();
?>
