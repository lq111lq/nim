module.exports = {
    props: {
        scaleX: {
            type: [Number,String],
            default: 1
        },
        scaleY: {
            type: [Number,String],
            default: 1
        },
        scaleZ: {
            type: [Number,String],
            default: 1
        }
    },
    watch: {
        scaleX: function(value) {
            if(this.object3D) {
                this.object3D.scale.x = Number(value);
            }
        },
        scaleY: function(value) {
            if(this.object3D) {
                this.object3D.scale.y = Number(value);
            }
        },
        scaleZ: function(value) {
            if(this.object3D) {
                this.object3D.scale.z = Number(value);
            }
        }
    },
    beforeMount: function() {
        var self = this;
        this.$on('object3DCreated', function() {
            this.object3D.scale.x = Number(this.scaleX);
            this.object3D.scale.y = Number(this.scaleY);
            this.object3D.scale.z = Number(this.scaleZ);
        })
    }
}