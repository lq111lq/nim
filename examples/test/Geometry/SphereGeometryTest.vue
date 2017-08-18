<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control positionZ="10" positionY="10"></perspective-camera-control>
                <scene>
                    <mesh>
                        <sphere-geometry :radius="radius" :widthSegments="widthSegments" :heightSegments="heightSegments" :phiStart="phiStart" :phiLength="phiLength" :thetaStart="thetaStart" :thetaLength="thetaLength"></sphere-geometry>
                        <mesh-basic-material :wireframe="wireframe"></mesh-basic-material>
                    </mesh>
                    <grid-helper :size="100" :divisions="100"></grid-helper>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <span>radius</span>
                    <el-slider class="input" v-model="radius"></el-slider>
                </div>

                <div class="block">
                    <el-checkbox class="input-inline" v-model="wireframe">wireframe</el-checkbox>
                </div>
                
                <div class="block" v-if="wireframe">
                    <span>widthSegments</span>
                    <el-slider class="input" v-model="widthSegments"></el-slider>
                </div>
                <div class="block" v-if="wireframe">
                    <span>heightSegments</span>
                    <el-slider class="input" v-model="heightSegments"></el-slider>
                </div>
                <div class="block" v-if="wireframe">
                    <span>phiStart</span>
                    <el-slider class="input" v-model="phiStart" :min="0" :max="Math.PI * 2" :step="Math.PI/180"></el-slider>
                </div>
                <div class="block" v-if="wireframe">
                    <span>phiLength</span>
                    <el-slider class="input" v-model="phiLength" :min="0" :max="Math.PI * 2" :step="Math.PI/180"></el-slider>
                </div>
                <div class="block" v-if="wireframe">
                    <span>thetaStart</span>
                    <el-slider class="input" v-model="thetaStart" :min="0" :max="Math.PI * 2" :step="Math.PI/180"></el-slider>
                </div>
                <div class="block" v-if="wireframe">
                    <span>thetaLength</span>
                    <el-slider class="input" v-model="thetaLength" :min="0" :max="Math.PI" :step="Math.PI/180"></el-slider>
                </div>

            </el-card>
        </el-col>

    </el-row>
</template>

<script>
    module.exports = {
        name: 'SphereGeometryTest',
        data: function() {
            return {
                radius: 1,
                
                widthSegments: 8,
                heightSegments: 6,
                phiStart: 0,
                phiLength: Math.PI * 2,
                thetaStart: 0,
                thetaLength: Math.PI,

                wireframe: false
            }
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
</style>