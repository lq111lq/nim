<template>
    <group>
        <!--<mesh v-for="p in points" :positionX="getPosition(p)[0]" :positionZ="getPosition(p)[1]" :scaleY="p.pop/500000" :positionY="0.5 * p.pop/500000">
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
        </mesh>-->
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
        .domain([0, 5000000, 10000000, 15000000])
        .range(['#4488ff', "#00ffff", "#ffff00", "#ff0000"]);

    var templateGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
    var position_t = templateGeometry.attributes.position.array; //72
    var normal_t = templateGeometry.attributes.normal.array; //72
    var uv_t = templateGeometry.attributes.uv.array; //48
    var indices_t = templateGeometry.index.array; //36 24

    for(var i = 0; i < position_t.length; i++) {
        if(i % 3 === 1) {
            position_t[i] += 0.5;
        }
    }

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
            delay: {
                type: Number,
                default: 0
            },

        },
        watch: {
            mouseover: function(value) {
//              debugger;
                if(value) {
                    if(this.cube_material) {
                        this.cube_material.color = new THREE.Color('#ffffff');
                        this.cube_material.needsUpdate = true;
                    }
                } else {
                    if(this.cube_material) {
                        this.cube_material.color = new THREE.Color('#aaaaaa');
                        this.cube_material.needsUpdate = true;
                    }
                }
            }
        },
        mounted: function() {
            var self = this;
            //console.log(this.delay);
            window.setTimeout(function() {
                self.creatMesh();
            }, this.delay);
        },
        methods: {
            getPosition: function(p) {
                var pro = projection([Number(p.lon), Number(p.lat)]);
                pro[0] -= 480;
                pro[1] -= 240;
                return pro;
            },
            getColor: function(pops) {
                var rgb = colorScale(pops);
                return rgb;
            },
            creatMesh: function() {
                var geometry = new THREE.BufferGeometry();
                var indices = [];
                var position = new Float32Array(this.points.length * 72 * 3);
                var normal = new Float32Array(this.points.length * 72 * 3);
                var uv = new Float32Array(this.points.length * 48 * 3);
                var color = new Float32Array(this.points.length * 72 * 3);

                for(var i = 0; i < this.points.length; i++) {
                    var point = this.points[i];
                    var p = this.getPosition(point);

                    for(var j = 0; j < indices_t.length; j++) {
                        indices.push(indices_t[j] + i * 24);
                    }

                    for(var j = 0; j < indices_t.length; j++) {
                        indices.push(indices_t[j] + (i + this.points.length) * 24);
                    }

                    for(var j = 0; j < indices_t.length; j++) {
                        indices.push(indices_t[j] + (i + this.points.length * 2) * 24);
                    }

                    for(var j = 0; j < position_t.length; j++) {
                        switch(j % 3) {
                            case 0:
                                position[i * 72 + j] = position_t[j] + p[0]
                                break;
                            case 1:
                                position[i * 72 + j] = position_t[j] * point.pop / 500000
                                break;
                            case 2:
                                position[i * 72 + j] = position_t[j] + p[1]
                                break;
                        }
                    }

                    for(var j = 0; j < position_t.length; j++) {
                        switch(j % 3) {
                            case 0:
                                position[(i + this.points.length) * 72 + j] = position_t[j] + p[0] - 960
                                break;
                            case 1:
                                position[(i + this.points.length) * 72 + j] = position_t[j] * point.pop / 500000
                                break;
                            case 2:
                                position[(i + this.points.length) * 72 + j] = position_t[j] + p[1]
                                break;
                        }
                    }

                    for(var j = 0; j < position_t.length; j++) {
                        switch(j % 3) {
                            case 0:
                                position[(i + this.points.length * 2) * 72 + j] = position_t[j] + p[0] + 960
                                break;
                            case 1:
                                position[(i + this.points.length * 2) * 72 + j] = position_t[j] * point.pop / 500000
                                break;
                            case 2:
                                position[(i + this.points.length * 2) * 72 + j] = position_t[j] + p[1]
                                break;
                        }
                    }

                    //                  for(var j = 0; j < normal_t.length; j++) {
                    //                      normal[i * 72 + j] = normal_t[j];
                    //                  }
                    //                  for(var j = 0; j < normal_t.length; j++) {
                    //                      normal[(i + this.points.length) * 72 + j] = normal_t[j];
                    //                  }
                    //                  for(var j = 0; j < normal_t.length; j++) {
                    //                      normal[(i + this.points.length * 2) * 72 + j] = normal_t[j];
                    //                  }
                    //
                    //                  for(var j = 0; j < uv_t.length; j++) {
                    //                      uv[i * 48 + j] = uv_t[j];
                    //                  }
                    //                  for(var j = 0; j < uv_t.length; j++) {
                    //                      uv[(i + this.points.length) * 48 + j] = uv_t[j];
                    //                  }
                    //                  for(var j = 0; j < uv_t.length; j++) {
                    //                      uv[(i + this.points.length * 2) * 48 + j] = uv_t[j];
                    //                  }

                    var c = d3.rgb(this.getColor(point.pop));

                    for(var j = 0; j < 72; j++) {

                        switch(j % 3) {
                            case 0:
                                color[i * 72 + j] = c.r / 255;
                                break;
                            case 1:
                                color[i * 72 + j] = c.g / 255;
                                break;
                            case 2:
                                color[i * 72 + j] = c.b / 255;
                                break;
                        }
                    }

                    for(var j = 0; j < 72; j++) {

                        switch(j % 3) {
                            case 0:
                                color[(i + this.points.length) * 72 + j] = c.r / 255;
                                break;
                            case 1:
                                color[(i + this.points.length) * 72 + j] = c.g / 255;
                                break;
                            case 2:
                                color[(i + this.points.length) * 72 + j] = c.b / 255;
                                break;
                        }
                    }

                    for(var j = 0; j < 72; j++) {

                        switch(j % 3) {
                            case 0:
                                color[(i + this.points.length * 2) * 72 + j] = c.r / 255;
                                break;
                            case 1:
                                color[(i + this.points.length * 2) * 72 + j] = c.g / 255;
                                break;
                            case 2:
                                color[(i + this.points.length * 2) * 72 + j] = c.b / 255;
                                break;
                        }
                    }

                }

                for(var i = 0; i < this.points.length; i++) {
                    var point = this.points[i];
                    var p = this.getPosition(point);

                    for(var j = 0; j < indices_t.length; j++) {
                        indices.push(indices_t[j] + i * 24);
                    }

                    for(var j = 0; j < position_t.length; j++) {
                        switch(j % 3) {
                            case 0:
                                position[i * 72 + j] = position_t[j] + p[0]
                                break;
                            case 1:
                                position[i * 72 + j] = position_t[j] * point.pop / 500000
                                break;
                            case 2:
                                position[i * 72 + j] = position_t[j] + p[1]
                                break;
                        }
                    }

                    for(var j = 0; j < normal_t.length; j++) {
                        normal[i * 72 + j] = normal_t[j];
                    }

                    for(var j = 0; j < uv_t.length; j++) {
                        uv[i * 48 + j] = uv_t[j];
                    }
                    var c = d3.rgb(this.getColor(point.pop));

                    for(var j = 0; j < 72; j++) {

                        switch(j % 3) {
                            case 0:
                                color[i * 72 + j] = c.r / 255;
                                break;
                            case 1:
                                color[i * 72 + j] = c.g / 255;
                                break;
                            case 2:
                                color[i * 72 + j] = c.b / 255;
                                break;
                        }
                    }

                }

                //                debugger;
                geometry.setIndex(indices);
                geometry.addAttribute('position', position, 3, true);
                geometry.addAttribute('color', color, 3, true);
                geometry.addAttribute('normal', normal, 3, true);
                geometry.addAttribute('uv', uv, 2, true);

                var material = new THREE.MeshBasicMaterial({
                    color: 0xAAAAAA,
                    vertexColors: THREE.VertexColors
                });
                var mesh = new THREE.Mesh(geometry, material);
                mesh.scale.y = 1;

                mesh.element = this.$el;
                mesh.vm = this;

                this.object3D.add(mesh);
                this.cube_geometry = geometry;
                this.cube_material = material;

//              var from = {
//                  v: 0
//              }
//
//              new TWEEN.Tween(from)
//                  .to({
//                      v: 1
//                  }, 1000)
//                  .onUpdate(function() {
//                      mesh.scale.y = from.v
//                  })
//                  .delay(0)
//                  .start();
            }
        },
        beforeDestroy: function() {
            this.cube_geometry && this.cube_geometry.dispose();
            this.cube_material && this.cube_material.dispose();
        }

    }
</script>

<style>

</style>