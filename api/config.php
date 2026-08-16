<?php
// =========================================================
// config.php - připojení k databázi
// Uprav si přihlašovací údaje podle svého hostingu!
// =========================================================

declare(strict_types=1);

// --- WEB3FORMS ---
define('WEB3FORMS_KEY', 'e695a70e-7c07-4a2d-8647-92f8c2319c8a');

// --- ÚDAJE K TVÉ DATABÁZI (Wedos - vevit.art) ---
$DB_HOST = 'md431.wedos.net';
$DB_NAME = 'd400569_artists';
$DB_USER = 'w400569_artists';        // Web uživatel (pro appku)
$DB_PASS = 'Vitek2008.';         // ⚠️ Doplň skutečné heslo Web uživatele
$DB_CHARSET = 'utf8mb4';

// Vytvoření připojení přes PDO (bezpečný způsob práce s DB v PHP)
function getDbConnection(): PDO
{
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS, $DB_CHARSET;

    $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset={$DB_CHARSET}";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        return new PDO($dsn, $DB_USER, $DB_PASS, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Chyba připojení k databázi']);
        exit;
    }
}

// Společná hlavička pro všechny API odpovědi (JSON + povolení pro appku)
header('Content-Type: application/json; charset=utf-8');
