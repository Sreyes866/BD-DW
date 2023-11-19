<?php
include('db_connect.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$title = $data['title'];
$content = $data['content'];
$content1 = $data['content1'];
$content2 = $data['content2'];
$content3 = $data['content3'];
$category_id = $data['category_id'];
$sub_category_id = $data['sub_category_id'];
$image = $data['image']; // Asegúrate de que esta sea manejada correctamente como datos binarios.

// Convertir la imagen de base64 a binario
$image = base64_decode($image);

$checkStatusSql = "SELECT approval_status, version, author_id, template_type, publish_status, original_article_id FROM Articles WHERE id = ?";
$checkStmt = $conn->prepare($checkStatusSql);
$checkStmt->bind_param("i", $id);
$checkStmt->execute();
$result = $checkStmt->get_result();
if ($result->num_rows === 0) {
    echo json_encode(['message' => 'Artículo no encontrado']);
    exit;
}
$existingArticle = $result->fetch_assoc();

if ($existingArticle['approval_status'] === 'Approved') {
    // Incrementamos la versión para la nueva entrada
    $newVersion = $existingArticle['version'] + 1;
    
    // Identificamos el ID del artículo original
    $originalArticleId = $existingArticle['original_article_id'] ?: $id;

    // Creamos una copia del artículo con los nuevos datos
    $copySql = "INSERT INTO Articles (title, content, content1, content2, content3, category_id, sub_category_id, image, version, is_active, author_id, template_type, publish_status, approval_status, original_article_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?, ?, 'Published', 'Pending', ?)";
    $copyStmt = $conn->prepare($copySql);
    $copyStmt->bind_param("ssssssibisss", $title, $content, $content1, $content2, $content3, $category_id, $sub_category_id, $image, $newVersion, $existingArticle['author_id'], $existingArticle['template_type'], $originalArticleId);

    if ($copyStmt->execute()) {
        echo json_encode(['message' => 'Nueva versión del artículo creada para revisión']);
    } else {
        echo json_encode(['message' => 'Error al crear nueva versión del artículo', 'error' => $copyStmt->error]);
    }
} else {
    // Si el artículo no está aprobado, se actualiza directamente
    $updateSql = "UPDATE Articles SET title = ?, content = ?, content1 = ?, content2 = ?, content3 = ?, category_id = ?, sub_category_id = ?, image = ?, publish_status = 'Draft' WHERE id = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("ssssssibi", $title, $content, $content1, $content2, $content3, $category_id, $sub_category_id, $image, $id);

    if ($updateStmt->execute()) {
        echo json_encode(['message' => 'Artículo actualizado']);
    } else {
        echo json_encode(['message' => 'Error al actualizar artículo', 'error' => $updateStmt->error]);
    }
}

$conn->close();
?>







