<?php


// Activar el reporte de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include ('db_connect.php');


// Verificar errores de conexión a la base de datos
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Recibe el id de la categoría a actualizar desde el frontend
$id = intval($_POST['id']); // Convertir a entero

// Primero consulta el estado actual de la categoría
$sqlCheck = "SELECT is_premium FROM Categories WHERE id = $id";
$result = $conn->query($sqlCheck);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentStatus = $row['is_premium'];
    // Cambia el estado
    $newStatus = $currentStatus == 1 ? 0 : 1;

    $sqlUpdate = "UPDATE Categories SET is_premium = $newStatus WHERE id = $id";
    if ($conn->query($sqlUpdate) === TRUE) {
        $affectedRows = $conn->affected_rows;  // Obtener el número de filas afectadas
        echo json_encode([
            "message" => "Estado actual: " . $currentStatus,
            "updateMessage" => "Categoría actualizada exitosamente", 
            "affectedRows" => $affectedRows
        ]);
    } else {
        echo json_encode(["error" => "Error al actualizar la categoría: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "No se encontró una categoría con el ID especificado"]);
}

$conn->close();

?>



