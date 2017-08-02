<template>
    <span></span>
</template>

<script>
    var $ = require('jqlite');
    module.exports = {
        name: 'Object3D',
        mixins: [
            require('./mixin/position.js'),
            require('./mixin/rotation.js'),
            require('./mixin/scale.js')
        ],
        data: function() {
            return {
                mouseover: false
            }
        },
        watch: {
            mouseover: function(value) {
                if(value) {
                    $(this.$el).trigger('mouseenter');
                } else {
                    $(this.$el).trigger('mouseout');
                }
            }
        },
        methods: {
            getRenderer: function(x, y, z) {
                return this.$parent ? this.$parent.getRenderer():undefined;
            }
        },
        beforeMount: function() {
            var self = this;
            this.$on('object3DCreated', function() {
                this.object3D.element = this.$el;
                this.object3D.vm = this;

                this.$parent &&
                    this.$parent.object3D &&
                    this.object3D &&
                    this.$parent.object3D.add(this.object3D);

                this.$children.forEach(function(child) {
                    child.object3D &&
                        self.object3D &&
                        self.object3D.add(child.object3D)
                })
            });
            this.$on('object3DDestroy', function() {
                if(this.object3D) {
                    this.object3D.element = null;
                    this.object3D.vm = null;
                }
                this.$parent &&
                    this.$parent.object3D &&
                    this.object3D &&
                    this.$parent.object3D.remove(this.object3D);

                this.$children.forEach(function(child) {
                    child.object3D &&
                        self.object3D &&
                        self.object3D.remove(child.object3D)
                })
            })
        }
    }
</script>

<style>

</style>