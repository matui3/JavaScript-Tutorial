let grid = document.querySelector('.grid')

const scoreDisplay = document.querySelector('#score')

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;

let timerId;

let xDirection = 2;
let yDirection = 2;

const userStart = [230, 10]
let currentPosition = userStart;


const ballStart = [270, 40]
let ballCurrentPosition = ballStart


// create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// all blocks
const blocks = []
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
        blocks.push(new Block(10 + 110*i, 270 - 30*j));
    }
}


const block = document.createElement('div')




// draw all my blocks
function addBlock() {
    
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        // console.log(block)
        grid.appendChild(block)
    }
}

addBlock()

// add user
let user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// drawUser
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// move user
function moveUser(e) {
    switch (e.key ) {
        case 'Arrowleft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }    
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
// ball.textContent = 'blah'
grid.appendChild(ball)


// move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

timerId = setInterval(moveBall, 30)

// check for collisions
function checkForCollisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++)


    // check for wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter)) { // right side
        if (xDirection === 2 && yDirection === 2) {
            xDirection = -2;
        } else if (xDirection === 2 && yDirection === -2) {
            xDirection = -2;
        }
    }
    if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) { // top of the box
        if (xDirection === 2 && yDirection === 2) {
            yDirection = -2;
        } else if (xDirection === -2 && yDirection === 2) {
            yDirection = -2;
        }
    }
    if (ballCurrentPosition[0] <= 0) { // left side of box
        if (xDirection === -2 && yDirection === 2) {
            xDirection = 2;
        } else if (xDirection === -2 && yDirection === -2) {
            xDirection = 2;
        }
    }

    // check gameOver
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
    }
}

// function changeDirection() {
//     if (xDirection === 2 && yDirection === 2) { // top part of wall
//         yDirection = -2;
//         return;
//     }
//     if (xDirection === 2 && yDirection === -2) { // left side of board coming down
//         xDirection = -2;
//         return;
//     }
//     if (xDirection === -2 && yDirection === -2) { // top of board
//         yDirection = 2;
//         return;
//     }
//     if (xDirection === -2 && yDirection === 2) {
//         xDirection = 2;
//         return;
//     }
// }
