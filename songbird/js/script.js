import birdsData from "./birds.js";

const questionsTabsNode = document.querySelector('.questions__tabs');
const arrOfSoundsForAnswer = ['../../assets/sounds/correct-answer.mp3', '../../assets/sounds/incorrect-answer-2.mp3'];

let count = 0;
let countOfError = 0;
let indexOfLi;
let indexOfUl;
let detailsContentItem;
let arrayOfIsRightPositions = [];
let func;
let func2;
let func3

const audio = new Audio();
const audioForBird = new Audio();
const audioForBirdQuestion = new Audio();

let isPlayForBird = false;
let isPlayForBirdQuestion = false;
let currentButtonPlayQuestion;
let currentButtonPlayAnswer;

let currentTimeAtTheStartAnswer = 0;
let currentTimeAtTheStartQuestion = 0;

let audioCurrentTimeAnswer;
let audioCurrentTimeQuestion;

let audioLengthAnswer;
let audioLengthQuestion;

let arrayOfInputsProgressBarAnswer;
let arrayOfInputsProgressBarQuestion;

let arrayOfCurrentTimeNodesAnswer;
let arrayOfCurrentTimeNodesQuestion;

let timeCurrentAnswerNode;
let timeCurrentQuestionNode;

let arrayOfTotalTimeNodesAnswer;
let arrayOfTotalTimeNodesQuestion;

let indexOfCurrentTimeNodeAnswer;
let indexOfCurrentTimeNode;

let progressTotalAnswerTime;
let progressTotalQuestionTime;

let audioPlayAnswerId;
let audioPlayQuestionId;

let srcOfAudioForBird;
let srcOfAudioForBirdQuestion;

//shuffle values in array
const shuffleArray = (arr) => {
	for (let i = arr.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let current = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = current;
    }
    return arr;
}

//shuffle objects in array
const shuffleObjectsInArray = (arr) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		arr[i] = shuffleArray(arr[i]);
    }
    return arr;
}

//get random value from 0 to 5
const getRandomIndex = () => {
	return Math.floor(Math.random() * 6);
}

//set property isright with value true or false into object
const setIsRight = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		let randomIndex = getRandomIndex();
		for (let j = 0; j < arr[i].length; j++) {
			if (j === randomIndex) {
				arr[i][j].isRight = true;
				arrayOfIsRightPositions.push(j);
				
			}
			else if (j !== randomIndex) {
				arr[i][j].isRight = false;
			}
		}
	}
	console.log('Массив ответов arrayOfIsRightPositions: здесь расположены позиции правильных ответов в массиве resultBirdsData: ');
	console.log(arrayOfIsRightPositions);
}

//create blockquestions__body for every question
const createBlockQuestionsBody = () => {
	for (let i = 0; i < 6; i++) {
		const questionBodyItem = document.createElement('div');
		questionBodyItem.className = 'questions__body';
		questionBodyItem.setAttribute('id', `content-tab${i}`);
	
		questionBodyItem.innerHTML = `
		<div class="random-question">
									<div class="random-question__image">
										<img class="question-image" src="../../assets/images/default-bird.jpg" alt="default bird">
									</div>
									<div class="random-question__body">
										<h4 class="random-question__title">******</h4>
										<div class="player">
											<audio src=""></audio>
											<div class="player-controls">
												<button class="play play-icon play-icon-question"></button>
												<div class="player-progress">
													<input class="progress__bar question-progress__bar" type="range" min="0" max="100" value="0">
													<div class="progress__time">
														<div class="time__current question-time__current">00:00</div>
														<div class="time__total question-time__total">00:00</div>
													</div>
												</div>
											</div>
											<div class="player-volume">
												<button class="player-volume-button play-icon play-volume_on"></button>
												<input class="player-volume-range player-volume-range-question" type="range" min="0" max="100" value="70">
											</div>
										</div>
									</div>
								</div>
								<div class="answers">
									<div class="answers__name">
										<ul class="answers-list" data-id-ul = "${i}">
										</ul>
									</div>
									<div class="details" data-id-details = "${i}">
										<p class="instruction">
											<span class="instruction__text">Послушайте плеер.</span>
											<span class="instruction__text">Выберите птицу из списка.</span>
										</p>	
									</div>
								</div>
								<div class="questions__button">
										<a class="button button-next no-active">Следующий вопрос</a>
								</div>
		`;
		questionsTabsNode.appendChild(questionBodyItem);
	}
}

