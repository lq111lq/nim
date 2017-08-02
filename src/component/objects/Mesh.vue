<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Mesh',
        extends: require('../core/Object3D.vue'),
        data:function() {
            return {
                geometry:null,
                material:null
            }
        },
        watch:{
             geometry:function(geometry) {
                if(this.object3D) {
                    this.object3D.geometry = geometry;
                }
             },
             material:function(material) {
                if(this.object3D) {
                    this.object3D.material = material;
                }
             }
        },
        mounted: function() {
            var mesh = new THREE.Mesh();
            
            this.object3D = mesh;
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