
window.addEventListener('resize',function(){
    location.reload();  
});

let widthWindow = window.innerWidth;

let arrayInputsOfProgressBar = document.querySelectorAll('.progress-bar__input');


if (widthWindow <= 700) {
    arrayInputsOfProgressBar[5].checked = "checked";
}
