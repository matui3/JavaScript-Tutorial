let grid = document.querySelector('.grid')
const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
let gridLength = 9;
let blocks = [];
const width = 9;
let currentIndex = 76
let currentTime = 60;
resultDisplay.textContent = currentTime

createDivs();
addPreClasses(blocks, "log", 2, 4);
addPreClasses(blocks, "car", 4, 6);
addPostClasses(blocks, "l", 2, 4, 5);
addPostClasses(blocks, "c", 4, 6, 3);


const logsleft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right')

function createDivs() {
    for (let i = 0; i < gridLength * gridLength; i++) {
        const block = document.createElement('div')
        blocks.push(block)
        grid.appendChild(block);
    }
}

function addPreClasses(blocks, str, start, end) {
    prefix = str;
    for (let i = gridLength * start; i < gridLength * end; i++) {
        prefix += i < gridLength * (start + end)/2 ? "-left" : "-right"
        blocks[i].classList.add(prefix)
        prefix = str;
    }
}

function addPostClasses(blocks, str, start, end, max) {
    j = 1;
    prefix = str;
    for (let i = gridLength * start; i < gridLength * end; i++) {
        if (j > max) {
            j = 1;
        }
        prefix += j;
        j++;
        blocks[i].classList.add(prefix)
        prefix = str;
    }
}

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentIndex % 9 !== 0) {
                currentIndex -= 1;
            }
            break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1) {
                currentIndex += 1;
            }
            break;
        case 'ArrowUp':
            if (currentIndex - width >= 0) {
                currentIndex -= width;
            }
            break;
        case 'ArrowDown':
            if (currentIndex + width <= width * width) {
                currentIndex += width;
            }
            break;
    }
    squares[currentIndex].classList.add('frog')
}


blocks[4].classList.add('ending-block')
blocks[blocks.length - 5].classList.add('starting-block')
const squares = document.querySelectorAll('.grid div')

document.addEventListener('keyup', moveFrog)


function autoMoveElements() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logsleft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
    lose();
    win();
}

function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
    }
}

function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }
}

function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}

function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

function lose() {
    if (squares[currentIndex].classList.contains('c1') || 
        squares[currentIndex].classList.contains('l4') || 
        squares[currentIndex].classList.contains('l5')) {
        resultDisplay.textContent = 'You lose!';
        clearInterval(timerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You win!';
        clearInterval(timerId);
        document.removeEventListener('keyUp', moveFrog)
    }
}

timerId = setInterval(autoMoveElements, 1000)

