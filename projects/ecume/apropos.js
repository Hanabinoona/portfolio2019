window.addEventListener("load",initialisation,false);

var h2;

function initialisation(){
	h2 = document.getElementsByClassName("h2");
	console.log(h2);

	for(var i = 0; i < h2.length; i++){
		h2[i].addEventListener("click", detect, false);
	}
	//h2.addEventListener("click",detect,false);
}

function detect(){
	var pConstantin = document.getElementById("pConstantin");
	pConstantin.addEventListener("click", constantin, false);
// console.log(pConstantin);

	var pAlice = document.getElementById("pAlice");
	pAlice.addEventListener("click", alice, false);
// console.log(pAlice);

	var pAlexandre = document.getElementById("pAlexandre");
	pAlexandre.addEventListener("click", alexandre, false);
// console.log(pAlexandre);

	var pLoic = document.getElementById("pLoic");
	pLoic.addEventListener("click", loic, false);
// console.log(pLoic);

	var pAmelie = document.getElementById("pAmelie");
	pAmelie.addEventListener("click", amelie, false);
// console.log(pAmelie);

	var pChloe = document.getElementById("pChloe");
	pChloe.addEventListener("click", chloe, false);
// console.log(pChloe);
}

function constantin(){
	pConstantin.style.display = "block";
	console.log("ici aussi je capte ! constantin")
}

function alice(){
	pAlice.style.display = "block";
	console.log("ici aussi je capte ! alice")
}
function alexandre(){
	pAlexandre.style.display = "block";
	console.log("ici aussi je capte ! alexandre")
}
function loic(){
	pLoic.style.display = "block";
	console.log("ici aussi je capte ! loic")
}
function amelie(){
	pAmelie.style.display = "block";
	console.log("ici aussi je capte ! amelie")
}
function chloe(){
	pChloe.style.display = "block";
	console.log("ici aussi je capte ! chloe")
}

/*
var h2, evt, element;
var p = document.getElementsByTagName("p");
if(element == p.style.display ="none"){
	evt== false;
}
else{
	evt==true;
}
function initialisation(){
	h2 = document.getElementsByTagName("h2");
	console.log("h2");
	if(document.getElementById("body").style.width<= 1000+"px"){
		h2.addEventListener("onMouseOver", dessus, false);
	}	
}

function dessus(){
	if(evt == false){
		p.style.display = "block";
	}
	else{
		p.style.display = "none";
	}
}*/