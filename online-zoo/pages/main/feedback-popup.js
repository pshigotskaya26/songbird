const arrayOfFeedbackColumns = document.querySelectorAll('.feedback__column');
const feedbackblockHidden = document.querySelector('.feedbackblock-hidden');
const feedbackPopup = document.querySelector('.feedback-popup');
const navigationBurgerPopup = document.querySelector('.feedback-popup .navigation__burger');

const createCloneElement = (element) => {
    return element.cloneNode(true);
};

const insertFeedbackInPopUp = (cloneElement) => {
    let feedbackColumnPop = document.querySelector('.feedback__column_pop');
    feedbackColumnPop.innerHTML = '';
    feedbackColumnPop.appendChild(cloneElement);
};

const openFeedback = (clickedColumn) => {
    const contentOfColumn = clickedColumn.children[0];
    const clone = createCloneElement(contentOfColumn);
    insertFeedbackInPopUp(clone);
};

for (let i = 0; i < arrayOfFeedbackColumns.length; i++) {
    arrayOfFeedbackColumns[i].addEventListener('click', () => {
        openFeedback(arrayOfFeedbackColumns[i]);
        feedbackPopup.classList.toggle('active');
        feedbackblockHidden.classList.toggle('active');
        bodyPage.classList.toggle('lock');
    });
}

feedbackblockHidden.addEventListener('click', () => {
    feedbackPopup.classList.toggle('active');
    feedbackblockHidden.classList.toggle('active');
    bodyPage.classList.toggle('lock');
});

navigationBurgerPopup.addEventListener('click', () => {
    feedbackPopup.classList.toggle('active');
    feedbackblockHidden.classList.toggle('active');
    bodyPage.classList.toggle('lock');
});

