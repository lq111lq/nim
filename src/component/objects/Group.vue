<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Group',
        extends: require('../core/Object3D.vue'),
        data: function() {
            return {}
        },
        mounted: function() {
            var group = new THREE.Group();

            this.object3D = group;
            this.$emit('object3DCreated');
        },
        beforeDestroy: function() {
            this.$emit('object3DDestroy');
            console.log('Cube dispose');
        }
    }
</script>

<style>

</style>