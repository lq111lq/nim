<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer" v-if="points.length">
                <perspective-camera-control positionZ="300"></perspective-camera-control>
                <scene>
                    <directional-light :intensity="directionalLightIntensity" :color="directionalLightColor" positionZ="150"></directional-light>
                    <directional-light :intensity="directionalLightIntensity" :color="directionalLightColor" positionZ="-150"></directional-light>
                    <directional-light :intensity="directionalLightIntensity" :color="directionalLightColor" positionX="150"></directional-light>
                    <directional-light :intensity="directionalLightIntensity" :color="directionalLightColor" positionX="-150"></directional-light>
                    <directional-light :intensity="directionalLightIntensity" :color="directionalLightColor" positionY="150"></directional-light>
                    <directional-light :intensity="directionalLightIntensity" :color="directionalLightColor" positionY="-150"></directional-light>
                    <ambient-light :color="ambientLightColor" :intensity="ambientLightIntensity"></ambient-light>
                    <points :positions="particles.position" :colors="particles.colors"></points>
                    <glow></glow>
                    <!--<grid-helper :size="100" :divisions="100"></grid-helper>-->
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <span>directionalLightIntensity</span>
                    <el-slider class="input" v-model="directionalLightIntensity"></el-slider>
                </div>
                <div class="block">
                    <span>ambientLightIntensity</span>
                    <el-slider class="input" v-model="ambientLightIntensity"></el-slider>
                </div>
                <div class="block">
                    <span>directionalLightColor:{{directionalLightColor}}</span>
                    <input type="color" v-model="directionalLightColor" />
                    <span>ambientLightColor:{{ambientLightColor}}</span>
                    <input type="color" v-model="ambientLightColor" />
                </div>
                <!--{{particles}}-->
                <canvas ref="canvas" width="960" height="480" style="display: none;"></canvas>
                <canvas ref="canvas_2" width="960" height="480" style="display: none;"></canvas>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    var d3 = require('d3');
    var d3gp = require('d3-geo-projection');
    module.exports = {
        name: 'pointsTool',
        data: function() {
            return {
                points: [],
                directionalLightIntensity: 0.5,
                directionalLightColor: '#3636e2',
                ambientLightIntensity: 1,
                ambientLightColor: '#ffffff',
            }
        },
        computed: {
            particles: function() {

                var points = this.points;
                var particleCount = points.length;
                var particlePositions = new Float32Array(particleCount * 3);
                var colors = new Float32Array(particleCount * 3);

                for(var i = 0; i < points.length; i++) {
                    var r = 100;
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
                    colors[i * 3 + 1] = 0.2;
                    colors[i * 3 + 2] = 0.3;

                    if(points[i].type === 0) {
                        colors[i * 3 + 0] = 0.8;
                        colors[i * 3 + 1] = 0.9;
                        colors[i * 3 + 2] = 1.0;
                    }
                }

                var particles = {
                    position: particlePositions.toString().split(',').map(function(d) {
                        return Number(d)
                    }),
                    colors: colors.toString().split(',').map(function(d) {
                        return Number(d)
                    })
                };

                return particles;
            }
        },
        mounted: function() {
            this.draw();
        },
        methods: {
            draw: function() {
                var self = this;

                var width = 960,
                    height = 480;

                var projection = d3.geoEquirectangular()
                    .scale(153)
                    .rotate([0, 0])
                    .translate([width / 2, height / 2])
                    .precision(.1);

                var path = d3.geoPath()
                    .projection(projection);

                d3.json("./static/world_1.json", function(error, world) {
                    var context = self.$refs.canvas.getContext("2d");

                    context.fillStyle = 'rgba(0, 0, 0, 1)';
                    context.fillRect(0, 0, width, height);

                    //for(var i = 0; i < world.features.length; i++) {
                    //                      console.log(world.features[i].properties.NAME);
                    context.beginPath();
                    context.fillStyle = 'rgba(0,180, 180, 1)';
                    context.strokeStyle = "rgba(180, 0, 0, 1)";
                    context.lineWidth = 2;
                    path.context(context)(world); //world.features[i]
                    context.closePath();
                    context.fill();
                    context.stroke();
                    //}

                    var context_2 = self.$refs.canvas_2.getContext("2d");

                    var points = [];
                    var imgData = context.getImageData(0, 0, width, height);
                    var data = imgData.data;
                    var w = imgData.width;
                    var h = imgData.height;
                    for(var i = 0; i < data.length; i += 4) {
                        var x = Math.round(i % (w * 4)) / 4;
                        var y = Math.round(i / (w * 4));

                        var lng = -180 + (x / w) * 360;
                        var lat = 90 - (y / h) * 180;

                        var r = data[i + 0];
                        var g = data[i + 1];
                        var b = data[i + 2];
                        var a = data[i + 3];

                        if(r === 180 && x % 4 === 0 && y % 4 === 0) {

                            context_2.fillStyle = 'rgba(180,0, 0, 1)';
                            context_2.fillRect(x - 0.5, y - 0.5, 1, 1);
                            points.push({
                                lng: lng,
                                lat: lat,
                                type: 0
                            })
                        }

                        if(b === 180 && x % 4 === 0 && y % 4 === 0) {

                            context_2.fillStyle = 'rgba(0,180, 180, 1)';
                            context_2.fillRect(x - 0.5, y - 0.5, 1, 1);
                            points.push({
                                lng: lng,
                                lat: lat,
                                type: 1
                            })
                        }
                    }

                    self.points = points;
                });
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
    
    canvas {
        margin: 20px;
        background: #ffffff;
        border: thin solid #aaaaaa;
    }
</style>