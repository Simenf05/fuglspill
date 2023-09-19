

const fishAreaEl = document.querySelector("#fishArea")


const fishArr = []


function createNewFish() {
    const newFish = document.createElement("img")
    newFish.className = "slim fish"
    newFish.src = "images/fish.png"
    fishArr.push(newFish)
    fishAreaEl.appendChild(newFish)
}


createNewFish()
