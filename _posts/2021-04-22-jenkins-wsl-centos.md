---
title: 젠킨스 + 깃헙 소스 자동배포
tags:
  - Jenkins
  - CentOS
  - WSL
  - github
---

CentOS에 젠킨스를 설치하고 깃헙에 소스가 갱신되면 자동 반영한다.

<!--more-->

우분투 위에 도커를 설치하고, 도커로 젠킨스를 설치하면 쉽고 제거도 깔끔해서 좋았다.  
하지만, WSL을 통해 리눅스를 설치할때, 우분투 대신 CentOS를 설치했는데 도커가 제대로 실행되지 않았다.  
WSL위에서 돌려서 그런건지 CentOS가 문제인지 모르겠지만 도커를 포기하고 젠킨스를 그냥 설치하기로 했다.  
[도움 받은 블로그](https://goddaehee.tistory.com/82)

### Jenkins download and install
```
# wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
# rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
# yum install jenkins
```

### Java Path
젠킨스는 자바가 필요하다.  
자바가 안깔려 있다면 자바도 깔아야 하고, 패스를 설정 한다.  
그래서 도커로 하면 편한데...

### 초기 비밀번호는 어디 있나
```
/var/lib/jenkins/secrets/initialAdminPassword
```
최초 젠킨스 페이지 로딩 이후, 설치하라는거 쭉쭉 진행하고 계정생성까지 해서 젠킨스에 로그인 해준다.

### github 연동하기
젠킨스가 관리할 수 있게 프로젝트 생성하기,  
젠킨스가 깃과 소통하기 위한 라이러리 추가 설치하기,  
깃허브와 ssh 통신을 위한 키 등록하기 (private repository인 경우 해야만 연동됨.)  

타겟 브랜치(master 따위)가 변경되면 서버에 배포가 일어나는지 확인해보자.

### 자동 재실행 설정
서버가 리부트 되었을때, 수동으로 젠킨스를 올린다면 불편하고 즉각 대응도 안될것이다.  
리눅스에서 리부트 시점에 실행하는 쉘파일에 젠킨스도 같이 실행하도록 명령어를 추가해준다.  

파일을 열고,
```
vi /etc/rc.local
```

명령어를 추가한다.
```
service jenkins start
```

만약 해당 파일이 없으면, 만들고, 실행 권한을 준다.
```
touch /etc/rc.local
sudo chmod +x /etc/rc.local
```

### 왜 자꾸 권한을 줘야 하는걸까?
우선,  
rwx는 차례대로 읽기, 쓰기, 실행이나 폴더 들어가기 권한이며 권한이 없으면 -(대쉬)로 표현된다.  
rwx는 숫자 421로도 대변된다(8진수). 따라서 7은 모든 권한, 6(4+2)은 읽기와 쓰기, 5(4+1)은 읽기와 실행 같은 의미가 된다.
즉, +rw는 +6으로도 표시할 수 있지만 그냥 rwx등 직관적으로 쓰는것과 차이는 없다.  
<br>

[linux umask 제타위키](https://zetawiki.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_umask)
umask - 새 폴더, 새 파일의 퍼미션을 결정하는 값, 또는 설정 명령어. 이것도 세팅 변경할 수 있다지만 어쨌든, 디폴트는 0022이다.  
umask 값과 새 폴더 퍼미션 값을 더하면 777이 된다. (예: 022 + 755 = 777)  
파일의 경우 실행권한은 모두 빠진다.  
그래서 파일을 생성한 뒤에는 다른 유저들도 해당 파일을 실행할 수 있도록 권한을 추가해 주는 것이다.  
즉, umask 022인 경우의 생성되는 권한은 아래와 같다.
```
새 폴더: 755
새 파일: 644
```
umask의 값은 Shell에 의존적이여서 각 Shell에 따라 0022(sh), 022(ksh), 22(csh), 022(ksh)으로 기본 값으로 정해져 있습니다.  
0022라고 나오면 맨 앞에 부분은 없는 것이라고 생각하고 3자리만 기억하면 됩니다.
[출처 : umask 추가설명](https://securityspecialist.tistory.com/40)

<br>
파일을 만들어, 만든 파일의 내용을 쉘 스크립트 작성 문법에 맞게 채운다.
```
#!/bin/bash
service jenkins start
exit 0
```

### chmod, chown
chown 파일이나 디렉토리의 소유주를 바꾸는 명령.
chmod 파일이나 디렉토리의 권한을 바꾸는 명령.
권한과 소유권을 보는 명령어
```
ls -l
```

### 리눅스 부팅순서
<ul>
  <li>전원 ON</li>
  <li>ROM-BIOS</li>
  <li>부트로더- GRUB(Erich Stefan Boleny가 개발한 부트로더, /boot 폴더에 들어있음.)</li>
  <li>스와퍼 프로세스</li>
  <li>init 프로세스</li>
  <li>부트레벨 결정</li>
  <li>/etc/rc.d/rc.sysinit 스크립트 실행</li>
  <li>/etc/rc.d/rc.local 스크립트 실행 - rs.sysinit 에 의해 호출된다. </li>
  <li>rcX.d 스크립트 실행 - rc.local은 부팅시 수행하고 싶은 명령의 스크립트 모음이며, /etc/rc.d/rc.local 에 넣어준다.</li>
  <li>X 윈도우 실행</li>
</ul>

