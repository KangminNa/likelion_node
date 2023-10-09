# os와 path

# 1. OS

- 운영체제의 정보를 담고 있음
- 모듈은 require로 가져옴(내장 모듈이라 경로 대신 이름만 적어줘도됨)

```jsx
file : os.js

const os = require('os');
```

# 2. os 모듈 메소드

- node 다운받는 곳에서 api docs 들어가서 확인하면 편함.

```jsx
os.arch(): process.arch와 동일합니다.
os.platform(): process.platform과 동일합니다.
os.type(): 운영체제의 종류를 보여줍니다. 
os.uptime(): 운영체제 부팅 이후 흐른 시간(초)을 보여줍니다. process.uptime()은 노드의 실행 시간이었습니다.
os.hostname(): 컴퓨터의 이름을 보여줍니다.
os.release(): 운영체제의 버전을 보여줍니다.
os.homedir(): 홈 디렉터리 경로를 보여줍니다.
os.tmpdir(): 임시 파일 저장 경로를 보여줍니다.
os.cpus(): 컴퓨터의 코어 정보를 보여줍니다.
os.freemem(): 사용 가능한 메모리(RAM)를 보여줍니다.
os.totalmem(): 전체 메모리 용량을 보여줍니다.
```

# 3. path

- 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈

```jsx
const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log('path.basename - extname:', path.basename(string, path.extname(string)));
console.log('------------------------------');
console.log('path.parse()', path.parse(string));
console.log('path.format():', path.format({
  dir: 'C:\\users\\zerocho',
  name: 'path',
  ext: '.js',
}));
console.log('path.normalize():', path.normalize('C://users\\\\zerocho\\\path.js'));
console.log('------------------------------');
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('------------------------------');
console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js', 'C:\\'));
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/zerocho'));
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/zerocho'));
```

# 4. path 모듈 메소드

```jsx
path.sep: 경로의 구분자입니다. Windows는 \, POSIX는 /입니다.
path.delimiter: 환경 변수의 구분자입니다. process.env.PATH를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있습니다. Windows는 세미콜론(;)이고 POSIX는 콜론(:)입니다.
path.dirname(경로): 파일이 위치한 폴더 경로를 보여줍니다.
path.extname(경로): 파일의 확장자를 보여줍니다.
path.basename(경로, 확장자): 파일의 이름(확장자 포함)을 보여줍니다. 파일의 이름만 표시하고 싶다면 basename의 두 번째 인자로 파일의 확장자를 넣어주면 됩니다.
path.parse(경로): 파일 경로를 root, dir, base, ext, name으로 분리합니다.
path.format(객체): path.parse()한 객체를 파일 경로로 합칩니다.
path.normalize(경로): /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환해줍니다.
path.isAbsolute(경로): 파일의 경로가 절대경로인지 상대경로인지 true나 false로 알려줍니다.
path.relative(기준경로, 비교경로): 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려줍니다.
path.join(경로, .. .): 여러 인자를 넣으면 하나의 경로로 합쳐줍니다. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리해줍니다.
path.resolve(경로, .. .): path.join()과 비슷하지만 차이가 있습니다. 차이점은 다음에 나오는 Note에서 설명합니다.
```

# 5. 알아둬야할 path 관련 정보

```jsx
join과 resolve의 차이: resolve는 /를 절대경로로 처리, join은 상대경로로 처리
상대 경로: 현재 파일 기준. 같은 경로면 점 하나(.), 한 단계 상위 경로면 점 두 개(..)
절대 경로는 루트 폴더나 노드 프로세스가 실행되는 위치가 기준

\\와 \ 차이: \는 윈도 경로 구분자, \\는 자바스크립트 문자열 안에서 사용(\가 특수문자라 \\로 이스케이프 해준 것)

윈도에서 POSIX path를 쓰고 싶다면: path.posix 객체 사용
POSIX에서 윈도 path를 쓰고 싶다면: path.win32 객체 사용
```