let grid = document.querySelector('.grid')

const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;

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
grid.appendChild(ball)

// move ball
function moveBall() {
    
}
