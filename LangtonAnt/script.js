const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3
let gridBoard = []
let gridBoardHTML = document.getElementById("gridBoard")
let gridsHTML = []
let col = 25, row = 75
function createGridBoard() {
    for (let x = 0; x < col; x++) {
        const rows = document.createElement("tr")

        gridBoard[x] = []
        gridsHTML[x] = []

        for (let y = 0; y < row; y++) {
            gridBoard[x][y] = RandomNumber(0, 4)

            const grid = document.createElement("td")
            grid.setAttribute("id", `X_${x}_Y_${y}`)
            grid.setAttribute("class", "grid d" + gridBoard[x][y])
            rows.appendChild(grid)

            gridsHTML[x][y] = grid

        }
        gridBoardHTML.appendChild(rows)
    }
}
function RandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
let res = [0, 0, 0, 0]
function MoveAnts() {
    res = [0, 0, 0, 0]
    for (let i = 0; i < ants.length; i++) {
        ants[i].MoveAnt()
    }
    return
    for (let x = 0; x < col; x++) {
        for (let y = 0; y < row; y++) {
            res[gridBoard[x][y]]++
        }
    }
    console.log(res[0], res[1], res[2], res[3])
}
createGridBoard()
class Ant {
    constructor() {
        this.x_ant = RandomNumber(0, col)
        this.y_ant = RandomNumber(0, row)
        this.dir_ant = UP
    }
    MoveAnt() {
        this.dir_ant = Math.abs(this.dir_ant + gridBoard[this.x_ant][this.y_ant] - 3)
        gridsHTML[this.x_ant][this.y_ant].innerHTML = ""
        gridsHTML[this.x_ant][this.y_ant].classList.remove("d" + gridBoard[this.x_ant][this.y_ant])
        gridBoard[this.x_ant][this.y_ant]++
        gridBoard[this.x_ant][this.y_ant] > 1 ? gridBoard[this.x_ant][this.y_ant] = 0 : null
        //gridsHTML[this.x_ant][this.y_ant].style.animation = "a" + gridsHTML[this.x_ant][this.y_ant] + " 0.1s linear"
        gridsHTML[this.x_ant][this.y_ant].classList.add("d" + gridBoard[this.x_ant][this.y_ant])
        switch (this.dir_ant) {
            case UP:
                this.y_ant++
                this.y_ant == row ? this.y_ant = 0 : null
                break
            case RIGHT:
                this.x_ant++
                this.x_ant == col ? this.x_ant = 0 : null
                break
            case DOWN:
                this.y_ant--
                this.y_ant < 0 ? this.y_ant = row - 1 : null
                break
            case LEFT:
                this.x_ant--
                this.x_ant < 0 ? this.x_ant = col - 1 : null
                break
        }
        gridsHTML[this.x_ant][this.y_ant].innerHTML = "&#9632;"
    }
}
let antCount = 1
let ants = []
for (let i = 0; i < antCount; i++) {
    ants[i] = new Ant()
}
setInterval(MoveAnts, 500)
//MoveAnts()