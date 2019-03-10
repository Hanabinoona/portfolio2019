var input = document.querySelector('#input-hexa');
var body = document.querySelector('body');
var caracteresRempli ="";

document.onkeydown = function (event){
  event = event || window.event; //Fix pour IE
  var code = event.keyCode || event.which; //code ascii de la touche
  if( code === 13)
  {
    //console.log('tu as reussi');// voir si on prend bien en compte la touche
    caracteresRempli = input.value; // récupere ce qu'on vient d'écrire dans l'input
    //alert(caracteresRempli); // montre ce qu'on a écrit dans l'input

    if(caracteresRempli.charAt(0) === "#"){
      //alert("j'ai un # ");
      body.style.backgroundColor = caracteresRempli; // on donne la couleur donnée au body
    } else{
      //alert(" je n'ai pas de # ");
      body.style.backgroundColor = "#"+ caracteresRempli; // on donne la couleur donnée au body
    }
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("stockHexa", caracteresRempli);// Store
    }
  }
  else{
    //console.log('mauvaise touche');
  }
};


if (typeof(Storage) !== "undefined") {
  body.style.backgroundColor = localStorage.getItem("stockHexa");
  document.getElementById("input-hexa").value = localStorage.getItem("stockHexa");
}
