let plusX = document.getElementById("plusX");
let plusY = document.getElementById("plusY");
let refreshGrid = document.getElementById("refreshGrid");
let targetX = 5;
let targetY = 5;
let grid = [];

class Tile {
    constructor(isVisited, isStart, isGoal, isRoadBlock) {
        this.children = [];
        this.isVisited = isVisited;
        this.isStart = isStart;
        this.isGoal = isGoal;
        this.isRoadBlock = isRoadBlock;
    }
}

function gridMaker(targetX, targetY) {
    let grid = [];
    for (let i = 0; i < targetY; i++) {
        // make the column
        grid[i] = [];
        for (let j = 0; j < targetX; j++) {
            // make the tiles in each row
            grid[i][j] = new Tile(false, false, false, false);
        }
    }
    
    return grid;
}

grid = gridMaker(targetX, targetY);


function gridDisplay(grid) {
    let gridDiv = document.getElementById("gridOutput");
    let tableProto = document.createElement("table");
    tableProto.id = "gridTable";
    gridDiv.append(tableProto);
    let table = document.getElementById("gridTable")
    for (let i = 0; i < grid.length; i++) {
        let gridRow = document.createElement("tr");
        gridRow.id = "gridRow"
        // gridItem.addEventListener("click", () => {tileChanger()});
        table.append(gridRow);
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = document.createElement("td");
            gridRow.append(gridItem);
            if (grid[i][j].isGoal === true) {
                gridItem.style.backgroundColor = "Green";
            }
            else if (grid[i][j].isRoadBlock === true) {
                gridItem.style.backgroundColor = "rgb(26, 26, 26)";
            } 
            else if (grid[i][j].isStart === true) {
                gridItem.style.backgroundColor = "Red";
            }
            else if (grid[i][j].isVisited === true) {
                gridItem.style.backgroundColor = "Peru";
            }
            else {
                gridItem.style.backgroundColor = "Gray";
            }
        }
    }
}

plusX.addEventListener("click", () => {
    
    targetX += 1;
    refreshGridInfo();
    grid = gridMaker(targetX, targetY);
});
plusY.addEventListener("click", () => {
    
    targetY += 1;
    refreshGridInfo();
    grid = gridMaker(targetX, targetY);
});

refreshGrid.addEventListener("click", () => {
    refreshGridInfo();
    let gridDiv = document.getElementById("gridOutput");
    gridDiv.innerHTML = "";
    gridDisplay(grid);
});

gridDisplay(grid);
function refreshGridInfo() {
    let infoYDiv = document.getElementById("sizeY");
    infoYDiv.innerHTML = "Current Grid Height: " + targetY;
    let infoXDiv = document.getElementById("sizeX");
    infoXDiv.innerHTML = "Current Grid Width: " + targetX;
}