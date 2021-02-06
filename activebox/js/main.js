$(document).ready(function(){
	const header = document.querySelector('.header');
	const headerHeight = header.clientHeight;
	const col = document.querySelector('.front__col');
	col.style.paddingTop = headerHeight + 'px';
	window.addEventListener('scroll',function(){
		if (window.pageYOffset > headerHeight) {
			header.classList.add('header--fixed');
			let headerHeightfx = header.clientHeight;
			col.style.paddingTop = headerHeightfx + 'px';
		}
		else {
			header.classList.remove('header--fixed');
		}
	});
	const burger = document.querySelector('.burger');
	const navigation = document.querySelector('.navigation');
	burger.addEventListener('click',Menu);
	function Menu (){
		burger.classList.toggle('burger--active');
		if (burger.classList.contains('burger--active')) {
			navigation.classList.add('navigation--active');
			document.body.style.overflowY = 'hidden';
		}
		else {
			navigation.classList.remove('navigation--active');
			document.body.style.overflowY = 'visible';
		}
	}
	const links = document.querySelectorAll('.navigation__link');
	links.forEach(function(element,index){
		element.addEventListener('click',function(e){
			e.preventDefault();
			burger.classList.remove('burger--active');
			navigation.classList.remove('navigation--active');
			document.body.style.overflowY = 'visible';
			const href = element.getAttribute('href');
			const to = document.getElementById(href);
			to.scrollIntoView({ behavior: "smooth" });
		});
	})
	$('.slider').slick({ arrows: false,dots: true,autoplay: true,autoplaySpeed: 3000});
})