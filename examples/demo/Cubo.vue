<template>
    <el-row style="height: 100%;">
        <el-col :span="24" style="height: 100%;padding: 10px;">
            <renderer class="renderer" clearColor="#FFFFFF">
                <orthographic-camera-control></orthographic-camera-control>
                <scene>
                    <point-light intensity="0.6" color="#ffffff" positionX="2" positionY="10" positionZ="-2"></point-light>
                    <point-light intensity="0.4" color="#ffffff" positionX="2" positionY="5" positionZ="2"></point-light>
                    <ambient-light intensity="0.6" color="#ffffff"></ambient-light>

                    <n-line>
                        <geometry vertices="0 0 0 0 5 0"></geometry>
                        <line-basic-material color="#888888"></line-basic-material>
                    </n-line>

                    <n-line>
                        <geometry vertices="0 0 -5 0 0 5"></geometry>
                        <line-basic-material color="#888888"></line-basic-material>
                    </n-line>

                    <n-line>
                        <geometry vertices="0 0 0 5 0 0"></geometry>
                        <line-basic-material color="#888888"></line-basic-material>
                    </n-line>

                    <sprite positionY="0" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_0"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="1" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_10"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="2" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_20"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="3" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_30"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="4" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_40"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="5" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_50"></texture>
                        </sprite-material>
                    </sprite>

                    <mesh v-for="c,i in array" :positionX="(i%10)*1 + 0.4" :positionZ="~~(i/10)*1 + 0.6 - 5" :positionY="0.5*c.value" :scaleY="c.value" v-if="Number(c.value)>0">
                        <box-geometry width="0.8" :height="1" depth="0.8"></box-geometry>
                        <mesh-phong-material color="#00ddff"></mesh-phong-material>
                    </mesh>
                </scene>
            </renderer>
            <div class="card" style="display:none ;">
                <div style="width: 500px;height: 500px;;">
                    <div class="cell" v-for="c in array">
                        <input type="number" v-model="c.value" />
                    </div>
                </div>
                <div style="width: 500px;">{{JSON.stringify(array)}}</div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    var TWEEN = require('@tweenjs/tween.js');
    var toArray = require('./array.json');
    module.exports = {
        name: 'Cubo',
        data: function() {
            var array = [];

            for(var i = 0; i < 100; i++) {
                array.push({
                    value: 0
                });
            }

            return {
                array: array
            }
        },
        methods: {
            alert: function(str) {
                console.log(str);
            }
        },
        mounted: function() {
            var self = this;
            function draw(name) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                var size = 512;
                var r = size / 2;
                canvas.width = size;
                canvas.height = size;

                context.clearRect(0, 0, canvas.width, canvas.height);

                context.lineWidth = 1;
                context.font = "500 128px SimHei";
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = "#000000";
                context.fillText(name, r, r);
                context.strokeText(name, r, r);

                return canvas;
            }

            var canvas = draw('0');
            this.$refs.scale_0.setCanvas(canvas);

            var canvas = draw('10');
            this.$refs.scale_10.setCanvas(canvas);

            var canvas = draw('20');
            this.$refs.scale_20.setCanvas(canvas);

            var canvas = draw('30');
            this.$refs.scale_30.setCanvas(canvas);

            var canvas = draw('40');
            this.$refs.scale_40.setCanvas(canvas);

            var canvas = draw('50');
            this.$refs.scale_50.setCanvas(canvas);

            var from = {
                v: 0
            }

            new TWEEN.Tween(from)
                .to({
                    v: 1
                }, 2000)
                .onUpdate(function() {
                    var array = toArray.map(function(d){
                        return {
                            value:d.value * from.v
                        }
                    });
                    
                    self.array = array;
                })
                .delay(500)
                .start();
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