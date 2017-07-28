<template>
    <span><slot></slot></span>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    module.exports = {
        name: 'GridHelper',
        extends: require('./core/Object3D.vue'),
        props: {
            size: {
                type: Number,
                default: 10
            },
            divisions: {
                type: Number,
                default: 10
            }
        },
        watch:{
            size:'creatNewObject3d',
            divisions:'creatNewObject3d'
        },
        mounted: function() {
            this.creatNewObject3d();
        },
        methods: {
            creatNewObject3d: function() {
                this.dispose();
                
                var gridHelper = new THREE.GridHelper(this.size, this.divisions);
                this.object3D = gridHelper;
                this.$emit('object3DCreated');
                
                console.log('GridHelper created');
            },
            dispose: function() {
                this.$emit('object3DDestroy');
                this.object3D && 
                this.object3D.geometry &&
                this.object3D.geometry.dispose();
                
                this.object3D &&
                this.object3D.material &&
                this.object3D.material.dispose();
                
                console.log('GridHelper dispose');
            }
        },
        beforeDestroy: function() {
            this.dispose()
        }
    }
</script>

<style>

</style>