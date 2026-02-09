// 간단한 테스트 스크립트
const { add, greet } = require('./index.js');

let testsPassed = 0;
let testsFailed = 0;

// 테스트 함수
function test(description, callback) {
  try {
    callback();
    console.log(`✅ PASS: ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ FAIL: ${description}`);
    console.log(`   ${error.message}`);
    testsFailed++;
  }
}

// assert 함수
function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
}

// 테스트 실행
console.log('=== 테스트 시작 ===\n');

test('add(2, 3)은 5를 반환해야 함', () => {
  assertEqual(add(2, 3), 5);
});

test('add(10, 20)은 30을 반환해야 함', () => {
  assertEqual(add(10, 20), 30);
});

test('add(-5, 5)는 0을 반환해야 함', () => {
  assertEqual(add(-5, 5), 0);
});

test('greet("홍길동")은 올바른 인사를 반환해야 함', () => {
  assertEqual(greet('홍길동'), '안녕하세요, 홍길동님!');
});

// 결과 출력
console.log('\n=== 테스트 결과 ===');
console.log(`통과: ${testsPassed}`);
console.log(`실패: ${testsFailed}`);
console.log(`총 테스트: ${testsPassed + testsFailed}`);

// 테스트 실패시 exit code 1 반환
if (testsFailed > 0) {
  process.exit(1);
}
