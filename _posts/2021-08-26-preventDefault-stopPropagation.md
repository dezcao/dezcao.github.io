---
title: preventDefault, stopPropagation의 차이
tags:
  - preventDefault
  - stopPropagation
---

### preventDefault, stopPropagation 차이
[MDN Web Docs, preventDefault](https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault)<br>
[MDN Web Docs, stopPropagation](https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation)<br>
<p>
  event.preventDefault();  // 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다. (동작을 멈춤)
  event.stopPropagation(); // 이벤트 캡쳐링과 버블링에 있어 현재 이벤트 이후의 전파를 막습니다. (propagation = 번식)
</p>

<p>
  버블링(bubbling) - 이벤트 발생시, 그 부모의 요소에 붙어있는 동일 이벤트 핸들러들이 연쇄적으로 동작하게 됨. (타깃 -> window)
  <br>
  버블은, "거품이 일다", "솟다"와 같은 뜻이 있다.
</p>

<p>
  캡처링(capturing) - 이벤트 발생시, 최상위의 window로부터 document를 거쳐 해당 요소까지 나아가면서 이벤트 핸들러들이 연쇄적으로 동작. (window -> 타깃)
</p>

<p>
아래와 같이 이벤트의 진행 방향을 결정 할 수 있고, 전파를 원하지 않는다면 이벤트 핸들러에서 stopPropagation을 사용해준다.
</p>
```
target.addEventListener(type, listener[, useCapture]); //ex. target.addEventListener("click", function(){}, true); 캡처링으로 설정. 즉, 디폴트(false)는 버블링.
```



