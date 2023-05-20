const fn = require('./fnAfterBefore');

let user;

// beforeEach(async () => {
//   user = await fn.connectUserDb();
// });
// afterEach(()=>{
//   return fn.disConnectDb();
// })

beforeAll(async () => {
  user = await fn.connectUserDb();
});
afterAll(()=>{
  return fn.disConnectDb();
});

test("이름은 Mike",() => {
  expect(user.name).toEqual("Mike");
})

test("나이는 30", () => {
  expect(user.age).toEqual(30);
})

test("성별은 남성", () => {
  expect(user.gender).toEqual("male");
})

describe("Car 관련 DB 작업", () => {
  let car;

  beforeAll(async () => {
    car = await fn.connectCarDb();
  });
  afterAll(()=>{
    return fn.disConnectCarDb();
  });
  
  test("이름은 z4",() => {
    expect(car.name).toEqual("z4");
  })
  
  test("브랜드는 bmw", () => {
    expect(car.brand).toEqual("bmw");
  })
  
  test("색상은 red", () => {
    expect(car.color).toEqual("red");
  })
})





// let num = 0;

// beforeEach(()=>{
//   num = 0;
// })

// test('0 더하기 1은 1이야',()=>{
//   num = fn.add(num, 1);
//   expect(num).toBe(1) ;
// });

// test('0 더하기 2은 2이야',()=>{
//   num = fn.add(num, 2);
//   expect(num).toBe(2) ;
// });

// test('0 더하기 3은 3이야',()=>{
//   num = fn.add(num, 3);
//   expect(num).toBe(3) ;
// });

// test('0 더하기 4은 4이야',()=>{
//   num = fn.add(num, 4);
//   expect(num).toBe(4) ;
// });

