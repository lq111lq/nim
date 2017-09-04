<template>
    <el-row style="height: 100%;">
        <el-col :span="24" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control positionZ="0" positionY="50"></perspective-camera-control>
                <scene>
                    <mesh :rotationX="-Math.PI*0.5" positionY="-1">
                        <plane-geometry :width="3000" height="3000">></plane-geometry>
                        <mesh-phong-material color="#343434">
                        </mesh-phong-material>
                    </mesh>
                    
                    <point-light :intensity="0.5" color="#ffff88" positionY="150" positionX="-150"></point-light>
                    <point-light :intensity="0.9" color="#dddddd" positionY="150" positionX="0"></point-light>
                    
                    <building v-if="features.length" :features="features"></building>
                    <!--<grid-helper :size="100" :divisions="100"></grid-helper>-->
                </scene>
            </renderer>
        </el-col>
        <!--<el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
            </el-card>
        </el-col>-->

    </el-row>
</template>

<script>
    var THREE = require('three');
    var shapefile = require("./shapefile");
    var d3 = require('d3');
    var d3gp = require('d3-geo-projection');

    module.exports = {
        name: 'CapeTown',
        data: function() {
            return {
                features:[]
            }
        },
        methods: {
        },
        mounted: function() {
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

//          d3.json("./static/world_2.json", function(error, world) {
//              var canvas = document.createElement('canvas');
//              canvas.width = 3840;
//              canvas.height = 1920;
//
//              var canvasTexture = self.$refs.canvasTexture;
//              var context = canvas.getContext("2d");
//
//              context.fillStyle = 'rgba(0, 0, 0, 0)';
//              context.fillRect(0, 0, width, height);
//
//              context.beginPath();
//              context.fillStyle = 'rgba(0,225, 255, 0.075)';
//              context.strokeStyle = "rgba(0, 0, 0, 1)";
//              context.lineWidth = 0.25;
//              path.context(context)(world); //world.features[i]
//              context.closePath();
//              context.fill();
//              context.stroke();
//
//              canvasTexture.setCanvas(canvas);
//              canvasTexture.texture;
//              canvasTexture.texture.anisotropy = 16;
//              canvasTexture.texture.wrapS = THREE.RepeatWrapping
//              canvasTexture.texture.wrapT = THREE.RepeatWrapping;
//              canvasTexture.texture.repeat.set(1, 1);
//              canvasTexture.texture.needsUpdate = true;
//              self.darwed = true;
//          });
//
            var geoJSON = {
                features: []
            };

            shapefile.open('./static/buildings.shp', './static/buildings.dbf')
                .then(function(source) {
                    source.read().then(function append(result) {
                        if(result.done) {
                            console.log('resolve');
                            self.features  = geoJSON.features
                            return;
                        }

                        var feature = result.value;
                        feature.properties.name = geoJSON.features.length + '';
                        feature.properties.height = feature.properties.SHAPE_leng * 200 + 0.15;
                        geoJSON.features.push(feature);
                        return source.read().then(append);
                    })
                });
        },
        components: {
            'building': require('./building.vue')
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
</style>