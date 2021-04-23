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

AWS에서 우분투 위에 도커를 설치하고, 도커로 젠킨스를 설치하면 쉽고 제거도 깔끔해서 좋았다.  
하지만, WSL에 리눅스로 CentOS를 설치했는데 도커가 제대로 실행되지 않았다.  
WSL에서 돌려서 그런건지 CentOS 문제인지 모르겠지만 젠킨스를 그냥 설치하기로 했다.  

### Jenkins download and install
명령어를 복사하기 전에 설치와 관련하여 변한건 없는지 사이트를 확인하자.  
[Jenkins 공홈의 CentOS install 파트](https://www.jenkins.io/doc/book/installing/linux/#red-hat-centos)
```
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install jenkins java-1.8.0-openjdk-devel
sudo systemctl daemon-reload
```


### Java Path
젠킨스는 자바가 필요하다.  
자바가 안깔려 있다면 자바도 깔아야 하고, 패스를 설정해야 한다.  
그래서 도커로 하면 편한데... 위 명령어는 이미 openjdk 자바를 같이 깔도록 하고 있다. 땡큐 하구먼.
```
java -version
javac -version
```
확인해보니 잘 설치 되었다. 참고로, java가 어디있는지 찾고싶으면 whereis 명령어를 써본다.
```
whereis java
whereis javac
```
/usr/bin에 들어있는걸 알 수 있다.  
echo $PATH로 환경변수를 출력해 볼 수 있고, 파이프(|)로 결과물을 넘겨, grep으로 문자열을 찾아봤다.
```
echo $PATH | grep /usr/bin
```
잘 들어있다.


### Port 변경하기
```
dezcao 
/ 1111
# jenkins config 열기
sudo vi /etc/sysconfig/jenkins
```
왜 바꿀까?  
많은 어플들이 자동으로 제너레이트 되면, 서버를 올릴때 8080을 많이 물고 올라간다. (Node, Vue 등)  
그래서 양보하는 모양이다. 젠킨스는 관용적으로 9090을 많이 쓴단다.  
JENKINS_PORT="9090"


### Start, Status Jenkins 명령어
```
sudo systemctl start jenkins
sudo systemctl status jenkins
```


### 접속하기
브라우저에서 젠킨스 페이지(http://${ip}:9090) 로딩 이후, 초기 비번을 물어본다.  
#### 초기 비밀번호 복사해오기
```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/unlock.PNG"/>

이후 install suggested plugins 설치를 쭉쭉 진행한다.  
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/install_suggested.PNG"/>

사용할 계정생성까지 해서 젠킨스 관리페이지로 로그인 해준다.  
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/create_admin.PNG"/>

AWS 같은 클라우드에서 사용한다면 젠킨스 페이지를 접근 하기위한 포트를 열어주는걸 잊지 말자.  


#### 비밀번호는 왜 /var 그러니까 /var/lib에 있는걸까
[출처: https://jadehan.tistory.com/11](https://jadehan.tistory.com/11)  
리눅스에서 /var 폴더는, 가변데이터 파일, 시스템 로그, 스풀링 파일, 메일 서버로 운영될 경우 메일 저장된다.  
젠장, 스풀링은 뭐지? 나중에 처리하거나 인쇄하기 위해 데이터를 저장하는 시스템 기능이란다.[출처](https://www.ibm.com/docs/ko/i/7.3?topic=queues-spooled-files)  
요약하면, /var/lib - 가변 상태 정보 데이터가 위치한다.  
/var 디렉토리는 /usr 디렉토리가 read-only로 마운트하도록 하는데, 시스템을 운영(설치나 유지가 아닌)하는 동안 /usr 디렉토리에 작성된 모든 것들이 /var에 있어야 한다.


### Github 연동
젠킨스가 깃과 소통하기 위한 라이러리 추가 설치한다.

<b>Jenkins 관리 < 플러그인 관리 < 설치 가능 탭<b>

github integration을 설치한다.
publish over ssh를 설치한다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/github_integration.PNG"/>


깃허브와 ssh 통신을 위한 키 등록하기 (private repository인 경우 해야만 연동됨.)  

배포될 서버에 SSH 공개키 등록
: 젠킨스와 배포서버의 위치가 다르다면, 젠킨스가 속한 서버의 ssh 공개키 id_rsa.pub 를
배포될 서버의 authorized_keys 파일 내용으로 추가해준다.
나는, 젠킨스와 배포서버가 같은곳에 있기 때문에, 그냥 공개키 바로 등록했다.
경로 : ~/.ssh/authorized_keys

$ cat id_rsa.pub >> ~/.ssh/authorized_keys
ls -l .ssh/authorized_keys를 보면 권한 보인다.
$ chmod 700 ~/.ssh/authorized_keys
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/authorized_keys.PNG"/>


Jenkins 관리 > 시스템 설정 > Publish Over SSH
SSH Servers에 서버 정보 추가
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/ssh_servers.PNG"/>
Name - test-server
Hostname - 192.168.0.22
Username - root
고급 > User password authentication, or use a different key 체크
Key - SSH 키 설정 과정에서 생성한 id_rsa(비공개키-젠킨스가 설치된 서버의 비공개키) 파일 내용 추가
저장


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
sudo systemctl start jenkins
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
sudo systemctl start jenkins
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

