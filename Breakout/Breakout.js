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
let score = 0;

const userStart = [230, 10]
let currentPosition = userStart;


const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let right = true;
let up = true;

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
    for (let i = 0; i < blocks.length; i++) {
        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) { // hits top edge
                const allBlocks = Array.from(document.querySelectorAll('.block'));
                allBlocks[i].classList.remove('block');
                blocks.splice(i, 1)
                changeDirection();
                score++;
                scoreDisplay.innerHTML = score;
            }

            if (blocks.length == 0) {
                scoreDisplay.innerHTML = 'YOU WIN'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser())
            }
        
    }
    // wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition <= 0) {
        changeDirection()
    }

    // check for uer collisions
    if ((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition + blockHeight)) {
            changeDirection();
        }

    // // check for wall collisions
    // if (ballCurrentPosition[0] >= boardWidth - ballDiameter && ballCurrentPosition[1] > 0) { // right wall
    //     switchHorizontal(right);
    // }
    // if (ballCurrentPosition[1] >= boardHeight - ballDiameter) { // top wall
    //     switchHorizontal(up);
    // }
    // if (ballCurrentPosition[0] <= boardWidth - ballDiameter && ballCurrentPosition[1] > 0) { // left wall
    //     switchHorizontal(!right);
    // }
    // if (ballCurrentPosition[1] <= 0) { // bottom
    //     // GAME OVER
    // }
    

    // check gameOver
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
    }
}

// function switchHorizontal(right) {
//     if (right) { // switch from R to L
//         xDirection = -2;
//         right = !right;
//         return;
//     }
//     if (!right) {// switch from L to R
//         xDirection = 2;
//         right = !right;
//         return;
//     }
    
// }

// function switchVertical(up) {
//     if (up) { // switch from U to D
//         yDirection = -2;
//         up = !up;
//         return;
//     }
//     if (!up) { // switch from U to D
//         yDirection = 2;
//         up = !up;
//         return;
//     }
// }


// change direction function
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}
