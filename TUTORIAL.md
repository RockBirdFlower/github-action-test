# GitHub Actions 실습 가이드 (단계별)

## 🎓 난이도별 실습 코스

### 코스 1: 입문자 (30분)
1. 기본 CI 워크플로우 이해하기
2. 로컬에서 테스트 실행
3. GitHub에 푸시하고 Actions 확인
4. 간단한 수정 후 재실행

### 코스 2: 초급자 (1시간)
1. 코스 1의 모든 내용
2. Pull Request 워크플로우 이해
3. 테스트 실패 처리
4. 환경 변수 사용

### 코스 3: 중급자 (2시간)
1. 코스 2의 모든 내용
2. Matrix 전략 활용
3. Artifacts 업로드/다운로드
4. 조건부 실행
5. 다중 Job 의존성

---

## 📝 상세 실습 가이드

## 실습 1: 첫 GitHub Actions 실행하기 ⭐

### 목표
GitHub Actions가 어떻게 작동하는지 이해하고 첫 워크플로우를 실행합니다.

### 단계

**1단계: 저장소 생성 및 코드 업로드**

```bash
# 로컬에서 Git 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: GitHub Actions 실습 프로젝트"

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에서 저장소를 만든 후 연결
git remote add origin https://github.com/your-username/github-actions-demo.git

# 푸시
git push -u origin main
```

**2단계: GitHub Actions 확인**

1. GitHub 저장소 페이지로 이동
2. 상단의 "Actions" 탭 클릭
3. 자동으로 실행된 "CI - 기본 테스트" 워크플로우 확인
4. 워크플로우를 클릭하여 상세 로그 확인

**3단계: 로그 분석하기**

각 단계의 로그를 확인하며 다음을 이해합니다:
- ✅ 코드 체크아웃이 어떻게 되는지
- ✅ Node.js가 어떻게 설치되는지
- ✅ 테스트가 어떻게 실행되는지

### 예상 결과
```
✅ PASS: add(2, 3)은 5를 반환해야 함
✅ PASS: add(10, 20)은 30을 반환해야 함
✅ PASS: add(-5, 5)는 0을 반환해야 함
✅ PASS: greet("홍길동")은 올바른 인사를 반환해야 함

=== 테스트 결과 ===
통과: 4
실패: 0
총 테스트: 4
```

---

## 실습 2: 코드 수정하고 CI 재실행하기 ⭐

### 목표
코드를 수정하고 자동으로 CI가 실행되는 것을 경험합니다.

### 단계

**1단계: 새로운 함수 추가**

`index.js`에 다음 함수를 추가:

```javascript
// 곱셈 함수
function multiply(a, b) {
  return a * b;
}

// export에 추가
module.exports = { add, greet, multiply };
```

**2단계: 테스트 추가**

`test.js`에 다음 테스트를 추가:

```javascript
const { add, greet, multiply } = require('./index.js');

test('multiply(3, 4)는 12를 반환해야 함', () => {
  assertEqual(multiply(3, 4), 12);
});

test('multiply(0, 100)는 0을 반환해야 함', () => {
  assertEqual(multiply(0, 100), 0);
});
```

**3단계: 커밋 및 푸시**

```bash
git add index.js test.js
git commit -m "곱셈 함수 및 테스트 추가"
git push
```

**4단계: Actions 확인**

GitHub Actions 탭에서 새로운 워크플로우가 자동으로 실행되는 것을 확인합니다.

---

## 실습 3: 테스트 실패 처리하기 ⭐⭐

### 목표
테스트가 실패했을 때 CI가 어떻게 반응하는지 이해합니다.

### 단계

**1단계: 의도적으로 실패하는 테스트 추가**

`test.js`에 추가:

```javascript
test('의도적인 실패 테스트', () => {
  assertEqual(add(1, 1), 3);  // 이건 실패할 것입니다
});
```

**2단계: 커밋 및 푸시**

```bash
git add test.js
git commit -m "실패 테스트 추가"
git push
```

**3단계: 실패 확인**

- Actions 탭에서 빨간색 X 표시 확인
- 로그에서 어떤 테스트가 실패했는지 확인
- 에러 메시지 분석

**4단계: 수정**

실패한 테스트를 주석 처리하거나 수정:

```javascript
// test('의도적인 실패 테스트', () => {
//   assertEqual(add(1, 1), 3);
// });
```

**5단계: 재푸시 및 확인**

```bash
git add test.js
git commit -m "실패 테스트 수정"
git push
```

---

## 실습 4: Pull Request 워크플로우 ⭐⭐

### 목표
브랜치를 만들고 PR을 통해 코드 리뷰 프로세스를 경험합니다.

### 단계

**1단계: 새 브랜치 생성**

```bash
git checkout -b feature/divide-function
```

**2단계: 나눗셈 기능 추가**

`index.js`:
```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('0으로 나눌 수 없습니다');
  }
  return a / b;
}

module.exports = { add, greet, multiply, divide };
```

`test.js`:
```javascript
test('divide(10, 2)는 5를 반환해야 함', () => {
  assertEqual(divide(10, 2), 5);
});

test('divide(7, 0)은 에러를 발생시켜야 함', () => {
  try {
    divide(7, 0);
    throw new Error('에러가 발생하지 않음');
  } catch (error) {
    if (error.message !== '0으로 나눌 수 없습니다') {
      throw error;
    }
  }
});
```

