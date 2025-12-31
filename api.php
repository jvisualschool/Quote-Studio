<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// 설정 파일 포함
require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // 타입 안전성 확보
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// 랜덤 명언 1개 가져오기
// is_translated = 1 인 것 중에서 우선적으로 가져오되, 없으면 아무거나
// (지금은 100% 번역되었으므로 상관없음)
$sql = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";
$stmt = $pdo->query($sql);
$quote = $stmt->fetch(PDO::FETCH_ASSOC);

if ($quote) {
    // 통계 정보
    $totalStmt = $pdo->query("SELECT COUNT(*) as count FROM quotes");
    $totalCount = $totalStmt->fetch()['count'];
    
    $transStmt = $pdo->query("SELECT COUNT(*) as count FROM quotes WHERE is_translated = 1");
    $transCount = $transStmt->fetch()['count'];

    // Unknown 작가 처리
    $isUnknown = (strtolower(trim($quote['author'])) === 'unknown');
    
    // 저자 이미지 결정 - 모든 경우에 quote1.svg를 기본 이미지로 사용
    $defaultImage = 'https://jvibeschool.org/QUOTE/quote1.svg';
    $authorImage = !empty($quote['author_image']) ? $quote['author_image'] : $defaultImage;
    
    // 한국어 작가명 처리
    $authorKo = $isUnknown ? '작가 미상' : $quote['author_ko'];

    // JSON 응답 생성
    // 프론트엔드에서 사용하는 키 이름과 매칭
    $response = [
        'id' => $quote['id'],
        'q' => $quote['quote_original'],       // 영문 명언
        'a' => $quote['author'],               // 영문 저자
        'ko_q' => $quote['quote_translated'],  // 한글 명언
        'author_ko' => $authorKo,              // 한글 저자 (Unknown이면 "작가 미상")
        'author_image' => $authorImage,        // 저자 이미지 (Unknown이면 quote1.svg)
        
        // 하위 호환성 (필요할 경우)
        'image_url' => $authorImage,
        
        'is_translated' => (bool)$quote['is_translated'],
        'total_count' => $totalCount,
        'translated_count' => $transCount
    ];

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['error' => 'No quotes found']);
}
?>
