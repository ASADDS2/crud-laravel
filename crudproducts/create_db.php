<?php
try {
    $pdo = new PDO('pgsql:host=localhost;port=5432;dbname=postgres', 'postgres', 'Qwe.123*');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec('CREATE DATABASE crudb;');
    echo "Base de datos 'crudb' creada correctamente.\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
