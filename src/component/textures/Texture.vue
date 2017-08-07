<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Texture',
        props: {
            src: String
        },
        watch: {
            src: 'load'
        },
        methods: {
            load: function() {
                var self = this;
                
                if(!this.src){
                    return;
                }
                
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
            },
            setCanvas: function(canvas) {

                var texture = new THREE.Texture(canvas);
                texture.needsUpdate = true;
                
                var oldTexture = self.texture;
                this.texture = texture;
                this.$parent && this.$parent.$emit('updateMap');
                
                oldTexture && oldTexture.dispose();
            }
        },
        mounted: function() {
            this.load();
        }
    }
</script>

<style>

</style>