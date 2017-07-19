<template>
    <span></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    module.exports = {
        name: 'PerspectiveCamera',
        extends: require('../core/Object3D.js'),
        mounted: function() {
            var $parentEl = $(this.$parent.$el);
            var w = $parentEl.width();
            var h = $parentEl.height();
            
            var camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
            this.object3D = camera;
            this.$parent.camera = camera;
            this.$emit('object3DCreated');
        }
    }
</script>

<style>

</style>