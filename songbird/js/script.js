import birdsData from "./birds.js";


const questionsTabsNode = document.querySelector('.questions__tabs');
console.log('questionsTabsNode: ', questionsTabsNode);

const arrOfSoundsForAnswer = ['../../assets/sounds/correct-answer.mp3', '../../assets/sounds/incorrect-answer.mp3'];
let count = 0;
let countOfError = 0;

const audio = new Audio();

const playAudio = (pathOfSoundtrack) => {
	audio.src = pathOfSoundtrack;
    audio.play();
}

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
												<button class="play play-icon"></button>
												<div class="player-progress">
													<input class="progress__bar" type="range" min="0" max="100" value="0">
													<div class="progress__time">
														<div class="time__current">0:00</div>
														<div class="time__total"></div>
													</div>
												</div>
											</div>
											<div class="player-volume">
												<button class="player-volume-button play-icon play-volume_on"></button>
												<input class="player-volume-range" type="range" min="0" max="100" value="70">
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
										<div class="details__content hidden">
											<div class="details__block">
												<div class="details__image">
													<img class= "details-image" src="" alt="">
												</div>
												<div class="details__body">
													<h5 class="details__title"></h5>
													<p class="details__name"></p>
													<div class="player">
														<audio src=""></audio>
														<div class="player-controls">
															<button class="play play-icon"></button>
															<div class="player-progress">
																<input class="progress__bar" type="range" min="0" max="100" value="0">
																<div class="progress__time">
																	<div class="time__current">0:00</div>
																	<div class="time__total"></div>
																</div>
															</div>	
														</div>
														<div class="player-volume">
															<button class="player-volume-button play-icon play-volume_on"></button>
															<input class="player-volume-range" type="range" min="0" max="100" value="70">
														</div>
													</div>
												</div>
											</div>
											<div class="details__description">
												<p class="description__text"></p>
											</div>
										</div>
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
	console.log('---arrOfButtonNextNodes--: ', arrOfButtonNextNodes);
	let parent = arrOfButtonNextNodes[arrOfButtonNextNodes.length - 1].closest('.questions__button');
	console.log('parent----5--: ', parent);
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
	console.log('parent: ', currentLi.parentElement.getAttribute('data-id-ul'));
	return currentLi.parentElement.getAttribute('data-id-ul');
}

