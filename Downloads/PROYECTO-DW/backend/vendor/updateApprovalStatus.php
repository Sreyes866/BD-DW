<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->approval_status) && isset($data->publish_status)) {
    $id = $data->id;
    $approval_status = $data->approval_status;
    $publish_status = $data->publish_status;

    // Obtener el ID del artículo original si existe
    $originalQuery = "SELECT original_article_id FROM Articles WHERE id = ?";
    $originalStmt = $conn->prepare($originalQuery);
    $originalStmt->bind_param("i", $id);
    $originalStmt->execute();
    $originalResult = $originalStmt->get_result();
    $originalRow = $originalResult->fetch_assoc();
    $originalId = $originalRow['original_article_id'] ?? $id;

    // Desactivar versiones anteriores del artículo
    $deactivateQuery = "UPDATE Articles SET is_active = FALSE WHERE id = ? OR original_article_id = ?";
    $deactivateStmt = $conn->prepare($deactivateQuery);
    $deactivateStmt->bind_param("ii", $originalId, $originalId);
    $deactivateStmt->execute();

    // Activar la nueva versión y actualizar su estado
    $updateQuery = "UPDATE Articles SET approval_status = ?, publish_status = ?, is_active = TRUE WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("ssi", $approval_status, $publish_status, $id);

    if ($updateStmt->execute()) {
        echo json_encode(["message" => "El estado del artículo se ha actualizado con éxito."]);
    } else {
        echo json_encode(["message" => "No se pudo actualizar el estado del artículo.", "error" => $stmt->error]);
    }
} else {
    echo json_encode(["message" => "Datos incompletos para la actualización."]);
}

$conn->close();
?>




