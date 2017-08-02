<template>
    <span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
    module.exports = {
        name: 'Assets',
        data: function() {
            return {
                assetsState: []
            };
        },
        computed: {
            loaded:function() {
                return this.assetsState.filter(function(d){
                    return d.state !== 'loading';
                }).length;
            }
        },
        watch:{
            loaded:function(loaded) {
                if(loaded>0 && loaded === this.assetsState.length) {
                    this.$emit('loaded');
                }
            }
        },
        mounted: function() {
            this.$parent.assets = this.assets;
        },
        beforeDestroy: function() {

        }
    }
</script>

<style>

</style>