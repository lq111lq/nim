<template>
    <span><slot></slot></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    module.exports = {
        name: 'Scene',
        extends: require('../core/Object3D.vue'),
        mounted: function() {
            var scene = new THREE.Scene();
            
            //scene.background = new THREE.Color( 0x43419e );
            //scene.fog = new THREE.FogExp2( 0x43419e, 0.0025 );
            
            this.object3D = scene;
            this.$parent.scene = scene;
            this.$emit('object3DCreated');
        }
    }
</script>

<style>

</style>