<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control></perspective-camera-control>
                <scene>
                    <n-line>
                        <geometry :vertices="vertices"></geometry>
                        <line-basic-material></line-basic-material>
                    </n-line>
                    <grid-helper :size="100" :divisions="100"></grid-helper>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <el-input v-model="vertices" placeholder="请输入内容"></el-input>
            </el-card>
        </el-col>

    </el-row>
</template>

<script>
    module.exports = {
        name: 'LineTest',
        data: function() {
            return {
                vertices:'0 0 0 0 10 0 0 10 10'
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