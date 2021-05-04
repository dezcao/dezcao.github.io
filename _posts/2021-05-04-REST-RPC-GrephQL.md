---
title: REST, RPC, GrephQL, SOAP, LDAP ?
tags:
  - REST
  - RPC
  - GrephQL
  - SOAP
  - LDAP
---

REST, RPC, GrephQL, SOAP, LDAP의 대략.

<!--more-->
### REST
[참조 블로거 링크](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)<br>
자원의 상태를 URI와 HTTP Method를 이용해 표현하는 설계 원리.(아키텍처 스타일)<br>
RESTFull 하다는, 이런 원리에 충실하다는 의미.<br>
REST API라 하면 REST 원리에 따라 만들어진 API.<br>
정말 잘 만들었다면, 별도의 설명서 없이 API만으로도 모든 기능이 이해가 되고 사용이 가능할 것이다.
<div class="alert alert-info" role="alert">
  <strong>단점</strong>
  <ul>
    <li>원리를 완벽하게 따르도록 잘 설계하는 것이 쉽지만은 않다.</li>
    <li>HTTP 통신은 앱의 프로세스가 지불해야할 비용에서 큰 비용이라고 할 수 있다.</li>
  </ul>
</div>

### RPC (Remote Procedure Call)
[참조 블로거 링크](http://engineersinkorea.com/category/api/rest/)
다른 주소의 함수나 프로시저를 실행할 수 있게하는 프로세스 간 통신 프로토콜<br>
HTTP를 사용하는 REST와 달리 비용이 상대적으로 적다.<br>
복잡한 마이크로 서비스를 가진경우 서비스간 수억, 수조의 통신을 전부 http로 하는것 보다 선호하는 경향이 있다.
<div class="alert alert-info" role="alert">
  <strong>단점</strong>
  <ul>
    <li>함수만으로 내용을 알기 어렵다.</li>
    <li>쉽다는 이유로 마구 만들다 보면 많아진다.</li>
  </ul>
</div>

### GrephQL
[참조 블로거 링크](http://engineersinkorea.com/category/api/rest/)
REST와 RPC의 장점을 합한형태.<br>
쿼리를 통해 정확하게 내가 필요한 정보만 요청해서 받을수 있는 API이다.<br>
불필요한 데이타를 전송해야하는 네트워크 트래픽을 절약할수 있다.<br>
<div class="alert alert-info" role="alert">
  <strong>단점</strong>
  <ul>
    <li>동적인 대응을 위한 서버의 복잡성이 증가하여 서버개발자의 부담이 커진다.</li>
  </ul>
</div>

### SOAP
XML 형식의 웹 프로토콜<br>
보안이나 메시지 전송 등에 REST보다 더 많은 표준이 정해져있기 때문에 더 복잡하다.<br>
은행과 같이 보안수준이 높아야 할 경우 사용하는 프로토콜이다.

### LDAP (Lightweight Directory Access Protocol)
[참조 블로거 링크](https://medium.com/happyprogrammer-in-jeju/ldap-%ED%94%84%ED%86%A0%ED%86%A0%EC%BD%9C-%EB%A7%9B%EB%B3%B4%EA%B8%B0-15b53c6a6f26)
접근제한 프로토콜, 인터넷 기반의 분산 디렉터리 서비스를 제공하는 공개된 프로토콜<br>
그룹별 보안 권한을 관리할 수 있어, 사용자를 인증하는 용도로도 흔히 쓰인다.

