function setPos(obj, pos) {
    obj.style.top = `${pos[1]}px`
    obj.style.left = `${pos[0]}px`
}

const getWidth = (element) => parseFloat(window.getComputedStyle(element).width)
const getHeight = (element) => parseFloat(window.getComputedStyle(element).height)

const getOverlap = (rect1, rect2) => !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
)

const fishAreaEl = document.querySelector("#fishArea")


const fishArr = []


function createNewFish() {
    const newFish = document.createElement("img")
    newFish.className = "slim fish absolute"
    newFish.src = "images/fish.png"
    newFish.style.top = `${Math.floor(Math.random() * 70) + 12}%`
    fishArr.push(newFish)
    fishAreaEl.appendChild(newFish)
}

function moveAllFish() {
    fishArr.forEach(fish => {
        const width = getWidth(fish)

        const left = Math.floor(Math.random() * (window.innerWidth - width))
        fish.style.left = `${left}px`
    })
}

createNewFish()
createNewFish()
moveAllFish()

let fishMoveInterval = setInterval(moveAllFish, 600)


let points = 0
const pointsEl = document.querySelector("#points")
const updatePoints = () =>  pointsEl.innerHTML = `Du har ${points} poeng.`

updatePoints()

const birdEl = document.querySelector("#bird")
const birdPos = [0, 0]
const birdSpeed = 5
const birdWidth = getWidth(birdEl)
const birdHeight = getHeight(birdEl)


setPos(birdEl, birdPos)

const keys = {}

const turnOnKeyEvent = () => {
    document.onkeydown = (e) => {keys[e.key] = true}
    document.onkeyup = (e) => {keys[e.key] = false}
}

const turnOffKeyEvent = () => {
    document.onkeydown = null
    document.onkeyup = null
}


turnOnKeyEvent()


function checkOverlapFish() {

    const birdRect = birdEl.getBoundingClientRect()

    fishArr.forEach(fish => {
        
        const fishRect = fish.getBoundingClientRect()

        const overlap = getOverlap(birdRect, fishRect)

        if (overlap) {

            fish.remove()
            fishArr.splice(fishArr.indexOf(fish), 1)

            points += 1
            updatePoints()

            createNewFish()

        }
    })
}


const borderEl = document.querySelector("#borderBox")
const borderRect = borderEl.getBoundingClientRect()

const border1El = document.querySelector("#border1")
const border2El = document.querySelector("#border2")


function openBorder() {

    const widthBorder1 = Math.floor(Math.random() * 75) + 5
    const widthBorder2 = 100 - 20 - widthBorder1

    border1El.style.width = `${widthBorder1}%`
    border2El.style.width = `${widthBorder2}%`

    setTimeout(() => {

        border1El.style.width = `${widthBorder1 + 10}%`
        border2El.style.width = `${widthBorder2 + 10}%`

        const borderRect = borderEl.getBoundingClientRect()
        const birdRect = birdEl.getBoundingClientRect()

        const overlap = getOverlap(borderRect, birdRect)

        if (overlap) {
            birdPos[1] = borderRect.top - birdRect.height - 1
        }

    }, 2000)
}


const openBorderInterval = setInterval(openBorder, 3000)


function handleBirdMovment(vec) {

    const getBoundingClientRect = element => {
        const {top, right, bottom, left, width, height, x, y} = element.getBoundingClientRect()
        return {top, right, bottom, left, width, height, x, y} 
    }

    const stepPos = [birdPos[0] + vec[0], birdPos[1] + vec[1]]
    const stepRect = getBoundingClientRect(birdEl)
    stepRect.left += vec[0]
    stepRect.right += vec[0]
    stepRect.top += vec[1]
    stepRect.bottom += vec[1]


    if (stepPos[0] < 0) return
    if (stepPos[1] < 0) return
    if (stepPos[0] + birdWidth > window.innerWidth) return
    if (stepPos[1] + birdHeight > window.innerHeight) return

    if (getOverlap(stepRect, border1El.getBoundingClientRect())) return
    if (getOverlap(stepRect, border2El.getBoundingClientRect())) return

    birdPos[0] = stepPos[0]
    birdPos[1] = stepPos[1]

}


const gameOverEl = document.querySelector("#gameOver")


function gameLost() {

    turnOffKeyEvent()
    gameOverEl.style.display = "flex"
    clearInterval(fishMoveInterval)
    fishMoveInterval = null

}

function tryAgain(e) {
    gameOverEl.style.display = "none"
    birdPos[0] = 0
    birdPos[1] = 0

    setPos(birdEl, birdPos)

    points = 0
    updatePoints()

    turnOnKeyEvent()

    fishMoveInterval = setInterval(moveAllFish, 600)

}


let underWater = false
const birdAirTime = 100
let birdAir = 100
let airInterval


const birdAirMeterEl = document.querySelector("#birdAirMeter")

function birdAirChanger() {
    
    birdAir -= 1
    if (birdAir == 0) {
        clearInterval(airInterval)
        gameLost()
    }
    birdAirMeterEl.style.width = `${birdAir}%`

}


const birdMoveInterval = setInterval(() => {

    if (keys["ArrowUp"]) handleBirdMovment([0, -birdSpeed])
    if (keys["ArrowDown"]) handleBirdMovment([0, birdSpeed])
    if (keys["ArrowLeft"]) handleBirdMovment([-birdSpeed, 0])
    if (keys["ArrowRight"]) handleBirdMovment([birdSpeed, 0])

    setPos(birdEl, birdPos)


    if (birdPos[1] < borderRect.top) {
        
        underWater = false
        birdAir = 100
        birdAirMeterEl.style.width = `${birdAir}%`
        if (airInterval) {
            clearInterval(airInterval)
            airInterval = null
        }        
    }
    else if (birdPos[1] > borderRect.top && !underWater) {
        underWater = true
        airInterval = setInterval(birdAirChanger, birdAirTime)
    }

    checkOverlapFish()

}, 10)

