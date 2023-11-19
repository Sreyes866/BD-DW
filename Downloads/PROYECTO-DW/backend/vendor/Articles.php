<?php
header('Content-Type: application/json');

include ('db_connect.php');
error_reporting(E_ALL);
$sql = "SELECT * FROM Articles";
$stmt = $conn->prepare($sql);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $articles = $result->fetch_all(MYSQLI_ASSOC);

    foreach ($articles as &$article) {
        if (isset($article['image'])) {
            $article['image'] = base64_encode($article['image']);
        }
    }

    echo json_encode($articles);
} else {
    echo json_encode(['message' => 'Error al obtener artículos', 'error' => $stmt->error]);
}

$conn->close();
?>

