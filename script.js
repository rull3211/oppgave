let opp = document.querySelector(".opp") 
let ned = document.querySelector(".ned")
let isOpen = false
let idOfIsOpen = null
let toClose = false
let antallKlikk = 0
let antallRette = 0

let init = ()=>{
    let boardSize = 4
    let pairs = []

    for(let ant = 0 ; ant < boardSize*2; ant++){
        pairs.push(ant)
        pairs.push(ant)
    }
    
    for(let k = 0; k < 4; k++){
        opp.insertAdjacentHTML("beforeend", `<div class = "row"></div>`) 
        ned.insertAdjacentHTML("beforeend", `<div class = "row"></div>`)
        for(let i = 0; i < 4; i++){
            let idIndex = Math.floor(Math.random() * pairs.length)
            let id = pairs[idIndex]
            pairs.splice(idIndex, 1)
            ned.children[k].insertAdjacentHTML("beforeend", `<div id = "pic" class="pic${id}"></div>`);
            opp.children[k].insertAdjacentHTML("beforeend", `<div tabindex = -1 id = "picCover" class="picCover${id}"></div>`);
            ["click", "keyup"].forEach(e =>{
                opp.children[k].lastChild.addEventListener(e, ClickHandler)
            })
            }
    }
    
}

let restartHandler = event =>{
    ned.innerHTML = ""
    opp.innerHTML = ""
    let endscreen = document.querySelector(".endScreen")
    endscreen.parentNode.removeChild(endscreen)
    init()
    antallKlikk = antallRette = 0
}

let ClickHandler = event =>{
    let clicked = event.target
    if(event.type === "keyup" && event.keyCode !== 13) return

    if(clicked.classList[1] == "open") return
    
    if(toClose != false){
        toClose.classList.remove("open")
        document.querySelectorAll(`.${idOfIsOpen}`)[0].classList.remove("open")
        document.querySelectorAll(`.${idOfIsOpen}`)[1].classList.remove("open");
        isOpen= false 
        idOfIsOpen = null
        toClose = false 
    }

    if(! isOpen){
        idOfIsOpen = clicked.classList[0]
        isOpen = true
        clicked.classList.add("open")
        antallKlikk ++
    }

    else if( isOpen ){

        if (idOfIsOpen === clicked.classList[0] && clicked.classList[1] != "open"){
            clicked.classList.add("open")
            isOpen = false
            idOfIsOpen = null
            antallKlikk ++
            antallRette += 2
        }

        else if (idOfIsOpen != clicked.classList[0]){ 
            toClose = clicked
            clicked.classList.add("open")
            antallKlikk ++
        }
    }

    if(antallRette == 16){
        document.querySelector(".boardWrapper").insertAdjacentHTML("beforeend",`
        <DIV class="endScreen">
            <p>Du vant</p>
            <P>Du klarte å finne 8 par på ${antallKlikk} trekk</P>
            <DIV class="restartButton">Trykk her for å starte på nytt</DIV>
        </DIV>` )
        document.querySelector(".restartButton").addEventListener("click", restartHandler)

    }
}

init()

