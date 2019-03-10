////////////
// VARIABLES
////////////

// game
// cette variable est un objet, elle sert a contenir l'état de ton jeu
// isSoloMode permet de savoir si on est en mode 1 joueur ou 2 joueurs
// et le reste définit des valeurs par défaut pour le joueur 1 et joueur 2.
// cette variable sera utilisé tout le long du jeu.
let game = {
    isSoloMode: true,
    currentPlayer: 'playerOne',
    playerOne: {
        name: 'Player 1',
        choice: 'rond'
    },
    playerTwo: {
        name: 'Player 2',
        choice: 'croix'
    }
}
let tailleTableau;

// selectors
let page1 = document.querySelector('.page1');
let page3 = document.querySelector('.page3');
let bienvenue = document.querySelector('.bienvenue');
let rond = document.querySelector('#clickRond');
let croix = document.querySelector('#clickCroix');
let choixSign = document.querySelector('#choixSign');
let page4 = document.querySelector('.page4');
let end = document.querySelector('#end');
let recommencer = document.querySelector('#recommencer');


////////////
// FUNCTIONS
////////////

// 1 player mode
function playOnePlayer () {
    // Tu arrive ici quand tu clique sur 1 joueur. On initialise les variables qui seront utilisé
    // qu'en mode 1 joueur.
    let page2Joueur1 = document.querySelector('.page2Joueur1');
    let select = document.querySelector('#select');
    let tableJoueur1 = document.querySelector('.tableJoueur1');
    let soloName = document.querySelector('#soloName');

    page2Joueur1.classList.add('visible');

    // on rajoute un listener pour la suite.
    select.addEventListener('click', function() {
        if (soloName.value === '') {
            return alert('Vous n\'avez pas renseigné votre nom !');
            // c'est plus simple d'avoir une condition qui fait l'inverse que ce que tu avais
            // avant, ça évite d'avoir de l'imbrication de code et d'avoir un else.
            // le return permet d'arrêter la fonction ici et de ne pas continuer la suite en dessous.
        }

        // on modifie le nom du joueur
        game.playerOne.name = soloName.value;
        game.playerTwo.name = "Watson le Bot";

        bienvenue.innerHTML = '<p>Donc vous vous appelez ' + game.playerOne.name +' très bien, maintenant jouons !</p>';
        choixSign.innerHTML = '<p>Choisissez votre signe : </p>';
        page3.classList.add('visible');

        // on passe a la suite tout en bas.
    });

}

// 2 players mode
function playTwoPlayers () {
    // tu arrives ici quand tu clique sur 2 joueurs. On initialise les variables qui seront utilisé
    // qu'en mode 2 joueurs
    let page2 = document.querySelector('.page2');
    let valid = document.querySelector('#valid');
    let joueur1Name = document.querySelector('#joueur1Name');
    let joueur2Name = document.querySelector('#joueur2Name');

    // ici on définit le jeu en mode 2 joueur. ça peut servir pour plus tard.
    game.isSoloMode = false;
    page2.classList.add('visible');

    // on rajoute un listener pour la suite.
    valid.addEventListener('click', function () {
        if (joueur1Name.value === '' || joueur2Name.value === '') {
            return alert('Il faut remplir les champs de vos noms');
            // pareil que dans la fonction d'au dessus, on évite d'imbriquer du code en faisant ça
            // ça permet d'être plus clair dans le code et d'éviter des else pour rien
        }

        // on modifie les noms des joueurs
        game.playerOne.name = joueur1Name.value;
        game.playerTwo.name = joueur2Name.value;

        bienvenue.innerHTML = '<p>Donc '+ joueur1Name.value + ' joue avec '+ joueur2Name.value +'</p>';
        choixSign.innerHTML = joueur1Name.value + ' choisissez votre signe :';
        page3.classList.add('visible');

        // on passe a la suite tout en bas.
    });
}

// Create a table
function createTable (maxX, maxY) {
    // ici on créé le tableau pour le jeu.
    // On récupère la taille max en largeur et hauteur

    let tableau = '';
    for (let y = 0; y <= maxY; y++) {
        tableau += '<tr>';
        for (let x = 0; x <= maxX; x++) {
            // ici j'utilise les `` qui permettent de mettre des variables
            // directement dans le texte, avec la syntaxe suivante : ${nomvariableici}
            tableau += `<td class="td" id="pos-${y}-${x}"></td>`;
        }
        tableau += '</tr>';
    }

    // on met le tableau dans le html
    document.querySelector('.table').innerHTML = tableau;

    //fini, tu peux retourner en bas pour la suite.
    //nouvelles variables du tableau
}

