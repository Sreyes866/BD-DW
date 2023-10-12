<?php
include 'db_connect.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$query = 'SELECT * FROM Ads';
$results = mysqli_query($conn, $query);

$data = array();

$fieldNames = array();
while ($fieldInfo = mysqli_fetch_field($results)) {
    $fieldNames[] = $fieldInfo->name;
}

mysqli_data_seek($results, 0);  

while ($row = mysqli_fetch_row($results)) {
    $assocRow = array_combine($fieldNames, $row);
    $data[] = $assocRow;
}

echo json_encode($data);
?>