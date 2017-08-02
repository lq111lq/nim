<template>
    <div>
        <renderer class="renderer" :cameraPositionZ="10" :cameraPositionY="10" style="float: left;">
            
            <assets @loaded="loaded=true">
                <texture-loader id="earth1" url="./static/earth.png"></texture-loader>
                <texture-loader id="earth2" url="./static/earth2.png"></texture-loader>
            </assets>
            <!--<perspective-camera :positionZ="positionZ" :positionY="positionY" lookAtX="0" lookAtY="0" lookAtZ="0" ref="camera"></perspective-camera>-->
            <perspective-camera-control></perspective-camera-control>
            <scene v-if="loaded">
                <mesh>
                    <cone-geometry v-if="!isBox"></cone-geometry>
                    <box-geometry v-if="isBox" :width="width" :height="height" :depth="depth"></box-geometry>
                    <mesh-basic-material :color="color" :map="earth?'#earth2':'#earth1'"></mesh-basic-material>
                </mesh>
                <!--<cube :scaleY="2" positionX="-1" @click.native="alert('click')" @mouseenter.native="alert('mouseenter')"></cube>
                <yellow-cube :scaleY="2" positionX="1"></yellow-cube>-->
                <grid-helper :size="10" :divisions="10"></grid-helper>
            </scene>

        </renderer>
        
        <span>positionY:</span><input type="range" min="0" max="100" v-model="positionY" /><br /> 
        <span>positionZ:</span><input type="range" min="1" max="100" v-model="positionZ" /><br /> 
        <button type="button" @click="isBox = !isBox">{{isBox?'box':'cone'}}</button><br /> 
        <button type="button" @click="earth = !earth">{{earth?'#earth2':'#earth1'}}</button><br /> 
        
        <span>width:</span><input type="range" min="1" max="10" v-model="width" /><br /> 
        <span>height:</span><input type="range" min="1" max="10" v-model="height" /><br /> 
        <span>depth:</span><input type="range" min="1" max="10" v-model="depth" /><br /> 
        
        <span>{{color}}</span><input type="color" v-model="color" /><br /> 
        
    </div>
</template>

<script>
    module.exports = {
        name: 'helloWorld',
        data: function() {
            return {
                earth:false,
                loaded:false,
                
                positionY: 5,
                positionZ: 5,
                isBox: false,

                width: 1,
                height: 1,
                depth: 1,
                
                color:'#00ff40'
            }
        },
        watch: {
            positionY: function() {
                var self = this;
                this.$nextTick(function() {
                    self.$refs.camera && self.$refs.camera.lookAt(0, 0, 0);
                })
            },
            positionZ: function() {
                var self = this;
                this.$nextTick(function() {
                    self.$refs.camera && self.$refs.camera.lookAt(0, 0, 0);
                })
            }
        },
        mounted: function() {
            this.$refs.camera && this.$refs.camera.lookAt(0, 0, 0);
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

<style scoped>
    .renderer {
        width: 400px;
        height: 800px;
    }
</style>