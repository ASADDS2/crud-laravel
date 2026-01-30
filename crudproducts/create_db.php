<?php
try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=mysql', 'root', 'Qwe.123*');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec('CREATE DATABASE crudproducts;');
    echo "Base de datos 'crudproducts' creada correctamente.\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
