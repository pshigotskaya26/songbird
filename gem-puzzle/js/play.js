const arrayInputsRadio = document.querySelectorAll('.other__input');
const playNode = document.querySelector('.play');
const spanNodeCurrentValue = document.querySelector('.current__value');
const spanNodeMoveValue = document.querySelector('.move__value');
const spanNodeTimeMinute = document.querySelector('.time__minute');
const spanNodeTimeSecond = document.querySelector('.time__second');

const audio = new Audio();

let sizeOfPlayItem;
let sizeOfPuzzle;
let baseArrayOfNumbers;
let correctArray;
let shuffleArrayOfNumbers;
let isWin;
let countTheMoves;

let minutes;
let seconds;
let idSetInterval;

minutes = 0;
seconds = 0;
countTheMoves = 0;

//play audiotrack when one puzzle is moving
const playAudio = () => {
    audio.src = 'assets/sounds/puzzle.mp3';
    audio.play();
}

//coordinaty of an empty item
const empty = {
    value: 0,
    top: 0,
    left: 0
};

//array of objects play-items with own coordinates
let playItems;

//function of checking what size of puzzle is choosen
const getSizeOfPuzzle = () => {
    for (let i = 0; i < arrayInputsRadio.length; i++) {
        if (arrayInputsRadio[i].checked) {
             return arrayInputsRadio[i].value;
        }
    }
}

//create array Of numbers depending on the size of puzzle
const createArrayOfNumbers = (gotSizeOfPuzzle) => {
    let numberGotSizeOfPuzzle = +gotSizeOfPuzzle;
    baseArrayOfNumbers = [];
    
    let lengthArrayOfNumbers = numberGotSizeOfPuzzle * numberGotSizeOfPuzzle;

    for (let i = 1; i < lengthArrayOfNumbers; i++) {
        baseArrayOfNumbers.push(i);
    }
}

//create correct array for checking of finish puzzle
const createCorrectArray = (baseArrayOfNumbers, sizeOfPuzzle) => {
    sizeOfPuzzle = +sizeOfPuzzle;
    correctArray = [];
    let correctLeft;
    let correctTop;
    let iIndex = 0;
    let jIndex = 0;
    
    for (let i = 0; i < baseArrayOfNumbers.length; i++) {
        if (iIndex < sizeOfPuzzle) {
            correctLeft = iIndex;
            correctTop = jIndex;

            correctArray.push({
                value: baseArrayOfNumbers[i],
                left: correctLeft,
                top: correctTop
            });
            iIndex++;
        }
        if (iIndex >= sizeOfPuzzle) {
            iIndex = 0;
            jIndex++;
        }
    }
}

//shuffle array of numbers
const shuffleArray = (baseArray) => {
    for (let i = baseArray.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let current = baseArray[i];
        baseArray[i] = baseArray[randomIndex];
        baseArray[randomIndex] = current;
    }
    return baseArray;
}

