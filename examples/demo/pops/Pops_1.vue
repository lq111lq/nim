<template>
    <el-row style="height: 100%;">
        <el-col :span="24" style="height: 100%;padding: 10px;">
            <!--<span v-for="v,k,i in pops">{{i}}</span>-->
            <div v-if="focus.name" style="
                position: absolute;
                right: 25px;
                top: 15px;
                color: #888888;
                font-size: 45px;
                text-align: right;
            ">
                <span>{{focus.name}}</span><br />
                <span>{{focus.v}}</span>
            </div>
            <canvas ref="canvas" width="3840" height="1920" style="display: none;"></canvas>
            <renderer class="renderer" clearColor="#fafafa">
                <perspective-camera-control positionZ="200" positionY="200"></perspective-camera-control>
                <scene>
                    <mesh :rotationX="-Math.PI*0.5">
                        <plane-geometry :width="960*3" height="480">></plane-geometry>
                        <mesh-basic-material color="#ffffff" :transparent="true">
                            <texture slot="map" ref="canvasTexture"></texture>
                        </mesh-basic-material>
                    </mesh>

                    <local-label v-if="darwed" v-for="v,k,i in pops" :points="v.slice(0,5)" :delay="i*50" @mouseenter.native="handleMouseenter(k,v)" @mouseout.native="handleMouseout(k)"></local-label>
                    <!--<grid-helper :size="100" :divisions="100"></grid-helper>-->
                </scene>
            </renderer>
        </el-col>
    </el-row>
</template>

<script>
    var THREE = require('three');
    var d3 = require('d3');
    var d3gp = require('d3-geo-projection');
    var pops = require('../pops.js');
    var TWEEN = require('@tweenjs/tween.js');
    module.exports = {
        name: 'Pops_1',
        data: function() {
            return {
                pops: pops,
                darwed: false,
                focus: {
                    name: '',
                    v: 1000
                }
            }
        },
        methods: {
            draw: function() {
                var self = this;

                var width = 1920 * 2,
                    height = 960 * 2;

                var projection = d3.geoEquirectangular()
                    .scale(612)
                    .rotate([0, 0])
                    .translate([width / 2, height / 2])
                    .precision(.1);

                var path = d3.geoPath()
                    .projection(projection);

                d3.json("./static/world_2.json", function(error, world) {
                    var canvas = self.$refs.canvas;
                    var canvasTexture = self.$refs.canvasTexture;
                    var context = canvas.getContext("2d");

                    context.fillStyle = 'rgba(0, 0, 0, 0)';
                    context.fillRect(0, 0, width, height);

                    context.beginPath();
                    context.fillStyle = 'rgba(0,225, 255, 0.075)';
                    context.strokeStyle = "rgba(0, 0, 0, 1)";
                    context.lineWidth = 0.25;
                    path.context(context)(world); //world.features[i]
                    context.closePath();
                    context.fill();
                    context.stroke();

                    canvasTexture.setCanvas(canvas);
                    canvasTexture.texture;
                    canvasTexture.texture.anisotropy = 16;
                    canvasTexture.texture.wrapS = THREE.RepeatWrapping
                    canvasTexture.texture.wrapT = THREE.RepeatWrapping;
                    canvasTexture.texture.repeat.set(3, 1);
                    canvasTexture.texture.needsUpdate = true;
                    self.darwed = true;
                });
            },
            handleMouseenter: function(str,v) {
                this.focus.name = str;
                this.focus.v =  v.reduce(function(a,b){
                    return a + b.pop
                },0)
            },
            handleMouseout: function(str) {
                if(this.focus.name === str) {
                    this.focus.name = ''
                }
            }
        },
        mounted: function() {
            this.draw();
        },
        components: {
            'local-label': require('./LocalLabel.vue')
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