<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, multipart/form-data");

include('db_connect.php');

$data = $_POST;

// Verificar si los campos requeridos están disponibles
if (!isset($data['article_id']) || !isset($data['title']) || !isset($data['content']) || !isset($data['category_id']) || !isset($data['sub_category_id']) || !isset($data['author_id']) || !isset($data['template_type'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

// Leer la imagen y convertirla a formato binario si hay un cambio
$image = null;
if (isset($_FILES['image'])) {
    $image = file_get_contents($_FILES['image']['tmp_name']);
} else {
    // Si no se proporciona una nueva imagen, mantener la existente
    // Necesitaríamos realizar una consulta aquí para obtener la imagen actual del artículo
    // asumiendo que la función getImageFromArticleId() obtiene la imagen del artículo original
    $image = getImageFromArticleId($data['article_id'], $conn);
}

// Datos adicionales y estado de aprobación 'Pending' para revisión
$content1 = isset($data['content1']) ? $data['content1'] : null;
$content2 = isset($data['content2']) ? $data['content2'] : null;
$content3 = isset($data['content3']) ? $data['content3'] : null;
$template_type = $data['template_type'];
$publish_status = 'Draft'; // La revisión siempre comienza como borrador
$approval_status = 'Pending'; // Estado de aprobación pendiente para la revisión

// Preparar la consulta SQL para la revisión del artículo
$sql = "INSERT INTO Articles (title, content, content1, content2, content3, category_id, sub_category_id, author_id, image, template_type, publish_status, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Vincular los parámetros
$stmt->bind_param("ssssssssssss", $data['title'], $data['content'], $content1, $content2, $content3, $data['category_id'], $data['sub_category_id'], $data['author_id'], $image, $template_type, $publish_status, $approval_status);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['message' => 'Revisión del artículo creada']);
} else {
    echo json_encode(['message' => 'Error al crear la revisión del artículo', 'error' => $stmt->error]);
}

$conn->close();

// Función para obtener la imagen actual del artículo
function getImageFromArticleId($articleId, $conn) {
    $sql = "SELECT image FROM Articles WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $articleId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['image'];
    } else {
        return null; // o manejar el caso de no encontrar la imagen
    }
}
?>
