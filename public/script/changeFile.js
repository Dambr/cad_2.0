function changeFile(files){
	let file = files[files.length - 1];
	let reader = new FileReader();
	reader.onload = function(event){
		let contents = event.target.result;
		try{
			let text = JSON.parse(contents);
			// document.getElementById("statusJSON").textContent = "OK, Проходит валидацию json";
			document.getElementById("statusJSON").textContent = "\u2713";
			document.getElementById("label").title = "Валидный JSON"
			document.getElementById("statusJSON").style.color = "green";
			document.getElementById("model").value = JSON.stringify(text);
			document.getElementById("submit").style.display = "inline-block";
		}
		catch(e){
			// document.getElementById("statusJSON").textContent = "Модель не проходит валидацию JSON";
			document.getElementById("statusJSON").textContent = "\u2718";
			document.getElementById("label").title = "Не проходит валидацию JSON"
			document.getElementById("statusJSON").style.color = "red";
			document.getElementById("submit").style.display = "none";
		}
	}
	reader.onerror = function(event){
		alert("Ошибка чтения файла");
		console.error("Error", event.target.error.code);
	}
	reader.readAsText(file);
}
function choiseServerModel(){
	let model = document.getElementById("selectServerModels").options[document.getElementById("selectServerModels").options.selectedIndex].textContent;
	if (document.getElementById("selectServerModels").options.selectedIndex != 0){	// Индекс не равен 0
		document.getElementById("sendServerModel").style.display = "inline-block";
		document.getElementById("sendServerModel").href = document.location + model;
	}
	else{
		document.getElementById("sendServerModel").style.display = "none";
	}
}