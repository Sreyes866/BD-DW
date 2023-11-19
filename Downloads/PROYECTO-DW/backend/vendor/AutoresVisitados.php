<?php
// Conexión a la base de datos (cambia los valores según tu configuración)
include('db_connect.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Consulta para obtener los 5 autores más visitados desde la vista AuthorViews
$sql = "SELECT * FROM AuthorViews ORDER BY total_visits DESC LIMIT 5";

// Preparar la declaración
if ($stmt = $conn->prepare($sql)) {
    // Ejecutar la declaración
    if ($stmt->execute()) {
        // Almacenar el resultado
        $result = $stmt->get_result();

        // Inicializar un array vacío para almacenar los resultados
        $AuthorViews = [];

        // Recorrer cada fila del resultado
        while ($row = $result->fetch_assoc()) {
            $AuthorViews[] = [
                'author' => $row['author'], // Utilizamos el nombre del autor
                'total_visits' => $row['total_visits']
            ];
        }

        // Devolver los datos en formato JSON
        header('Content-Type: application/json');
        echo json_encode($AuthorViews);
    } else {
        echo "Error: " . $stmt->error;
    }

    // Cerrar la declaración
    $stmt->close();
} else {
    echo "Error al preparar la declaración: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>


