var Vue = require('vue');
var App = require('./App.vue');
var nim = require('src/index.js');

Vue.use(nim);

new Vue({
    el: '#app',
    render: function(h) {
        return h(App);
    }
})