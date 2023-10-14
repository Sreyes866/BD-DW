<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, multipart/form-data");

include ('db_connect.php');

$data = $_POST;


if (!isset($data['title']) || !isset($data['content']) || !isset($data['category_id']) || !isset($data['sub_category_id']) || !isset($data['author_id']) || !isset($_FILES['image'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}


$image = null;
if (isset($_FILES['image'])) {
    $image = file_get_contents($_FILES['image']['tmp_name']);
}


$content1 = isset($data['content1']) ? $data['content1'] : null;
$content2 = isset($data['content2']) ? $data['content2'] : null;
$content3 = isset($data['content3']) ? $data['content3'] : null;


$sql = "INSERT INTO Articles (title, content, content1, content2, content3, category_id, sub_category_id, author_id, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);


$stmt->bind_param("sssssssss", $data['title'], $data['content'], $content1, $content2, $content3, $data['category_id'], $data['sub_category_id'], $data['author_id'], $image);


if ($stmt->execute()) {
    echo json_encode(['message' => 'Artículo añadido']);
} else {
    echo json_encode(['message' => 'Error al añadir artículo', 'error' => $stmt->error]);
}

$conn->close();
?>
