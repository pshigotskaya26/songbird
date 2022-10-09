const btnPrevSlider = document.querySelector('.slider__nav_prev');
const btnNextSlider = document.querySelector('.slider__nav_next');
const sliderContent = document.querySelector('.slider__content');
const arrayOfItemsSlider = document.querySelectorAll('.slider__item');
let stepSlider = document.querySelectorAll('.slider__block')[0].offsetWidth;
let direction;
let leftSliderContent = sliderContent.offsetLeft;

//flag if you click many times on button
let animationInProgress = false;

window.addEventListener('resize',function(){
    location.reload();  
});

//create array of numbers that mean orders
const createArrayOfNumbers = (inputArray) => {
    let result = [];
    for (let i = 0; i < inputArray.length; i++) {
        result.push(i + 1);
    }
    return result;
};

//shuffle array of orders
const shuffleArrayOfOrders = (arr) => {
    let arrayOfOrders = createArrayOfNumbers(arr);

    for (let i = arrayOfOrders.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let lastElement = arrayOfOrders[i];
        arrayOfOrders[i] = arrayOfOrders[randomIndex];
        arrayOfOrders[randomIndex] = lastElement;
    }
    return arrayOfOrders; 
};

//set new oders to all items of clone
const setNewOrdersToItems = (arrItems) => {
    let newArrayOfOders = shuffleArrayOfOrders(arrItems);

    for (let i = 0; i < arrItems.length; i++) {
        arrItems[i].style.order = newArrayOfOders[i];
    }
};


//create clone element .slider__block
const createCloneElem = () => {
    let parent = document.querySelector('.slider__content');
    if (direction === -1) {
        let firstElem = document.querySelectorAll('.slider__block')[0];
        let clone = firstElem.cloneNode(true);
        let arrItemsInClone = clone.querySelectorAll('.slider__item');
        setNewOrdersToItems(arrItemsInClone);
        parent.appendChild(clone);
    }
    else {
        let firstElem = document.querySelectorAll('.slider__block')[0];
        let clone = firstElem.cloneNode(true);
        let arrItemsInClone = clone.querySelectorAll('.slider__item');
        setNewOrdersToItems(arrItemsInClone);
        parent.prepend(clone);
    }
};

//delete element .slider__block
const deleteElem = () => {
    let arrSliderBlocks = document.querySelectorAll('.slider__block');
    let elemSliderContent = document.querySelector('.slider__content');
    if (direction === -1) {
        elemSliderContent.removeChild(arrSliderBlocks[0]);
    }
    else {
        elemSliderContent.removeChild(arrSliderBlocks[arrSliderBlocks.length - 1]);
    }  
};

//replace .slider__content on 1 step
const animateSlides = () => {
    if (direction === -1) {
        sliderContent.style.left = leftSliderContent + (-stepSlider) +'px';
    }
    else {
        sliderContent.style.left = leftSliderContent + 'px';
    }
};

//when we click on nextbutton
btnNextSlider.addEventListener('click', () => {
    if (animationInProgress) {
        return;
    }

    direction = -1;
    createCloneElem();
    setTimeout(function() {
        sliderContent.style.transition ='1s all ease-in-out';
    });
    setTimeout(function() {
        animateSlides();
    });
    animationInProgress = true;
});

//when we click onprevbutton
btnPrevSlider.addEventListener('click', () => {
    if (animationInProgress) {
        return;
    }
    direction = 1;
    sliderContent.style.transition ='none';
    sliderContent.style.left = leftSliderContent + (-stepSlider) +'px';
    createCloneElem();
    setTimeout(function() {
        sliderContent.style.transition ='1s all ease-in-out';
    });
    setTimeout(function() {
        animateSlides();
    });
    animationInProgress = true;
});

//when animation was ended
sliderContent.addEventListener('transitionend', function() {
    if (direction === -1) {
        deleteElem();
        sliderContent.style.transition ='none';
        sliderContent.style.left = leftSliderContent + 'px';
    }
    else {
        deleteElem();
    }
    animationInProgress = false;
});