<template>
    <group>

    </group>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    var TWEEN = require('@tweenjs/tween.js');

    module.exports = {
        name: 'way',
        extends: require('src/component/objects/Group.vue'),
        data: function() {
            return {}
        },
        props: {
            nodes: {
                type: Array,
                default: function() {
                    return []
                }
            },
        },
        watch: {
            name: 'draw',
            population: 'draw',
            t: 'draw'
        },
        mounted: function() {
            var shape = new THREE.Shape();
            var nodes = this.nodes;
            
            //debugger;

            for(var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if(i === 0) {
                    shape.moveTo(node.x, node.z);
                } else {
                    shape.lineTo(node.x, node.z);
                }
            }
//            debugger;
//          shape.moveTo(10, 10);
//          shape.lineTo(10, 20);
//          shape.lineTo(20, 20);
//          shape.lineTo(20, 10);
//          shape.lineTo(10, 10);
            
            var extrudeSettings = {
                amount: 0,
                bevelEnabled: true,
                bevelSegments: 1,
                steps: 1,
                bevelSize: 0,
                bevelThickness: 1
            };
            try {
                var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                    color: 0x0088ff,
                    side:THREE.DoubleSide,
                    transparent:true,
                    opacity:0.5
                }));
                mesh.rotation.x = Math.PI * 0.5;
                this.object3D.add(mesh);
                
//              var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
//              var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
//                  wireframe:true
//              }));
//              mesh.rotation.x = Math.PI * 0.5;
//              this.object3D.add(mesh);
            } catch(e) {

            }

        },
        methods: {
            draw: function() {

            }
        }

    }
</script>

<style>

</style>