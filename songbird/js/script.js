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

const audio = new Audio();
const audioForBird = new Audio();
const audioForBirdQuestion = new Audio();

let isPlayForBird = false;
let isPlayForBirdQuestion = false;
let currentButtonPlayQuestion;

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
				console.log('arrayOfIsRightPositions: ', arrayOfIsRightPositions);
			}
			else if (j !== randomIndex) {
				arr[i][j].isRight = false;
			}
		}
	}
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
													<input class="progress__bar" type="range" min="0" max="100" value="0">
													<div class="progress__time">
														<div class="time__current">00:00</div>
														<div class="time__total"></div>
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
	<a href="../../pages/result/index.html" class="button button-next no-active">Следующий вопрос</a>
	`;
}


//find index of choosen li in ul
const findIndexOfli = (currentLi) => {
	let indexOfChoosenLi = currentLi.getAttribute('data-id-li')
	console.log('indexOfChoosenLi: ', indexOfChoosenLi);
	return indexOfChoosenLi;
}

//find parent (ul) of choosen li and find index of this ul
const findIndexOfUl = (currentLi) => {
	console.log('parent Ul: ', currentLi.parentElement.getAttribute('data-id-ul'));
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
			countOfError++
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
		isPlayForBirdQuestion = false;
		changePauseWithPlay(currentButtonPlayQuestion);

		calculatePoints(countOfError);
		displayScore(count);
		if (indexOfUl === '5') {
			setLocalStorageCount(count);
		}
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
	//console.log('ul, li: ', indexOfUl, indexOfLi, typeof(indexOfUl));
	let arrOfDetailsNode = document.querySelectorAll('.details');
	//console.log('arrOfDetailsNode---: ', arrOfDetailsNode);

	let arrOfDetailsContent = document.querySelectorAll('.details')[indexOfUl].querySelectorAll('.details__content');

	for (let i = 0; i < 6; i++) {
		arrOfDetailsContent[i].classList.add('hidden');
	}

	arrOfDetailsContent[indexOfLi].classList.remove('hidden');
	arrOfDetailsContent[indexOfLi].querySelector('.details-image').src = `${resultBirdsData[indexOfUl][indexOfLi].image}`;
	arrOfDetailsContent[indexOfLi].querySelector('.details__title').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].name}`;
	arrOfDetailsContent[indexOfLi].querySelector('.details__name').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].species}`;
	arrOfDetailsContent[indexOfLi].querySelector('.description__text').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].description}`;

	//arrofDetailsContentNode[indexOfLi].classList.remove('hidden');
	//arrOfDetailsNode[indexOfUl].querySelector('.details__content').classList.remove('hidden');
	//arrOfDetailsNode[indexOfUl].querySelector('.details-image').src = `${resultBirdsData[indexOfUl][indexOfLi].image}`;
	//arrOfDetailsNode[indexOfUl].querySelector('.details__title').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].name}`;
	//arrOfDetailsNode[indexOfUl].querySelector('.details__name').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].species}`;
	//arrOfDetailsNode[indexOfUl].querySelector('.description__text').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].description}`;
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
			isPlayForBirdQuestion = false;
			stopAudio(audioForBirdQuestion);
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
	//console.log('arrOfUlNode: ', arrOfUlNode);

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
				

				console.log('isPlayForBird when click li: ', isPlayForBird);
				srcOfAudioForBird = getSrcAudioForBird(indexOfUl, indexOfLi);
				console.log('srcOfAudioForBird: ', srcOfAudioForBird);

				setEventListenerToButtonPlayAnswer(indexOfUl, indexOfLi);
				setEventListenerToInputRangeAnswer(indexOfUl, indexOfLi);
			});
		}
	}
}

