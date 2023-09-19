

const fishAreaEl = document.querySelector("#fishArea")


const fishArr = []


function createNewFish() {
    const newFish = document.createElement("img")
    newFish.className = "slim fish"
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

const moveInterval = setInterval(moveAllFish, 600)








