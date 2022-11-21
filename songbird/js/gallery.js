import birdsData from "./birds.js";

let newArrayFromBirdsData =  birdsData.flat();
console.log('newArrayFromBirdsData: ', newArrayFromBirdsData);

const galleryBlockHiddenNode = document.querySelector('.gallery-block-hidden');
let func;
let audioPlayGalleryId;
let audioCurrentTimeGallery;
let audioLengthGallery;
let timeCurrentGalleryNode;
let isPlayForBirdGallery = false;
let currentTimeAtTheStartGallery = 0;
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

	const galleryPopupNode = document.querySelector('.gallery-popup');
	const playIconGalleryNode = galleryPopupNode.querySelector('.play-icon-gallery');
	const popapProgressBar = galleryPopupNode.querySelector('.popap-progress__bar');
	const popapTimeCurrent = galleryPopupNode.querySelector('.popap-time__current');

	stopAudioGallery(audioForBirdInGallery);
	clearInterval(audioPlayGalleryId);
	currentTimeAtTheStartGallery = 0;
	isPlayForBirdGallery = false;

	popapTimeCurrent.textContent = '00:00';
	popapProgressBar.value = 0;
	changePauseWithPlay(playIconGalleryNode);
});

//hide popap when click burger close
const addEventListenerToBurgerClose = () => {
	const burgerCloseNode = document.querySelector('.burger-close');
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const playIconGalleryNode = galleryPopupNode.querySelector('.play-icon-gallery');
	const popapProgressBar = galleryPopupNode.querySelector('.popap-progress__bar');
	const popapTimeCurrent = galleryPopupNode.querySelector('.popap-time__current');

	burgerCloseNode.addEventListener('click', () => {
		hidePopap();
		hideHiddenBlock();
		
		stopAudioGallery(audioForBirdInGallery);
		clearInterval(audioPlayGalleryId);
		currentTimeAtTheStartGallery = 0;
		isPlayForBirdGallery = false;

		popapTimeCurrent.textContent = '00:00';
		popapProgressBar.value = 0;
		changePauseWithPlay(playIconGalleryNode);
	});
}

//change value of progress bar (for gallery)
const changeProgressBarGallery = (currentValue, isPlay, audioCurrentTime, audioLength, audioObject, currentTimeAtTheStart) => {
	if (isPlay === true) {
        //audioCurrentTimeAnswer = Math.floor(audioLengthAnswer * currentProgressBar / 100);
		audioCurrentTime = getCurrentTimeOfTrack(audioLength, currentValue);
        audioObject.currentTime = audioCurrentTime;
    }
    else {
        //audioCurrentTimeAnswer = Math.floor(audioLengthAnswer * currentProgressBar / 100);
		audioCurrentTime = getCurrentTimeOfTrack(audioLength, currentValue);
        currentTimeAtTheStart = audioCurrentTime;
    }
}

//const get current time of track
const getCurrentTimeOfTrack = (lengthOfTrack, valueOfCurrentProgressBar) => {
	return Math.floor(lengthOfTrack * valueOfCurrentProgressBar / 100);
}

//add listener of input event for gallery progress bar
const addEventListenerForGalleryBar = () => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const popapProgressBar = galleryPopupNode.querySelector('.popap-progress__bar');

	popapProgressBar.addEventListener('input', () => {
		changeProgressBarGallery(popapProgressBar.value, isPlayForBirdGallery, audioCurrentTimeGallery, audioLengthGallery, audioForBirdInGallery, currentTimeAtTheStartGallery);
	});
}

//change audio volume
const changeAudioVolumeGallery = (objectAudio, valueOfPlayerVolume) => {
	let convertedValue = valueOfPlayerVolume / 100;
    objectAudio.volume = convertedValue;
}

//set initial volume for audio
const setBaseVolumeGallery = (objectAudio, currentInputRange) => {
    objectAudio.volume = currentInputRange.value / 100;
}

