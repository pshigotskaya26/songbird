const buttonShiffle = document.querySelector('.button-shiffle');
const buttonStart = document.querySelector('.button-start');
const buttonStop = document.querySelector('.button-stop');
const buttonSave = document.querySelector('.button-save');


buttonShiffle.addEventListener('click', () => {
    createArrayOfNumbers(sizeOfPuzzle);
    shuffleArrayOfNumbers = shuffleArray(baseArrayOfNumbers);
    createPuzzle(sizeOfPuzzle);
    playNode.classList.add('play_noactive');
    buttonStart.classList.remove('button_noactive');
    buttonStop.classList.add('button_noactive');

    //buttonStart.classList.remove('button_noactive');
});


buttonStart.addEventListener('click', () => {
    buttonStop.classList.remove('button_noactive');
    buttonSave.classList.remove('button_noactive');
    playNode.classList.remove('play_noactive');
    buttonStart.classList.add('button_noactive');
});

buttonStop.addEventListener('click', () => {
    playNode.classList.add('play_noactive');
    buttonStop.classList.add('button_noactive');
    buttonStart.classList.remove('button_noactive');
});

