window.addEventListener("load",initialisation,false);

function initialisation(){
	var button = document.getElementById("bouton");
	button.addEventListener("click", verif, false);
}

function verif(){
	var mail = document.getElementById("email");
	if(validateEmail(mail.value)){
		mail.style.background = "none";

		var nom = document.getElementById("nom").value,
		sujet = document.getElementById("sujet").value,
		message = document.getElementById("message").value;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "mail.php", true);
    	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("nom="+nom+"&mail="+mail.value+"&sujet="+sujet+"&message="+message);


		xhr.onreadystatechange = function() {
        	if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                if(xhr.responseText == 'true'){
                	document.getElementById('valid').style.display = "block";
                }
                else{
                	document.getElementById('error').style.display = "block";
                }
        	}
		};

	}
	else{
		mail.style.background = "#AB0032";
	}
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
