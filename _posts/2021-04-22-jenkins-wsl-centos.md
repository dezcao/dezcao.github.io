---
title: 젠킨스 + 깃헙 소스 자동배포
tags:
  - Jenkins
  - CentOS
  - WSL
  - github
---

CentOS, Ubuntu에 젠킨스 설치 및 깃헙 소스가 갱신되면 자동반영 설정 해보기.

<!--more-->

테스트코드 없이, 단순 반영하는 것은 앙꼬없는 찐빵이라고 한다.  
아직 테스트코드를 실행하고 그 성공과 실패에 따라 반영할지 말지를 결정하는 부분은 숙제다.  
리눅스 고자에, 실무에서도 배워보지 못한걸 인터넷 뒤져가며 해보는 나로써는 솔직히 이정도도 쉽지만은 않은 일이었다.  
<br>
하지만 '세팅' 이라는 것은 지능이나 논리, 창의력 같은 자산이 필요없다.  
그저 잘 갖추어진 메뉴얼만 있으면 당연히 되는것이라고 생각하기 때문에,  
누군가 이 글을 본다면 최소한 이 안에 있는것 만큼은 이면의 내용들을 알든 모르든  
무조건 성공할 수 있는 메뉴얼이 되었으면 한다.  
<br>
어차피 이걸 읽고 있는 사람들은 다 개발자일테니 본문에 불필요한 사족이 많다고 느낄 수 있다.  
나의 눈높이와 필요에 맞춰, 최대한 자세히 적으려 하다보니 그렇게 되었음을 양해 바란다.

### Jenkins download and install
아래 명령어를 복사하기 전에 설치와 관련하여 변한건 없는지 공식 사이트를 확인하자.  

