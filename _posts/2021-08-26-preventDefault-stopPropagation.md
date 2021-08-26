---
title: preventDefault, stopPropagation
tags:
  - preventDefault
  - stopPropagation
---

### preventDefault, stopPropagation 차이
[MDN Web Docs, preventDefault](https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault)<br>
[MDN Web Docs, stopPropagation](https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation)<br>
<p>
  <h4>
    event.preventDefault();
  </h4>
  <span>// 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다. (동작을 멈춤)</span>
</p>
<br>
<p>
  <h4>
    event.stopPropagation();
  </h4>
  <span>// 이벤트 캡쳐링과 버블링에 있어 현재 이벤트 이후의 전파를 막습니다. (propagation = 번식)</span>
</p>
<br>
<br>
<p>
  <h4>
    버블링(bubbling) - 부모 요소에 있는 이벤트 핸들러들이 연쇄적으로 동작하게 됨. (타깃 -> window)
  </h4>
  <br>
  <span>버블은, "거품이 일다", "솟다"와 같은 뜻이 있다.</span>
</p>
<br>
<p>
  <h4>
    캡처링(capturing) - 최상위(window)로부터 document를 거쳐 해당 요소까지 연쇄 동작. (window -> 타깃)
  </h4>
  <br>
  <span>캡처는, "포착", "포획물" 같은 뜻이 있다.</span>
</p>

<p>
  이벤트의 진행 방향을 결정 할 수 있고, 전파를 원하지 않는다면 이벤트 핸들러에서 stopPropagation을 사용해준다.
</p>
```
target.addEventListener(type, listener[, useCapture]);
// ex. target.addEventListener("click", function(){}, true);
// true 이므로 캡처링으로 설정된다.
// 즉, 디폴트(false)라는 버블링이 설정된다.
```



