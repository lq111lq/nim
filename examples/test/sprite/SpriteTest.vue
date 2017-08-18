<template>
    <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <renderer class="renderer">
                <perspective-camera-control positionZ="10" positionY="10"></perspective-camera-control>
                <scene>
                    <sprite positionX="2">
                        <sprite-material>
                            <texture slot="map" :src="earthSrc"></texture>
                        </sprite-material>
                    </sprite>
                    
                    <sprite positionX="-2">
                        <sprite-material>
                            <texture slot="map" ref="canvasTexture"></texture>
                        </sprite-material>
                    </sprite>
                    <grid-helper :size="100" :divisions="100"></grid-helper>
                </scene>
            </renderer>
        </el-col>
        <el-col :span="12" style="height: 100%;padding: 10px;">
            <el-card class="box-card">
                <div class="block">
                    <el-radio class="radio" v-model="earthSrc" label="./static/sprite.png">sprite.png</el-radio>
                    <el-radio class="radio" v-model="earthSrc" label="./static/sprite1.jpg">sprite1.jpg</el-radio>
                </div>

                <canvas width='256' height='256' ref="canvas1"></canvas>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    module.exports = {
        name: 'SpriteTest',
        data: function() {
            return {
                earthSrc: './static/sprite.png'
            }
        },
        mounted: function() {
            var self = this;
            self.loops = [];

            var canvas1 = this.$refs.canvas1;
            var canvasTexture = this.$refs.canvasTexture;

            function draw(canvas,canvasTexture) {
                var context = canvas.getContext('2d'),
                    FONT_HEIGHT = 15,
                    MARGIN = 35,
                    HAND_TRUNCATION = canvas.width / 25,
                    HOUR_HAND_TRUNCATION = canvas.width / 10,
                    NUMERAL_SPACING = 20,
                    RADIUS = canvas.width / 2 - MARGIN,
                    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

                // Functions.....................................................

                function drawCircle() {
                    context.beginPath();
                    context.arc(canvas.width / 2, canvas.height / 2,
                        RADIUS, 0, Math.PI * 2, true);
                    context.stroke();
                }

                function drawNumerals() {
                    var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        angle = 0,
                        numeralWidth = 0;

                    numerals.forEach(function(numeral) {
                        angle = Math.PI / 6 * (numeral - 3);
                        numeralWidth = context.measureText(numeral).width;
                        context.fillText(numeral,
                            canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
                            canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3);
                    });
                }

                function drawCenter() {
                    context.beginPath();
                    context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
                    context.fill();
                }

                function drawHand(loc, isHour) {
                    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
                        handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION :
                        RADIUS - HAND_TRUNCATION;

                    context.moveTo(canvas.width / 2, canvas.height / 2);
                    context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius,
                        canvas.height / 2 + Math.sin(angle) * handRadius);
                    context.stroke();
                }

                function drawHands() {
                    var date = new Date,
                        hour = date.getHours();
                    hour = hour > 12 ? hour - 12 : hour;
                    drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true, 0.5);
                    drawHand(date.getMinutes(), false, 0.5);
                    drawHand(date.getSeconds(), false, 0.2);
                }

                function drawClock() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.fillStyle="#ffffff";
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.fillStyle=" #000000";
                    
                    drawCircle();
                    drawCenter();
                    drawHands();
                    drawNumerals();
                    
                    canvasTexture.setCanvas(canvas);
                }

                // Initialization................................................

                context.font = FONT_HEIGHT + 'px Arial';
                var loop = window.setInterval(drawClock, 1000);
                self.loops.push(loop);
            }
            draw(canvas1,canvasTexture);
        },
        beforeDestroy: function() {

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
    
    canvas {
        margin: 20px;
        background: #ffffff;
        border: thin solid #aaaaaa;
    }
</style>