---
title: Vue 프로젝트를 VS Code에서 디버그 세팅하기
tags:
  - Debug
  - VS Code
  - Vue.js
---

Vue개발에 VS 코드의 디버그 모드를 사용하기위한 설정을 해보자.

<!--more-->
### Vue.config.js [Vue CLI 3]
{% highlight node %}
  module.exports = {
    configureWebpack: {
      devtool: 'source-map',
    },
  }
{% endhighlight %}


### launch.json
<div class="card mb-3">
    <img class="card-img-top" src="https://dezcao.github.io/theme/img/2021-05-04/vs-code-debug-click.PNG"/>
    <div class="card-body bg-light">
        <div class="card-text">
            create a launch.json file을 클릭하고 chrome을 선택했다.
        </div>
    </div>
</div>

<div class="card mb-3">
    <img class="card-img-top" src="https://dezcao.github.io/theme/img/2021-05-04/vs-code-debug-chrome-init.PNG"/>
    <div class="card-body bg-light">
        <div class="card-text">
            처음 생성되면 이렇게 만들어 진다.
        </div>
    </div>
</div>

내용을 다음과 같이 수정했다.
{% highlight node %}
  {
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-chrome",
            "request": "launch",
            "name": "Vue-pwa-chrome",
            "url": "http://localhost:8080",
            "webRoot": "${workspaceFolder}/src",
            "sourceMapPathOverrides": {
                "webpack:///src/*": "${webRoot}/*"
            }
        }
    ]
  }
{% endhighlight %}