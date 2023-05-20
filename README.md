# jest 시작하기

# 참고링크
* https://www.youtube.com/watch?v=TRZ2XdmctSQ
* https://www.daleseo.com/jest-before-after/

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

### toStrictEqual()
* 더 깊은 비교를 위해 toEqual() 대신 toStrictEqual()을 사용합니다.

```
// fn.js

const fn = {
  add : (num1,num2) => num1 + num2,
  makeUser : (name, age) => ({ name, age, gender : undefined })
}

module.exports = fn;

// fn.test.js

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
```

위와 같이 gender가 추가된 후 test하게되면 toEqual()은 Truthy한 결과를 return하지만  
toStrictEqual()은 서로 같은 객체가 아니기 때문에 Falsy한 결과를 발생시켜줍니다.  

더 정확한 결과를 얻고 싶다면, toStrictEqual()을 사용합니다.  

### toBeNull()
### toBeUndefined()
### toBeDefined()

* 각각 null, undefined, defined인 경우 통과되도록 처리합니다.

```
test("null은 null입니다.", () => {
  expect(null).toBeNull();
})
```

### toBeTruthy() / toBeFalsy()

* 많은 분들이 아시다시피 느슨한 타입 기반 언어인 자바스크립트는, 자바같은 강한 타입 기반 언어처럼 true와 false가 boolean 타입에 한정되지 않습니다.  
따라서 숫자 1이 true로 간주되고, 숫자 0이 false로 간주되는 것과 같이 모든 타입의 값들을 true 아니면 false 간주하는 규칙이 있습니다.  
toBeTruthy()는 검증 대상이 이 규칙에 따라 true로 간주되면 테스트 통과이고, toBeFalsy()는 반대로 false로 간주되는 경우 테스트가 통과됩니다.

```
test("0은 false 입니다.", () => {
  expect(fn.add(1,-1)).toBeFalsy();
})
```

문자열을 전달하게될 경우 자바스크립트에서는 문자열 + 문자열은 문자열문자열 상태로 만들어주기 때문에 Truthy한 값이 return 되어 toBeTruthy를 통과하게 됩니다.

```
test("비어있지 않은 문자열은 true 입니다.", () => {
  expect(fn.add("hello","world")).toBeTruthy();
})

// Received: "helloworld"

```

### toBeGreaterThan() - 크다
### toBeGreaterThanOrEqual() - 크거나 같다
### toBeLessThan() - 작다
### toBeLessThanOrEqual() - 작거나 같다


```
test("ID는 10자 이상여야 합니다.", () => {
  const id = 'THE_BLACK_ORDER';
  expect(id.length).toBeGreaterThanOrEqual(10);
})

test("ID는 10자 이하여야 합니다.", () => {
  const id = 'THE_BLACK';
  expect(id.length).toBeLessThanOrEqual(10);
})
```

만약 완전히 일치하는지 보려면 toEqual 이나 toBe 사용
```
test("비밀번호 4자리여야 합니다.", () => {
  const pw = "1234";
  expect(pw.length).toStrictEqual(4);
})
```

### toBeCloseTo()
* 몇몇 언어에서는 소수 끼리 연산 시 정확한 계산을 하지 못합니다.  
때문에 이 경우 toBeCloseTo를 사용하여 근접한지를 테스트합니다.

```
test("0.1 더하기 0.2는 0.3 입니다.", () => {
  expect(fn.add(0.1, 0.2)).toBe(0.3)
})

// Received: 0.30000000000000004

test("0.1 더하기 0.2는 0.3 입니다.", () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3)
})
```

### toMatch()
* 정규식 기반의 테스트가 필요할 떄가 있는데 toMatch() 함수를 사용하면됩니다.

```
test("Hello World에 H라는 글자가 있는가?", () => {
  expect("Hello World").toMatch(/H/);
})
```

그렇다면 소문자 h 를 찾을 경우에는 어떻게 나올까요?

```
test("Hello World에 h라는 글자가 있는가?", () => {
  expect("Hello World").toMatch(/h/);
})

// Falsy한 결과가 나옵니다.
```

이러한 경우 대소문자 구분없이 찾을 경우에는 아래와 같이 i 를 붙여줍니다.

```
test("Hello World에 h라는 글자가 있는가?", () => {
  expect("Hello World").toMatch(/h/i);
})
```

