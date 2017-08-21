<template>
    <div id="app" style="height: 100%;">
        <el-row style="height: 100%;">
            <el-col :span="4" style="height: 100%;overflow-y: auto;overflow-x:hidden;">
                <el-menu default-active="2" theme="dark" @select="handelSelect" style="height: 100%;">
                    <el-submenu index="1">
                        <template slot="title">basics</template>
                        <el-menu-item-group title="Geometry">
                            <!--<el-menu-item index="helloWorld">helloWorld</el-menu-item>-->
                            <el-menu-item index="BoxGeometryTest">BoxGeometryTest</el-menu-item>
                            <el-menu-item index="SphereGeometryTest">SphereGeometryTest</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Line">
                            <el-menu-item index="LineTest">LineTest</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="texture">
                            <el-menu-item index="TextureTest">TextureTest</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="sprite">
                            <el-menu-item index="SpriteTest">SpriteTest</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="light">
                            <el-menu-item index="LightTest">LightTest</el-menu-item>
                            <el-menu-item index="ShadowTest">ShadowTest</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="light">
                            <template slot="title">PointsTest</template>
                            <el-menu-item index="PointsTest">PointsTest</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">tool</template>
                        <el-menu-item index="pointsTool">pointsTool</el-menu-item>
                    </el-submenu>
                    
                    <el-submenu index="3">
                        <template slot="title">demo</template>
                        <el-menu-item index="Cubo">Cubo</el-menu-item>
                        <el-menu-item index="Global">Global</el-menu-item>
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