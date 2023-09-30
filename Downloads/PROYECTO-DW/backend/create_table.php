<?php
include ('db_connect.php');

// SQL para crear las tablas

// Tabla de roles
$sqlRoles = "CREATE TABLE Roles (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)";

// Tabla de usuarios
$sqlUsers = "CREATE TABLE Users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    password VARCHAR(255),
    role_id INT(6) UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES Roles(id)
)";

// Tabla de categorías
$sqlCategories = "CREATE TABLE Categories (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
)";

// Tabla de subcategorías
$sqlSubCategories = "CREATE TABLE SubCategories (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category_id INT(6) UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
)";

// Tabla de artículos
$sqlArticles = "CREATE TABLE Articles (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category_id INT(6) UNSIGNED,
    sub_category_id INT(6) UNSIGNED,
    author_id INT(6) UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (sub_category_id) REFERENCES SubCategories(id),
    FOREIGN KEY (author_id) REFERENCES Users(id)
)";

// Tabla de comentarios
$sqlComments = "CREATE TABLE Comments (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INT(6) UNSIGNED,
    article_id INT(6) UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (article_id) REFERENCES Articles(id)
)";

// Tabla de anuncios
$sqlAds = "CREATE TABLE Ads (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255),
    link_url VARCHAR(255)
)";

// Ejecutar SQL
if ($conn->query($sqlRoles) === TRUE && 
    $conn->query($sqlUsers) === TRUE && 
    $conn->query($sqlCategories) === TRUE && 
    $conn->query($sqlSubCategories) === TRUE && 
    $conn->query($sqlArticles) === TRUE && 
    $conn->query($sqlComments) === TRUE && 
    $conn->query($sqlAds) === TRUE) {
    echo "Tables created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
