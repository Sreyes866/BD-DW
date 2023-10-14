<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

if (isset($data->image_url) && isset($data->link_url)) {
    $image_url = $data->image_url;
    $link_url = $data->link_url;

    $query = "INSERT INTO ads (image_url, link_url) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $image_url, $link_url);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Ad created successfully']);
    } else {
        echo json_encode(['message' => 'Error creating ad', 'error' => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['message' => 'Missing fields']);
}

$conn->close();
?>
