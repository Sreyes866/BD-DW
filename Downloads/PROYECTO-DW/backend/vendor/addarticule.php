<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, multipart/form-data");

include ('db_connect.php');

$data = $_POST;

// Verificar si los campos requeridos están disponibles
if (!isset($data['title']) || !isset($data['content']) || !isset($data['category_id']) || !isset($data['sub_category_id']) || !isset($data['author_id']) || !isset($_FILES['image']) || !isset($data['template_type']) || !isset($data['publish_status'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

// Leer la imagen y convertirla a formato binario
$image = null;
if (isset($_FILES['image'])) {
    $image = file_get_contents($_FILES['image']['tmp_name']);
}

// Datos adicionales
$content1 = isset($data['content1']) ? $data['content1'] : null;
$content2 = isset($data['content2']) ? $data['content2'] : null;
$content3 = isset($data['content3']) ? $data['content3'] : null;
$template_type = isset($data['template_type']) ? $data['template_type'] : 1;  // Puedes establecer un valor predeterminado
$publish_status = isset($data['publish_status']) ? $data['publish_status'] : 'Draft';  // Aquí agregamos el estado de publicación

// Preparar la consulta SQL
$sql = "INSERT INTO Articles (title, content, content1, content2, content3, category_id, sub_category_id, author_id, image, template_type, publish_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Vincular los parámetros
$stmt->bind_param("sssssssssss", $data['title'], $data['content'], $content1, $content2, $content3, $data['category_id'], $data['sub_category_id'], $data['author_id'], $image, $template_type, $publish_status);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['message' => 'Artículo añadido']);
} else {
    echo json_encode(['message' => 'Error al añadir artículo', 'error' => $stmt->error]);
}

$conn->close();
?>








