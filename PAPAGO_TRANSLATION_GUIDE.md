# 파파고 API를 사용한 명언 번역 가이드

## 📋 개요
나머지 4,500개의 미번역 명언을 파파고 API로 자동 번역하는 스크립트입니다.

## 🔑 사전 준비

### 1. 네이버 클라우드 플랫폼 API 키 발급
1. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 접속
2. 콘솔 로그인
3. **AI·NAVER API** > **Papago Translation** 선택
4. **Application 등록**
5. **Client ID**와 **Client Secret** 복사

### 2. API 사용량 및 요금
- **무료**: 10,000자/일
- **유료**: 초과 시 10,000자당 20원
- **4,500개 명언 예상 글자 수**: 약 300,000자
- **예상 비용**: 약 600원 (무료 할당량 제외)

## 🚀 사용 방법

### Step 1: API 키 설정
`translate_remaining.php` 파일을 열고 상단의 API 키를 입력합니다:

```php
$PAPAGO_CLIENT_ID = 'YOUR_CLIENT_ID';      // 여기에 Client ID 입력
$PAPAGO_CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // 여기에 Client Secret 입력
```

### Step 2: 서버에 업로드
```bash
scp -i ~/.ssh/jvibeschool_org.pem translate_remaining.php bitnami@15.164.161.165:/opt/bitnami/apache/htdocs/QUOTE/
```

### Step 3: 번역 실행
```bash
ssh -i ~/.ssh/jvibeschool_org.pem bitnami@15.164.161.165
cd /opt/bitnami/apache/htdocs/QUOTE
php translate_remaining.php
```

### Step 4: 진행 상황 확인
스크립트 실행 중 다음과 같은 출력을 볼 수 있습니다:
```
=== 파파고 API를 사용한 명언 번역 시작 ===

1. 데이터베이스 연결 중...
   ✓ 데이터베이스 연결 성공

2. 미번역 명언 조회 중...
   미번역 명언: 4500개

총 4500개의 명언을 번역합니다.
예상 소요 시간: 약 8분

3. 번역 시작...
   진행: 10/4500 (0.2%)
   진행: 20/4500 (0.4%)
   ...
```

## ⚙️ 설정 옵션

### 번역 속도 조절
`translate_remaining.php` 파일의 설정을 수정할 수 있습니다:

```php
$batchSize = 10;           // 배치당 번역 개수 (기본: 10)
$delayBetweenBatch = 1;    // 배치 간 대기 시간 (초, 기본: 1)
$delayBetweenRequest = 0.1; // 요청 간 대기 시간 (초, 기본: 0.1)
```

**API 제한 초과 시**:
- `$delayBetweenRequest`를 `0.2` 이상으로 증가
- `$batchSize`를 `5` 이하로 감소

## 📊 예상 소요 시간

| 설정 | 예상 시간 |
|------|----------|
| 기본 설정 (0.1초 딜레이) | 약 7-8분 |
| 안전 설정 (0.2초 딜레이) | 약 15분 |
| 느린 설정 (0.5초 딜레이) | 약 38분 |

## 🔍 번역 후 확인

### 데이터베이스 확인
```bash
mysql -u root -p'YOUR_PASSWORD' QUOTE -e "
  SELECT 
    COUNT(*) as total,
    SUM(is_translated) as translated,
    SUM(NOT is_translated) as not_translated
  FROM quotes;
"
```

### API 테스트
```bash
curl -s https://jvibeschool.org/QUOTE/api.php | jq
```

## ⚠️ 주의사항

1. **API 키 보안**: 
   - API 키가 포함된 파일을 Git에 커밋하지 마세요
   - 번역 완료 후 서버에서 파일 삭제 권장

2. **중단 시 재실행**:
   - 스크립트는 이미 번역된 항목을 건너뜁니다
   - 안전하게 재실행 가능합니다

3. **API 제한**:
   - 하루 무료 할당량: 10,000자
   - 초과 시 자동으로 유료 전환됩니다

## 🎯 완료 후 작업

번역 완료 후 보안을 위해 파일을 삭제하세요:
```bash
ssh -i ~/.ssh/jvibeschool_org.pem bitnami@15.164.161.165
cd /opt/bitnami/apache/htdocs/QUOTE
rm translate_remaining.php
rm quotes_5000_with_500_translated.json
```

## 📞 문제 해결

### API 키 오류
```
❌ 오류: SQLSTATE[HY000] [1045] Access denied
```
→ API 키를 다시 확인하세요

### 연결 시간 초과
```
⚠ 경고: ID XXX 번역 실패
```
→ `$delayBetweenRequest`를 증가시키세요

### 데이터베이스 연결 실패
```
❌ 오류: DB Connection failed
```
→ MySQL 비밀번호를 확인하세요
