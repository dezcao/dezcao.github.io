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