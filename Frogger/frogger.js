let grid = document.querySelector('.grid')
const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
console.log(squares)

let blocks = [];
let logLeft = [];
let logRight = [];
let blockSetTwo = [];
let carLeft = [];
let carRight = [];
let currentIndex = 0;
let blockSetThree = [];

function createDivs(storage, CSSclass) {
    for (let i = 0; i < 9; i++) {
        const block = document.createElement('div')
        if (CSSclass != "") {
            block.classList.add(CSSclass);
        }
        storage.push(block)
        grid.appendChild(block);
    }
}

function moveFrog(e) {
    switch(e.key) {
        case 'ArrowLeft':
            console.log('move left');
            break;
        case 'ArrowRight':
            console.log('move right');
            break;
        case 'ArrowUp':
            console.log('move up');
            break;
        case 'ArrowDown':
            console.log('move down');
            break;

    }
    console.log(squares[currentIndex])
    squares[currentIndex].classList.add('frog')

}


createDivs(blocks, "");
createDivs(blocks, "");

createDivs(logLeft, 'log-left');
createDivs(logRight, 'log-right');
createDivs(blockSetTwo, "");
createDivs(carLeft, 'car-left');
createDivs(carRight, 'car-right');

createDivs(blockSetThree, "");
createDivs(blockSetThree, "");

blocks[4] = blocks[4].classList.add('ending-block')
blockSetThree[13] = blockSetThree[13].classList.add('starting-block')

document.addEventListener('keyup', moveFrog)