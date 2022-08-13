---
title: 리눅스마스터 2급 공부하기
tags:
  - 리눅스마스터
  - Linux
---
리눅스 마스터2급 시험공부<br>

<script src="{{ site.baseurl }}/theme/js/linux-master.js"></script>
<link rel="stylesheet" href="{{ site.baseurl }}/theme/css/linux-master.css">

<!--more-->
### 2차 범위 - 리눅스 운영 및 관리, 리눅스 활용
<div class="card">
  <div class="card-body">
    <span class="creep">
      <span class="hidra burrow">chown [옵션] 소유자[:그룹명] 파일명</span>
    </span>
    는 파일과 디렉터리의 사용자 소유권과 그룹 소유권을 변경한다.
  </div>
</div>
<div class="card">
  <div class="card-body">
    디렉터리 test의 모든 파일과 하위 디렉터리 소유권을 root로 변경한다.
    <span class="creep">
      <span class="hidra burrow">chown -R root test/</span>
    </span>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span>chown은 소유자, 그룹 모두 변경할 수 있지만, chgrp은 그룹 소유권만 변경한다.</span><br/>
    <span>파일인 'TEST'의 그룹소유권을 jeffrey로 변경한다.</span><br/>
    <span class="creep">
      <span class="hidra burrow">chgrp jeffrey TEST</span><br/>
      <span class="hidra burrow">chown :jeffrey TEST</span>
    </span>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <table class="type02">
      <tr>
        <th></th>
        <th colspan="3">사용자 권한</th>
        <th colspan="3">그룹 권한</th>
        <th colspan="3">기타 사용자 권한</th>
      </tr>
      <tr>
        <th>기호모드</th>
        <td>r</td>
        <td>w</td>
        <td>x</td>
        <td>r</td>
        <td>w</td>
        <td>x</td>
        <td>r</td>
        <td>w</td>
        <td>x</td>
      </tr>
      <tr>
        <th rowspan="2">8진수 숫자 모드</th>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
      </tr>
      <tr>
        <td colspan="3">7</td>
        <td colspan="3">7</td>
        <td colspan="3">7</td>
      </tr>
    </table>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span>파일이나 디렉터리의 접근 허가권을 변경하는 명령어?
      <span class="creep">
        <span class="hidra burrow">chmod [옵션] 파일명</span>
      </span>
    </span><br/>
    <span>dev 폴더와 모든 하위 파일을 모든사용자가 읽기, 쓰기가 가능하게 하라.
      <span class="creep">
        <span class="hidra burrow">chmod -R 666 dev/</span>
      </span>
    </span><br/>
    <ul>
      <li>u 소유자, g 그룹, o 기타 사용자, a 모든 사용자</li>
      <li>+ 허가권 부여, - 허가권 제거, = 허가권 지정</li>
      <li>r 읽기, w 쓰기, x 실행</li>
    </ul>
    <span>
      <span>기호모드를 이용하여, '기타 사용자'에게 dev폴더와 그 하위파일에 쓰기 권한을 부여하라.</span><br/>
      <span class="creep">
        <span class="hidra burrow">chmod -R o+w dev/</span>
      </span>
    </span><br/>
    <span>dev 폴더와 모든 하위 파일을 사용자에게는 읽기, 쓰기, 실행 권한, 그룹과 다른 사용자는 읽기와 실행권한만 가능하게 하라.
      <span class="creep">
        <span class="hidra burrow">chmod -R 755 dev/</span>
      </span>
    </span>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span>새로 생성되는 파일이나 디렉터리의 기본 허가권 값을 지정한다.
      <span class="creep">
        <span class="hidra burrow">umask [옵션][값]</span>
      </span>
    </span><br/>
    <span>-S 옵션은 값을 문자로 표기해준다.</span><br/>
    <span>
      <span>파일 생성시 기본 권한은 666, 폴더는 777이다. 하지만
        <span class="creep">
          <span class="hidra burrow">umask</span>
        </span>
      </span>
      가 설정한 만큼 권한을 뺀 허가권이 설정된다.
    </span>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span>ls -l을 했을경우, 가장 앞에 나오는 기호의 의미.</span><br/>
    <ul>
      <li>- : 파일</li>
      <li>d : directory</li>
      <li>I : Symbolic link</li>
      <li>s : Socket</li>
      <li>p : Pipe</li>
      <li>b : Block file, CD/DVD</li>
      <li>c : Character file, mouse, keyboard, printer</li>
    </ul>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span class="creep">
      <span class="hidra burrow">Sticky-Bit</span>
    </span><br/>
    <ul>
      <li>/tmp 디렉토리(X 윈도 실행 시 필요한 소켓 등 시스템에 필요한 파일의 임시 저장소)에 설정된다.</li>
      <li>설정된 디렉터리에 누구나 접근하고 파일을 생성 할 수 있다.</li>
      <li>해당 파일의 소유자나, root 만이 파일을 삭제할 수 있게 하는 설정</li>
    </ul>
    <span>data 디렉터리를 공유 모드로 설정하는 명령은?
      <span class="creep">
        <span class="hidra burrow">chmod o+t data/</span>
      </span>
    </span>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span>SetUID, SetGID - 각각, 사용자가 사용할때 또는 그룹 사용자가 사용할때 프로세스가 임시로 root 권한을 가져온다.</span><br>
    <span>실명명령은 s, Sticky bit와 혼동주의.</span><br>
    <span>/project 디렉터리에 Set-GID를 설정하라.
      <span class="creep">
        <span class="hidra burrow">chmod g+s /project</span>
      </span>
    </span>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span>사용자 jeff 의 디스크 용량을 Soft 20MB, Hard 30Mb로 설정하라.
      <span class="creep">
        <span class="hidra burrow">setquota -u jeff 20M 30M 0 0 /home</span>
      </span>
    </span>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <span>사용자 jeff 에게 설정된 쿼터를 사용자 ray 에게도 적용하는 방법.
      <span class="creep">
        <span class="hidra burrow">edquota -p jeff ray</span>
      </span>
    </span>
  </div>
</div>

<a href="javascript:" class="float" onclick="linuxMasterFn()">
  <i class="fa fa-plus my-float">답</i>
</a>


