let _Vue

function createKeepComponent (component) {
    return {
      template: `<keep-alive-component :is-current="isCurrent">
        <keepComponent v-if="isCurrent"></keepComponent>
        <router-view v-else></router-view>
      </keep-alive-component>`,
      components: {
        keepComponent:component
      },
      data () {
        return {
          routerViewDepth: null
        }
      },
      computed: {
        isCurrent () {
          return this.$route.matched.length - 1 === this.routerViewDepth
        }
      },
      mounted() {
        this.routerViewDepth = this.$vnode.data.routerViewDepth
      }
    }
  }

  function isDef(v) {
    return v !== undefined && v !== null
  }
  
  function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && isDef(c.componentOptions)) {
          return c
        }
      }
    }
  }

  let KeepAliveComponent = {
    name: 'keep-alive-component',
    abstract: true,
    props: {
      isCurrent: Boolean
    },
    created () {
      this.cacheVnode = null
    },
    destroyed () {
      if (this.cacheVnode) {
        this.cacheVnode.componentInstance.$destroy()
      }
    },
    render () {
      const vnode = getFirstComponentChild(this.$slots.default)
      if (this.isCurrent) {
        if (this.cacheVnode) {
          vnode.componentInstance = this.cacheVnode.componentInstance
        } else {
          this.cacheVnode = vnode
        }
        vnode.data.keepAlive = true
      }
      return vnode
    }
  }

  function install(Vue) {
    _Vue = Vue

    Vue.component('keep-alive-component', KeepAliveComponent)
  }
  
  export default {
    install,
    createKeepComponent
  }