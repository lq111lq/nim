<template>
    <span></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    var OrbitControls = require('./controls/OrbitControls.js');
    module.exports = {
        name: 'OrthographicCameraHasControl',
        mounted: function() {
            var $parentEl = $(this.$parent.$el);
            var w = $parentEl.width();
            var h = $parentEl.height();

            var camera = new THREE.OrthographicCamera(-w, w, h, -h, -500, 1000);
            camera.position.x = 1.2950719160528794;
            camera.position.y = 5.634590626712015;
            camera.position.z = 4.513888520130387;

            camera.rotation.x = -0.7585466689715571;
            camera.rotation.y = -0.4824433777064417;
            camera.rotation.z = -0.4142351085756123;
            
            camera.zoom = 143;
            
            this.object3D = camera;
            this.$parent.camera = camera;
            this.$emit('object3DCreated');
        }
    }
</script>

<style>

</style>