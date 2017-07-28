var nim = {};

nim.install = function(Vue, options) {
    Vue.component('renderer',require('./component/Renderer.vue'));
    
    Vue.component('perspective-camera',require('./component/cameras/PerspectiveCamera.vue'));
    
    Vue.component('scene',require('./component/scenes/Scene.vue'));
    
    Vue.component('mesh',require('./component/objects/Mesh.vue'));
    
    Vue.component('cone-geometry',require('./component/geometries/ConeGeometry.vue'));
    Vue.component('box-geometry',require('./component/geometries/BoxGeometry.vue'));
    
    Vue.component('cube',require('./component/Cube.vue'));
    Vue.component('grid-helper',require('./component/GridHelper.vue'));
    
};

module.exports = nim;