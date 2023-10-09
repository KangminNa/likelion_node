# HTTP 서버 만들기

# 1. 서버와 클라이언트

- 노드로 서버를 돌리는 코드를 작성한다
- 우리는 클라이언트와 서버를 꼭 구별해야함

# 2. 노드로 http 서버 만들기

- http 요청에 응답하는 노드 서버
    - createServer로 요청 이벤트에 대기
    - req 객체는 요청에 관한 정보가, res 객체는 응답에 관한 정보가 담겨 있음

```jsx
const http = require('http');

http.createServer((req, res) => {
  // 여기에 어떻게 응답할 지 적어줍니다.
});
```

# 3. 8080 포트에 연결하기

- res 메서드로 응답 보냄
    - write로 응답 내용을 적고
    - end로 응답 마무리(내용을 넣어도 됨)
- listen(port) 메서드로 특정 포트에 연결

```jsx
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });
```

# 5. localhost와 포트

- localhost는 컴퓨터 내부 주소
    - 외부에서는 접근 불가능
- 포트는 서버 내에서 프로세스를 구분하는 번호
    - 기본적으로 http 서버는 80번 포트 사용(생략가능, https는 443)
    - 다른 포트로 데이터베이스나 다른 서버 동시에 연결 가능