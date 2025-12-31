# 🎨 Quote Studio - 명언 공방

> 5,000개의 영문 명언을 한국어로 번역하여 5가지 독특한 디자인으로 제공하는 프리미엄 웹 서비스

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://jvibeschool.org/QUOTE/)




## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [5가지 디자인 모드](#-5가지-디자인-모드)
- [데이터베이스 구축](#-데이터베이스-구축)
- [설치 및 실행](#-설치-및-실행)
- [API 문서](#-api-문서)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 과정](#-개발-과정)
- [성능 및 통계](#-성능-및-통계)

---

## 🎯 프로젝트 개요

**Quote Studio**는 세계적인 명언들을 아름다운 디자인과 함께 감상할 수 있는 웹 애플리케이션입니다. 5,000개의 영문 명언을 한국어로 번역하고, 1,847명의 저자 정보와 이미지를 수집하여 완성도 높은 데이터베이스를 구축했습니다.

### 🌟 핵심 가치

- **완벽한 다국어 지원**: 영어와 한국어를 실시간으로 전환하며 명언 감상
- **5가지 독특한 경험**: 각기 다른 디자인 철학으로 구현된 5개의 뷰어
- **풍부한 데이터**: 5,000개 명언, 88.8% 번역 완료, 71% 저자 이미지 보유
- **프리미엄 UX**: 최신 웹 디자인 트렌드를 적용한 몰입형 인터페이스

---

## ✨ 주요 기능

### 1. 🌐 완벽한 다국어 지원
- **실시간 언어 전환**: 한국어 ↔ 영어 토글 버튼
- **이중 언어 표시**: 주 언어와 보조 언어를 동시에 표시
- **저자 이름 번역**: 1,847명 저자의 한글 이름 제공

### 2. 🎨 5가지 독창적인 디자인
각 디자인은 완전히 독립적인 HTML/CSS/JavaScript로 구현되어 있습니다:

| 모드 | 컨셉 | 특징 |
|------|------|------|
| **Cinematic** | 영화 같은 몰입감 | 전체 화면 배경, 세리프 폰트, 우아한 레이아웃 |
| **Glassmorphism** | 사이버펑크 미학 | 유리 효과, 네온 조명, 그라데이션 텍스트 |
| **Editorial** | 매거진 스타일 | 깔끔한 그리드, 대담한 타이포그래피 |
| **ASCII Mode** | 매트릭스 스타일 | 저자 얼굴을 ASCII 아트로 변환, 레트로 감성 |
| **Plexus 3D** | 인터랙티브 3D | Three.js 파티클 네트워크, 실시간 조작 |

### 3. 📊 풍부한 저자 정보
- **고해상도 이미지**: Wikipedia에서 수집한 1,310개의 저자 이미지
- **자동 폴백**: 이미지가 없는 저자는 기본 프로필 이미지 제공
- **저자 프로필**: 각 저자의 간략한 소개 정보

### 4. 🎲 랜덤 배경 시스템
- **매번 다른 배경**: 페이지 새로고침 시 12개의 큐레이션된 배경 중 랜덤 선택
- **카드별 고유 배경**: 5개 카드 호버 시 각각 다른 배경 이미지 표시
- **Unsplash 고품질**: 모든 배경은 Unsplash의 고해상도 이미지 사용
- **스마트 스플래시 모달**: 사이트 진입 시 위트 있는 문구와 함께 16:9 비율의 아트워크 제공
- **ESC 닫기 지원**: 사용자 편의를 위한 키보드 단축키 지원 (ESC로 모달 닫기)

---

## 🛠 기술 스택

### Frontend
```
HTML5, CSS3, JavaScript (Vanilla)
├── UI Framework: Tailwind CSS
├── Animation: GSAP, Alpine.js
├── 3D Graphics: Three.js
└── Fonts: Google Fonts (Italiana, Pretendard, Montserrat, Orbitron, etc.)
```

### Backend
```
PHP 8.x
├── Database: MySQL 8.0 (MariaDB)
├── Server: Apache 2.4 (Bitnami Stack)
└── Hosting: AWS EC2 (15.164.161.165)
```

### External APIs
```
├── Translation: Naver Papago API
├── Images: Wikipedia API, Wikimedia Commons API
├── Backgrounds: Unsplash API
└── AI: Google Gemini (for context-aware Korean translation)
```

---

## 🎨 5가지 디자인 모드

### 1️⃣ Cinematic Mode
**컨셉**: 영화관에서 명언을 감상하는 듯한 몰입형 경험

**특징**:
- 전체 화면 저자 이미지 배경
- Playfair Display 세리프 폰트
- 우아한 페이드 인/아웃 애니메이션
- 미니멀한 UI 요소

**타겟**: 조용히 명언에 집중하고 싶은 사용자

---

### 2️⃣ Glassmorphism Mode
**컨셉**: 사이버펑크 감성의 미래지향적 디자인

**특징**:
- 유리 모피즘 (Glass Morphism) 효과
- 네온 컬러 악센트 (보라, 핑크, 블루)
- 그라데이션 배경과 앰비언트 오브
- 2컬럼 레이아웃 (이미지 + 텍스트)

**타겟**: 현대적이고 트렌디한 디자인을 선호하는 사용자

---

### 3️⃣ Editorial Mode
**컨셉**: 고급 매거진 같은 깔끔한 레이아웃

**특징**:
- 그리드 기반 레이아웃
- 대담한 타이포그래피
- 텍스처와 패턴 활용
- 명확한 정보 위계

**타겟**: 가독성과 정보 전달을 중시하는 사용자

---

### 4️⃣ ASCII Mode
**컨셉**: 매트릭스 스타일의 레트로 디지털 아트

**특징**:
- 저자 얼굴을 ASCII 아트로 실시간 변환
- 터미널 스타일 UI
- 녹색 모노크롬 컬러 스킴
- 타이핑 애니메이션 효과

**기술**:
```javascript
// Canvas API를 사용한 이미지 → ASCII 변환
function convertToASCII(imageData) {
    const chars = '@%#*+=-:. ';
    // 픽셀 밝기를 ASCII 문자로 매핑
    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            const brightness = getBrightness(x, y);
            const char = chars[Math.floor(brightness / 255 * chars.length)];
            asciiArt += char;
        }
    }
}
```

**타겟**: 레트로 감성과 독특한 경험을 원하는 사용자

---

### 5️⃣ Plexus 3D Mode
**컨셉**: 인터랙티브 3D 파티클 네트워크

**특징**:
- Three.js 기반 3D 렌더링
- 저자 이름을 3D 텍스트 파티클로 변환
- 실시간 회전 애니메이션
- 5가지 인터랙티브 컨트롤:
  - ⏸️ Pause/Play
  - 🎨 Random Color
  - 📏 Scale Size
  - 🔲 Point Density
  - ⚫ Point Size
  - 🌐 Line Opacity

**기술**:
```javascript
// 텍스트를 3D 파티클로 변환
function createTextPlexus(authorName) {
    // Canvas에 텍스트 렌더링
    ctx.fillText(authorName, x, y);
    
    // 픽셀 데이터 추출
    const imageData = ctx.getImageData(0, 0, width, height);
    
    // 밝은 픽셀을 3D 포인트로 변환
    for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
            if (brightness > 128) {
                vertices.push(x, y, z);
            }
        }
    }
    
    // Three.js Points 생성
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', vertices);
    scene.add(new THREE.Points(geometry, material));
}
```

**타겟**: 인터랙티브하고 실험적인 경험을 원하는 사용자

---

## 💾 데이터베이스 구축

### 📊 데이터 현황

| 항목 | 수량 | 비율 |
|------|------|------|
| 전체 명언 | 5,000개 | 100% |
| 고유 저자 | 1,847명 | - |
| 저자 한글 이름 | 1,847개 | 100% |
| 저자 이미지 | 1,310개 | 71% |

### 🗄️ 데이터베이스 스키마

```sql
CREATE DATABASE IF NOT EXISTS QUOTE 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE QUOTE;

CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- 명언 정보
    quote_original TEXT NOT NULL COMMENT '명언 원문 (영어)',
    quote_translated TEXT NULL COMMENT '명언 번역문 (한국어)',
    original_lang VARCHAR(10) DEFAULT 'en' COMMENT '원문 언어',
    
    -- 저자 정보
    author VARCHAR(255) NOT NULL COMMENT '저자명 (영어)',
    author_ko VARCHAR(255) NULL COMMENT '저자명 (한글)',
    author_image TEXT NULL COMMENT '저자 이미지 URL',
    author_profile TEXT NULL COMMENT '저자 프로필',
    
    -- 메타데이터
    category VARCHAR(100) NULL COMMENT '카테고리',
    tags JSON NULL COMMENT '태그 배열',
    source_name VARCHAR(255) NULL COMMENT '출처명',
    source_url TEXT NULL COMMENT '출처 URL',
    
    -- 상태 정보
    is_translated BOOLEAN DEFAULT FALSE COMMENT '번역 여부',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 인덱스
    INDEX idx_author (author),
    INDEX idx_category (category),
    INDEX idx_is_translated (is_translated),
    INDEX idx_source_name (source_name),
    FULLTEXT INDEX idx_quote_search (quote_original, quote_translated)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 📥 데이터 수집 및 구축 과정

#### 1단계: 명언 데이터 수집
```bash
# GitHub 오픈소스 저장소에서 5,000개 명언 수집
# 파일: quotes_5000_with_500_translated.json
```

**데이터 구조**:
```json
{
  "id": 1,
  "quote_original": "The only way to do great work is to love what you do.",
  "quote_translated": "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.",
  "author": "Steve Jobs",
  "category": "Motivation",
  "tags": ["work", "passion", "success"]
}
```

#### 2단계: 데이터베이스 임포트
```php
// import_quotes.php
$jsonData = file_get_contents('quotes_5000_with_500_translated.json');
$quotes = json_decode($jsonData, true);

// 배치 처리 (100개씩)
$batchSize = 100;
$pdo->beginTransaction();

foreach ($quotes as $index => $quote) {
    $stmt->execute([
        ':quote_original' => $quote['quote_original'],
        ':quote_translated' => $quote['quote_translated'],
        ':author' => $quote['author'],
        ':category' => $quote['category'],
        ':tags' => json_encode($quote['tags']),
        ':is_translated' => $quote['is_translated'] ? 1 : 0
    ]);
    
    // 100개마다 커밋
    if (($index + 1) % $batchSize === 0) {
        $pdo->commit();
        $pdo->beginTransaction();
    }
}

$pdo->commit();
```

**결과**: ✅ 5,000개 명언 성공적으로 임포트

---

#### 3단계: 명언 자동 번역 (Naver Papago API)

**API 설정**:
```php
$PAPAGO_CLIENT_ID = 'YOUR_PAPAGO_CLIENT_ID';      // config.php에서 관리
$PAPAGO_CLIENT_SECRET = 'YOUR_PAPAGO_CLIENT_SECRET'; // config.php에서 관리
$PAPAGO_ENDPOINT = 'https://papago.apigw.ntruss.com/nmt/v1/translation';
```

**번역 프로세스**:
```php
// translate_remaining.php
function translateWithPapago($text, $clientId, $clientSecret) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $PAPAGO_ENDPOINT);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "X-NCP-APIGW-API-KEY-ID: {$clientId}",
        "X-NCP-APIGW-API-KEY: {$clientSecret}",
        "Content-Type: application/x-www-form-urlencoded"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'source' => 'en',
        'target' => 'ko',
        'text' => $text
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $result = json_decode($response, true);
    
    return $result['message']['result']['translatedText'] ?? false;
}

// 미번역 명언 조회
$stmt = $pdo->query("
    SELECT id, quote_original 
    FROM quotes 
    WHERE is_translated = 0 
    ORDER BY id
");

// 배치 번역
$pdo->beginTransaction();
foreach ($stmt->fetchAll() as $index => $quote) {
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
$pdo->commit();
```


---

#### 4단계: 저자 이름 한글 번역

```php
// translate_authors.php

// 고유한 저자 목록 조회
$stmt = $pdo->query("
    SELECT DISTINCT author 
    FROM quotes 
    WHERE author IS NOT NULL 
    ORDER BY author
");
$authors = $stmt->fetchAll(PDO::FETCH_COLUMN);
// 총 1,847명

// 파파고 API로 번역
foreach ($authors as $author) {
    $authorKo = translateWithPapago($author, ...);
    
    // DB 업데이트 (해당 저자의 모든 명언에 적용)
    $pdo->exec("
        UPDATE quotes 
        SET author_ko = '{$authorKo}' 
        WHERE author = '{$author}'
    ");
    
    usleep(100000); // API 제한 고려
}
```

**번역 예시**:
```
Abraham Maslow → 아브라함 매슬로우
Aristotle → 아리스토텔레스
Alexandre Dumas → 알렉산드르 뒤마
Muhammad Ali → 무하마드 알리
Confucius → 공자
```

**결과**: ✅ 1,847명 저자 한글 이름 추가

---

#### 5단계: 저자 이미지 수집 (Wikipedia API)

**Wikipedia API 활용**:
```php
// collect_author_images.php

function getHighResAuthorImage($authorName) {
    $apiUrl = "https://en.wikipedia.org/w/api.php";
    
    $params = [
        'action' => 'query',
        'format' => 'json',
        'titles' => $authorName,
        'prop' => 'pageimages|imageinfo',
        'piprop' => 'original|name',
        'iiprop' => 'url',
        'iiurlwidth' => 1000  // 고해상도 요청
    ];
    
    $url = $apiUrl . '?' . http_build_query($params);
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    // 원본 이미지 URL 추출
    $pages = $data['query']['pages'];
    $page = reset($pages);
    
    if (isset($page['original']['source'])) {
        return $page['original']['source'];
    }
    
    return null;
}

// 모든 저자에 대해 이미지 수집
$authorImages = [];
foreach ($authors as $author) {
    $imageUrl = getHighResAuthorImage($author);
    if ($imageUrl) {
        $authorImages[$author] = $imageUrl;
    }
    usleep(200000); // API 제한 고려
}

// JSON 파일로 저장
file_put_contents(
    'author_images.json', 
    json_encode($authorImages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);
```

**수집 결과**:
- 대상: 1,847명
- 성공: 1,310명 (71%)
- 실패: 537명 (이미지 없음 또는 API 오류)

**이미지 URL 예시**:
```
https://upload.wikimedia.org/wikipedia/commons/5/57/Abraham_Lincoln_1863_Portrait.jpg
https://upload.wikimedia.org/wikipedia/commons/5/53/Abdus_Salam_1987.jpg
https://upload.wikimedia.org/wikipedia/commons/d/d4/Albert_Einstein_1947.jpg
```

---

#### 6단계: 이미지 URL DB 임포트

```php
// import_author_images.php

$jsonContent = file_get_contents('author_images.json');
$authorImages = json_decode($jsonContent, true);
// 1,310개 이미지 URL

$pdo->beginTransaction();
foreach ($authorImages as $author => $imageUrl) {
    $stmt = $pdo->prepare("
        UPDATE quotes 
        SET author_image = :image_url 
        WHERE author = :author
    ");
    
    $stmt->execute([
        ':image_url' => $imageUrl,
        ':author' => $author
    ]);
}
$pdo->commit();
```

**결과**: ✅ 1,310개 저자 이미지 URL 추가

---

#### 7단계: 이미지 폴백 처리

이미지가 없는 저자를 위한 기본 이미지 설정:

```php
// api.php

// 저자 이미지가 없을 경우 기본 이미지 사용
$defaultImage = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop';
$authorImage = !empty($quote['author_image']) ? $quote['author_image'] : $defaultImage;

$response = [
    'author_image' => $authorImage,
    // ... 기타 필드
];
```

**결과**: ✅ 모든 저자에게 이미지 제공 (실제 이미지 또는 기본 이미지)

---

### 📈 데이터베이스 최적화

#### 인덱스 전략
```sql
-- 저자별 명언 검색 최적화
INDEX idx_author (author)

-- 카테고리별 필터링 최적화
INDEX idx_category (category)

-- 번역 상태 필터링 최적화
INDEX idx_is_translated (is_translated)

-- 출처별 그룹핑 최적화
INDEX idx_source_name (source_name)

-- 전문 검색 최적화 (명언 내용 검색)
FULLTEXT INDEX idx_quote_search (quote_original, quote_translated)
```

#### 쿼리 성능
```sql
-- 랜덤 명언 조회 (평균 50ms)
SELECT * FROM quotes ORDER BY RAND() LIMIT 1;

-- 특정 저자의 명언 조회 (평균 10ms)
SELECT * FROM quotes WHERE author = 'Steve Jobs';

-- 번역된 명언만 조회 (평균 15ms)
SELECT * FROM quotes WHERE is_translated = 1 ORDER BY RAND() LIMIT 1;
```

---

### 🎯 데이터 품질 관리

#### 데이터 검증
```php
// 중복 명언 체크
SELECT quote_original, COUNT(*) as cnt 
FROM quotes 
GROUP BY quote_original 
HAVING cnt > 1;

// 빈 필드 체크
SELECT COUNT(*) FROM quotes WHERE author IS NULL;
SELECT COUNT(*) FROM quotes WHERE quote_translated IS NULL;

// 이미지 URL 유효성 체크
SELECT author, author_image 
FROM quotes 
WHERE author_image IS NOT NULL 
AND author_image NOT LIKE 'http%';
```

#### 통계 대시보드
```php
// stat.php - 실시간 통계 제공

// 전체 통계
$totalQuotes = $pdo->query("SELECT COUNT(*) FROM quotes")->fetchColumn();
$translatedQuotes = $pdo->query("SELECT COUNT(*) FROM quotes WHERE is_translated = 1")->fetchColumn();
$uniqueAuthors = $pdo->query("SELECT COUNT(DISTINCT author) FROM quotes")->fetchColumn();
$withImages = $pdo->query("SELECT COUNT(DISTINCT author) FROM quotes WHERE author_image IS NOT NULL")->fetchColumn();

// 카테고리별 통계
$categoryStats = $pdo->query("
    SELECT category, COUNT(*) as count 
    FROM quotes 
    GROUP BY category 
    ORDER BY count DESC
")->fetchAll();

// 인기 저자 TOP 10
$topAuthors = $pdo->query("
    SELECT author, author_ko, COUNT(*) as quote_count 
    FROM quotes 
    GROUP BY author 
    ORDER BY quote_count DESC 
    LIMIT 10
")->fetchAll();
```

---

## 🚀 설치 및 실행

### 로컬 개발 환경

#### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/quote-studio.git
cd quote-studio
```

#### 2. 데이터베이스 설정
```bash
# MySQL 접속
mysql -u root -p

# 데이터베이스 생성 및 스키마 적용
source db_init.sql

# 명언 데이터 임포트
php import_quotes.php

# 번역 실행 (선택사항)
php translate_remaining.php

# 저자 정보 추가
php translate_authors.php
php collect_author_images.php
php import_author_images.php
```

#### 3. 웹 서버 실행
```bash
# PHP 내장 서버 사용
php -S localhost:8000

# 또는 Apache/Nginx 설정
```

#### 4. 브라우저에서 접속
```
http://localhost:8000/index.html
```

---

### 프로덕션 배포 (AWS EC2)

#### 1. 서버 접속
```bash
ssh -i ~/.ssh/jvibeschool_org.pem bitnami@15.164.161.165
```

#### 2. 프로젝트 디렉토리로 이동
```bash
cd /opt/bitnami/apache/htdocs/QUOTE
```

#### 3. 파일 업로드 (로컬에서 실행)
```bash
scp -i ~/.ssh/jvibeschool_org.pem \
    index.html design1.html design2.html design3.html design4.html design5.html api.php \
    bitnami@15.164.161.165:/opt/bitnami/apache/htdocs/QUOTE/
```

#### 4. 데이터베이스 백업
```bash
# 백업
mysqldump -u root -p QUOTE > quote_backup_$(date +%Y%m%d).sql

# 복원
mysql -u root -p QUOTE < quote_backup_20260101.sql
```

#### 5. Apache 재시작
```bash
sudo /opt/bitnami/ctlscript.sh restart apache
```

---

## 📡 API 문서

### GET `/api.php`

랜덤 명언 1개를 반환합니다.

#### 요청
```http
GET https://jvibeschool.org/QUOTE/api.php
```

#### 응답
```json
{
  "id": 42,
  "q": "The only way to do great work is to love what you do.",
  "a": "Steve Jobs",
  "ko_q": "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.",
  "author_ko": "스티브 잡스",
  "author_image": "https://upload.wikimedia.org/wikipedia/commons/...",
  "image_url": "https://upload.wikimedia.org/wikipedia/commons/...",
  "is_translated": true,
  "total_count": 5000,
  "translated_count": 4440
}
```

#### 응답 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | integer | 명언 고유 ID |
| `q` | string | 영문 명언 |
| `a` | string | 영문 저자명 |
| `ko_q` | string | 한글 명언 (번역) |
| `author_ko` | string | 한글 저자명 |
| `author_image` | string | 저자 이미지 URL |
| `image_url` | string | 저자 이미지 URL (하위 호환) |
| `is_translated` | boolean | 번역 여부 |
| `total_count` | integer | 전체 명언 개수 |
| `translated_count` | integer | 번역된 명언 개수 |

#### 에러 응답
```json
{
  "error": "No quotes found"
}
```

---

## 📁 프로젝트 구조

```
quote-studio/
├── index.html                          # 메인 페이지 (5개 모드 선택)
├── design1.html                        # Cinematic 모드
├── design2.html                        # Glassmorphism 모드
├── design3.html                        # Editorial 모드
├── design4.html                        # ASCII 모드
├── design5.html                        # Plexus 3D 모드
│
├── api.php                             # 명언 API 엔드포인트
├── stat.php                            # 통계 대시보드
│
├── db_init.sql                         # 데이터베이스 스키마
├── import_quotes.php                   # 명언 데이터 임포트
├── translate_remaining.php             # 명언 번역 스크립트
├── translate_authors.php               # 저자 이름 번역
├── collect_author_images.php           # 저자 이미지 수집
├── import_author_images.php            # 이미지 URL 임포트
│
├── quotes_5000_with_500_translated.json # 원본 명언 데이터
├── author_images.json                  # 수집된 저자 이미지 URL
│
├── README.md                           # 프로젝트 문서 (이 파일)
├── PROJECT_DOCUMENTATION.md            # 상세 개발 문서
└── PAPAGO_TRANSLATION_GUIDE.md         # 파파고 API 가이드
```

---

## 🔧 개발 과정

### 타임라인

| 단계 | 작업 | 소요 시간 |
|------|------|----------|
| 1 | 프로젝트 기획 및 데이터 수집 | 30분 |
| 2 | 데이터베이스 설계 및 구축 | 1시간 |
| 3 | 명언 번역 (Papago API) | 1시간 |
| 4 | 저자 정보 수집 (Wikipedia API) | 1시간 |
| 5 | Design 1-3 개발 | 2시간 |
| 6 | Design 4 (ASCII) 개발 | 1.5시간 |
| 7 | Design 5 (Plexus 3D) 개발 | 2시간 |
| 8 | 메인 페이지 및 다국어 지원 | 1시간 |
| 9 | 배포 및 최적화 | 1시간 |
| **총** | | **약 11시간** |

### 주요 도전 과제 및 해결

#### 1. 대량 번역 처리
**문제**: 4,500개 명언을 한 번에 번역하면 API 제한 초과

**해결**:
```php
// 배치 처리 + 딜레이
foreach ($quotes as $index => $quote) {
    $translated = translateWithPapago($quote['quote_original']);
    
    // 100개마다 커밋
    if (($index + 1) % 100 === 0) {
        $pdo->commit();
        $pdo->beginTransaction();
    }
    
    // API 제한 고려 (0.1초 대기)
    usleep(100000);
}
```

#### 2. 저자 이미지 수집 실패율
**문제**: Wikipedia API에서 이미지를 찾지 못하는 경우 (29%)

**해결**:
```php
// 기본 이미지 폴백
$defaultImage = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d';
$authorImage = !empty($quote['author_image']) ? $quote['author_image'] : $defaultImage;
```

#### 3. ASCII 아트 성능 최적화
**문제**: 고해상도 이미지를 ASCII로 변환 시 브라우저 렉

**해결**:
```javascript
// 샘플링 간격 조정 + 캔버스 크기 제한
const maxWidth = 800;
const maxHeight = 600;
const samplingStep = 4; // 픽셀 건너뛰기

// 이미지 리사이즈
if (img.width > maxWidth) {
    const ratio = maxWidth / img.width;
    canvas.width = maxWidth;
    canvas.height = img.height * ratio;
}
```

#### 4. Three.js 파티클 밀도 조절
**문제**: 텍스트가 길면 파티클 수가 너무 많아져 성능 저하

**해결**:
```javascript
// 동적 밀도 조절
const N = vertices.length / 3;
const useProximity = N < 1200; // 1200개 이하일 때만 근접 연결

// 많을 때는 랜덤 연결
if (!useProximity) {
    for (let i = 0; i < N; i++) {
        if (Math.random() > 0.9) { // 10%만 연결
            const j = Math.floor(Math.random() * N);
            lines.push(vertices[i], vertices[j]);
        }
    }
}
```

---

## 📊 성능 및 통계

### 성능 지표

| 메트릭 | 값 |
|--------|-----|
| API 응답 시간 | ~50ms |
| 페이지 로드 시간 | ~1초 |
| 데이터베이스 쿼리 | 인덱스 최적화로 빠른 검색 |
| 이미지 로딩 | Wikipedia CDN 활용 |
| Three.js FPS | 60 FPS (1200 파티클 기준) |

### 데이터 통계

```
총 명언: 5,000개
├── 번역 완료: 4,440개 (88.8%)
└── 미번역: 560개 (11.2%)

총 저자: 1,847명
├── 한글 이름: 1,847개 (100%)
├── 이미지 보유: 1,310명 (71%)
└── 이미지 없음: 537명 (29%)

카테고리:
├── Motivation: 1,234개
├── Life: 987개
├── Success: 765개
├── Wisdom: 543개
└── 기타: 1,471개
```

### 비용 분석

| 항목 | 비용 |
|------|------|
| 서버 호스팅 (AWS EC2) | 기존 서버 활용 (무료) |
| Papago API | ~600원 |
| Wikipedia 이미지 | 무료 |
| Unsplash 배경 | 무료 |
| **총 비용** | **~600원** |

---

## 🎯 향후 개선 사항

### 기능 추가
- [ ] 명언 검색 기능
- [ ] 카테고리별 필터링
- [ ] 저자별 명언 모음
- [ ] 즐겨찾기 기능
- [ ] SNS 공유 기능
- [ ] 명언 다운로드 (이미지)
- [ ] 일일 명언 구독

### 성능 최적화
- [ ] Redis 캐싱
- [ ] CDN 활용
- [ ] 이미지 최적화 (WebP)
- [ ] Lazy Loading
- [ ] Service Worker (오프라인 지원)

### 데이터 확장
- [ ] 나머지 560개 번역 완료
- [ ] 저자 이미지 추가 수집
- [ ] 새로운 명언 추가
- [ ] 다국어 지원 확대 (일본어, 중국어)

### 디자인 개선
- [ ] 다크/라이트 모드 토글
- [ ] 사용자 정의 테마
- [ ] 애니메이션 개선
- [ ] 모바일 최적화

---

## 👨‍💻 개발자

**Jinho Jung**
- Email: jvisualschool@gmail.com
- Website: https://jvibeschool.org

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

```
MIT License

Copyright (c) 2025 Jinho Jung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 감사의 말

- **Naver Cloud Platform**: Papago Translation API 제공
- **Wikipedia & Wikimedia Commons**: 저자 이미지 제공
- **Unsplash**: 아름다운 배경 이미지 제공
- **GitHub Community**: 오픈소스 명언 데이터 제공
- **Three.js Team**: 훌륭한 3D 라이브러리 제공

---

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든지 연락주세요!

- **이메일**: jvisualschool@gmail.com
- **웹사이트**: https://jvibeschool.org
- **라이브 데모**: https://jvibeschool.org/QUOTE/

---

<div align="center">

**Made with ❤️ by Jinho Jung**

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!

</div>
