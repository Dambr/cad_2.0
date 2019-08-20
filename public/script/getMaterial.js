let materials = JSON.parse(document.getElementById("myMaterials").textContent);
for (let key in materials){
	let material = document.createElement("option");
	material.value = key;
	material.text  = materials[key].Name;
	document.getElementById("materials").appendChild(material);
}
let zeroMaterial = document.getElementById("materials").options[0].value;
document.getElementById("strengthValue").textContent = String(materials[zeroMaterial].Strength);

function materialsChange(){
	let index = document.getElementById("materials").options.selectedIndex;
	let material = document.getElementById("materials").options[index].value;
	let strength = materials[material].Strength;
	if (material == "myMaterial"){
		let _strength = prompt("Прочность материала:", materials.myMaterial.Strength);
		if (_strength != null && String(Number(_strength)) != "NaN" && Number(_strength) > 0){
			strength = _strength;
		}
		else{
			alert("Недопустимое значение прочности материала.\nЗначение будет присвоено = " + materials.myMaterial.Strength)
		}
	}
	document.getElementById("strengthValue").textContent = strength;
}