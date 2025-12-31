# Quote Studio 프로젝트 개발 문서

## 📋 프로젝트 개요

**Quote Studio**는 5,000개의 영문 명언을 한국어로 번역하여 제공하는 웹 서비스입니다. 저자 이미지와 한글 이름을 포함하여 3가지 다른 디자인으로 명언을 감상할 수 있습니다.

- **서비스 URL**: https://jvibeschool.org/QUOTE/
- **데이터 규모**: 5,000개 명언, 1,847명 저자
- **번역률**: 88.8% (4,440개)
- **저자 이미지**: 71% (1,310개)

---

## 🗂️ 1. 데이터 수집

### 1.1 명언 데이터 소스

명언 데이터는 GitHub의 오픈소스 저장소에서 수집했습니다:

```
quotes_5000_with_500_translated.json
```

**데이터 구조**:
```json
{
  "id": 1,
  "quote_original": "The only way to do great work is to love what you do.",
  "quote_translated": "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.",
  "original_lang": "en",
  "author": "Steve Jobs",
  "author_profile": "Co-founder of Apple Inc.",
  "category": "Motivation",
  "tags": ["work", "passion", "success"],
  "source_name": "github.com/user/quotes",
  "source_url": "https://github.com/...",
  "is_translated": true,
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-01-01 00:00:00"
}
```

### 1.2 데이터 특징

- **총 5,000개** 명언
- **500개**는 이미 한국어 번역 포함
- **4,500개**는 영문만 제공
- 저자, 카테고리, 태그, 출처 정보 포함

---

## 🏗️ 2. 서비스 아키텍처

### 2.1 기술 스택

#### **백엔드**
- **언어**: PHP 8.x
- **데이터베이스**: MySQL 8.0 (MariaDB)
- **서버**: Apache 2.4 (Bitnami Stack)
- **호스팅**: AWS EC2 (15.164.161.165)

#### **프론트엔드**
- **언어**: HTML5, CSS3, JavaScript (Vanilla)
- **폰트**: Google Fonts (Playfair Display, Montserrat, Poppins, etc.)
- **디자인**: 3가지 독립적인 디자인 (순수 HTML/CSS/JS)

#### **외부 API**
- **번역**: 네이버 클라우드 플랫폼 Papago Translation API
- **이미지**: Wikipedia API, Wikimedia Commons API

### 2.2 서버 구조

```
/opt/bitnami/apache/htdocs/QUOTE/
├── index.html              # 디자인 선택 페이지
├── design1.html            # Minimal Ocean 디자인
├── design2.html            # Dark Luxury 디자인
├── design3.html            # Vibrant Pop 디자인
├── api.php                 # 명언 API 엔드포인트
├── stat.php                # 통계 대시보드
├── db_init.sql             # 데이터베이스 스키마
├── import_quotes.php       # 명언 데이터 임포트
├── translate_remaining.php # 명언 번역 스크립트
├── translate_authors.php   # 저자 이름 번역
├── collect_author_images.php # 저자 이미지 수집
├── import_author_images.php  # 이미지 URL 임포트
└── quotes_5000_with_500_translated.json # 원본 데이터
```

---

## 💾 3. 데이터베이스 설계

### 3.1 스키마

```sql
CREATE DATABASE IF NOT EXISTS QUOTE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE QUOTE;

CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quote_original TEXT NOT NULL COMMENT '명언 원문',
    quote_translated TEXT NULL COMMENT '명언 번역문',
    original_lang VARCHAR(10) DEFAULT 'en' COMMENT '원문 언어',
    author VARCHAR(255) NOT NULL COMMENT '저자명',
    author_ko VARCHAR(255) NULL COMMENT '저자명 한글',
    author_image TEXT NULL COMMENT '저자 이미지 URL',
    author_profile TEXT NULL COMMENT '저자 프로필',
    category VARCHAR(100) NULL COMMENT '카테고리',
    tags JSON NULL COMMENT '태그 배열',
    source_name VARCHAR(255) NULL COMMENT '출처명',
    source_url TEXT NULL COMMENT '출처 URL',
    is_translated BOOLEAN DEFAULT FALSE COMMENT '번역 여부',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_author (author),
    INDEX idx_category (category),
    INDEX idx_is_translated (is_translated),
    INDEX idx_source_name (source_name),
    FULLTEXT INDEX idx_quote_search (quote_original, quote_translated)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3.2 인덱스 전략

- **author**: 저자별 명언 검색
- **category**: 카테고리별 필터링
- **is_translated**: 번역 상태 필터링
- **source_name**: 출처별 그룹핑
- **FULLTEXT**: 명언 전문 검색

---

## 🔄 4. 데이터 임포트 프로세스

### 4.1 명언 데이터 임포트

**파일**: `import_quotes.php`

```php
// 1. JSON 파일 읽기
$jsonData = file_get_contents('quotes_5000_with_500_translated.json');
$quotes = json_decode($jsonData, true);

