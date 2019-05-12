function CreateBox(){

	let geometry = new THREE.BoxGeometry(
		value.width,
		value.height,
		value.depth,
		value.widthSegments,
		value.heightSegments,
		value.depthSegments
		);

	let material = new THREE.MeshNormalMaterial(
		{
			//color: 0xffffff,
			//vertexColors: THREE.FaceColors,
			//wireframe: true
		});

	/*for (let i = 0; i < geometry.faces.length; i++){
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
	}*/

	let mesh = new THREE.Mesh(geometry, material);
	//scene.add(mesh);
	objects.push(mesh);
	return mesh;
}