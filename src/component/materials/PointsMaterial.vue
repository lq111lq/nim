<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'PointsMaterial',
        extends: require('./Material.vue'),
        props: {
            color: {
                type: [Number, String],
                default: 0xffffff
            },
            vertexColors:{
                type: String,
                default: 'NoColors'
            },
            sizeAttenuation:{
                type:Boolean,
                default:false
            },
            size:{
                type: [Number, String],
                default: 0xffffff
            }
        },
        watch: {
            color: function(color) {
                if(this.material) {
                    this.material.color = new THREE.Color(color);
                    this.material.needsUpdate = true;
                }
            },
            vertexColors: function(vertexColors) {
                if(this.material) {
                    this.material.vertexColors = THREE[vertexColors];
                    this.material.needsUpdate = true;
                }
            },
            sizeAttenuation: function(sizeAttenuation) {
                if(this.material) {
                    this.material.sizeAttenuation = sizeAttenuation;
                    this.material.needsUpdate = true;
                }
            },
            size: function(size) {
                if(this.material) {
                    this.material.size = Number(size);
                    this.material.needsUpdate = true;
                }
            }
        },
        methods: {
            generateMaterialImpl: function() {
                var material = new THREE.PointsMaterial();
                material.color = new THREE.Color(this.color);  
                material.vertexColors = THREE[this.vertexColors];
                material.sizeAttenuation = this.sizeAttenuation;
                material.size = Number(this.size);
                
                material.needsUpdate = true;
                return material;
            },

        }
    }
</script>

<style>

</style>