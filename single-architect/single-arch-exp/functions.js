
hideTable = function(){
    $('#blocks').hide();
    $('#role').hide();
    //$('#moving_notice').hide();
}

hideNotice = function(){
    document.getElementById("moving_notice").style.visibility = "hidden";
}


showTable = function(){
    $('#blocks').show();
    
    let shape = ["square", "circle"]
    let currentShape = Array(currentConfiguration.length).fill(shape[0]) // all squares for now
    drawTable(currentShape, currentConfiguration)
    genericDragDrop(currentConfiguration,currentShape, "real");
}




getID = function(moveInfo){

    //moveInfo = moveInfo.replace('circle', '');
                
    // now moveInfo contains "row1cell01" 

    var row_from = Number(moveInfo.toString().charAt(3)) // rowX
    var cell_from = Number(moveInfo.toString().substr(moveInfo.length - 2))// rowXcellXY

    // once we have the row/cell to/from, we change the current configuration of those specific cell
    
    // for each row increment, there is a +18 in index
    // for each cell increment, there is +1 in index
    // row1cell01 = (row-1)*18 + (cell-1) =  0 + 0
    // row2cell01 = (2-1)*18 + (1 -1 ) =  18 + 0
    // row3cell4 = (3-1)*18 + (4-1) = 36 + 3 = 39


    var moveFromID = (row_from-1)*18 + (cell_from-1)
    return moveFromID
}

updateConfiguration = function(currentConfig, moveFrom, moveTo){
    console.log("moveFrom: " + moveFrom)
    console.log("moveTo: " + moveTo)
    moveToID = getID(moveTo)
    //console.log("moveToID=",moveToID)
    moveFromID = getID(moveFrom)
    //console.log("moveFromID=",moveFromID)
    currentConfig[moveToID] = currentConfig[moveFromID]
    // and moveFromID becomes white
    currentConfig[moveFromID] = "white"
    return currentConfig

}

computeGoalIndices = function(goalString){
    // need to compute goal relevant indices
        console.log("inside goalIndices, goalString=",goalString)
        var goal = goalString.split(" ")
        

        var action = goal[0]
        var color = goal[1]
        var goal_location = goal[2]
        var goalindices = []

        

        if(goal_location == "A1"){goalindices = [0,1,2,18, 19, 20, 36,37,38,54,55,56,72,73,74,90,91,92]}
        else if(goal_location == "A2"){goalindices = [3,4,5,21,22,23,39,40,41,57,58,59,75,76,77,93,94,95]}
        else if(goal_location == "A"){goalindices = [3,4,5,21,22,23,39,40,41,57,58,59,75,76,77,93,94,95, 0,1,2,18, 19, 20, 36,37,38,54,55,56,72,73,74,90,91,92]}
        else if(goal_location == "B1"){goalindices = [6,7,8,24,25,26,42,43,44,60,61,62,78,79,80,96,97,98]}
        else if(goal_location == "B2"){goalindices = [9,10,11,27,28,29,45,46,47,63,64,65,81,82,83,99,100,101]}
        else if(goal_location == "B"){goalindices = [9,10,11,27,28,29,45,46,47,63,64,65,81,82,83,99,100,101, 6,7,8,24,25,26,42,43,44,60,61,62,78,79,80,96,97,98]}
        else if(goal_location == "C1"){goalindices = [12,13,14,30,31,32,48,49,50,66,67,68,84,85,86,102,103,104]}
        else if(goal_location == "C2"){goalindices = [15,16,17,33,34,35,51,52,53,69,70,71,87,88,89,105,106,107]}
        else if(goal_location == "C"){goalindices = [15,16,17,33,34,35,51,52,53,69,70,71,87,88,89,105,106,107,12,13,14,30,31,32,48,49,50,66,67,68,84,85,86,102,103,104]}
        else{goalindices = Array.from({length: 108}, (item, index) => index);}
       
        //console.log("goalindices="+goalindices)
        // compute optimal moves for a given goal but only once
        /*
        if(optCounter == 0){
        optimalMoveCount =optimalMoves(action, color, goal_location)
        //console.log("optimal moves =", optimalMoveCount)
        // set initial optimal to ultimate optimal
        currentOptimalCount = JSON.parse(JSON.stringify(optimalMoveCount));
        optCounter+=1
        }
        */

        if(action == "clear"){verbalGoal = action + " all blocks " + "in " + goal_location}
        else if(action == "fill"){verbalGoal = action + " all locations in " + goal_location}
        else if(action == "move"){verbalGoal = action + " all " + color +  " blocks"  + " to " + goal_location}
        else if(action == "cover" || action == "uncover"){verbalGoal = action + " all " + color +  " blocks"}
        else{verbalGoal = action + " all " + color +  " blocks"  + " in " + goal_location}
        
        console.log("verbalGoal=",verbalGoal)
        return [goalindices, verbalGoal]
    
}

checkGoal = function(currentConfiguration,currentShape, goal){
    console.log("inside checkGoal, goal=", goal)
    var goalindices = computeGoalIndices(goal)[0]
    console.log("goalindices=", goalindices)

    
    // depending on what the goal is, the checking function does different things
    //console.log("inside provideFeedback")
    var goal_components = goal.split(" ")
    var action = goal_components[0]
    var color = goal_components[1]
    //var location = goal_components[2]

    //console.log("action=", action)
    //console.log("color=", color)
    
    // get the relevant indices of the room out of currentConfiguration and currentShape

    const checker_color = goalindices.map(x=>currentConfiguration[x]);
    const checker_shape = goalindices.map(x=>currentShape[x]);

    var roomContents = [checker_color, checker_shape].reduce((a, b) => a.map((v, i) => v  + b[i]));

    // need to have different conditions here
    var success = 0

    if(action == "clear"){
        
        var goal_combo  = "whitesquare"
        const combo_occurrences = roomContents.filter(x => x === goal_combo).length
        
        if(combo_occurrences == roomContents.length){success = 1}
    }
    else if(action == "fill"){
        var goal_combo  = "whitesquare"
        const combo_occurrences = roomContents.filter(x => x === goal_combo).length
        
        if(combo_occurrences == 0){success = 1}

    }
    else if (action == "move"){
        
        var goal_combo = color + "square"
        const combo_occurrences = roomContents.filter(x => x === goal_combo).length
        
        if(combo_occurrences == 10){success = 1}
    }
    else if(action == "remove"){
        
        var goal_combo = color + "square"
        const combo_occurrences = roomContents.filter(x => x === goal_combo).length
        if(combo_occurrences == 0){success = 1}
    }
    else if(action == "cover" || action == "uncover"){
        
        // find indices corresponding to goal color
        const color_relevant = goalindices.filter(x => currentConfiguration[x] === color)
        
        // compute open vs. obstructed

        var moveable = findMoveable()
        
        var obstructed = color_relevant.filter(x => !moveable.includes(x))
        
        var open = color_relevant.filter(x => !obstructed.includes(x))
        

        if(action == "cover" && open.length == 0){success = 1}
        if(action == "uncover" && obstructed.length == 0){success = 1}

    }

    // return whether the goal has been achieved or not
    if(success == 1){
        return 1;
    }
    else{
        return 0;
    }
    
};

