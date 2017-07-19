module.exports = {
    props: {
        positionX: {
            type: [Number,String],
            default: 0
        },
        positionY: {
            type: [Number,String],
            default: 0
        },
        positionZ: {
            type: [Number,String],
            default: 0
        }
    },
    watch: {
        positionX: function(value) {
            if(this.object3D) {
                this.object3D.position.x = Number(value);
            }
        },
        positionY: function(value) {
            if(this.object3D) {
                this.object3D.position.y = Number(value);
            }
        },
        positionZ: function(value) {
            if(this.object3D) {
                this.object3D.position.z = Number(value);
            }
        }
    },
    beforeMount:function() {
        var self = this;
        this.$on('object3DCreated',function(){
            self.object3D.position.x = Number(this.positionX);
            self.object3D.position.y = Number(this.positionY);
            self.object3D.position.z = Number(this.positionZ);
        })
    }
}