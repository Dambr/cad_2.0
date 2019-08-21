function closeLegend(){
	document.getElementById("legend").style.display = "none";
}
function showWindowOfParameters(){
	document.getElementById("windowOfParameters").style.display = "block";
}
function closeWindowOfParameters(){
	scene.remove(scene.getObjectByName("PLANE_MESH"));
	document.getElementById("windowOfParameters").style.display = "none";
}
function closePlane(){
	scene.remove(scene.getObjectByName("PLANE_MESH"));
	document.getElementById("closePlane").disabled = true;
}
function changeRangePlane(){
	try{
		if (Math.abs(PLANE_MESH.position.x) > 1){
			PLANE_MESH.position.x > 0 ? PLANE_MESH.position.x = Number(document.getElementById("changeRangePlane").value) : PLANE_MESH.position.x = -1 * Number(document.getElementById("changeRangePlane").value);
		}
		if (Math.abs(PLANE_MESH.position.y) > 1){
			PLANE_MESH.position.y > 0 ? PLANE_MESH.position.y = Number(document.getElementById("changeRangePlane").value) : PLANE_MESH.position.y = -1 * Number(document.getElementById("changeRangePlane").value);
		}
		if (Math.abs(PLANE_MESH.position.z) > 1){
			PLANE_MESH.position.z > 0 ? PLANE_MESH.position.z = Number(document.getElementById("changeRangePlane").value) : PLANE_MESH.position.z = -1 * (document.getElementById("changeRangePlane").value);
		}
	} catch (e) {}
}
function choisePlane(par){
	// Удаляем старую плоскость
	scene.remove(scene.getObjectByName("PLANE_MESH"));

	// Изменяем текст выбранной плоскости
	document.getElementById("selectedPowerPlane").textContent = par;

	// Делаем активной кнопку скрытия плоскости
	document.getElementById("closePlane").disabled = false;

	let geometry = THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH));

	let PLANE_material = new THREE.MeshBasicMaterial({color: 0xff0000});
	let PLANE = {
		width         : 1,	// x
		height   	  : 1,	// y
		depth         : 1,	// z
		widthSegments : 1,
		heightSegments: 1,
		depthSegments : 1
	};
	let PLANE_position = {x : 0, y : 0, z : 0};
	switch (par){
		case "F":
			PLANE.width  = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
			PLANE.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
			PLANE_position.z = geometry.boundingBox.max.z + 10;
			break;
		case "L":
			PLANE.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
			PLANE.depth  = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
			PLANE_position.x = geometry.boundingBox.min.x - 10;
			break;
		case "U":
			PLANE.width  = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
			PLANE.depth  = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
			PLANE_position.y = geometry.boundingBox.max.y + 10;
			break;
		case "B":
			PLANE.width  = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
			PLANE.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
			PLANE_position.z = geometry.boundingBox.min.z - 10;
			break;
		case "R":
			PLANE.height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
			PLANE.depth  = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
			PLANE_position.x = geometry.boundingBox.max.x + 10;
			break;
		case "D":
			PLANE.width  = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
			PLANE.depth  = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
			PLANE_position.y = geometry.boundingBox.min.y - 10;
			break;
	}
	PLANE                 = new CreateBox(PLANE);
	PLANE_MESH            = new THREE.Mesh(PLANE, PLANE_material);
	PLANE_MESH.name       = "PLANE_MESH";
	PLANE_MESH.position.x = PLANE_position.x;
	PLANE_MESH.position.y = PLANE_position.y;
	PLANE_MESH.position.z = PLANE_position.z;
		// Корректировака бегунка расстояния плоскости до модели
	document.getElementById("changeRangePlane").min = Math.max(Math.abs(PLANE_MESH.position.x), Math.abs(PLANE_MESH.position.y), Math.abs(PLANE_MESH.position.z));
	document.getElementById("changeRangePlane").max = 10 * document.getElementById("changeRangePlane").min;
	document.getElementById("changeRangePlane").value = document.getElementById("changeRangePlane").min;
	scene.add(PLANE_MESH);
}

