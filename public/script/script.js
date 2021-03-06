window.onload = function(){
	var text;
	try{
		text = JSON.parse(document.getElementById("text").textContent);
	}
	catch(e){
		document.getElementById("loading").textContent = "Модель не проходит валидацию JSON";
		return;
	}
	// Изменяем title страницы
	document.title = text.Name;
	
	document.getElementById("loading").style.display = "none";

	var width = window.innerWidth * 0.6 - 10;
	var height = window.innerHeight - 20;
	canvas = document.getElementById("canvas");
	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);

	renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x000000);
	
	//var scene = new THREE.Scene();
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000); // св-во камеры aspect
	camera.position.set(0, 0, 1000);
	

	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);

	var objects = [];

	// let material = new THREE.MeshBasicMaterial({
	// 		color: 0xffffff,
	// 		vertexColors: THREE.FaceColors,
	// 		wireframe: true
	// 	});

	let material = new THREE.MeshNormalMaterial({});
	
	function reParameter(formula){
		if (text.Parameter){
			for (let i in text.Parameter){
				while (formula.indexOf(String(i)) > -1){
					formula = formula.replace(String(i), String(text.Parameter[i]));
				}
			}
		}
		return formula;
	}
	
	function rekurs(txt){
		for (i in txt.Geometry){
			for (j in txt.Geometry[i].Geometry){
				if (!("Type" in txt.Geometry[i].Geometry[j])){
					rekurs(txt.Geometry[i]);
				}
				else{
					objects.push({});
					objects[objects.length - 1].Name = txt.Geometry[i].Geometry[j].Name;
					
					switch(txt.Geometry[i].Geometry[j].Type){
						case("Cylinder"):
							var RadiusTop      = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(RadiusTop) == "string"){
								RadiusTop = eval(reParameter(RadiusTop.split("Formula:")[1]));
							}
							var RadiusBottom   = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(RadiusBottom) == "string"){
								RadiusBottom = eval(reParameter(RadiusBottom.split("Formula:")[1]));
							}
							var Height         = txt.Geometry[i].Geometry[j].Height;
							if (typeof(Height) == "string"){
								Height = eval(reParameter(Height.split("Formula:")[1]));
							}
							var RadialSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(RadialSegments) == "string"){
								RadialSegments = eval(reParameter(RadialSegments.split("Formula:")[1]));
							}
							//var HeightSegments = Math.round(2 * RadiusTop / Height);
							//var HeightSegments = txt.Geometry[i].Geometry[j].Grade;
							var HeightSegments = txt.Geometry[i].Geometry[j].HeightSegments;
							if (typeof(HeightSegments) == "string"){
								HeightSegments = eval(reParameter(HeightSegments.split("Formula:")[1]));
							}
							var OpenEnded      = txt.Geometry[i].Geometry[j].OpenEnded;
							if (typeof(OpenEnded) == "string"){
								OpenEnded = eval(reParameter(OpenEnded.split("Formula:")[1]));
							}
							var ThetaStart     = txt.Geometry[i].Geometry[j].ThetaStart;
							if (typeof(ThetaStart) == "string"){
								ThetaStart = eval(reParameter(ThetaStart.split("Formula:")[1]));
							}
							var ThetaLength    = txt.Geometry[i].Geometry[j].ThetaLength;
							if (typeof(ThetaLength) == "string"){
								ThetaLength = eval(reParameter(ThetaLength.split("Formula:")[1]));
							}

							objects[objects.length - 1].Geometry = new CreateCylinder({
								RadiusTop      : RadiusTop,
								RadiusBottom   : RadiusBottom,
								Height         : Height,
								RadialSegments : RadialSegments,
								HeightSegments : HeightSegments,
								OpenEnded      : OpenEnded,
								ThetaStart     : ThetaStart,
								ThetaLength    : ThetaLength
							});
							
							objects[objects.length - 1].Geometry = new THREE.Mesh(objects[objects.length - 1].Geometry, material);
							break;

						
						case("Conus"):
							var RadiusTop      = txt.Geometry[i].Geometry[j].RadiusTop;
							if (typeof(RadiusTop) == "string"){
								RadiusTop = eval(reParameter(RadiusTop.split("Formula:")[1]));
							}
							var RadiusBottom   = txt.Geometry[i].Geometry[j].RadiusBot;
							if (typeof(RadiusBottom) == "string"){
								RadiusBottom = eval(reParameter(RadiusBottom.split("Formula:")[1]));
							}
							var Height         = txt.Geometry[i].Geometry[j].Height;
							if (typeof(Height) == "string"){
								Height = eval(reParameter(Height.split("Formula:")[1]));
							}
							var RadialSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(RadialSegments) == "string"){
								RadialSegments = eval(reParameter(RadialSegments.split("Formula:")[1]));
							}
							var HeightSegments = txt.Geometry[i].Geometry[j].HeightSegments;
							if (typeof(HeightSegments) == "string"){
								HeightSegments = eval(reParameter(HeightSegments.split("Formula:")[1]));
							}
							var OpenEnded      = txt.Geometry[i].Geometry[j].OpenEnded;
							if (typeof(OpenEnded) == "string"){
								OpenEnded = eval(reParameter(OpenEnded.split("Formula:")[1]));
							}
							var ThetaStart     = txt.Geometry[i].Geometry[j].ThetaStart;
							if (typeof(ThetaStart) == "string"){
								ThetaStart = eval(reParameter(ThetaStart.split("Formula:")[1]));
							}
							var ThetaLength    = txt.Geometry[i].Geometry[j].ThetaLength;
							if (typeof(ThetaLength) == "string"){
								ThetaLength = eval(reParameter(ThetaLength.split("Formula:")[1]));
							}

							objects[objects.length - 1].Geometry = new CreateCylinder({
								RadiusTop      : RadiusTop,
								RadiusBottom   : RadiusBottom,
								Height         : Height,
								RadialSegments : RadialSegments,
								HeightSegments : HeightSegments,
								OpenEnded      : OpenEnded,
								ThetaStart     : ThetaStart,
								ThetaLength    : ThetaLength
							});

							objects[objects.length - 1].Geometry = new THREE.Mesh(objects[objects.length - 1].Geometry, material);
							break;


						case("Box"):
							var width      = txt.Geometry[i].Geometry[j].A;
							if (typeof(width) == "string"){
								width = eval(reParameter(width.split("Formula:")[1]));
							}
							var height   = txt.Geometry[i].Geometry[j].B;
							if (typeof(height) == "string"){
								height = eval(reParameter(height.split("Formula:")[1]));
							}
							var depth         = txt.Geometry[i].Geometry[j].C;
							if (typeof(depth) == "string"){
								depth = eval(reParameter(depth.split("Formula:")[1]));
							}
							var widthSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(widthSegments) == "string"){
								widthSegments = eval(reParameter(widthSegments.split("Formula:")[1]));
							}
							var heightSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(heightSegments) == "string"){
								heightSegments = eval(reParameter(heightSegments.split("Formula:")[1]));
							}
							var depthSegments      = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(depthSegments) == "string"){
								depthSegments = eval(reParameter(depthSegments.split("Formula:")[1]));
							}
							
							objects[objects.length - 1].Geometry = new CreateBox({
								width         : width,
								height   	  : height,
								depth         : depth,
								widthSegments : widthSegments,
								heightSegments: heightSegments,
								depthSegments : depthSegments
							});

							objects[objects.length - 1].Geometry = new THREE.Mesh(objects[objects.length - 1].Geometry, material);
							break;
						case("Cone"):
							var radius = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(radius) == "string"){
								radius = eval(reParameter(radius.split("Formula:")[1]));
							}
							var height = txt.Geometry[i].Geometry[j].Height;
							if (typeof(height) == "string"){
								height = eval(reParameter(height.split("Formula:")[1]));
							}
							var radialSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(radialSegments) == "string"){
								radialSegments = eval(reParameter(radialSegments.split("Formula:")[1]));
							}
							var heightSegments = txt.Geometry[i].Geometry[j].HeightSegments;
							if (typeof(heightSegments) == "string"){
								heightSegments = eval(reParameter(heightSegments.split("Formula:")[1]));
							}
							var openEnded = txt.Geometry[i].Geometry[j].OpenEnded;
							if (typeof(openEnded) != "boolean"){
								openEnded = false;
							}
							var thetaStart = txt.Geometry[i].Geometry[j].ThetaStart;
							if (typeof(thetaStart) == "string"){
								thetaStart = eval(reParameter(thetaStart.split("Formula:")[1]));
							}
							var thetaLength = txt.Geometry[i].Geometry[j].ThetaLength;
							if (typeof(thetaStart) == "string"){
								thetaLength = eval(reParameter(thetaLength.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateCone({
								radius 			: radius,
								height 			: height,
								radialSegments 	: radialSegments,
								heightSegments 	: heightSegments,
								openEnded 		: openEnded,
								thetaStart 		: thetaStart,
								thetaLength 	: ThetaLength
							});
							break;
						case("Dodecahedron"):
							var radius = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(radius) == "string"){
								radius = eval(reParameter(radius.split("Formula:")[1]));
							}
							var detail = txt.Geometry[i].Geometry[j].Detail;
							if (typeof(detail) == "string"){
								detail = eval(reParameter(detail.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateDodecahedron({
								radius 			: radius,
								detail 			: detail
							});
							break;
						case("Icosahedron"):
							var radius = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(radius) == "string"){
								radius = eval(reParameter(radius.split("Formula:")[1]));
							}
							var detail = txt.Geometry[i].Geometry[j].Detail;
							if (typeof(detail) == "string"){
								detail = eval(reParameter(detail.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateIcosahedron({
								radius 			: radius,
								detail 			: detail
							});
							break;
						case("Extrude"):
							var shape = new THREE.Shape();
							var points = txt.Geometry[i].Geometry[j].Points;
							for (var k = 0; k < points.length; k ++){
								if (typeof(points[k][0]) == "string"){
									points[k][0] = eval(reParameter(points[k][0].split("Formula:")[1]));
								}
								if (typeof(points[k][1]) == "string"){
									points[k][1] = eval(reParameter(points[k][1].split("Formula:")[1]));
								}
							}
							shape.moveTo( points[0][0], points[0][1] );
							for (var k = 1; k < points.length; k ++){
								shape.lineTo( points[k][0], points[k][1] );
							}
							shape.lineTo( points[0][0], points[0][1] );
							

							var curveSegments = txt.Geometry[i].Geometry[j].CurveSegments;
							if (typeof(curveSegments) == "string"){
								curveSegments = eval(reParameter(curveSegments.split("Formula:")[1]));
							}
							var steps = txt.Geometry[i].Geometry[j].Steps;
							if (typeof(steps) == "string"){
								steps = eval(reParameter(steps.split("Formula:")[1]));
							}
							var depth = txt.Geometry[i].Geometry[j].Depth;
							if (typeof(depth) == "string"){
								depth = eval(reParameter(depth.split("Formula:")[1]));
							}
							var bevelEnabled = txt.Geometry[i].Geometry[j].BevelEnabled;
							if (typeof(bevelEnabled) != "boolean"){
								bevelEnabled = true;
							}
							var bevelThickness = txt.Geometry[i].Geometry[j].BevelThickness;
							if (typeof(bevelThickness) == "string"){
								bevelThickness = eval(reParameter(bevelThickness.split("Formula:")[1]));
							}
							var bevelSize = txt.Geometry[i].Geometry[j].BevelSize;
							if (typeof(bevelSize) == "string"){
								bevelSize = eval(reParameter(bevelSize.split("Formula:")[1]));
							}
							var bevelOffset = txt.Geometry[i].Geometry[j].BevelOffset;
							if (typeof(bevelOffset) == "string"){
								bevelOffset = eval(reParameter(bevelOffset.split("Formula:")[1]));
							}
							var bevelSegments = txt.Geometry[i].Geometry[j].BevelSegments;
							if (typeof(bevelSegments) == "string"){
								bevelSegments = eval(reParameter(bevelSegments.split("Formula:")[1]));
							}
							var settings = {
								curveSegments		: curveSegments,
								steps 				: steps,
								depth 				: depth,
								bevelEnabled 		: bevelEnabled,
								bevelThickness 		: bevelThickness,
								bevelSize 			: bevelSize,
								bevelOffset 		: bevelOffset,
								bevelSegments 		: bevelSegments
							}
							objects[objects.length - 1].Geometry = new CreateExtrude({
								shape 			: shape,
								settings		: settings
							});
							break;
						case("Lathe"):
							var points = txt.Geometry[i].Geometry[j].Points;
							// console.info(points);
							for (var k = 0; k < points.length; k ++){
								if (typeof(points[k][0]) == "string"){
									points[k][0] = eval(reParameter(points[k][0].split("Formula:")[1]));
								}
								if (typeof(points[k][1]) == "string"){
									points[k][1] = eval(reParameter(points[k][1].split("Formula:")[1]));
								}
							}
							// console.info(points);
							for (var k = 0; k < points.length; k ++){
								points[k] = new THREE.Vector2(points[k][0], points[k][1]);
							}
							var segments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(segments) == "string"){
								segments = eval(reParameter(segments.split("Formula:")[1]));
							}
							var phiStart = txt.Geometry[i].Geometry[j].PhiStart;
							if (typeof(phiStart) == "string"){
								phiStart = eval(reParameter(phiStart.split("Formula:")[1]));
							}
							var phiLength = txt.Geometry[i].Geometry[j].PhiLength;
							if (typeof(phiLength) == "string"){
								phiLength = eval(reParameter(phiLength.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateLathe({
								points 			: points,
								segments		: segments,
								phiStart		: phiStart,
								phiLength		: phiLength
							});
							break;
						case("Octahedron"):
							var radius = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(radius) == "string"){
								radius = eval(reParameter(radius.split("Formula:")[1]));
							}
							var detail = txt.Geometry[i].Geometry[j].Detail;
							if (typeof(detail) == "string"){
								detail = eval(reParameter(detail.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateOctahedron({
								radius 			: radius,
								detail 			: detail
							});
							break;
						case("Sphere"):
							var radius = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(radius) == "string"){
								radius = eval(reParameter(radius.split("Formula:")[1]));
							}
							var widthSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(widthSegments) == "string"){
								widthSegments = eval(reParameter(widthSegments.split("Formula:")[1]));
							}
							var heightSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(heightSegments) == "string"){
								heightSegments = eval(reParameter(heightSegments.split("Formula:")[1]));
							}
							var phiStart = txt.Geometry[i].Geometry[j].PhiStart;
							if (typeof(phiStart) == "string"){
								phiStart = eval(reParameter(phiStart.split("Formula:")[1]));
							}
							var phiLength = txt.Geometry[i].Geometry[j].PhiLength;
							if (typeof(phiLength) == "string"){
								phiLength = eval(reParameter(phiLength.split("Formula:")[1]));
							}
							var thetaStart = txt.Geometry[i].Geometry[j].ThetaStart;
							if (typeof(thetaStart) == "string"){
								thetaStart = eval(reParameter(thetaStart.split("Formula:")[1]));
							}
							var thetaLength = txt.Geometry[i].Geometry[j].ThetaLength;
							if (typeof(thetaLength) == "string"){
								thetaLength = eval(reParameter(thetaLength.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateSphere({
								radius 			: radius,
								widthSegments	: widthSegments,
								heightSegments 	: heightSegments,
								phiStart 		: phiStart,
								phiLength 		: phiLength,
								thetaStart 		: thetaStart,
								thetaLength 	: thetaLength
							});
							break;
						case("Tetrahedron"):
							var radius = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(radius) == "string"){
								radius = eval(reParameter(radius.split("Formula:")[1]));
							}
							var detail = txt.Geometry[i].Geometry[j].Detail;
							if (typeof(detail) == "string"){
								detail = eval(reParameter(detail.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateTetrahedron({
								radius 			: radius,
								detail 			: detail
							});
							break;
						case("Torus"):
							var radius = txt.Geometry[i].Geometry[j].Radius;
							if (typeof(radius) == "string"){
								radius = eval(reParameter(radius.split("Formula:")[1]));
							}
							var tube = txt.Geometry[i].Geometry[j].Tube;
							if (typeof(tube) == "string"){
								tube = eval(reParameter(tube.split("Formula:")[1]));
							}
							var radialSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(radialSegments) == "string"){
								radialSegments = eval(reParameter(radialSegments.split("Formula:")[1]));
							}
							var tubularSegments = txt.Geometry[i].Geometry[j].Grade;
							if (typeof(tubularSegments) == "string"){
								tubularSegments = eval(reParameter(tubularSegments.split("Formula:")[1]));
							}
							// console.info('radialSegments', radialSegments);
							// console.info('tubularSegments', tubularSegments);
							var arc = txt.Geometry[i].Geometry[j].Arc;
							if (typeof(arc) == "string"){
								arc = eval(reParameter(arc.split("Formula:")[1]));
							}
							objects[objects.length - 1].Geometry = new CreateTorus({
								radius 			: radius,
								tube 			: tube,
								radialSegments 	: radialSegments,
								tubularSegments : tubularSegments,
								arc 			: arc 
							});
							break;
					}
					var pos_rot = ["PositionX", "PositionY", "PositionZ", "RotationX", "RotationY", "RotationZ"];
					for (k in pos_rot){
						if (pos_rot[k] in txt.Geometry[i].Geometry[j]){
							if (typeof(txt.Geometry[i].Geometry[j][pos_rot[k]]) == "string"){
								objects[objects.length - 1][pos_rot[k]] = eval(reParameter(txt.Geometry[i].Geometry[j][pos_rot[k]].split("Formula:")[1]));
							}else{
								objects[objects.length - 1][pos_rot[k]] = txt.Geometry[i].Geometry[j][pos_rot[k]];
							}
						}
					}
					if (objects[objects.length - 1].PositionX){
						objects[objects.length - 1].Geometry.position.x = objects[objects.length - 1].PositionX;
					}
					if (objects[objects.length - 1].PositionY){
						objects[objects.length - 1].Geometry.position.y = objects[objects.length - 1].PositionY;
					}
					if (objects[objects.length - 1].PositionZ){
						objects[objects.length - 1].Geometry.position.z = objects[objects.length - 1].PositionZ;
					}
					if (objects[objects.length - 1].RotationX){
						objects[objects.length - 1].Geometry.rotation.x = objects[objects.length - 1].RotationX;
					}
					if (objects[objects.length - 1].RotationY){
						objects[objects.length - 1].Geometry.rotation.y = objects[objects.length - 1].RotationY;
					}
					if (objects[objects.length - 1].RotationZ){
						objects[objects.length - 1].Geometry.rotation.z = objects[objects.length - 1].RotationZ;
					}
					objects[objects.length - 1].Geometry = THREE.CSG.toCSG(objects[objects.length - 1].Geometry);
				}
			}
		}
	}

	var merg = [];

	function _rekurs(txt){
		for (i in txt.Geometry){
			if (txt.Geometry[i].Merger){
				merg.push([txt.Geometry[i].Name, txt.Geometry[i].Merger]);
				objects.push({});
				objects[objects.length - 1].Name = txt.Geometry[i].Name;
			}
			for (j in txt.Geometry[i].Geometry){
				if (!("Type" in txt.Geometry[i].Geometry[j])){
					merg.push("+");
					_rekurs(txt.Geometry[i]);
					merg.push("+");
				}
			}
			
		}
	}

	rekurs(text);
	_rekurs(text);

	// удаляем одинаковые объекты
	for (i = 0; i < objects.length; i ++){
		for (j = 0; j < i; j ++){
			if (objects[j].Name == objects[i].Name){
				objects.splice(j, 1);
				i --;
			}
		}
	}

	count_plus = 0;
	for (i = 0; i < merg.length; i ++){
		if (merg[i] == "+"){
			count_plus ++;
		}
	}
	if (count_plus > 1){
		merg[merg.indexOf("+", merg.indexOf("+") + 1)] = merg[merg.indexOf("+") - 1];
		merg.splice(merg.indexOf("+") - 1, 2);
	}

	for (i in merg){
		for (j in objects){
			if (objects[j].Name == merg[i][0]){
				for (h in merg[i][1]){
					for (g in objects){
						if(merg[i][1][h].First == objects[g].Name){
							for (f in objects){
								if (merg[i][1][h].Second == objects[f].Name){
									switch(merg[i][1][h].Type){
										case("subtract"):
											objects[j].Geometry = objects[g].Geometry.subtract(objects[f].Geometry);
											break;
										case("union"):
											objects[j].Geometry = objects[g].Geometry.union(objects[f].Geometry);
											break;
										case("intersect"):
											objects[j].Geometry = objects[g].Geometry.intersect(objects[f].Geometry);
											break;
									}
								}
							}
						}
					}
				}
			}
		}
	}

	for (i in objects){
		objects[i].Geometry = THREE.CSG.fromCSG( objects[i].Geometry );
	}

	for (i in objects){
		objects[i].Geometry = new THREE.Mesh(objects[i].Geometry, material);
	}
	
	function rekurs2(txt){
		for (i in txt.Geometry){
			var pos_rot = ["PositionX", "PositionY", "PositionZ", "RotationX", "RotationY", "RotationZ"];
			for (k in pos_rot){
				if (typeof(txt.Geometry[i][pos_rot[k]]) == "string"){
					for (h in objects){
						if (txt.Geometry[i].Name == objects[h].Name){
							objects[h][pos_rot[k]] = eval(reParameter(txt.Geometry[i][pos_rot[k]].split("Formula:")[1]));
						}
					}
				}
				else{
					for (h in objects){
						if (txt.Geometry[i].Name == objects[h].Name){
							objects[h][pos_rot[k]] = txt.Geometry[i][pos_rot[k]];
							if (objects[h].PositionX){
								objects[h].Geometry.position.x = objects[h].PositionX;
							}
							if (objects[h].PositionY){
								objects[h].Geometry.position.y = objects[h].PositionY;
							}
							if (objects[h].PositionZ){
								objects[h].Geometry.position.z = objects[h].PositionZ;
							}
							if (objects[h].RotationX){
								objects[h].Geometry.rotation.x = objects[h].RotationX;
							}
							if (objects[h].RotationY){
								objects[h].Geometry.rotation.y = objects[h].RotationY;
							}
							if (objects[h].RotationZ){
								objects[h].Geometry.rotation.z = objects[h].RotationZ;
							}
						}
					}
				}	
			}
			for (j in txt.Geometry[i].Geometry){
				if (!("Type" in txt.Geometry[i].Geometry[j])){
					rekurs2(txt.Geometry[i]);
				}
			}
		}
	}
	rekurs2(text);

	if (text.Merger){
		objects.push({});
		objects[objects.length - 1].Name = text.Name;
		for (i in text.Merger){
			for (j in objects){
				if (text.Merger[i].First == objects[j].Name){
					for (h in objects){
						if (text.Merger[i].Second == objects[h].Name){
							switch(text.Merger[i].Type){
								case("subtract"):
									if (objects[j].Name != objects[objects.length - 1].Name){
										objects[j].Geometry = THREE.CSG.toCSG(objects[j].Geometry);
									}
									objects[h].Geometry = THREE.CSG.toCSG(objects[h].Geometry);
									objects[objects.length - 1].Geometry = objects[j].Geometry.subtract(objects[h].Geometry);
									break;
								case("union"):
									if (objects[j].Name != objects[objects.length - 1].Name){
										objects[j].Geometry = THREE.CSG.toCSG(objects[j].Geometry);
									}
									objects[h].Geometry = THREE.CSG.toCSG(objects[h].Geometry);
									objects[objects.length - 1].Geometry = objects[j].Geometry.union(objects[h].Geometry);
									break;
								case("intersect"):
									if (objects[j].Name != objects[objects.length - 1].Name){
										objects[j].Geometry = THREE.CSG.toCSG(objects[j].Geometry);
									}
									objects[h].Geometry = THREE.CSG.toCSG(objects[h].Geometry);
									objects[objects.length - 1].Geometry = objects[j].Geometry.intersect(objects[h].Geometry);
									break;
							}
						}
					}
				}
			}
		}
		
		objects[objects.length - 1].Geometry = THREE.CSG.fromCSG( objects[objects.length - 1].Geometry );
		objects[objects.length - 1].Geometry = new THREE.Mesh(objects[objects.length - 1].Geometry, material);
	}
	if (text.PositionX != undefined){
		if (typeof(text.PositionX) == "string"){
			objects[objects.length - 1].Geometry.position.x = eval(reParameter(text.PositionX.split("Formula:")[1]));
		}
		else{
			objects[objects.length - 1].Geometry.position.x = text.PositionX;
		}
	}
	if (text.PositionY != undefined){
		//objects[objects.length - 1].Geometry.position.y = text.PositionY;
		if (typeof(text.PositionY) == "string"){
			objects[objects.length - 1].Geometry.position.y = eval(reParameter(text.PositionY.split("Formula:")[1]));
		}
		else{
			objects[objects.length - 1].Geometry.position.y = text.PositionY;
		}
	}
	if (text.PositionZ != undefined){
		//objects[objects.length - 1].Geometry.position.z = text.PositionZ;
		if (typeof(text.PositionZ) == "string"){
			objects[objects.length - 1].Geometry.position.z = eval(reParameter(text.PositionZ.split("Formula:")[1]));
		}
		else{
			objects[objects.length - 1].Geometry.position.z = text.PositionZ;
		}
	}
	if (text.RotationX != undefined){
		//objects[objects.length - 1].Geometry.rotation.x = text.RotationX;
		if (typeof(text.RotationX) == "string"){
			objects[objects.length - 1].Geometry.rotation.x = eval(reParameter(text.RotationX.split("Formula:")[1]));
		}
		else{
			objects[objects.length - 1].Geometry.rotation.x = text.RotationX;
		}
	}
	if (text.RotationY != undefined){
		//objects[objects.length - 1].Geometry.rotation.y = text.RotationY;
		if (typeof(text.RotationY) == "string"){
			objects[objects.length - 1].Geometry.rotation.y = eval(reParameter(text.RotationY.split("Formula:")[1]));
		}
		else{
			objects[objects.length - 1].Geometry.rotation.y = text.RotationY;
		}
	}
	if (text.RotationZ != undefined){
		if (typeof(text.RotationZ) == "string"){
			objects[objects.length - 1].Geometry.rotation.z = eval(reParameter(text.RotationZ.split("Formula:")[1]));
		}
		else{
			objects[objects.length - 1].Geometry.rotation.z = text.RotationZ;
		}
	}

	MAINMESH = objects[objects.length - 1].Geometry;
	MAINMESH.name = "MAINMESH";
	scene.add(objects[objects.length - 1].Geometry);
	

	//		Управление мышью
	// Зум
	
	camera.lookAt(0,0,0);
	document.getElementById("canvas").addEventListener("wheel", function(e){
		var delta = e.deltaY || e.detail || e.wheelDelta;
		camera.position.z += delta / 5;
	});


	var x1 = undefined;
	var y1 = undefined;
	var degz0 = 0;
	var degx0 = 0;
	var degy0 = 0;
	var x0    = 0;
	var y0    = 0; 

	document.getElementById("canvas").addEventListener("mousedown", function(e){
		x1 = e.clientX;
		y1 = e.clientY;
		degz0 = scene.rotation.z;
		degx0 = scene.rotation.x;
		degy0 = scene.rotation.y;
	});

	document.getElementById("canvas").addEventListener("mousemove", function(e){
		if (x1 - e.clientX || y1 - e.clientY){
			// // Горизонталь
			Math.floor(scene.rotation.x / Math.PI) % 2 == 0 ? scene.rotation.z = degz0 + (x1 - e.clientX) / 100 : scene.rotation.z = degz0 - (x1 - e.clientX) / 100;
			
			// Вертикаль
			scene.rotation.x = degx0 - (y1 - e.clientY) / 100;
			
		}
	});
	
	document.getElementById("canvas").addEventListener("mouseup", function(e){
		x1 = undefined;
		y1 = undefined;
	});
	document.getElementById("canvas").addEventListener("mouseover", function(e){
		x1 = undefined;
		y1 = undefined;
	});

	function loop(){
		
		requestAnimationFrame(function(){loop();});
		renderer.render(scene, camera);
		//							Зум кнопками
		(function zoom(){
			document.onkeydown = function(e){
				if (e.keyCode === 187) camera.position.z -= 15;
				else if (e.keyCode === 189) camera.position.z += 15;
			}
		})();
//
		/*
		//							вращение сцены
		(function rotateAll(){
			var rotateX = 0;
			var rotateY = 0;
			var rotateZ = 0;
			document.onkeydown = function(e){
				if (e.keyCode === 37) rotateY -= Math.PI/180;
				else if (e.keyCode === 38) rotateX -= Math.PI/180;
				else if (e.keyCode === 39) rotateY += Math.PI/180;
				else if (e.keyCode === 40) rotateX += Math.PI/180;
				else if (e.keyCode === 188) rotateZ += Math.PI/180;
				else if (e.keyCode === 190) rotateZ -= Math.PI/180;
				scene.rotation.x += rotateX;
				scene.rotation.y += rotateY;
				scene.rotation.z += rotateZ;
			}
		})();
		*/
//
	}
	loop();
}
window.onresize = function(){
	var width = window.innerWidth * 0.6 - 10;
	var height = window.innerHeight - 20;
	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);
	// camera.aspect = width/height;
	renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x000000);
	camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
	camera.position.set(0, 0, 1000);
}