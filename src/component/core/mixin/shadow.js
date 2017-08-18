module.exports = {
    props: {
        castShadow: {
            type: Boolean,
            default: false
        },
        receiveShadow: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        castShadow: function(value) {
            if(this.object3D) {
                this.object3D.castShadow = value;
            }
        },
        receiveShadow: function(value) {
            if(this.object3D) {
                this.object3D.receiveShadow = value;
            }
        }
    },
    beforeMount:function() {
        var self = this;
        this.$on('object3DCreated',function() {
            this.object3D.castShadow = self.castShadow;
            this.object3D.receiveShadow = self.receiveShadow;
        })
    }
}