const arrayInputsRadio = document.querySelectorAll('.other__input');
const playNode = document.querySelector('.play');
console.log(arrayInputsRadio);

let sizeOfPlayItem;
let sizeOfPuzzle;
let baseArrayOfNumbers;
let shuffleArrayOfNumbers;

//coordinaty of an empty item
const empty = {
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

//shuffle array of numbers

const shuffleArray = (baseArray) => {
    for (let i = baseArray.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let current = baseArray[i];
        baseArray[i] = baseArray[randomIndex];
        baseArray[randomIndex] = current;
    }
    console.log('baseArray: ', baseArray);
    return baseArray;
}

//create method MovePlayItem

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

        playItem.innerHTML = shuffleArrayOfNumbers[i - 1];

        const left = i % (+size);
        const top = (i - left) / (+size);

        //add object (play-item with its left and top coordinates)
        playItems.push({
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
        });
    }
}


for (let i = 0; i < arrayInputsRadio.length; i++) {
    arrayInputsRadio[i].addEventListener('change', () => {
        sizeOfPuzzle = getSizeOfPuzzle();
        createArrayOfNumbers(sizeOfPuzzle);
        shuffleArrayOfNumbers = shuffleArray(baseArrayOfNumbers);
        createPuzzle(sizeOfPuzzle);
    });
}

sizeOfPuzzle = getSizeOfPuzzle();
createArrayOfNumbers(sizeOfPuzzle);
shuffleArrayOfNumbers = shuffleArray(baseArrayOfNumbers);
createPuzzle(sizeOfPuzzle);

console.log('sizeOfPuzzle: ', sizeOfPuzzle);




