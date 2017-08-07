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

                    <sprite positionY="0" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_0"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="2" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_10"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="4" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_20"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="6" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_30"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="8" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_40"></texture>
                        </sprite-material>
                    </sprite>

                    <sprite positionY="10" positionX="-1">
                        <sprite-material>
                            <texture slot="map" ref="scale_50"></texture>
                        </sprite-material>
                    </sprite>

                    <mesh v-for="c,i in array" :positionX="(i%10)*1 + 0.5" :positionZ="~~(i/10)*1 + 0.5 - 5" :positionY="0.5*c.value" v-if="Number(c.value)>0">
                        <box-geometry width="1" :height="c.value" depth="1"></box-geometry>
                        <mesh-basic-material color="#00ffff"></mesh-basic-material>
                    </mesh>
                </scene>
            </renderer>
            <div class="card">
                <div style="width: 300px;height: 300px;">
                    <div class="cell" v-for="c in array">
                        <input type="number" v-model="c.value"/>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    module.exports = {
        name: 'Cubo',
        data: function() {
            var array = [];

            for(var i = 0; i < 100; i++) {
                array.push({
                    value: ~~(Math.random()*10)
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

            function draw(name) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                var size = 512;
                var r = size / 2;
                canvas.width = size;
                canvas.height = size;

                context.clearRect(0, 0, canvas.width, canvas.height);

                context.lineWidth = 1;
                context.font = "500 256px SimHei";
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