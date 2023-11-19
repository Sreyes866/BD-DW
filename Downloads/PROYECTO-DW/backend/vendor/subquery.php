<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php'); // Asegúrate de que este archivo contiene la lógica de conexión a tu base de datos

try {
    $query = "
        SELECT u.id, u.name, COUNT(c.CommentID) AS ReportedCommentsCount
        FROM users u
        JOIN Comments c ON u.id = c.UserID
        WHERE c.CommentID IN (
            SELECT CommentID 
            FROM CommentReports 
            GROUP BY CommentID 
            HAVING COUNT(ReportID) > 2
        )
        GROUP BY u.id
        HAVING COUNT(c.CommentID) >= 3;
    ";

    $result = $conn->query($query);
    $users = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
    } else {
        throw new Exception("Error al ejecutar la consulta: " . $conn->error);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$conn->close();
?>