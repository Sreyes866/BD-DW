<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

// Obtener la fecha actual
$today = date("Y-m-d");

// Llamar al procedimiento almacenado
$query = $conn->prepare("CALL GetReportedComments()");
$query->execute();

$result = $query->get_result();
$todayReportedComments = [];
$allReportedComments = [];

while ($row = $result->fetch_assoc()) {
    // Si la fecha del comentario reportado es igual a la fecha actual, lo añade a todayReportedComments
    if ($row['ReportDate'] == $today) {
        $todayReportedComments[] = $row;
    }
    // Añadir a allReportedComments
    $allReportedComments[] = $row;
}

// Importante: cerrar el mysqli_stmt para evitar erro
$query->close();

// Obtener los correos electrónicos y nombres de los moderadores
$sqlModerators = "SELECT email, name FROM users WHERE role = 'moderator'";
$resultModerators = $conn->query($sqlModerators);
$moderatorEmails = [];

if ($resultModerators) {
    while ($row = $resultModerators->fetch_assoc()) {
        $moderatorEmails[] = $row;
    }
}

echo json_encode([
    'moderatorEmails' => $moderatorEmails,
    'todayReportedComments' => $todayReportedComments,
    'allReportedComments' => $allReportedComments
]);

$conn->close();
?>