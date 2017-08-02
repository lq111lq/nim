<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'MeshBasicMaterial',
        extends: require('./Material.vue'),
        props: {
            color: {
                type: [Number, String],
                default: 0xffffff
            },
            wireframe: {
                type: Boolean,
                default: false
            },
            map: String
        },
        watch: {
            color: function(color) {
                if(this.material) {
                    this.material.color = new THREE.Color(color);
                    this.material.needsUpdate = true;
                }
            },
            map: function() {
                if(!this.material) {
                    return;
                }
                var material = this.material;
                if(this.map && this.map.startsWith('#')) {
                    var assets = this.getAssets();
                    if(assets[this.map.replace('#', '')]) {
                        var texture = assets[this.map.replace('#', '')].texture;
                        material.map = texture;
                    }
                }
                material.needsUpdate = true;
            },
            wireframe: function() {
                if(this.material) {
                    this.material.wireframe = this.wireframe;
                    this.material.needsUpdate = true;
                }
            }
        },
        methods: {
            generateMaterialImpl: function() {
                var material = new THREE.MeshBasicMaterial();
                material.color = new THREE.Color(this.color);
                material.wireframe = this.wireframe;
                if(this.map && this.map.startsWith('#')) {
                    var assets = this.getAssets();
                    if(assets[this.map.replace('#', '')]) {
                        var texture = assets[this.map.replace('#', '')].texture;
                        material.map = texture;
                    }
                }
                material.needsUpdate = true;
                return material;
            },

        }
    }
</script>

<style>

</style>