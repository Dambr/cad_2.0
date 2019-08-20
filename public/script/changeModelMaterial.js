function showNormalModel(){
	scene.remove(scene.getObjectByName("MAINMESH"));
	MAINMESH = new THREE.Mesh(THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)), new THREE.MeshNormalMaterial());
	MAINMESH.name = "MAINMESH";
	scene.add(MAINMESH);
}
function showWindowBasicModel(){
	document.getElementById("windowBasicModel").style.display = "block";
}
function closeWindowBasicModel(){
	document.getElementById("windowBasicModel").style.display = "none";
}
function showBasicModel(){
	//alert(document.getElementById("choiseColorFrame").value);
	scene.remove(scene.getObjectByName("MAINMESH"));
	let material = new THREE.MeshBasicMaterial({
		color : document.getElementById("choiseColorFrame").value,
		wireframe: document.getElementById("checkWireFrame").checked ? false : true
	});
	MAINMESH = new THREE.Mesh(THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)), material);
	MAINMESH.name = "MAINMESH";
	scene.add(MAINMESH);
}