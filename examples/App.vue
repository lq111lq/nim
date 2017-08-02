<template>
    <div id="app" style="height: 100%;">
        <el-row style="height: 100%;">
            <el-col :span="4" style="height: 100%;overflow-y: auto;overflow-x:hidden;">
                <el-menu default-active="2" theme="dark" @select="handelSelect" style="height: 100%;">
                    <el-submenu index="1">
                        <template slot="title">基础</template>
                        <el-menu-item-group title="分组一">
                            <el-menu-item index="helloWorld">helloWorld</el-menu-item>
                            <el-menu-item index="cube">cube</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    module.exports = {
        name: 'app',
        data: function() {
            return {}
        },
        watch: {

        },
        mounted: function() {

        },
        methods: {
            handelSelect: function(path) {
                this.$router.push({
                    path: path
                })
            }
        },
        components: {}
    }
</script>

<style scoped="">

</style>