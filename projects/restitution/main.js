var input = document.querySelector('#input-surname');
var submit = document.querySelector('#submit');
var caracteresRempli ="";
var surnom = document.querySelector('#surnom');
var stockSurnom;

document.onkeydown = function (event){
  event = event || window.event; //Fix pour IE
  var code = event.keyCode || event.which; //code ascii de la touche
  if( code === 13)
  {
    //console.log('tu as reussi');// voir si on prend bien en compte la touche
    caracteresRempli = input.value; // récupere ce qu'on vient d'écrire dans l'input
    //alert(caracteresRempli); // montre ce qu'on a écrit dans l'input
    /*if (typeof caracteresRempli === 'string') { // vérifie si ce que l'on récupère est bien une chaine de caracteres
      alert('je suis une string'); // si oui, on affiche que oui
    }
    else{
      alert('je ne suis pas une string'); // si non, on affiche que non
    }*/
    //var resultat = caracteresRempli.length; // on regarde la longueur de ce qu'on a mis
    //alert(resultat); // on montre le nombre de caracteres que notre input contient
    //if(caracteresRempli.length >= 3){ // si le nombre est plus grand que 3
    //  alert('plus de 3 - ok'); // si plus grand OK
    //}
    //else{
    //  alert('moins de 3 - pas assez de caracteres'); // si plus petit pas OK
    //}
    surnom.innerHTML = caracteresRempli;
    /*if (typeof surnom === 'string') { // vérifie si ce que l'on récupère est bien une chaine de caracteres
      alert('je suis une string'); // si oui, on affiche que oui
    }
    else{
      alert('je ne suis pas une string'); // si non, on affiche que non
    }*/
    if (typeof(localStorage) !== "undefined") {
        localStorage.setItem("stockSurnom", caracteresRempli);// Store
        //document.getElementById("name").innerHTML = localStorage.getItem("stockSurnom");// Retrieve
    }
  }
  else{
    console.log('mauvaise touche');
  }
};

if (typeof(localStorage) !== "undefined") {
  surnom.innerHTML = localStorage.getItem("stockSurnom");
}
