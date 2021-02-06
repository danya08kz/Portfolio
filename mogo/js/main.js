$(document).ready(function(){

	window.addEventListener('scroll',Header);
	const header = document.querySelector('.header');
	const headerHight = header.clientHeight;
	function Header () {
		if (window.pageYOffset > headerHight) {
			header.classList.add('header__fixed');
		}
		else {
			header.classList.remove('header__fixed');
		}
	}

	const links = document.querySelectorAll('.navigation__link');
	links.forEach((link)=>{
		const ref = document.getElementById(link.getAttribute('href'));
		link.addEventListener('click',()=>{
			ref.scrollIntoView({ behavior: "smooth"} );
		});
	});

	const list = document.querySelector('.list');
	const items = document.querySelectorAll('.list__item');
	list.onclick = function (event){
		if (event.target.closest('.list__header') != null) {
			Open(event.target.closest('.list__header'));
		}
	}
	function Open (element) {
		for (let index = 0; index < items.length; index++) {
			items[index].classList.remove('list__item--active');
		}
		element.closest('.list__item').classList.add('list__item--active');
	}

	$('.box--front').slick({arrows:false,autoplay:true,
		dots:true,
		appendDots: $('.slider'),
		dotsClass: "slider__row",
		autoplaySpeed:3000,
		pauseOnHover:false});

	$('.rewiews__inner').slick({prevArrow:'<button class="rewiews__button rewiews__button--left"></button>',nextArrow:'<button class="rewiews__button rewiews__button--right"></button>',autoplay:true,adaptiveHeight:true});
})