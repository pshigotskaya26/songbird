const headerBurger = document.querySelector('.header__burger');
const headerNavigation = document.querySelector('.header__navigation');
const blockHidden = document.querySelector('.block-hidden');
const bodyPage = document.querySelector('body');

const logoInBurger = document.querySelector('.logo_burger');

const navigationLink = document.querySelectorAll('.navigation__item a');


const navigationBurger = document.querySelector('.navigation__burger ');


headerBurger.addEventListener('click', () => {
    headerNavigation.classList.toggle('active');
    blockHidden.classList.toggle('active');
    bodyPage.classList.toggle('lock');
});

navigationBurger.addEventListener('click', () => {
    headerNavigation.classList.toggle('active');
    blockHidden.classList.toggle('active');
    bodyPage.classList.toggle('lock');
});

blockHidden.addEventListener('click', () => {
    headerNavigation.classList.toggle('active');
    blockHidden.classList.toggle('active');
    bodyPage.classList.toggle('lock');
});

for (let i = 0; i < navigationLink.length; i++) {
    navigationLink[i].addEventListener('click', () =>  {
        headerNavigation.classList.toggle('active');
        blockHidden.classList.toggle('active');
        bodyPage.classList.toggle('lock');
    });
}