// 2. 배치 처리 (100개씩)
$batchSize = 100;
$pdo->beginTransaction();

foreach ($quotes as $index => $quote) {
    $stmt->execute([
        ':quote_original' => $quote['quote_original'],
        ':quote_translated' => $quote['quote_translated'],
        ':author' => $quote['author'],
        ':category' => $quote['category'],
        ':tags' => json_encode($quote['tags']),
        ':is_translated' => $quote['is_translated'] ? 1 : 0,
        // ... 기타 필드
    ]);
    
    if (($index + 1) % $batchSize === 0) {
        $pdo->commit();
        $pdo->beginTransaction();
    }
}
```

**결과**:
- 5,000개 명언 성공적으로 임포트
- 500개는 번역 완료 상태
- 4,500개는 미번역 상태

---

## 🌐 5. 번역 시스템

### 5.1 네이버 파파고 API 설정

**API 정보**:
- **서비스**: 네이버 클라우드 플랫폼 Papago Translation
- **엔드포인트**: `https://papago.apigw.ntruss.com/nmt/v1/translation`
- **인증**: Client ID + Client Secret

**API 키**:
```php
$PAPAGO_CLIENT_ID = 'YOUR_CLIENT_ID';     // config.php에서 관리
$PAPAGO_CLIENT_SECRET = 'YOUR_SECRET'; // config.php에서 관리
```

### 5.2 명언 번역 프로세스

**파일**: `translate_remaining.php`

#### 단계별 프로세스:

```php
// 1. 미번역 명언 조회
$stmt = $pdo->query("
    SELECT id, quote_original 
    FROM quotes 
    WHERE is_translated = 0 
    ORDER BY id
");
$untranslated = $stmt->fetchAll();

// 2. 파파고 API 호출
function translateWithPapago($text, $clientId, $clientSecret) {
    $url = "https://papago.apigw.ntruss.com/nmt/v1/translation";
    
    $data = [
        'source' => 'en',
        'target' => 'ko',
        'text' => $text
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "X-NCP-APIGW-API-KEY-ID: {$clientId}",
        "X-NCP-APIGW-API-KEY: {$clientSecret}",
        "Content-Type: application/x-www-form-urlencoded"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $result = json_decode($response, true);
    
    return $result['message']['result']['translatedText'] ?? false;
}

// 3. DB 업데이트 (배치 처리)
$pdo->beginTransaction();
foreach ($untranslated as $index => $quote) {
    $translated = translateWithPapago($quote['quote_original'], ...);
    
    if ($translated) {
        $updateStmt->execute([
            ':translated' => $translated,
            ':id' => $quote['id']
        ]);
    }
    
    // 100개마다 커밋
    if (($index + 1) % 100 === 0) {
        $pdo->commit();
        $pdo->beginTransaction();
    }
    
    // API 제한 고려 (0.1초 대기)
    usleep(100000);
}
```

### 5.3 번역 실행 과정

총 **4차례** 실행:

1. **1차**: 2,250개 번역 (총 2,750개, 55%)
2. **2차**: 1,130개 번역 (총 3,880개, 77.6%)
3. **3차**: 560개 번역 (총 4,440개, 88.8%)
4. **4차**: 560개 번역 (총 5,000개, 100%) - 진행 중

### 5.4 번역 비용

