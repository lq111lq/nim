module.exports = {
    props: {
        rotationX: {
            type: Number,
            default: 0
        },
        rotationY: {
            type: Number,
            default: 0
        },
        rotationZ: {
            type: Number,
            default: 0
        }
    },
    watch: {
        rotationX: function(value) {
            if(this.object3D) {
                this.object3D.rotation.x = value
            };
        },
        rotationY: function(value) {
            if(this.object3D) {
                this.object3D.rotation.y = value
            };
        },
        rotationZ: function(value) {
            if(this.object3D) {
                this.object3D.rotation.z = value
            };
        }
    },
    beforeMount: function() {
        var self = this;
        this.$on('object3DCreated', function() {
            this.object3D.rotation.x = this.rotationX;
            this.object3D.rotation.y = this.rotationY;
            this.object3D.rotation.z = this.rotationZ;
        })
    }
}