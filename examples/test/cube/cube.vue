<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control></perspective-camera-control>
                <scene>
                    <mesh>
                        <box-geometry 
                            :width="width" 
                            :height="height" 
                            :depth="depth"
                            :widthSegments="widthSegments"
                            :heightSegments="heightSegments"
                            :depthSegments="depthSegments"
                        ></box-geometry>
                        <mesh-basic-material :wireframe="wireframe"></mesh-basic-material>
                    </mesh>
                    <grid-helper :size="100" :divisions="100"></grid-helper>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <span>width</span>
                    <el-slider class="input" v-model="width"></el-slider>
                </div>
                <div class="block">
                    <span>height</span>
                    <el-slider class="input" v-model="height"></el-slider>
                </div>
                <div class="block">
                    <span>depth</span>
                    <el-slider class="input" v-model="depth"></el-slider>
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
                    <span>depthSegments</span>
                    <el-slider class="input" v-model="depthSegments"></el-slider>
                </div>
            </el-card>
        </el-col>

    </el-row>
</template>

<script>
    module.exports = {
        name: 'app',
        data: function() {
            return {
                width: 1,
                height: 1,
                depth: 1,

                widthSegments: 1,
                heightSegments: 1,
                depthSegments: 1,

                wireframe: false,
                color: '#00ff40'
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