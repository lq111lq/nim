<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'BufferGeometry',
        extends: require('./Geometry.vue'),
        methods: {
            generateGeometryImpl: function() {
                var geometry = new THREE.BufferGeometry();
                return geometry;
            },
            addAttribute: function(name, array, size, dynamic) {
                if(this.geometry) {
                    this.geometry.addAttribute(name, new THREE.BufferAttribute(new Float32Array(array), size).setDynamic(dynamic));
                }
            }
        },
        mounted: function() {
            this.generateGeometry();
        },
        beforeDestroy: function() {
            this.geometry && this.geometry.dispose();
        }
    }
</script>

<style>

</style>