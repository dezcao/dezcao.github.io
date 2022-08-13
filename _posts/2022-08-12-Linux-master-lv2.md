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
    는 파일과 디렉터리의 사용자 소유권과 그릅 소유권을 변경한다.
  </div>
</div>
<div class="card">
  <div class="card-body">
    디렉터리 test의 모든 파일과 하위 디렉터리 소유권을 root로 변경한다.
    <span class="creep">
      <span class="hidra burrow">chown -R root test</span>
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
    <table>
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
        <span class="hidra burrow">chmod -R 666 dev</span>
      </span>
    </span><br/>
    <span>
      <span>u 소유자, g 그룹, o 기타 사용자, a 모든 사용자</span><br/>
      <span>+ 허가권 부여, - 허가권 제거, = 허가권 지정</span><br/>
      <span>r 읽기, w 쓰기, x 실행</span><br/>
      <span>기호모드를 이용하여, '기타 사용자'에게 dev폴더와 그 하위파일에 쓰기 권한을 부여하라.</span><br/>
      <span class="creep">
        <span class="hidra burrow">chmod -R o+w dev</span>
      </span>
    </span><br/>
  </div>
</div>

<a href="javascript:" class="float" onclick="linuxMasterFn()">
  <i class="fa fa-plus my-float">답</i>
</a>


