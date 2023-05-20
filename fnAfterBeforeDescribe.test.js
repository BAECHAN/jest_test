const fn = require('./fnAfterBefore');

beforeAll(()=>console.log("밖 beforeAll")); // 1
beforeEach(()=>console.log("밖 beforeEach")); // 2, 6
afterEach(()=>console.log("밖 afterEach")); // 4, 10
afterAll(()=>console.log("밖 afterAll")); // 마지막

test("0 + 1 = 1",() => {
  console.log("밖 test");
  expect(fn.add(0,1)).toBe(1); // 3
});

describe("Car 관련 작업", () => {
  beforeAll(()=>console.log("안 beforeAll")); // 5
  beforeEach(()=>console.log("안 beforeEach")); // 7
  afterEach(()=>console.log("안 afterEach")); // 9
  afterAll(()=>console.log("안 afterAll")); // 마지막 -1

  test("0 + 1 = 1",() => {
    console.log("안 test");
    expect(fn.add(0,1)).toBe(1); // 8
  });
})