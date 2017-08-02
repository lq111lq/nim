<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'BoxGeometry',
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
            depth: {
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
            },
            depthSegments: {
                type: [Number, String],
                default: 1
            }
        },
        watch: {
            width: 'generateGeometry',
            height: 'generateGeometry',
            depth: 'generateGeometry',
            widthSegments: 'generateGeometry',
            heightSegments: 'generateGeometry',
            depthSegments: 'generateGeometry'
        },
        methods: {
            generateGeometryImpl: function() {
                var geometry = new THREE.BoxGeometry(Number(this.width), Number(this.height), Number(this.depth), Number(this.widthSegments), Number(this.heightSegments), Number(this.depthSegments));
                return geometry;
            }
        }
    }
</script>

<style>

</style>