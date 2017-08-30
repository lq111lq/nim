<template>
    <el-row style="height: 100%;">
        <el-col :span="24" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control positionZ="10" positionY="10"></perspective-camera-control>
                <scene>
                    <!--<points>
                        <buffer-geometry ref="geometry"></buffer-geometry>
                        <points-material color="#00ffff" :sizeAttenuation="false" :size="1"></points-material>
                    </points>-->
                    <way v-for="w in ways" :nodes="w.nodes" :type="w.type"></way>
                    <!--<grid-helper :size="100" :divisions="100"></grid-helper>-->
                </scene>
            </renderer>
        </el-col>
    </el-row>
</template>

<script>
    var osm = require('./map.osm').osm;

    var particlePositions = new Float32Array(osm.node.length * 3 * 2);
    var nodes = {};

    osm.node.forEach(function(node, i) {

        var lat = Number(node.$.lat) - 39.9165;
        var lng = Number(node.$.lon) - 116.391;

        var z = -lat * 10000;
        var x = lng * 10000;
        var y = 5;

        particlePositions[i * 6] = x;
        particlePositions[i * 6 + 1] = y;
        particlePositions[i * 6 + 2] = z;

        particlePositions[i * 6 + 3] = x;
        particlePositions[i * 6 + 4] = y + 0;
        particlePositions[i * 6 + 5] = z;

        nodes[node.$.id] = {
            x: x,
            z: z
        }
    });

    var ways = osm.way.map(function(way, i) {
        var nds = [];
        var type = '';
        way.nd.forEach(function(node, i) {
            nds.push(nodes[node.$.ref]);
        });

        way.tag && way.tag.forEach(function(tag, i) {
            if(tag.$.k === "building" && tag.$.v === "yes") {
                type = "building";
            }

            if(tag.$.k === "water" && tag.$.v === "moat") {
                type = "water";
            }

            if(tag.$.k === "waterway" && tag.$.v === "canal") {
                type = "waterway";
            }
        });

        return {
            nodes: nds,
            type: type
        }
    }).filter(function(way) {
        return way.nodes.length > 3 && way.type;
    })

    module.exports = {
        name: 'gugong',
        data: function() {
            return {
                ways: ways
            }
        },
        methods: {},
        mounted: function() {
            //this.$refs.geometry.addAttribute('position', particlePositions, 3, true);
        },
        components: {
            'way': require('./way.vue')
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