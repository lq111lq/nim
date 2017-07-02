var nim = {};

nim.install = function(Vue, options) {
    Vue.component('renderer',require('./component/Renderer.vue'));
    Vue.component('cube',require('./component/Cube.vue'));
    
    Vue.component('grid-helper',require('./component/GridHelper.vue'));
};

module.exports = nim;