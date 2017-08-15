<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'AmbientLight',
        extends: require('../core/Object3D.vue'),
        data:function() {
            return {}
        },
        props: {
            color: {
                type: [Number, String],
                default: 0xffffff
            },
            intensity:{
                type: [Number, String],
                default: 1
            }
        },
        watch:{
            color:function() {
                if(this.object3D) {
                    this.object3D.color = new THREE.Color(this.color);
                }
            },
            intensity:function() {
                if(this.object3D) {
                    this.object3D.intensity = Number(this.intensity);
                }
            }
        },
        mounted: function() {
            var light = new THREE.AmbientLight( new THREE.Color(this.color), Number(this.intensity));
            
            this.object3D = light;
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