findMoveable = function(){
    // finds moveable indices in any configuration
    var fulldragindices= Array(currentConfiguration.length).fill().map((x,i)=>i)
    var validDragargets = reduceDragArray(fulldragindices, currentConfiguration)
    
    return validDragargets;

}

function getIDnames(x){
    if (x < 9){return "row1" + "cell0"+ (x + 1) ;}
    else if (x < 18){return "row1" + "cell"+ (x + 1) ;}
    else if(x < 36){
        var val = (x-18)+1
        if(val < 10){return "row2" + "cell0"+ ((x-18)+1);}
        else{return "row2" + "cell"+ ((x-18)+1);}
    }
    else if(x < 54){
        var val = (x-36)+1
        if(val < 10){return "row3" + "cell0"+ ((x-36)+1);}
        else{return "row3" + "cell"+ ((x-36)+1);}
    }

    else if(x < 72){
        var val = (x-54)+1
        if(val < 10){return "row4" + "cell0"+ ((x-54)+1);}
        else{return "row4" + "cell"+ ((x-54)+1);}
    }
    else if(x < 90){
        var val = (x-72)+1
        if(val < 10){return "row5" + "cell0"+ ((x-72)+1);}
        else{return "row5" + "cell"+ ((x-72)+1);}
    }

    else {
        var val = (x-90)+1
        if(val < 10){return "row6" + "cell0"+ ((x-90)+1);}
        else{return "row6" + "cell"+ ((x-90)+1);}
    }
}

// code for modifying drag target

function reduceDragArray(indexArray, configArray) {
    console.log("inside reduceDragArray")
    console.log("indexArray=", indexArray)
    console.log("configArray=", configArray)
    var newArr = indexArray.reduce(function(a, e, i) {
    // only push if cell is non-white
    if(configArray[e] !=="white"){
        // if the index is not in the first row
    if (e > 17){
        // if the element on top is white, then it's draggable
        if(configArray[e-18] === "white"){a.push(e);}
    }
    else{a.push(e);}}    
    return a;
    }, []);
    return newArr
}

function reduceDropArray(indexArray, configArray) {
    var newArr = indexArray.reduce(function(a, e, i) {
    if (e-18 < 108){
        if(configArray[e+18] !== "white"){a.push(e);}
    }
    else{a.push(e);}    
    return a;
}, []);
    return newArr
}

function getID(moveInfo){

    moveInfo = moveInfo.replace('circle', '');
                
    // now moveInfo contains "row1cell01" 

    var row_from = Number(moveInfo.charAt(3)) // rowX
    var cell_from = Number(moveInfo.substr(moveInfo.length - 2))// rowXcellXY

    // once we have the row/cell to/from, we change the current configuration of those specific cell
    
    // for each row increment, there is a +18 in index
    // for each cell increment, there is +1 in index
    // row1cell01 = (row-1)*18 + (cell-1) =  0 + 0
    // row2cell01 = (2-1)*18 + (1 -1 ) =  18 + 0
    // row3cell4 = (3-1)*18 + (4-1) = 36 + 3 = 39


    var moveFromID = (row_from-1)*18 + (cell_from-1)
    return moveFromID
}



