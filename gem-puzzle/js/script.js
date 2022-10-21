let bodyNode = document.querySelector('.root');

let htmlCode;
    
htmlCode= `
<div class="container">
    <header class="header">
        <h1 class="header__title">Play Gem Puzzle</h1>
    </header>

    <main class="main">
        <div class="buttons-block">
            <button class="button button-shiffle">Shuffle</button>
            <button class="button button-start">Start</button>
            <button class="button button-stop button_noactive">Stop</button>
            <button class="button button-save">Save</button>
            <button class="button button-result">Results</button>
        </div>

        <div class="info">
            <div class="info-moves">
                <span class="move__text">Moves:</span>
                <span class="move__value">0</span>
            </div>
            <div class="info-time">
                <span class="time__text">Time:</span>
                <div class="time__value">
                    <span class="time__minute">00</span>
                    <span class="time__separator">:</span>
                    <span class="time__second">00</span>
                </div>
            </div>
        </div>
        <div class="play">
            <canvas id="canvas" class="canvas_noactive" width ="300" height="300"></canvas>
        </div>
        <div class="sizes">
            <div class="sizes__current">
                <span class="current__text">Size of puzzle: </span>
                <span class="current__value"></span>
            </div>
            <div class="sizes__other">
                <div class="other-item">
                    <input class="other__input" type="radio" name="size" id="size-3" data-size = "3" value ="3">
                    <label for="size-3">3x3</label>
                </div>
                <div class="other-item">
                    <input class="other__input" type="radio" name="size" id="size-4" data-size = "4" value ="4" checked>
                    <label for="size-3">4x4</label>
                </div>
                <div class="other-item">
                    <input class="other__input" type="radio" name="size" id="size-5" data-size = "5" value ="5">
                    <label for="size-3">5x5</label>
                </div>
                <div class="other-item">
                    <input class="other__input" type="radio" name="size" id="size-6" data-size = "6" value ="6">
                    <label for="size-3">6x6</label>
                </div>
                <div class="other-item">
                    <input class="other__input" type="radio" name="size" id="size-7" data-size = "7" value ="7">
                    <label for="size-3">7x7</label>
                </div>
                <div class="other-item">
                    <input class="other__input" type="radio" name="size" id="size-8" data-size = "8" value ="8">
                    <label for="size-3">8x8</label>
                </div>
            </div>
        </div>
    </main>
</div>
`;

bodyNode.innerHTML = htmlCode;
