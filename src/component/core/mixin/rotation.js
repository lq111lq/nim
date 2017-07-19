var THREE = require('three');
module.exports = {
    props: {
        rotationX: {
            type: [Number,String],
            default: 0
        },
        rotationY: {
            type: [Number,String],
            default: 0
        },
        rotationZ: {
            type: [Number,String],
            default: 0
        }
    },
    watch: {
        rotationX: function(value) {
            if(this.object3D) {
                this.object3D.rotation.x = Number(value)
            };
        },
        rotationY: function(value) {
            if(this.object3D) {
                this.object3D.rotation.y = Number(value)
            };
        },
        rotationZ: function(value) {
            if(this.object3D) {
                this.object3D.rotation.z = Number(value)
            };
        }
    },
    methods: {
        lookAt:function(x,y,z) {
            this.object3D && this.object3D.lookAt(new THREE.Vector3(x,y,z));
            return {
                x : this.object3D && this.object3D.rotation.x,
                y : this.object3D && this.object3D.rotation.y,
                y : this.object3D && this.object3D.rotation.z
            }
        }
    },
    beforeMount: function() {
        var self = this;
        this.$on('object3DCreated', function() {
            this.object3D.rotation.x = Number(this.rotationX);
            this.object3D.rotation.y = Number(this.rotationY);
            this.object3D.rotation.z = Number(this.rotationZ);
        })
    }
}