### toHaveLength() / toContain()
* 배열의 경우에는 배열이 길이를 체크하거나 특정 원소가 존재 여부를 테스트하는 경우가 많습니다.  toHaveLength() 배열의 길이를 체크할 때 쓰이고, toContain() 특정 원소가 배열에 들어있는지를 테스트할 때 쓰입니다.

```
test("배열의 길이가 3인가?", () => {
  const userList = ["Tom", "Mike", "Kai"];
  expect(userList).toHaveLength(3)
})

test("유저 리스트에 Mike가 있는가?", () => {
  const user = "Mike";
  const userList = ["Tom", "Mike", "Kai"];
  expect(userList).toContain(user);
})
```

### toThrow()
* 에러가 발생했는지 테스트해주는 함수입니다.

```
// fn.js
const fn = {
  add : (num1,num2) => num1 + num2,
  makeUser : (name, age) => ({ name, age, gender : undefined }),
  throwErr: () => {
    throw new Error("xx");
  }
}

module.exports = fn;

// fn.test.js
test("이거 에러 나나요?", () => {
  expect(() => fn.throwErr()).toThrow();
})
```

만약 특정 내용의 에러가 발생하는지 체크하려면 toThrow의 인자로 에러 메세지를 넣어주고 비교하게합니다.

```
// fn.js
const fn = {
  add : (num1,num2) => num1 + num2,
  makeUser : (name, age) => ({ name, age, gender : undefined }),
  throwErr: () => {
    throw new Error("xx");
  }
}

module.exports = fn;

// fn.test.js
test("이거 oo 에러 나나요?", () => {
  expect(() => fn.throwErr()).toThrow("oo");
}) // 실패

test("이거 xx 에러 나나요?", () => {
  expect(() => fn.throwErr()).toThrow("xx");
}) // 성공
```

### 다른 Matcher가 필요한 경우 아래의 링크에서 찾아서 가져다 사용합니다.
https://jestjs.io/docs/en/expect

<hr />

## 비동기 코드 테스트

비동기 동작을 포함하는 함수를 테스트하는 것을 의미합니다. JavaScript에서 비동기함수는   일반적으로 
  1. 콜백 함수
  2. Promise
  3. async/await  
등을 사용하여 구현됩니다.

테스트를 위해 ```asyncFn.js``` 파일과 ```asyncFn.test.js``` 파일을 생성합니다.  

먼저 callback 함수로 테스트 하는 방법입니다.

### callback

```
// asyncFn.js
const asyncFn = {
  getName: callback => {
    const name = "Mike";
    setTimeout(()=>{
      callback(name);
    },3000);
  }
}

module.exports = asyncFn;


// asyncFn.test.js
const asyncFn = require("./asyncFn");

test("3초 후에 받아온 이름은 Mike", done => {
  function callback(name) {
    expect(name).toEqual("Mike");
    done();
  }
  asyncFn.getName(callback);
});
```

위의 코드와 같이 done을 사용하여 비동기처리가 끝났다는 걸 테스트 함수에 인식시켜줍니다.

터미널 결과는 아래와 같으며, 3초정도 소요되었음을 확인할 수 있습니다.

```
> jest@1.0.0 test
> jest asyncFn

 PASS  ./asyncFn.test.js
  √ 3초 후에 받아온 이름은 Mike (3009 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.807 s, estimated 6 s
Ran all test suites matching /asyncFn/i.
```

만약 API 에러를 감지하고 싶다면 try / catch문으로 감싸줍니다.

```
test("3초 후에 받아온 이름은 Mike", done => {
  function callback(name) {
    try {
      expect(name).toEqual("Mike");
      done();
    } catch(error){
      done();
    } 
  }
  asyncFn.getName(callback);
});
```



<hr />

#### ※ 주의1. 만약 done을 인자로 받아오지 않아 비동기처리가 끝났다는걸 테스트 함수에서 인식하지 못하는 경우 테스트 실행 시 아래와 같은 경고가 노출됩니다.
```
Jest did not exit one second after the test run has completed.

'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```

이를 해결하기 위한 방법으로는 아래와 같으며 우리는 2번 방법을 선택하였습니다.

1. 비동기 작업을 모두 완료하고 Jest가 종료될 때까지 기다리도록 테스트 코드를 수정합니다. 이는 async와 await를 사용하거나, Promise를 반환하는 비동기 작업에 .then()을 사용하여 처리할 수 있습니다.