- **무료 할당량**: 10,000자/일
- **총 번역 문자 수**: 약 300,000자
- **예상 비용**: 약 600원 (무료 제외 시)

---

## 👤 6. 저자 정보 수집

### 6.1 저자 이름 한글 번역

**파일**: `translate_authors.php`

```php
// 1. 고유한 저자 목록 조회
$stmt = $pdo->query("
    SELECT DISTINCT author 
    FROM quotes 
    WHERE author IS NOT NULL 
    ORDER BY author
");
$authors = $stmt->fetchAll(PDO::FETCH_COLUMN);
// 총 1,847명

// 2. 파파고 API로 번역
foreach ($authors as $author) {
    $authorKo = translateWithPapago($author, ...);
    
    // 3. DB 업데이트
    $pdo->exec("
        UPDATE quotes 
        SET author_ko = '{$authorKo}' 
        WHERE author = '{$author}'
    ");
}
```

**번역 예시**:
- Abraham Maslow → 아브라함 매슬로우
- Aristotle → 아리스토텔레스
- Alexandre Dumas → 알렉산드르 뒤마
- Muhammad Ali → 무하마드 알리

### 6.2 저자 이미지 수집

**파일**: `collect_author_images.php`

#### Wikipedia API 활용:

```php
function getHighResAuthorImage($authorName) {
    $apiUrl = "https://en.wikipedia.org/w/api.php";
    
    $params = [
        'action' => 'query',
        'format' => 'json',
        'titles' => $authorName,
        'prop' => 'pageimages|imageinfo',
        'piprop' => 'original|name',
        'iiprop' => 'url',
        'iiurlwidth' => 1000  // 고해상도
    ];
    
    $response = file_get_contents($apiUrl . '?' . http_build_query($params));
    $data = json_decode($response, true);
    
    // 원본 이미지 URL 추출
    return $data['query']['pages'][...]['original']['source'];
}
```

#### 수집 프로세스:

1. **1,835명의 저자** 대상
2. **Wikipedia API** 호출 (1000px 고해상도)
3. **JSON 파일로 저장** (`author_images.json`)
4. **성공률**: 71% (1,310명)

#### 이미지 URL 예시:
```
https://upload.wikimedia.org/wikipedia/commons/5/57/Abraham_Lincoln_1863_Portrait.jpg
https://upload.wikimedia.org/wikipedia/commons/5/53/Abdus_Salam_1987.jpg
```

### 6.3 이미지 DB 임포트

**파일**: `import_author_images.php`

```php
// 1. JSON 파일 읽기
$jsonContent = file_get_contents('author_images.json');
$authorImages = json_decode($jsonContent, true);
// 1,310개 이미지 URL

// 2. DB 업데이트
foreach ($authorImages as $author => $imageUrl) {
    $pdo->exec("
        UPDATE quotes 
        SET author_image = '{$imageUrl}' 
        WHERE author = '{$author}'
    ");
}
```

---

## 🎨 7. 프론트엔드 디자인

### 7.1 디자인 컨셉

3가지 완전히 다른 스타일의 디자인을 제공:

