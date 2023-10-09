# 스레드풀과 커스텀 이벤트

# 23. 스레드풀 알아보기

- fs, crypto, zlib 모듈의 메서드를 실행할 때는 백그라운드에서 동시에 실행됨
- 스레드풀이 동시에 처리해줌
- 백그라운드에서 몇개가 돌까? 공식문서에서 일단 확인하고
- 원래는 4개만 돔.

```jsx
const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('5:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('6:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('7:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('8:', Date.now() - start);
});

// 해시화 함수를 이용해서 8개를 만든 이후에 몇초 걸리는지 확인
```

```jsx
2: 2285
3: 2513
1: 2521
4: 2532
6: 4538
5: 4586
7: 4632
8: 4651
```

# 24. UV_THREAD_SIZE

- 스레드풀을 직접 컨트롤 할 수는 없지만 개수 조절은 가능

# 2. 커스텀 이벤트 예제

- 콜백함수 등록해두는 것 처럼!
- 여러 파일 간의 등록한 이벤트를 호출하는 것

```jsx
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  console.log('이벤트 1');
});
myEvent.on('event2', () => {
  console.log('이벤트 2');
});
myEvent.on('event2', () => {
  console.log('이벤트 2 추가');
});
myEvent.once('event3', () => {
  console.log('이벤트 3');
}); // 한 번만 실행됨

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3');
myEvent.emit('event3'); // 실행 안 됨

myEvent.on('event4', () => {
  console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안 됨

const listener = () => {
  console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2'));
```

```jsx
이벤트 1
이벤트 2
이벤트 2 추가
이벤트 3
2
```