<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Geometry',
        props: {
            vertices: String
        },
        watch: {
            vertices: 'generateGeometry'
        },
        methods: {
            generateGeometry: function() {

                if(this.generateGeometryImpl) {
                    var oldGeometry = this.geometry;
                    this.geometry = this.generateGeometryImpl();

                    if(this.$parent) {
                        this.$parent.geometry = this.geometry
                    }

                    if(oldGeometry) {
                        oldGeometry.dispose()
                    }
                }

            },
            generateGeometryImpl: function() {
                var geometry = new THREE.Geometry();
                
                if(this.vertices && this.vertices.length) {
                    var array = this.vertices.split(' ').filter(function(d){
                        return d!=="";
                    });
                    for(var i = 0; i < array.length; i += 3) {
                        geometry.vertices.push(
                            new THREE.Vector3(array[i], array[i + 1], array[i + 2])
                        );
                    }
                }

                geometry.computeBoundingSphere();
                return geometry;
            }
        },
        mounted: function() {
            this.generateGeometry();
        },
        beforeDestroy: function() {
            this.geometry && this.geometry.dispose();
        }
    }
</script>

<style>

</style>