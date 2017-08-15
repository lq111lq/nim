<template>
	<span><slot></slot></span>
</template>

<script>
    var THREE = require('three');
	module.exports = {
		name: 'points',
		extends: require('../core/Object3D.vue'),
		props: {
			positions: {
				type: Array,
				default: function() {
					return []
				}
			},
			colors: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		mounted: function() {
			var positions = new Float32Array(this.positions);
			var colors = new Float32Array(this.colors);

			var geometry = new THREE.BufferGeometry();
			geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));
			geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));

			var pMaterial = new THREE.PointsMaterial({
				//color: 0x00ffff,
				vertexColors: THREE.VertexColors,
				size: 1,
				blending: THREE.AdditiveBlending,
				transparent: true,
				sizeAttenuation: true
			});

			var points = new THREE.Points(geometry, pMaterial);

			this.object3D = points;
			this.$emit('object3DCreated');
		},
		beforeDestroy: function() {
			this.object3D.geometry.dispose();
			this.object3D.material.dispose();
		}
	}
</script>

<style>

</style>