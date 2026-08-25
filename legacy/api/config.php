<?php
// =========================================================
// config.php - připojení k databázi (LEGACY — archivní kopie)
// Uprav si přihlašovací údaje podle svého hostingu!
// =========================================================
// ⚠️ ARCHIVOVÁNO: Toto je původní Wedos backend. Skutečná tajemství
// (Web3Forms key, Wedos DB host/name/user/password) byla ZÁMĚRNĚ
// ODSTRANĚNA — byla commitnuta v git historii (commit 4656add) a
// jsou veřejná na GitHubu. ROTUJ Wedos MySQL heslo a SMAŽ Web3Forms
// klíč. Nový backend běží přes Supabase + Resend (viz root repa).
// =========================================================

declare(strict_types=1);

// --- WEB3FORMS --- (SCRUBBED)
define('WEB3FORMS_KEY', '*** SCRUBBED — rotate/delete the original Web3Forms key ***');

// --- ÚDAJE K TVÉ DATABÁZI (Wedos - vevit.art) --- (SCRUBBED)
$DB_HOST = '*** SCRUBBED ***';
$DB_NAME = '*** SCRUBBED ***';
$DB_USER = '*** SCRUBBED ***';
$DB_PASS = '*** SCRUBBED — rotate the Wedos MySQL password (see git history, commit 4656add) ***';
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