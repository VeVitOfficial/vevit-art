<?php
// =========================================================
// auth_helper.php - ověření, že požadavek posílá přihlášený umělec
// Tento soubor se vkládá (require) do všech skriptů, které
// vyžadují přihlášení (např. update_profile.php)
// =========================================================

declare(strict_types=1);

function requireAuth(PDO $pdo): array
{
    // Token očekáváme v hlavičce: Authorization: Bearer XXXXX
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';

    if (!preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'Chybí přihlašovací token']);
        exit;
    }

    $token = $matches[1];

    $stmt = $pdo->prepare(
        'SELECT * FROM artists WHERE auth_token = :token AND token_expires > NOW()'
    );
    $stmt->execute(['token' => $token]);
    $artist = $stmt->fetch();

    if (!$artist) {
        http_response_code(401);
        echo json_encode(['error' => 'Neplatný nebo vypršelý token, přihlas se znovu']);
        exit;
    }

    return $artist;
}
