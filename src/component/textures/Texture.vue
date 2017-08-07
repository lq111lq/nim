<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Texture',
        props: {
            src: String
        },
        watch: {
            src:'load'
        },
        methods: {
            load: function() {
                var self = this;
                var loader = new THREE.TextureLoader();
                loader.load(
                    // resource URL
                    this.src,
                    // Function when resource is loaded
                    function(texture) {
                        var oldTexture = self.texture;
                        self.texture = texture;
                        self.$parent && self.$parent.$emit('updateMap');
                        oldTexture && oldTexture.dispose();
                    },
                    // Function called when download progresses
                    function(xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    // Function called when download errors
                    function(xhr) {
                        console.log('An error happened');

                        self.texture = null;
                        self.$parent && self.$parent.$emit('updateMap');
                        self.texture && self.texture.dispose();
                    }
                );
            }
        },
        mounted: function() {
            this.load();
        }
    }
</script>

<style>

</style>