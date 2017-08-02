<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Material',
        methods: {
            generateMaterial: function() {
                if(this.generateMaterialImpl) {
                    var oldMaterial = this.material;
                    this.material = this.generateMaterialImpl();
                    
                    if(this.$parent) {
                        this.$parent.material = this.material
                    }
                    
                    if(oldMaterial) {
                        oldMaterial.dispose()
                    }
                }

            },
            getRenderer: function(x, y, z) {
                return this.$parent ? this.$parent.getRenderer():undefined;
            },
            getAssets: function() {
                var r = this.getRenderer();
                return r?r.assets:undefined;
            }
        },
        mounted: function() {
            this.generateMaterial();
        },
        beforeDestroy: function() {
            this.material && this.material.dispose();
        }
    }
</script>

<style>

</style>