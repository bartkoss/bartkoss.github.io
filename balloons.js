const gameTimer = document.getElementById('game-timer')
let gameTime = 0
const balloons = document.getElementsByClassName("balloon")
const balloonsPositions = []
const balloonsSpeed = []
const gamecompleted = document.getElementById('gamecompleted')
let balloonsClicked = 0

// set all ballons to inital state
const setupBalloons = () => {
    balloonsClicked = 0
    // loop through all balloons
    for(let index = 0; index < balloons.length; index++) {
        // set balloon to change to chickens when clicked
        balloons[index].onmousedown = () => {
            //balloons[index].innerHTML = balloons[index].innerHTML === "🐔" ? "🎈":"🐔"
            if (balloons[index].innerHTML === "🎈") {
                balloons[index].innerHTML = "🐔"
                balloonsClicked += 1
            } 
        }

        // set initial balloon position
        balloonsPositions.push(-50);
        // set each balloon speed
        balloonsSpeed.push(1 + Math.random() * 3)
        // position balloon ramdomly on horizontal
        randomlyPositionBalloon(balloons[index])
    }
}

// function receives a balloon and sets its horizontal
// position to a random value
const randomlyPositionBalloon = (balloon) => {
    // get a random value between zero and the window width
    const leftDistance = Math.random() * window.innerWidth;
    // set that position to the balloon
    balloon.style.left = leftDistance + "px";
}

let deltaTime;

// game loop . this function is called every time
const step = (timestamp) => {
    if (deltaTime === undefined)
        deltaTime = timestamp;
    const elapsed = timestamp - deltaTime;
    gameTime = Math.floor(elapsed/1000)
    gameTimer.innerHTML = gameTime

    // updates each balloon
    for(let index = 0; index < balloons.length; index++) {
        if(balloons[index].innerHTML === "🎈") {
            if(balloonsPositions[index] > window.innerHeight) {
                // reset balloon position to the bottom
                // and new random horizontal if it hit the top of screen
                balloonsPositions[index] = -50;
                randomlyPositionBalloon(balloons[index])
            } else {
                // moves balloon up 
                balloonsPositions[index] += balloonsSpeed[index];
            }
            
            // repositions balloon
            balloons[index].style.bottom = balloonsPositions[index] + "px";
        }
    }

    if (balloonsClicked >= balloons.length) {
        //game complete
        gamecompleted.classList.remove("invisible")
    } else {
        window.requestAnimationFrame(step)
    } 
}

setupBalloons()
window.requestAnimationFrame(step)