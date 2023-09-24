function setPos(obj, pos) {
    obj.style.top = `${pos[1]}px`
    obj.style.left = `${pos[0]}px`
}

const getWidth = (element) => parseFloat(window.getComputedStyle(element).width)
const getHeight = (element) => parseFloat(window.getComputedStyle(element).height)

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

const fishMoveInterval = setInterval(moveAllFish, 600)






const birdEl = document.querySelector("#bird")
const birdPos = [0, 0]
const birdSpeed = 5
const birdWidth = getWidth(birdEl)
const birdHeight = getHeight(birdEl)


setPos(birdEl, birdPos)

const keys = {}

document.onkeydown = (e) => {keys[e.key] = true}
document.onkeyup = (e) => {keys[e.key] = false}


function checkOverlapFish() {

    const birdRect = birdEl.getBoundingClientRect()

    fishArr.forEach(fish => {
        
        const fishRect = fish.getBoundingClientRect()

        const overlap = !(
            birdRect.right < fishRect.left ||
            birdRect.left > fishRect.right ||
            birdRect.bottom < fishRect.top ||
            birdRect.top > fishRect.bottom
        )

        if (overlap) {

            fish.remove()
            fishArr.splice(fishArr.indexOf(fish), 1)

        }

        
    });

}


const borderEl = document.querySelector("#border")
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
    }, 1000);
}


const openBorderInterval = setInterval(openBorder, 3000)


const birdMoveInterval = setInterval(() => {
    
    if (keys["ArrowUp"] && birdPos[1] - birdSpeed > 0) birdPos[1] -= birdSpeed
    if (keys["ArrowDown"] && birdPos[1] + birdSpeed + birdWidth < window.innerHeight) birdPos[1] += birdSpeed
    if (keys["ArrowLeft"] && birdPos[0] - birdSpeed > 0) birdPos[0] -= birdSpeed
    if (keys["ArrowRight"] && birdPos[0] + birdSpeed + birdHeight < window.innerWidth) birdPos[0] += birdSpeed

    checkOverlapFish()

    setPos(birdEl, birdPos)

}, 10);