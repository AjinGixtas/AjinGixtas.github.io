//I never should have made this game, abort!
//Have fun mess around though :)

let gridBoardArray = []
let gridBoardHTML = document.getElementById("gridBoard")
let height = 4
let width = 5

function CreateGridBoard() {
    for (let i = 0; i < height; i++) {
        const rows = document.createElement("tr")
        gridBoardArray[i] = []
        for (let j = 0; j < width; j++) {
            const grid = document.createElement("td")
            grid.setAttribute("id", `X_${j}_Y_${i}`)
            grid.setAttribute("class", "grid")
            rows.appendChild(grid)
            gridBoardArray[i][j] = 0
        }
        gridBoardHTML.appendChild(rows)
    }
}
let board =
    [[0, 0, 2, 2],
    [0, 2, 0, 2],
    [0, 0, 2, 0],
    [2, 0, 0, 0]
    ]
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            MoveGrid(0)
            break;
        case "ArrowDown":
            MoveGrid(2)
            break;
        case "ArrowLeft":
            MoveGrid(3)
            break;
        case "ArrowRight":
            MoveGrid(1)
            break;
    }
}, true);

function MoveGrid(dirIndex) {
    let dirX = 0, dirY = 0
    let startX = 0, startY = 0
    let endX = 4, endY = 4
    let isReverse = false
    switch (dirIndex) {
        case 0:
            dirY = 1
            break
        case 1:
            dirX = 1
            break
        case 2:
            dirY = -1
            startY = 4
            endY = 0
            break
        case 3:
            dirX = -1
            startX = 4
            endX = 0
            break
    }
    if (!isReverse) {
        for (let i = startX; i < endX; i++) {
            for (let j = startY; j < endY; j++){
                let targetGrid = gridBoardArray[j-dirY][i-dirX]
                let mainGrid = gridBoardArray[j][i]
            }
        }
    }
}

function Initiate() {
    CreateGridBoard()
    gridBoardArray = board
}
Initiate()