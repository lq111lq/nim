var THREE = require('three');
module.exports = {
    props: {
        rotationX: {
            type: [Number, String],
            default: 0
        },
        rotationY: {
            type: [Number, String],
            default: 0
        },
        rotationZ: {
            type: [Number, String],
            default: 0
        },
        lookAtX: {
            type: [Number, String],
            default: NaN
        },
        lookAtY: {
            type: [Number, String],
            default: NaN
        },
        lookAtZ: {
            type: [Number, String],
            default: NaN
        }
    },
    computed: {
        lookAt: function() {
            return(!isNaN(this.lookAtX)) && (!isNaN(this.lookAtY)) && (!isNaN(this.lookAtZ));
        },
        lookAtPosition: function() {
            return {
                x: this.lookAtX,
                y: this.lookAtY,
                z: this.lookAtZ
            }
        }
    },
    watch: {
        rotationX: function(value) {
            if(this.object3D && !this.lookAt) {
                this.object3D.rotation.x = Number(value)
            };
        },
        rotationY: function(value) {
            if(this.object3D && !this.lookAt) {
                this.object3D.rotation.y = Number(value)
            };
        },
        rotationZ: function(value) {
            if(this.object3D && !this.lookAt) {
                this.object3D.rotation.z = Number(value)
            };
        },
        lookAtPosition: {
            handler: function(lookAtPosition) {
                if(this.object3D && this.lookAt) {
                    this.object3D.lookAt(new THREE.Vector3(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z));
                }
            },
            deep: true
        }
    },
    methods: {
        lookAt: function(x, y, z) {
            this.object3D && this.object3D.lookAt(new THREE.Vector3(x, y, z));
            return {
                x: this.object3D && this.object3D.rotation.x,
                y: this.object3D && this.object3D.rotation.y,
                y: this.object3D && this.object3D.rotation.z
            }
        }
    },
    beforeMount: function() {
        var self = this;
        this.$on('object3DCreated', function() {
            if(this.object3D && this.lookAt) {
                this.object3D.lookAt(new THREE.Vector3(this.lookAtPosition.x, this.lookAtPosition.y, this.lookAtPosition.z));
            } else {
                this.object3D.rotation.x = Number(this.rotationX);
                this.object3D.rotation.y = Number(this.rotationY);
                this.object3D.rotation.z = Number(this.rotationZ);
            }
        })
    }
}