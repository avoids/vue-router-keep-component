function createKeepComponent(component) {
  return {
    template: '<keep-alive-component :is-current="isCurrent">\n        <keepComponent v-if="isCurrent"></keepComponent>\n        <router-view v-else></router-view>\n      </keep-alive-component>',
    components: {
      keepComponent: component
    },
    data: function data() {
      return {
        routerViewDepth: null
      };
    },

    computed: {
      isCurrent: function isCurrent() {
        return this.$route.matched.length - 1 === this.routerViewDepth;
      }
    },
    mounted: function mounted() {
      this.routerViewDepth = this.$vnode.data.routerViewDepth;
    }
  };
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c;
      }
    }
  }
}

var KeepAliveComponent = {
  name: 'keep-alive-component',
  abstract: true,
  props: {
    isCurrent: Boolean
  },
  created: function created() {
    this.cacheVnode = null;
  },
  destroyed: function destroyed() {
    if (this.cacheVnode) {
      this.cacheVnode.componentInstance.$destroy();
    }
  },
  render: function render() {
    var vnode = getFirstComponentChild(this.$slots.default);
    if (this.isCurrent) {
      if (this.cacheVnode) {
        vnode.componentInstance = this.cacheVnode.componentInstance;
      } else {
        this.cacheVnode = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode;
  }
};

function install(Vue) {
  Vue.component('keep-alive-component', KeepAliveComponent);
}

var index = {
  install: install,
  createKeepComponent: createKeepComponent
};

export default index;
