function CreateOS(){
	let OSXmaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
	let OSYmaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
	let OSZmaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
	let OSX = new CreateCylinder({
		RadiusTop      : 20,
		RadiusBottom   : 10,
		Height         : 400,
		RadialSegments : undefined,
		HeightSegments : undefined,
		OpenEnded      : undefined,
		ThetaStart     : undefined,
		ThetaLength    : undefined
		});
	let OSY = new CreateCylinder({
		RadiusTop      : 20,
		RadiusBottom   : 10,
		Height         : 400,
		RadialSegments : undefined,
		HeightSegments : undefined,
		OpenEnded      : undefined,
		ThetaStart     : undefined,
		ThetaLength    : undefined
	});
	let OSZ = new CreateCylinder({
		RadiusTop      : 20,
		RadiusBottom   : 10,
		Height         : 400,
		RadialSegments : undefined,
		HeightSegments : undefined,
		OpenEnded      : undefined,
		ThetaStart     : undefined,
		ThetaLength    : undefined
	});

	OSX = new THREE.Mesh(OSX, OSXmaterial);
	OSY = new THREE.Mesh(OSY, OSYmaterial);
	OSZ = new THREE.Mesh(OSZ, OSZmaterial);

	OSX.rotation.z = Math.PI/2;
	OSZ.rotation.x = Math.PI/2;


	
	return [OSX, OSY, OSZ];
}