module.exports = {
    props: {
        scaleX: {
            type: Number,
            default: 1
        },
        scaleY: {
            type: Number,
            default: 1
        },
        scaleZ: {
            type: Number,
            default: 1
        }
    },
    watch: {
        scaleX: function(value) {
            if(this.object3D) {
                this.object3D.scale.x = value;
            }
        },
        scaleY: function(value) {
            if(this.object3D) {
                this.object3D.scale.y = value;
            }
        },
        scaleZ: function(value) {
            if(this.object3D) {
                this.object3D.scale.z = value;
            }
        }
    },
    beforeMount: function() {
        var self = this;
        this.$on('object3DCreated', function() {
            this.object3D.scale.x = this.scaleX;
            this.object3D.scale.y = this.scaleY;
            this.object3D.scale.z = this.scaleZ;
        })
    }
}