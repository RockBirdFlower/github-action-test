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


// 간단한 덧셈 함수
function add(a, b) {
  return a + b;
}

// 인사 함수
function greet(name) {
  return `안녕하세요, ${name}님!`;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('0으로 나눌 수 없습니다');
  }
  return a / b;
}

console.log('GitHub Actions 테스트 애플리케이션이 실행되었습니다.');
console.log(greet('개발자'));
console.log('2 + 3 =', add(2, 3));

// Node.js에서 함수를 export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { add, greet, divide };
}
