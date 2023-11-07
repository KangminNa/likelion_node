const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models'); // Sequelize와 데이터베이스 모델을 불러옵니다.
const indexRouter = require('./routes'); // 루트 라우터를 불러옵니다.
const usersRouter = require('./routes/users'); // 사용자 라우터를 불러옵니다.
const commentsRouter = require('./routes/comments'); // 댓글 라우터를 불러옵니다.

const app = express(); // Express 애플리케이션을 생성합니다.
app.set('port', process.env.PORT || 3008); // 포트 설정. 기본값은 3008입니다.
app.set('view engine', 'html'); // 뷰 엔진으로 Nunjucks를 설정합니다.
nunjucks.configure('views', {
  express: app,
  watch: true, // Nunjucks 파일의 변경을 실시간으로 감지하여 자동으로 업데이트합니다.
});
sequelize.sync({ force: false }) // Sequelize를 사용하여 데이터베이스와 모델을 동기화합니다.
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev')); // HTTP 요청 로그를 기록하는 미들웨어를 사용합니다.
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일을 제공하기 위한 미들웨어를 설정합니다.
app.use(express.json()); // JSON 데이터를 파싱하기 위한 미들웨어를 사용합니다.
app.use(express.urlencoded({ extended: false })); // URL-encoded 데이터를 파싱하기 위한 미들웨어를 사용합니다.

app.use('/', indexRouter); // 루트 경로에 대한 라우터를 등록합니다.
app.use('/users', usersRouter); // '/users' 경로에 대한 사용자 라우터를 등록합니다.
app.use('/comments', commentsRouter); // '/comments' 경로에 대한 댓글 라우터를 등록합니다.

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 404 오류를 발생시키고 다음 미들웨어로 전달합니다.
});

app.use((err, req, res, next) => {
  res.locals.message = err.message; // 에러 메시지를 렌더링할 수 있도록 로컬 변수에 설정합니다.
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 개발 환경에서만 에러 상세 정보를 렌더링합니다.
  res.status(err.status || 500); // 에러 상태 코드를 설정합니다. 기본값은 500 (서버 오류)입니다.
  res.render('error'); // 에러 페이지를 렌더링합니다.
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중'); // 서버가 지정된 포트에서 대기 중입니다.
});
