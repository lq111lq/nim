<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Geometry',
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

            }
        },
        mounted: function() {
            this.generateGeometry();
        },
        beforeDestroy: function() {

        }
    }
</script>

<style>

</style>