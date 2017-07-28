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

            this.object3D = scene;
            this.$parent.scene = scene;
            this.$emit('object3DCreated');
        }
    }
</script>

<style>

</style>