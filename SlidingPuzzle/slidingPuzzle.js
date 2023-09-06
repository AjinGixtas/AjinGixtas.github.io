let size = 3
let emptyGridX = 0, emptyGridY = 0
let gridBoard = []
const gridBoardHTML = document.getElementById("gridBoard")

function createGridBoard() {
    for (let i = 0; i < size; i++) {
        const rows = document.createElement("tr")

        for (let j = 0; j < size; j++) {

            const grid = document.createElement("td")
            grid.setAttribute("id", `X_${j}_Y_${i}`)
            grid.setAttribute("class", "grid dead")
            rows.appendChild(grid)
            //grid.onclick = GridClickHandler

            gridBoard[Index(i, j)] = Index(i, j)
            grid.textContent = [Index(i, j)]
            grid.onclick = GridOnClick
        }
        gridBoardHTML.appendChild(rows)
    }
}
function shuffleBoard() {
    let temp = 0, _i = 0
    for (let i = 0; i < 2; i++) {
        _i = RandomNumber(0, gridBoard.length)
        temp = gridBoard[i]
        gridBoard[i] = gridBoard[_i]
        gridBoard[_i] = temp
    }
    if (ValidateBoardSolvability() == true) { return }
    shuffleBoard()
}
function ValidateBoardSolvability() {
    let sum = 0
    for (let i = 0; i < gridBoard.length; i++) {
        for (let j = i; j < gridBoard.length; j++) {
            if (gridBoard[i] !== 0 && gridBoard[j] !== 0 && gridBoard[i] > gridBoard[j]) { sum++ }
        }
    }

    let emptyGridIndex = 0
    for (let i = 0; i < gridBoard.length; i++) {
        if (!gridBoard[i]) {
            emptyGridIndex = i
            emptyGridY = Math.floor(emptyGridIndex / size)
            emptyGridX = emptyGridIndex - emptyGridY * size
            break
        }
    }
    if (size % 2 === 0) { return sum % 2 === 0 }

    sum += Math.floor(emptyGridIndex / size)
    return sum % 2 === 1
}
function RenderBoard() {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const grid = document.getElementById(`X_${x}_Y_${y}`)
            if (gridBoard[Index(x, y)] == 0) {
                grid.textContent = ""
                continue
            }
            grid.textContent = gridBoard[Index(x, y)]
        }
    }
}
function RandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function Index(x, y) {
    return y * size + x
}
function CheckBoard() {
    for (let i = 0; i < gridBoard.length - 1; i++) {
        if (gridBoard[i] !== i + 1) { return false }
    }
    return true
}
function Move(xOffset, yOffset) {
    gridBoard[Index(emptyGridX, emptyGridY)] = gridBoard[Index(emptyGridX + xOffset, emptyGridY + yOffset)]
    gridBoard[Index(emptyGridX + xOffset, emptyGridY + yOffset)] = 0
    emptyGridX += xOffset
    emptyGridY += yOffset
}
function GridOnClick() {
    let gridID = this.id
    let gridSplitedID = gridID.split("_")
    let gridPosX = parseInt(gridSplitedID[1])
    let gridPosY = parseInt(gridSplitedID[3])
    if (!(gridPosX === emptyGridX ^ gridPosY === emptyGridY)) { return }
    if (!(Math.abs(gridPosX - emptyGridX) === 1 ^ Math.abs(gridPosY - emptyGridY) === 1)) { return }
    Move(gridPosX - emptyGridX, gridPosY - emptyGridY)
    RenderBoard()
    if (CheckBoard()) { console.log("YES!") }
}
createGridBoard()
shuffleBoard()
RenderBoard()