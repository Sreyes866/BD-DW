<?php
// Conectar a la base de datos
include('db_connect.php');

// Establecer que recibiremos datos de tipo JSON
header("Content-Type: application/json; charset=UTF-8");

// Asegurarse de que el método utilizado es POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener la entrada POST
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    // Asegurarse de que se reciban los datos necesarios
    if(is_array($decoded)) {
        $author_id = $decoded['author_id'];
        $categories = $decoded['categories']; // Esto debería ser un array de IDs de categoría

        // Eliminar asignaciones existentes
        $stmt = $conn->prepare("DELETE FROM AuthorCategory WHERE author_id = ?");
        $stmt->bind_param("i", $author_id);
        $stmt->execute();

        // Asignar nuevas categorías
        $stmt = $conn->prepare("INSERT INTO AuthorCategory (author_id, category_id) VALUES (?, ?)");
        
        foreach ($categories as $category_id) {
            $stmt->bind_param("ii", $author_id, $category_id);
            $stmt->execute();
        }

        echo json_encode(array('message' => 'Categorías asignadas exitosamente.'));
    } else {
        echo json_encode(array('error' => 'Datos inválidos.'));
    }
} else {
    echo json_encode(array('error' => 'Método no permitido.'));
}

$conn->close();
?>
