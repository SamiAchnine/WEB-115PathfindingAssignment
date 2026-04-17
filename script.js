let plusX = document.getElementById("X");
let plusY = document.getElementById("Y");
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
});

plusY.addEventListener("input", () => {
    targetY = plusY.value;
    grid = gridMaker(targetX, targetY);
    refreshGridInfo();
    let gridDiv = document.getElementById("gridOutput");
    gridDiv.innerHTML = "";
    gridDisplay(grid);
});


gridDisplay(grid);

function refreshGridInfo() {
    let infoYDiv = document.getElementById("currentSizeY");
    infoYDiv.innerHTML = "Current Grid Height: " + targetY;
    let infoXDiv = document.getElementById("currentSizeX");
    infoXDiv.innerHTML = "Current Grid Width: " + targetX;
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        let gridItem = grid[i][j];
        let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
        gridItemDomItem.addEventListener("click", () => {
            console.log("Yep, it's me, the cell at " + i + ", " + j + " being clicked on!")
        })
    }
}