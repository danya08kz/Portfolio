const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.header__navigation');
const buttonl = document.querySelector('.slider__button_left');
const buttonr = document.querySelector('.slider__button_right');
const slides = document.querySelectorAll('.slide');
const sliderMax = document.querySelector('.slider__max');
const sliderCurrent = document.querySelector('.slider__current');
let index = 1;
slides[index-1].classList.add('slide_active');
sliderCurrent.textContent = '0' + String(index) + ' / ';
sliderMax.textContent = '0' + String(slides.length);
window.addEventListener('scroll', function() {
	if (window.pageYOffset > header.clientHeight) {
		header.classList.add('header_fixed');
	}
	else {
		header.classList.remove('header_fixed');
	}
});
burger.addEventListener('click',function(){
	burger.classList.toggle('burger_active');
	navigation.classList.toggle('header__navigation_active');
	if (navigation.classList.contains('header__navigation_active')) {
		document.body.classList.add('lock');
	}
	else {
		document.body.classList.remove('lock');
	}
})
const links = document.querySelectorAll('.link');
	links.forEach(function(element,index){
		element.addEventListener('click',function(e){
		e.preventDefault();
		burger.classList.remove('burger_active');
		navigation.classList.remove('header__navigation_active');
		document.body.classList.remove('lock');
		const href = element.getAttribute('href');
		const to = document.getElementById(href);
		to.scrollIntoView({ behavior: "smooth" });
	});
})
buttonr.addEventListener('click',Next);
buttonl.addEventListener('click',Prev);
function Next () {
	if (index < slides.length) {
		slides[index-1].classList.remove('slide_active');
		index++;
		slides[index-1].classList.add('slide_active');
		sliderCurrent.textContent = '0' + String(index) + ' / ';
	}
}
function Prev () {
	if (index > 1) {
		slides[index-1].classList.remove('slide_active');
		index--;
		slides[index-1].classList.add('slide_active');
		sliderCurrent.textContent = '0' + String(index) + ' / ';
	}
}