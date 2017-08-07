<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Sprite',
        extends: require('../core/Object3D.vue'),
        data:function() {
            return {
                material:null
            }
        },
        watch:{
             material:function(material) {
                if(this.object3D) {
                    this.object3D.material = material;
                }
             }
        },
        mounted: function() {
            var sprite = new THREE.Sprite();
            
            this.object3D = sprite;
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