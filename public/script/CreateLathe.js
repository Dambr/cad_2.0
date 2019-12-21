function CreateLathe(values){

	let geometry = new THREE.LatheGeometry(
		values.points,
		values.segments,
		values.phiStart,
		values.phiLength
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
	return geometry;
	//return mesh;
}