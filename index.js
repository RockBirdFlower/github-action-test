// 간단한 덧셈 함수
function add(a, b) {
  return a + b;
}

// 인사 함수
function greet(name) {
  return `안녕하세요, ${name}님!`;
}

console.log('GitHub Actions 테스트 애플리케이션이 실행되었습니다.');
console.log(greet('개발자'));
console.log('2 + 3 =', add(2, 3));

// Node.js에서 함수를 export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { add, greet };
}

// 새로운 함수 추가

function subtract(a, b) {
  return a - b;
}

module.exports = { add, greet, subtract };