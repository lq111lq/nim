<template>
    <span><slot></slot></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    module.exports = {
        name: 'Cube',
        extends: require('src/component/core/Object3D.vue'),
        watch: {
            mouseover: function(value) {
                if(value) {
                    this.material && this.material.color.set( 0xff0000 );
                } else {
                    this.material && this.material.color.set( 0xffff00 );
                }
            }
        },
        mounted: function() {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({
                color: 0xffff00
            });
            this.material = material;
            var cube = new THREE.Mesh(geometry, material);
            
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