//check if choosen li has class success
const hasSuccess = (choosenLi) => {
	let valOfSuccess;
	let parent = choosenLi.parentElement;
	//console.log('parent in hasSuccess: ', parent);

	let arrOfli = parent.querySelectorAll('.answers-list__item');
	arrOfli.forEach(item => {
		if (item.classList.contains('success')) {
			//console.log('----li consists class success');
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
	console.log('arrOfLiTagsOfCurrentUl:-----^: ', arrOfLiTagsOfCurrentUl);

	for (let i = 0; i < arrOfLiTagsOfCurrentUl.length; i++) {
		if (arrOfLiTagsOfCurrentUl[i].classList.contains('error')) {
			console.log('--contains class ERROR');
			countOfError++
			console.log('countOfError: ', countOfError);
		}
	}
}

//calculate the count of the points
const calculatePoints = (countOfError) => {
	console.log('countOfError at start in calcilate: ', countOfError);

	let pointsForRightFnswer = 5 - countOfError;
	console.log('pointsForRightFnswer: ', pointsForRightFnswer);

	count = count + pointsForRightFnswer;
	console.log('count: ', count);

	countOfError = 0;

	console.log('countOfError at end in calcilate: ', countOfError);
}

//display count of points in score
const displayScore = (count) => {
	let scoreValueNode = document.querySelector('.score-value');
	scoreValueNode.innerHTML = count;
}

//set mark to choosen answer 
const setMarkTochoosenLi = (indexOfUl, indexOfLi, choosenLi) => {
	console.log('----indexOfUl:---------- ', typeof(indexOfUl));
	let booleanValOfSuccess = hasSuccess(choosenLi);
	console.log('booleanValOfSuccess: ', booleanValOfSuccess);

	let rightAnswer = isRightAnswer(indexOfUl, indexOfLi);

	//if li doesn't contains class success
	if (booleanValOfSuccess === true) {
		//console.log('booleanValOfSuccess: ', booleanValOfSuccess);
		return;
	}

	if (rightAnswer) {
		choosenLi.classList.add('success');
		playAudio(arrOfSoundsForAnswer[0]);
		calculatePoints(countOfError);
		displayScore(count);
		if (indexOfUl === '5') {
			setLocalStorageCount(count);
		}
	
	}
	else {
		choosenLi.classList.add('error');
		playAudio(arrOfSoundsForAnswer[1]);
		calculateErrorPoints(countOfError, indexOfUl);
	}
}

//check if the choosen answer is right
const isRightAnswer = (indexOfUl, indexOfLi) => {
	if (resultBirdsData[indexOfUl][indexOfLi].isRight === true) {
		doClickableButton(indexOfUl);
		replaceDefaultImage(indexOfUl, indexOfLi);
		replaceDefaultName(indexOfUl, indexOfLi);
		goToNextQuestion(indexOfUl);
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
	//console.log('arrOfInstructionNodes: ', arrOfInstructionNodes);
	arrOfInstructionNodes[indexOfUl].classList.add('hidden');
}

//display bird's description when choose answer
const displayDescription = (indexOfUl, indexOfLi) => {
	let arrOfDetailsNode = document.querySelectorAll('.details');
	console.log('arrOfDetailsNode: ', arrOfDetailsNode);

	arrOfDetailsNode[indexOfUl].querySelector('.details__content').classList.remove('hidden');

	arrOfDetailsNode[indexOfUl].querySelector('.details-image').src = `${resultBirdsData[indexOfUl][indexOfLi].image}`;
	arrOfDetailsNode[indexOfUl].querySelector('.details__title').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].name}`;
	arrOfDetailsNode[indexOfUl].querySelector('.details__name').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].species}`;
	arrOfDetailsNode[indexOfUl].querySelector('.description__text').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].description}`;
}

//replace default image
const replaceDefaultImage = (indexOfUl, indexOfLi) => {
	let arrayOfQuestionsBodyNodes = document.querySelectorAll('.questions__body');
	console.log('arrayOfQuestionsBodyNodes: ', arrayOfQuestionsBodyNodes);
	arrayOfQuestionsBodyNodes[indexOfUl].querySelector('.question-image').src = `${resultBirdsData[indexOfUl][indexOfLi].image}`;
}

//replace default bird's name
const replaceDefaultName = (indexOfUl, indexOfLi) => {
	let arrayOfQuestionsBodyNodes = document.querySelectorAll('.questions__body');
	console.log('arrayOfQuestionsBodyNodes: ', arrayOfQuestionsBodyNodes);
	arrayOfQuestionsBodyNodes[indexOfUl].querySelector('.random-question__title').innerHTML = `${resultBirdsData[indexOfUl][indexOfLi].name}`;
}

//set value checked for next input wheb clickon the next button
const setCheckedForInput = (index)=> {
	const tabInputNode = document.getElementById(`tab${+index+1}`);
	tabInputNode.checked = true;
	countOfError = 0;
}

//go to next question
const goToNextQuestion = (indexOfUl) => {
	indexOfUl = +indexOfUl;
	console.log('indexOfUl: -----^- ', indexOfUl);
	let arrayOfButtonsNext = document.querySelectorAll('.questions__button');
	arrayOfButtonsNext[indexOfUl].addEventListener('click', () => {
		if (indexOfUl === 5) {
			//let parent = arrayOfButtonsNext[indexOfUl].closest('.questions__button');
		}
		else {
			setCheckedForInput(indexOfUl);
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
	console.log('arrOfUlNode: ', arrOfUlNode);

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
				console.log(arrOfUlNode[i], liNode);
				
				let answerName = getAnswerName(liNode);
				console.log('answerName: ', answerName);

				//let indexOfLi = findIndexOfli(arrOfUlNode[i], answerName);

				let indexOfLi = findIndexOfli(liNode);

				let indexOfUl = findIndexOfUl(liNode);

				setMarkTochoosenLi(indexOfUl, indexOfLi, liNode);

				hideOffer(indexOfUl);

				displayDescription(indexOfUl, indexOfLi);
			});
		}
	}
}

/*
const saveScore = () => {
	let buttonsNext = document.querySelectorAll('.button-next');
	buttonsNext[buttonsNext.length - 1].addEventListener('click', () => {
		setLocalStorageCount(count);
	});
}

*/
let shuffleBirdsData = shuffleArray(birdsData);
console.log('shuffleBirdsData: ', shuffleBirdsData);

let resultBirdsData = shuffleObjectsInArray(shuffleBirdsData);
console.log('resultBirdsData: ', resultBirdsData);

setIsRight(resultBirdsData);

createBlockQuestionsBody();

addTagForm();

createListOfAnswers(resultBirdsData);


//setLocalStorageCount(count)

//setLocalStorageCount(count);
//window.addEventListener('beforeunload', setLocalStorageCount);