//create function MovePlayItem
const movePlayItem = (index) => {
    const playItem = playItems[index];
    const diffLeft = Math.abs(playItem.left - empty.left);
    const diffTop = Math.abs(playItem.top - empty.top);

    //if sum > 1 , this means that playitem and emptyitem are not neighboring
    if (diffTop + diffLeft > 1) {
        return;
    }
    playItem.element.style.left = `${empty.left * sizeOfPlayItem}px`;
    playItem.element.style.top = `${empty.top * sizeOfPlayItem}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = playItem.left;
    empty.top = playItem.top;

    playItem.left = emptyLeft;
    playItem.top = emptyTop;

    playAudio();
    countTheMoves++;
    displayCountOfMoves(countTheMoves);

    isWin = isPuzzlesCorrect(playItems, correctArray);
    if (isWin) {
        pauseTimer();
        setTimeout(()=>{
            alert(`Hooray! You solved the puzzle in ${minutes} : ${seconds} and ${countTheMoves} moves!`);
        }, 1000);
        
        playNode.classList.add('play_noactive');
        buttonStop.classList.add('button_noactive');
        buttonSave.classList.remove('button_noactive');
    }  
}

//check if the puzzles are correctly collected

const isPuzzlesCorrect = (arrayPlayItems, correctArray) => {
    let result = [];

    for (let i = 0; i < correctArray.length; i++) {
        let valueInCorrect = correctArray[i].value;
  
        for (let j = 1; j < arrayPlayItems.length; j++) {
            let valueplayItems = arrayPlayItems[j].value;
            if (valueplayItems === valueInCorrect) {
                if (correctArray[i].left === arrayPlayItems[j].left && correctArray[i].top === arrayPlayItems[j].top) {
                    result.push(true);
                }
            }
        }
    }
    if (result.length === correctArray.length) {
        result.forEach(item => {
            if (item === false) {
                return false;
            }
        });
        return true;
    }
}


//display the Count of the moves
const displayCountOfMoves = (countMoves) => {
    spanNodeMoveValue.innerHTML = countMoves;
}

//display minutes and seconds on the page
const displayTime = (minutes, seconds) => {
    if (minutes >= 10) {
        spanNodeTimeMinute.innerHTML = minutes;
    }
    else if (minutes < 10){
        spanNodeTimeMinute.innerHTML = `0${minutes}`;
    }
    if (seconds >= 10) {
        spanNodeTimeSecond.innerHTML = seconds;
    }
    else if (seconds < 10){
        spanNodeTimeSecond.innerHTML = `0${seconds}`;
    }
}

//start timer
const startTimer = () => {
    pauseTimer();
    idSetInterval = setInterval(() => {
        timer();
    }, 1000);
}

//pause timer
const pauseTimer = () => {
    clearInterval(idSetInterval);
}

//const reset timer
const resetTimer = () => {
    pauseTimer();
    minutes = 0;
    seconds = 0;
    displayTime(minutes, seconds);
}

// taimer
const timer = () => {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    displayTime(minutes, seconds);
}

//function of creating elements depending on size of puzzle
const createPuzzle = (size) => {
    playNode.innerHTML = '';
    playItems = [];

    empty.top = 0;
    empty.left = 0;
    playItems.push(empty);

    for (let i = 1; i < (size*size); i++) {
        const playItem = document.createElement('div');

        if (size === '3') {
            playItem.className = 'play-item-3';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 100;
        }
        else if (size === '4') {
            playItem.className = 'play-item-4';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 75;
        }
        else if (size === '5') {
            playItem.className = 'play-item-5';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 60;
        }
        else if (size === '6') {
            playItem.className = 'play-item-6';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 50;
        }
        else if (size === '7') {
            playItem.className = 'play-item-7';
            playNode.style.width = '296px';
            playNode.style.height = '296px';
            sizeOfPlayItem = 42;
        }
        else if (size === '8') {
            playItem.className = 'play-item-8';
            playNode.style.width = '298px';
            playNode.style.height = '298px';
            sizeOfPlayItem = 37;
        }

        const value = shuffleArrayOfNumbers[i - 1];
        playItem.innerHTML = value;

        const left = i % (+size);
        const top = (i - left) / (+size);

        //add object (play-item with its left and top coordinates)
        playItems.push({
            value: value,
            left: left,
            top: top,
            element: playItem
        });

        playItem.style.left = `${left * sizeOfPlayItem}px`;
        playItem.style.top = `${top * sizeOfPlayItem}px`;
        
        playNode.append(playItem);

        playItem.addEventListener('click', () => {
            movePlayItem(i);
            setLocalStoragePlayItems();
        });
    }
}

//function of creating elements depending on size of puzzle from local
const createPuzzleLocal = (size) => {
    empty.top = playItems[0].top;
    empty.left = playItems[0].left;
    playNode.innerHTML = '';

    for (let i = 1; i < (size*size); i++) {
        const playItem = document.createElement('div');

        if (size === '3') {
            playItem.className = 'play-item-3';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 100;
        }
        else if (size === '4') {
            playItem.className = 'play-item-4';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 75;
        }
        else if (size === '5') {
            playItem.className = 'play-item-5';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 60;
        }
        else if (size === '6') {
            playItem.className = 'play-item-6';
            playNode.style.width = '302px';
            playNode.style.height = '302px';
            sizeOfPlayItem = 50;
        }
        else if (size === '7') {
            playItem.className = 'play-item-7';
            playNode.style.width = '296px';
            playNode.style.height = '296px';
            sizeOfPlayItem = 42;
        }
        else if (size === '8') {
            playItem.className = 'play-item-8';
            playNode.style.width = '298px';
            playNode.style.height = '298px';
            sizeOfPlayItem = 37;
        }

        playItems[i].element = playItem;
     
        const value = playItems[i].value;
        playItem.innerHTML = value;

        playItem.style.left = `${playItems[i].left * sizeOfPlayItem}px`;
        playItem.style.top = `${playItems[i].top * sizeOfPlayItem}px`;
        playNode.append(playItem);

        playItem.addEventListener('click', () => {
            movePlayItem(i);
            setLocalStoragePlayItems();
        });
    }
}

//display sizeOfPuzzle
const displaySizeOfPuzzle = (sizeOfPuzzle) => {
    spanNodeCurrentValue.innerHTML = `${(+sizeOfPuzzle) + 'x' + (+sizeOfPuzzle)}`;
}

for (let i = 0; i < arrayInputsRadio.length; i++) {
    arrayInputsRadio[i].addEventListener('change', () => {
        sizeOfPuzzle = getSizeOfPuzzle();
        createArrayOfNumbers(sizeOfPuzzle);
        createCorrectArray(baseArrayOfNumbers, sizeOfPuzzle);

        shuffleArrayOfNumbers = shuffleArray(baseArrayOfNumbers);
        setLocalStorageBaseShuffleArrayOfNumbers();
        createPuzzle(sizeOfPuzzle);
        displaySizeOfPuzzle(sizeOfPuzzle);

        countTheMoves = 0;
        displayCountOfMoves(countTheMoves);
        resetTimer();

        playNode.classList.add('play_noactive');
        buttonStart.classList.remove('button_noactive');
        buttonStop.classList.add('button_noactive');
    });
}

sizeOfPuzzle = getSizeOfPuzzle();
createArrayOfNumbers(sizeOfPuzzle);
createCorrectArray(baseArrayOfNumbers, sizeOfPuzzle)

shuffleArrayOfNumbers = shuffleArray(baseArrayOfNumbers);
createPuzzle(sizeOfPuzzle);
displaySizeOfPuzzle(sizeOfPuzzle);
displayCountOfMoves(countTheMoves);
displayTime(minutes, seconds);

//save sizeOfPuzzle in local storage
const setLocalStorageSizeOfPuzzle = () => {
    let jsonSizeOfPuzzle = JSON.stringify(sizeOfPuzzle);
    localStorage.setItem('sizeOfPuzzle', jsonSizeOfPuzzle); 
}

//save correctArray in local storage
const setLocalStorageCorrectArray = () => {
    let jsonCorrectArray = JSON.stringify(correctArray);
    localStorage.setItem('correctArray', jsonCorrectArray);
}

//save playItems in local storage
const setLocalStoragePlayItems = () => {
    playItems[0].top = empty.top;
    playItems[0].left = empty.left;

    let jsonPlayItems = JSON.stringify(playItems);
    localStorage.setItem('playItems', jsonPlayItems);
}

//save moveValue in local storage
const setLocalStorageMoveValue = () => {
    countTheMoves = spanNodeMoveValue.innerHTML;
    let jsonCountMoves = JSON.stringify(countTheMoves);
    localStorage.setItem('countTheMoves', jsonCountMoves);
}

//save TimeMinute in local storage
const setLocalStorageTimeMinute = () => {
    minutes = spanNodeTimeMinute.innerHTML;
    let jsonMinutes = JSON.stringify(minutes);
    localStorage.setItem('minutes', jsonMinutes);
}

//save TimeSeconds in local storage
const setLocalStorageTimeSeconds = () => {
    seconds = spanNodeTimeSecond.innerHTML;
    let jsonSeconds = JSON.stringify(seconds);
    localStorage.setItem('seconds', jsonSeconds);
}

//save primery PlayItems in local storage
const setLocalStorageBaseShuffleArrayOfNumbers = () => {
    let jsonBaseShuffleArrayOfNumbers = JSON.stringify(shuffleArrayOfNumbers);
    localStorage.setItem('shuffleArrayOfNumbers', jsonBaseShuffleArrayOfNumbers);
}

//get sizeOfPuzzle from local storage and display it on the page
const getLocalStorageSizeOfPuzzle = () => {
    if (localStorage.getItem('sizeOfPuzzle')) {
        sizeOfPuzzle = JSON.parse(localStorage.getItem('sizeOfPuzzle'));
        console.log('sizeOfPuzzle from local: ', sizeOfPuzzle);
        for (let i = 0; i < arrayInputsRadio.length; i++) {
            if (arrayInputsRadio[i].value === sizeOfPuzzle) {
                arrayInputsRadio[i].checked = true;
            }
        }
        displaySizeOfPuzzle(sizeOfPuzzle);
    }
}

//get sizeOfPuzzle from local storage and display it on the page
const getLocalStorageCorrectArray = () => {
    if (localStorage.getItem('correctArray')) {
        correctArray = JSON.parse(localStorage.getItem('correctArray'));
    }
}

//get playItems from local storage
const getLocalStoragePlayItems = () => {
    if (localStorage.getItem('playItems')) {
        playItems = JSON.parse(localStorage.getItem('playItems'));
    }
    createPuzzleLocal(sizeOfPuzzle);
}

//get countMoves from local storage
const getLocalStorageMoveValue = () => {
    if (localStorage.getItem('countTheMoves')) {
        countTheMoves = JSON.parse(localStorage.getItem('countTheMoves'));
        displayCountOfMoves(countTheMoves);
    } 
}

//get TimeMinute from local storage
const getLocalStorageTimeMinute = () => {
    if (localStorage.getItem('minutes')) {
        minutes = JSON.parse(localStorage.getItem('minutes'));
        minutes = Number(minutes);
        if (minutes >= 10) {
            spanNodeTimeMinute.innerHTML = minutes;
        }
        else if (minutes < 10){
            spanNodeTimeMinute.innerHTML = `0${minutes}`;
        } 
    } 
}

//get TimeSeconds from local storage
const getLocalStorageTimeSeconds = () => {
    if (localStorage.getItem('seconds')) {
        seconds = JSON.parse(localStorage.getItem('seconds'));
        seconds = Number(seconds);
        if (seconds >= 10) {
            spanNodeTimeSecond.innerHTML = seconds;
        }
        else if (seconds < 10){
            spanNodeTimeSecond.innerHTML = `0${seconds}`;
        } 
    }
}

//get primery shuffleArrayOfNumbers from local storage
const getLocalStorageBaseShuffleArrayOfNumbers = () => {
    if (localStorage.getItem('shuffleArrayOfNumbers')) {
        shuffleArrayOfNumbers = JSON.parse(localStorage.getItem('shuffleArrayOfNumbers'));
    }
}

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageSizeOfPuzzle);

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageCorrectArray);

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStoragePlayItems);

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageMoveValue);

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageTimeMinute);

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageTimeSeconds);

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageBaseShuffleArrayOfNumbers);

//before loading the page we get sizeOfPuzzle from local storage and display it on the page
window.addEventListener('load', getLocalStorageSizeOfPuzzle);

//before loading the page we get sizeOfPuzzle from local storage and display it on the page
window.addEventListener('load', getLocalStorageCorrectArray);

//before loading the page we get playItems from local storage
window.addEventListener('load', getLocalStoragePlayItems);

//before loading the page we get countMoves from local storage
window.addEventListener('load', getLocalStorageMoveValue);

//before loading the page we get minutes from local storage
window.addEventListener('load', getLocalStorageTimeMinute);

//before loading the page we get seconds from local storage
window.addEventListener('load', getLocalStorageTimeSeconds);

//before loading the page we get base ShuffleArrayOfNumbers from local storage
window.addEventListener('load', getLocalStorageBaseShuffleArrayOfNumbers);




