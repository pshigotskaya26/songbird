import birdsData from "./birds.js";


const questionsTabsNode = document.querySelector('.questions__tabs');
console.log('questionsTabsNode: ', questionsTabsNode);

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
		questionBodyItem.setAttribute('id', `content-tab${i + 1}`);
	
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
									<div class="details">
										<p class="instruction">
											<span class="instruction__text">Послушайте плеер.${i+1}</span>
											<span class="instruction__text">Выберите птицу из списка.</span>
										</p>
										<div class="details__content hidden">
											<div class="details__block">
												<div class="details__image">
													<img src="" alt="">
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
									<button class="button button-next no-active">Следующий вопрос</button>
								</div>
		`;
		questionsTabsNode.appendChild(questionBodyItem);
	}
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

//set mark to choosen answer 
const setMarkTochoosenLi = (indexOfUl, indexOfLi, choosenLi) => {
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
	}
	else {
		choosenLi.classList.add('error');
	}
}

//check if the choosen answer is right
const isRightAnswer = (indexOfUl, indexOfLi) => {
	if (resultBirdsData[indexOfUl][indexOfLi].isRight === true) {
		doClickableButton(indexOfUl);
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
			});
		}
	}
}

let shuffleBirdsData = shuffleArray(birdsData);
console.log('shuffleBirdsData: ', shuffleBirdsData);

let resultBirdsData = shuffleObjectsInArray(shuffleBirdsData);
console.log('resultBirdsData: ', resultBirdsData);

setIsRight(resultBirdsData);

createBlockQuestionsBody();

createListOfAnswers(resultBirdsData);
