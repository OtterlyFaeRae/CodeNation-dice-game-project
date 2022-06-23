const dice = ["./images/face-one.png", "./images/face-two.png", "./images/face-three.png", "./images/face-four.png", "./images/face-five.png", "./images/face-six.png"]
const image = document.getElementById("dice")
const rollOne = document.getElementById("roll-one")
const rollTwo = document.getElementById("roll-two")
const hold = document.getElementById("hold")
const winloss = document.getElementById("winloss")
const scoreOne = document.getElementById("score-one")
const scoreTwo = document.getElementById("score-two")
try {player = "player one"} catch {null}

// Resets the whole game.
const reset = () => {
    scoreOne.textContent = 0
    try {
        scoreTwo.textContent = 0
        rollTwo.textContent = "roll"
    } catch {
        null
    }
    rollOne.textContent = "roll"
    winloss.textContent = " "
}

// Resets buttons.
const resetButtons = ()=> {
    rollOne.style.visibility = "visible"
    rollOne.textContent = "New game"
    try {
        rollTwo.style.display = "none"
        rollTwo.style.visibility = "hidden"
        hold.style.display = "none"
        hold.style.visibility = "hidden"
    } catch {
        null
    }
    rollOne.addEventListener("click", ()=>{
        try {
            hold.style.display = "block"
            rollTwo.style.display = "block"
        } catch (error) {
            null
        }
        
    }, {once:true})
}

// Sets buttons to correct text when New Game is clicked.
// rollOne button's text is set as "new game" and other buttons are display:none by default.
rollOne.addEventListener("click", ()=>{
    rollOne.textContent = "roll"
    try {
        rollTwo.style.display = "block"
        hold.style.display = "block"
    } catch (error) {
        null
    }
}, {once:true})

// Listener for player 1's button. 
rollOne.addEventListener("click", ()=>{
    // Rolls a random side of the die & applies that image
    let result = Math.ceil(Math.random() * 6)
    image.src = dice[result-1]
    // Processes & updates player 1's score.
    scoreOne.textContent = parseInt(scoreOne.textContent) + result
    // Checks if Player One's score is above 7, and reveals the Hold button if so.
    if (parseInt(scoreOne.textContent) >= 10) {
        try {
            hold.style.visibility = "visible"
        } catch (error) {
            null
        }
    }
    // Loss condition.
    if(result === 1) {
        winloss.textContent = `${player} lose!`
        resetButtons()
        rollOne.addEventListener("click", () =>{
            reset()
        }, {once: true});
    // Win condition.
    } else if (parseInt(scoreOne.textContent) >= 20) {
        winloss.textContent = `${player} win!`
        resetButtons()
        rollOne.addEventListener("click", ()=>{
            reset()
        }, {once: true});
    }
})

// Click event listener for second player's roll button, if present
try {
    rollTwo.addEventListener("click", ()=>{
    // Rolls a random side of the die & applies the source from the "dice" array. 
    let result = Math.ceil(Math.random() * 6)
    image.src = dice[result-1]
    // Updates player two's score based on the result. 
    scoreTwo.textContent = parseInt(scoreTwo.textContent) + result
    // Loss condition.
    if(result === 1) {
        winloss.textContent = `${player} lose!`
        resetButtons()
        rollOne.addEventListener("click", ()=>{
            reset()
        }, {once: true});
    // Win condition
    } else if (parseInt(scoreTwo.textContent) >= 20) {
        winloss.textContent = `${player} win!`
        resetButtons()
        rollOne.addEventListener("click", ()=>{
            reset()
        }, {once: true});
    }
})
} catch {
    null
}

// Click event listener for the Hold button if present.
try {
    hold.addEventListener("click", ()=>{
        // Hides player 2's button & reveals player 1's.
        if(rollOne.style.visibility == "hidden"){
            rollOne.style.visibility = "visible"
            rollTwo.style.visibility = "hidden"
            player = "player one"
        // Hides player 1's button & reveals player 2's.
        } else {
            rollTwo.style.visibility = "visible"
            rollOne.style.visibility = "hidden"
            player = "player two"
        }
    })
} catch {
    null
}