//create block details__content in block details for every qustion
const createDetailsContentNodes = ()=> {
	const arrayDetailsNodes = document.querySelectorAll('.details');
	//console.log('arrayDetailsNodes: ', arrayDetailsNodes);

	for (let i = 0; i < arrayDetailsNodes.length; i++) {
		for (let j = 0; j < 6; j++) {
			detailsContentItem = document.createElement('div');
			detailsContentItem.className = 'details__content hidden';
			detailsContentItem.setAttribute('data-id-details-content', `${j}`);
		
			detailsContentItem.innerHTML = `
												<div class="details__block">
													<div class="details__image">
														<img class= "details-image" src="" alt="">
													</div>
													<div class="details__body">
														<h5 class="details__title"></h5>
														<p class="details__name"></p>
														<div class="player">
															<audio class="audio-player" data-id-audio="${j}" src=""></audio>
															<div class="player-controls">
																<button class="play play-icon play-icon-answer"></button>
																<div class="player-progress">
																	<input class="progress__bar" type="range" min="0" max="100" value="0">
																	<div class="progress__time">
																		<div class="time__current">00:00</div>
																		<div class="time__total"></div>
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

let currentTimeAtDteStartAnswer = 0;
let timeCurrentAnswerNode;
let progressTotalAnswerTime;
let audioPlayAnswerId;
let srcOfAudioForBird;
let srcOfAudioForBirdQuestion;
let currentButtonPlayAnswer;



//get src of audio for choosen bird
const getSrcAudioForBird = (indexOfUl, indexOfLi) => {
	return resultBirdsData[indexOfUl][indexOfLi].audio;
}

//play audiotrack
const playAudio = (objAudio, pathOfSoundtrack) => {
	//objAudio.load();
	objAudio.src = pathOfSoundtrack;
	setTimeout(function() {
		objAudio.play();
	}, 0);
}

//stop audiotrack
const stopAudio = (objAudio) => {
	//objAudio.load();
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
	buttonPlay.classList.remove('pause');
}

//play Audio For Bird
const playAudioForBird = (currentButtonPlayAnswer) => {
	if (isPlayForBird === false) {
		isPlayForBird = true;
		console.log('isPlayForBird false -> true: ', isPlayForBird);
		playAudio(audioForBird, srcOfAudioForBird);
		changePlayWithPause(currentButtonPlayAnswer);
	}
	else {
		isPlayForBird = false;
		pauseAudio(audioForBird);
		changePauseWithPlay(currentButtonPlayAnswer);
		console.log('isPlayForBird true -> false: ', isPlayForBird);
	}
}

//play Audio For Bird
const playAudioForBirdQuestion = (currentButtonPlayQuestion) => {
	if (isPlayForBirdQuestion === false) {
		isPlayForBirdQuestion = true;
		console.log('isPlayForBirdQuestion false -> true: ', isPlayForBirdQuestion);
		playAudio(audioForBirdQuestion, srcOfAudioForBirdQuestion);
		changePlayWithPause(currentButtonPlayQuestion);
	}
	else {
		isPlayForBirdQuestion = false;
		pauseAudio(audioForBirdQuestion);
		changePauseWithPlay(currentButtonPlayQuestion);
		console.log('isPlayForBirdQuestion true -> false: ', isPlayForBirdQuestion);
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
		playAudioForBird(currentButtonPlayAnswer);
	});
}


//set event listener to button play for question
const setEventListenerToButtonPlayQuestion = (arrayOfIsRightPositions) => {
	let arrOfByttonsPlayQuestion = document.querySelectorAll('.play-icon-question');
	console.log('arrOfByttonsPlayQuestion: - ', arrOfByttonsPlayQuestion);

	for (let i = 0; i < 6; i++) {
		arrOfByttonsPlayQuestion[i].addEventListener('click', () => {
			console.log(`hello ${i}`);
			currentButtonPlayQuestion = arrOfByttonsPlayQuestion[i];

			//get src of audio Of right bird
			srcOfAudioForBirdQuestion = getSrcAudioForBird(i, arrayOfIsRightPositions[i]);
			console.log('srcOfAudioForBirdQuestion: ', srcOfAudioForBirdQuestion);

			playAudioForBirdQuestion(currentButtonPlayQuestion);
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
	console.log('currentInputRange.value: ', currentInputRange.value);
    objectAudio.volume = currentInputRange.value / 100;
	console.log('objectAudio.volume: ', objectAudio.volume);
}

//set event listener to input range for question
const setEventListenerToInputRangeQuestion = () => {
	let arrOfInputsRangeQuestion = document.querySelectorAll('.player-volume-range-question');
	console.log('arrOfInputsRangeQuestion: - ', arrOfInputsRangeQuestion);

	for (let i = 0; i < arrOfInputsRangeQuestion.length; i++) {
		setBaseVolume(audioForBirdQuestion, arrOfInputsRangeQuestion[i]);
		arrOfInputsRangeQuestion[i].addEventListener('input', () => {
			console.log(`hello!`);
			changeAudioVolume(audioForBirdQuestion, arrOfInputsRangeQuestion[i].value);
		});
	}
}


//set event listener to input range for answer
const setEventListenerToInputRangeAnswer = (indexOfUl, indexOfLi) => {

	let arrayOfInputsRangeAnswer = document.querySelectorAll('.details')[indexOfUl].querySelectorAll('.player-volume-range-answer');
	console.log('arrayOfInputsRangeAnswer: - ', arrayOfInputsRangeAnswer);

	//for (let i = 0; i < arrayOfInputsRangeAnswer.length; i++) {
		setBaseVolume(audioForBird, arrayOfInputsRangeAnswer[indexOfLi]);
		arrayOfInputsRangeAnswer[indexOfLi].addEventListener('input', () => {
			console.log(`hello answer!`);
			changeAudioVolume(audioForBird, arrayOfInputsRangeAnswer[indexOfLi].value);
		});
	//}
}

//------------End of Audio Player



let shuffleBirdsData = shuffleArray(birdsData);
console.log('shuffleBirdsData: ', shuffleBirdsData);

let resultBirdsData = shuffleObjectsInArray(shuffleBirdsData);
console.log('resultBirdsData: ', resultBirdsData);

setIsRight(resultBirdsData);
createBlockQuestionsBody();
addTagForm();
createDetailsContentNodes();
createListOfAnswers(resultBirdsData);

setEventListenerToButtonPlayQuestion(arrayOfIsRightPositions);
setEventListenerToInputRangeQuestion();



//setLocalStorageCount(count)

//setLocalStorageCount(count);
//window.addEventListener('beforeunload', setLocalStorageCount);




