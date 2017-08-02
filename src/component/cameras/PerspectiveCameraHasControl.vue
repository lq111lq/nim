<template>
    <span></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    var OrbitControls = require('./controls/OrbitControls.js');
    module.exports = {
        name: 'PerspectiveCameraHasControl',
        mounted: function() {
            var $parentEl = $(this.$parent.$el);
            var w = $parentEl.width();
            var h = $parentEl.height();

            var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
            camera.position.x = 0;
            camera.position.y = 10;
            camera.position.z = 10;
            this.object3D = camera;
            this.$parent.camera = camera;

            var controls = new OrbitControls(camera, this.$parent.$el);
            controls.maxPolarAngle = Math.PI * 0.5;
            controls.minDistance = 0;
            controls.maxDistance = 750;
            controls.reset();

            this.$emit('object3DCreated');
        }
    }
</script>

<style>

</style>