<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'SphereGeometry',
        extends: require('./Geometry.vue'),
        props: {
            radius: {
                type: [Number, String],
                default: 1
            },
            widthSegments: {
                type: [Number, String],
                default: 8
            },
            heightSegments: {
                type: [Number, String],
                default: 6
            },
            phiStart: {
                type: [Number, String],
                default: 0
            },
            phiLength: {
                type: [Number, String],
                default: Math.PI * 2
            },
            thetaStart: {
                type: [Number, String],
                default: 0
            },
            thetaLength: {
                type: [Number, String],
                default: Math.PI
            }
        },
        watch: {
            radius: 'generateGeometry',
            widthSegments: 'generateGeometry',
            heightSegments: 'generateGeometry',
            phiStart: 'generateGeometry',
            phiLength: 'generateGeometry',
            thetaStart: 'generateGeometry',
            thetaLength: 'generateGeometry'
        },
        methods: {
            generateGeometryImpl: function() {
                var geometry = new THREE.SphereGeometry(
                    Number(this.radius),
                    Number(this.widthSegments),
                    Number(this.heightSegments),
                    Number(this.phiStart),
                    Number(this.phiLength),
                    Number(this.thetaStart),
                    Number(this.thetaLength)
                );
                return geometry;
            }
        }
    }
</script>

<style>

</style>