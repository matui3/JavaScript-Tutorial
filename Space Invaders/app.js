const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let aliensRemoved = []
let results = 0

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
]

let width = 15;
let invadersId;
let goingRight = true;
let direction = 1;
const lastRowStart = alienInvaders.length - alienInvaders.length/3


let rows = 15;
let columns = 15;

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        const square = document.createElement('div')
        grid.appendChild(square)
    }
    
}

const squares = Array.from(document.querySelectorAll('.grid div'))



function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[alienInvaders.length - 1] <= rows*columns ) {
            if (!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
    }
}

draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[lastRowStart] < rows * columns - 1 - width) {
            squares[alienInvaders[i]].classList.remove('invader')
        }
        
    }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -= 1;
                break;
            }
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1;
                break;
            }
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)


function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove();

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[alienInvaders.length - 1] < rows * columns) {
                alienInvaders[i] += width + 1;
                direction = - 1;
                goingRight = false;
            }
            
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[alienInvaders.length - 1] < rows * columns) {
                 alienInvaders[i] += width - 1
                 direction = 1;
                 goingRight = true;
            }
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[alienInvaders.length - 1] < rows * columns) {
            alienInvaders[i] += direction
        }
        
    }

    draw();

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[lastRowStart] > rows * columns - width - 1) {
            resultDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
        }
    }

    if (squares[currentShooterIndex].classList.contains('invader') && squares[currentShooterIndex].classList.contains('shooter')) {
        resultDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
    }

    // winning
    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersId)
    }

}
invadersId = setInterval(moveInvaders, 50)

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        if (currentLaserIndex >= rows) {
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');
        } else if (squares[currentLaserIndex].classList.contains('laser')) {
            squares[currentLaserIndex].classList.remove('laser')
        }

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoval = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoval)
            results++;
            resultDisplay.innerHTML = results;
        }
   
    }

    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener('keydown', shoot)