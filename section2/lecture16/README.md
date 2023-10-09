# 에러 처리하기

# 1. 예외 처리하기

- 노드는 싱글스레드이기 때문에 예외를 잘 처리해야함
- 점원과 주방장이 쓰러지면 대체해줄 친구가 없음

# 2. try catch문

- 기본적으로 try  catch 문으로 예외를 처리

```jsx
setInterval(() => {
  console.log('시작');
  try {
    throw new Error('서버를 고장내주마!');
  } catch (err) {
    console.error(err);
  }
}, 1000);
```

# 3. 노드 비동기 메서드의 에러

- 노드 비동기 메서드의 에러는 따로 처리하지 않아도 됨.
- 콜백 함수에서 에러 객체 제공

```jsx
const fs = require('fs');

setInterval(() => {
  fs.unlink('./abcdefg.js', (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
```

# 4. 프로미스의 에러

- 프로미스의 에러는 따로 처리하지 않아도 됨
    - 버전이 올라가면 동작이 바뀔 수 있음

```jsx
const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./abcdefg.js')
}, 1000);
```

# 5. 예측 불가능한 에러 처리하기

- 최후의 수단.
- 콜백 함수의 동작 보장 X
- 복구 작업용으로 쓰는 것은 부적합
- 에러 내용 기록 용으로만 쓰는게 좋음

```jsx
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다');
}, 2000);
```