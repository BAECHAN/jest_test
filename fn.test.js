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

