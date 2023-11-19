<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('db_connect.php'); // Asegúrate de que este archivo existe y funciona correctamente.

// Recuperar datos del cuerpo de la solicitud POST
$data = json_decode(file_get_contents("php://input"), true);

$commentId = $data['comment_id'] ?? null;
$reportedBy = $data['reported_by'] ?? null;

// Log de diagnóstico
error_log("Reporte de comentario recibido: comment_id={$commentId}, reported_by={$reportedBy}");

// Verificar si los campos requeridos están disponibles
if (!$commentId || !$reportedBy) {
    error_log("Datos incompletos: comment_id={$commentId}, reported_by={$reportedBy}");
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

// Preparar la consulta SQL
$sql = "INSERT INTO CommentReports (CommentID, ReportedBy) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    error_log("Error al preparar la consulta: " . $conn->error);
    echo json_encode(['message' => 'Error al preparar la consulta: ' . $conn->error]);
    $conn->close();
    exit();
}

// Vincular los parámetros
$stmt->bind_param("ii", $commentId, $reportedBy);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['message' => 'Comentario reportado']);
} else {
    error_log("Error al reportar comentario: " . $stmt->error);
    echo json_encode(['message' => 'Error al reportar comentario: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>