<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'LineBasicMaterial',
        extends: require('./Material.vue'),
        props: {
            color: {
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
            }
        },
        methods: {
            generateMaterialImpl: function() {
                var material = new THREE.LineBasicMaterial();
                material.color = new THREE.Color(this.color);
                material.needsUpdate = true;
                return material;
            },

        }
    }
</script>

<style>

</style>