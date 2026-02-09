# GitHub Actions CI/CD 테스트 프로젝트

GitHub Actions를 활용한 CI/CD 파이프라인 학습용 프로젝트입니다.

## 📋 목차

- [프로젝트 구조](#프로젝트-구조)
- [워크플로우 설명](#워크플로우-설명)
- [시작하기](#시작하기)
- [실습 가이드](#실습-가이드)

## 📁 프로젝트 구조

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml                 # 기본 CI 워크플로우
│       ├── advanced-ci-cd.yml     # 고급 CI/CD 파이프라인
│       ├── scheduled.yml          # 스케줄 기반 워크플로우
│       └── docker.yml             # Docker 빌드 워크플로우
├── index.js                       # 메인 애플리케이션
├── test.js                        # 테스트 파일
├── package.json                   # 프로젝트 설정
└── README.md                      # 이 파일
```

## 🔄 워크플로우 설명

### 1. ci.yml - 기본 CI
- **트리거**: main, develop 브랜치에 push 또는 PR
- **작업**: 코드 체크아웃 → Node.js 설정 → 테스트 실행
- **난이도**: ⭐ 초급

### 2. advanced-ci-cd.yml - 고급 CI/CD
- **트리거**: main 브랜치에 push 또는 PR
- **작업**: 
  - 린트 검사
  - 다중 환경 테스트 (OS: Ubuntu/Windows/macOS, Node: 16/18/20)
  - 빌드
  - 배포 (main 브랜치만)
- **난이도**: ⭐⭐⭐ 중급

### 3. scheduled.yml - 스케줄 작업
- **트리거**: 매일 오전 9시 (UTC) 자동 실행 또는 수동 실행
- **작업**: 정기적인 테스트 및 건강 체크
- **난이도**: ⭐⭐ 초중급

### 4. docker.yml - Docker CI/CD
- **트리거**: main 브랜치 push 또는 태그 생성
- **작업**: Docker 이미지 빌드 및 테스트
- **난이도**: ⭐⭐⭐ 중급

## 🚀 시작하기

### 1. 로컬에서 테스트

```bash
# 테스트 실행
npm test

# 애플리케이션 실행
npm start
```

### 2. GitHub에서 실습

1. **새 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/github-actions-demo.git
   git push -u origin main
   ```

2. **Actions 탭 확인**
   - GitHub 저장소의 "Actions" 탭으로 이동
   - 자동으로 실행된 워크플로우 확인

3. **워크플로우 수동 실행**
   - Actions 탭 → 원하는 워크플로우 선택
   - "Run workflow" 버튼 클릭

## 📚 실습 가이드

### 실습 1: 기본 CI 실행 (5분)

1. 코드를 수정하고 커밋
   ```bash
   echo "console.log('테스트');" >> index.js
   git add index.js
   git commit -m "테스트 코드 추가"
   git push
   ```

2. Actions 탭에서 워크플로우 실행 확인

### 실습 2: 테스트 실패 시나리오 (5분)

1. `test.js` 파일에 실패하는 테스트 추가
   ```javascript
   test('의도적인 실패 테스트', () => {
     assertEqual(1, 2);
   });
   ```

2. 커밋 후 Actions에서 실패 확인

### 실습 3: Pull Request 워크플로우 (10분)

1. 새 브랜치 생성 및 변경사항 추가
   ```bash
   git checkout -b feature/new-feature
   # 파일 수정
   git add .
   git commit -m "새 기능 추가"
   git push origin feature/new-feature
   ```

2. GitHub에서 Pull Request 생성

3. PR에서 자동으로 실행되는 CI 확인

### 실습 4: Workflow 파일 커스터마이징 (15분)

**초급 과제:**
- `ci.yml`에 캐싱 추가하기

**중급 과제:**
- 환경 변수 사용하기
- Secrets 추가하고 사용하기

**고급 과제:**
- 조건부 실행 추가하기
- Matrix 전략 확장하기

## 🎯 학습 포인트

### GitHub Actions 핵심 개념

1. **Workflow**: `.github/workflows/` 폴더의 YAML 파일
2. **Event**: 워크플로우를 트리거하는 이벤트 (push, pull_request 등)
3. **Job**: 워크플로우 내의 작업 단위
4. **Step**: Job 내의 개별 명령어
5. **Runner**: 워크플로우를 실행하는 서버

### YAML 문법 이해하기

```yaml
name: 워크플로우 이름

on: [push, pull_request]  # 트리거 이벤트

jobs:
  job-name:
    runs-on: ubuntu-latest  # 실행 환경
    
    steps:
    - name: 스텝 이름
      run: echo "Hello"     # 실행할 명령어
```

## 🔧 문제 해결

### 워크플로우가 실행되지 않을 때
- `.github/workflows/` 경로가 정확한지 확인
- YAML 문법 오류가 없는지 확인
- 저장소 Settings → Actions에서 활성화 되어있는지 확인

### 테스트가 실패할 때
- Actions 탭에서 로그 확인
- 로컬에서 `npm test` 실행해보기

## 📖 추가 학습 자료

- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Workflow 문법 참고](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Actions 마켓플레이스](https://github.com/marketplace?type=actions)

## 💡 다음 단계

1. AWS, Azure, GCP 등 클라우드 배포 연동
2. Slack, Discord 등 알림 연동
3. 코드 커버리지 리포트 생성
4. 보안 스캔 추가
5. 성능 테스트 자동화

---

**Happy Learning! 🎉**
