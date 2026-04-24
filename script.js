let plusX = document.getElementById("X");
let plusY = document.getElementById("Y");
let goalX = document.getElementById("goalX");
let goalY = document.getElementById("goalY");
let startX = document.getElementById("startX");
let startY = document.getElementById("startY");
let pathfind = document.getElementById("pathfind");
let pathfindFake = document.getElementById("pathfindFake");
let targetX = 5;
let targetY = 5;
let grid = [];

class Tile {
    constructor(isVisited, isStart, isGoal, isRoadBlock, myLocation) {
        this.children = [];
        this.parent = [];
        this.isVisited = isVisited;
        this.isStart = isStart;
        this.isGoal = isGoal;
        this.isRoadBlock = isRoadBlock;
        this.myLocation = myLocation;
        this.isPath = false;
    }
    kidnap() {
        // look for if tile exists (border tiles)
        let rightTile = grid[this.myLocation[0] + 1]?.[this.myLocation[1]];
        let leftTile = grid[this.myLocation[0] - 1]?.[this.myLocation[1]];
        let upTile = grid[this.myLocation[0]]?.[this.myLocation[1] + 1];
        let downTile = grid[this.myLocation[0]]?.[this.myLocation[1] - 1];
        let items = [rightTile, leftTile, upTile, downTile];
        for (const item of items) {
            if (item === undefined) {
                continue
            }
            else {
                this.children.push(item);
            }
        }
       return this.children;
    }
}

function gridMaker(targetX, targetY) {
    let grid = [];
    for (let i = 0; i < targetY; i++) {
        // make the column
        grid[i] = [];
        for (let j = 0; j < targetX; j++) {
            // make the tiles in each row
            grid[i][j] = new Tile(false, false, false, false, Array.of(i, j));
        }
    }
    return grid;
}



function gridDisplay(grid) {
    // get DOM elements ready
    let gridDiv = document.getElementById("gridOutput");
    let tableProto = document.createElement("table");
    tableProto.id = "gridTable";
    gridDiv.append(tableProto);
    let table = document.getElementById("gridTable");

    for (let i = 0; i < grid.length; i++) {
        // creates table first
        let gridRow = document.createElement("tr");
        // id is the word gridRow + number of row, will make kidnapping easier
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
    colorChanger();
});
plusY.addEventListener("input", () => {
    targetY = plusY.value;
    grid = gridMaker(targetX, targetY);
    refreshGridInfo();
    let gridDiv = document.getElementById("gridOutput");
    gridDiv.innerHTML = "";
    gridDisplay(grid);
    roadblockHandler();
    colorChanger();
});
function refreshGridInfo() {
    let infoYDiv = document.getElementById("currentSizeY");
    infoYDiv.innerHTML = "Current Grid Height: " + targetY;
    let infoXDiv = document.getElementById("currentSizeX");
    infoXDiv.innerHTML = "Current Grid Width: " + targetX;
}

goalX.addEventListener("input", () => {goalHandler();});
goalY.addEventListener("input", () => {goalHandler();});
startX.addEventListener("input", () => {startHandler();});
startY.addEventListener("input", () => {startHandler();});
pathfindFake.addEventListener("click", () => {
    pathfindFake.style.backgroundColor = "#2b2b2b";
    window.alert("A* pathfinding functionality is not implemented. I do not want to implement this. I'm sorry.");
    pathfindFake.disabled = true;
    pathfindFake.style.cursor = "not-allowed";
});

pathfind.addEventListener("click", () => {
    // VALIDATE ALL INPUTS
    // check if goals are within range
    try {
        if (Number(goalX.value) >= Number(plusX.value) || Number(goalX.value) < 0 || goalX.value == "") {
            throw new Error("Illegal Goal X value");
        }
        else if (Number(goalY.value) >= Number(plusY.value) || Number(goalY.value) < 0 || goalY.value == "") {
            throw new Error("Illegal Goal Y value");
        }
        // check if starts are in range
        else if (Number(startX.value) >= Number(plusX.value) || Number(startX.value) < 0 || startX.value == "") {
            throw new Error("Illegal Start X value");
        }
        else if (Number(startY.value) >= Number(plusY.value) || Number(startY.value) < 0 || startY.value == "") {
            throw new Error("Illegal Start Y value");
        }
        else {
            console.log("All values appear to be legal! Continuing...");
        }
        
    }
    catch (error) {
        window.alert("There has been an error with a position:\n" + '"' + error + '"' + "\nPlease fix this error before trying again");
    }
    BFS(grid[startX.value][startY.value]);
});

gridDisplay(grid);
roadblockHandler();


function roadblockHandler() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = grid[i][j];
            let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
            gridItemDomItem.addEventListener("click", () => {
                if (gridItem.isRoadBlock == false && gridItem.isGoal == false && gridItem.isStart == false) {
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
    let goalLocationY = goalX.value;
    let goalLocationX = goalY.value;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = grid[i][j];
            let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
            // set the isGoal property of the corresponding gridItem 
            if (goalLocationX == i && goalLocationY == j && gridItem.isRoadBlock == false && gridItem.isStart == false && gridItem.isGoal == false) {
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
    let startLocationY = startX.value;
    let startLocationX = startY.value;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let gridItem = grid[i][j];
            let gridItemDomItem = document.getElementById("gridItem" + i + "," + j);
            // set the isStart property of the corresponding item
            if (startLocationX == i && startLocationY == j && gridItem.isRoadBlock == false && gridItem.isStart == false && gridItem.isGoal == false) {
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
            else if (gridItem.isPath === true) {
                gridItemDomItem.style.backgroundColor = "Aqua";
            }
            else {
                gridItemDomItem.style.backgroundColor = "Gray";
            }
        }
    }
}

function BFS(startNode) {
    let queue = [];
<<<<<<< HEAD
    let parents = [];
    queue.push(startNode);

=======
    let rootNode = grid[startX.value][startY.value];
    queue.push(rootNode);
    
>>>>>>> parent of b1752cd (FINALLY THE PATHFINDING WORKS YAYYAYYAYAYAYAYAY)
    while (queue.length !== 0) {
        let currentNode = queue[0];
        if (currentNode.isGoal == true) {
            console.log("I found it! " + currentNode.myLocation);
            let currentChildren = currentNode.kidnap();
            console.log(currentChildren);
            break;
        }
        else {
<<<<<<< HEAD
            if (!currentNode.isVisited && !currentNode.isRoadBlock) {
                currentNode.isVisited = true;
                queue.shift();
                let currentChildren = currentNode.kidnap();
                queue.push(...currentChildren);
                console.log("next node: " + currentChildren[0].myLocation);
                currentChildren[0].parent = currentNode;
                console.log("next node parent: " + currentChildren[0].parent.myLocation);
                parents.push(currentChildren[0].parent);
                currentNode.isVisited = true;
            }
            else if (currentNode.isRoadBlock) {
                console.log("node is roadblock " + currentNode.myLocation);
                queue.shift();
                currentNode.isVisited = true;
            }
=======
            if (!currentNode.isVisited || !currentNode.isRoadBlock) {
                queue.shift();
                let currentChildren = currentNode.kidnap();
                queue.push(currentChildren);
                console.log(currentChildren);
                currentNode.isVisited = true;
            }
>>>>>>> parent of b1752cd (FINALLY THE PATHFINDING WORKS YAYYAYYAYAYAYAYAY)
            else {
                console.log("node has been visited " + currentNode.myLocation);
                queue.shift();
            }
        }
        colorChanger();
    }
}
