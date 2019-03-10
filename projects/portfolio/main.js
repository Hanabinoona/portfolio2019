function scroll(event){
	var header = document.querySelector('header');
	var moi = document.querySelector('#presentation');
	var projet = document.querySelector('#projets');
	var contact = document.querySelector('#contact');

	if(event.pageY >= moi.offsetTop && event.pageY < projet.offsetTop){
		document.querySelector('#presentation-link').classList.add('underline');
	}
	else{
		document.querySelector('#presentation-link').classList.remove('underline');
	}

	if(event.pageY >= projet.offsetTop && event.pageY < contact.offsetTop - window.innerHeight + 300){
		document.querySelector('#projets-link').classList.add('underline');
	}
	else{
		document.querySelector('#projets-link').classList.remove('underline');
	}

	if(event.pageY >= contact.offsetTop - window.innerHeight + 300){
		document.querySelector('#contact-link').classList.add('underline');
		document.querySelector('#projets-link').classList.add('opacity-contact');
	}
	else{
		document.querySelector('#contact-link').classList.remove('underline');
		document.querySelector('#projets-link').classList.remove('opacity-contact');
	}
}

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? window.addEventListener('scroll', scroll) : window.addEventListener('mousewheel', scroll);
// permet de détecter le scroll sur firefox et les autres navigateurs


var handlePrevNext = function(section) {
	var prev = document.querySelector(section + ' .prev');
	var next = document.querySelector(section + ' .next');
	next.onclick = function() {
		var active = document.querySelector(section + ' .active');
		if (active.nextElementSibling !== null) {
			active.classList.toggle('active');
			active.nextElementSibling.classList.toggle('active');
		}
		active = document.querySelector(section + ' .active');
		if (active.nextElementSibling === null) {
			next.classList.add('hidden');
		}
		if (active.previousElementSibling !== null) {
			prev.classList.remove('hidden');
		}
	}
	prev.onclick = function() {
	  var active = document.querySelector(section + ' .active');
	  if (active.previousElementSibling !== null) {
	    active.classList.toggle('active');
	    active.previousElementSibling.classList.toggle('active');
	  }
	  active = document.querySelector(section + ' .active');
	  if (active.previousElementSibling === null) {
	  	prev.classList.add('hidden');
	  }
	  if (active.nextElementSibling !== null) {
	  	next.classList.remove('hidden');
	  }

	}
}

handlePrevNext('.slideshow');
