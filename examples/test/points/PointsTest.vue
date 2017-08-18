<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control positionZ="300"></perspective-camera-control>
                <scene>
                    <points>
                        <buffer-geometry ref="geometry"></buffer-geometry>
                        <points-material :color="color" :vertexColors="vertexColors" :sizeAttenuation="sizeAttenuation" :size="size"></points-material>
                    </points>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <span>p</span>
                    <el-slider class="input" v-model="p" :min="0" :max="1" :step="0.05"></el-slider>
                </div>
                <div class="block">
                    <span>size</span>
                    <el-slider class="input" v-model="size" :min="1" :max="10" :step="0.5"></el-slider>
                </div>
                <div class="block">
                    <span>color</span>
                    <input type="color" v-model="color" />
                </div>
                <div class="block">
                    <span>vertexColors:</span>
                    <el-radio v-model="vertexColors" label="VertexColors">VertexColors</el-radio>
                    <el-radio v-model="vertexColors" label="NoColors">NoColors</el-radio>
                </div>
                <div class="block">
                    <el-checkbox class="input-inline" v-model="sizeAttenuation">sizeAttenuation</el-checkbox>
                </div>
            </el-card>
        </el-col>

    </el-row>
</template>

<script>
    var points = require('./points.json');

    var particles = (function() {
        var particleCount = points.length;
        var particlePositions = new Float32Array(particleCount * 3);
        var colors = new Float32Array(particleCount * 3);
        var r = 100;

        for(var i = 0; i < points.length; i++) {

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
            position: particlePositions,
            colors: colors
        };

        return particles;
    })();

    var particles2 = (function() {
        var particleCount = points.length;
        var particlePositions = new Float32Array(particleCount * 3);
        var colors = new Float32Array(particleCount * 3);

        for(var i = 0; i < points.length; i++) {

            var lat = points[i].lat;
            var lng = points[i].lng;

            var y = lat;
            var x = lng;
            var z = 0;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            colors[i * 3 + 0] = 0.3;
            colors[i * 3 + 1] = 0.2;
            colors[i * 3 + 2] = 0;

            if(points[i].type === 0) {
                colors[i * 3 + 0] = 1.0;
                colors[i * 3 + 1] = 0.9;
                colors[i * 3 + 2] = 0.8;
            }
        }

        var particles = {
            position: particlePositions,
            colors: colors
        };

        return particles;
    })();

    module.exports = {
        name: 'PointsTest',
        data: function() {
            return {
                vertexColors: 'VertexColors',
                color: '#2194ce',
                sizeAttenuation:false,
                size:1,
                p: 1
            }
        },
        computed: {

        },
        watch: {
            p: 'updateAttribute'
        },
        mounted: function() {
            var particleCount = points.length;

            this.$refs.geometry.addAttribute('position', new Float32Array(particleCount * 3), 3, true);
            this.$refs.geometry.addAttribute('color', new Float32Array(particleCount * 3), 3, true);
            this.updateAttribute();
        },
        methods: {
            updateAttribute: function(str) {
                //              debugger;
                var particleCount = points.length;
                var p = this.p;

                var positions = this.$refs.geometry.geometry.attributes.position.array;
                for(var v = 0; v < particleCount; v++) {
                    positions[v * 3 + 0] = particles.position[v * 3 + 0] * p + particles2.position[v * 3 + 0] * (1 - p);
                    positions[v * 3 + 1] = particles.position[v * 3 + 1] * p + particles2.position[v * 3 + 1] * (1 - p)
                    positions[v * 3 + 2] = particles.position[v * 3 + 2] * p + particles2.position[v * 3 + 2] * (1 - p)
                }
                this.$refs.geometry.geometry.attributes.position.needsUpdate = true;

                var colors = this.$refs.geometry.geometry.attributes.color.array;
                for(var v = 0; v < particleCount; v++) {
                    colors[v * 3 + 0] = particles.colors[v * 3 + 0] * p + particles2.colors[v * 3 + 0] * (1 - p);
                    colors[v * 3 + 1] = particles.colors[v * 3 + 1] * p + particles2.colors[v * 3 + 1] * (1 - p)
                    colors[v * 3 + 2] = particles.colors[v * 3 + 2] * p + particles2.colors[v * 3 + 2] * (1 - p)
                }
                this.$refs.geometry.geometry.attributes.color.needsUpdate = true;
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