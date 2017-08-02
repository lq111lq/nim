<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'ConeGeometry',
        extends: require('./Geometry.vue'),
        methods: {
            generateGeometryImpl:function() {
                var geometry = new THREE.ConeGeometry( 1, 4, 4 );
                return geometry;
            }
        }
    }
</script>

<style>

</style>