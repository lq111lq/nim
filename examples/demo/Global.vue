<template>
    <el-row style="height: 100%;">
        <el-col :span="24" style="height: 100%;padding: 0px;">
            <renderer class="renderer">
                <perspective-camera-control positionZ="200" positionY="0"></perspective-camera-control>
                <scene>
                    <directional-light :intensity="0.5" color="#43419e" positionZ="150"></directional-light>
                    <directional-light :intensity="0.5" color="#43419e" positionZ="-150"></directional-light>
                    <directional-light :intensity="0.5" color="#43419e" positionX="150"></directional-light>
                    <directional-light :intensity="0.5" color="#43419e" positionX="-150"></directional-light>
                    <directional-light :intensity="0.5" color="#43419e" positionY="150"></directional-light>
                    <directional-light :intensity="0.5" color="#43419e" positionY="-150"></directional-light>
                    <glow></glow>
                    <points>
                        <buffer-geometry ref="geometry"></buffer-geometry>
                        <points-material color="#ffffff" vertexColors="VertexColors" :sizeAttenuation="true" :size="0.5"></points-material>
                    </points>

                    <group :rotationX="Math.PI*(15/180)">
                        <points :rotationY="r">
                            <buffer-geometry ref="ringGeometry"></buffer-geometry>
                            <points-material color="#ffffff" vertexColors="VertexColors" :sizeAttenuation="false" :size="1.5"></points-material>
                        </points>
                    </group>
                    <group :rotationX="Math.PI*(60/180)">
                        <points :rotationY="r*2" scaleX="1.4" scaleZ="1.4">
                            <buffer-geometry ref="ringGeometry1"></buffer-geometry>
                            <points-material color="#ffffff" vertexColors="VertexColors" :sizeAttenuation="false" :size="2.5"></points-material>
                        </points>
                    </group>
                    <group :rotationZ="Math.PI*(45/180)">
                        <points :rotationY="r*3" scaleX="1.2" scaleZ="1.2">
                            <buffer-geometry ref="ringGeometry2"></buffer-geometry>
                            <points-material color="#ffffff" vertexColors="VertexColors" :sizeAttenuation="false" :size="2.0"></points-material>
                        </points>
                    </group>

                </scene>
            </renderer>
        </el-col>
    </el-row>
</template>

