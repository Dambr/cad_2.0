function CreateCilinderWithFask(){
	//let geometry = new THREE.CylinderGeometry(...arguments);
	let geometry = new THREE.CylinderGeometry(
		values.RadiusTop, 
		values.RadiusBottom, 
		values.Height, 
		values.RadialSegments, 
		values.HeightSegments, 
		values.OpenEnded, 
		values.ThetaStart, 
		values.ThetaLength
	);
	let material = new THREE.MeshNormalMaterial(
		{
			//color: 0xffffff,
			//vertexColors: THREE.FaceColors,
			//wireframe: true
		});

	for (let i = 0; i < geometry.faces.length; i++){
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
	}

	let mesh = new THREE.Mesh(geometry, material);
	//scene.add(mesh);
	objects.push(mesh);
	return mesh;
}