<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'PointLight',
        extends: require('../core/Object3D.vue'),
        data: function() {
            return {}
        },
        props: {
            color: {
                type: [Number, String],
                default: 0xffffff
            },
            intensity: {
                type: [Number, String],
                default: 1
            },
            shadow: {
                type: Object,
                default: null
            }
        },
        watch: {
            color: function() {
                if(this.object3D) {
                    this.object3D.color = new THREE.Color(this.color);
                }
            },
            intensity: function() {
                if(this.object3D) {
                    this.object3D.intensity = Number(this.intensity);
                }
            }
        },
        mounted: function() {
            var light = new THREE.PointLight(new THREE.Color(this.color), Number(this.intensity), 0);
            light.castShadow = true;
            this.shadow = this.shadow;
//          light.shadow.mapSize.width = 2048; // default
//          light.shadow.mapSize.height = 2048; // default
//          light.shadow.camera.near = 0.5; // default
//          light.shadow.camera.far = 500 // default
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