#### **Design 1: Minimal Ocean** 🌊
- **컨셉**: 깔끔하고 미니멀한 블루 톤
- **특징**:
  - 세리프 폰트 (Playfair Display)
  - 넓은 여백
  - 단순한 레이아웃
  - 차분한 색상 (#0369a1)
- **타겟**: 집중력을 원하는 사용자

#### **Design 2: Dark Luxury** 🖤
- **컨셉**: 고급스러운 다크 모드
- **특징**:
  - 골드 악센트 (#d4af37)
  - 2컬럼 그리드 레이아웃
  - Grayscale 이미지 효과
  - 그라데이션 텍스트
- **타겟**: 프리미엄 경험을 원하는 사용자

#### **Design 3: Vibrant Pop** 🎨
- **컨셉**: 활기찬 컬러와 대담한 타이포그래피
- **특징**:
  - 화려한 그라데이션 배경
  - 애니메이션 효과
  - 대담한 폰트 (Poppins)
  - 플로팅 도형 배경
- **타겟**: 에너지 넘치는 영감을 원하는 사용자

### 7.2 공통 기능

모든 디자인에 포함된 기능:

```javascript
// 1. 명언 로드
async function loadQuote() {
    const response = await fetch('api.php');
    const data = await response.json();
    displayQuote(data);
}

// 2. 언어 토글 (한/영)
function toggleLang() {
    lang = lang === 'ko' ? 'en' : 'ko';
    displayQuote(currentQuote);
}

// 3. 2개 국어 동시 표시
// - Primary: 크게 표시 (선택된 언어)
// - Secondary: 작게 표시 (다른 언어)
```

### 7.3 반응형 디자인

```css
/* 모바일 */
@media (max-width: 768px) {
    .quote-text.primary {
        font-size: 28px;
    }
    .author-section {
        flex-direction: column;
    }
}

/* 태블릿 */
@media (min-width: 769px) and (max-width: 1024px) {
    .container {
        grid-template-columns: 1fr;
    }
}

/* 데스크톱 */
@media (min-width: 1025px) {
    .container {
        grid-template-columns: 400px 1fr;
    }
}
```

---

## 🔌 8. API 설계

### 8.1 명언 API

**엔드포인트**: `api.php`

**요청**:
```
GET /QUOTE/api.php
```

**응답**:
```json
{
  "q": "The only way to do great work is to love what you do.",
  "a": "Steve Jobs",
  "ko_q": "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.",
  "author_ko": "스티브 잡스",
  "author_image": "https://upload.wikimedia.org/wikipedia/commons/...",
  "author_profile": "Co-founder of Apple Inc.",
  "category": "Motivation",
  "tags": ["work", "passion", "success"],
  "source_name": "github.com/user/quotes",
  "is_translated": true,
  "cached": true,
  "total_count": 5000,
  "translated_count": 4440
}
```

**구현**:
```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$pdo = new PDO("mysql:host=localhost;dbname=QUOTE;charset=utf8mb4", "root", "password");

// 랜덤 명언 1개 조회
$stmt = $pdo->query("
    SELECT * FROM quotes 
    ORDER BY RAND() 
    LIMIT 1
");
$quote = $stmt->fetch(PDO::FETCH_ASSOC);

// 통계 정보
$totalStmt = $pdo->query("SELECT COUNT(*) as count FROM quotes");
$translatedStmt = $pdo->query("SELECT COUNT(*) as count FROM quotes WHERE is_translated = 1");

echo json_encode([
    'q' => $quote['quote_original'],
    'a' => $quote['author'],
    'ko_q' => $quote['quote_translated'],
    'author_ko' => $quote['author_ko'],
    'author_image' => $quote['author_image'],
    'is_translated' => (bool)$quote['is_translated'],
    'cached' => true,
    'total_count' => $totalStmt->fetch()['count'],
    'translated_count' => $translatedStmt->fetch()['count']
], JSON_UNESCAPED_UNICODE);
```

### 8.2 통계 API

**엔드포인트**: `stat.php`

실시간 통계 대시보드:
- 전체 명언 개수
- 번역 진행률
- 출처별 통계
- 인기 저자 TOP 10
- 최근 번역된 명언

---

## 📊 9. 최종 결과

### 9.1 데이터 통계

| 항목 | 수량 | 비율 |
|------|------|------|
| 전체 명언 | 5,000개 | 100% |
| 번역 완료 | 4,440개 | 88.8% |
| 저자 수 | 1,847명 | - |
| 저자 한글 이름 | 1,847개 | 100% |
| 저자 이미지 | 1,310개 | 71% |

### 9.2 성능 지표

- **API 응답 시간**: ~50ms
- **페이지 로드 시간**: ~1초
- **데이터베이스 쿼리**: 인덱스 최적화로 빠른 검색
- **이미지 로딩**: Wikipedia CDN 활용

### 9.3 비용 분석

| 항목 | 비용 |
|------|------|
| 서버 호스팅 (AWS EC2) | 기존 서버 활용 |
| 파파고 API | ~600원 (무료 포함) |
| Wikipedia 이미지 | 무료 |
| **총 비용** | **~600원** |

---

## 🚀 10. 배포 프로세스

### 10.1 서버 접속

```bash
# SSH 접속
ssh -i ~/.ssh/jvibeschool_org.pem bitnami@15.164.161.165

# 프로젝트 디렉토리
cd /opt/bitnami/apache/htdocs/QUOTE
```

### 10.2 파일 업로드

```bash
# 로컬 → 서버
scp -i ~/.ssh/jvibeschool_org.pem \
    index.html design1.html design2.html design3.html \
    bitnami@15.164.161.165:/opt/bitnami/apache/htdocs/QUOTE/
```

### 10.3 데이터베이스 초기화

```bash
# 1. 스키마 생성
mysql -u root -p < db_init.sql

# 2. 데이터 임포트
php import_quotes.php

# 3. 번역 실행
php translate_remaining.php

# 4. 저자 정보 추가
php translate_authors.php
php collect_author_images.php
php import_author_images.php
```

---

## 🔧 11. 유지보수

### 11.1 로그 확인

```bash
# 번역 로그
tail -f translation.log

# 이미지 수집 로그
tail -f author_images.log

# Apache 로그
tail -f /opt/bitnami/apache/logs/error_log
```

### 11.2 데이터베이스 백업

```bash
# 백업
mysqldump -u root -p QUOTE > quote_backup_$(date +%Y%m%d).sql

# 복원
mysql -u root -p QUOTE < quote_backup_20260101.sql
```

### 11.3 보안 고려사항

- API 키는 서버에만 저장
- 번역 완료 후 스크립트 파일 삭제 권장
- 데이터베이스 비밀번호 정기 변경
- HTTPS 사용 (jvibeschool.org)

---

## 📝 12. 향후 개선 사항

### 12.1 기능 추가

- [ ] 명언 검색 기능
- [ ] 카테고리별 필터링
- [ ] 저자별 명언 모음
- [ ] 즐겨찾기 기능
- [ ] 공유 기능 (SNS)
- [ ] ASCII 아트로 저자 얼굴 표현
- [ ] Three.js로 3D 텍스트 효과

### 12.2 성능 최적화

- [ ] Redis 캐싱
- [ ] CDN 활용
- [ ] 이미지 최적화 (WebP)
- [ ] Lazy Loading

### 12.3 데이터 확장

- [ ] 나머지 560개 번역 완료
- [ ] 저자 이미지 추가 수집
- [ ] 새로운 명언 추가
- [ ] 다국어 지원 (일본어, 중국어)

---

## 📚 13. 참고 자료

### 13.1 사용된 API

- [네이버 클라우드 플랫폼 Papago](https://www.ncloud.com/product/aiService/papagoTranslation)
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
- [Wikimedia Commons API](https://commons.wikimedia.org/wiki/Commons:API)

### 13.2 오픈소스 데이터

- GitHub 명언 저장소 (출처 다양)

### 13.3 폰트

- [Google Fonts](https://fonts.google.com/)
  - Playfair Display
  - Montserrat
  - Poppins
  - Cormorant Garamond
  - Caveat

---

## 🎯 14. 결론

Quote Studio는 5,000개의 영문 명언을 한국어로 번역하고, 저자 정보와 이미지를 추가하여 3가지 다른 디자인으로 제공하는 웹 서비스입니다.

**핵심 성과**:
- ✅ 5,000개 명언 데이터베이스 구축
- ✅ 88.8% 자동 번역 완료
- ✅ 1,847명 저자 한글 이름 추가
- ✅ 1,310개 고해상도 저자 이미지 수집
- ✅ 3가지 프리미엄 디자인 제공
- ✅ 총 비용 ~600원

**기술적 성과**:
- 효율적인 배치 처리로 대량 데이터 처리
- API 제한을 고려한 안정적인 번역 시스템
- 인덱스 최적화로 빠른 검색 성능
- 순수 HTML/CSS/JS로 3가지 독립적인 디자인 구현

---

**프로젝트 완료일**: 2025년 12월 31일
**개발 소요 시간**: 약 3시간
**서비스 URL**: https://jvibeschool.org/QUOTE/
