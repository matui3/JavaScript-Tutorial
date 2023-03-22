let grid = document.querySelector('.grid')
const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
let gridLength = 9;
let blocks = [];
const width = 9;
let currentIndex = 76

createDivs();
addLogClasses(blocks);
addLClasses(blocks);

const logsleft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');


function createDivs() {
    for (let i = 0; i < gridLength * gridLength; i++) {
        const block = document.createElement('div')
        blocks.push(block)
        grid.appendChild(block);
    }
}

function addLogClasses(blocks) {
    for (let i = gridLength * 2; i < gridLength * 4; i++) {
        str = "log"
        str += i < gridLength * 3 ? "-left" : "-right"
        blocks[i].classList.add(str)
    }
}

function addLClasses(blocks) {
    j = 1;
    for (let i = gridLength * 2; i < gridLength * 4; i++) {
        if (j > 5) {
            j = 1;
        }
        str = "l"
        str += j;
        j++;
        blocks[i].classList.add(str)
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
    // console.log(squares[currentIndex])
    squares[currentIndex].classList.add('frog')
}


blocks[4].classList.add('ending-block')
blocks[blocks.length - 5].classList.add('starting-block')
const squares = document.querySelectorAll('.grid div')

document.addEventListener('keyup', moveFrog)


function autoMoveLogs() {
    logsleft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
}

arr = ["l1", "l2", "l3", "l4", "l5"]


function moveLogLeft(logLeft) {
    let start = 0;
    let end = start + 1;
    if (end === arr.length) {
       end = 0;
    }
    if (start === arr.length) {
        start = 0;
    }
    switch (true) {
        case logLeft.classList.contains(arr[start]):
            logLeft.classList.remove(arr[start]);
            logLeft.classList.add(arr[end]);
            break;
    }
    start++;
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

setInterval(autoMoveLogs, 1000)
