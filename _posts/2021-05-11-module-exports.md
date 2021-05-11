---
title: module.exports(exports) and require(), export and import
tags:
  - module
  - export
  - import
  - module.exports
  - require
---

Javascript Module을 사용하는 방법들간의 차이점.<br>
[Import/Export Vs Require/Module.exports](https://arunrajeevan.medium.com/import-export-vs-require-module-exports-572f63516745)

<!--more-->
### Module
여러 기능들에 관한 코드가 모여있는 하나의 파일.<br>

### Module 표준, 갈라지다 (CommonJS VS AMD AND UMD)
[JavaScript 표준을 위한 움직임: CommonJS와 AMD](https://d2.naver.com/helloworld/12864)<br>
위의 링크는, 별 내용 아닌데 좀 깁니다.<br>
요약 하자면, 비동기 처리에 대한 표준을 정할때 의견대립으로 갈라졌으며,<br>
CommonJS는 서버사이드에서 많이 쓰이고, 아래 exports, require 를 보면 됩니다.<br>
AMD는 브라우저에서도 비동기 모듈을 사용하는 표준을 만들려 했습니다.<br>
AMD의 경우 유명한 것이 RequireJS인데, define(), require() 형태로 사용됩니다. <br>
UMD는 이 둘을 통합하려는 노력이라고 합니다.<br>
<br>

<div class="alert alert-secondary" role="alert">
  RequireJS에 대한 여담 입니다만, <br>
  저는 과거 SI회사가 웹페이지를 쉽게 추가해준다는 미명하에, Grid라는 오픈소스를 래핑하여 파는걸 본적이 있습니다.<br>
  그때, 스크립트 마다 Grid를 불러오기 위해 붙어있었습니다.(AMD는 잘못이 없습니다.)<br>
  그리드를 사용하면 하루에 화면 서너개도 금방찍어 낸다고 눈에 힘주던 선임도, 그 편리함에 감탄하는 입사 동기도 있었습니다.<br>
  하지만, 당시 부트스트랩만 사용해도 그 이상의 생산성, 재사용성, 심미성, 용이한 유지보수, 보편성<br>
  게다가 무료인데 어째서 그걸 쓰는지가 의아했습니다.<br>
  <br>
  그 후 저는, 다른 SI에서 또다른 그리드를 만났습니다.<br>
  발주사가 웹 반응성도 개나줘버린 이것을 몇 천만원을 들여서 계약했다는 것을 듣고 경악 했습니다.<br>
  제가 거의 울것같자, 옆에 계시던 선임이 가만히 말해 주었습니다.<br>
  그리드를 도입하는데 힘을 써준 발주사의 어떤분께는 감사의 표시가 있다는 것이지요.<br>
  음... 그래, 아마 난~ 세상을 모르나봐~ 캬하 노래가 땡깁니다.<br>

  [들국화-그것만이 내세상](https://www.youtube.com/watch?v=Aomt_cCNXO0)<br>
</div>

### module.exports and require (Node.js)
[How to Export and Require Modules in NodeJS](https://www.youtube.com/watch?v=pP4kjXykbio)<br>
글로벌 객체에 Key, Value로 바인딩 된다.<br>
모든 모듈은 캐시될 것입니다. 이미 읽었다면 매번 파일을 읽지는 않는다는 뜻입니다.<br>
객체라는 것을 떠올리면 모든것이 편안해 집니다.
```
const f = function () {
  console.log('This is fucntion f');
}

module.exports = f; // 객체를 통으로 바인딩 했습니다. 
// 이것은, consot f = require('./module1.js'); 
// f(); 이렇게 사용이 가능합니다.
```
그러나, 
```
const f = function () {
  console.log('This is fucntion f');
}
module.exports.f = f; // 객체의 키 f에 바인딩 했습니다. 
// 이것은, const f = require('./module1.js'); 
// f.f() 이렇게 사용해야 합니다. 
// f 대신 const mod = require(...file path); 
// mod.f()와 같이 어떤 변수에 받든 그것은 상관 없습니다.
```

여러개를 내보내야 할때는 객체를 만들어 키, 밸류로 바인딩 하면 좋습니다.
```
module.exports = {
  f, m
}
```
```
const {f, m}= require('./module1.js') // 개체이니까 당연히, 디스트럭처링 하여 받을 수 있습니다.
```
만약 package.json의 main에 특정 파일이름을 설정하면, require(./folder)는 폴더의 경로만으로, 해당 폴더 안에서 package.json에 설정된 파일을 찾게됩니다.<br>
동영상으로 해당 부분을 보시면 그 즉시 사용할 수 있을 것입니다. 그런데 라이브러리 수준으로 만들게 아니면, 아마 안쓸것 같습니다.

### exports (Node.js)
[Module.exports v/s exports](https://www.youtube.com/watch?v=Bj1v1Yfg5TU)<br>
exports는 module.exports 객체를 참조한다. 끝입니다. 다만,
```
// 이것을 require('./file.js')하게되면, Error가 발생합니다.
exports = function Heya() {
  console.log('Hola hola');
}
```
위에서 exports는 exports.module을 참조하고 있다가, 사용자의 function을 참조하도록 만들었습니다.<br>
이후 require()를 사용하면, 그것은 exports.modele 객체를 탐색할 것이고 Heya을 찾지 못할 것입니다.

### export, export default and import (ES6)
[MDN Web Docs export](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export)<br>
[Differences with Default and Named Exports - ES6 JavaScript](https://www.youtube.com/watch?v=RMl-ystfzoY)<br>
<p>
export 문은 JavaScript 모듈에서 함수, 객체, 원시 값을 내보낼 때 사용합니다. 내보낸 값은 다른 프로그램에서 import 문으로 가져가 사용할 수 있습니다.
</p>
유명 내보내기를 import로 가져갈 때는 내보낸 이름과 동일한 이름을 사용합니다. 객체의 키와 밸류로 바인딩 되었다고 생각하면 됩니다.
```
// 먼저 선언한 식별자 내보내기
export { myFunction, myVariable };

// 각각의 식별자 내보내기
// (변수, 상수, 함수, 클래스)
export let myVariable = Math.sqrt(2);
export function myFunction() { ... };
```

기본 내보내기, default를 쓰게되면 객체 자체를 내보낸다고 생각하면 됩니다.
```
// 먼저 선언한 식별자 내보내기
export { myFunction as default };

// 각각의 식별자 내보내기
export default function () { ... };
export default class { ... }
```

기본 내보내기는 어떤 이름으로도 가져올 수 있습니다.<br>
부모 모듈이 자식 모듈을 가져와서 다시 내보낼 수도 있습니다. 즉, 여러 개의 모듈을 모아놓을 하나의 모듈을 만들 수 있습니다.
```
// 임의의 다른 파일
import m from './test'; // k가 기본 내보내기일때, 가져오는 이름으로 k 대신 m을 사용해도 문제 없음
```