2. 비동기 작업을 명시적으로 중지시키는 코드를 추가하여 Jest가 테스트가 완료되었음을 감지하도록 합니다. 예를 들어, afterAll 블록 내에서 setTimeout 함수를 사용하여 일정 시간이 지난 후에 done 콜백을 호출하는 방식을 사용할 수 있습니다.

3. Jest를 --detectOpenHandles 옵션과 함께 실행하여 어떤 비동기 핸들이 열려있는지를 검출하고 디버깅할 수 있습니다. 이를 통해 어떤 비동기 작업이 완료되지 않고 남아있는지 식별할 수 있습니다.

<hr />

#### ※ 주의2. done을 인자로 가져왔지만 호출하지 않았을 경우에도 에러가 발생합니다.
```
test("3초 후에 받아온 이름은 Mike", done => {
  function callback(name) {
    expect(name).toEqual("Mike");
    //done();
  }
  asyncFn.getName(callback);
});

thrown: "Exceeded timeout of 5000 ms for a test while waiting for `done()` to be called.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."
```

Jest 테스트에서 done() 함수가 호출되기를 기다리는 동안 테스트의 제한 시간(timeout)을 초과했을 때 발생합니다.  
기본적으로 Jest는 각 테스트의 제한 시간을 5,000ms(5초)로 설정하고 있습니다. 

<hr />

다음은 Promise 로 테스트 하는 방법입니다.

### Promise

```
// asyncFn.js

const asyncFn = {
  ...
  getAge : () => {
    const age = 30;
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(age);
      },3000);
    });
  }
}

// asyncFn.test.js
test("3초 후에 받아온 나이는 30", () => {
  asyncFn.getAge().then(age => {
    expect(age).toEqual(30);
  })
})
```

위의 경우에도 아까 보았던 경고창이 뜨기 때문에 수정해줍니다.

```
Jest did not exit one second after the test run has completed.

'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```

return 키워드를 명시하면 정상작동 하게됩니다.

```
test("3초 후에 받아온 나이는 30", () => {
  return asyncFn.getAge().then(age => {
    expect(age).toEqual(30);
  })
})
```

또는 더 간단하게 사용하려면 resolves, rejects Matcher를 사용하면 됩니다.

```
test("3초 후에 받아온 나이는 30", () => {
  return expect(asyncFn.getAge()).resolves.toEqual(30);
})
```

마찬가지로 에러 핸들링 하려면 에러 발생 시 'error' 라는 메세지를 체크해줍니다.

```
// asyncFn.js
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
        //resolve(age);
        reject("error")
      },3000);
    });
  }
}

module.exports = asyncFn;

// asyncFn.test.js
test("3초 후에 에러가납니다.", () => {
  return expect(asyncFn.getAge()).rejects.toMatch('error');
})
```

<hr />

다음은 async/await 로 테스트 하는 방법입니다.

### async / await 

asyncFn.js는 Promise 로 비동기 함수 테스트 처리하는 것과 똑같이 해주시면 되고
test파일에서 async / await 키워드를 사용하여 처리합니다.

```
// asyncFn.js

const asyncFn = {
  ...
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

// asyncFn.test.js
test("3초 후에 받아온 나이는 30입니다. async", async () => {
  const age = await asyncFn.getAge();
  expect(age).toEqual(30);
})
```

마찬가지로 에러 핸들링 하려면 에러 발생 시 'error' 라는 메세지를 체크해줍니다.

```
// asyncFn.js

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
        reject('error');
      },3000);
    });
  }
}

module.exports = asyncFn;

// asyncFn.test.js
test("3초 후에 에러가납니다. async", async () => {
  await expect(asyncFn.getAge()).rejects.toMatch('error');
})
```

<hr />

## 테스트 전후 작업

실제 테스트 시 하나의 case만 테스트 하는 것이 아니라 다중 case를 테스트하게 되며 이로 인해 발생하는 문제점을 확인해봅시다.

```

// fn.js
const fn = {
  add : (num1,num2) => num1 + num2,
}

module.exports = fn;

// fnAfterBefore.test.js
const fn = require('./fnAfterBefore');

let num = 0;

test('0 더하기 1은 1이야',()=>{
  num = fn.add(num, 1);
  expect(num).toBe(1) ;
});

test('0 더하기 2은 2이야',()=>{
  num = fn.add(num, 2);
  expect(num).toBe(2) ;
});

test('0 더하기 3은 3이야',()=>{
  num = fn.add(num, 3);
  expect(num).toBe(3) ;
});

test('0 더하기 4은 4이야',()=>{
  num = fn.add(num, 4);
  expect(num).toBe(4) ;
});
```

