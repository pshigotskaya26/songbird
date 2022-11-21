let scoreCount;
const resultBodySuccessNode = document.querySelector('.result__body_success');
const resultBodyNosuccess = document.querySelector('.result__body_nosuccess');

//get value of count from local storage
const getLocalStorageCount = () => {
	if (localStorage.getItem('jsonCountOfPoints')) {
		scoreCount = +localStorage.getItem('jsonCountOfPoints');

		if (scoreCount === 30) {
			resultBodySuccessNode.classList.remove('hidden');
			resultBodyNosuccess.classList.add('hidden');
			resultBodySuccessNode.querySelector('.your-count').innerHTML = scoreCount;
		}
		else {
			resultBodyNosuccess.querySelector('.your-count').innerHTML = scoreCount;
		}
    }
	else {
		scoreCount = 0;
	}
}

getLocalStorageCount();

console.log('Оценка: 260 из 270');
console.log('Не сделан перевод');



