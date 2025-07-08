let gameSeq = [];
let userSeq = [];   /*arrays to keep a track of sequences of both, game and user. */
let btns = ["red", "green", "blue", "yellow"];
let highestScr = 0;

let level = 0;   /*holds the level of game */
let started = false;   /*holds the condition if game is started or not. */

/*to change color of heading for sometime in continue manner. */
let h1 = document.querySelector("h1");
function changeColor(color, delay, nextColorChange) {
    setTimeout(()=> {
        h1.style.color = color;
        if(nextColorChange){
        nextColorChange();
        }
    }, delay);
}
changeColor("red", 500, ()=> {
    changeColor("orange", 500, ()=> {
        changeColor("purple", 500, ()=> {
            changeColor("green", 500, ()=> {
                changeColor("blue", 500, ()=> {
                    changeColor("pink", 500, ()=> {
                        changeColor("white", 500, ()=> {
                           })
                      })
                 })
             })
        })
    })
})


let h3 = document.querySelector("h3");   /*holds h3 object */

/*Now we need to start the game. */
document.addEventListener("keypress", function() {   /*Keypress event triggers when any key is pressed */
    if(started == false){
        started = true;

        levelUp();   /*function to change heading to "level n" and flash any key */
    }
});

/*Logic: "btn" comes inside as a function. We provide the class to that certain "btn".
We finally remove the provided class to that "btn" after little time,
with the help of "set timeout function".*/

/*functions to flash any button. */
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 75);
}
function clkFlash(btn) {
    btn.classList.add("clkflash");
    setTimeout(function() {
        btn.classList.remove("clkflash");
    }, 300);
}

function levelUp() {
    /*for mentioning the level we are into currently */
    userSeq=[];
    level++;
    h3.innerText = `You are on Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);   /*to get any random index from array "btns". */
    let ranClr = btns[ranIdx];   /*access the random color from array "btns". */
    let ranBtn = document.querySelector(`.${ranClr}`);   /*we made the object of the exact button, that will be selected randomly. */

    gameSeq.push(ranClr);
    console.log(gameSeq);

    /*to flash the button, we can make a seperate function */
    clkFlash(ranBtn);
}

/*function for checking answer. */
function checkAns(idx) {
    if(userSeq[idx]===gameSeq[idx]) {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout (levelUp, 1000);
        }
    }
    else {
        h3.innerHTML=`Game is Over! <b>Your score was ${level}!</b><br>Press any key to start again.`;
        /*for red light effect of background. */
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="black";  
        }, 150);

        /*for storing highest score without resetting */
        let p = document.querySelector("p");
        if(level>highestScr) {
            highestScr=level;
            p.innerHTML = `Highest Score: <b>${level}</b>`;
        }

        reset();   /*to reset game. */
    }
}

/*on clicking any button with mouse, this function is called. */
function btnPress() {
    let btn = this;   /*"btn" here stores, the exact button, that was pressed, and its done with the help of "this" keyword. */
    btnFlash(btn);

    let userColor = btn.getAttribute("id");   /*"userColor will hold the color{which is the id} of the button pressed." */
    userSeq.push(userColor);
    checkAns(userSeq.length-1);   /*a function to check if userSeq and gameSeq have same last value. */
}

/*now we made the common object for all the buttons, and we added an event, where, on clicking any button
the event is triggered, and some callback is called. */
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}