위와 같은 상황에서는 첫번째 test인 "0 더하기 1은 1이야"만 pass되고 나머지 test들은 통과하지 못하게됩니다.
```
  √ 0 더하기 1은 1이야 (2 ms)
  × 0 더하기 2은 2이야 (3 ms)
  × 0 더하기 3은 3이야 (1 ms)
  × 0 더하기 4은 4이야 (1 ms)
```

왜냐하면 num의 결과값이 각각 2,3,4가 나와야하지만 3,6,10이 나오게 되죠
```
● 0 더하기 2은 2이야

    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 3

  ● 0 더하기 3은 3이야

    expect(received).toBe(expected) // Object.is equality

    Expected: 3
    Received: 6

  ● 0 더하기 4은 4이야

    expect(received).toBe(expected) // Object.is equality

    Expected: 4
    Received: 10
```
왜이렇게 나오는지 보려면 num이 초기화가 되지 않고 그대로 사용되고 있기 때문에 이전 num을 그대로 사용했기 때문입니다.

이런 경우에 num을 test할 때마다 초기화 하려면 beforeEach()를 사용합니다.

```
const fn = require('./fnAfterBefore');

let num = 0;

beforeEach(()=>{
  num = 0;
})

test('0 더하기 1은 1이야',()=>{
  num = fn.add(num, 1);
  expect(num).toBe(1) ;
});

test('0 더하기 2은 2이야',()=>{
  num = fn.add(num, 2);
  expect(num).toBe(2) ;
});

test('0 더하기 3은 3이야',()=>{
  num = fn.add(num, 3);
  expect(num).toBe(3) ;
});

test('0 더하기 4은 4이야',()=>{
  num = fn.add(num, 4);
  expect(num).toBe(4) ;
});
```

각 test함수가 실행하기 전에 beforeEach함수가 실행되어 num=0으로 초기화 해주는 Jest hook입니다.
```
  √ 0 더하기 1은 1이야 (2 ms)
  √ 0 더하기 2은 2이야
  √ 0 더하기 3은 3이야 (1 ms)
  √ 0 더하기 4은 4이야

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

### beforeEach() / afterEach()
* 테스트가 실행되기 전에 처리해야할 코드가 있다면 beforeEach()를 사용하고,  
테스트가 실행된 후에 처리해야할 코드가 있다면 afterEach()를 사용합니다.

```
beforeEach(()=>{
  num = 0;
})

afterEach(()=>{
  num = 0;
})
```

만약 beforeEach() 함수와 afterEach() 함수가 오래 걸린다면 어떻게 해야할까요?

test 전에 user DB에 접근해서 user 정보를 가지고 오고,  
test 후에는 DB Connection을 끊는 작업을 해보도록 하겠습니다.  

각 작업은 0.5초 정도 걸린다고 가정하겠습니다.

```

// fnAfterBefore.js

const fn = {
  add : (num1,num2) => num1 + num2,
  connectUserDb : () => {
    return new Promise(res => {
      setTimeout(()=>{
        res({
          name: "Mike",
          age: 30,
          gender: "male",
        });
      }, 500);
    })
  },
  disConnectDb: () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      }, 500);
    })
  }
}

module.exports = fn;

// fnAfterBefore.test.js

const fn = require('./fnAfterBefore');

let user;

beforeEach(async () => {
  user = await fn.connectUserDb();
});
afterEach(()=>{
  return fn.disConnectDb();
})

test("이름은 Mike",() => {
  expect(user.name).toEqual("Mike");
})

test("나이는 30", () => {
  expect(user.age).toEqual(30);
})

test("성별은 남성", () => {
  expect(user.gender).toEqual("male");
})

