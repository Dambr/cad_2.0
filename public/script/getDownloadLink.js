function getDownloadLink(){
	let a = document.createElement("a");
	let type = "data:application/octet-stream;base64, ";
	let text = JSON.stringify(JSON.parse(document.getElementById("text").textContent), null, 4);
	let base = btoa(text);
	let res = type + base;
	a.setAttribute("href", res);
	a.setAttribute("download", (JSON.parse(text)).Name + ".json")
	let button = document.createElement("button");
	button.setAttribute("id", "downloadButton");
	button.textContent = "Скачать модель .json"

	a.appendChild(button);
	document.getElementById("buttonContainer5").appendChild(a);

	let p = document.createElement("p");
	p.textContent = "Скачать файл модели в формате JSON для дальнейшего использования или изменения для получения других информационных моделей при затрате меньших временных ресурсов и трудоемкости.";
	document.getElementById("buttonContainer5").appendChild(p);
	// document.querySelector("body").appendChild(a);
}
function goToMain(){
	
}
getDownloadLink();