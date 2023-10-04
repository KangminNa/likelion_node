# ECMAScript 모듈

---

- 표준
- node 생태계에서는 자체적인 표준을 정함
- ES 모듈이 표준으로 정해짐
- Node에서는 표준으로 사용되진 않음.
- 곧 전환 될거임.
- ES 모듈을 쓰는 라이브러리가 많아져서 이제 배워야 함

# 코드

```jsx
var.mjs

export const odd = 'MJS 홀수입니다';
export const even= 'MJS 짝수입니다';

// export로 바로 불러올 수 있음
```

```jsx
func.mjs

import {odd, even} form './var.mjs'; // mjs 불러오기

function test1() {}

export default test;

```

```jsx
index.mjs

import {odd, even} form './var.mjs'; // mjs 불러오기
import test1 from './func.mjs';

function test2() {}

console.log(test1());
console.log(test2());

```

[image1](https://github.com/KangminNa/likelion_node/blob/main/section2/lecture4/1.png?raw=true)

[image2](https://github.com/KangminNa/likelion_node/blob/main/section2/lecture4/2.png?raw=true)

[image3](https://github.com/KangminNa/likelion_node/blob/main/section2/lecture4/3.png?raw=true)

- ES 모듈을 사용하면 오른쪽과 같이 사용할 수 있음.

# 다이내믹 임포트

- Common JS 모듈에서는 가능하지만 ES 모듈에서는 안됨

```jsx
dynamic.js

const a = false;
if(a){
	require('./func');
}
console.log('성공');

$ node dynamic
성공
```

```jsx
dynamic.mjs

const a = false;
if(a){
	import './func';
}
console.log('성공');

$ node dynamic
error

// error의 이유는 import는 항상 최상단에 있어야 하기 때문
```

```jsx
dynamic.mjs

const a = false;
if(a){
	const m1 = await import('./func.mjs'); // import fucntion을 이용하여 사용할 수 있음.
	console.log(m1);
	const m2 = await import('./var.mjs'); 
	console.log(m2);
}
console.log('성공');

$ node dynamic
[Module : null prototype] {default : [Function: test1]}
[Module : null prototype] {even: , odd: }

// top level await
// dynamic import
```
