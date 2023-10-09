# pipe와 스트림 메모리 효율 확인

# 15. 여러개의 스트림 연결하기

```jsx
pipe로 여러 개의 스트림을 이을 수 있음

파일을 압축한 후 복사하는 예제
압축에는 zlib 내장 모듈 사용(createGzip으로 .gz 파일 생성)
```

- 스트림끼리 파이프를 만들어서 액체를 흘리듯 스트림을 이용할 수 있음 이것이 pipe

```jsx
const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);
```

# 16. 큰 파일 만들기

- 1GB 정도의 파일을 만드는데, createWriteStream으로 만들어야 메모리 문제가 생기지 ㅇ낳음.

```jsx
const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 10000000; i++) {
  file.write('안녕하세요. 엄청나게 큰 파일을 만들어 볼 것입니다. 각오 단단히 하세요!\n');
}
file.end();
```

# 17. 메모리 체크하기

- 버퍼 방식과 스트림 방식 메모리 사용량 비교

```jsx
Buffer
const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss);

```

```jsx
before:  30208000
buffer:  1030991872
```

```jsx
Stream
const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
  console.log('stream: ', process.memoryUsage().rss);
});

```

```jsx
before:  30334976
stream:  51748864
```

- 확실히 스트림으로 처리하는게 최고임.

# 18. 기타 fs 메서드

```jsx
파일 및 폴더 생성
const fs = require('fs');

fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      fs.mkdir('./folder', (err) => {
        if (err) {
          throw err;
        }
        console.log('폴더 만들기 성공');
        fs.open('./folder/file.js', 'w', (err, fd) => {
          if (err) {
            throw err;
          }
          console.log('빈 파일 만들기 성공', fd);
          fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
            if (err) {
              throw err;
            }
            console.log('이름 바꾸기 성공');
          });
        });
      });
    } else {
      throw err;
    }
  } else {
    console.log('이미 폴더 있음');
  }
});

//promisse 방식
const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject('이미 폴더 있음');
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js', 'w');
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch((err) => {
    console.error(err);
  });
```

```jsx
파일 및 폴더 삭제
const fs = require('fs');

fs.readdir('./folder', (err, dir) => {
  if (err) {
    throw err;
  }
  console.log('폴더 내용 확인', dir);
  fs.unlink('./folder/newfile.js', (err) => {
    if (err) {
      throw err;
    }
    console.log('파일 삭제 성공');
    fs.rmdir('./folder', (err) => {
      if (err) {
        throw err;
      }
      console.log('폴더 삭제 성공');
    });
  });
});
//promisse 방식
const fs = require('fs').promises;

fs.readdir('./folder')
  .then((dir) => {
    console.log('폴더 내용 확인', dir);
    return fs.unlink('./folder/newfile.js');
  })
  .then(() => {
    console.log('파일 삭제 성공');
    return fs.rmdir('./folder');
  })
  .then(() => {
    console.log('폴더 삭제 성공');
  })
  .catch((err) => {
    console.error(err);
  });
```

```jsx
파일 및 폴더 복사
const fs = require('fs');

fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      fs.mkdir('./folder', (err) => {
        if (err) {
          throw err;
        }
        console.log('폴더 만들기 성공');
        fs.open('./folder/file.js', 'w', (err, fd) => {
          if (err) {
            throw err;
          }
          console.log('빈 파일 만들기 성공', fd);
          fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
            if (err) {
              throw err;
            }
            console.log('이름 바꾸기 성공');
          });
        });
      });
    } else {
      throw err;
    }
  } else {
    console.log('이미 폴더 있음');
  }
});
```

```jsx
파일 및 폴더 감시(변경사항 발생 시 이벤트 호출)

const fs = require('fs');

fs.watch('./target.txt', (eventType, filename) => {
  console.log(eventType, filename);
});
```