function strengthAnalysis(){
	// THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH));
	let promise = new Promise(function(resolve, reject){
		// Делаем кнопку неактивной
		document.getElementById("strengthAnalysis").disabled = true;

		document.getElementById("analysisLoading").style.display = "block";
		setTimeout(() => {resolve("result")}, 1000);
	});
	promise
		.then(
			result => {
				// Удаляем основной объект, чтобы на его место поместить новый
				scene.remove(scene.getObjectByName("MAINMESH"));

				let poleParameters = {
					width         : 10,	// x
					height   	  : 10, // y
					depth         : 10, // z
					widthSegments : 1,
					heightSegments: 1,
					depthSegments : 1
				}
				let material = new THREE.MeshBasicMaterial({
					color: 0xffffff,
					vertexColors: THREE.FaceColors,
					//wireframe: true
				});
				let Pole = [];
				let group = new THREE.Object3D();
				// Для читабельности кода. Потом удалю

				let geometry = THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH));

				let MaxX =Math.ceil((geometry.boundingBox.max.x - THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)).boundingBox.min.x) / poleParameters.width);
				let MaxY=Math.ceil((geometry.boundingBox.max.y - THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)).boundingBox.min.y) / poleParameters.height);
				let MaxZ =Math.ceil((geometry.boundingBox.max.z - THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)).boundingBox.min.z) / poleParameters.depth);

				let boundMaxX = geometry.boundingBox.max.x;
				let boundMaxY = geometry.boundingBox.max.y;
				let boundMaxZ = geometry.boundingBox.max.z;

				// let power    = Number(document.getElementById("power").value);
				let power    = Number(document.getElementById("powerValue").textContent.replace(String(document.getElementById("selectMeasure").options[document.getElementById("selectMeasure").options.selectedIndex].textContent), "")) / Number(document.getElementById("changeMaxPower").value);
				let strength = Number(document.getElementById("strengthValue").textContent);
				let gradientColor = [];
				
				for (let k = 0; k < MaxZ; k ++){
					Pole.push([]);
					for (let j = 0; j < MaxY; j ++){
						Pole[k].push([]);
						for (let i = 0; i < MaxX; i ++){
							Pole[k][j].push(new CreateBox(poleParameters));

							Pole[k][j][i] = new THREE.Mesh(Pole[k][j][i], material);
							
							Pole[k][j][i].position.x = boundMaxX - poleParameters.width / 2 - (poleParameters.width * i);
							Pole[k][j][i].position.y = boundMaxY - poleParameters.height / 2 - (poleParameters.height * j);
							Pole[k][j][i].position.z = boundMaxZ - poleParameters.depth / 2 - (poleParameters.depth * k);

							Pole[k][j][i] = THREE.CSG.toCSG(Pole[k][j][i]);

							Pole[k][j][i] = Pole[k][j][i].intersect(THREE.CSG.toCSG(MAINMESH));
							
							Pole[k][j][i] = THREE.CSG.fromCSG(Pole[k][j][i]);

							
							// Красим модель с разначх сторон в зависимости от выбранной плоскости
							switch (document.getElementById("selectedPowerPlane").textContent){
								case "F":
									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(power, strength, k / (MaxZ - 1));
									}
									gradientColor.push( "rgb(" + 255 * power + "," + 255 * strength + "," + 255 * k / (MaxZ - 1) + ")" );
									break;
								case "L":
									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(power, strength, 1 - i / (MaxX - 1));
									}
									gradientColor.unshift( "rgb(" + 255 * power + "," + 255 * strength + "," + 255 * (1 - i / (MaxX - 1)) + ")" );
									break;
								case "U":
									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(power, strength, j / (MaxY - 1));
									}
									gradientColor.push( "rgb(" + 255 * power + "," + 255 * strength + "," + 255 * j / (MaxY - 1) + ")" );
									break;
								case "B":
									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(power, strength, 1 - k / (MaxZ - 1));
									}
									gradientColor.unshift( "rgb(" + 255 * power + "," + 255 * strength + "," + 255 * (1 - k / (MaxZ - 1)) + ")" );
									break;
								case "R":
									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(power, strength, i / (MaxX - 1));
									}
									gradientColor.push( "rgb(" + 255 * power + "," + 255 * strength + "," + 255 * i / (MaxX - 1) + ")" );
									break;
								case "D":
									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(power, strength, 1 - j / (MaxY - 1));
									}
									gradientColor.push( "rgb(" + 255 * power + "," + 255 * strength + "," + 255 * j / (MaxY - 1) + ")" );
									break;
							}
							
							Pole[k][j][i] = new THREE.Mesh(Pole[k][j][i], material);

							group.add(Pole[k][j][i]);
						}
					}
				}

					// Окрашиваем легенду
				document.getElementById("legend").style.display = "block";
				// document.getElementById("legend").style.width  = "100px";
				// document.getElementById("legend").style.height = "300px";
				// document.getElementById("legend").style.right  = document.getElementById("canvas").width - 100 + 10 + "px";
				// alert(document.getElementById("canvas").height);
				document.getElementById("legend").style.bottom = document.getElementById("canvas").height - 300 + 10 + "px";

				document.getElementById("legend").style.backgroundImage = "none";
				// Удаление последней запятой, а то не нарисует
				// gradientColor = gradientColor.substring(0, gradientColor.length - 1);
				gradientColor = new Set(gradientColor);
				let backgroundGradient = "";
				for (color of gradientColor){
					backgroundGradient += color + ",";
				}
				backgroundGradient = backgroundGradient.substring(0, backgroundGradient.length - 1);
				document.getElementById("legend").style.backgroundImage = "linear-gradient(" + backgroundGradient + ")";

				group.name = "MAINMESH";
				scene.add(group);
				document.getElementById("analysisLoading").style.display = "none";
				scene.remove(scene.getObjectByName("PLANE_MESH"));
				// closeWindowOfParameters();
					// Делаем кнопку активной
				document.getElementById("strengthAnalysis").disabled = false;
				document.getElementById("closePlane").disabled = true;
			});
}