//add tag form as parent for button next
const addTagForm = () => {
	let arrOfButtonNextNodes = document.querySelectorAll('.button-next');
	let parent = arrOfButtonNextNodes[arrOfButtonNextNodes.length - 1].closest('.questions__button');
	parent.innerHTML = `
	<a href="../../pages/result/result.html" class="button button-next no-active">Следующий вопрос</a>
	`;
}


//find index of choosen li in ul
const findIndexOfli = (currentLi) => {
	let indexOfChoosenLi = currentLi.getAttribute('data-id-li')
	return indexOfChoosenLi;
}

//find parent (ul) of choosen li and find index of this ul
const findIndexOfUl = (currentLi) => {
	return currentLi.parentElement.getAttribute('data-id-ul');
}

//check if choosen li has class success
const hasSuccess = (choosenLi) => {
	let valOfSuccess;
	let parent = choosenLi.parentElement;
	let arrOfli = parent.querySelectorAll('.answers-list__item');

	arrOfli.forEach(item => {
		if (item.classList.contains('success')) {
			valOfSuccess = true;
		}
	});
	return valOfSuccess;
}

//do clickable button 'Next question'
const doClickableButton = (inedxOfUl) => {
	let arrayOfButtonsNext = document.querySelectorAll('.button-next');
	arrayOfButtonsNext[inedxOfUl].classList.remove('no-active');
}

//calculate points
const calculateErrorPoints = (countofError, indexOfUl) => {
	countOfError = 0;
	let arrOfUlTag = document.querySelectorAll('.answers-list');
	let arrOfLiTagsOfCurrentUl = arrOfUlTag[indexOfUl].querySelectorAll('.answers-list__item');

	for (let i = 0; i < arrOfLiTagsOfCurrentUl.length; i++) {
		if (arrOfLiTagsOfCurrentUl[i].classList.contains('error')) {
			countOfError++;
		}
	}
}

//calculate the count of the points
const calculatePoints = (countOfError) => {
	let pointsForRightFnswer = 5 - countOfError;
	count = count + pointsForRightFnswer;
	countOfError = 0;
}

//display count of points in score
const displayScore = (count) => {
	let scoreValueNode = document.querySelector('.score-value');
	scoreValueNode.innerHTML = count;
}

//set mark to choosen answer 
const setMarkTochoosenLi = (indexOfUl, indexOfLi, choosenLi) => {
	let booleanValOfSuccess = hasSuccess(choosenLi);
	let rightAnswer = isRightAnswer(indexOfUl, indexOfLi);

	//if li doesn't contains class success
	if (booleanValOfSuccess === true) {
		return;
	}
	if (rightAnswer) {
		choosenLi.classList.add('success');
		playAudio(audio, arrOfSoundsForAnswer[0]);
		stopAudio(audioForBirdQuestion);
		clearInterval(audioPlayQuestionId);
		currentTimeAtTheStartQuestion = 0;
		isPlayForBirdQuestion = false;
		if (indexOfCurrentTimeNode || indexOfCurrentTimeNode === 0) {
			arrayOfCurrentTimeNodesQuestion[indexOfCurrentTimeNode].textContent = '00:00';
			arrayOfInputsProgressBarQuestion[indexOfCurrentTimeNode].value = 0;
		}
		calculatePoints(countOfError);
		displayScore(count);
		if (indexOfUl === '5') {
			setLocalStorageCount(count);
		}
		changePauseWithPlay(currentButtonPlayQuestion);
	}
	else {
		choosenLi.classList.add('error');
		playAudio(audio, arrOfSoundsForAnswer[1]);
		calculateErrorPoints(countOfError, indexOfUl);
	}
}

