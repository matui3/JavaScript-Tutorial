let squares = document.querySelectorAll('.square');
let mole = document.querySelector('.mole');

let timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    });


    let randomSquare = squares[Math.floor(Math.random() * 9)]
    console.log(Math.floor(Math.random() * 9))
    randomSquare.classList.add('mole')
}

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 500)
}


moveMole(); 

// randomSquare()