// initialize td events
function initializeTableEvent () {
    // je récupère ici tout les td du tableau. il faut le faire seulement une fois
    // que le tableau est déjà initialisé car sinon on récupèrera rien. c'est de
    // la que vient ton erreur. tu initialisais cette variable dès le tout début du script.
    let tdList = document.querySelectorAll('.td');

    // on parcoure le tableau de tous les td
    for(let td of tdList) {
        // et on rajouter le listener pour chaque td. la suite dans la fonction juste en dessous.
        td.addEventListener('click', setChoiceOnTd);
    }



}

// set a choice on td selected
function setChoiceOnTd () {
    // si une div a deja la class "touch", on donne une alert -> pas le droit de cliquer deux fois la meme case
    if(this.classList.contains("touch")){
      alert('On ne peut pas cliquer cette case là !');
      return setChoiceOnTd();
    }else{
      //si la div n'a pas la class touch on continuer
      // on ajoute le symbole et la class touch
      this.classList.add(game[game.currentPlayer].choice);
      this.classList.add('touch');
      //compter les points
      checkScoring();

      // récupère le nombre de joueur et si joueur seul, c'est au tour du bot de jouer
      if (game.isSoloMode) {
          return launchBotTurn();
      }

    }

      // une fois que la case a bien été modifié, on inverse le joueur courant.
      if (game.currentPlayer === 'playerOne') {
          game.currentPlayer = 'playerTwo';
      }
      else {
          game.currentPlayer = 'playerOne';
      }
  }


function launchBotTurn(){
  // random sur l'axe x et l'axe y pour donner une case aléatoire au bot
    let x = Math.floor(Math.random() * (tailleTableau + 1));
    let y = Math.floor(Math.random() * (tailleTableau + 1));
    //console.log(x + ' et ' + y); //donne la position de la case trouvée par le 'bot'
    let random = document.querySelector("#pos-" + y + "-" + x); // on ajoute le symbole

    //si touches.length est plus petit ou égal à 9 (que toutes les cases ne sont pas cochées)
    let touches = document.querySelectorAll('.touch');

    if(touches.length < (tailleTableau+1)*(tailleTableau+1)){
      if(random.classList.contains("touch")){ //et si une div contient deja la class "touch"
        return launchBotTurn(); // on recommence -> recherche d'une autre case à cliquer
      }
    }else{
      alert('Fin du jeu');
    }
      //si on a pas la class touch on l'ajoute et on ajoute la class correspondante au joueur
      random.classList.add(game['playerTwo'].choice);
      random.classList.add('touch');
      checkScoring();
}

