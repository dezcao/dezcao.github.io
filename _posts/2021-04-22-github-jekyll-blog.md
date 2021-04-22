---
title: Github + Jekyll theme 블로그 만들기
tags:
  - github
  - jekyll
  - ruby
  - gem install
---

[이 블로그 생성에 성공하게 해준 블로거님 글 보러가기](https://zoomkoding.github.io/gitblog/2019/08/15/git-blog-1.html)

### github repository 생성
본인아이디.github.io 로 생성한다. (그래서 나는, dezcao.github.io)

### Jekyll download
[Jekyll 테마](http://jekyllthemes.org/)
맘에 드는것으로 다운로드 한다.
bootstrap을 사용한 테마를 받았다. 부트스트랩 사이트에서 컴포넌트를 복사 붙여넣기 해도 알아서 잘되기를 바래서다.

### _config.yml 수정
```
baseurl: ""                         # the subpath of your site, e.g. /blog/
url: "https://dezcao.github.io/"    # the base hostname & protocol for your site
```
baseurl을 공백으로 만들고, url을 위에서 본인이 생성한 깃레파지토리 주소로 해준다.
url이 없는 경우 그냥 추가로 넣었다. 당연하지만 이거 철자 틀리면 안나온다. (내가 그랬다. ㅜ. ㅜ)

### gem 이 뭐야?
```
gem install bundler
bundle install
```
위 명령어를 치려면, ruby가 설치되어 있어야 한다. gem병할...
Jekyll이라는 것을 제작한 사람이 Ruby로 짰단다. 아 왜~~~ ㅜ_ㅜ
gem이란 루비에서 지원하는 패키지 시스템으로 필요한 라이브러리를 설치하게 해주는 것이란다.
linux의 yum, apt 따위 node의 npm이나 yarn, 자바의 maven과 같은 역할을 하는셈이다.

### Ruby 설치
그래서 Ruby를 설치해야 한다. Ruby+Devkit을 받는다.
[ruby window installer 다운로드](https://rubyinstaller.org/downloads/)
[Ruby 설치전에 참고한 블로그, Devkit 추천 이유도 적혀있다.](https://park-jongseok.github.io/languages/ruby/2019/10/03/installing-ruby.html)
[ruby home](https://www.ruby-lang.org/ko/downloads/)

### Ruby path
나의 경우 설치를 해도 gem install은 안됐다. 이유는 어느 곳에서나 루비를 찾을 수 있도록 패스에 등록이 안되어서다.
[윈도우에 루비 패스 설정하기](https://stackoverflow.com/questions/26947427/how-do-i-add-ruby-to-the-path-variable-on-windows)
설치 이후, 커맨드 창에서 패스설정은 다음과 같다.
설치된 버전에 따라 설치경로가 다를테니 무작정 복붙하지는 말자.
```
set PATH=%PATH%;C:\Ruby30-x64\bin
```
즉, 루비가 설치된 폴더/bin 폴더를 패스에 붙인다.
물론, '내 PC 우클릭 -> 속성 (제어판\시스템 및 보안\시스템) -> 고급 시스템 설정 -> 환경변수 클릭 -> Path 선택 및 편집' 해도 된다.
Java 패스나 JAVA_HOME 등록 할때처럼 말이다.

### 드디어 gem !
```
gem install bundler
bundle install
```
차례대로 성공하면 해당 내용을 깃에 푸시한다.
그리고 https://깃아이디.github.io와 같이 만들어놓은 주소로 가본다.
내용을 바꾸면 적용되는데 약간의 시간이 걸린다.

### 글 쓰기
Jekyll에는 환상적인 테마들도 있지만, 구조가 약간 복잡할 것이다.
제작자마다 구조가 약간씩 상이하지만, 대부부분 비슷한 룰을 따를것이다.
나의 경우 목록이 없는 한장짜리 페이지인 경우, _pages 아래에 해당 파일이 있었다.
목록형인 post는, _posts 폴더 아래에 마크다운 문법으로 "연도-월-일-글타래제목" 으로 생성된 파일을 만들면 새로운 post가 된다.
기본은 마크다운 이지만, html 태그가 입력된다. 해당 파일을 그냥 html 확장자를 사용해서 생성해도 가능한걸로 보인다.
대신 문서 파싱되는데 필요한 규칙에는 맞게 써줘야 한다.
이를테면 상단에 이런 구문은 똑같이 입력해준다.
<div>
---
title: Github + Jekyll theme 블로그 만들기
tags:
  - github
  - jekyll
  - ruby
  - gem install
---
</div>

부트스트랩의 cdn을 넣으면 디자인이 깨지는 경우가 있는데, 지금 이 테마는 구버전 이긴 하지만 bootstrap 관련 .js가 이미 있고
css도 자체적으로 커스텀한게 들어있어서 cdn을 넣지 않은채 그냥 컴포넌트만 긁어다 붙이는데 잘된다.

나는 엄청난 사이트를 구축하려는게 아니기 때문에 비교적 테마의 구조는 단순하면서,
동적인 페이지를 만드는데 비빌 언덕이 되어줄 부트스트랩이 적용된 테마로 골랐다.
꿀이다.