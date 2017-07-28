<template>
    <div id="app">
        <renderer class="renderer" :cameraPositionZ="10" :cameraPositionY="10" style="float: left;">
            <perspective-camera :positionZ="positionZ" :positionY="positionY" lookAtX="0" lookAtY="0" lookAtZ="0" ref="camera"></perspective-camera>
            <scene>
                <mesh>
                    <cone-geometry v-if="!isBox"></cone-geometry>
                    <box-geometry v-if="isBox" :width="width" :height="height" :depth="depth"></box-geometry>
                </mesh>
                <!--<cube :scaleY="2" positionX="-1" @click.native="alert('click')" @mouseenter.native="alert('mouseenter')"></cube>
                <yellow-cube :scaleY="2" positionX="1"></yellow-cube>-->
                <grid-helper :size="10" :divisions="10"></grid-helper>
            </scene>

        </renderer>
        
        <span>positionY:</span><input type="range" min="0" max="100" v-model="positionY" /><br /> 
        <span>positionZ:</span><input type="range" min="1" max="100" v-model="positionZ" /><br /> 
        <button type="button" @click="isBox = !isBox">{{isBox?'box':'cone'}}</button><br /> 
        
        <span>width:</span><input type="range" min="1" max="10" v-model="width" /><br /> 
        <span>height:</span><input type="range" min="1" max="10" v-model="height" /><br /> 
        <span>depth:</span><input type="range" min="1" max="10" v-model="depth" /><br /> 
    </div>
</template>

<script>
    module.exports = {
        name: 'app',
        data: function() {
            return {
                positionY: 5,
                positionZ: 5,
                isBox: false,

                width: 1,
                height: 1,
                depth: 1
            }
        },
        watch: {
            positionY: function() {
                var self = this;
                this.$nextTick(function() {
                    self.$refs.camera.lookAt(0, 0, 0);
                })
            },
            positionZ: function() {
                var self = this;
                this.$nextTick(function() {
                    self.$refs.camera.lookAt(0, 0, 0);
                })
            }
        },
        mounted: function() {
            this.$refs.camera.lookAt(0, 0, 0);
        },
        methods: {
            alert: function(str) {
                console.log(str);
            }
        },
        components: {
            'yellow-cube': require('./YellowCube.vue')
        }
    }
</script>

<style>
    .renderer {
        width: 400px;
        height: 800px;
    }
</style>