--------------------------------------------

  √ 이름은 Mike (1016 ms)
  √ 나이는 30 (1022 ms)
  √ 성별은 남성 (1005 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.976 s, estimated 4 s
```

### beforeAll() / afterAll()
* db의 connect와 disconnect는 sql때와 같이 test할 때마다 연결하고 끊고 하는 것이 아니라  
한번에 가져와서 처리를 다 한다음 마지막에 끊어주는 것이 효율적이기 때문에 이 경우에는 beforeAll()과 afterAll()을 사용합니다.

```
const fn = require('./fnAfterBefore');

let user;

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

// 추가적으로 user는 let 키워드로 선언되어 block scope를 가지고 있지만
// beforeAll() 함수에서 할당받은 user를 test함수에서 사용가능한건 스코프체인 때문인 걸 잊지말자.

--------------------------------------------

  √ 이름은 Mike (4 ms)
  √ 나이는 30
  √ 성별은 남성

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.968 s, estimated 4 s
```

beforeEach()와 afterEach()를 사용하였을 때는 
```Time:        3.976 s, estimated 4 s```

beforeAll()과 afterAll()을 사용하였을 때는
```Time:        1.968 s, estimated 4 s```

밖에 걸리지 않게 됩니다.  
<br />

### describe()

만약 접근해야할 DB가 여러개라면 어떻게 할건가요?  
user db 말고 car db도 접근하는 예시를 봅시다.

```
// fnAfterBefore.js
const fn = {
  add : (num1,num2) => num1 + num2,
  connectUserDb : () => {
    return new Promise(res => {
      setTimeout(()=>{
        res({
          name: "Mike",
          age: 30,
          gender: "male",
        });
      }, 500);
    })
  },
  disConnectDb: () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      }, 500);
    })
  },
  connectCarDb : () => {
    return new Promise(res => {
      setTimeout(()=>{
        res({
          brand: "bmw",
          name: "z4",
          color: "red"
        });
      }, 500);
    })
  },
  disConnectCarDb: () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      }, 500);
    })
  }
}

module.exports = fn;

// fnAfterBefore.test.js
const fn = require('./fnAfterBefore');

let user;

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

