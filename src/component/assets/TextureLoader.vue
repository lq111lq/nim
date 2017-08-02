<template>
    <span></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'TextureLoader',
        props: {
            id: String,
            url: String
        },
        mounted: function() {
            var state = {
                id:this.id,
                state:'loading',
                loaded:0,
                total:0
            };
            var asset = {
                state:state,
                texture:undefined
            };
            
            if(!this.$parent.assets) {
                this.$parent.assets = {}
            };
            
            this.$parent.assetsState.push(state);
            this.$parent.assets[this.id] = asset;
            var loader = new THREE.TextureLoader();
            // load a resource
            loader.load(
                // resource URL
                this.url,
                // Function when resource is loaded
                function(texture) {
                    state.state = 'loaded';
                    asset.texture = texture;
                },
                // Function called when download progresses
                function(xhr) {
                    state.loaded = xhr.loaded;
                    state.total = xhr.total;
                    //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // Function called when download errors
                function(xhr) {
                    state.state = 'error';
                    console.log('An error happened');
                }
            );
        }
    }
</script>

<style>

</style>