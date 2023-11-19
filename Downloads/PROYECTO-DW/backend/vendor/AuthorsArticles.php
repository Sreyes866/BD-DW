<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json'); // Es mejor poner esto al principio.

include('db_connect.php'); // Asegúrate de que este archivo existe y funciona correctamente.

// Subquery para obtener autores y si han publicado
$sql = "
    SELECT u.id, u.username, u.name, 
    CASE WHEN a.author_id IS NULL THEN 'No' ELSE 'Sí' END as has_published
    FROM users u
    LEFT JOIN (SELECT DISTINCT author_id FROM Articles) a ON u.id = a.author_id
    WHERE u.role = 'author'
";

// Ejecutar la consulta
$result = $conn->query($sql);

// Verificar si la consulta devolvió filas
if ($result && $result->num_rows > 0) {
    // Inicializar un array para almacenar los autores
    $authors = [];

    // Obtener los datos y almacenarlos en el array
    while($row = $result->fetch_assoc()) {
        $authors[] = $row;
    }

    // Devolver los datos en formato JSON
    echo json_encode($authors);
} else {
    // Si no hay resultados, devolver un array vacío en JSON
    echo json_encode([]);
}

// Cerrar la conexión
$conn->close();
?>