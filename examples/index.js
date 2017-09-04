var TWEEN = require('@tweenjs/tween.js');

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

var Vue = require('vue');
var App = require('./App.vue');
var nim = require('src/index.js');

var ElementUI = require('element-ui');
require('element-ui/lib/theme-default/index.css').use();
Vue.use(ElementUI)

var VueRouter = require('vue-router');
Vue.use(VueRouter)

var routes = [{
        path: '/helloWorld',
        component: function(resolve) {
            require(['./test/helloWorld.vue'], resolve)
        }
    },
    {
        path: '/BoxGeometryTest',
        component: function(resolve) {
            require(['./test/Geometry/BoxGeometryTest.vue'], resolve)
        }
    },
    {
        path: '/SphereGeometryTest',
        component: function(resolve) {
            require(['./test/Geometry/SphereGeometryTest.vue'], resolve)
        }
    },
    {
        path: '/LineTest',
        component: function(resolve) {
            require(['./test/line/LineTest.vue'], resolve)
        }
    },
    {
        path: '/TextureTest',
        component: function(resolve) {
            require(['./test/texture/TextureTest.vue'], resolve)
        }
    },
    {
        path: '/SpriteTest',
        component: function(resolve) {
            require(['./test/sprite/SpriteTest.vue'], resolve)
        }
    },
    {
        path: '/LightTest',
        component: function(resolve) {
            require(['./test/light/LightTest.vue'], resolve)
        }
    },
    {
        path: '/ShadowTest',
        component: function(resolve) {
            require(['./test/light/ShadowTest.vue'], resolve)
        }
    },
    {
        path: '/PointsTest',
        component: function(resolve) {
            require(['./test/points/PointsTest.vue'], resolve)
        }
    },

    {
        path: '/pointsTool',
        component: function(resolve) {
            require(['./tool/pointsTool.vue'], resolve)
        }
    },
    
    {
        path: '/CapeTown',
        component: function(resolve) {
            require(['./demo/CapeTown/index.vue'], resolve)
        }
    },
    {
        path: '/Cubo',
        component: function(resolve) {
            require(['./demo/Cubo.vue'], resolve)
        }
    },
    {
        path: '/Global',
        component: function(resolve) {
            require(['./demo/Global.vue'], resolve)
        }
    },
    {
        path: '/Gugong',
        component: function(resolve) {
            require(['./demo/gugong/index.vue'], resolve)
        }
    },
    {
        path: '/Dalian',
        component: function(resolve) {
            require(['./demo/dalian/index.vue'], resolve)
        }
    },
    {
        path: '/Pops_1',
        component: function(resolve) {
            require(['./demo/pops/Pops_1.vue'], resolve)
        }
    },

    {
        path: '*',
        redirect: '/BoxGeometryTest'
    }
]

var router = new VueRouter({
    routes: routes
})

Vue.use(nim);

new Vue({
    el: '#app',
    router: router,
    render: function(h) {
        return h(App);
    }
})