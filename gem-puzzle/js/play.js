const arrayInputsRadio = document.querySelectorAll('.other__input');
const playNode = document.querySelector('.play');
const spanNodeCurrentValue = document.querySelector('.current__value');
const spanNodeMoveValue = document.querySelector('.move__value');
console.log(arrayInputsRadio);

let sizeOfPlayItem;
let sizeOfPuzzle;
let baseArrayOfNumbers;
let correctArray;
let shuffleArrayOfNumbers;
let isWin;
let countTheMoves;

countTheMoves = 0;


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
    console.log('baseArrayOfNumbers: ', baseArrayOfNumbers);
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
    console.log('correctArray: ', correctArray);
}

//shuffle array of numbers

const shuffleArray = (baseArray) => {
    for (let i = baseArray.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let current = baseArray[i];
        baseArray[i] = baseArray[randomIndex];
        baseArray[randomIndex] = current;
    }
    console.log('baseArray shuffle: ', baseArray);
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

    countTheMoves++;
    displayCountOfMoves(countTheMoves);

    isWin = isPuzzlesCorrect(playItems, correctArray);
    if (isWin) {
        alert('You are winner!');
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
        console.log('valueInCorrect: ', valueInCorrect);
  
        for (let j = 1; j < arrayPlayItems.length; j++) {
            let valueplayItems = arrayPlayItems[j].value;
  
            console.log('valueplayItems: ', valueplayItems);
            if (valueplayItems === valueInCorrect) {
                console.log('correct[i].left: ', correctArray[i].left);
                console.log('playItems[j].left: ', arrayPlayItems[j].left);
                console.log('correct[i].top: ', correctArray[i].top);
                console.log('playItems[j].top: ', arrayPlayItems[j].top);
                if (correctArray[i].left === arrayPlayItems[j].left && correctArray[i].top === arrayPlayItems[j].top) {
                    result.push(true);
                }
            }
        }
    }
    console.log('result: ', result);

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

//count the moves
const countMoves = () => {
    
}

//function of creating elements depending on size of puzzle
const createPuzzle = (size) => {
    playNode.innerHTML = '';

    playItems = [];

    empty.top = 0;
    empty.left = 0;

    playItems.push(empty);

    console.log('playItems: ', playItems);

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
        console.log('playItems: ', playItems);

        playItem.style.left = `${left * sizeOfPlayItem}px`;
        playItem.style.top = `${top * sizeOfPlayItem}px`;
        
        playNode.append(playItem);

        playItem.addEventListener('click', () => {
            movePlayItem(i);
            console.log('playItems after move: ', playItems);
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
        createPuzzle(sizeOfPuzzle);
        displaySizeOfPuzzle(sizeOfPuzzle);

        countTheMoves = 0;
        displayCountOfMoves(countTheMoves);

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

console.log('sizeOfPuzzle: ', sizeOfPuzzle);




