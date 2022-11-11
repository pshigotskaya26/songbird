import birdsData from "./birds.js";

//shuffle values in array
const shuffleArray = (arr) => {
	for (let i = arr.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let current = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = current;
    }
    return arr;
}

//shuffle objects in array
const shuffleObjectsInArray = (arr) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		arr[i] = shuffleArray(arr[i]);
    }
    return arr;
}

//get random value from 0 to 5
const getRandomIndex = () => {
	return Math.floor(Math.random() * 6);
}

//set property isright with value true or false into object
const setIsRight = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		let randomIndex = getRandomIndex();
		for (let j = 0; j < arr[i].length; j++) {
			if (j === randomIndex) {
				arr[i][j].isRight = true;
			}
			else if (j !== randomIndex) {
				arr[i][j].isRight = false;
			}
		}
	}
}