**3단계: 커밋 및 푸시**

```bash
git add .
git commit -m "나눗셈 함수 추가"
git push origin feature/divide-function
```

**4단계: Pull Request 생성**

1. GitHub 저장소로 이동
2. "Compare & pull request" 버튼 클릭
3. PR 제목과 설명 작성
4. "Create pull request" 클릭

**5단계: CI 실행 확인**

- PR 페이지에서 자동으로 실행되는 CI 확인
- "Checks" 탭에서 상세 로그 확인
- 모든 체크가 통과하면 초록색 체크마크 표시

**6단계: 머지**

CI가 통과하면 "Merge pull request" 버튼으로 머지합니다.

---

## 실습 5: 환경 변수 사용하기 ⭐⭐

### 목표
GitHub Actions에서 환경 변수를 사용하는 방법을 배웁니다.

### 단계

**1단계: 새 워크플로우 파일 생성**

`.github/workflows/env-test.yml`:

```yaml
name: 환경 변수 테스트

on: [push]

env:
  GLOBAL_VAR: "전역 변수"

jobs:
  env-test:
    runs-on: ubuntu-latest
    
    env:
      JOB_VAR: "Job 레벨 변수"
    
    steps:
    - uses: actions/checkout@v3
    
    - name: 환경 변수 출력
      env:
        STEP_VAR: "Step 레벨 변수"
      run: |
        echo "전역 변수: $GLOBAL_VAR"
        echo "Job 변수: $JOB_VAR"
        echo "Step 변수: $STEP_VAR"
        echo "GitHub 변수: ${{ github.repository }}"
        echo "실행자: ${{ github.actor }}"
```

**2단계: 커밋 및 푸시**

```bash
git add .github/workflows/env-test.yml
git commit -m "환경 변수 테스트 워크플로우 추가"
git push
```

**3단계: 결과 확인**

Actions 탭에서 출력된 환경 변수 값을 확인합니다.

---

## 실습 6: Matrix 전략 활용하기 ⭐⭐⭐

### 목표
여러 버전의 Node.js와 OS에서 동시에 테스트하는 방법을 배웁니다.

### 단계

**1단계: Matrix 워크플로우 확인**

`advanced-ci-cd.yml` 파일의 test job을 확인:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [16, 18, 20]
```

이것은 3 OS × 3 Node 버전 = 9개의 조합을 테스트합니다!

**2단계: 실행 확인**

1. `advanced-ci-cd.yml`이 트리거되도록 main 브랜치에 푸시
2. Actions에서 9개의 병렬 작업이 실행되는 것 확인
3. 각 조합별 결과 확인

---

## 실습 7: Artifacts 사용하기 ⭐⭐⭐

### 목표
빌드 결과물을 저장하고 다운로드하는 방법을 배웁니다.

### 단계

**1단계: 빌드 결과 생성**

`index.js`에 빌드 스크립트 추가:

```javascript
const fs = require('fs');

function createBuildInfo() {
  const buildInfo = {
    version: '1.0.0',
    buildTime: new Date().toISOString(),
    nodeVersion: process.version
  };
  
  fs.writeFileSync('build-info.json', JSON.stringify(buildInfo, null, 2));
  console.log('빌드 정보 파일 생성 완료');
}

if (require.main === module) {
  createBuildInfo();
}
```

**2단계: 워크플로우에서 Artifacts 업로드**

`.github/workflows/artifacts-test.yml`:

```yaml
name: Artifacts 테스트

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Node.js 설정
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: 빌드 정보 생성
      run: node index.js
    
    - name: Artifacts 업로드
      uses: actions/upload-artifact@v3
      with:
        name: build-artifacts
        path: build-info.json
  
  use-artifact:
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - name: Artifacts 다운로드
      uses: actions/download-artifact@v3
      with:
        name: build-artifacts
    
    - name: 빌드 정보 확인
      run: cat build-info.json
```

**3단계: 확인**

- Actions에서 Artifacts 섹션 확인
- 다운로드 버튼으로 파일 다운로드 가능

---

## 🎯 추가 실습 과제

### 과제 1: 캐싱 구현하기
`node_modules` 캐싱을 추가하여 빌드 시간 단축

### 과제 2: Slack 알림 연동
워크플로우 성공/실패 시 Slack으로 알림

### 과제 3: 코드 커버리지 리포트
테스트 커버리지를 측정하고 리포트 생성

### 과제 4: 자동 릴리즈
태그 생성 시 자동으로 GitHub Release 생성

---

## 💡 팁과 트릭

### 디버깅 팁
```yaml
- name: 디버그 정보 출력
  run: |
    echo "이벤트: ${{ github.event_name }}"
    echo "브랜치: ${{ github.ref }}"
    echo "커밋: ${{ github.sha }}"
    ls -la
```

### 조건부 실행
```yaml
- name: Production 배포만
  if: github.ref == 'refs/heads/main'
  run: echo "배포 중..."
```

### 시크릿 사용
```yaml
- name: 시크릿 사용
  env:
    API_KEY: ${{ secrets.API_KEY }}
  run: echo "API 키를 사용합니다"
```

---

**Happy Coding! 🚀**
