<template>
    <div id="app">
        <renderer class="renderer" :cameraPositionZ="10" :cameraPositionY="10">
            <perspective-camera :positionZ="positionZ" :positionY="positionY" lookAtX="0" lookAtY="0" lookAtZ="0" ref="camera"></perspective-camera>
            <scene>
                <cube :scaleY="2"  @click.native="alert('click')" @mouseenter.native="alert('mouseenter')"></cube>
                <grid-helper :size="10" :divisions="10"></grid-helper>
            </scene>

        </renderer>
        positionY:<input type="range" min="0" max="100" v-model="positionY" /> positionZ:
        <input type="range" min="1" max="100" v-model="positionZ" />
    </div>
</template>

<script>
    module.exports = {
        name: 'app',
        data: function() {
            return {
                positionY: 5,
                positionZ: 5
            }
        },
        watch: {
            positionY: function() {
                var self = this;
                this.$nextTick(function() {
                    self.$refs.camera.lookAt(0, 0, 0);
                })
            },
            positionZ: function() {
                var self = this;
                this.$nextTick(function() {
                    self.$refs.camera.lookAt(0, 0, 0);
                })
            }
        },
        mounted:function() {
            this.$refs.camera.lookAt(0, 0, 0);
        },
        methods: {
            alert: function(str) {
                console.log(str);
            }
        }
    }
</script>

<style>
    .renderer {
        width: 400px;
        height: 800px;
    }
</style>