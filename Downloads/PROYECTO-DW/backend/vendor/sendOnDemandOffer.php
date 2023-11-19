<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

$offers = [];

// Consulta SQL para obtener todas las ofertas
$sql = "SELECT * FROM Offers";
if ($result = $conn->query($sql)) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $offer_id = $row["offer_id"];
            
            // Consulta SQL para obtener todos los usuarios relacionados con esta oferta
            $sqlUsers = "SELECT * FROM OfferUserRelation INNER JOIN users ON OfferUserRelation.user_id = users.id WHERE offer_id = ?";
            
            if ($stmt = $conn->prepare($sqlUsers)) {
                $stmt->bind_param("i", $offer_id);
                $stmt->execute();
                $resultUsers = $stmt->get_result();
                
                $users = [];
                
                if ($resultUsers->num_rows > 0) {
                    while($rowUser = $resultUsers->fetch_assoc()) {
                        $users[] = $rowUser;
                    }
                }
                
                $row["users"] = $users;
                $offers[] = $row;
                
                $stmt->close();
            } else {
                echo json_encode(["error" => "Failed to prepare statement"]);
                exit();
            }
        }
        
        // Supongamos que recibes el login del usuario como un parámetro POST
        $user_login = $_POST['user_login'] ?? null;

        // Filtrar las ofertas para el usuario específico
        if ($user_login) {
            $filteredOffers = array_filter($offers, function($offer) use ($user_login) {
                return in_array($user_login, array_column($offer["users"], 'login'));
            });
            echo json_encode(array_values($filteredOffers));
        } else {
            echo json_encode($offers);
        }
    } else {
        echo json_encode(["error" => "No offers found"]);
    }
} else {
    echo json_encode(["error" => "Query failed"]);
}

$conn->close();
?>