//check if the choosen answer is right
const isRightAnswer = (indexOfUl, indexOfLi) => {
	if (resultBirdsData[indexOfUl][indexOfLi].isRight === true) {
		doClickableButton(indexOfUl);
		replaceDefaultImage(indexOfUl, indexOfLi);
		replaceDefaultName(indexOfUl, indexOfLi);
		goToNextQuestion(indexOfUl, indexOfLi);
		return true;
	}
	else if (resultBirdsData[indexOfUl][indexOfLi].isRight === false) {
		return false;
	}
}

//get name of answer Of choosen li
const getAnswerName = (tagLi) => {
	let answerName = tagLi.querySelector('.answer__name').innerHTML;
	return answerName;
}

//hide offer to listen the audioplayer
const hideOffer = (indexOfUl) => {
	let arrOfInstructionNodes = document.querySelectorAll('.instruction');
	arrOfInstructionNodes[indexOfUl].classList.add('hidden');
}

//display bird's description when choose answer
const displayDescription = (indexOfUl, indexOfLi) => {
	let arrOfDetailsNode = document.querySelectorAll('.details');
	let arrOfDetailsContent = document.querySelectorAll('.details')[indexOfUl].querySelectorAll('.details__content');

	for (let i = 0; i < 6; i++) {
		arrOfDetailsContent[i].classList.add('hidden');
	}

	arrOfDetailsContent[indexOfLi].classList.remove('hidden');
	arrOfDetailsContent[indexOfLi].querySelector('.details-image').src = `${resultBirdsData[indexOfUl][indexOfLi].image}`;
	arrOfDetailsContent[indexOfLi].querySelector('.details__title').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].name}`;
	arrOfDetailsContent[indexOfLi].querySelector('.details__name').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].species}`;
	arrOfDetailsContent[indexOfLi].querySelector('.description__text').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].description}`;
}

//replace default image
const replaceDefaultImage = (indexOfUl, indexOfLi) => {
	let arrayOfQuestionsBodyNodes = document.querySelectorAll('.questions__body');
	arrayOfQuestionsBodyNodes[indexOfUl].querySelector('.question-image').src = `${resultBirdsData[indexOfUl][indexOfLi].image}`;
}

//replace default bird's name
const replaceDefaultName = (indexOfUl, indexOfLi) => {
	let arrayOfQuestionsBodyNodes = document.querySelectorAll('.questions__body');
	arrayOfQuestionsBodyNodes[indexOfUl].querySelector('.random-question__title').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].name}`;
}

//set value checked for next input wheb clickon the next button
const setCheckedForInput = (indexOfUl,indexOfLi)=> {
	const tabInputNode = document.getElementById(`tab${+indexOfUl+1}`);
	tabInputNode.checked = true;
	countOfError = 0;
}

//go to next question
const goToNextQuestion = (indexOfUl, indexOfLi) => {
	indexOfUl = +indexOfUl;
	let arrayOfButtonsNext = document.querySelectorAll('.questions__button');

	arrayOfButtonsNext[indexOfUl].addEventListener('click', () => {
		if (indexOfUl === 5) {
		}
		else {
			setCheckedForInput(indexOfUl, indexOfLi);
			stopAudio(audioForBird);
			clearInterval(audioPlayAnswerId);
			isPlayForBirdQuestion = false;
			stopAudio(audioForBirdQuestion);
			currentTimeAtTheStartQuestion = 0;	
		}
	});
}

//save value of variable count in local storage
const setLocalStorageCount = (count) => {
    let jsonCountOfPoints = count;
    localStorage.setItem('jsonCountOfPoints', jsonCountOfPoints);
}