<script>
    var TWEEN = require('@tweenjs/tween.js');
    var points = require('../test/points/points.json');

    var particles = (function() {
        var particleCount = points.length;
        var particlePositions = new Float32Array(particleCount * 3);
        var colors = new Float32Array(particleCount * 3);
        var r = 100;

        for(var i = 0; i < points.length; i++) {

            var lat = points[i].lat;
            var lng = points[i].lng;

            var y = Math.sin(Math.PI * lat / 180) * r;
            var r0 = Math.cos(Math.PI * lat / 180) * r;

            var x = Math.sin(Math.PI * lng / 180) * r0;
            var z = Math.cos(Math.PI * lng / 180) * r0;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            colors[i * 3 + 0] = 0;
            colors[i * 3 + 1] = 0.4;
            colors[i * 3 + 2] = 0.6;

            if(points[i].type === 0) {
                colors[i * 3 + 0] = 0.8;
                colors[i * 3 + 1] = 0.9;
                colors[i * 3 + 2] = 1.0;
            }
        }

        var particles = {
            position: particlePositions,
            colors: colors
        };

        return particles;
    })();

    var particles2 = (function() {
        var particleCount = points.length;
        var particlePositions = new Float32Array(particleCount * 3);
        var colors = new Float32Array(particleCount * 3);

        for(var i = 0; i < points.length; i++) {

            var lat = points[i].lat;
            var lng = points[i].lng;

            var y = lat;
            var x = lng;
            var z = 0;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            colors[i * 3 + 0] = 0.3;
            colors[i * 3 + 1] = 0.2;
            colors[i * 3 + 2] = 0;

            if(points[i].type === 0) {
                colors[i * 3 + 0] = 1.0;
                colors[i * 3 + 1] = 0.9;
                colors[i * 3 + 2] = 0.8;
            }
        }

        var particles = {
            position: particlePositions,
            colors: colors
        };

        return particles;
    })();

    var ringParticles = (function() {

        var particleCount = 120;
        var particlePositions = new Float32Array(particleCount * 3);
        var colors = new Float32Array(particleCount * 3);

        for(var i = 0; i < particleCount; i++) {
            var r = 160 + Math.random() * 15;
            var lat = 0;
            var lng = -180 + 360 * (i / particleCount);

            var y = Math.sin(Math.PI * lat / 180) * r + Math.random() * 10 -5;
            var r0 = Math.cos(Math.PI * lat / 180) * r;

            var x = Math.sin(Math.PI * lng / 180) * r0;
            var z = Math.cos(Math.PI * lng / 180) * r0;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y + Math.random() * 5;
            particlePositions[i * 3 + 2] = z;

            colors[i * 3 + 0] = 0.8;
            colors[i * 3 + 1] = 0.9;
            colors[i * 3 + 2] = 1.0;
        }

        var particles = {
            position: particlePositions,
            colors: colors
        };

        return particles;
    })();

    module.exports = {
        name: 'Global',
        data: function() {
            return {
                p: 1,
                r: 0,
            }
        },
        mounted: function() {
            var self = this;
            var particleCount = points.length;

            this.$refs.geometry.addAttribute('position', new Float32Array(particleCount * 3), 3, true);
            this.$refs.geometry.addAttribute('color', new Float32Array(particleCount * 3), 3, true);
            this.updateAttribute();

            this.$refs.ringGeometry.addAttribute('position', ringParticles.position, 3, true);
            this.$refs.ringGeometry.addAttribute('color', ringParticles.colors, 3, true);

            this.$refs.ringGeometry1.addAttribute('position', ringParticles.position, 3, true);
            this.$refs.ringGeometry1.addAttribute('color', ringParticles.colors, 3, true);

            this.$refs.ringGeometry2.addAttribute('position', ringParticles.position, 3, true);
            this.$refs.ringGeometry2.addAttribute('color', ringParticles.colors, 3, true);

            function animate() {
                self.r += 0.0005;
                self.af = requestAnimationFrame(animate);
            }
            animate();
        },
        beforeDestroy: function() {
            this.af && window.cancelAnimationFrame(this.af);
        },
        methods: {
            updateAttribute: function(str) {
                //              debugger;
                var particleCount = points.length;
                var p = this.p;

                var positions = this.$refs.geometry.geometry.attributes.position.array;
                for(var v = 0; v < particleCount; v++) {
                    positions[v * 3 + 0] = particles.position[v * 3 + 0] * p + particles2.position[v * 3 + 0] * (1 - p);
                    positions[v * 3 + 1] = particles.position[v * 3 + 1] * p + particles2.position[v * 3 + 1] * (1 - p)
                    positions[v * 3 + 2] = particles.position[v * 3 + 2] * p + particles2.position[v * 3 + 2] * (1 - p)
                }
                this.$refs.geometry.geometry.attributes.position.needsUpdate = true;

                var colors = this.$refs.geometry.geometry.attributes.color.array;
                for(var v = 0; v < particleCount; v++) {
                    colors[v * 3 + 0] = particles.colors[v * 3 + 0] * p + particles2.colors[v * 3 + 0] * (1 - p);
                    colors[v * 3 + 1] = particles.colors[v * 3 + 1] * p + particles2.colors[v * 3 + 1] * (1 - p)
                    colors[v * 3 + 2] = particles.colors[v * 3 + 2] * p + particles2.colors[v * 3 + 2] * (1 - p)
                }
                this.$refs.geometry.geometry.attributes.color.needsUpdate = true;
            }
        },
        components: {
            'glow': require('./glow.vue')
        }
    }
</script>

<style scoped>
    .renderer {
        width: 100%;
        height: 100%;
    }
    
    .block {
        padding: 5px 4px;
        overflow: hidden;
        border-bottom: 1px solid #eff2f6;
    }
    
    .block:last-child {
        border-bottom: none;
    }
    
    .block>span {
        font-size: 14px;
        color: #8492a6;
        line-height: 44px;
    }
    
    .block>.input {
        float: right;
        width: 70%;
        margin-right: 20px;
    }
    
    .card {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 10px;
        border: 1px solid #d1dbe5;
        border-radius: 4px;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }
    
    .cell {
        float: left;
        width: 10%;
        height: 10%;
        border: solid 1px #8492A6;
        box-sizing: border-box;
        overflow: hidden;
    }
    
    .cell input {
        width: 100%;
        height: 100%;
        border: 0px;
    }
</style>