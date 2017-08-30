<template>
    <group>
        <mesh v-for="p in points" :positionX="getPosition(p)[0]" :positionZ="getPosition(p)[1]" :scaleY="p.pop/500000" :positionY="0.5 * p.pop/500000">
            <box-geometry :width="1" :height="1" :depth="1" :widthSegments="1" :heightSegments="1" :depthSegments="1"></box-geometry>
            <mesh-basic-material :color="color(p.pop)"></mesh-basic-material>
        </mesh>
        
        <mesh v-for="p in points" :positionX="getPosition(p)[0]+960" :positionZ="getPosition(p)[1]" :scaleY="p.pop/500000" :positionY="0.5 * p.pop/500000">
            <box-geometry :width="1" :height="1" :depth="1" :widthSegments="1" :heightSegments="1" :depthSegments="1"></box-geometry>
            <mesh-basic-material :color="color(p.pop)"></mesh-basic-material>
        </mesh>
        
        <mesh v-for="p in points" :positionX="getPosition(p)[0]-960" :positionZ="getPosition(p)[1]" :scaleY="p.pop/500000" :positionY="0.5 * p.pop/500000">
            <box-geometry :width="1" :height="1" :depth="1" :widthSegments="1" :heightSegments="1" :depthSegments="1"></box-geometry>
            <mesh-basic-material :color="color(p.pop)"></mesh-basic-material>
        </mesh>
    </group>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    var TWEEN = require('@tweenjs/tween.js');

    var d3 = require('d3');
    var d3gp = require('d3-geo-projection');

    var width = 960,
        height = 480;

    var projection = d3.geoEquirectangular()
        .scale(153)
        .rotate([0, 0])
        .translate([width / 2, height / 2])
        .precision(.1);

    var colorScale = d3.scaleLinear()
        .domain([0, 10000000, 15000000])
        .range(['#00ffff', "#ffff00", "#ff0000"])

    module.exports = {
        name: 'LocalLabel',
        extends: require('src/component/objects/Group.vue'),
        data: function() {
            return {}
        },
        props: {
            points: {
                type: Array,
                default: function() {
                    return [];
                }
            },
        },
        watch: {

        },
        mounted: function() {

        },
        methods: {
            getPosition: function(p) {
                var pro = projection([Number(p.lon), Number(p.lat)]);
                pro[0] -= 480;
                pro[1] -= 240;
                return pro;
            },
            color: function(pops) {
                var rgb = colorScale(pops).toString();
                return rgb;
            }
        }

    }
</script>

<style>

</style>