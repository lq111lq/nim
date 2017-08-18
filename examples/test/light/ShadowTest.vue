<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control positionZ="10" positionY="10"></perspective-camera-control>
                <scene>
                    <point-light :intensity="pointLightIntensity" :color="pointLightColor" positionY="15" positionX="-50" :castShadow="shadow"></point-light>
                    <point-light :intensity="pointLightIntensity" :color="pointLightColor" positionY="15" positionX="50"  :castShadow="shadow"></point-light>
                    <ambient-light :color="ambientLightColor" :intensity="ambientLightIntensity"></ambient-light>
                    <mesh positionY="5" :castShadow="shadow" :receiveShadow="shadow">
                        <box-geometry :width="5" :height="10" :depth="5"></box-geometry>
                        <mesh-phong-material :color="materialColor"></mesh-phong-material>
                    </mesh>

                    <mesh positionY="-0.5" :castShadow="shadow" :receiveShadow="shadow">
                        <box-geometry :width="50" :height="1" :depth="50"></box-geometry>
                        <mesh-phong-material :color="materialColor2"></mesh-phong-material>
                    </mesh>
                    <grid-helper :size="100" :divisions="100"></grid-helper>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <span>pointLightIntensity</span>
                    <el-slider class="input" v-model="pointLightIntensity" step="0.1" max="1"></el-slider>
                </div>
                <div class="block">
                    <span>ambientLightIntensity</span>
                    <el-slider class="input" v-model="ambientLightIntensity"  step="0.1" max="1"></el-slider>
                </div>
                <div class="block">
                    <span>materialColor</span>
                    <input type="color" v-model="materialColor" />
                    <span>materialColor2</span>
                    <input type="color" v-model="materialColor2" />
                    <span>pointLightColor</span>
                    <input type="color" v-model="pointLightColor" />
                    <span>ambientLightColor</span>
                    <input type="color" v-model="ambientLightColor" />
                </div>
                <div class="block">
                    <el-checkbox class="input-inline" v-model="shadow">shadow</el-checkbox>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    module.exports = {
        name: 'ShadowTest.vue',
        data: function() {
            return {
                shadow: true,
                materialColor: '#2194ce',
                materialColor2: '#dddddd',
                pointLightIntensity: 1,
                pointLightColor: '#ffffff',
                ambientLightIntensity: 0.1,
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