[Jenkins 공홈의 CentOS install 파트](https://www.jenkins.io/doc/book/installing/linux/#red-hat-centos)
```
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install jenkins java-1.8.0-openjdk-devel
sudo systemctl daemon-reload
```

[Debian/ubuntu](https://www.jenkins.io/doc/book/installing/linux/#debianubuntu)
```
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

만약 도커 안에서 젠킨스를 설치하고 싶다면 다음 과정을 따른다.
### Ubuntu Docker Jenkins setup
```
sudo apt-get update

# 필요한 라이브러리들 받는다.
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# curl은 데이터를 전송하기 위한 라이브러리와 명령 줄 도구를 제공하는 컴퓨터 소프트웨어
# -f : 실패해도 보여주지 마라, -s 진행상황 보여주지마라, -S 에러를 보여줘라, -L 리다이렉트되면 보여줘라.
# apt-key는 apt가 패키지를 인증하는데 사용하는 키 리스트를 관리하는데 사용되는 유틸
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 레파지토리를 등록해준다.
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update

# 드디어, 등록한 레파지토리를 통해 도커 형제들을 받는다.
sudo apt-get install docker-ce docker-ce-cli containerd.io

# 도커가 설치 되었는지 확인.
docker version
```
[curl -fsSL example.org 설명](https://explainshell.com/explain?cmd=curl+-fsSL+example.org)


#### Docker jenkins download
[도커허브](https://hub.docker.com/r/jenkins/jenkins)
```
sudo docker pull jenkins/jenkins:lts
```


#### Start docker jenkins background
```
sudo docker run -d --name my-jenkins -p 9090:9090 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```


#### Docker jenkins 초기 password
```
sudo cat /var/lib/docker/volumes/jenkins_home/_data/secrets/initialAdminPassword
```


### Java Path
젠킨스 구동은 자바가 필요하다.(도커로 했다면 필요없다.)  
자바가 안깔려 있다면 자바도 깔아야 하고, 자바를 실행할 수 있게 시스템에 패스도 설정해야 한다.  
그래서 도커로 하면, 여러사람이 함께쓰는 서버 공간을 더럽히지 않으면서 관리하기 편해질 것이다.  
하지만, 젠킨스 홈에서 제공한 명령어를 보면 이미 openjdk 자바를 같이 깔도록 안내하고 있다.
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
# jenkins config 열기 (도커일땐 위에서 이미 9090으로 열었다.)
sudo vi /etc/sysconfig/jenkins
# 파일에서 JENKINS_PORT="9090" 부분을 찾아서 바꿔준다.
```
그런데, 왜 바꿀까?  
많은 어플들이 자동으로 제너레이트 되면, 서버를 올릴때 8080을 많이 물고 올라간다. (Node, Vue 등)  
그래서 양보하는 모양이다. 젠킨스는 관용적으로 9090을 많이 쓴단다.  


### Start, Status Jenkins 명령어
```
sudo systemctl start jenkins
sudo systemctl enable jenkins
sudo systemctl status jenkins
```


### 접속하기
브라우저에서 젠킨스 페이지(http://젠킨스서버IP:9090) 진입을 해보면, 초기 비번을 물어본다.  
AWS 같은 클라우드 서비스를 사용한다면 포트 열어주는걸 잊지 말자.  
이후부터는, 젠킨스에 이런저런 세팅을 하는것 이므로 모두 동일하다.
<br>

#### 일반 jenkins 초기 password 복사
```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/unlock.PNG"/>

#### 비밀번호는 왜 /var 그러니까 /var/lib에 있는걸까
[출처: https://jadehan.tistory.com/11](https://jadehan.tistory.com/11)  
/var 폴더는, 가변데이터 파일, 시스템 로그, 스풀링 파일, 메일 서버로 운영될 경우 메일 저장된다.  
스풀링? 나중에 처리하거나 인쇄하기 위해 데이터를 저장하는 시스템 기능이란다.[출처](https://www.ibm.com/docs/ko/i/7.3?topic=queues-spooled-files)  
/var/lib 는 가변 상태 정보 데이터가 위치한다.  
/var 디렉토리는 /usr 디렉토리가 read-only로 마운트하도록 하는데,  
시스템을 운영시 /usr 디렉토리에 작성된 모든 것들이 /var에 있어야 한다.

<br>
이후 install suggested plugins 설치를 쭉쭉 진행한다.  
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/install_suggested.PNG"/>

사용할 계정생성까지 해서 젠킨스 관리페이지로 로그인 해준다.  
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/create_admin.PNG"/>
<br>

### Github 연동
젠킨스에 라이러리를 추가 설치한다.  
<strong>Jenkins 관리 < 플러그인 관리 < 설치 가능 탭<strong>  

- github integration을 설치한다.
- publish over ssh를 설치한다.

<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/github_integration.PNG"/>

### Jenkins, Server, Git SSH setting
깃허브와 ssh 통신을 위한 키 등록하기 (private repository인 경우 젠킨스에 설정을 해야 연동됨.)  

#### ssh
젠킨스 설치 서버와 배포 서버가 다른 경우가 있고, 동일한 경우가 있을 것이다.  
ssh 통신방식을 알면 설정을 하면서 조금은 덜 막연해 지는것 같다.  
내가 아는대로 설명해 보자면 기본적으로 다음과 같다.  
<br>

- ssh-keygen을 하게되면 공개키(.pub로 끝나는 키), 비밀키 두개가 생긴다.
- 공개키는 나눠주고, 비밀키는 생성한 머신(PC)가 혼자서 꽁꽁 잘 보관해 둔다.
- 통신을 할일이 생기면, 공개키를 가지고 있는 서버는 암호화 통신을 위한 임시키(공유키)를 생성한다.
- 공개키로 임시키를 암호화하여 보낸다.
- 비밀키를 가지고 있는 서버는 공개키로 암호화된 전문을 복호화 할 수 있고, 그 안에서 임시키를 얻을 수 있게된다.
- 이제, 임시키를 이용해 두 서버가 통신을 하고, 통신이 끝나면 임시키는 파괴된다.
<br>

이제 해보자,  
배포서버와 젠킨스 서버가 다를때, 배포될 서버에 젠킨스의 SSH 공개키를 등록한다.  
공개키 등록은 authorized_keys 파일 내용으로 추가하면 된다.  
나는, 젠킨스와 배포서버가 같은곳에 있기 때문에, 키젠 이후 공개키를 등록파일에 그대로 등록했다.  
```
# ssh 키를 생성한다. .ssh 폴더 아래로 생긴다.
# -t 암호화 타입, ed25519는 암호화 알고리즘의 종류이다. ( ed25519 | rsa )
# -C comment, 따옴표 안은 마음대로 쓰면된다. 
ssh-keygen -t ed25519 -C "dezcao@gmail.com"

# 공개키 등록파일에 등록한다. >> 는 덮어쓰는 대신 해당 파일에 cat한 내용을 추가해줄 것이다.
cat id_rsa.pub >> ~/.ssh/authorized_keys

# 권한을 확인해 본다.
ls -l .ssh/authorized_keys

# 권한을 변경한다.
chmod 700 ~/.ssh
chmod 544 ~/.ssh/authorized_keys

# 권한을 확인해 본다.
ls -l .ssh/authorized_keys
```
<br>

#### 왜 자꾸 권한을 변경해줘야 하는걸까?
파일, 폴더를 생성하면 모든 권한이 주어져 있지 않다.  

##### chmod, chown ?
- chown 파일이나 디렉토리의 소유주를 바꾸는 명령.
- chmod 파일이나 디렉토리의 권한을 바꾸는 명령.

권한과 소유권을 보는 명령어
```
ls -l
```

파일의 권한 표시 옵션인 -l을 줘서 ls -l을 하면,  
맨 앞자리는 파일과 디렉토리를 구분하고(- 파일, d 디렉토리),  
이후부터 rwx는 읽기, 쓰기, 실행(혹은 폴더 들어가기 권한), 권한이 없으면 -(대쉬)로 표현된다.
<br>
첫 세자리는 유저, 두번째 세자리는 그룹, 세번째 rwx자리는 다른 사용자의 권한을 의미한다.
<br>
rwx는 숫자 421로도 대변된다(8진수). 따라서 7은 모든 권한, 6(4+2)은 읽기와 쓰기, 5(4+1)은 읽기와 실행 같은 의미이다.  
즉, +rw는 +6으로도 표시할 수 있지만 그냥 rwx등 직관적으로 쓰는것과 차이는 없다.  
700이면, 사용자는 모든권한(rwx), 그룹과 다른 사용자는 아무런 권한도 없는것이 된다.  
<br>

[linux umask 제타위키](https://zetawiki.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_umask)  
umask - 새 폴더, 파일의 퍼미션(권한)을 결정하는 값, 또는 설정 명령어이다. 디폴트 0022.  
umask의 값은 Shell에 의존적이어서 각 Shell에 따라 0022(sh), 022(ksh), 22(csh), 022(ksh)으로 기본 값으로 정해져 있다.  
0022라고 나오면 맨 앞에 부분은 없는 것이라고 생각하고 3자리만 기억하면 된다.  
<br>
umask 값과 새 폴더 퍼미션 값을 더하면 777이 된다. (예: 022 + 755 = 777)  
파일의 경우 실행권한은 모두 빠진다.  
즉, umask 022인 경우의 생성되는 권한은 아래와 같다.
```
새 폴더: 755
새 파일: 644
```
그래서 파일을 생성한 뒤에 다른 유저들도 해당 파일을 실행할 수 있도록 권한을 추가해 주는 것이다.  

[출처 : umask 추가설명](https://securityspecialist.tistory.com/40)
<br>


### Github Webhook
**사용자클릭 < 설정 < API Token, Add new Token, Generate token**
깃허브 웹후크에 등록해줄 키를 생성해준다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/webhook1.PNG"/>

**Github/project < Settings < Webhooks < Add webhook**
깃 프로젝트의 설정에서 웹후크를 생성하러 간다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/webhook2.PNG"/>

**Payload URL**
URL 입력시, 젠킨스의 포트도 잊지말고 써준다. EC2라면 공개주소(IP)가 있을것이다.  
http://젠킨스서버IP:9090/github-webhook/

**Secret**
젠킨스에서 생성한 토큰을 넣는다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/webhook3.PNG"/>
설정했다면, 저장하고 젠킨스에 가서 나머지 세팅을 하자.

### Jenkins, Publish over SSH
**Jenkins 관리 > 시스템 설정 > Publish Over SSH**
Key에, AWS EC2라면 .pem key를 넣어주고, 아니면 젠킨스 서버의 id_rsa 또는 id_ed25519(개인키)내용을 복사해 입력한다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/ssh_servers.PNG"/>
- Name - test-server(임의입력)
- Hostname - EC2 IP, 또는 IP
- Username - ubuntu (서버의 사용자)
- Remote Directory - /home/ubuntu (서버 사용자의 기본 접속폴더, 서버에 접속직후 pwd로 확인.)

### Jenkins, New Item, 소스 코드 관리
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem.PNG"/>
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem2.PNG"/>
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem3.PNG"/>

소스 코드 관리로 Git을 선택하고, 깃 ssh url을 입력한다.  
처음엔, 선택할 크레덴셜이 없기 때문에 Add Jenkins를 선택하여 팝업을 띄운다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem3-2.PNG"/>

Kind에서 SSH Username with private key를 선택해준다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem4.PNG"/>

Private Key, Enter directly를 선택해서 비공개키(개인키, 젠킨스서버의 비공개키, 이를테면 id_ed25519) 내용을 복사해 넣는다.
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem5.PNG"/>
Add 버튼을 눌러 마친후, Credentials에서 방금 생성한 크레덴셜을 선택해준다.

<br>
Branches to build : */main  
main은 브랜치명이므로 브랜치가 다르다면 변경한다.  
빌드 유발 : GitHub hook trigger for GITScm polling
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem6.PNG"/>

빌드 후 조치 : Send build artifacts over SSH
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem7.PNG"/>
<img src="https://dezcao.github.io/theme/img/2021-04-22/jenkins/newItem8.PNG"/>
실행할 쉘스크립트를 미리작성하여 해당 스크립트를 실행하게 할수도 있다.  
간단한 명령어는 직접 입력해도 된다. 타켓 디렉토리가 없다면 생긴다.  
이 과정에서 테스트에 실패한다면 서버반영 및 재시작이 일어나지 않아야 한다.  


### 자동 재실행 설정
서버가 리부트 되었을때, 수동으로 젠킨스를 올린다면 불편하고 즉각 대응도 안될것이다.  
리눅스에서 리부트 시점에 실행하는 쉘파일에 젠킨스도 같이 실행하도록 명령어를 추가해준다.  


```
vi /etc/rc.local

# 명령어를 추가한다.
sudo systemctl start jenkins

# 도커라면 도커컨테이너 네임으로
sudo docker restart my-jenkins
```

만약 해당 파일이 없으면, 만들고, 실행 권한을 준다.
```
touch /etc/rc.local
sudo chmod +x /etc/rc.local
```

<br>
없어서 새로 파일을 만든다면, 그 내용을 쉘 스크립트 작성 문법에 맞게 채운다.
```
#!/bin/bash
sudo systemctl start jenkins
exit 0
```


### 리눅스 부팅순서

- 전원 ON
- ROM-BIOS
- 부트로더- GRUB(Erich Stefan Boleny가 개발한 부트로더, /boot 폴더에 들어있음.)
- 스와퍼 프로세스
- init 프로세스. /sbin/init 프로세스가 실행. /etc/inittab의 설정에 따라 초기화를 시작한다.
- 부트레벨 결정
- /etc/rc.d/rc.sysinit 스크립트 실행. 네트워크, 파일시스템 점검, 커널 로딩 등.
- /etc/rc.d/rc[0-6].d 디렉토리의 스크립트들이 실행. 링크파일들로 /etc/rc.d/init.d/디렉토리파일과 링크임. 각 디렉토리 마지막에 /etc/rc.d/rc.local 파일이 실행되는 링크가 있음. rc.sysinit 에 의해 호출된다. 부팅시 수행하고 싶은 명령의 모음이다.
- /etc/rc.d/rc.local 스크립트 실행 
- X윈도우 실행(부팅완료)


