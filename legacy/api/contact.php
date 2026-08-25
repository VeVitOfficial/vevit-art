<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

header('Access-Control-Allow-Origin: https://vevit.art');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

$fields = [
    'jmeno'     => filter_input(INPUT_POST, 'jmeno',     FILTER_SANITIZE_SPECIAL_CHARS),
    'email'     => filter_input(INPUT_POST, 'email',     FILTER_SANITIZE_EMAIL),
    'obor'      => filter_input(INPUT_POST, 'obor',      FILTER_SANITIZE_SPECIAL_CHARS),
    'obor_jiny' => filter_input(INPUT_POST, 'obor_jiny', FILTER_SANITIZE_SPECIAL_CHARS),
    'zprava'    => filter_input(INPUT_POST, 'zprava',    FILTER_SANITIZE_SPECIAL_CHARS),
    'botcheck'  => filter_input(INPUT_POST, 'botcheck',  FILTER_SANITIZE_SPECIAL_CHARS),
];

if (empty($fields['jmeno']) || empty($fields['email']) || empty($fields['zprava'])) {
    http_response_code(422);
    echo json_encode(['message' => 'Vyplňte prosím všechna povinná pole.']);
    exit;
}

$payload = array_filter($fields) + [
    'access_key' => WEB3FORMS_KEY,
    'subject'    => 'Nové přihlášení umělce | VeVit Art',
    'from_name'  => 'VeVit Art',
];

$ch = curl_init('https://api.web3forms.com/submit');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($payload),
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    CURLOPT_TIMEOUT        => 10,
]);

$body   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($status ?: 502);
echo $body ?: json_encode(['message' => 'Chyba při odesílání.']);
