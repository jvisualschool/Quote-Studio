<?php
/**
 * 명언 데이터베이스 통계 페이지
 */

// 설정 파일 포함
require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    // 전체 통계
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM quotes");
    $totalQuotes = $stmt->fetch()['total'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as translated FROM quotes WHERE is_translated = 1");
    $translatedCount = $stmt->fetch()['translated'];
    
    $untranslatedCount = $totalQuotes - $translatedCount;
    $translationProgress = $totalQuotes > 0 ? round(($translatedCount / $totalQuotes) * 100, 2) : 0;
    
    // 출처별 통계
    $stmt = $pdo->query("
        SELECT 
            source_name,
            COUNT(*) as count,
            SUM(is_translated) as translated,
            ROUND((SUM(is_translated) / COUNT(*)) * 100, 1) as progress
        FROM quotes 
        GROUP BY source_name 
        ORDER BY count DESC
    ");
    $sourceStats = $stmt->fetchAll();
    
    // 저자별 통계 (상위 10명)
    $stmt = $pdo->query("
        SELECT 
            author,
            COUNT(*) as count,
            SUM(is_translated) as translated
        FROM quotes 
        GROUP BY author 
        ORDER BY count DESC 
        LIMIT 10
    ");
    $authorStats = $stmt->fetchAll();
    
    // 최근 번역된 명언 (5개)
    $stmt = $pdo->query("
        SELECT 
            id,
            author,
            quote_original,
            quote_translated,
            updated_at
        FROM quotes 
        WHERE is_translated = 1 
        ORDER BY updated_at DESC 
        LIMIT 5
    ");
    $recentTranslations = $stmt->fetchAll();
    
} catch (PDOException $e) {
    die("데이터베이스 연결 실패: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>명언 데이터베이스 통계 - QUOTE</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-card h3 {
            font-size: 0.9rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .stat-card .value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        
        .stat-card .label {
            font-size: 0.9rem;
            color: #999;
        }
        
        .progress-bar {
            width: 100%;
            height: 10px;
            background: #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.5s ease;
        }
        
        .section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .section h2 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #667eea;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .quote-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
        }
        
        .quote-box .original {
            font-style: italic;
            color: #555;
            margin-bottom: 8px;
        }
        
        .quote-box .translated {
            color: #333;
            font-weight: 500;
        }
        
        .quote-box .meta {
            font-size: 0.85rem;
            color: #999;
            margin-top: 8px;
        }
        
        .refresh-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            display: block;
            margin: 20px auto;
        }
        
        .refresh-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 20px rgba(102, 126, 234, 0.6);
        }
        
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        
        .badge-success {
            background: #d4edda;
            color: #155724;
        }
        
        .badge-warning {
            background: #fff3cd;
            color: #856404;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .stat-card .value {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 명언 데이터베이스 통계</h1>
            <p>실시간 번역 진행 상황 및 데이터 분석</p>
        </div>
        
        <!-- 주요 통계 카드 -->
        <div class="stats-grid">
            <div class="stat-card">
                <h3>전체 명언</h3>
                <div class="value"><?= number_format($totalQuotes) ?></div>
                <div class="label">Total Quotes</div>
            </div>
            
            <div class="stat-card">
                <h3>번역 완료</h3>
                <div class="value"><?= number_format($translatedCount) ?></div>
                <div class="label">Translated</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: <?= $translationProgress ?>%"></div>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>번역 대기</h3>
                <div class="value"><?= number_format($untranslatedCount) ?></div>
                <div class="label">Pending</div>
            </div>
            
            <div class="stat-card">
                <h3>진행률</h3>
                <div class="value"><?= $translationProgress ?>%</div>
                <div class="label">Progress</div>
            </div>
        </div>
        
        <!-- 출처별 통계 -->
        <div class="section">
            <h2>📚 출처별 통계</h2>
            <table>
                <thead>
                    <tr>
                        <th>출처</th>
                        <th>전체</th>
                        <th>번역 완료</th>
                        <th>진행률</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($sourceStats as $source): ?>
                    <tr>
                        <td><?= htmlspecialchars($source['source_name']) ?></td>
                        <td><?= number_format($source['count']) ?>개</td>
                        <td><?= number_format($source['translated']) ?>개</td>
                        <td>
                            <span class="badge <?= $source['progress'] == 100 ? 'badge-success' : 'badge-warning' ?>">
                                <?= $source['progress'] ?>%
                            </span>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <!-- 저자별 통계 -->
        <div class="section">
            <h2>✍️ 인기 저자 TOP 10</h2>
            <table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>저자</th>
                        <th>명언 수</th>
                        <th>번역 완료</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($authorStats as $index => $author): ?>
                    <tr>
                        <td><?= $index + 1 ?></td>
                        <td><?= htmlspecialchars($author['author']) ?></td>
                        <td><?= number_format($author['count']) ?>개</td>
                        <td><?= number_format($author['translated']) ?>개</td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <!-- 최근 번역된 명언 -->
        <div class="section">
            <h2>🆕 최근 번역된 명언</h2>
            <?php foreach ($recentTranslations as $quote): ?>
            <div class="quote-box">
                <div class="original">"<?= htmlspecialchars($quote['quote_original']) ?>"</div>
                <div class="translated">"<?= htmlspecialchars($quote['quote_translated']) ?>"</div>
                <div class="meta">
                    — <?= htmlspecialchars($quote['author']) ?> 
                    (ID: <?= $quote['id'] ?>, 
                    번역 시간: <?= $quote['updated_at'] ?>)
                </div>
            </div>
            <?php endforeach; ?>
        </div>
        
        <button class="refresh-btn" onclick="location.reload()">
            🔄 새로고침
        </button>
    </div>
    
    <script>
        // 자동 새로고침 (30초마다)
        setTimeout(() => {
            location.reload();
        }, 30000);
    </script>
</body>
</html>