genericDragDrop = function(pracConfig,currentShape, mode){
    
    console.log("inside genericDragDrop")

    console.log("pracConfig", pracConfig)

    var recordedMove = []
    // define a generic drag drop function that can be used for both actual and practice

    var dragid = 0;
    var dropid = 0;
    var total = 0;
    var dragtarget = document.getElementById("blocks");
    
    

    // not all items should be "draggable" in the table
    // we could check for whether there is anything non-white above a particular index                

    
    var fulldragindices= Array(pracConfig.length).fill().map((x,i)=>i)
    console.log("fulldragindices", fulldragindices)
    var validDragargets = reduceDragArray(fulldragindices, pracConfig)
    console.log("validDragargets", validDragargets)
    
    // convert to table cell IDs

    var filteredDragTableIDs = validDragargets.map(getIDnames);
    
    // code for modifying drop targets

    var droptarget = document.getElementById("blocks"); 
    // need to make this only some specific drag choices
    // could try to filter for only "white" cells

    var filtereddropIndices = pracConfig.reduce(function(a, e, i) {
        if (e === 'white')
            a.push(i);
        return a;
    }, []);

    // ultimately we want to further restrict this to only white cells that
    // have something non-white below them

    // logic for more filtering: if the color of the cell at the bottom is white too then exclude
    // x+18

    

    var validWhiteBoxes = reduceDropArray(filtereddropIndices, pracConfig) 
    
    var filteredDropTableIDs = validWhiteBoxes.map(getIDnames)

    var circlefilteredDropTableIDs = filteredDropTableIDs.map(i => 'circle' + i);


    var totalDropIDs = filteredDropTableIDs.concat(circlefilteredDropTableIDs);
    console.log("totalDropIDs=",totalDropIDs)

    var editedDropIDs = 0


    if(mode == "practice"){

        // choose randomly here

        var r1 =  Math.floor(Math.random() * filteredDragTableIDs.length);
        var r2 =  Math.floor(Math.random() * filteredDragTableIDs.length);
        var randomDrag = filteredDragTableIDs[r1]
        var randomDrop = filteredDragTableIDs[r2]

        if(randomDrag.includes("circle")){randomDrag = randomDrag}
        else{randomDrag = "circle"+randomDrag}
        
        if(randomDrop.includes("circle")){randomDrop = randomDrop}
        else{randomDrop = "circle"+randomDrop}

        ////console.log("randomDrag=",randomDrag)
        ////console.log("randomDrop=",randomDrop)


        document.getElementById(randomDrag).innerHTML = "ONE"
        document.getElementById(randomDrag).style.color = "goldenrod"

        document.getElementById(randomDrop).innerHTML = "TWO"
        document.getElementById(randomDrop).style.color = "goldenrod"

        var nonCircleDrag = randomDrag.replace('circle', '');
        

        var pracdrag = [randomDrag, nonCircleDrag]
        ////console.log("pracdrag=",pracdrag)

        // pracdrop has to be rightabove pracDrag

        var actualDrop = getID(randomDrop) - 18
        ////console.log("actualDrop=",actualDrop)
        var actualDropname = getIDnames(actualDrop)
        ////console.log("actualDropname=",actualDropname)

        if(actualDropname.includes("circle")){
            var nonCircleDrop = actualDropname.replace('circle', '');
            var pracdrop = [actualDropname, nonCircleDrop]
        }
        else{
            var circleDrop = "circle"+actualDropname
            var pracdrop = [actualDropname, circleDrop]
        }

        ////console.log("pracdrop=")

        dragtarget.addEventListener('dragstart', drag_practice);
    }

    else{dragtarget.addEventListener('dragstart', dragStart);}

    
    droptarget.addEventListener('dragenter', dragEnter)
    droptarget.addEventListener('dragover', dragOver);
    droptarget.addEventListener('dragleave', dragLeave);

    if(mode == "practice"){droptarget.addEventListener('drop', drop);}
    else{
        droptarget.addEventListener('drop', drop_real);        
        
        }

    

    var draggedID = 0
    

    function drag_practice(e) {

         
        
       // if(drag_count == 0){    
                ////console.log('targetid='+e.target.id);
                draggedID = e.target.id
                editedDropIDs = editDrops();
                ////console.log("editedDropIDs=",editedDropIDs)
                ////console.log("filteredDragTableIDs=",filteredDragTableIDs)
                ////console.log("pracdrag=",pracdrag)

            if(pracdrag.includes(e.target.id)){                
                e.dataTransfer.setData('text/plain', e.target.id);
                e.target.style.opacity = .7;
            }
            else{alert("You need to to drag the block labeled ONE in this practice session!");}

          //  }
        }
    

    function dragStart(e) {
        
        //if(drag_count == 0){
                console.log('targetid='+e.target.id);
                draggedID = e.target.id
                editedDropIDs = editDrops();
                console.log("editedDropIDs=",editedDropIDs)
            if(filteredDragTableIDs.includes(e.target.id)){                
                e.dataTransfer.setData('text/plain', e.target.id);
                e.target.style.opacity = .7;
            }
            else{alert("You can only drag/drop ONE UNCOVERED block on a turn!");}

          //  }
        }
    

        
    function editDrops(){
        ////console.log("inside edit drops")

        var dragID= 0
        var aboveID = 0
        var dropIDnums = 0
        var newdropIDs =0 
        var finalDropIDs = 0

        console.log("draggedID=",draggedID)


        dragID  = getID(draggedID)
        console.log("dragID = ",dragID)
        aboveID = dragID-18

        dropIDnums = totalDropIDs.map(getID);

        dropIDnums = [...new Set(dropIDnums)];
        console.log("dropIDnums=",dropIDnums)

        newdropIDs = dropIDnums.reduce(function(a, e, i) {
            if (e != aboveID)
                a.push(e);
            return a;
        }, []);

        console.log("newdropIDs=",newdropIDs)

        // need to conver to names

        var newdropNames = newdropIDs.map(getIDnames);

        var circledropNames = newdropNames.map(i => 'circle' + i);

        finalDropIDs = newdropNames.concat(circledropNames);
        console.log("finalDropIDs=",finalDropIDs)
        return finalDropIDs;

    }
    
        function dragEnter(e) {
            //if(drag_count == 0){
                if(mode == "practice"){
                    if(pracdrop.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                    }
                }

                else{
                    if(editedDropIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                    }
                }
                
          //  }
        
        }

        function dragOver(e) {
           // if(drag_count == 0){

                if(mode == "practice"){
                    if(pracdrop.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                    }
                    
                }
                else{
                    if(editedDropIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                    }
                }
          //  }
        }

        function dragLeave(e) {
           // if(drag_count == 0){
            if(mode == "practice"){
                if(pracdrop.includes(e.target.id)){
                    e.target.classList.remove('drag-over');
                }

            }
            else{
                if(editedDropIDs.includes(e.target.id)){
                    e.target.classList.remove('drag-over');
                }
            }
            
        //}
        
        }
        function drop(e) {
            //if(drag_count == 0){
            if(pracdrop.includes(e.target.id)){
            e.target.classList.remove('drag-over');
            // get the draggable element
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
            dragid = id;
            dropid = JSON.parse(JSON.stringify(e.target.id));
            // add it to the drop target
            e.target.appendChild(draggable);
            
            }
           // }
            else{alert("You can only drag/drop ONE UNCOVERED block on a turn!");}                
        }

        
        function drop_real(e) {

            //if(drag_count == 0){

            if(editedDropIDs.includes(e.target.id)){
            
            e.target.classList.remove('drag-over');
            // get the draggable element
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
            dragid = id;
            dropid = JSON.parse(JSON.stringify(e.target.id));
            ////console.log("dragid="+dragid);
            ////console.log("dropid="+dropid);
            // add it to the drop target
            e.target.appendChild(draggable);
        
            // display the draggable element
            //draggable.classList.remove('hide');
            //const done_button = document.getElementById('done');
            //done_button.disabled = false;
            ////doneButton.enable(); // only enable when we have a valid drop location
            ////console.log("drag_count"+drag_count);
            // call the function that records these move IDs
            recordedMove = setTotalValue(currentConfiguration, currentShape);

            }
            else{alert("You can only drag/drop ONE UNOBSTRUCTED block on a turn!");}
        
            
        //}                

    function setTotalValue(currentConfiguration, currentShape){

        // if it gets into this function, it will change the drag and dropids and value of total
    
        total = "move a block from " + dragid + " to " + dropid;
        console.log("inside total = "+total)
        // this is where all the action is, so we need to record the move here
        // update the config and check if goal has been reached

        // update current configuration
        currentConfiguration = updateConfiguration(currentConfiguration, dragid, dropid)
        // check if goal has been achieved
        goalString = "move blue A1"
        console.log("goalString=",goalString)
        goalAchieved = checkGoal(currentConfiguration, currentShape, goalString)
        console.log("goalAchieved=",goalAchieved)
        //return [dragid, dropid, goalAchieved, currentConfiguration]
    
    }

};
//console.log("recordedMove = "+recordedMove)
//return recordedMove;
}


