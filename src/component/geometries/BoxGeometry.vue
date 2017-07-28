<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'BoxGeometry',
        extends: require('../core/Geometry.vue'),
        props: {
            width: {
                type: [Number, String],
                default: 1
            },
            height: {
                type: [Number, String],
                default: 1
            },
            depth: {
                type: [Number, String],
                default: 1
            }
        },
        watch: {
            width: 'generateGeometry',
            height: 'generateGeometry',
            depth: 'generateGeometry'
        },
        methods: {
            generateGeometryImpl: function() {
                var geometry = new THREE.BoxGeometry(Number(this.width), Number(this.height), Number(this.depth));
                return geometry;
            }
        }
    }
</script>

<style>

</style>