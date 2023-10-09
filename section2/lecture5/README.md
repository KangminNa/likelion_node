# global과 콘솔, 타이머

# 3.4 노드 내장 객체 알아보기

---

# 1. Global

- 노드의 전역객체
- 브라우저의 window 같은 역할
- 모든 파일에서 접근 가능
- window처럼 생략도 가능(console, require도 global의 속성)

```jsx
$ node
> global

> 엄청나게 많은 결과값들이 제공 됨.
```

- global.console.log, global.require → 전부 global안에 있음

# global 속성 공유

- global 속성에 값을 대입하면 다른 파일에서도 사용 가능

```jsx
file : globalA.js

module.exports = () => global. message;
```

```jsx
file : globalB.js

const A = require ('./globalA');

global.message = '안녕하세요';
console.log(A());
```

```jsx
콘솔

$ node globalB
> 안녕하세요
```

- 이렇게 코드를 작성하면 안됨

# 3. Console.log

- java, c → print와 같은 역할
- 객체 접근에 console.dir도 가능
- console.time && console.timeEnd → 코드 사이에 시간을 알려줌.
- console.table은 결과값을 table로 보여줌

# 5. 타이머 메서드

- setTimeout
- setInterval → 변수에다가 넣어서 사용해야 함.
- setImmediate → 백그라운드에 넘어가면 동시에 실행할 수 있게 할 수 있기때문에, 비동기 코드
- …
- clear~ 은 설정한 time메소드를 취소