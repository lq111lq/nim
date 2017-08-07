<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    var $ = require('jqlite');
    var THREE = require('three');
    module.exports = {
        name: 'Renderer',
        data: function() {
            return {
                w: 0,
                h: 0
            }
        },
        props: {
            clearColor: String
        },
        watch: {
            w: 'resize',
            h: 'resize',
            clearColor:function() {
                if(this.renderer) {
                    this.renderer.setClearColor(this.clearColor, 1);
                }
            }
        },
        beforeMount: function() {
            var $el = $(this.$el);
            this.w = $el.width();
            this.h = $el.height();
        },
        mounted: function() {
            var self = this;
            var $el = $(this.$el);

            this.renderer = new THREE.WebGLRenderer({
                antialias: true               
            });
            this.renderer.setClearColor(this.clearColor, 1);
            
            this.renderer.domElement.style.display = "block";
            this.$el.appendChild(this.renderer.domElement);

            function render() {
                self.rafIndex = requestAnimationFrame(render);
                if(self.scene && self.camera) {
                    self.renderer.render(self.scene, self.camera);
                }
                self.w = $el.width();
                self.h = $el.height();
            }
            render();

            this.$el.addEventListener('click', onClick, false);
            this.$el.addEventListener('mouseover', onMouseover, false);
            this.$el.addEventListener('mousemove', onMouseover, false);

            var raycaster = new THREE.Raycaster();

            function onClick(event) {

                var width = self.w;
                var height = self.h;

                event.preventDefault();

                var mouse = new THREE.Vector2();

                mouse.x = (event.clientX / width) * 2 - 1;
                mouse.y = -(event.clientY / height) * 2 + 1;

                raycaster.setFromCamera(mouse, self.camera);

                var allVisibleObjects = [];

                self.scene && self.scene.traverseVisible(function(object) {
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

            function onMouseover(event) {

                var width = self.w;
                var height = self.h;

                event.preventDefault();

                var mouse = new THREE.Vector2();

                mouse.x = (event.clientX / width) * 2 - 1;
                mouse.y = -(event.clientY / height) * 2 + 1;

                raycaster.setFromCamera(mouse, self.camera);

                var allVisibleObjects = [];

                self.scene && self.scene.traverseVisible(function(object) {
                    allVisibleObjects.push(object);
                });

                var intersects = raycaster.intersectObjects(allVisibleObjects, true);
                var ids = [];
                intersects.forEach(function(intersect) {
                    if(ids.indexOf(intersect.object.id) === -1) {
                        ids.push(intersect.object.id);
                    }
                });
                allVisibleObjects.forEach(function(object3D) {
                    if(ids.indexOf(object3D.id) === -1) {
                        if(object3D.vm) {
                            object3D.vm.mouseover = false;
                        }
                    } else {
                        if(object3D.vm) {
                            object3D.vm.mouseover = true;
                        }
                    }
                });

            }
            this.$emit('rendererCreated');
        },
        methods: {

            getRenderer: function(x, y, z) {
                return this;
            },

            resize: function() {
                if(this.camera) {
                    this.camera.aspect = this.w / this.h;
                    this.camera.updateProjectionMatrix();
                }
                if(this.renderer) {
                    this.renderer.setSize(this.w, this.h);
                }
            }
        }
    }
</script>

<style>

</style>