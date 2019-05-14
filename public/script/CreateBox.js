function CreateBox(values){

	let geometry = new THREE.BoxGeometry(
		values.width,
		values.height,
		values.depth,
		values.widthSegments,
		values.heightSegments,
		values.depthSegments
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