function checkScoring(){
  let cases = {};
  for (let y = 0; y <= tailleTableau; y++) {
    for (let x = 0; x <= tailleTableau; x++) {
      cases[y+"-"+x] = document.querySelector("#pos-" + y + "-" + x);
      // crée une ligne dans l'object qui s'appelle y-x qui contient le querySelector de pos y-x
    }
  }
  console.log(cases); //voir les cases cochées
  if(tailleTableau === 2){
    if(
        //lignes
        cases["0-0"].classList.contains('rond') && cases["0-1"].classList.contains('rond') && cases["0-2"].classList.contains('rond')
        || cases["1-0"].classList.contains('rond') && cases["1-1"].classList.contains('rond') && cases["1-2"].classList.contains('rond')
        || cases["2-0"].classList.contains('rond') && cases["2-1"].classList.contains('rond') && cases["2-2"].classList.contains('rond')
        //colonnes
        || cases["0-0"].classList.contains('rond') && cases["1-0"].classList.contains('rond') && cases["2-0"].classList.contains('rond')
        || cases["0-1"].classList.contains('rond') && cases["1-1"].classList.contains('rond') && cases["2-1"].classList.contains('rond')
        || cases["0-2"].classList.contains('rond') && cases["1-2"].classList.contains('rond') && cases["2-2"].classList.contains('rond')
        //diagonales
        || cases["0-0"].classList.contains('rond') && cases["1-1"].classList.contains('rond') && cases["2-2"].classList.contains('rond')
        || cases["0-2"].classList.contains('rond') && cases["1-1"].classList.contains('rond') && cases["2-0"].classList.contains('rond')
      ){
        if(game.playerOne.choice === 'rond'){
          return alert(game.playerOne.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }else{
          return alert(game.playerTwo.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }
      }

      if(
        //lignes
        cases["0-0"].classList.contains('croix') && cases["0-1"].classList.contains('croix') && cases["0-2"].classList.contains('croix')
        || cases["1-0"].classList.contains('croix') && cases["1-1"].classList.contains('croix') && cases["1-2"].classList.contains('croix')
        || cases["2-0"].classList.contains('croix') && cases["2-1"].classList.contains('croix') && cases["2-2"].classList.contains('croix')
        //colonnes
        || cases["0-0"].classList.contains('croix') && cases["1-0"].classList.contains('croix') && cases["2-0"].classList.contains('croix')
        || cases["0-1"].classList.contains('croix') && cases["1-1"].classList.contains('croix') && cases["2-1"].classList.contains('croix')
        || cases["0-2"].classList.contains('croix') && cases["1-2"].classList.contains('croix') && cases["2-2"].classList.contains('croix')
        //diagonales
        || cases["0-0"].classList.contains('croix') && cases["1-1"].classList.contains('croix') && cases["2-2"].classList.contains('croix')
        || cases["0-2"].classList.contains('croix') && cases["1-1"].classList.contains('croix') && cases["2-0"].classList.contains('croix')
      ){
        if(game.playerOne.choice === 'croix'){
          return alert(game.playerOne.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }else{
          return alert(game.playerTwo.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }
      }
  }
//tab 5x5
  if(tailleTableau === 4){
    if(
        //lignes
        cases["0-0"].classList.contains('rond') && cases["0-1"].classList.contains('rond') && cases["0-2"].classList.contains('rond') && cases["0-3"].classList.contains('rond') && cases["0-4"].classList.contains('rond')
        || cases["1-0"].classList.contains('rond') && cases["1-1"].classList.contains('rond') && cases["1-2"].classList.contains('rond') && cases["1-3"].classList.contains('rond') && cases["1-4"].classList.contains('rond')
        || cases["2-0"].classList.contains('rond') && cases["2-1"].classList.contains('rond') && cases["2-2"].classList.contains('rond') && cases["2-3"].classList.contains('rond') && cases["2-4"].classList.contains('rond')
        || cases["3-0"].classList.contains('rond') && cases["3-1"].classList.contains('rond') && cases["3-2"].classList.contains('rond') && cases["3-3"].classList.contains('rond') && cases["3-4"].classList.contains('rond')
        || cases["4-0"].classList.contains('rond') && cases["4-1"].classList.contains('rond') && cases["4-2"].classList.contains('rond') && cases["4-3"].classList.contains('rond') && cases["4-4"].classList.contains('rond')
        //colonnes
        || cases["0-0"].classList.contains('rond') && cases["1-0"].classList.contains('rond') && cases["2-0"].classList.contains('rond') && cases["3-0"].classList.contains('rond') && cases["4-0"].classList.contains('rond')
        || cases["0-1"].classList.contains('rond') && cases["1-1"].classList.contains('rond') && cases["2-1"].classList.contains('rond') && cases["3-1"].classList.contains('rond') && cases["4-1"].classList.contains('rond')
        || cases["0-2"].classList.contains('rond') && cases["1-2"].classList.contains('rond') && cases["2-2"].classList.contains('rond') && cases["3-2"].classList.contains('rond') && cases["4-2"].classList.contains('rond')
        || cases["0-3"].classList.contains('rond') && cases["1-3"].classList.contains('rond') && cases["2-3"].classList.contains('rond') && cases["3-3"].classList.contains('rond') && cases["4-3"].classList.contains('rond')
        || cases["0-4"].classList.contains('rond') && cases["1-4"].classList.contains('rond') && cases["2-4"].classList.contains('rond') && cases["3-4"].classList.contains('rond') && cases["4-4"].classList.contains('rond')
        //diagonales
        || cases["0-0"].classList.contains('rond') && cases["1-1"].classList.contains('rond') && cases["2-2"].classList.contains('rond') && cases["3-3"].classList.contains('rond') && cases["4-4"].classList.contains('rond')
        || cases["0-4"].classList.contains('rond') && cases["1-3"].classList.contains('rond') && cases["2-2"].classList.contains('rond') && cases["3-1"].classList.contains('rond') && cases["4-0"].classList.contains('rond')
      ){
        if(game.playerOne.choice === 'rond'){
          return alert(game.playerOne.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }else{
          return alert(game.playerTwo.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }
      }

      if(
        //lignes
        cases["0-0"].classList.contains('croix') && cases["0-1"].classList.contains('croix') && cases["0-2"].classList.contains('croix') && cases["0-3"].classList.contains('croix') && cases["0-4"].classList.contains('croix')
        || cases["1-0"].classList.contains('croix') && cases["1-1"].classList.contains('croix') && cases["1-2"].classList.contains('croix') && cases["1-3"].classList.contains('croix') && cases["1-4"].classList.contains('croix')
        || cases["2-0"].classList.contains('croix') && cases["2-1"].classList.contains('croix') && cases["2-2"].classList.contains('croix') && cases["2-3"].classList.contains('croix') && cases["2-4"].classList.contains('croix')
        || cases["3-0"].classList.contains('croix') && cases["3-1"].classList.contains('croix') && cases["3-2"].classList.contains('croix') && cases["3-3"].classList.contains('croix') && cases["3-4"].classList.contains('croix')
        || cases["4-0"].classList.contains('croix') && cases["4-1"].classList.contains('croix') && cases["4-2"].classList.contains('croix') && cases["4-3"].classList.contains('croix') && cases["4-4"].classList.contains('croix')
        //colonnes
        || cases["0-0"].classList.contains('croix') && cases["1-0"].classList.contains('croix') && cases["2-0"].classList.contains('croix') && cases["3-0"].classList.contains('croix') && cases["4-0"].classList.contains('croix')
        || cases["0-1"].classList.contains('croix') && cases["1-1"].classList.contains('croix') && cases["2-1"].classList.contains('croix') && cases["3-1"].classList.contains('croix') && cases["4-1"].classList.contains('croix')
        || cases["0-2"].classList.contains('croix') && cases["1-2"].classList.contains('croix') && cases["2-2"].classList.contains('croix') && cases["3-2"].classList.contains('croix') && cases["4-2"].classList.contains('croix')
        || cases["0-3"].classList.contains('croix') && cases["1-3"].classList.contains('croix') && cases["2-3"].classList.contains('croix') && cases["3-3"].classList.contains('croix') && cases["4-3"].classList.contains('croix')
        || cases["0-4"].classList.contains('croix') && cases["1-4"].classList.contains('croix') && cases["2-4"].classList.contains('croix') && cases["3-4"].classList.contains('croix') && cases["4-4"].classList.contains('croix')
        //diagonales
        || cases["0-0"].classList.contains('croix') && cases["1-1"].classList.contains('croix') && cases["2-2"].classList.contains('croix') && cases["3-3"].classList.contains('croix') && cases["4-4"].classList.contains('croix')
        || cases["0-4"].classList.contains('croix') && cases["1-3"].classList.contains('croix') && cases["2-2"].classList.contains('croix') && cases["3-1"].classList.contains('croix') && cases["4-0"].classList.contains('croix')
      ){
        if(game.playerOne.choice === 'croix'){
          return alert(game.playerOne.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }else{
          return alert(game.playerTwo.name+' a gagné !');
          //ajout class pour bouton recommencer
          recommencer.classList.add('visible');
        }
      }
  }


}


/////////////////////////
// INITIALIZE EVENTS GAME
/////////////////////////

// On commence le programme ici car tout ce qui est en haut
// sont juste des variables et fonctions.

//selection difficulté
document.querySelector('#facile').addEventListener('click', function(){
  tailleTableau = 2;
  page1.classList.add('visible');
  // create table
  // ici on créer un tableau de la taille qu'on veut avec la variable tailleTableau
  // tu peux changer les valeurs pour avoir un tableau plus ou moins grand.
  // va voir la fonction au dessus.
  createTable(tailleTableau, tailleTableau);
});
document.querySelector('#moyen').addEventListener('click', function(){
  tailleTableau = 4;
  page1.classList.add('visible');
  // create table
  // ici on créer un tableau de la taille qu'on veut avec la variable tailleTableau
  // tu peux changer les valeurs pour avoir un tableau plus ou moins grand.
  // va voir la fonction au dessus.
  createTable(tailleTableau, tailleTableau);
});


// 1 player selection
// après avoir créer le tableau, on ajoute plusieurs listener
// celui-ci sert pour si on clique sur 1 joueur. voir la fonction playOnePlayer au dessus
document.querySelector('#choix1joueur').addEventListener('click', playOnePlayer);

// 2 players selection
// celui-ci sert pour si on clique sur 2 joueur. voir la fonction playTwoPlayers au dessus
document.querySelector('#choix2joueurs').addEventListener('click', playTwoPlayers);

// pas besoin de définir plusieurs fois les même listener pour différent modes de jeu.
// la variable game.isSoloMode permettra plus tard de savoir si on est en mode 1 joueur ou 2 joueurs.

// rond selection
rond.addEventListener('click', function () {
    // si le joueur 1 clique sur rond, on passe juste a la suite
    // car les valeurs par défaut sont correct dès le début.

    page4.classList.add('visible');
    initializeTableEvent();
});

// croix selection
croix.addEventListener('click', function () {

    // autrement ici, le joueur 1 clique sur croix, alors
    // on modifie les valeurs par défaut et on passe à la suite.
    game.playerOne.choice = 'croix';
    game.playerTwo.choice = 'rond';

    page4.classList.add('visible');
    initializeTableEvent();
});
