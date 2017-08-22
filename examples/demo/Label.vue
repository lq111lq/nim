<template>
    <group>
        <n-line scaleX="2" scaleY="2" scaleZ="2">
            <geometry :vertices="vertices"></geometry>
            <line-basic-material color="#fd8c42"></line-basic-material>
        </n-line>

        <n-line>
            <geometry vertices="0 0 0 0 0 -5"></geometry>
            <line-basic-material color="#fd8c42"></line-basic-material>
        </n-line>

        <sprite positionZ="-7" scaleX="12" scaleY="12" scaleZ="12">
            <sprite-material>
                <texture slot="map" ref="canvasTexture"></texture>
            </sprite-material>
        </sprite>
    </group>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    var TWEEN = require('@tweenjs/tween.js');

    module.exports = {
        name: 'Label',
        extends: require('src/component/objects/Group.vue'),
        data: function() {
            var vertices = '';

            for(var i = 0; i < 7; i++) {
                var x = Math.sin(Math.PI * (60 * i / 180));
                var y = Math.cos(Math.PI * (60 * i / 180));

                if(i) {
                    vertices = vertices + ' ' + x + ' ' + y + ' 0';
                } else {
                    vertices = vertices + x + ' ' + y + ' 0';
                }
            }

            return {
                vertices: vertices,
                t: 0
            }
        },
        props: {
            name: {
                type: String,
                default: ''
            },
            population: {
                type: Number,
                default: ''
            }
        },
        watch: {
            name: 'draw',
            population: 'draw',
            t:'draw'
        },
        mounted: function() {
            var self = this;
            var canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            var context = canvas.getContext('2d');

            this._canvas = canvas;
            this._context = context;
            this.draw();
            
            var f = {v: 0};
            new TWEEN.Tween(f)
                .to({v: 1}, 20000)
                .onUpdate(function() {
                    self.t = f.v;
                })
                .delay(500)
                .start();
        },
        methods: {
            draw: function() {
                var canvasTexture = this.$refs.canvasTexture;

                var context = this._context;
                
                context.clearRect(0,0,512,512);
                context.lineWidth = 1;
                context.font = "900 60px SimHei";
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = "#fd8c42";
                context.fillText(this.name + " " + ~~(this.population*this.t) + ' 万人', 256, 256);
                context.strokeText(this.name + " " + ~~(this.population*this.t) + ' 万人', 256, 256);

                canvasTexture.setCanvas(this._canvas);
            }
        }

    }
</script>

<style>

</style>