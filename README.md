# jest 시작하기

## 설치 명령어

```npm install jest --save-dev```
<hr />

## 설치 후 세팅
package.json 파일을 열고 test 스크립트를 jest로 수정해줍니다.
```
  "scripts": {
    "test": "jest"
  },
```
이렇게 해줌으로써 터미널에 npm test라고 입력하면 jest 커맨드를 실행할 수 있습니다. jest 커맨드를 전역으로 설치할 수도 있겠지만, 실제 프로젝트에서는 스크립트로 등록해놓고 사용하는 경우가 많습니다.
<hr />

## 사용법
<br />
test할 파일을 만들고 ( fn.js ) 해당 파일을 테스트할 test 파일을 생성한다.  
이때 test파일은 ```파일이름.test.js``` ( fn.test.js ) 로 해야 자동으로 test파일로 인식합니다.

또는 test 파일을 \_\_tests\_\_ 폴더 아래에 있는 파일들은 자동으로 test파일로 인식합니다.

만약 특정 테스트 파일만 실행하고 싶은 경우에는 npm test <파일명 이나 경로>를 입력하면 됩니다.
<hr />

### test파일에선 아래와 같이 작성합니다.
<br />

```
test("테스트 설명", () => {
  expect("검증 대상").toXxx("기대 결과");
});
```
<hr />

## 예시
<br />

```

// fn.js
const fn = {
  add : (num1,num2) => {num1 + num2}
}
module.exports = fn;


// fn.test.js
const fn = require('./fn');

test('1은 1이야',()=>{
  expect(1).toBe(1) ;
});

test('2 더하기 3은 5야.', () => {
  expect(fn.add(2,3)).toBe(5);
}) 

test('3 더하기 3은 5야.', () => {
  expect(fn.add(3,3)).toBe(5);
});
```

이 상태에서 ```npm test``` 명령어 실행 시 터미널 결과는 아래와 같이 나옵니다.

```

> jest@1.0.0 test
> jest

 FAIL  ./fn.test.js
  √ 1은 1이야 (2 ms)
  √ 2 더하기 3은 5야.
  × 3 더하기 3은 5야. (2 ms)

  ● 3 더하기 3은 5야.

    expect(received).toBe(expected) // Object.is equality

    Expected: 5
    Received: 6

      10 |
      11 | test('3 더하기 3은 5야.', () => {
    > 12 |   expect(fn.add(3,3)).toBe(5);
         |                       ^
      13 | });

      at Object.toBe (fn.test.js:12:23)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        0.78 s, estimated 1 s
Ran all test suites.
```

3+3은 6가 아니므로 에러가 발생한다고 test 결과를 알려줍니다.

만약 3 더하기 3은 5가 아닌 것을 테스트 해주는 코드를 작성한다면 아래와 같이 작성할 수 있습니다.

```
test('3 더하기 3은 5가 아니야.', () => {
  expect(fn.add(3,3)).not.toBe(5);
});
```

예제코드에서와 같이 일치하지 않을 경우 .not을 붙여주며, .toBe나 .not.toBe 와 같이 toXxx 부분에서 사용되는 함수를 흔히 Test Matcher라고 합니다.


위에서 사용된 toBe() 함수는 숫자나 문자와 같은 객체가 아닌 기본형(primitive) 값을 비교할 때 사용됩니다.  
.not은 부정한 지 확인할 때 사용됩니다.

<hr />

## Matcher의 종류
<br />

### toBe()
* 숫자나 문자와 같은 객체가 아닌 기본형(primitive) 값을 비교할 때 사용됩니다.  
### not 
* !와 같이 값을 부정할 때 사용됩니다.
### toEqual()
* 객체타입의 값을 비교할 때 사용됩니다.


```
// fn.js

const fn = {
  add : (num1,num2) => num1 + num2,
  makeUser : (name, age) => ({ name, age })
}

module.exports = fn;


// fn.test.js

test('이름과 나이를 전달받아서 객체를 반환해줘', () => {
  expect(fn.makeUser('Mike', 30)).toBe({
    name : 'Mike',
    age : 30
  })
})
```

이 때의 결과는 failed로 나옵니다. 왜냐하면 toBe는 원시타입을 비교할 때 사용되므로 객체를 비교하는 toEqual을 사용해야 합니다.
```
// fn.js

const fn = {
  add : (num1,num2) => num1 + num2,
  makeUser : (name, age) => ({ name, age })
}

module.exports = fn;


// fn.test.js

test('이름과 나이를 전달받아서 객체를 반환해줘', () => {
  expect(fn.makeUser('Mike', 30)).toEqual({
    name : 'Mike',
    age : 30
  })
})
```
***친절하게도 Jest는 toBe() 대신에 toEqual() 함수를 사용하라고 가이드해주고 있습니다. <br />
실제로 테스트 코드를 작성할 때는 객체를 검증해야할 일이 많기 때문에 toEqual() 함수를 가장 많이 접할 수 있습니다.***