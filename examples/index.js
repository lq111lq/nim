var Vue = require('vue');
var App = require('./App.vue');
var nim = require('src/index.js');

var ElementUI = require('element-ui');
require('element-ui/lib/theme-default/index.css').use();
Vue.use(ElementUI)

var VueRouter = require('vue-router');
Vue.use(VueRouter)

var routes = [
  { path: '/helloWorld', component: require('./test/helloWorld.vue') },
  { path: '/cube', component: require('./test/cube/cube.vue') },
  { path: '*', redirect: '/helloWorld'}
]

var router = new VueRouter({
  routes:routes
})

Vue.use(nim);

new Vue({
    el: '#app',
    router:router,
    render: function(h) {
        return h(App);
    }
})