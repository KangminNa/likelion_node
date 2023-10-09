# 파일 시스템 사용하기

# 1. fs

- 파일 시스템에 접근하는 모듈
- 파일/폴더 생성, 삭제, 읽기, 쓰기 가능
- 웹 브라우저에서는 제한적이었으나 노드는 권한을 가지고 있음
- 파일 읽기 예제(결과의 버퍼는 뒤에서 설명함)
- 대신 조심해야함. 노드가 권한을 가지고 있기 때문에 조심!

```jsx

file : readme.txt

저를 읽어주세요.
```

```jsx
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});
```

- err, data 순으로 이어짐 무조건! 콜백 기준으로

# 2. fs 프로미스

- 콜백 방식 대신 프로미스 방식으로 사용 가능
- require(’fs’).promises
- 사용하기 훨씬 더 편해서 프로미스 방식으로 추천함

```jsx
const fs = require('fs').promises;

fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
```

- 프로미스 방식으로 하자!

# 3. fs로 파일 만들기

- 파일을 만드는 예제

```jsx
const fs = require('fs');

fs.writeFile('./writeme.txt', '글이 입력됩니다', (err) => {
  if (err) {
    throw err;
  }
  fs.readFile('./writeme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.toString());
  });
});
```

# 4. 동기 메서드와 비동기 메서스

- 노드는 대부분의 내장 모듈 메서드를 비동기 방식으로 처리
- 비동기는 코드의 순서와 실행순서가 일치하지 않는 것을 의믜
- 일부는 동기 방식으로 사용가능
- 동기 : 동시에 일어나는
- 비동기 : 동시에 일어나지 않는

```jsx
file : readme2.txt
저를 여러 번 읽어보세요.
```

```jsx
const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
console.log('끝');
```

```jsx
시작
끝
2번 저를 여러 번 읽어보세요.
3번 저를 여러 번 읽어보세요.
1번 저를 여러 번 읽어보세요.

시작
끝
1번 저를 여러 번 읽어보세요.
3번 저를 여러 번 읽어보세요.
2번 저를 여러 번 읽어보세요.

시작
끝
2번 저를 여러 번 읽어보세요.
1번 저를 여러 번 읽어보세요.
3번 저를 여러 번 읽어보세요.
```

# 5. 동기 메서드와 비동기 메서드

- 이전 예제를 매번 순서에 맞게 실행하려면?
- 동기와 비동기 : 백그라운드 작업 완료 확인 여부
- 블로킹과 논 블로킹 : 함수가 바로 return 되는지 여부
- 노드에서는 대부분 동기-블로킹 방식과 비동기-논 블로킹 방식.

```jsx
동기-블로킹

- 딱 한번만?
- 초기화할때는 좋음
- 서버 초기화할때는 좋음

```

```jsx
비동기-논블로킹

- 효율적!
- 순서가 맞추면 좋겠다.

const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
  fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log('2번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
      if (err) {
        throw err;
      }
      console.log('3번', data.toString());
      console.log('끝');
    });
  });
});

// 이렇게 하면 콜백이니깐 promiss로 하면?

const fs = require('fs').promises;

console.log('시작');
fs.readFile('./readme2.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch((err) => {
    console.error(err);
  });

```

```jsx
시작
1번 저를 여러 번 읽어보세요.
2번 저를 여러 번 읽어보세요.
3번 저를 여러 번 읽어보세요.
끝
```

- 결론 비동기를 사용하지만 순서를 맞추는 작업으로 최대한 해야한다.