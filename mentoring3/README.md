# REST API

- Representational State Transfer
- 서버의 자원을 정의하고 자원에 대한 주소를 지정
- /user 이면 사용자 정보에 관한 정보를 요청하는 것
- 즉 서버의 주소를 개발자가 직접 구현

### HTTP 요청 메소드

- GET : 서버 자원을 가져오려고 할 때
- POST : 서버에 자원을 등록 및 사용
- PUT : 전체 수정
- PATCH : 부분 수정
- DELETE : 삭제

### HTTP 프로토콜

- 누구나 프로토콜로 소통 가능
- REST API를 사용한 주소 체계를 이용하는 서버
- 의미 전달만 잘되게 전하면 된다!

### 실습

- pwd : ch4/4.2
- about.html, restFront.html
- 서버 : resServer.js, resFront.js

# POST, PUT, DELETE 요청 보내기
### 실습

- 저번 실습 파일 구조 그대로 이어서 실습 이어감
- html, css, js → resServer.js 에게 GET 요청을 보내서 파일을 불러옴
- 200, 400, 500 단위에 주소 요청에 대한 예외처리를 통해 파일을 불러오지 못한다고 사용자게에 알려줌
- 만약 조건에 맞는 동작을 한다면 작성되어 있는 코드 로직을 통해 resFront.js 로 이동
- resServer.js에서는 데이터를 보내고 싶은데, body, json 형식으로 만들어서 보냄.
- 현재는 메모리에 데이터를 적재하기 때문에 서버를 끄면 데이터가 보이지 않음.
- 즉 예외 처리는 HTTP Status를 이용해서 예외처리를 해야함.
- post 해서 유저를 등록 get으로 조회
- 닉네임 수정 put 요청으로 수정
- delete로 삭제
- express를 사용하면서 코드를 깔끔하게 할 예정임(6장)

# express 서버 사용해보기
### Express

---

- 이걸 사용하면 http 서버로는 다시 못돌아간다.
- 업데이트 및 다운로드 수를 확인하면 좋은 걸 하면 된다.
- 노드에서 Express를 제일 좋다.

### 실습

---

- ch6/6.1 package.json 작성
- $ npm init 으로 만들어 주기
- $ npm i를 해야함(직접 작성했으면)
- ch6/6.1/learn_express/app.js
- 더 이상 if문으로 안해도 됨
- 더욱 깔끔한 코드 형태로 제공함
- process.env.PORT → env를 활용해서 전역변수 관리가 쉬움
- nodemon → 알아서 400, 500을 처리해줌 심지어 알아서 서버를 재시작해줌
- npm i 를 통해서 nodemon 깔끔하게 다시 설치

# express로 html 서빙하기

### express로 html 서빙하기

- ch6/6.1/learn_express/index.html 활용
- app.js에서 req를 index.html로 변경
- $ npm ls → 사용 패키지 확인

# 미들웨어 사용하기

---

- ch6/6.1/learn-express
- app.use(req, res, next) 각 부분의 공통된 코드를 실행하고 싶을 때 사용하는 파라미터들
- 와일드 카드를 이용해서 :/name 을 이용해서 공통된 파라미터를 다 next할 수 없기 때문에 위의 문법을 이용해서 사용함
- 위에서 아래로 순차적으로 처리해야하는 것을 꼭 기억해두기
- 와일드 카드는 무조건 실행하고 싶은 모듈 밑에다가 처리하기
- ‘*’는 모든 요청을 받아버림. 범위가 제일 넓은 미드웨어이기 때문에 가장 위에 있으면 모든 요청을 혼자서 처리하고 끝냄.

# 미들웨어 특성 이해하기

---

- ch6/6.1/learn-express/app.js
- 파라미터 = app.use(‘주소 범위 지정’, (req, res))
- 파라미터에서 next를 이어 사용하면 미들웨어가 이어져서 작동함.
- 맨처음 app에 관련된 설정
- 이후 라우터 설정
- 마지막에 오류 미들웨어를 작성
- 오류 미들웨어는 총 4개의 파라미터의 값이 필요함.
- 오류(err, req, res, next) 꼭 이 네개를 꼭 꼭 꼭 써야함!!!!!
- 없는 라우터 주소여도 오류 미들웨어를 사용하면 자세한 오류가 나오지않고 400 반환
- 한 라우터에서 다양한 res.send를 두번이상 작성하면 에러 발생. 제일 중요!!!!!!!!!!
- res.writeHead(200, {Content-Type : ‘text/plain’}) → res.status 즉 기존 http 에서 쓰던 방식에서 express 식으로 써야함.

# next 활용법

---

- ch6/6.1/learn-express/app.js
- js function Return을 하지 않으면 종료 X
- res.json({hello : ‘zerocho‘}) 이것만 기억해두면 돼!
- try~catch{ next(err) } 를 통해서 err 미들웨어 처리
- next(route)를 통해 조건문을 통해서 처리할 수 있음

# morgan, bodyParser, cookieParser

---

- ch6/6.2/learn-express/$ npm i morgan, bodyParser, cookieParser를 설치
- bodyParser(쓰는 사람 옛날 사람)
- morgan(’dev’) setting 합시다!, (combined) → 콤바인은 개발할 때 유용! 배포는 ‘dev’
- 해당 실행 되는 서버 응답 시간 정보를 알려줌.
- cookieParser → 쿠키를 처리하기 위한 req.cookies(){ 메소드로 처리를 매우 편하게 가능함!}
- 오.. 암호화된 쿠키도 사용가능!
- express.json(), express.urlencode()등 bodyParser가 express로 들어가 있음 완전 너무 좋다.
- 이번 실습에 했던 모듈들을 기본적으로 세팅하고 node 개발을 시작.