//create list of answers for every question
const createListOfAnswers = (arr) => {
	const arrOfUlNode = document.querySelectorAll('.answers-list');

	for (let i = 0; i < arrOfUlNode.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			const liNode = document.createElement('li');
			liNode.className = 'answers-list__item ';
			liNode.setAttribute('data-id-li', `${j}`);
			liNode.innerHTML = `
			<span class="marker"></span><span class="answer__name">${arr[i][j].name}</span>
			`;
			arrOfUlNode[i].appendChild(liNode);

			liNode.addEventListener('click', () => {
				let answerName = getAnswerName(liNode);
				indexOfLi = findIndexOfli(liNode);
				indexOfUl = findIndexOfUl(liNode);
				setMarkTochoosenLi(indexOfUl, indexOfLi, liNode);
				hideOffer(indexOfUl);
				displayDescription(indexOfUl, indexOfLi);
				isPlayForBird = false;
				stopAudio(audioForBird);
				clearInterval(audioPlayAnswerId);
				currentTimeAtTheStartAnswer = 0;
				srcOfAudioForBird = getSrcAudioForBird(indexOfUl, indexOfLi);
				setEventListenerToButtonPlayAnswer(indexOfUl, indexOfLi);
				setEventListenerToInputRangeAnswer(indexOfUl, indexOfLi);
				setEventListenerToInputRangeOfTrackAnswer(indexOfUl, indexOfLi);
				arrayOfInputsProgressBarAnswer[indexOfLi].value = 0;
				arrayOfCurrentTimeNodesAnswer[indexOfLi].textContent = '00:00';
				getArrayOfTotalTimeNodesAnswer(indexOfUl);
				displayTotalTimeOfAudioAnswer(arrayOfTotalTimeNodesAnswer, indexOfUl, indexOfLi, resultBirdsData);
			});
		}
	}
}

//create block details__content in block details for every qustion
const createDetailsContentNodes = ()=> {
	const arrayDetailsNodes = document.querySelectorAll('.details');

	for (let i = 0; i < arrayDetailsNodes.length; i++) {
		for (let j = 0; j < 6; j++) {
			detailsContentItem = document.createElement('div');
			detailsContentItem.className = 'details__content hidden';
			detailsContentItem.setAttribute('data-id-details-content', `${j}`);
			detailsContentItem.innerHTML = `
												<div class="details__block">
													<div class="details__image">
														<img class= "details-image" src="" alt="bird photo">
													</div>
													<div class="details__body">
														<h5 class="details__title"></h5>
														<p class="details__name"></p>
														<div class="player">
															<audio class="audio-player" data-id-audio="${j}" src=""></audio>
															<div class="player-controls">
																<button class="play play-icon play-icon-answer"></button>
																<div class="player-progress answer-player-progress">
																	<input class="progress__bar answer-progress__bar" type="range" min="0" max="100" value="0">
																	<div class="progress__time">
																		<div class="time__current answer-time__current">00:00</div>
																		<div class="time__total answer-time__total">00:00</div>
																	</div>
																</div>	
															</div>
															<div class="player-volume">
																<button class="player-volume-button play-icon play-volume_on"></button>
																<input class="player-volume-range player-volume-range-answer" type="range" min="0" max="100" value="70">
															</div>
														</div>
													</div>
												</div>
												<div class="details__description">
													<p class="description__text"></p>
												</div>	
			`;
			arrayDetailsNodes[i].appendChild(detailsContentItem);
		}
	}
}

//------------AudioPlayer-----------

//get src of audio for choosen bird
const getSrcAudioForBird = (indexOfUl, indexOfLi) => {
	return resultBirdsData[indexOfUl][indexOfLi].audio;
}

//play audiotrack
const playAudio = (objAudio, pathOfSoundtrack) => {
	objAudio.src = pathOfSoundtrack;
	setTimeout(function() {
		objAudio.play();
	}, 0);
}

//stop audiotrack
const stopAudio = (objAudio) => {
	objAudio.src = '';
	objAudio.currentTime = 0;	
}

