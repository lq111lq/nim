<template>
    <div ref="container">
        <slot></slot>
    </div>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    module.exports = {
        name: 'Renderer',
        extends: require('./core/Object3D.js'),
        data: function() {
            return {
                w: 0,
                h: 0
            }
        },
        props: {
            cameraPositionX: {
                type: Number,
                default: 0
            },
            cameraPositionY: {
                type: Number,
                default: 0
            },
            cameraPositionZ: {
                type: Number,
                default: 0
            },
            lookAtPositionX: {
                type: Number,
                default: 0
            },
            lookAtPositionY: {
                type: Number,
                default: 0
            },
            lookAtPositionZ: {
                type: Number,
                default: 0
            }
        },
        watch: {
            w: 'resize',
            h: 'resize',
            cameraPositionX: function(value, oldValue) {
                if(this.camera && this.camera.position) {
                    this.camera.position.x = value;
                    this.camera.lookAt(new THREE.Vector3(this.lookAtPositionX, this.lookAtPositionY, this.lookAtPositionZ));
                    this.directionalLight.position.copy(this.camera.position);
                }
            },
            cameraPositionY: function(value, oldValue) {
                if(this.camera && this.camera.position) {
                    this.camera.position.y = value;
                    this.camera.lookAt(new THREE.Vector3(this.lookAtPositionX, this.lookAtPositionY, this.lookAtPositionZ));
                    this.directionalLight.position.copy(this.camera.position);
                }
            },
            cameraPositionZ: function(value, oldValue) {
                if(this.camera && this.camera.position) {
                    this.camera.position.z = value;
                    this.camera.lookAt(new THREE.Vector3(this.lookAtPositionX, this.lookAtPositionY, this.lookAtPositionZ));
                    this.directionalLight.position.copy(this.camera.position);
                }
            },
            lookAtPositionX: function() {
                if(this.camera) {
                    this.camera.lookAt(new THREE.Vector3(this.lookAtPositionX, this.lookAtPositionY, this.lookAtPositionZ));
                    this.directionalLight.position.copy(this.camera.position);
                }
            },
            lookAtPositionY: function() {
                if(this.camera) {
                    this.camera.lookAt(new THREE.Vector3(this.lookAtPositionX, this.lookAtPositionY, this.lookAtPositionZ));
                    this.directionalLight.position.copy(this.camera.position);
                }
            },
            lookAtPositionZ: function() {
                if(this.camera) {
                    this.camera.lookAt(new THREE.Vector3(this.lookAtPositionX, this.lookAtPositionY, this.lookAtPositionZ));
                    this.directionalLight.position.copy(this.camera.position);
                }
            }
        },
        mounted: function() {
            console.log('renderer');
            var self = this;
            var $container = $(this.$refs.container);
            this.w = $container.width();
            this.h = $container.height();

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, this.w / this.h, 0.1, 1000);

            this.camera.position.x = this.cameraPositionX;
            this.camera.position.y = this.cameraPositionY;
            this.camera.position.z = this.cameraPositionZ;
            this.camera.lookAt(new THREE.Vector3(this.lookAtPositionX, this.lookAtPositionY, this.lookAtPositionZ));

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                //              alpha: true
            });
            this.renderer.setSize(this.w, this.h);
            this.$refs.container.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.display = "block";

            this.object3D = this.scene;

            var ambiColor = "#222222";
            var ambientLight = new THREE.AmbientLight(ambiColor);
            this.scene.add(ambientLight);

            this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            this.directionalLight.position.copy(this.camera.position);
            this.scene.add(this.directionalLight);
            this.directionalLight.target = this.scene;

            this.$emit('object3DCreated');

            var lastIntersectObjectsMap = {};
            var intersectObjectsMap = {};

            var raycaster = new THREE.Raycaster();

            function render() {
                self.rafIndex = requestAnimationFrame(render);
                self.renderer.render(self.scene, self.camera);
                self.w = $container.width();
                self.h = $container.height();
            }
            render();

            this.$el.addEventListener('click', onClick, false);

            function onClick(event) {
                
                var allVisibleObjects = [];

                self.scene.traverseVisible(function(object) {
                    allVisibleObjects.push(object);
                });

                allVisibleObjects.forEach(function(visibleObject) {
                    if(visibleObject.element && visibleObject.element.executeRenderTasks) {
                        visibleObject.element.executeRenderTasks();
                    }
                });
                
                var width = self.w;
                var height = self.h;

                event.preventDefault();

                var mouse = new THREE.Vector2();

                mouse.x = (event.clientX / width) * 2 - 1;
                mouse.y = -(event.clientY / height) * 2 + 1;

                raycaster.setFromCamera(mouse, self.camera);

                var allVisibleObjects = [];

                self.scene.traverseVisible(function(object) {
                    allVisibleObjects.push(object);
                });

                var intersects = raycaster.intersectObjects(allVisibleObjects, true);

                var ids = [];
                intersects.forEach(function(intersect) {
                    if(ids.indexOf(intersect.object.id) === -1) {
                        $(intersect.object.element).trigger('click');
                        ids.push(intersect.object.id);
                    }
                });
            }
        },
        methods: {
            resize: function() {
                this.camera.aspect = this.w / this.h;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.w, this.h);
            }
        }
    }
</script>

<style>

</style>