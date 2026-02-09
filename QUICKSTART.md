# 🚀 빠른 시작 가이드

GitHub Actions를 5분 안에 시작해보세요!

## 1️⃣ GitHub 저장소 만들기 (1분)

1. GitHub에 로그인
2. 새 저장소 생성 (New repository)
3. 저장소 이름: `github-actions-test`
4. Public 또는 Private 선택
5. Create repository

## 2️⃣ 코드 업로드하기 (2분)

### 터미널에서 실행:

```bash
# 이 프로젝트 폴더로 이동
cd github-actions-test

# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# 브랜치 이름을 main으로 변경
git branch -M main

# GitHub 저장소 연결 (your-username을 본인 계정으로 변경)
git remote add origin https://github.com/your-username/github-actions-demo.git

# 푸시
git push -u origin main
```

## 3️⃣ GitHub Actions 확인하기 (2분)

1. GitHub 저장소 페이지로 이동
2. 상단의 **"Actions"** 탭 클릭
3. 실행 중인 워크플로우 확인! 🎉

### 볼 수 있는 것들:
- ✅ 녹색 체크마크: 성공
- ❌ 빨간색 X: 실패
- 🟡 노란색 점: 실행 중

## 4️⃣ 상세 로그 보기

1. 워크플로우 이름 클릭 (예: "CI - 기본 테스트")
2. Job 이름 클릭 (예: "test")
3. 각 단계별 로그 확인

## ✨ 첫 수정하기

### index.js 파일 수정:

```javascript
// 새로운 함수 추가
function subtract(a, b) {
  return a - b;
}

// export에 추가
module.exports = { add, greet, subtract };
```

### 커밋 및 푸시:

```bash
git add index.js
git commit -m "뺄셈 함수 추가"
git push
```

### Actions 탭에서 자동 실행 확인! 🚀

---

## 📌 다음 단계

- [ ] README.md를 읽고 전체 구조 이해하기
- [ ] TUTORIAL.md의 실습 과제 따라하기
- [ ] 다양한 워크플로우 파일 살펴보기

## 🆘 문제 해결

### "permission denied" 에러
```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

### 워크플로우가 안 보여요
- 저장소 Settings → Actions → "Allow all actions" 확인

### 테스트가 실패해요
```bash
# 로컬에서 먼저 테스트
npm test
```

---

**축하합니다! 첫 GitHub Actions를 실행했습니다! 🎉**
