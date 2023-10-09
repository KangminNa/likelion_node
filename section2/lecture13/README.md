# 버퍼와 스트림 이해하기

# 9. 버퍼와 스트림 이해하기

- 버퍼 : 일정한 크기로 모아두는 데이터
    - 일정한 크기가 되면 한 번에 처리
    - 버퍼링 : 버퍼에 데이터가 찰 때까지 모으는 작업
- 스트림 : 데이터의 흐름
    - 일정한 크기로 나눠서 여러 번에 걸쳐서 처리
    - 버퍼(또는 청크)의 크기를 작게 만들어서 주기적으로 데이터를 전달
    - 스트리밍: 일정한 크기의 데이터를 지속적으로 전달하는 작업

# 10. 버퍼 사용하기

- 노드에서는 Buffer 객체 사용
- 스트림을 쓰면 더 효율적임

```jsx
const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
```

```jsx
from(): <Buffer ec a0 80 eb a5 bc 20 eb b2 84 ed 8d bc eb a1 9c 20 eb b0 94 ea bf 94 eb b3 b4 ec 
84 b8 ec 9a 94>
length: 32
toString(): 저를 버퍼로 바꿔보세요
concat(): 띄엄 띄엄 띄어쓰기
alloc(): <Buffer 00 00 00 00 00>
```

# 11. Buffer의 메서드

- 노드에서는 Buffer 객체 사용

```jsx
from(문자열): 문자열을 버퍼로 바꿀 수 있습니다. length 속성은 버퍼의
크기를 알려줍니다. 바이트 단위입니다.

toString(버퍼): 버퍼를 다시 문자열로 바꿀 수 있습니다. 이때 base64나
hex를 인자로 넣으면 해당 인코딩으로도 변환할 수 있습니다.

concat(배열): 배열 안에 든 버퍼들을 하나로 합칩니다.

alloc(바이트): 빈 버퍼를 생성합니다. 바이트를 인자로 지정해주면 해당
크기의 버퍼가 생성됩니다.
```

# 12. 파일 읽는 스트림 사용하기

```jsx
fs.createReadStream

createReadStream에 인자로 파일 경로와 옵션 객체 전달

highWaterMark 옵션은 버퍼의 크기(바이트 단위, 기본값 64KB)

data(chunk 전달), end(전달 완료), error(에러 발생) 이벤트 리스너와 같이 사용
```

```jsx
file : readme3.txt
저는 조금씩 조금씩 나눠서 전달됩니다. 나눠진 조각을 chunk라고 부릅니다.
```

```jsx
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error :', err);
});
```

```jsx
C:\Github\likelion_node\master\ch3\3.6>node createReadStream.js
data : <Buffer ec a0 80 eb 8a 94 20 ec a1 b0 ea b8 88 ec 94 a9> 16
data : <Buffer 20 ec a1 b0 ea b8 88 ec 94 a9 20 eb 82 98 eb 88> 16
data : <Buffer a0 ec 84 9c 20 ec a0 84 eb 8b ac eb 90 a9 eb 8b> 16
data : <Buffer 88 eb 8b a4 2e 20 eb 82 98 eb 88 a0 ec a7 84 20> 16
data : <Buffer ec a1 b0 ea b0 81 ec 9d 84 20 63 68 75 6e 6b eb> 16
data : <Buffer 9d bc ea b3 a0 20 eb b6 80 eb a6 85 eb 8b 88 eb> 16
data : <Buffer 8b a4 2e> 3
end : 저는 조금씩 조금씩 나눠서 전달됩니다. 나눠진 조각을 chunk라고 부릅니다.
```

# 13. 파일 쓰는 스트림 사용하기

```jsx
fs.createWriteStream

createReadStream에 인자로 파일 경로 전달

write로 chunk 입력, end로 스트림 종료

스트림 종료 시 finish 이벤트 발생
```

```jsx
const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();
```

```jsx
C:\Github\likelion_node\master\ch3\3.6>node createWriteStream.js
파일 쓰기 완료
```