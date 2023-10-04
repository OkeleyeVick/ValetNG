(() => {
	const allAccordion = document.querySelectorAll(".v-accordion .v-accordion-item");

	allAccordion.forEach((accordion) => {
		const firstLoopButton = accordion.querySelector("button");

		firstLoopButton.addEventListener("click", function () {
			allAccordion.forEach((accr) => {
				const buttonFromSecondLoop = accr.querySelector("button");
				if (firstLoopButton === buttonFromSecondLoop) {
					buttonFromSecondLoop.classList.add("active");
				} else {
					buttonFromSecondLoop.classList.remove("active");
				}
			});
		});
	});

	const allListItem = document.querySelectorAll(".v-scroll-container-inner li .v-list-content");
	const scrollContainer = document.querySelector(".v-scroll-container");
	const root = document.querySelector(".v-navigation-container");
	const steppers = document.querySelectorAll(".v-text-navigation > span");
	const circleSteppers = document.querySelectorAll(".v-navigation-container .v-circle");

	const option1 = {
		threshold: 0,
	};
	const listItemObserver = new IntersectionObserver(handleIntersection, option1);

	allListItem.forEach((list) => {
		listItemObserver.observe(list);
	});

	// function for scroll animation
	function handleIntersection(entries) {
		entries.forEach((listItem) => {
			const currentItem = listItem.target.parentElement;

			if (listItem.isIntersecting) {
				currentItem.classList.add("active");
			} else {
				currentItem.classList.remove("active");
			}
		});
	}

	// function for vertical scroll tracker
	window.addEventListener("scroll", function () {
		const { top, height } = scrollContainer.getBoundingClientRect();
		const screenHeight = window.innerHeight;

		const translateDown = ((screenHeight - top) / height) * 100;
		if (translateDown > 100 || translateDown < 0) return;

		steppers.forEach((_, index, stepperArray) => {
			const calculation = translateDown - 4 >= (100 / steppers.length - 1) * index;
			if (calculation) {
				stepperArray[index].classList.add("active");
				circleSteppers[index].classList.add("active");
			} else {
				stepperArray[index].classList.remove("active");
				circleSteppers[index].classList.remove("active");
			}
		});
		root.style.setProperty("--translate-down", `${translateDown + 1}%`);
	});
})();
