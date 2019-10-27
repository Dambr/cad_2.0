function closeLegend(){
	document.getElementById("legend").style.display = "none";
	document.getElementById("legend").getElementsByTagName("table")[0].remove();
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
		

		// Удаление предыдущей таблицы
		try{
			document.getElementById("legend").getElementsByTagName("table")[0].remove();
		} catch(e){}

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

				let MaxX = Math.ceil((geometry.boundingBox.max.x - THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)).boundingBox.min.x) / poleParameters.width);
				let MaxY = Math.ceil((geometry.boundingBox.max.y - THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)).boundingBox.min.y) / poleParameters.height);
				let MaxZ = Math.ceil((geometry.boundingBox.max.z - THREE.CSG.fromCSG(THREE.CSG.toCSG(MAINMESH)).boundingBox.min.z) / poleParameters.depth);

				let boundMaxX = geometry.boundingBox.max.x;
				let boundMaxY = geometry.boundingBox.max.y;
				let boundMaxZ = geometry.boundingBox.max.z;

				// let power    = Number(document.getElementById("power").value);
				let power = Number(document.getElementById("powerValue").textContent.replace(String(document.getElementById("selectMeasure").options[document.getElementById("selectMeasure").options.selectedIndex].textContent), "")) / Number(document.getElementById("changeMaxPower").value);
				let strength = Number(document.getElementById("strengthValue").textContent);
				let gradientColor = [];

				// Массив значений коэффициентов запаса прочности
				let S_array = [];
				
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
						}
					}
				}

				// Функция для определения, в какой цвет красить кубик
				function colorByLoad(K, J, I){
					let A = 0;
					switch (document.getElementById("selectedPowerPlane").textContent){
						case "F":
						case "B":
							// k - фиксировано
							for (let j = 0; j < MaxY; j ++){
								for (let i = 0; i < MaxX; i ++){
									if (Pole[K][j][i].boundingBox.max.x !=  Infinity && //
										Pole[K][j][i].boundingBox.max.x != -Infinity && //
										Pole[K][j][i].boundingBox.min.x !=  Infinity && //
										Pole[K][j][i].boundingBox.min.x != -Infinity && // Проверка
										Pole[K][j][i].boundingBox.max.y !=  Infinity && // на существование
										Pole[K][j][i].boundingBox.max.y != -Infinity && // геометрии
										Pole[K][j][i].boundingBox.min.y !=  Infinity && // у кубика
										Pole[K][j][i].boundingBox.min.y != -Infinity && //
										Pole[K][j][i].boundingBox.max.z !=  Infinity && //
										Pole[K][j][i].boundingBox.max.z != -Infinity && //
										Pole[K][j][i].boundingBox.min.z !=  Infinity && //
										Pole[K][j][i].boundingBox.min.z != -Infinity){
										// console.info(Pole[K][j][i]);
										// let material = new THREE.MeshBasicMaterial({
										// 	color: 0xffffff,
										// 	vertexColors: THREE.FaceColors,
										// 	//wireframe: true
										// });
										// let poleParameters = {
										// 	width         : 10,	// x
										// 	height   	  : 10, // y
										// 	depth         : 10, // z
										// 	widthSegments : 1,
										// 	heightSegments: 1,
										// 	depthSegments : 1
										// }

										// let mesh = new THREE.Mesh(new CreateBox(poleParameters), material);
										// // console.info(THREE.CSG.fromCSG(THREE.CSG.toCSG(Pole[k][J][i])));
										// mesh.position.x = Pole[K][j][i].boundingBox.min.x;
										// mesh.position.y = Pole[K][j][i].boundingBox.min.y;
										// mesh.position.z = Pole[K][j][i].boundingBox.min.z;
										// scene.add(mesh);
										// console.info({
										// 	"max.x": Pole[k][J][i].boundingBox.max.x,
										// 	"min.x": Pole[k][J][i].boundingBox.min.x,
										// 	"max.x-min.x": Pole[k][J][i].boundingBox.max.x- Pole[k][J][i].boundingBox.min.x,
										// 	"max.z": Pole[k][J][i].boundingBox.max.z,
										// 	"min.z": Pole[k][J][i].boundingBox.min.z,
										// 	"max.z-min.z": Pole[k][J][i].boundingBox.max.z- Pole[k][J][i].boundingBox.min.z,
										// 	"*": (Pole[k][J][i].boundingBox.max.x - Pole[k][J][i].boundingBox.min.x) * (Pole[k][J][i].boundingBox.max.z - Pole[k][J][i].boundingBox.min.z)
										// });
										
										A += (Pole[K][j][i].boundingBox.max.x - Pole[K][j][i].boundingBox.min.x) * 
											 (Pole[K][j][i].boundingBox.max.z - Pole[K][j][i].boundingBox.min.z);
									}
								}
							}
							break;
						
						case "L":
						case "R":
							for (let k = 0; k < MaxZ; k ++){
								for (let j = 0; j < MaxY; j ++){
									// i - фиксировано
									if (Pole[k][j][I].boundingBox.max.x !==  Infinity && //
										Pole[k][j][I].boundingBox.max.x !== -Infinity && //
										Pole[k][j][I].boundingBox.min.x !==  Infinity && //
										Pole[k][j][I].boundingBox.min.x !== -Infinity && // Проверка
										Pole[k][j][I].boundingBox.max.y !==  Infinity && // на существование
										Pole[k][j][I].boundingBox.max.y !== -Infinity && // геометрии
										Pole[k][j][I].boundingBox.min.y !==  Infinity && // у кубика
										Pole[k][j][I].boundingBox.min.y !== -Infinity && //
										Pole[k][j][I].boundingBox.max.z !==  Infinity && //
										Pole[k][j][I].boundingBox.max.z !== -Infinity && //
										Pole[k][j][I].boundingBox.min.z !==  Infinity && //
										Pole[k][j][I].boundingBox.min.z !== -Infinity){	// Проверка на существование геометрии у кубика
										// console.info(Pole[k][j][I]);
										// let material = new THREE.MeshBasicMaterial({
										// 	color: 0xffffff,
										// 	vertexColors: THREE.FaceColors,
										// 	//wireframe: true
										// });
										// let poleParameters = {
										// 	width         : 10,	// x
										// 	height   	  : 10, // y
										// 	depth         : 10, // z
										// 	widthSegments : 1,
										// 	heightSegments: 1,
										// 	depthSegments : 1
										// }

										// let mesh = new THREE.Mesh(new CreateBox(poleParameters), material);
										// // console.info(THREE.CSG.fromCSG(THREE.CSG.toCSG(Pole[k][J][i])));
										// mesh.position.x = Pole[k][j][I].boundingBox.min.x;
										// mesh.position.y = Pole[k][j][I].boundingBox.min.y;
										// mesh.position.z = Pole[k][j][I].boundingBox.min.z;
										// scene.add(mesh);
										// console.info({
										// 	"max.x": Pole[k][j][I].boundingBox.max.x,
										// 	"min.x": Pole[k][j][I].boundingBox.min.x,
										// 	"max.x-min.x": Pole[k][j][I].boundingBox.max.x- Pole[k][j][I].boundingBox.min.x,
										// 	"max.z": Pole[k][j][I].boundingBox.max.z,
										// 	"min.z": Pole[k][j][I].boundingBox.min.z,
										// 	"max.z-min.z": Pole[k][j][I].boundingBox.max.z- Pole[k][j][I].boundingBox.min.z,
										// 	"*": (Pole[k][j][I].boundingBox.max.x - Pole[k][j][I].boundingBox.min.x) * (Pole[k][j][I].boundingBox.max.z - Pole[k][j][I].boundingBox.min.z)
										// });
										
										A += (Pole[k][j][I].boundingBox.max.y - Pole[k][j][I].boundingBox.min.y) * 
											 (Pole[k][j][I].boundingBox.max.z - Pole[k][j][I].boundingBox.min.z);
									}
								}
							}
							break;
						case "U":
						case "D":
							for (let k = 0; k < MaxZ; k ++){
							// j - фиксировано
								for (let i = 0; i < MaxX; i ++){
									if (Pole[k][J][i].boundingBox.max.x !==  Infinity && //
										Pole[k][J][i].boundingBox.max.x !== -Infinity && //
										Pole[k][J][i].boundingBox.min.x !==  Infinity && //
										Pole[k][J][i].boundingBox.min.x !== -Infinity && // Проверка
										Pole[k][J][i].boundingBox.max.y !==  Infinity && // на существование
										Pole[k][J][i].boundingBox.max.y !== -Infinity && // геометрии
										Pole[k][J][i].boundingBox.min.y !==  Infinity && // у кубика
										Pole[k][J][i].boundingBox.min.y !== -Infinity && //
										Pole[k][J][i].boundingBox.max.z !==  Infinity && //
										Pole[k][J][i].boundingBox.max.z !== -Infinity && //
										Pole[k][J][i].boundingBox.min.z !==  Infinity && //
										Pole[k][J][i].boundingBox.min.z !== -Infinity){


										// console.info(Pole[k][J][i]);
										// let material = new THREE.MeshBasicMaterial({
										// 	color: 0xffffff,
										// 	vertexColors: THREE.FaceColors,
										// 	//wireframe: true
										// });
										// let poleParameters = {
										// 	width         : 10,	// x
										// 	height   	  : 10, // y
										// 	depth         : 10, // z
										// 	widthSegments : 1,
										// 	heightSegments: 1,
										// 	depthSegments : 1
										// }

										// let mesh = new THREE.Mesh(new CreateBox(poleParameters), material);
										// // console.info(THREE.CSG.fromCSG(THREE.CSG.toCSG(Pole[k][J][i])));
										// mesh.position.x = Pole[k][J][i].boundingBox.min.x;
										// mesh.position.y = Pole[k][J][i].boundingBox.min.y;
										// mesh.position.z = Pole[k][J][i].boundingBox.min.z;
										// scene.add(mesh);
										// console.info({
										// 	"max.x": Pole[K][j][i].boundingBox.max.x,
										// 	"min.x": Pole[K][j][i].boundingBox.min.x,
										// 	"max.x-min.x": Pole[K][j][i].boundingBox.max.x- Pole[K][j][i].boundingBox.min.x,
										// 	"max.z": Pole[K][j][i].boundingBox.max.z,
										// 	"min.z": Pole[K][j][i].boundingBox.min.z,
										// 	"max.z-min.z": Pole[K][j][i].boundingBox.max.z- Pole[K][j][i].boundingBox.min.z,
										// 	"*": (Pole[K][j][i].boundingBox.max.x - Pole[K][j][i].boundingBox.min.x) * (Pole[K][j][i].boundingBox.max.z - Pole[K][j][i].boundingBox.min.z)
										// });

										A += (Pole[k][J][i].boundingBox.max.x - Pole[k][J][i].boundingBox.min.x) * 
											 (Pole[k][J][i].boundingBox.max.y - Pole[k][J][i].boundingBox.min.y);
									}
								}
							}
							break;
					}
					
					let N = Number(document.getElementById("powerValue").textContent.replace(String(document.getElementById("selectMeasure").options[document.getElementById("selectMeasure").options.selectedIndex].textContent), "")) / Number(document.getElementById("changeMaxPower").value);
					// В зависимости от выбарнных единиц измерения силы, определяем коэффициент (10 в какой степени)
					N *= 100 * Math.pow(10, Number(document.getElementById("selectMeasure").options.selectedIndex) * 3);

					let sigma = N / (A * Math.pow(10, -6)); // Условимся, что пощадь считаем в мм^2, поэтому чтобы перейти к м^2, надо домножить на 10^6

					let ultimate = Number(document.getElementById("strengthValue").textContent) * Math.pow(10, 6); // прчность указана в мегапаскалях. домножаем на 10^6
					let S = ultimate / sigma;
					if (S < 1){
						return [[1 - S, S, 0], S];
					}
					else{
						return [[0, 1 / S, 1], S];
					}
					
					return [[1, 1, 1], S];

				}
				// Красим модель с разначх сторон в зависимости от выбранной плоскости
				switch (document.getElementById("selectedPowerPlane").textContent){
					case "F":
					case "B":

						for (let k = 0; k < MaxZ; k ++){
							for (let j = 0; j < MaxY; j ++){
								for (let i = 0; i < MaxX; i ++){

									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										// Pole[k][j][i].faces[f].color.setRGB(power, strength, k / (MaxZ - 1));
										Pole[k][j][i].faces[f].color.setRGB(...colorByLoad(k, j, i)[0]);
									}
									// for (let f = 0; f < Pole[MaxZ - 1 - k][j][i].faces.length; f ++){
									// 	// Pole[MaxZ - 1 - k][j][i].faces[f].color.setRGB(power, strength, k / (MaxZ - 1));
									// 	Pole[MaxZ - 1 - k][j][i].faces[f].color.setRGB(...colorByLoad(k, j, i));
									// }
									// gradientColor.push( "rgb(" + Math.floor(255 * power) + "," + Math.floor(255 * strength) + "," + Math.floor(255 * k / (MaxZ - 1)) + ")" );
									
									// gradientColor.push( "rgb(" + Math.floor(255 * colorByLoad(k, j, i)[0]) + "," + Math.floor(255 * colorByLoad(k, j, i)[1]) + "," + Math.floor(255 * colorByLoad(k, j, i)[2]) + ")" );
									gradientColor.push([Math.floor(255 * colorByLoad(k, j, i)[0][0]),
														Math.floor(255 * colorByLoad(k, j, i)[0][1]),
														Math.floor(255 * colorByLoad(k, j, i)[0][2])]);

									S_array.push(Math.floor(colorByLoad(k, j, i)[1]));
								}
							}
						}

						break;
					case "L":
					case "R":
						for (let k = 0; k < MaxZ; k ++){
							for (let j = 0; j < MaxY; j ++){
								for (let i = 0; i < MaxX; i ++){

									// for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
									// 	Pole[k][j][i].faces[f].color.setRGB(power, strength, i / (MaxX - 1));
									// }
									// // for (let f = 0; f < Pole[k][j][MaxX - 1 - i].faces.length; f ++){
									// // 	Pole[k][j][MaxX - 1 - i].faces[f].color.setRGB(power, strength, i / (MaxX - 1));
									// // }
									// gradientColor.unshift( "rgb(" + Math.floor(255 * power) + "," + Math.floor(255 * strength) + "," + Math.floor(255 * i / (MaxX - 1)) + ")" );


									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(...colorByLoad(k, j, i)[0]);
									}
									gradientColor.push([Math.floor(255 * colorByLoad(k, j, i)[0][0]),
														Math.floor(255 * colorByLoad(k, j, i)[0][1]),
														Math.floor(255 * colorByLoad(k, j, i)[0][2])]);

									S_array.push(Math.floor(colorByLoad(k, j, i)[1]));
								}
							}
						}

						break;
					case "U":
					case "D":
						for (let k = 0; k < MaxZ; k ++){
							for (let j = 0; j < MaxY; j ++){
								for (let i = 0; i < MaxX; i ++){

									// for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
									// 	Pole[k][j][i].faces[f].color.setRGB(power, strength, j / (MaxY - 1));
									// }
									// // for (let f = 0; f < Pole[k][MaxY - 1 - j][i].faces.length; f ++){
									// // 	Pole[k][MaxY - 1 - j][i].faces[f].color.setRGB(power, strength, j / (MaxY - 1));
									// // }
									// gradientColor.unshift( "rgb(" + Math.floor(255 * power) + "," + Math.floor(255 * strength) + "," + Math.floor(255 * j / (MaxY - 1)) + ")" );


									for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
										Pole[k][j][i].faces[f].color.setRGB(...colorByLoad(k, j, i)[0]);
									}
									gradientColor.push([Math.floor(255 * colorByLoad(k, j, i)[0][0]),
														Math.floor(255 * colorByLoad(k, j, i)[0][1]),
														Math.floor(255 * colorByLoad(k, j, i)[0][2])]);

									S_array.push(Math.floor(colorByLoad(k, j, i)[1]));
								}
							}
						}

						break;
				/*		
					// case "B":

					// 	for (let k = 0; k < MaxZ / 2; k ++){
					// 		for (let j = 0; j < MaxY; j ++){
					// 			for (let i = 0; i < MaxX; i ++){

					// 				for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
					// 					Pole[k][j][i].faces[f].color.setRGB(power, strength, k / (MaxZ - 1));
					// 				}
					// 				for (let f = 0; f < Pole[MaxZ - 1 - k][j][i].faces.length; f ++){
					// 					Pole[MaxZ - 1 - k][j][i].faces[f].color.setRGB(power, strength, k / (MaxZ - 1));
					// 				}
					// 				gradientColor.push( "rgb(" + Math.floor(255 * power) + "," + Math.floor(255 * strength) + "," + Math.floor(255 * k / (MaxZ - 1)) + ")" );

					// 			}
					// 		}
					// 	}

					// 	break;
					// case "R":
						
					// 	for (let k = 0; k < MaxZ; k ++){
					// 		for (let j = 0; j < MaxY; j ++){
					// 			for (let i = 0; i < MaxX / 2; i ++){

					// 				for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
					// 					Pole[k][j][i].faces[f].color.setRGB(power, strength, i / (MaxX - 1));
					// 				}
					// 				for (let f = 0; f < Pole[k][j][MaxX - 1 - i].faces.length; f ++){
					// 					Pole[k][j][MaxX - 1 - i].faces[f].color.setRGB(power, strength, i / (MaxX - 1));
					// 				}
					// 				gradientColor.unshift( "rgb(" + Math.floor(255 * power) + "," + Math.floor(255 * strength) + "," + Math.floor(255 * i / (MaxX - 1)) + ")" );

					// 			}
					// 		}
					// 	}

					// 	break;
					// case "D":

					// 	for (let k = 0; k < MaxZ; k ++){
					// 		for (let j = 0; j < MaxY / 2; j ++){
					// 			for (let i = 0; i < MaxX; i ++){

					// 				for (let f = 0; f < Pole[k][j][i].faces.length; f ++){
					// 					Pole[k][j][i].faces[f].color.setRGB(power, strength, j / (MaxY - 1));
					// 				}
					// 				for (let f = 0; f < Pole[k][MaxY - 1 - j][i].faces.length; f ++){
					// 					Pole[k][MaxY - 1 - j][i].faces[f].color.setRGB(power, strength, j / (MaxY - 1));
					// 				}
					// 				gradientColor.unshift( "rgb(" + Math.floor(255 * power) + "," + Math.floor(255 * strength) + "," + Math.floor(255 * j / (MaxY - 1)) + ")" );

					// 			}
					// 		}
					// 	}

					// 	break;
				*/
				}


				for (let k = 0; k < MaxZ; k ++){
					for (let j = 0; j < MaxY; j ++){
						for (let i = 0; i < MaxX; i ++){
							Pole[k][j][i] = new THREE.Mesh(Pole[k][j][i], material);
							group.add(Pole[k][j][i]);
						}
					}
				}


					// Окрашиваем легенду
				document.getElementById("legend").style.display = "block";

				document.getElementById("legend").style.bottom = document.getElementById("canvas").height - 300 + 10 + "px";

				document.getElementById("legend").style.backgroundImage = "none";
				
				gradientColor.sort((a, b) => {
					return a[0] - b[0];
				});
				S_array.sort((a, b) => {
					return a - b;
				});


				for (let i = 0; i < gradientColor.length; i ++){
					gradientColor[i] = "rgb(" + gradientColor[i][0] +
									     ", " + gradientColor[i][1] +
									     ", " + gradientColor[i][2] + ")";
				}
				gradientColor = new Set(gradientColor);
				S_array = new Set(S_array);
				S_array = Array.from(S_array);
				S_array.reverse();
				// Построение таблицы с числовыми значениями коэффициентов запаса прочности
				(() => {
					let table = document.createElement("table");
					// console.info(window.innerHeight);
					for (let i = 0; i < S_array.length; i ++){
						let tr = document.createElement("tr");
						let td = document.createElement("td");
						td.height = window.innerHeight / 2 / S_array.length;
						td.textContent = S_array[i];
						tr.appendChild(td);
						table.appendChild(tr);
					}
					document.getElementById("legend").appendChild(table);
				})();
				
				


				

				let backgroundGradient = "";
				for (color of gradientColor){
					backgroundGradient += color + ",";
				}
				// Удаление последней запятой, а то не нарисует
				backgroundGradient = backgroundGradient.substring(0, backgroundGradient.length - 1);

				// Если цвет всего 1, до продублируем его, чтобы построить градиент
				if (gradientColor.size == 1){
					backgroundGradient += ", " + backgroundGradient;
				}

				document.getElementById("legend").style.background = "linear-gradient(" + backgroundGradient + ")";
                


                // document.getElementById("legend").style.backgroundColor = "red";                


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