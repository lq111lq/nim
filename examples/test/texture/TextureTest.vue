<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control></perspective-camera-control>
                <scene>
                    <mesh>
                        <box-geometry :width="5" :height="5" :depth="5"></box-geometry>
                        <mesh-basic-material>
                            <texture slot="map" :src="earthSrc"></texture>
                        </mesh-basic-material>
                    </mesh>
                    <grid-helper :size="100" :divisions="100"></grid-helper>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <el-radio class="radio" v-model="earthSrc" label="./static/earth.png">earth</el-radio>
                    <el-radio class="radio" v-model="earthSrc" label="./static/earth2.png">earth2</el-radio>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    module.exports = {
        name: 'TextureTest',
        data: function() {
            return {
                earthSrc: './static/earth.png'
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