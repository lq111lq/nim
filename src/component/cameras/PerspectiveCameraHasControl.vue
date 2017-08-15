<template>
    <span></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    var OrbitControls = require('./controls/OrbitControls.js');
    module.exports = {
        name: 'PerspectiveCameraHasControl',
        props: {
            positionX: {
                type: [Number, String],
                default: 0
            },
            positionY: {
                type: [Number, String],
                default: 0
            },
            positionZ: {
                type: [Number, String],
                default: 0
            }
        },
        watch: {
            positionX: function(value) {
                if(this.object3D) {
                    this.object3D.position.x = Number(value);
                }
            },
            positionY: function(value) {
                if(this.object3D) {
                    this.object3D.position.y = Number(value);
                }
            },
            positionZ: function(value) {
                if(this.object3D) {
                    this.object3D.position.z = Number(value);
                }
            }
        },
        mounted: function() {
            var $parentEl = $(this.$parent.$el);
            var w = $parentEl.width();
            var h = $parentEl.height();

            var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
            
            camera.position.x = Number(this.positionX);
            camera.position.y = Number(this.positionY);
            camera.position.z = Number(this.positionZ);
            
            this.object3D = camera;
            this.$parent.camera = camera;

            var controls = new OrbitControls(camera, this.$parent.$el);
            controls.maxPolarAngle = Math.PI * 0.5;
            controls.minDistance = 0;
            controls.maxDistance = 750;
            controls.reset();

            this.$emit('object3DCreated');
        }
    }
</script>

<style>

</style>