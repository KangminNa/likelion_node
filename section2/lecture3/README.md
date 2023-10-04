# Section2. export, this, require

# export
```
const odd = '홀수입니다.';
const even = '짝수입니다.';

exports.odd = odd;
exports.even = even;

module.exports === exports === {} // 빈 객체
module.exports = {
	odd,
	even,
}

module.exports = {} //module.exports !== exports

----------------------------------------------------------------

function test(){}

module.exports = test;
module.exports !== exports === {}; // 참조 관계가 끊어짐

----------------------------------------------------------------

```

- module, exports를 같이 쓸 순 없다
- 그래서 하나를 참조하고 싶을 때는 module로 쓰고
- 여러개를 쓰고 싶을 때는 exports로 하는걸로 약속하자.
- 물론 module.exports = {} 로 여러개를 참조 할 순 있지만 이럴 경우 기존에 있는 객체 참조가 끊기기 때문에 유의하자.

# this

```r
console.log(this); // 전역객체 global?
console.log(this === module.exports) // ture

function () {
	console.log(this === global); //true
} // function this는 global
a();

```

# require

```r
require('./var'); // 다른 파일을 실행만 하고 싶다.
console.log(require); // require log가 나옴.

```

- 파일은 한번만 읽고 require에 있는 캐쉬에 있는 파일을 두번째에 읽는다.
- 처음에는 실제 파일을 불러오고 두번째는 캐쉬에서 불러온다.
- cashing 작업을 할때 require를 하면 됨.

# 순환참조

```r
file:dep1
require('./dep2');

file:dep2
require('./dep1');

// 반복과정이 무한 사이클이 되면 순환참조가 됨
// 빈 객체로 변환해버림. -> 노드가 순환참조를 막아버림
// 
```