var nim = {};

nim.install = function(Vue, options) {
    Vue.component('assets',require('./component/assets/Assets.vue'));
    Vue.component('texture-loader',require('./component/assets/TextureLoader.vue'));
    
    Vue.component('renderer',require('./component/Renderer.vue'));
    
    Vue.component('perspective-camera',require('./component/cameras/PerspectiveCamera.vue'));
    Vue.component('perspective-camera-control',require('./component/cameras/PerspectiveCameraHasControl.vue'));
    Vue.component('orthographic-camera-control',require('./component/cameras/OrthographicCameraHasControl.vue'));
    
     
    Vue.component('scene',require('./component/scenes/Scene.vue'));
    
    Vue.component('mesh',require('./component/objects/Mesh.vue'));
    Vue.component('points',require('./component/objects/Points.vue'));
    Vue.component('sprite',require('./component/objects/Sprite.vue'));
    Vue.component('n-line',require('./component/objects/Line.vue'));
    
    Vue.component('directional-light',require('./component/lights/DirectionalLight.vue'));
    Vue.component('point-light',require('./component/lights/PointLight.vue'));
    Vue.component('ambient-light',require('./component/lights/AmbientLight.vue'));
    
    Vue.component('mesh-basic-material',require('./component/materials/MeshBasicMaterial.vue'));
    Vue.component('mesh-phong-material',require('./component/materials/MeshPhongMaterial.vue'));
    Vue.component('line-basic-material',require('./component/materials/LineBasicMaterial.vue'));
    Vue.component('sprite-material',require('./component/materials/SpriteMaterial.vue'));
    Vue.component('points-material',require('./component/materials/PointsMaterial.vue'));
    
    Vue.component('texture',require('./component/textures/Texture.vue'));
    
    Vue.component('buffer-geometry',require('./component/geometries/BufferGeometry.vue'));
    Vue.component('geometry',require('./component/geometries/Geometry.vue'));
    Vue.component('cone-geometry',require('./component/geometries/ConeGeometry.vue'));
    Vue.component('box-geometry',require('./component/geometries/BoxGeometry.vue'));
    Vue.component('sphere-geometry',require('./component/geometries/SphereGeometry.vue'));
    
    Vue.component('cube',require('./component/Cube.vue'));
    Vue.component('grid-helper',require('./component/GridHelper.vue'));
    
};

module.exports = nim;