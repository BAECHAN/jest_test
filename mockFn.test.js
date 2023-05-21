// mock function

// const mockFn = jest.fn();

// mockFn();
// mockFn(1);

// test('dd',()=>{
//   console.log(mockFn.mock.calls)
//   expect("dd").toBe("dd")
// })

// test("mock함수는 2번 호출됩니다.",()=>{
//   expect(mockFn.mock.calls.length).toBe(2);
// }) 

// test("2번째로 호출된 mock함수에 전달된 첫번째 인수는 1입니다.",()=>{
//   expect(mockFn.mock.calls[1][0]).toBe(1);
// })


// const mockFn = jest.fn();

// function forEachAdd1(arr){
//   arr.forEach(num => {
//     // fn(num+1)
//   })
// }

// function forEachAdd1(arr){
//   arr.forEach(num => {
//     mockFn(num+1);
//   })
// }

// forEachAdd1([10,20,30]);

// test("mock함수는 3번 호출됩니다.",()=>{
//   expect(mockFn.mock.calls.length).toBe(3);
// }) 

// test("전달된 값은 11,21,31 입니다.", () => {
//   expect(mockFn.mock.calls[0][0]).toBe(11);
//   expect(mockFn.mock.calls[1][0]).toBe(21);
//   expect(mockFn.mock.calls[2][0]).toBe(31);
// })

// const mockFn = jest.fn(num => num+1);

// mockFn(10)
// mockFn(20)
// mockFn(30)

// test("10에서 1 증가한 값이 반환된다.", () => {
//   expect(mockFn.mock.results[0].value).toBe(11);
// })
// test("20에서 1 증가한 값이 반환된다.", () => {
//   expect(mockFn.mock.results[1].value).toBe(21);
// })
// test("30에서 1 증가한 값이 반환된다.", () => {
//   expect(mockFn.mock.results[2].value).toBe(31);
// })

// const mockFn = jest.fn();

// mockFn
// .mockReturnValueOnce(10)
// .mockReturnValueOnce(20)
// .mockReturnValueOnce(30)
// .mockReturnValue(40);

// mockFn()
// mockFn()
// mockFn()
// mockFn()

// test('dd',()=>{
//   console.log(mockFn.mock.results);
//   expect("dd").toBe("dd")
// })


// const mockFn = jest.fn();

// mockFn
// .mockReturnValueOnce(true)
// .mockReturnValueOnce(false)
// .mockReturnValueOnce(true)
// .mockReturnValueOnce(false)
// .mockReturnValue(true)

// const result = [1,2,3,4,5].filter(num => mockFn(num));

// test("홀수는 1,3,5",()=>{
//   expect(result).toStrictEqual([1,3,5]);
// })

// const mockFn = jest.fn();

// mockFn
// .mockResolvedValue({ name : "Mike"})

// test("받아온 이름은 Mike",()=>{
//   mockFn().then(res => {
//     expect(res.name).toBe("Mike")
//   })
// })

// const fn = require('./mockFn');

// jest.mock('./mockFn');

// fn.createUser.mockReturnValue({ name : "Mike" });

// test("유저 생성",()=>{
//   const user = fn.createUser("Mike");
//   expect(user.name).toBe("Mike");
// })

const mockFn = jest.fn();

mockFn(10, 20);
mockFn();
mockFn(30, 40);

test("한번 이상 호출?", () => {
  expect(mockFn).toBeCalled();
});

test("정확히 세번 호출?", () => {
  expect(mockFn).toBeCalledTimes(3);
});

test("10이랑 20을 전달받은 함수가 있는가?", () => {
  expect(mockFn).toBeCalledWith(10, 20);
  // expect(mockFn).toBeCalledWith(30, 40); // 이거도 통과됩니다.
});

test("마지막 함수는 30이랑 40을 받았는가?", () => {
  expect(mockFn).lastCalledWith(30, 40);
  // expect(mockFn).lastCalledWith(10, 20); // 이거는 통과가 안됩니다.
});



