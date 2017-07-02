<template>
    <span><slot></slot></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    module.exports = {
        name: 'Cube',
        extends:require('./core/Object3D.js'),
        mounted: function() {
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var cube = new THREE.Mesh( geometry, material );
            this.object3D = cube;
            this.$emit('object3DCreated');
            console.log('Cube created');
        },
        beforeDestroy: function() {
            this.$emit('object3DDestroy');
            this.object3D.geometry.dispose();
            this.object3D.material.dispose();
            console.log('Cube dispose');
        }
    }
</script>

<style>

</style>