```

테스트 파일에 많은 수의 테스트 함수가 작성되어 있는 경우, 연관된 테스트 함수들끼리 그룹화해놓으면 코드를 읽기가 좋습니다.  
다음과 같이 Jest의 describe() 함수를 통해 여러 개의 테스트 함수를 묶는 것이 가능합니다.

```
  √ 이름은 Mike (8 ms)
  √ 나이는 30
  √ 성별은 남성
  Car 관련 DB 작업
    √ 이름은 z4
    √ 브랜드는 bmw (1 ms)
    √ 색상은 red (1 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        3.043 s
```

다음은 describe 함수를 포함한 테스트에서  
beforeAll()  
beforeEach()  
afterEach()  
afterAll()  
실행순서를 확인해보겠습니다.

```
// fnAfterBeforeDescribe.test.js

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

---------------------------------------------------------------
    밖 beforeAll
    밖 beforeEach
    밖 test
    밖 afterEach
      안 beforeAll
    밖 beforeEach
      안 beforeEach
      안 test
      안 afterEach
    밖 afterEach
      안 afterAll
    밖 afterAll
```

여기서 알아두셔야 하는 부분은 describe 밖에 있는 beforeAll과 afterAll이 맨처음과 끝을 맡고 있고,  
describe를 실행하더라도 describe 앞뒤로 beforeEach와 afterEach가 감싸고 있음을 알고 있어야합니다.

### Skip / Only

이제 다른 예제를 봅시다.

```
// fnSkipOnly.test.js
const fn = require("./fn");

let num = 0;

test("0 더하기 1 은 1", () => {
  expect(fn.add(num, 1)).toBe(1);
})

test("0 더하기 2 은 2", () => {
  expect(fn.add(num, 2)).toBe(2);
})

test("0 더하기 3 은 3", () => {
  expect(fn.add(num, 3)).toBe(3);
})

test("0 더하기 4 은 4", () => {
  expect(fn.add(num, 4)).toBe(4);
  num = 10;
})

test("0 더하기 5 은 5", () => {
  expect(fn.add(num, 5)).toBe(6);
})
-----------------------------------------

  √ 0 더하기 1 은 1 (3 ms)
  √ 0 더하기 2 은 2
  √ 0 더하기 3 은 3
  √ 0 더하기 4 은 4
  × 0 더하기 5 은 5 (2 ms)

```
위의 경우와 같이 마지막 테스트인 "0 더하기 5 은 5"는 통과되지 않은 경우가 발생하면

1. 외부의 요인이 문제인지
2. 해당 테스트 코드가 문제인지 파악해야 합니다.

이런 경우 다른 테스트 코드들은 skip하고 문제가 발생한 test를 확인합니다.

문제가 발생한 test에 only함수를 사용합니다.

```
test.only("0 더하기 5 은 5", () => {
  expect(fn.add(num, 5)).toBe(6);
})
```

전체 코드는 아래와 같습니다.


```
const fn = require("./fn");

let num = 0;

test("0 더하기 1 은 1", () => {
  expect(fn.add(num, 1)).toBe(1);
})

test("0 더하기 2 은 2", () => {
  expect(fn.add(num, 2)).toBe(2);
})

test("0 더하기 3 은 3", () => {
  expect(fn.add(num, 3)).toBe(3);
})

test("0 더하기 4 은 4", () => {
  expect(fn.add(num, 4)).toBe(4);
  num = 10;
})

test.only("0 더하기 5 은 5", () => {
  expect(fn.add(num, 5)).toBe(6);
})

---------------------------------------------

  × 0 더하기 5 은 5 (4 ms)
  ○ skipped 0 더하기 1 은 1
  ○ skipped 0 더하기 2 은 2
  ○ skipped 0 더하기 3 은 3
  ○ skipped 0 더하기 4 은 4

```

only함수를 선언하여 다른 테스트 함수는 skip처리되었고,  
only함수를 선언한 테스트 함수를 내부를 확인하였을 때  

1. pass하지 못하면 -> 해당 함수가 문제
2. pass하였다면 -> 외부 요인이 문제


```
test.only("0 더하기 5 은 5", () => {
  expect(fn.add(num, 5)).toBe(5);
})
```
수정하고 다시 test하면 pass하게 됩니다.

pass 확인 후 only함수를 풀어주고 다시 테스트 시 문제가 발생하게 되면  
외부 요인이 문제라는 것을 파악할 수 있습니다.

```
const fn = require("./fn");

let num = 0;

test("0 더하기 1 은 1", () => {
  expect(fn.add(num, 1)).toBe(1);
})

test("0 더하기 2 은 2", () => {
  expect(fn.add(num, 2)).toBe(2);
})

test("0 더하기 3 은 3", () => {
  expect(fn.add(num, 3)).toBe(3);
})

test("0 더하기 4 은 4", () => {
  expect(fn.add(num, 4)).toBe(4);
  num = 10;
})

test("0 더하기 5 은 5", () => {
  expect(fn.add(num, 5)).toBe(5);
})

------------------------------------------
  √ 0 더하기 1 은 1 (2 ms)
  √ 0 더하기 2 은 2 (1 ms)
  √ 0 더하기 3 은 3 (1 ms)
  √ 0 더하기 4 은 4
  × 0 더하기 5 은 5 (3 ms)
```

다시 마지막 test 함수가 pass하지 못하였다면 외부 요인이 문제였기 때문에 다른 test를 체크해보면
"0 더하기 4 은 4" 에서 num = 10 으로 재할당 된 것을 볼 수 있습니다.

해당 테스트를 당장 수정할 수 없는 경우 skip함수를 처리하면 일단은 건너뛰고 테스트하게 됩니다.

```
const fn = require("./fn");

let num = 0;

test("0 더하기 1 은 1", () => {
  expect(fn.add(num, 1)).toBe(1);
})

test("0 더하기 2 은 2", () => {
  expect(fn.add(num, 2)).toBe(2);
})

test("0 더하기 3 은 3", () => {
  expect(fn.add(num, 3)).toBe(3);
})

test.skip("0 더하기 4 은 4", () => {
  expect(fn.add(num, 4)).toBe(4);
  num = 10;
})

test("0 더하기 5 은 5", () => {
  expect(fn.add(num, 5)).toBe(5);
})
------------------------------------------
  √ 0 더하기 1 은 1 (2 ms)
  √ 0 더하기 2 은 2
  √ 0 더하기 3 은 3
  √ 0 더하기 5 은 5 (1 ms)
  ○ skipped 0 더하기 4 은 4

```

위와 같이 "0 더하기 4 은 4" 테스트는 skip 된 것을 확인할 수 있습니다.

물론 주석처리하셔도 됩니다.

```
// test.skip("0 더하기 4 은 4", () => {
//   expect(fn.add(num, 4)).toBe(4);
//   num = 10;
// })
```