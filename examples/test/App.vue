<template>
    <div id="app">
        <renderer class="renderer" :cameraPositionZ="10" :cameraPositionY="10">
            <cube :scaleY="2"></cube>
            <grid-helper :size="10" :divisions="10" @click.native ="alert"></grid-helper>
        </renderer>
    </div>
</template>

<script>
    module.exports = {
        name: 'app',
        data: function() {
            return {

            }
        },
        methods: {
            alert:function() {
                console.log('click');
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