//add listener for gallery volume
const addEventListenerForGalleryVolume = () => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const popapVolume = galleryPopupNode.querySelector('.player-volume-range-popap');
	popapVolume.value = 70;
	setBaseVolumeGallery(audioForBirdInGallery, popapVolume);
	
	popapVolume.addEventListener('input', () => {
		changeAudioVolumeGallery(audioForBirdInGallery, popapVolume.value);
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

//display description for bird
const displayDescriptionOfBird = (index, birdArray) => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const popapTextDescription = galleryPopupNode.querySelector('.popap__text');
	popapTextDescription.innerHTML = `${birdArray[index].description}`;
}

//add listener of event to every gallery-item
const addEventListenerToGalleryItem = (birdArray) => {
	const arrayOfGalleryItemNodes = document.querySelectorAll('.gallery-item');

	for (let i = 0; i < arrayOfGalleryItemNodes.length; i++) {
		arrayOfGalleryItemNodes[i].addEventListener('click', () => {
			displayPopap();
			displayHiddenBlock();
			displayBirdImage(i, birdArray);
			displayBirdTitle(i, birdArray);
			displayBirdOtherName(i, birdArray);
			displayDescriptionOfBird(i, birdArray);
			displayTotalTimeOfTrack(i, birdArray);
			addEventListenerToPlayIconGallery(birdArray, audioForBirdInGallery, i);
			addEventListenerForGalleryVolume();
		});
	}
}


//change icon play with pause
const changePlayWithPause = (buttonPlay) => {
	buttonPlay.classList.add('pause');
}

//change icon pause with play
const changePauseWithPlay = (buttonPlay) => {
	if (buttonPlay) {
		buttonPlay.classList.remove('pause');
	}
}

//get src of audio for choosen bird
const getSrcAudioForBirdGallery = (birdArray, index) => {
	return birdArray[index].audio;
}

//get current time of audiotrack
const getCurrentTimeGallery = (objectAudio) => {
	return Math.floor(objectAudio.currentTime);
}

//get all time of audiotrack
const getAllTimeGallery = (objectAudio) => {
	return Math.floor(objectAudio.duration);
}

//set current time and totaltime in progress bar
const setBaseTime = (currentTimeOfTrack, elem) => {
    let wholePart = Math.floor(currentTimeOfTrack / 60);
    let remainder = currentTimeOfTrack % 60;

    if (currentTimeOfTrack < 10) {
        elem.textContent = `00:0${remainder}`;
    }
    else if (currentTimeOfTrack >= 10 && currentTimeOfTrack < 60) {
        elem.textContent = `00:${remainder}`;
    }
    else if (currentTimeOfTrack >= 60) {
        if (wholePart < 10 && remainder < 10) {
            elem.textContent = `0${wholePart}:0${remainder}`;
        }
        else if (wholePart < 10 && remainder >= 10) {
            elem.textContent = `0${wholePart}:${remainder}`;
        }
		else if (wholePart >= 10 && remainder < 10) {
            elem.textContent = `${wholePart}:0${remainder}`;
        }
		else if (wholePart >= 10 && remainder >= 10) {
            elem.textContent = `${wholePart}:${remainder}`;
        }
    }
};

//pause audiotrack
const pauseAudioGallery = (objAudio) => {
	setTimeout(function() {
		objAudio.pause();
	}, 0);
}

//stop audiotrack
const stopAudioGallery = (objAudio) => {
	objAudio.src = '';
	objAudio.currentTime = 0;	
}

//play audiooforbird for gallery
const playAudioForBirdGallery = (currentButtonPlayGallery, index, objectAudio, birdArray, popapProgressBar, popapTimeCurrent) => {
	if (isPlayForBirdGallery === false) {
		clearInterval(audioPlayGalleryId);
		isPlayForBirdGallery = true;

		objectAudio.src = getSrcAudioForBirdGallery(birdArray, index);
		objectAudio.currentTime = currentTimeAtTheStartGallery;
		objectAudio.play();

		//play aydio
		audioPlayGalleryId = setInterval(() => {

			//get value on every second of the track
			audioCurrentTimeGallery = getCurrentTimeGallery(objectAudio);
			currentTimeAtTheStartGallery = audioCurrentTimeGallery;

			//get all time of the track
			audioLengthGallery = getAllTimeGallery(objectAudio);
			popapProgressBar.value = (audioCurrentTimeGallery * 100) / audioLengthGallery;
			timeCurrentGalleryNode = popapTimeCurrent;

			//display current time of track in progress bar for gallery
			setBaseTime(audioCurrentTimeGallery, timeCurrentGalleryNode);

			if (audioCurrentTimeGallery === audioLengthGallery) {
				clearInterval(audioPlayGalleryId);
				currentTimeAtTheStartGallery = 0;
			}
		}, 1000);

		changePlayWithPause(currentButtonPlayGallery);
	}
	else {
		clearInterval(audioPlayGalleryId);
		isPlayForBirdGallery = false;
		pauseAudioGallery(objectAudio);
		currentTimeAtTheStartGallery = audioCurrentTimeGallery;
		objectAudio.currentTime = currentTimeAtTheStartGallery;

		changePauseWithPlay(currentButtonPlayGallery);

		if (audioCurrentTimeGallery === audioLengthGallery) {
			currentTimeAtTheStartGallery = 0;
		}
	}
}

//create listener of event to play-icon-gallery
const addEventListenerToPlayIconGallery = (birdArray, objectAudio, index) => {
	const galleryPopupNode = document.querySelector('.gallery-popup');
	const playIconGalleryNode = galleryPopupNode.querySelector('.play-icon-gallery');
	const popapProgressBar = galleryPopupNode.querySelector('.popap-progress__bar');
	const popapTimeCurrent = galleryPopupNode.querySelector('.popap-time__current');

	playIconGalleryNode.removeEventListener('click', func);

	playIconGalleryNode.addEventListener('click', func = function() {
		playAudioForBirdGallery(playIconGalleryNode, index, objectAudio, birdArray, popapProgressBar, popapTimeCurrent);
	});
}

addGalleryItemToRow();
addEventListenerToGalleryItem(newArrayFromBirdsData);
addEventListenerToBurgerClose();
addEventListenerForGalleryBar();

