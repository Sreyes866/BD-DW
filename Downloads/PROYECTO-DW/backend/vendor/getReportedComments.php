<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php'); 

$sql = "
    SELECT 
        c.CommentID, 
        c.Text, 
        c.ArticleID, 
        u.name AS userName, 
        COUNT(r.ReportID) AS reportCount,
        c.IsCensored, 
        (c.IsCensored = 1 AND COUNT(r.ReportID) > 25) AS IsAutoCensored
    FROM 
        CommentReports r
    INNER JOIN 
        Comments c ON c.CommentID = r.CommentID
    INNER JOIN 
        users u ON u.id = c.UserID
    WHERE 
        r.IsResolved = 0
    GROUP BY 
        c.CommentID
    ORDER BY 
        reportCount DESC";

$result = $conn->query($sql);

$reportedComments = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $reportedComments[] = $row;
    }
    echo json_encode(['reportedComments' => $reportedComments]);
} else {
    echo json_encode(['message' => 'Error al obtener los comentarios reportados: ' . $conn->error]);
}

$conn->close();
?>