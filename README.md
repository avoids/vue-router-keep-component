# vue-router-keep-component
vue-router-keep-component增强router-view功能

## 安装

```
npm install vue-router-keep-component
```


## 使用

```
import Vue from 'vue'
import Router from 'vue-router'
import RouterKeepComponent from 'vue-router-keep-component'
import a from '@/components/no-view/a'
import b from '@/components/no-view/b'
import c from '@/components/c'

Vue.use(Router)
Vue.use(RouterKeepComponent)

let router = new Router({
  routes: [
    {
      path: '/a',
      component: RouterKeepComponent.createKeepComponent(a),
      children: [
        {
          path: 'b',
          component: RouterKeepComponent.createKeepComponent(b),
          children: [
            {
              path: 'c',
              component: c,
            }
          ]
        }
      ]
    }
  ]
}
```