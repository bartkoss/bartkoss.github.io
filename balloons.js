const balloons = document.getElementsByClassName("balloon")
console.log(balloons)
for(let index = 0; index < balloons.length; index++) {
    balloons[index].onclick = () => {
        balloons[index].innerHTML = balloons[index].innerHTML === "🐔" ? "🎈":"🐔"
    }
}
