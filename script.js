let plusX = document.getElementById("X");
let plusY = document.getElementById("Y");
let goalX = document.getElementById("goalX");
let goalY = document.getElementById("goalY");
let startX = document.getElementById("startX");
let startY = document.getElementById("startY");
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
    let table = document.getElementById("gridTable");

    for (let i = 0; i < grid.length; i++) {
        let gridRow = document.createElement("tr");
        gridRow.id = "gridRow" + i;
        table.append(gridRow);
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = document.createElement("td");
            gridItem.id = "gridItem" + i + "," + j;
            gridItem.textContent = i + ", " + j;
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

plusX.addEventListener("input", () => {
    targetX = plusX.value;
    grid = gridMaker(targetX, targetY);
    refreshGridInfo();
    let gridDiv = document.getElementById("gridOutput");
    gridDiv.innerHTML = "";
    gridDisplay(grid);
    roadblockHandler();
});

plusY.addEventListener("input", () => {
    targetY = plusY.value;
    grid = gridMaker(targetX, targetY);
    refreshGridInfo();
    let gridDiv = document.getElementById("gridOutput");
    gridDiv.innerHTML = "";
    gridDisplay(grid);
    roadblockHandler();
});

goalX.addEventListener("input", () => {goalHandler();});
goalY.addEventListener("input", () => {goalHandler();});

startX.addEventListener("input", () => {startHandler();});
startY.addEventListener("input", () => {startHandler();});


gridDisplay(grid);
roadblockHandler();

function refreshGridInfo() {
    let infoYDiv = document.getElementById("currentSizeY");
    infoYDiv.innerHTML = "Current Grid Height: " + targetY;
    let infoXDiv = document.getElementById("currentSizeX");
    infoXDiv.innerHTML = "Current Grid Width: " + targetX;
}

function roadblockHandler() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = grid[i][j];
            let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
            gridItemDomItem.addEventListener("click", () => {
                if (gridItem.isRoadBlock === false && gridItem.isGoal === false) {
                    gridItem.isRoadBlock = true;
                }
                else {
                    gridItem.isRoadBlock = false;
                }
                colorChanger();
            });
        }
    }
}

function goalHandler() {
    // gets the value of the goal input's X and Y
    let goalLocationX = goalX.value;
    let goalLocationY = goalY.value;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = grid[i][j];
            let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
            // set the isGoal property of the corresponding gridItem 
            if (goalLocationX == i && goalLocationY == j && gridItem.isRoadBlock === false) {
                gridItem.isGoal = true;
            }
            else {
                gridItem.isGoal = false;
            }
            colorChanger();
        }
    }
}

function startHandler() {
    // gets the value of the start input's X and Y
    let startLocationX = startX.value;
    let startLocationY = startY.value;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = grid[i][j];
            let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
            // set the isStart property of the corresponding item
            if (startLocationX == i && startLocationY == j && gridItem.isRoadBlock == false) {
                gridItem.isStart = true;
            }
            else {
                gridItem.isStart = false;
            }
            colorChanger();
        }
    }
}

function colorChanger() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = grid[i][j];
            let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
            if (gridItem.isGoal === true) {
                gridItemDomItem.style.backgroundColor = "Green";
            }
            else if (gridItem.isRoadBlock === true) {
                gridItemDomItem.style.backgroundColor = "rgb(26, 26, 26)";
            } 
            else if (gridItem.isStart === true) {
                gridItemDomItem.style.backgroundColor = "Red";
            }
            else if (gridItem.isVisited === true) {
                gridItemDomItem.style.backgroundColor = "Peru";
            }
            else {
                gridItemDomItem.style.backgroundColor = "Gray";
            }
    }
    }
}
