<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Line',
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
            var line = new THREE.Line();
            
            this.object3D = line;
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