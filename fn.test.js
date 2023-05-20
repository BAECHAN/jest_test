const fn = require('./fn');

test('1은 1이야',()=>{
  expect(1).toBe(1) ;
});

test('2 더하기 3은 5야.', () => {
  expect(fn.add(2,3)).toBe(5);
});

// test('3 더하기 3은 5야.', () => {
//   expect(fn.add(3,3)).toBe(5);
// });

test('3 더하기 3은 5가 아니야.', () => {
  expect(fn.add(3,3)).not.toBe(5);
});

test('2 더하기 3은 5야. toEqual로 확인', () => {
  expect(fn.add(2,3)).toEqual(5);
});

/** toEqual vs toBe 테스트 */

// test('이름과 나이를 전달받아서 객체를 반환해줘( toBe version )', () => {
//   expect(fn.makeUser('Mike', 30)).toBe({
//     name : 'Mike',
//     age : 30
//   })
// })

test('이름과 나이를 전달받아서 객체를 반환해줘( toEqual version )', () => {
  expect(fn.makeUser('Mike', 30)).toEqual({
    name : 'Mike',
    age : 30
  })
})

test('이름과 나이를 전달받아서 객체를 반환해줘( toStrictEqual version )', () => {
  expect(fn.makeUser('Mike', 30)).toStrictEqual({
    name : 'Mike',
    age : 30
  })
})

/** toBeNull */

test("null은 null입니다.", () => {
  expect(null).toBeNull();
})

/** 
 * toBeTruthy 
 * toBeFalsy
 * */

test("0은 false 입니다.", () => {
  expect(fn.add(1,-1)).toBeFalsy();
})

test("비어있지 않은 문자열은 true 입니다.", () => {
  expect(fn.add("hello","world")).toBeTruthy();
})

/**
 * toBeGreaterThan 크다
 * toBeGreaterThanOrEqual 크거나 같다
 * toBeLessThan 작다
 * toBeLessThanOrEqual 작거나 같다
 */

test("ID는 10자 이상여야 합니다.", () => {
  const id = 'THE_BLACK_ORDER';
  expect(id.length).toBeGreaterThanOrEqual(10);
})

test("ID는 10자 이하여야 합니다.", () => {
  const id = 'THE_BLACK';
  expect(id.length).toBeLessThanOrEqual(10);
})

// 완전히 일치하는지 보려면 toEqual 이나 toBe 사용

test("비밀번호 4자리여야 합니다.", () => {
  const pw = "1234";
  expect(pw.length).toStrictEqual(4);
})

// 소수점 더하기 체크할 때는 toBe가 아닌 toBeCloseTo

// test("0.1 더하기 0.2는 0.3 입니다.", () => {
//   expect(fn.add(0.1, 0.2)).toBe(0.3)
// })

test("0.1 더하기 0.2는 0.3 입니다.", () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3)
})
