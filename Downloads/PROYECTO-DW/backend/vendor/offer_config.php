<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

function createOfferConfig($conn, $data) {
    $sql = "INSERT INTO OfferConfig (discount_percentage, validity_days, continuous_login_days) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $data['discount_percentage'], $data['validity_days'], $data['continuous_login_days']);
    $stmt->execute();
    echo json_encode(['message' => 'Created']);
}

function readOfferConfig($conn) {
    $sql = "SELECT * FROM OfferConfig";
    $result = $conn->query($sql);
    $configs = [];
    while($row = $result->fetch_assoc()) {
        array_push($configs, $row);
    }
    echo json_encode($configs);
}

function updateOfferConfig($conn, $data) {
    $sql = "UPDATE OfferConfig SET discount_percentage = ?, validity_days = ?, continuous_login_days = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $data['discount_percentage'], $data['validity_days'], $data['continuous_login_days'], $data['id']);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Configuración de oferta actualizada']);
    } else {
        echo json_encode(['message' => 'Error al actualizar la configuración', 'error' => $stmt->error]);
    }
}

function deleteOfferConfig($conn, $data) {
    $sql = "DELETE FROM OfferConfig WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $data['id']);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Configuración de oferta eliminada']);
    } else {
        echo json_encode(['message' => 'Error al eliminar la configuración', 'error' => $stmt->error]);
    }
}

if(isset($data['action'])) {
    switch ($data['action']) {
        case 'create':
            createOfferConfig($conn, $data);
            break;
        case 'read':
            readOfferConfig($conn);
            break;
        case 'update':
            updateOfferConfig($conn, $data);
            break;
        case 'delete':
            deleteOfferConfig($conn, $data);
            break;
        default:
            echo json_encode(['message' => 'Invalid action']);
    }
} else {
    echo json_encode(['message' => 'No action provided']);
}

$conn->close();
?>