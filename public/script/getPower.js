function powerChange(){
	document.getElementById("powerValue").textContent = Number(document.getElementById("changeMinPower").value) + Number(document.getElementById("power").value) * (Number(document.getElementById("changeMaxPower").value) - Number(document.getElementById("changeMinPower").value)) + document.getElementById("selectMeasure").options[document.getElementById("selectMeasure").options.selectedIndex].textContent;
}
function changeMaxPower(){
	document.getElementById("changeMinPower").max = document.getElementById("changeMaxPower").value;
	// Перезаписать текущее значение действующей силы
	document.getElementById("powerValue").textContent = Number(document.getElementById("changeMinPower").value) + Number(document.getElementById("power").value) * (Number(document.getElementById("changeMaxPower").value) - Number(document.getElementById("changeMinPower").value)) + document.getElementById("selectMeasure").options[document.getElementById("selectMeasure").options.selectedIndex].textContent;
}
function changeMinPower(){
	document.getElementById("changeMaxPower").min = document.getElementById("changeMinPower").value;
	// Перезаписать текущее значение действующей силы
	document.getElementById("powerValue").textContent = Number(document.getElementById("changeMinPower").value) + Number(document.getElementById("power").value) * (Number(document.getElementById("changeMaxPower").value) - Number(document.getElementById("changeMinPower").value)) + document.getElementById("selectMeasure").options[document.getElementById("selectMeasure").options.selectedIndex].textContent;
}
function measureChange(){
	let index = document.getElementById("selectMeasure").options.selectedIndex;
	let measure = document.getElementById("selectMeasure").options[index].textContent;
	document.getElementById("powerValue").textContent = Number(document.getElementById("changeMinPower").value) + Number(document.getElementById("power").value) * (Number(document.getElementById("changeMaxPower").value) - Number(document.getElementById("changeMinPower").value)) + measure;
};
measureChange();