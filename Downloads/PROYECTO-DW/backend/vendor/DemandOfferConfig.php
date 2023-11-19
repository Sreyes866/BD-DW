<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->user_ids) &&
    isset($data->discount_percentage) &&
    isset($data->expiry_date)
) {
    $user_ids = $data->user_ids;
    $discount_percentage = $data->discount_percentage;
    $expiry_date = $data->expiry_date;

    // Insertar nueva oferta
    $sql = "INSERT INTO Offers (discount_percentage, expiry_date) VALUES ('$discount_percentage', '$expiry_date')";
    $result = mysqli_query($conn, $sql);
    $offer_id = mysqli_insert_id($conn);

    if ($result) {
        $not_found_users = [];

        foreach ($user_ids as $user_id) {
            // Verificar si el usuario existe
            $sql = "SELECT * FROM users WHERE id = '$user_id'";
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                // Insertar relación de oferta y usuario
                $sql = "INSERT INTO OfferUserRelation (offer_id, user_id) VALUES ('$offer_id', '$user_id')";
                mysqli_query($conn, $sql);
            } else {
                $not_found_users[] = $user_id;
            }
        }

        echo json_encode(["message" => "Oferta creada exitosamente", "not_found_users" => $not_found_users]);
    } else {
        echo json_encode(["message" => "Error al crear la oferta"]);
    }
} elseif (isset($data->offer_id_to_delete)) {
    $offer_id_to_delete = $data->offer_id_to_delete;

    // Eliminar las relaciones de oferta y usuario
    $sql = "DELETE FROM OfferUserRelation WHERE offer_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $offer_id_to_delete);
    
    if (!$stmt->execute()) {
        echo json_encode(['message' => 'Error al eliminar relaciones de la oferta', 'error' => $stmt->error]);
        exit();
    }

    // Eliminar la oferta
    $sql = "DELETE FROM Offers WHERE offer_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $offer_id_to_delete);
    
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Oferta y relaciones eliminadas exitosamente']);
    } else {
        echo json_encode(['message' => 'Error al eliminar la oferta', 'error' => $stmt->error]);
    }
} else {
    echo json_encode(["message" => "Faltan datos"]);
}
?>