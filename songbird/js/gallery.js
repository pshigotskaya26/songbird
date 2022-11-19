import birdsData from "./birds.js";
console.log(birdsData);

let newArrayFromBirdsData =  birdsData.flat();
console.log('newArrayFromBirdsData: ', newArrayFromBirdsData);

const galleryBlockHiddenNode = document.querySelector('.gallery-block-hidden');

const audioForBirdInGallery = new Audio();

//add gallery item to block gallery-row"
const addGalleryItemToRow = () => {
	let galleryRowNode = document.querySelector('.gallery-row');

	for (let i= 0; i < newArrayFromBirdsData.length; i++) {
		const galleryItem = document.createElement('div');
		galleryItem.className = 'gallery-item';

		galleryItem.innerHTML = `
			<div class="gallery-item_image">
				<img class="gallery-image" src="${newArrayFromBirdsData[i].image}" alt="photo: ${newArrayFromBirdsData[i].name}">
			</div>
			<h4 class="gallery-item__subtitle">${newArrayFromBirdsData[i].name}</h4>
		`;

		galleryRowNode.appendChild(galleryItem);
	}
}

//display popap when click on gallery-item
const displayPopap = () => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	galleryPopupNode.classList.add('active');
}

//hide popap when click on hidden block
const hidePopap = () => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	galleryPopupNode.classList.remove('active');
}

//display hidden block
const displayHiddenBlock = () => {
	const galleryBlockHiddenNode = document.querySelector('.gallery-block-hidden');
	galleryBlockHiddenNode.classList.add('active');
}

//hide hidden block when click on hidden block
const hideHiddenBlock = () => {
	const galleryBlockHiddenNode = document.querySelector('.gallery-block-hidden');
	galleryBlockHiddenNode.classList.remove('active');
}

//hide popap when click on hidden block
galleryBlockHiddenNode.addEventListener('click', () => {
	hidePopap();
	hideHiddenBlock();
});

//hide popap when click burger close
const addEventListenerToBurgerClose = () => {
	const burgerCloseNode = document.querySelector('.burger-close');
	burgerCloseNode.addEventListener('click', () => {
		hidePopap();
		hideHiddenBlock();
	});
}

//display bird's image in popap
const displayBirdImage = (index, birdArray) => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const popapImageNode = galleryPopupNode.querySelector('.popap-image');
	popapImageNode.src = `${birdArray[index].image}`;
}

//display bird's title in popap
const displayBirdTitle = (index, birdArray) => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const galleryPopupTitleNode = galleryPopupNode.querySelector('.gallery-popap__title');
	galleryPopupTitleNode.innerHTML = `${birdArray[index].name}`;
}

//display bird's other name in popap
const displayBirdOtherName = (index, birdArray) => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const galleryPopupOtherNameNode = galleryPopupNode.querySelector('.gallery-popap__name');
	galleryPopupOtherNameNode.innerHTML = `${birdArray[index].species}`;
}

//display total time of track for bird
const displayTotalTimeOfTrack = (index, birdArray) => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const totalTimeNode = galleryPopupNode.querySelector('.time__total');
	totalTimeNode.innerHTML = `${birdArray[index].duration}`;
}

//add listener of event to every gallery-item
const addEventListenerToGalleryItem = (birdArray) => {
	const arrayOfGalleryItemNodes = document.querySelectorAll('.gallery-item');
	console.log('arrayOfGalleryItemNodes: ', arrayOfGalleryItemNodes);

	for (let i = 0; i < arrayOfGalleryItemNodes.length; i++) {
		arrayOfGalleryItemNodes[i].addEventListener('click', () => {
			console.log(i);
			displayPopap();
			displayHiddenBlock();
			displayBirdImage(i, birdArray);
			displayBirdTitle(i, birdArray);
			displayBirdOtherName(i, birdArray);
			displayTotalTimeOfTrack(i, birdArray);
			
			addEventListenerToPlayIconGallery(birdArray, audioForBirdInGallery);
		});
	}
}

//
const addEventListenerToPlayIconGallery = (birdArray, objectAudio) => {
	const arrayOfPlayIconGalleryNodes = document.querySelectorAll('.play-icon-gallery');
	console.log('arrayOfPlayIconGalleryNodes: ', arrayOfPlayIconGalleryNodes);

	for (let i = 0; i < arrayOfPlayIconGalleryNodes.length; i++) {
		arrayOfPlayIconGalleryNodes[i].addEventListener('click', () => {
			console.log(`--hello ${i}`, arrayOfPlayIconGalleryNodes[i]);
		});
	}
}

addGalleryItemToRow();
addEventListenerToGalleryItem(newArrayFromBirdsData);
addEventListenerToBurgerClose();
addEventListenerToPlayIconGallery(newArrayFromBirdsData);
