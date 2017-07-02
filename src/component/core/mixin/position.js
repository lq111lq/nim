module.exports = {
    props: {
        positionX: {
            type: Number,
            default: 0
        },
        positionY: {
            type: Number,
            default: 0
        },
        positionZ: {
            type: Number,
            default: 0
        }
    },
    watch: {
        positionX: function(value) {
            if(this.object3D) {
                this.object3D.position.x = value;
            }
        },
        positionY: function(value) {
            if(this.object3D) {
                this.object3D.position.y = value;
            }
        },
        positionZ: function(value) {
            if(this.object3D) {
                this.object3D.position.z = value;
            }
        }
    },
    beforeMount:function() {
        var self = this;
        this.$on('object3DCreated',function(){
            self.object3D.position.x = this.positionX;
            self.object3D.position.y = this.positionY;
            self.object3D.position.z = this.positionZ;
        })
    }
}