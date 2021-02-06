$(document).ready(function(){
	const animItems = document.querySelectorAll('.animation');
	if (animItems.length != 0) {
		window.addEventListener('scroll', Scrolling);
		function Scrolling(){
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animation = animItem.getAttribute('data-animation');
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;
				let animItemPoint = window.innerHeight - animItemHeight/animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}
				if ((window.pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('animation_' + animation);
				}
				else {
					if (!animItem.classList.contains('no-repeat')) {
						animItem.classList.remove('animation_' + animation);
					}
				}
			}
		}
	}
	function offset(element) {
		const rect = element.getBoundingClientRect(),scrollLeft = window.pageXOffset || document.documentElement.scrollleft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop,left: rect.left + scrollLeft }
	}
})