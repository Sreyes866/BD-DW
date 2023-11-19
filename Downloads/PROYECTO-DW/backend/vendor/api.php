<?php
include 'db_connect.php';
header('Content-Type: application/json');

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


