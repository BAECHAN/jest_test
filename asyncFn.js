const asyncFn = {
  getName: callback => {
    const name = "Mike";
    setTimeout(()=>{
      callback(name);
    },3000);
  },
  getAge : () => {
    const age = 30;
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(age);
      },3000);
    });
  }
}

module.exports = asyncFn;

/**
 * callback 함수에서 에러를 강제로 발생시켜 try catch 테스트

const asyncFn = {
  getName: callback => {
    const name = "Mike";
    setTimeout(()=>{
      //callback(name);
      throw new Error("서버 에러...")
    },3000);
  }
}

module.exports = asyncFn;
*/

/**
 * Promise 객체에서 에러를 강제로 발생시켜 reject로 전달하는 방법
const asyncFn = {
  getName: callback => {
    const name = "Mike";
    setTimeout(()=>{
      callback(name);
    },3000);
  },
  getAge : () => {
    const age = 30;
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        reject('error')
      },3000);
    });
  }
}

module.exports = asyncFn;
 */
