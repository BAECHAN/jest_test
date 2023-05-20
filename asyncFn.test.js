const asyncFn = require("./asyncFn");

test("3초 후에 받아온 이름은 Mike", done => {
  function callback(name) {
    expect(name).toEqual("Mike");
    done();
  }
  asyncFn.getName(callback);
});

// test("3초 후에 받아온 이름은 Mike", done => {
//   function callback(name) {
//     try {
//       expect(name).toEqual("Mike");
//       done();
//     } catch(error){
//       done();
//     } 
//   }
//   asyncFn.getName(callback);
// });

test("3초 후에 받아온 나이는 30입니다. Promise", () => {
  return asyncFn.getAge().then(age => {
    expect(age).toEqual(30);
  })
})

// test("3초 후에 에러가납니다.", () => {
//   return expect(asyncFn.getAge()).rejects.toMatch('error');
// })


test("3초 후에 받아온 나이는 30입니다. async", async () => {
  const age = await asyncFn.getAge();
  expect(age).toEqual(30);
})

// test("3초 후에 에러가납니다. async", async () => {
//   await expect(asyncFn.getAge()).rejects.toMatch('error');
// })
