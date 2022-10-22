const buttonShiffle = document.querySelector('.button-shiffle');
const buttonStart = document.querySelector('.button-start');
const buttonStop = document.querySelector('.button-stop');
const buttonSave = document.querySelector('.button-save');


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

    //buttonStart.classList.remove('button_noactive');
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
});

