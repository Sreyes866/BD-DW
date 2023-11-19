<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$discount = $data->discount;
$validity_days = $data->validity_days;
$login_days = $data->login_days;

$sql = "INSERT INTO AutomaticOfferConfig (discount, validity_days, login_days) VALUES ($discount, $validity_days, $login_days)";
$conn->query($sql);

echo json_encode(array("message" => "Configuración de oferta automática guardada"));
?>