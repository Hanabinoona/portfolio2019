window.addEventListener("load",initialisation,false);


function initialisation(){
	var button = document.getElementById("button");
	button.addEventListener("click", afficheMenu, false);
	console.log(button);
}

function afficheMenu(){
	  var element = document.getElementById('menu');
	  if (element.style.display == "none")
	  {
	      element.style.display = "block";
	  } else {
	      element.style.display = "none" ;
	  } 	
}


/*
var button, menu;

function initialisation(){
	button = document.getElementById("button");
	console.log(button);

	button.addEventListener("click",click,false);
}

function click(element){
	menu = document.getElementById("menu");
	if(menu.style.marginLeft == -200+"px"){
		menu.style.display = "block";
	}
	else{
		menu.style.display == "none";
	}
}
var button, me, timer, open;

function initialisation(){
	button = document.getElementById("button");
	button.addEventListener("click", detect, false);
}

function detect()
{
	timer= setInterval(bouge, 20);
	me = -200;
	open = false;
}

function bouge(evt){
	if(open == false){
		if(me<-30){
			me+=5;
			var element = document.getElementById('menu');
			element.style.marginLeft = me+"px";
			open=true;
		}
		else{
			clearInterval(timer);
			//open=false;
		}
	}
	else if(open == true){
		if(me>-200){
			me-=5;
			var element = document.getElementById('menu');
			element.style.marginLeft = me+"px";
			open=false;
		}
		else{
			clearInterval(timer);
		}
	}
}*/