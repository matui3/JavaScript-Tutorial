let squares = document.querySelectorAll('.square');
let mole = document.querySelector('.mole');

let timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0;
let hitPosition;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    });


    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id;
}

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 500)
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            console.log(result);
            score.textContent = result;
            hitPosition = null;
        }
    })
})

moveMole(); 

// randomSquare()