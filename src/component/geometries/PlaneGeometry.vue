<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'PlaneGeometry',
        extends: require('./Geometry.vue'),
        props: {
            width: {
                type: [Number, String],
                default: 1
            },
            height: {
                type: [Number, String],
                default: 1
            },
            widthSegments: {
                type: [Number, String],
                default: 1
            },
            heightSegments: {
                type: [Number, String],
                default: 1
            }
        },
        watch: {
            width: 'generateGeometry',
            height: 'generateGeometry',
            widthSegments: 'generateGeometry',
            heightSegments: 'generateGeometry'
        },
        methods: {
            generateGeometryImpl: function() {
                var geometry = new THREE.PlaneGeometry(Number(this.width), Number(this.height), Number(this.widthSegments), Number(this.heightSegments));
                return geometry;
            }
        }
    }
</script>

<style>

</style>