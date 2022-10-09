const feedbackContent = document.querySelector('.feedback__content');
const feedbackColumn = document.querySelectorAll('.feedback__column');
let widthFeedbackColumn = feedbackColumn[0].offsetWidth;
let valueStartLeftFeedbackContent = 0;
const elemRange = document.querySelector('input[type="range"]');

elemRange.addEventListener('input', () => {
    let newValueRange = elemRange.value;
    let widthWindow = window.innerWidth;

    if (widthWindow <= 1600 && widthWindow > 1160) {
        feedbackContent.style.left = valueStartLeftFeedbackContent - (newValueRange * widthFeedbackColumn) + 'px';
    }
    else if (widthWindow <= 1160 && widthWindow > 941) {
        elemRange.max = 8;
        feedbackContent.style.left = valueStartLeftFeedbackContent - (newValueRange * widthFeedbackColumn) + 'px';
    }
});
