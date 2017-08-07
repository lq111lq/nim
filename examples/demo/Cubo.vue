<template>
    <el-row style="height: 100%;">
        <el-col :span="24" style="height: 100%;padding: 10px;">
            <renderer class="renderer" clearColor="#FFFFFF">
                <perspective-camera-control></perspective-camera-control>
                <scene>
                    <n-line>
                        <geometry vertices="0 0 0 0 10 0"></geometry>
                        <line-basic-material color="#888888"></line-basic-material>
                    </n-line>
                    
                    <n-line>
                        <geometry vertices="0 0 -10 0 0 10"></geometry>
                        <line-basic-material color="#888888"></line-basic-material>
                    </n-line>
                    
                    <n-line>
                        <geometry vertices="0 0 0 10 0 0"></geometry>
                        <line-basic-material color="#888888"></line-basic-material>
                    </n-line>
                    
                    <mesh>
                        <box-geometry 
                            width="1" 
                            height="1" 
                            depth="1"
                        ></box-geometry>
                        <mesh-basic-material color="#00ffff"></mesh-basic-material>
                    </mesh>
                </scene>
            </renderer>
        </el-col>
    </el-row>
</template>

<script>
    module.exports = {
        name: 'Cubo',
        data: function() {
            return {
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