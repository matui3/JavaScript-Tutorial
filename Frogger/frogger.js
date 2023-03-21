let grid = document.querySelector('.grid')
const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')


let blocks = [];
let logLeft = [];
let logRight = [];
let blockSetTwo = [];
let carLeft = [];
let carRight = [];
let currentIndex = 76;
let blockSetThree = [];
const width = 9;

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
    squares[currentIndex].classList.remove('frog')
    switch(e.key) {
        case 'ArrowLeft':
            console.log('move left');
            if (currentIndex % 9 !== 0) {
                currentIndex -= 1;
            }
            currentIndex -= 1;
            break;
        case 'ArrowRight':
            console.log('move right');
            if (currentIndex % 9 !== 0) {
                currentIndex += 1;
            }
            break;
        case 'ArrowUp':
            console.log('move up');
            if (currentIndex % 9 !== 0) {
                currentIndex -= width;
            }
            
            break;
        case 'ArrowDown':
            console.log('move down');
            if (currentIndex % 9 !== 0) {
                currentIndex += width;
            }
            
            break;
    }
    // console.log(squares[currentIndex])
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

blocks[4].classList.add('ending-block')
blockSetThree[blockSetThree.length - 5].classList.add('starting-block')
blockSetThree[blockSetThree.length - 5].classList.add('frog')

const squares = document.querySelectorAll('.grid div')
console.log(squares)

document.addEventListener('keyup', moveFrog)