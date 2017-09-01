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
            type: {
                type: String,
                default: ''
            }
        },
        watch: {
            name: 'draw',
            population: 'draw',
            t: 'draw'
        },
        mounted: function() {
            var shape = new THREE.Shape();
            var nodes = this.nodes;

            try {
                switch(this.type) {
                    case 'building':
                        for(var i = 0; i < nodes.length; i++) {
                            var node = nodes[i];
                            if(i === 0) {
                                shape.moveTo(node.x, node.z);
                            } else {
                                shape.lineTo(node.x, node.z);
                            }
                        }

                        var extrudeSettings = {
                            amount: 0,
                            bevelEnabled: true,
                            bevelSegments: 1,
                            steps: 1,
                            bevelSize: 0,
                            bevelThickness: 1
                        };

                        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                        var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                            color: 0x0088ff,
                            side: THREE.DoubleSide,
                            transparent: true,
                            opacity: 0.5
                        }));
                        mesh.rotation.x = Math.PI * 0.5;
                        this.object3D.add(mesh);
                        break;
                    case 'water':
                        for(var i = 0; i < nodes.length; i++) {
                            var node = nodes[i];
                            if(i === 0) {
                                shape.moveTo(node.x, node.z);
                            } else {
                                shape.lineTo(node.x, node.z);
                            }
                        }

                        var extrudeSettings = {
                            amount: 0,
                            bevelEnabled: true,
                            bevelSegments: 1,
                            steps: 1,
                            bevelSize: 0,
                            bevelThickness: 0
                        };
                        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                        var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                            color: 0x0000ff,
                            side: THREE.DoubleSide,
                            transparent: true,
                            opacity: 0.5
                        }));
                        mesh.rotation.x = Math.PI * 0.5;
                        this.object3D.add(mesh);
                        break;
                    case 'waterway':
                        var args = []
                        for(var i = 0; i < nodes.length; i++) {
                            var node = nodes[i];
                            args.push(new THREE.Vector2(node.x, node.z, 0))
                        }

                        //                      function CustomSinCurve(scale) {
                        //
                        //                          THREE.Curve.call(this);
                        //
                        //                          this.scale = (scale === undefined) ? 1 : scale;
                        //
                        //                      }
                        //
                        //                      CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
                        //                      CustomSinCurve.prototype.constructor = CustomSinCurve;
                        //
                        //                      CustomSinCurve.prototype.getPoint = function(t) {
                        //                          var t = ~~(t * (args.length - 1))
                        //                          return args[~~(t * (args.length - 1))].multiplyScalar(this.scale);
                        //                      };
                        //
                        ////                      CustomSinCurve.prototype.getPoint = function(t) {
                        ////
                        ////                          var tx = t * 3 - 1.5;
                        ////                          var ty = Math.sin(2 * Math.PI * t);
                        ////                          var tz = 0;
                        ////
                        ////                          return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
                        ////
                        ////                      };
                        //                      
                        //                      var path = new CustomSinCurve();
                        //                      var geometry = new THREE.TubeGeometry(path, 20, 20, 8, false);
                        //                      debugger;
                        //                      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                        //                          color: 0xff0000,
                        //                          side: THREE.DoubleSide,
                        //                          transparent: true,
                        //                          opacity: 0.5
                        //                      }));

                        // Create a sine-like wave
                        var curve = new THREE.SplineCurve(args);

                        var path = new THREE.Path(curve.getPoints(50));

                        var geometry = path.createPointsGeometry(50);
                        var material = new THREE.LineBasicMaterial({
                            color: 0x00ffff
                        });

                        // Create the final object to add to the scene
                        var splineObject = new THREE.Line(geometry, material);
                        splineObject.rotation.x = Math.PI * 0.5;

                        this.object3D.add(splineObject);
                        break;
                }
            } catch(e) {
                console.log(e);
                //debugger;
            }

        },
        beforeDestroy: function() {
            var child = this.object3D.children[0];
            child && child.geometry && child.geometry.dispose();
            child && child.material && child.material.dispose();
        },
        methods: {
            draw: function() {

            }
        }

    }
</script>

<style>

</style>