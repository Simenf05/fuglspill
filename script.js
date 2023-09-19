function setPos(obj, pos) {
    obj.style.top = `${pos[1]}px`
    obj.style.left = `${pos[0]}px`
}

const fishAreaEl = document.querySelector("#fishArea")


const fishArr = []


function createNewFish() {
    const newFish = document.createElement("img")
    newFish.className = "slim fish absolute"
    newFish.src = "images/fish.png"
    fishArr.push(newFish)
    fishAreaEl.appendChild(newFish)
}

function moveAllFish() {
    fishArr.forEach(fish => {

        const computedStyle = window.getComputedStyle(fish)
        const width = parseFloat(computedStyle.width)

        const left = Math.floor(Math.random() * (window.innerWidth - width))
        fish.style.left = `${left}px`
    })
}

createNewFish()
createNewFish()
moveAllFish()

const fishMoveInterval = setInterval(moveAllFish, 600)






const birdEl = document.querySelector("#bird")
const birdPos = [0, 0]
const birdSpeed = 5

setPos(birdEl, birdPos)

const keys = {}

document.onkeydown = (e) => {keys[e.key] = true}
document.onkeyup = (e) => {keys[e.key] = false}

const birdMoveInterval = setInterval(() => {
    
    if (keys["ArrowUp"]) birdPos[1] -= birdSpeed
    if (keys["ArrowDown"]) birdPos[1] += birdSpeed
    if (keys["ArrowLeft"]) birdPos[0] -= birdSpeed
    if (keys["ArrowRight"]) birdPos[0] += birdSpeed

    setPos(birdEl, birdPos)

}, 10);
