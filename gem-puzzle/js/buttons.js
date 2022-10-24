const buttonShiffle = document.querySelector('.button-shiffle');
const buttonLoad = document.querySelector('.button-load');
const buttonStart = document.querySelector('.button-start');
const buttonStop = document.querySelector('.button-stop');
const buttonSave = document.querySelector('.button-save');
const buttonResult = document.querySelector('.button-result');
const buttonReset = document.querySelector('.button-reset');
const popNode = document.querySelector('.pop');
const popNodeHidden = document.querySelector('.pop-hidden');
const popBurger = document.querySelector('.pop__burger');
const tableContentNode = document.querySelector('.table__content');
const soundVolumeButton = document.querySelector('.sound-volume-button');

let isVolume = true;
let arrayOfResults;
arrayOfResults = [];

//add result of play to array
const addResultsInArray = (sizeOfPuzzle) => {
    arrayOfResults.push({
        sizeOfPuzzle: `${sizeOfPuzzle}x${sizeOfPuzzle}`,
        time: `${minutes} : ${seconds}`,
        allseconds: minutes * 60 + seconds,
        moves: countTheMoves,
        //speed: (countTheMoves / (minutes * 60 + seconds)).toFixed(2)
        //speed: +((minutes * 60 + seconds) / countTheMoves).toFixed(2)
    });
}

//sort array
const sortArray = (arr) => {
    return arr.sort((a, b) => a.allseconds - b.allseconds);
}

//create element Item for table__content
const createItemsForTable = (arr) => {
    console.log('arr aftre sort: ', arr);
    if (arr.length !== 0) {
        tableContentNode.innerHTML = '';
        let htmlCodeForTable = '';
        let count = 1;

        for (let i = 0; i < arr.length; i++) {
            if (count <= 10) {
                const itemForTable = `
                    <div class="table-item">
                        <div class="item__number">${i + 1}</div>
                        <div class="item__size">${arr[i].sizeOfPuzzle}</div>
                        <div class="item__time">${arr[i].time}</div>
                        <div class="item__seconds">${arr[i].allseconds}</div>
                        <div class="item__move">${arr[i].moves}</div>
                    </div>
                `;
                htmlCodeForTable += itemForTable;
                count++;
            }
        }
        tableContentNode.innerHTML = htmlCodeForTable;
    }
}

//save results in table
const saveResultsInTable = (sizeOfPuzzle) => {
    addResultsInArray(sizeOfPuzzle);
    sortArray(arrayOfResults);
    createItemsForTable(arrayOfResults);
}

//toggle volume
const toggleVolume = () => {
    if (isVolume) {
        isVolume = false;
        audio.volume = 0;
        soundVolumeButton.classList.remove('sound-volume_on');
        soundVolumeButton.classList.add('sound-volume_off');
    }
    else {
        isVolume = true;
        audio.volume = 1;
        soundVolumeButton.classList.add('sound-volume_on');
        soundVolumeButton.classList.remove('sound-volume_off');
    }
}

buttonShiffle.addEventListener('click', () => {
    resetTimer();
    createArrayOfNumbers(sizeOfPuzzle);
    shuffleArrayOfNumbers = shuffleArray(baseArrayOfNumbers);
    createPuzzle(sizeOfPuzzle);
    countTheMoves = 0;
    displayCountOfMoves(countTheMoves);
    playNode.classList.add('play_noactive');
    buttonStart.classList.remove('button_noactive');
    buttonStop.classList.add('button_noactive');
    buttonSave.classList.add('button_noactive');
    setLocalStorageBaseShuffleArrayOfNumbers();

    //buttonStart.classList.remove('button_noactive');
});

buttonLoad.addEventListener('click', () => {
    getLocalStorageBaseShuffleArrayOfNumbers();
    createPuzzle(sizeOfPuzzle);
    displaySizeOfPuzzle(sizeOfPuzzle);
    countTheMoves = 0;
    displayCountOfMoves(countTheMoves);
    resetTimer();
    buttonStart.classList.remove('button_noactive');
    buttonStop.classList.add('button_noactive');
});

buttonStart.addEventListener('click', () => {
    buttonStop.classList.remove('button_noactive');
    //buttonSave.classList.remove('button_noactive');
    playNode.classList.remove('play_noactive');
    buttonStart.classList.add('button_noactive');
    startTimer();
});

buttonStop.addEventListener('click', () => {
    playNode.classList.add('play_noactive');
    buttonStop.classList.add('button_noactive');
    buttonStart.classList.remove('button_noactive');
    pauseTimer();
});

buttonSave.addEventListener('click', () => {
    alert('You saved the result in the table. To watch this click the button "Results".');
    saveResultsInTable(sizeOfPuzzle);
});

buttonResult.addEventListener('click', () => {
    popNode.classList.toggle('active');
    popNodeHidden.classList.toggle('active');
    bodyNode.classList.toggle('lock');
});

buttonReset.addEventListener('click', () => {
    tableContentNode.innerHTML = '';
    arrayOfResults = [];
});

popBurger.addEventListener('click', () => {
    popNode.classList.toggle('active');
    popNodeHidden.classList.toggle('active');
    bodyNode.classList.toggle('lock');
});

soundVolumeButton.addEventListener('click', toggleVolume);


//save TimeSeconds in local storage
const setLocalStorageArrayOfResults = () => {
    let jsonArrayOfResults = JSON.stringify(arrayOfResults);
    localStorage.setItem('arrayOfResults', jsonArrayOfResults);
}



//get TimeSeconds from local storage
const getLocalStorageArrayOfResults = () => {
    if (localStorage.getItem('arrayOfResults')) {
        arrayOfResults = JSON.parse(localStorage.getItem('arrayOfResults'));
        createItemsForTable(arrayOfResults);
    }
}

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageArrayOfResults);


//before loading the page we get seconds from local storage
window.addEventListener('load', getLocalStorageArrayOfResults);