//pause audiotrack
const pauseAudio = (objAudio) => {
	setTimeout(function() {
		objAudio.pause();
	}, 0);
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

//get current time of audiotrack
const getCurrentTime = (objectAudio) => {
	return Math.floor(objectAudio.currentTime);
}

//get all time of audiotrack
const getAllTime = (objectAudio) => {
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

//get array of question-progress__bar nodes
const getArrayOfProgressBarQuestionNode = () => {
	arrayOfInputsProgressBarQuestion = document.querySelectorAll('.question-progress__bar');
}

/*
//change value of progress bar for question
const changeProgressBarQuestion = (currentProgressBar) => {
	if (isPlayForBirdQuestion === true) {
        audioCurrentTimeQuestion = Math.floor(audioLengthQuestion * currentProgressBar / 100);
		//audioCurrentTimeQuestion = getCurrentTimeOfTrack(audioLengthQuestion, currentProgressBar);
        audioForBirdQuestion.currentTime = audioCurrentTimeQuestion;
    }
    else {
        audioCurrentTimeQuestion = Math.floor(audioLengthQuestion * currentProgressBar / 100);
		//audioCurrentTimeQuestion = getCurrentTimeOfTrack(audioLengthQuestion, currentProgressBar);
        currentTimeAtTheStartQuestion = audioCurrentTimeQuestion;
    }
}
*/
/*
//change value of progress bar for answer
const changeProgressBarAnswer = (currentProgressBar) => {
	if (isPlayForBird === true) {
        audioCurrentTimeAnswer = Math.floor(audioLengthAnswer * currentProgressBar / 100);
		//audioCurrentTimeAnswer = getCurrentTimeOfTrack(audioLengthAnswer, currentProgressBar);
        audioForBird.currentTime = audioCurrentTimeAnswer;
    }
    else {
        audioCurrentTimeAnswer = Math.floor(audioLengthAnswer * currentProgressBar / 100);
		//audioCurrentTimeAnswer = getCurrentTimeOfTrack(audioLengthAnswer, currentProgressBar);
        currentTimeAtTheStartAnswer = audioCurrentTimeAnswer;
    }
}
*/

//change value of progress bar (for question and answer)
const changeProgressBar = (currentValue, isPlay, audioCurrentTime, audioLength, audioObject, currentTimeAtTheStart) => {
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

//set listener of input event for question-progress__bar
const setEventListenerForQuestionBar = (arrOfProgressBar) => {
	for (let i = 0; i < arrOfProgressBar.length; i++) {
		arrOfProgressBar[i].addEventListener('input', () => {
			//changeProgressBarQuestion(arrOfProgressBar[i].value);
			changeProgressBar(arrOfProgressBar[i].value, isPlayForBirdQuestion, audioCurrentTimeQuestion, audioLengthQuestion, audioForBirdQuestion, currentTimeAtTheStartQuestion);
		});
	}
}

//get current question-time node for question
const getArrayOfCurrentTimeNodesQuestion = () => {
	arrayOfCurrentTimeNodesQuestion = document.querySelectorAll('.question-time__current');
}

//get array of total time nodes for question 
const getArrayOfTotalTimeNodesQuestion = () => {
	arrayOfTotalTimeNodesQuestion = document.querySelectorAll('.question-time__total');
}

//get array of total time nodefor answer
const getArrayOfTotalTimeNodesAnswer = (indexOfUl) => {
	arrayOfTotalTimeNodesAnswer = document.querySelectorAll('.details')[indexOfUl].querySelectorAll('.answer-time__total');
}

//display total time Of audio for every question
const displayTotalTimeOfAudio = (arrayOfTotalTime, arrayOfRightPositions, arrayOfBirdsData)=> {
	for (let i = 0; i < arrayOfTotalTime.length; i++) {
		arrayOfTotalTime[i].textContent = arrayOfBirdsData[i][arrayOfRightPositions[i]].duration;
	}
}

//display total time Of audio for progress bar (answer)
const displayTotalTimeOfAudioAnswer = (arr, indexOfUl, indexOfLi, resultBirdsData) => {
	arr[indexOfLi].textContent = resultBirdsData[indexOfUl][indexOfLi].duration;
}

//play Audio For Bird
const playAudioForBird = (currentButtonPlayAnswer, indexI) => {
	indexOfCurrentTimeNodeAnswer = indexI;
	if (isPlayForBird === false) {
		clearInterval(audioPlayAnswerId);
		isPlayForBird = true;
		audioForBird.src = srcOfAudioForBird;
		audioForBird.currentTime = currentTimeAtTheStartAnswer;
		audioForBird.play();

		//playAudio(audioForBird, srcOfAudioForBird);
		audioPlayAnswerId = setInterval(() => {
			//get value on every second of the track
			audioCurrentTimeAnswer = getCurrentTime(audioForBird);
			currentTimeAtTheStartAnswer = audioCurrentTimeAnswer;

			//get all time of the track
			audioLengthAnswer = getAllTime(audioForBird);
			arrayOfInputsProgressBarAnswer[indexI].value = (audioCurrentTimeAnswer * 100) / audioLengthAnswer;
			timeCurrentAnswerNode = arrayOfCurrentTimeNodesAnswer[indexI];

			//display current time of track in progress bar for question
			setBaseTime(audioCurrentTimeAnswer, timeCurrentAnswerNode);

			if (audioCurrentTimeAnswer == audioLengthAnswer) {
				clearInterval(audioPlayAnswerId);
				currentTimeAtTheStartAnswer = 0;
			}
		}, 1000);
		changePlayWithPause(currentButtonPlayAnswer);
	}
	else {
		clearInterval(audioPlayAnswerId);
		isPlayForBird = false;
		pauseAudio(audioForBird);
		currentTimeAtTheStartAnswer = audioCurrentTimeAnswer;
		audioForBird.currentTime = currentTimeAtTheStartAnswer;
		changePauseWithPlay(currentButtonPlayAnswer);
		if (audioCurrentTimeAnswer == audioLengthAnswer) {
			currentTimeAtTheStartAnswer = 0;
		}
	}
}

//play Audio For Bird
const playAudioForBirdQuestion = (currentButtonPlayQuestion, indexI) => {
	indexOfCurrentTimeNode = indexI;
	if (isPlayForBirdQuestion === false) {
		clearInterval(audioPlayQuestionId);
		isPlayForBirdQuestion = true;
		audioForBirdQuestion.src = srcOfAudioForBirdQuestion;
		audioForBirdQuestion.currentTime = currentTimeAtTheStartQuestion;
		audioForBirdQuestion.play();
		audioPlayQuestionId = setInterval(() => {
			//get value on every second of the track
			audioCurrentTimeQuestion = getCurrentTime(audioForBirdQuestion);
			currentTimeAtTheStartQuestion = audioCurrentTimeQuestion;

			//get all time of the track
           	audioLengthQuestion = getAllTime(audioForBirdQuestion);
			arrayOfInputsProgressBarQuestion[indexI].value = (audioCurrentTimeQuestion * 100) / audioLengthQuestion;
			timeCurrentQuestionNode = arrayOfCurrentTimeNodesQuestion[indexI];

			//display current time of track in progress bar for question
           	setBaseTime(audioCurrentTimeQuestion, timeCurrentQuestionNode);

			if (audioCurrentTimeQuestion == audioLengthQuestion) {
            	clearInterval(audioPlayQuestionId);
				currentTimeAtTheStartQuestion = 0;
            }
		}, 1000);
		changePlayWithPause(currentButtonPlayQuestion);
	}
	else {
		clearInterval(audioPlayQuestionId);
		isPlayForBirdQuestion = false;
		pauseAudio(audioForBirdQuestion);
		currentTimeAtTheStartQuestion = audioCurrentTimeQuestion;
		audioForBirdQuestion.currentTime = currentTimeAtTheStartQuestion;
		changePauseWithPlay(currentButtonPlayQuestion);
		if (audioCurrentTimeQuestion == audioLengthQuestion) {
			currentTimeAtTheStartQuestion = 0;
		}
	}
}

//set event listener to button play for answer
const setEventListenerToButtonPlayAnswer = (indexOfUl, indexOfLi) => {
	let arrOfDetailsNodes = document.querySelectorAll('.details');
	let currentDetailsNode = arrOfDetailsNodes[indexOfUl];
	let arrayOfButtonsPlayAnswer = currentDetailsNode.querySelectorAll('.play-icon-answer');

	for (let i = 0; i < arrayOfButtonsPlayAnswer.length; i++) {
		arrayOfButtonsPlayAnswer[i].removeEventListener('click', func);
	}
	currentButtonPlayAnswer = arrayOfButtonsPlayAnswer[indexOfLi];
	changePauseWithPlay(currentButtonPlayAnswer);

	currentButtonPlayAnswer.addEventListener('click', func = function() {
		playAudioForBird(currentButtonPlayAnswer, indexOfLi);
	});
}

//set event listener to button play for question
const setEventListenerToButtonPlayQuestion = (arrayOfIsRightPositions) => {
	let arrOfByttonsPlayQuestion = document.querySelectorAll('.play-icon-question');

	for (let i = 0; i < 6; i++) {
		arrOfByttonsPlayQuestion[i].addEventListener('click', func2 = function() {
			currentButtonPlayQuestion = arrOfByttonsPlayQuestion[i];

			//get src of audio Of right bird
			srcOfAudioForBirdQuestion = getSrcAudioForBird(i, arrayOfIsRightPositions[i]);
			playAudioForBirdQuestion(currentButtonPlayQuestion, i);
		});
	}
}

//change audio volume
const changeAudioVolume = (objectAudio, valueOfPlayerVolume) => {
	let convertedValue = valueOfPlayerVolume / 100;
    objectAudio.volume = convertedValue;
}

//set initial volume for audio
const setBaseVolume = (objectAudio, currentInputRange) => {
    objectAudio.volume = currentInputRange.value / 100;
}

//set event listener to input range for question (change volume)
const setEventListenerToInputRangeQuestion = () => {
	let arrOfInputsRangeQuestion = document.querySelectorAll('.player-volume-range-question');

	for (let i = 0; i < arrOfInputsRangeQuestion.length; i++) {
		setBaseVolume(audioForBirdQuestion, arrOfInputsRangeQuestion[i]);
		arrOfInputsRangeQuestion[i].addEventListener('input', () => {
			changeAudioVolume(audioForBirdQuestion, arrOfInputsRangeQuestion[i].value);
		});
	}
}

//set event listener to input range for answer (change volume)
const setEventListenerToInputRangeAnswer = (indexOfUl, indexOfLi) => {
	let arrayOfInputsRangeAnswer = document.querySelectorAll('.details')[indexOfUl].querySelectorAll('.player-volume-range-answer');
	setBaseVolume(audioForBird, arrayOfInputsRangeAnswer[indexOfLi]);

	arrayOfInputsRangeAnswer[indexOfLi].addEventListener('input', () => {
		changeAudioVolume(audioForBird, arrayOfInputsRangeAnswer[indexOfLi].value);
	});
}

//set event listener to input range for track for answer  (change value of progress bar)
const setEventListenerToInputRangeOfTrackAnswer = (indexOfUl, indexOfLi) => {
	arrayOfInputsProgressBarAnswer = document.querySelectorAll('.details')[indexOfUl].querySelectorAll('.answer-progress__bar');
	arrayOfCurrentTimeNodesAnswer = document.querySelectorAll('.details')[indexOfUl].querySelectorAll('.answer-time__current');
	
	for (let i = 0; i < arrayOfInputsProgressBarAnswer.length; i++) {
		arrayOfInputsProgressBarAnswer[i].addEventListener('input', () => {
			//changeProgressBarAnswer(arrayOfInputsProgressBarAnswer[i].value);
			changeProgressBar(arrayOfInputsProgressBarAnswer[i].value, isPlayForBird, audioCurrentTimeAnswer, audioLengthAnswer, audioForBird, currentTimeAtTheStartAnswer);
		});
	}
}

//------------End of Audio Player

let shuffleBirdsData = shuffleArray(birdsData);
let resultBirdsData = shuffleObjectsInArray(shuffleBirdsData);
console.log('Массив перемешенных птичек resultBirdsData: ');
console.log(resultBirdsData);

setIsRight(resultBirdsData);
createBlockQuestionsBody();
addTagForm();
createDetailsContentNodes();
createListOfAnswers(resultBirdsData);
setEventListenerToButtonPlayQuestion(arrayOfIsRightPositions);
setEventListenerToInputRangeQuestion();
getArrayOfProgressBarQuestionNode();
getArrayOfCurrentTimeNodesQuestion();
getArrayOfTotalTimeNodesQuestion();
displayTotalTimeOfAudio(arrayOfTotalTimeNodesQuestion, arrayOfIsRightPositions, resultBirdsData);
setEventListenerForQuestionBar(arrayOfInputsProgressBarQuestion);

console.log('Оценка: 250 из 270');
console.log('Не сделана галерея и перевод');