drawTable = function(shapeconfig,colorconfig ){
    //console.log("drawTable");

if(shapeconfig[0] == "circle"){
    document.getElementById("circlerow1cell01").style.backgroundColor = colorconfig[0]
    document.getElementById("row1cell01").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell01").style.backgroundColor = colorconfig[0]
    document.getElementById("row1cell01").style.backgroundColor = colorconfig[0]}   


if(shapeconfig[1] == "circle"){
    document.getElementById("circlerow1cell02").style.backgroundColor = colorconfig[1]
    document.getElementById("row1cell02").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell02").style.backgroundColor = colorconfig[1]
    document.getElementById("row1cell02").style.backgroundColor = colorconfig[1]}     

if(shapeconfig[2] == "circle"){
    document.getElementById("circlerow1cell03").style.backgroundColor = colorconfig[2]
    document.getElementById("row1cell03").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell03").style.backgroundColor = colorconfig[2]
    document.getElementById("row1cell03").style.backgroundColor = colorconfig[2]}     

if(shapeconfig[3] == "circle"){
    document.getElementById("circlerow1cell04").style.backgroundColor = colorconfig[3]
    document.getElementById("row1cell04").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell04").style.backgroundColor = colorconfig[3]
    document.getElementById("row1cell04").style.backgroundColor = colorconfig[3]}     

if(shapeconfig[4] == "circle"){
    document.getElementById("circlerow1cell05").style.backgroundColor = colorconfig[4]
    document.getElementById("row1cell05").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell05").style.backgroundColor = colorconfig[4]
    document.getElementById("row1cell05").style.backgroundColor = colorconfig[4]}     

if(shapeconfig[5] == "circle"){
    document.getElementById("circlerow1cell06").style.backgroundColor = colorconfig[5]
    document.getElementById("row1cell06").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell06").style.backgroundColor = colorconfig[5]
    document.getElementById("row1cell06").style.backgroundColor = colorconfig[5]}     

if(shapeconfig[6] == "circle"){
    document.getElementById("circlerow1cell07").style.backgroundColor = colorconfig[6]
    document.getElementById("row1cell07").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell07").style.backgroundColor = colorconfig[6]
    document.getElementById("row1cell07").style.backgroundColor = colorconfig[6]}     

if(shapeconfig[7] == "circle"){
    document.getElementById("circlerow1cell08").style.backgroundColor = colorconfig[7]
    document.getElementById("row1cell08").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell08").style.backgroundColor = colorconfig[7]
    document.getElementById("row1cell08").style.backgroundColor = colorconfig[7]}     

if(shapeconfig[8] == "circle"){
    document.getElementById("circlerow1cell09").style.backgroundColor = colorconfig[8]
    document.getElementById("row1cell09").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell09").style.backgroundColor = colorconfig[8]
    document.getElementById("row1cell09").style.backgroundColor = colorconfig[8]}     

if(shapeconfig[9] == "circle"){
    document.getElementById("circlerow1cell10").style.backgroundColor = colorconfig[9]
    document.getElementById("row1cell10").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell10").style.backgroundColor = colorconfig[9]
    document.getElementById("row1cell10").style.backgroundColor = colorconfig[9]}     

if(shapeconfig[10] == "circle"){
    document.getElementById("circlerow1cell11").style.backgroundColor = colorconfig[10]
    document.getElementById("row1cell11").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell11").style.backgroundColor = colorconfig[10]
    document.getElementById("row1cell11").style.backgroundColor = colorconfig[10]}     

if(shapeconfig[11] == "circle"){
    document.getElementById("circlerow1cell12").style.backgroundColor = colorconfig[11]
    document.getElementById("row1cell12").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell12").style.backgroundColor = colorconfig[11]
    document.getElementById("row1cell12").style.backgroundColor = colorconfig[11]}     

if(shapeconfig[12] == "circle"){
     document.getElementById("circlerow1cell13").style.backgroundColor = colorconfig[12]
    document.getElementById("row1cell13").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell13").style.backgroundColor = colorconfig[12]
    document.getElementById("row1cell13").style.backgroundColor = colorconfig[12]}     
    

if(shapeconfig[13] == "circle"){
    document.getElementById("circlerow1cell14").style.backgroundColor = colorconfig[13]
    document.getElementById("row1cell14").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell14").style.backgroundColor = colorconfig[13]
    document.getElementById("row1cell14").style.backgroundColor = colorconfig[13]}     

if(shapeconfig[14] == "circle"){
    document.getElementById("circlerow1cell15").style.backgroundColor = colorconfig[14]
    document.getElementById("row1cell15").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell15").style.backgroundColor = colorconfig[14]
    document.getElementById("row1cell15").style.backgroundColor = colorconfig[14]}     

if(shapeconfig[15] == "circle"){
    document.getElementById("circlerow1cell16").style.backgroundColor = colorconfig[15]
    document.getElementById("row1cell16").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell16").style.backgroundColor = colorconfig[15]
    document.getElementById("row1cell16").style.backgroundColor = colorconfig[15]}     

if(shapeconfig[16] == "circle"){
    document.getElementById("circlerow1cell17").style.backgroundColor = colorconfig[16]
    document.getElementById("row1cell17").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell17").style.backgroundColor = colorconfig[16]
    document.getElementById("row1cell17").style.backgroundColor = colorconfig[16]}     

if(shapeconfig[17] == "circle"){
    document.getElementById("circlerow1cell18").style.backgroundColor = colorconfig[17]
    document.getElementById("row1cell18").style.backgroundColor = "white"}else{
    document.getElementById("circlerow1cell18").style.backgroundColor = colorconfig[17]
    document.getElementById("row1cell18").style.backgroundColor = colorconfig[17]} 
    
    

// row 2

if(shapeconfig[18] == "circle"){
document.getElementById("circlerow2cell01").style.backgroundColor = colorconfig[18]
document.getElementById("row2cell01").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell01").style.backgroundColor = colorconfig[18]
document.getElementById("row2cell01").style.backgroundColor = colorconfig[18]}     

if(shapeconfig[19] == "circle"){
document.getElementById("circlerow2cell02").style.backgroundColor = colorconfig[19]
document.getElementById("row2cell02").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell02").style.backgroundColor = colorconfig[19]
document.getElementById("row2cell02").style.backgroundColor = colorconfig[19]}     

if(shapeconfig[20] == "circle"){
document.getElementById("circlerow2cell03").style.backgroundColor = colorconfig[20]
document.getElementById("row2cell03").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell03").style.backgroundColor = colorconfig[20]
document.getElementById("row2cell03").style.backgroundColor = colorconfig[20]}     

if(shapeconfig[21] == "circle"){
document.getElementById("circlerow2cell04").style.backgroundColor = colorconfig[21]
document.getElementById("row2cell04").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell04").style.backgroundColor = colorconfig[21]
document.getElementById("row2cell04").style.backgroundColor = colorconfig[21]}     

if(shapeconfig[22] == "circle"){
document.getElementById("circlerow2cell05").style.backgroundColor = colorconfig[22]
document.getElementById("row2cell05").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell05").style.backgroundColor = colorconfig[22]
document.getElementById("row2cell05").style.backgroundColor = colorconfig[22]}     

if(shapeconfig[23] == "circle"){
document.getElementById("circlerow2cell06").style.backgroundColor = colorconfig[23]
document.getElementById("row2cell06").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell06").style.backgroundColor = colorconfig[23]
document.getElementById("row2cell06").style.backgroundColor = colorconfig[23]}     

if(shapeconfig[24] == "circle"){
document.getElementById("circlerow2cell07").style.backgroundColor = colorconfig[24]
document.getElementById("row2cell07").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell07").style.backgroundColor = colorconfig[24]
document.getElementById("row2cell07").style.backgroundColor = colorconfig[24]}     

if(shapeconfig[25] == "circle"){
document.getElementById("circlerow2cell08").style.backgroundColor = colorconfig[25]
document.getElementById("row2cell08").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell08").style.backgroundColor = colorconfig[25]
document.getElementById("row2cell08").style.backgroundColor = colorconfig[25]}     

if(shapeconfig[26] == "circle"){
document.getElementById("circlerow2cell09").style.backgroundColor = colorconfig[26]
document.getElementById("row2cell09").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell09").style.backgroundColor = colorconfig[26]
document.getElementById("row2cell09").style.backgroundColor = colorconfig[26]}     

if(shapeconfig[27] == "circle"){
document.getElementById("circlerow2cell10").style.backgroundColor = colorconfig[27]
document.getElementById("row2cell10").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell10").style.backgroundColor = colorconfig[27]
document.getElementById("row2cell10").style.backgroundColor = colorconfig[27]}     

if(shapeconfig[28] == "circle"){
document.getElementById("circlerow2cell11").style.backgroundColor = colorconfig[28]
document.getElementById("row2cell11").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell11").style.backgroundColor = colorconfig[28]
document.getElementById("row2cell11").style.backgroundColor = colorconfig[28]}     

if(shapeconfig[29] == "circle"){
document.getElementById("circlerow2cell12").style.backgroundColor = colorconfig[29]
document.getElementById("row2cell12").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell12").style.backgroundColor = colorconfig[29]
document.getElementById("row2cell12").style.backgroundColor = colorconfig[29]}     

if(shapeconfig[30] == "circle"){
document.getElementById("circlerow2cell13").style.backgroundColor = colorconfig[30]
document.getElementById("row2cell13").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell13").style.backgroundColor = colorconfig[30]
document.getElementById("row2cell13").style.backgroundColor = colorconfig[30]}     

if(shapeconfig[31] == "circle"){
document.getElementById("circlerow2cell14").style.backgroundColor = colorconfig[31]
document.getElementById("row2cell14").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell14").style.backgroundColor = colorconfig[31]
document.getElementById("row2cell14").style.backgroundColor = colorconfig[31]}     

if(shapeconfig[32] == "circle"){
document.getElementById("circlerow2cell15").style.backgroundColor = colorconfig[32]
document.getElementById("row2cell15").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell15").style.backgroundColor = colorconfig[32]
document.getElementById("row2cell15").style.backgroundColor = colorconfig[32]}     

if(shapeconfig[33] == "circle"){
document.getElementById("circlerow2cell16").style.backgroundColor = colorconfig[33]
document.getElementById("row2cell16").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell16").style.backgroundColor = colorconfig[33]
document.getElementById("row2cell16").style.backgroundColor = colorconfig[33]}     

if(shapeconfig[34] == "circle"){
document.getElementById("circlerow2cell17").style.backgroundColor = colorconfig[34]
document.getElementById("row2cell17").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell17").style.backgroundColor = colorconfig[34]
document.getElementById("row2cell17").style.backgroundColor = colorconfig[34]}     

if(shapeconfig[35] == "circle"){
document.getElementById("circlerow2cell18").style.backgroundColor = colorconfig[35]
document.getElementById("row2cell18").style.backgroundColor = "white"}else{
document.getElementById("circlerow2cell18").style.backgroundColor = colorconfig[35]
document.getElementById("row2cell18").style.backgroundColor = colorconfig[35]} 

// row 3

if(shapeconfig[36] == "circle"){
document.getElementById("circlerow3cell01").style.backgroundColor = colorconfig[36]
document.getElementById("row3cell01").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell01").style.backgroundColor = colorconfig[36]
document.getElementById("row3cell01").style.backgroundColor = colorconfig[36]}     

if(shapeconfig[37] == "circle"){
document.getElementById("circlerow3cell02").style.backgroundColor = colorconfig[37]
document.getElementById("row3cell02").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell02").style.backgroundColor = colorconfig[37]
document.getElementById("row3cell02").style.backgroundColor = colorconfig[37]}     

if(shapeconfig[38] == "circle"){
document.getElementById("circlerow3cell03").style.backgroundColor = colorconfig[38]
document.getElementById("row3cell03").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell03").style.backgroundColor = colorconfig[38]
document.getElementById("row3cell03").style.backgroundColor = colorconfig[38]}     

if(shapeconfig[39] == "circle"){
document.getElementById("circlerow3cell04").style.backgroundColor = colorconfig[39]
document.getElementById("row3cell04").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell04").style.backgroundColor = colorconfig[39]
document.getElementById("row3cell04").style.backgroundColor = colorconfig[39]}     

if(shapeconfig[40] == "circle"){
document.getElementById("circlerow3cell05").style.backgroundColor = colorconfig[40]
document.getElementById("row3cell05").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell05").style.backgroundColor = colorconfig[40]
document.getElementById("row3cell05").style.backgroundColor = colorconfig[40]}     

if(shapeconfig[41] == "circle"){
document.getElementById("circlerow3cell06").style.backgroundColor = colorconfig[41]
document.getElementById("row3cell06").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell06").style.backgroundColor = colorconfig[41]
document.getElementById("row3cell06").style.backgroundColor = colorconfig[41]}     

if(shapeconfig[42] == "circle"){
document.getElementById("circlerow3cell07").style.backgroundColor = colorconfig[42]
document.getElementById("row3cell07").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell07").style.backgroundColor = colorconfig[42]
document.getElementById("row3cell07").style.backgroundColor = colorconfig[42]}     

if(shapeconfig[43] == "circle"){
document.getElementById("circlerow3cell08").style.backgroundColor = colorconfig[43]
document.getElementById("row3cell08").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell08").style.backgroundColor = colorconfig[43]
document.getElementById("row3cell08").style.backgroundColor = colorconfig[43]}     

if(shapeconfig[44] == "circle"){
document.getElementById("circlerow3cell09").style.backgroundColor = colorconfig[44]
document.getElementById("row3cell09").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell09").style.backgroundColor = colorconfig[44]
document.getElementById("row3cell09").style.backgroundColor = colorconfig[44]}     

if(shapeconfig[45] == "circle"){
document.getElementById("circlerow3cell10").style.backgroundColor = colorconfig[45]
document.getElementById("row3cell10").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell10").style.backgroundColor = colorconfig[45]
document.getElementById("row3cell10").style.backgroundColor = colorconfig[45]}     

if(shapeconfig[46] == "circle"){
document.getElementById("circlerow3cell11").style.backgroundColor = colorconfig[46]
document.getElementById("row3cell11").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell11").style.backgroundColor = colorconfig[46]
document.getElementById("row3cell11").style.backgroundColor = colorconfig[46]}     

if(shapeconfig[47] == "circle"){
document.getElementById("circlerow3cell12").style.backgroundColor = colorconfig[47]
document.getElementById("row3cell12").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell12").style.backgroundColor = colorconfig[47]
document.getElementById("row3cell12").style.backgroundColor = colorconfig[47]}     

if(shapeconfig[48] == "circle"){
document.getElementById("circlerow3cell13").style.backgroundColor = colorconfig[48]
document.getElementById("row3cell13").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell13").style.backgroundColor = colorconfig[48]
document.getElementById("row3cell13").style.backgroundColor = colorconfig[48]}     

if(shapeconfig[49] == "circle"){
document.getElementById("circlerow3cell14").style.backgroundColor = colorconfig[49]
document.getElementById("row3cell14").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell14").style.backgroundColor = colorconfig[49]
document.getElementById("row3cell14").style.backgroundColor = colorconfig[49]}     

if(shapeconfig[50] == "circle"){
document.getElementById("circlerow3cell15").style.backgroundColor = colorconfig[50]
document.getElementById("row3cell15").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell15").style.backgroundColor = colorconfig[50]
document.getElementById("row3cell15").style.backgroundColor = colorconfig[50]}     

if(shapeconfig[51] == "circle"){
document.getElementById("circlerow3cell16").style.backgroundColor = colorconfig[51]
document.getElementById("row3cell16").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell16").style.backgroundColor = colorconfig[51]
document.getElementById("row3cell16").style.backgroundColor = colorconfig[51]}     

if(shapeconfig[52] == "circle"){
document.getElementById("circlerow3cell17").style.backgroundColor = colorconfig[52]
document.getElementById("row3cell17").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell17").style.backgroundColor = colorconfig[52]
document.getElementById("row3cell17").style.backgroundColor = colorconfig[52]}     

if(shapeconfig[53] == "circle"){
document.getElementById("circlerow3cell18").style.backgroundColor = colorconfig[53]
document.getElementById("row3cell18").style.backgroundColor = "white"}else{
document.getElementById("circlerow3cell18").style.backgroundColor = colorconfig[53]
document.getElementById("row3cell18").style.backgroundColor = colorconfig[53]} 

// row4

if(shapeconfig[54] == "circle"){
document.getElementById("circlerow4cell01").style.backgroundColor = colorconfig[54]
document.getElementById("row4cell01").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell01").style.backgroundColor = colorconfig[54]
document.getElementById("row4cell01").style.backgroundColor = colorconfig[54]}     

if(shapeconfig[55] == "circle"){
document.getElementById("circlerow4cell02").style.backgroundColor = colorconfig[55]
document.getElementById("row4cell02").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell02").style.backgroundColor = colorconfig[55]
document.getElementById("row4cell02").style.backgroundColor = colorconfig[55]}     

if(shapeconfig[56] == "circle"){
document.getElementById("circlerow4cell03").style.backgroundColor = colorconfig[56]
document.getElementById("row4cell03").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell03").style.backgroundColor = colorconfig[56]
document.getElementById("row4cell03").style.backgroundColor = colorconfig[56]}     

if(shapeconfig[57] == "circle"){
document.getElementById("circlerow4cell04").style.backgroundColor = colorconfig[57]
document.getElementById("row4cell04").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell04").style.backgroundColor = colorconfig[57]
document.getElementById("row4cell04").style.backgroundColor = colorconfig[57]}     

if(shapeconfig[58] == "circle"){
document.getElementById("circlerow4cell05").style.backgroundColor = colorconfig[58]
document.getElementById("row4cell05").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell05").style.backgroundColor = colorconfig[58]
document.getElementById("row4cell05").style.backgroundColor = colorconfig[58]}     

if(shapeconfig[59] == "circle"){
document.getElementById("circlerow4cell06").style.backgroundColor = colorconfig[59]
document.getElementById("row4cell06").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell06").style.backgroundColor = colorconfig[59]
document.getElementById("row4cell06").style.backgroundColor = colorconfig[59]}     

if(shapeconfig[60] == "circle"){
document.getElementById("circlerow4cell07").style.backgroundColor = colorconfig[60]
document.getElementById("row4cell07").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell07").style.backgroundColor = colorconfig[60]
document.getElementById("row4cell07").style.backgroundColor = colorconfig[60]}     

if(shapeconfig[61] == "circle"){
document.getElementById("circlerow4cell08").style.backgroundColor = colorconfig[61]
document.getElementById("row4cell08").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell08").style.backgroundColor = colorconfig[61]
document.getElementById("row4cell08").style.backgroundColor = colorconfig[61]}     

if(shapeconfig[62] == "circle"){
document.getElementById("circlerow4cell09").style.backgroundColor = colorconfig[62]
document.getElementById("row4cell09").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell09").style.backgroundColor = colorconfig[62]
document.getElementById("row4cell09").style.backgroundColor = colorconfig[62]}     

if(shapeconfig[63] == "circle"){
document.getElementById("circlerow4cell10").style.backgroundColor = colorconfig[63]
document.getElementById("row4cell10").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell10").style.backgroundColor = colorconfig[63]
document.getElementById("row4cell10").style.backgroundColor = colorconfig[63]}     

if(shapeconfig[64] == "circle"){
document.getElementById("circlerow4cell11").style.backgroundColor = colorconfig[64]
document.getElementById("row4cell11").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell11").style.backgroundColor = colorconfig[64]
document.getElementById("row4cell11").style.backgroundColor = colorconfig[64]}     

if(shapeconfig[65] == "circle"){
document.getElementById("circlerow4cell12").style.backgroundColor = colorconfig[65]
document.getElementById("row4cell12").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell12").style.backgroundColor = colorconfig[65]
document.getElementById("row4cell12").style.backgroundColor = colorconfig[65]}     

if(shapeconfig[66] == "circle"){
document.getElementById("circlerow4cell13").style.backgroundColor = colorconfig[66]
document.getElementById("row4cell13").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell13").style.backgroundColor = colorconfig[66]
document.getElementById("row4cell13").style.backgroundColor = colorconfig[66]}     

if(shapeconfig[67] == "circle"){
document.getElementById("circlerow4cell14").style.backgroundColor = colorconfig[67]
document.getElementById("row4cell14").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell14").style.backgroundColor = colorconfig[67]
document.getElementById("row4cell14").style.backgroundColor = colorconfig[67]}     

if(shapeconfig[68] == "circle"){
document.getElementById("circlerow4cell15").style.backgroundColor = colorconfig[68]
document.getElementById("row4cell15").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell15").style.backgroundColor = colorconfig[68]
document.getElementById("row4cell15").style.backgroundColor = colorconfig[68]}     

if(shapeconfig[69] == "circle"){
document.getElementById("circlerow4cell16").style.backgroundColor = colorconfig[69]
document.getElementById("row4cell16").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell16").style.backgroundColor = colorconfig[69]
document.getElementById("row4cell16").style.backgroundColor = colorconfig[69]}     

if(shapeconfig[70] == "circle"){
document.getElementById("circlerow4cell17").style.backgroundColor = colorconfig[70]
document.getElementById("row4cell17").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell17").style.backgroundColor = colorconfig[70]
document.getElementById("row4cell17").style.backgroundColor = colorconfig[70]}     

if(shapeconfig[71] == "circle"){
document.getElementById("circlerow4cell18").style.backgroundColor = colorconfig[71]
document.getElementById("row4cell18").style.backgroundColor = "white"}else{
document.getElementById("circlerow4cell18").style.backgroundColor = colorconfig[71]
document.getElementById("row4cell18").style.backgroundColor = colorconfig[71]} 

// row5
if(shapeconfig[72] == "circle"){
document.getElementById("circlerow5cell01").style.backgroundColor = colorconfig[72]
document.getElementById("row5cell01").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell01").style.backgroundColor = colorconfig[72]
document.getElementById("row5cell01").style.backgroundColor = colorconfig[72]}     

if(shapeconfig[73] == "circle"){
document.getElementById("circlerow5cell02").style.backgroundColor = colorconfig[73]
document.getElementById("row5cell02").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell02").style.backgroundColor = colorconfig[73]
document.getElementById("row5cell02").style.backgroundColor = colorconfig[73]}     

if(shapeconfig[74] == "circle"){
document.getElementById("circlerow5cell03").style.backgroundColor = colorconfig[74]
document.getElementById("row5cell03").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell03").style.backgroundColor = colorconfig[74]
document.getElementById("row5cell03").style.backgroundColor = colorconfig[74]}     

if(shapeconfig[75] == "circle"){
document.getElementById("circlerow5cell04").style.backgroundColor = colorconfig[75]
document.getElementById("row5cell04").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell04").style.backgroundColor = colorconfig[75]
document.getElementById("row5cell04").style.backgroundColor = colorconfig[75]}     

if(shapeconfig[76] == "circle"){
document.getElementById("circlerow5cell05").style.backgroundColor = colorconfig[76]
document.getElementById("row5cell05").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell05").style.backgroundColor = colorconfig[76]
document.getElementById("row5cell05").style.backgroundColor = colorconfig[76]}     

if(shapeconfig[77] == "circle"){
document.getElementById("circlerow5cell06").style.backgroundColor = colorconfig[77]
document.getElementById("row5cell06").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell06").style.backgroundColor = colorconfig[77]
document.getElementById("row5cell06").style.backgroundColor = colorconfig[77]}     

if(shapeconfig[78] == "circle"){
document.getElementById("circlerow5cell07").style.backgroundColor = colorconfig[78]
document.getElementById("row5cell07").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell07").style.backgroundColor = colorconfig[78]
document.getElementById("row5cell07").style.backgroundColor = colorconfig[78]}     

if(shapeconfig[79] == "circle"){
document.getElementById("circlerow5cell08").style.backgroundColor = colorconfig[79]
document.getElementById("row5cell08").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell08").style.backgroundColor = colorconfig[79]
document.getElementById("row5cell08").style.backgroundColor = colorconfig[79]}     

if(shapeconfig[80] == "circle"){
document.getElementById("circlerow5cell09").style.backgroundColor = colorconfig[80]
document.getElementById("row5cell09").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell09").style.backgroundColor = colorconfig[80]
document.getElementById("row5cell09").style.backgroundColor = colorconfig[80]}     

if(shapeconfig[81] == "circle"){
document.getElementById("circlerow5cell10").style.backgroundColor = colorconfig[81]
document.getElementById("row5cell10").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell10").style.backgroundColor = colorconfig[81]
document.getElementById("row5cell10").style.backgroundColor = colorconfig[81]}     

if(shapeconfig[82] == "circle"){
document.getElementById("circlerow5cell11").style.backgroundColor = colorconfig[82]
document.getElementById("row5cell11").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell11").style.backgroundColor = colorconfig[82]
document.getElementById("row5cell11").style.backgroundColor = colorconfig[82]}     

if(shapeconfig[83] == "circle"){
document.getElementById("circlerow5cell12").style.backgroundColor = colorconfig[83]
document.getElementById("row5cell12").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell12").style.backgroundColor = colorconfig[83]
document.getElementById("row5cell12").style.backgroundColor = colorconfig[83]}     

if(shapeconfig[84] == "circle"){
document.getElementById("circlerow5cell13").style.backgroundColor = colorconfig[84]
document.getElementById("row5cell13").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell13").style.backgroundColor = colorconfig[84]
document.getElementById("row5cell13").style.backgroundColor = colorconfig[84]}     

if(shapeconfig[85] == "circle"){
document.getElementById("circlerow5cell14").style.backgroundColor = colorconfig[85]
document.getElementById("row5cell14").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell14").style.backgroundColor = colorconfig[85]
document.getElementById("row5cell14").style.backgroundColor = colorconfig[85]}     

if(shapeconfig[86] == "circle"){
document.getElementById("circlerow5cell15").style.backgroundColor = colorconfig[86]
document.getElementById("row5cell15").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell15").style.backgroundColor = colorconfig[86]
document.getElementById("row5cell15").style.backgroundColor = colorconfig[86]}     

if(shapeconfig[87] == "circle"){
document.getElementById("circlerow5cell16").style.backgroundColor = colorconfig[87]
document.getElementById("row5cell16").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell16").style.backgroundColor = colorconfig[87]
document.getElementById("row5cell16").style.backgroundColor = colorconfig[87]}     

if(shapeconfig[88] == "circle"){
document.getElementById("circlerow5cell17").style.backgroundColor = colorconfig[88]
document.getElementById("row5cell17").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell17").style.backgroundColor = colorconfig[88]
document.getElementById("row5cell17").style.backgroundColor = colorconfig[88]}     

if(shapeconfig[89] == "circle"){
document.getElementById("circlerow5cell18").style.backgroundColor = colorconfig[89]
document.getElementById("row5cell18").style.backgroundColor = "white"}else{
document.getElementById("circlerow5cell18").style.backgroundColor = colorconfig[89]
document.getElementById("row5cell18").style.backgroundColor = colorconfig[89]} 

// row6
if(shapeconfig[90] == "circle"){
document.getElementById("circlerow6cell01").style.backgroundColor = colorconfig[90]
document.getElementById("row6cell01").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell01").style.backgroundColor = colorconfig[90]
document.getElementById("row6cell01").style.backgroundColor = colorconfig[90]}     

if(shapeconfig[91] == "circle"){
document.getElementById("circlerow6cell02").style.backgroundColor = colorconfig[91]
document.getElementById("row6cell02").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell02").style.backgroundColor = colorconfig[91]
document.getElementById("row6cell02").style.backgroundColor = colorconfig[91]}     

if(shapeconfig[92] == "circle"){
document.getElementById("circlerow6cell03").style.backgroundColor = colorconfig[92]
document.getElementById("row6cell03").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell03").style.backgroundColor = colorconfig[92]
document.getElementById("row6cell03").style.backgroundColor = colorconfig[92]}     

if(shapeconfig[93] == "circle"){
document.getElementById("circlerow6cell04").style.backgroundColor = colorconfig[93]
document.getElementById("row6cell04").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell04").style.backgroundColor = colorconfig[93]
document.getElementById("row6cell04").style.backgroundColor = colorconfig[93]}     

if(shapeconfig[94] == "circle"){
document.getElementById("circlerow6cell05").style.backgroundColor = colorconfig[94]
document.getElementById("row6cell05").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell05").style.backgroundColor = colorconfig[94]
document.getElementById("row6cell05").style.backgroundColor = colorconfig[94]}     

if(shapeconfig[95] == "circle"){
document.getElementById("circlerow6cell06").style.backgroundColor = colorconfig[95]
document.getElementById("row6cell06").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell06").style.backgroundColor = colorconfig[95]
document.getElementById("row6cell06").style.backgroundColor = colorconfig[95]}     

if(shapeconfig[96] == "circle"){
document.getElementById("circlerow6cell07").style.backgroundColor = colorconfig[96]
document.getElementById("row6cell07").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell07").style.backgroundColor = colorconfig[96]
document.getElementById("row6cell07").style.backgroundColor = colorconfig[96]}     

if(shapeconfig[97] == "circle"){
document.getElementById("circlerow6cell08").style.backgroundColor = colorconfig[97]
document.getElementById("row6cell08").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell08").style.backgroundColor = colorconfig[97]
document.getElementById("row6cell08").style.backgroundColor = colorconfig[97]}     

if(shapeconfig[98] == "circle"){
document.getElementById("circlerow6cell09").style.backgroundColor = colorconfig[98]
document.getElementById("row6cell09").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell09").style.backgroundColor = colorconfig[98]
document.getElementById("row6cell09").style.backgroundColor = colorconfig[98]}     

if(shapeconfig[99] == "circle"){
document.getElementById("circlerow6cell10").style.backgroundColor = colorconfig[99]
document.getElementById("row6cell10").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell10").style.backgroundColor = colorconfig[99]
document.getElementById("row6cell10").style.backgroundColor = colorconfig[99]}     

if(shapeconfig[100] == "circle"){
document.getElementById("circlerow6cell11").style.backgroundColor = colorconfig[100]
document.getElementById("row6cell11").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell11").style.backgroundColor = colorconfig[100]
document.getElementById("row6cell11").style.backgroundColor = colorconfig[100]}     

if(shapeconfig[101] == "circle"){
document.getElementById("circlerow6cell12").style.backgroundColor = colorconfig[101]
document.getElementById("row6cell12").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell12").style.backgroundColor = colorconfig[101]
document.getElementById("row6cell12").style.backgroundColor = colorconfig[101]}     

if(shapeconfig[102] == "circle"){
document.getElementById("circlerow6cell13").style.backgroundColor = colorconfig[102]
document.getElementById("row6cell13").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell13").style.backgroundColor = colorconfig[102]
document.getElementById("row6cell13").style.backgroundColor = colorconfig[102]}     

if(shapeconfig[103] == "circle"){
document.getElementById("circlerow6cell14").style.backgroundColor = colorconfig[103]
document.getElementById("row6cell14").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell14").style.backgroundColor = colorconfig[103]
document.getElementById("row6cell14").style.backgroundColor = colorconfig[103]}     

if(shapeconfig[104] == "circle"){
document.getElementById("circlerow6cell15").style.backgroundColor = colorconfig[104]
document.getElementById("row6cell15").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell15").style.backgroundColor = colorconfig[104]
document.getElementById("row6cell15").style.backgroundColor = colorconfig[104]}     

if(shapeconfig[105] == "circle"){
document.getElementById("circlerow6cell16").style.backgroundColor = colorconfig[105]
document.getElementById("row6cell16").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell16").style.backgroundColor = colorconfig[105]
document.getElementById("row6cell16").style.backgroundColor = colorconfig[105]}     

if(shapeconfig[106] == "circle"){
document.getElementById("circlerow6cell17").style.backgroundColor = colorconfig[106]
document.getElementById("row6cell17").style.backgroundColor = "white"}else{
document.getElementById("circlerow6cell17").style.backgroundColor = colorconfig[106]
document.getElementById("row6cell17").style.backgroundColor = colorconfig[106]}     

if(shapeconfig[107] == "circle"){
document.getElementById("circlerow6cell18").style.backgroundColor = colorconfig[107]
document.getElementById("row6cell18").style.backgroundColor = "white"}else{
    //console.log("circle")
document.getElementById("circlerow6cell18").style.backgroundColor = colorconfig[107]
document.getElementById("row6cell18").style.backgroundColor = colorconfig[107]} 


};