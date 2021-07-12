const menu = document.querySelector(".menu");
const nav = document.querySelector(".navbar");
const topOfNav = nav.offsetTop;
const navLogo = document.querySelector(".logo");

menu.addEventListener("click", () => {
	nav.classList.toggle("show");
	menu.classList.toggle("open");
});

function fixedNav() {
	if (window.innerWidth >= 1000 && window.scrollY > topOfNav) {
		nav.classList.add("fixedNav");
		navLogo.classList.add("show-logo");
		document.body.style.paddingTop = nav.offsetHeight + "px";
	} else {
		nav.classList.remove("fixedNav");
		document.body.style.paddingTop = `${0}px`;
		navLogo.classList.remove("show-logo");
	}
}

window.addEventListener("scroll", fixedNav);

const itemsToReveal = document.querySelectorAll(".reveal");
let browserHeight = window.innerHeight;

hideInitially();

function hideInitially() {
	itemsToReveal.forEach((el) => {
		el.classList.add("hidden-item");
		el.isRevealed = false;
	});
}

window.addEventListener("scroll", throttle(calcCaller, 200));

function calculate(el) {
	if (window.pageYOffset + browserHeight > el.offsetTop) {
		console.log("calculated");
		let scrollPercent = (el.getBoundingClientRect().y / browserHeight) * 100;
		if (scrollPercent < 90) {
			el.classList.add("hidden-item--now-visible");
			el.isRevealed = true;
		}
	}
}

function calcCaller() {
	console.log("scrolled");
	itemsToReveal.forEach((el) => {
		if (el.isRevealed == false) {
			calculate(el);
		}
	});
}

function throttle(fn, wait) {
	var time = Date.now();
	return function () {
		if (time + wait - Date.now() < 0) {
			fn();
			time = Date.now();
		}
	};
}
