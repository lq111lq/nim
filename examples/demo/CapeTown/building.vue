<template>
    <group>

    </group>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    var TWEEN = require('@tweenjs/tween.js');

    var d3 = require('d3');
    var d3gp = require('d3-geo-projection');

    module.exports = {
        name: 'building',
        extends: require('src/component/objects/Group.vue'),
        data: function() {
            return {}
        },
        props: {
            features: {
                type: Array,
                default: function() {
                    return []
                }
            },
        },
        watch: {

        },
        mounted: function() {
            var features = this.features;
            var geometry;

            var width = 960*1000,
                height = 480*1000;

            var projection = d3.geoEquirectangular()
                .scale(153*1000)
                .rotate([0, 0])
                .translate([width / 2, height / 2])
                .precision(.1);

            for(var i = 0; i < features.length; i++) {
                var coordinates = features[i].geometry.coordinates;
                var height = features[i].properties.height;
                for(var j = 0; j < coordinates.length; j++) {
                    var coordinate = coordinates[j];
                    var shape = new THREE.Shape();

                    for(var k = 0; k < coordinate.length; k++) {
                        var point = coordinate[k];
                        var pro = projection(point);
                        pro[0] -= 529140;
                        pro[1] -= 330548;
                        if(k === 0) {
                            shape.moveTo(pro[0], pro[1]);
                        } else {
                            shape.lineTo(pro[0], pro[1]);
                        }
                    }
                    var extrudeSettings = {
                        amount: 0,
                        bevelEnabled: true,
                        bevelSegments: 1,
                        steps: 1,
                        bevelSize: 0,
                        bevelThickness: height
                    };

                    var tepGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                    tepGeometry.vertices.forEach(function(v){
                        v.z -= height;
                    })
                    if(geometry) {
                        geometry.merge(tepGeometry);
                        tepGeometry.dispose();
                    } else {
                        geometry = tepGeometry
                    }

                }
            }
            
            var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                color: 0xffffff
            }));
            mesh.rotation.x = Math.PI * 0.5;
            this.object3D.add(mesh);

        },
        beforeDestroy: function() {
            //          var child = this.object3D.children[0];
            //          child && child.geometry && child.geometry.dispose();
            //          child && child.material && child.material.dispose();
        },
        methods: {
            draw: function() {

            }
        }

    }
</script>

<style>

</style>