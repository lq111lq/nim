<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control></perspective-camera-control>
                <scene>
                    <point-light :intensity="pointLightIntensity" :color="pointLightColor" positionY="15"></point-light>
                    <ambient-light :color="ambientLightColor" :intensity="ambientLightIntensity"></ambient-light>
                    <mesh positionX="5">
                        <box-geometry :width="5" :height="5" :depth="5"></box-geometry>
                        <mesh-phong-material :color="materialColor"></mesh-phong-material>
                    </mesh>

                    <mesh positionX="-5">
                        <box-geometry :width="5" :height="5" :depth="5"></box-geometry>
                        <mesh-phong-material :color="materialColor"></mesh-phong-material>
                    </mesh>
                    <grid-helper :size="100" :divisions="100"></grid-helper>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <span>pointLightIntensity</span>
                    <el-slider class="input" v-model="pointLightIntensity"></el-slider>
                </div>
                <div class="block">
                    <span>ambientLightIntensity</span>
                    <el-slider class="input" v-model="ambientLightIntensity"></el-slider>
                </div>
                <div class="block">
                    <span>materialColor</span>
                    <input type="color" v-model="materialColor" />
                    <span>pointLightColor</span>
                    <input type="color" v-model="pointLightColor" />
                    <span>ambientLightColor</span>
                    <input type="color" v-model="ambientLightColor" />
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    module.exports = {
        name: 'LightTest',
        data: function() {
            return {

                materialColor: '#2194ce',
                pointLightIntensity: 1,
                pointLightColor: '#ffffff',
                ambientLightIntensity: 1,
                ambientLightColor: '#ffffff',

            }
        },
        mounted: function() {

        },
        beforeDestroy: function() {

        },
        methods: {
            alert: function(str) {
                console.log(str);
            }
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