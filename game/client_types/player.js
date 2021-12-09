/**
 * # Player type implementation of the game stages
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Bid is valid if it is a number between 0 and 100.
        this.isValidBid = function(n) {
            return node.JSUS.isInt(n, -1, 101);
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();


        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);

        //this.visualTimer = node.widgets.append('VisualTimer', header);

        this.doneButton = node.widgets.append('DoneButton', header);

        this.inArrayCaseInsensitive = function(needle, haystackArray){
            //Iterates over an array of items to return the index of the first item that matches the provided val ('needle') in a case-insensitive way.  Returns -1 if no match found.
            var defaultResult = false;
            var result = defaultResult;
            var i;
            for(i = 0; i<haystackArray.length; i++){
                if (result == defaultResult && haystackArray[i].toLowerCase() == needle.toLowerCase()) {
                    result = true;
                }
            }
            return result;
        }

        this.positions = ["A1", "A2", "B1", "B2", "C1", "C2"]
        this.colors = ["red", "blue", "green", "white", "pink", "LightBlue", "LightGreen"] // possible colors: white is used when there is no "block"
        this.shape = ["square", "circle"]

        this.yesno = ["yes", "no"]

        // set initial configuration of the 27 cells - 9 in each row. 12 colored and 15 white

        // may need to have a separate config array for circles and squares?

        this.currentConfiguration = [this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room A - top row
                                    this.colors[3],this.colors[3],this.colors[3], this.colors[3], // room B - top row
                                    this.colors[5],this.colors[3],this.colors[3],this.colors[3], // room C - top row
                                    this.colors[2],this.colors[3],this.colors[3],this.colors[3], //room A - mid row
                                    this.colors[4],this.colors[1],this.colors[3],this.colors[0], // room B - mid row
                                    this.colors[5],this.colors[3],this.colors[4],this.colors[6], // room C - mid row
                                    this.colors[1],this.colors[4],this.colors[6], this.colors[3], // room A - bottom row
                                    this.colors[2],this.colors[0],this.colors[3],this.colors[5], // room B - bottom row
                                    this.colors[6],this.colors[1],this.colors[2],this.colors[0]] // room C - bottom row

        // shape is square by default, and circular otherwise 
        // logic is that if shape is "circle" then circle is updated and square is set to white or vice versa                        
        
        this.currentShape = [this.shape[0],this.shape[0],this.shape[0],this.shape[0], // room A - top row
                                    this.shape[0],this.shape[0],this.shape[0], this.shape[0], // room B - top row
                                    this.shape[1],this.shape[0],this.shape[0],this.shape[0], // room C - top row
                                    this.shape[0],this.shape[0],this.shape[0],this.shape[0], //room A - mid row
                                    this.shape[1],this.shape[0],this.shape[0],this.shape[0], // room B - mid row
                                    this.shape[1],this.shape[0],this.shape[1],this.shape[1], // room C - mid row
                                    this.shape[0],this.shape[1],this.shape[1], this.shape[0], // room A - bottom row
                                    this.shape[0],this.shape[0],this.shape[0],this.shape[1], // room B - bottom row
                                    this.shape[0],this.shape[0],this.shape[0],this.shape[0]]                            
        // create a "current" array that is disconnected to the original configuration                            
        this.initialConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));                            

        // set goal configuration and verbal goal
        // get a random color and room
        const random_color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const random_room = this.positions[Math.floor(Math.random() * this.positions.length)];
        // this.shapeColor = random_color;
        // this.goalRoom = random_room;
        this.shapeColor = 'red';
        this.goalRoom = 'A1';
        this.goalColorRoom = random_color + " " + random_room;
        this.isGoalConfiguration = false;
        this.numberOfArchitectMoves = 0;
        this.numberOfHelperMoves = 0;


        // this.colors = ["red", "blue", "green", "white", "pink", "LightBlue", "LightGreen"] // possible colors: white is used when there is no "block"
        //This is so that placement is only allowed for the lowest avaiable row for the given room

        //for goal configuration only certain placements are allowed as the goal confiugariton can be acheived multiple ways

        this.goalCheck = function (currentConfig, indexes, colorRoom) {
            console.log("Checking Goal")
            const colorRoomSplit = colorRoom.split(" ");
            const color = colorRoomSplit[0]
            const room = colorRoomSplit[1]
            let numberOfColoredBlocksInRoom = 0
            debugger;
            for (let i = 0; i < indexes.length; i++) {
                if (currentConfig[indexes[i]] == color) {
                    numberOfColoredBlocksInRoom = numberOfColoredBlocksInRoom + 1;
                }
                if (numberOfColoredBlocksInRoom == 3) {
                    node.say('END_GAME', 'SERVER', true);
                    console.log("goalReached");
                }
            }
        };
        //check goal using the above index 
        this.goalsSwitchCase = function (currentConfig, color, room) {
            const A1Indexes = [0, 1, 12, 13, 24, 25]
            const A2Indexes = [2, 3, 14, 15, 26, 27]
            const B1ndexes = [4, 5, 16, 17, 28, 29]
            const B2Indexes = [6, 7, 18, 19, 30, 31]
            const C1ndexes = [8, 9, 20, 21, 32, 33]
            const C2ndexes = [10, 11, 22, 23, 34, 35]
            const colorRoom = color + " " + room
            console.log("Checking Goal")
            debugger;
            switch (colorRoom) {
                case "red A1":
                    console.log("Color Room")
                    console.log(colorRoom);
                    this.goalCheck(currentConfig, A1Indexes, colorRoom);
                    // code block
                    break;
                case "red A2":
                    // code block
                    break;
                case "red B1":
                    // code block
                    break;
                case "red B2":
                    // code block
                    break;
                case "red C1":
                    // code block
                    break;
                case "red C2":
                    // code block
                    break;
                case "blue A1":
                    // code block
                    break;
                case "blue A2":
                    // code block
                    break;
                case "blue B1":
                    // code block
                    break;
                case "blue B2":
                    // code block
                    break;
                case "blue C1":
                    // code block
                    break;
                case "blue C2":
                    // code block
                    break;
                case "green A1":
                    // code block
                    break;
                case "green A2":
                    // code block
                    break;
                case "green B1":
                    // code block
                    break;
                case "green B2":
                    // code block
                    break;
                case "green C1":
                    // code block
                    break;
                case "green C2":
                    // code block
                    break;
                case "pink A1":
                    // code block
                    break;
                case "pink A2":
                    // code block
                    break;
                case "pink B1":
                    // code block
                    break;
                case "pink B2":
                    // code block
                    break;
                case "pink C1":
                    // code block
                    break;
                case "pink C2":
                    // code block
                    break;
                case "LightBlue A1":
                    // code block
                    break;
                case "LightBlue A2":
                    // code block
                    break;
                case "LightBlue B1":
                    // code block
                    break;
                case "LightBlue B2":
                    // code block
                    break;
                case "LightBlue C1":
                    // code block
                    break;
                case "LightBlue C2":
                    // code block
                    break;
                case "LightGreen A1":
                    // code block
                    break;
                case "LightGreen A2":
                    // code block
                    break;
                case "LightGreen B1":
                    // code block
                    break;
                case "LightGreen B2":
                    // code block
                    break;
                case "LightGreen C1":
                    // code block
                    break;
                case "LightGreen C2":
                    // code block
                    break;

                default:
                // code block
            }
        };

        this.redToA1 = [this.colors[0], this.colors[0], this.colors[3], this.colors[3], // room A - top row
        this.colors[1], this.colors[3], this.colors[3], this.colors[3], // room B - top row
        this.colors[5], this.colors[3], this.colors[6], this.colors[3], // room C - top row
        this.colors[2], this.colors[0], this.colors[3], this.colors[3], //room A - mid row
        this.colors[4], this.colors[3], this.colors[3], this.colors[3], // room B - mid row
        this.colors[5], this.colors[3], this.colors[4], this.colors[3], // room C - mid row
        this.colors[1], this.colors[4], this.colors[6], this.colors[3], // room A - bottom row
        this.colors[2], this.colors[3], this.colors[3], this.colors[5], // room B - bottom row
        this.colors[6], this.colors[1], this.colors[2], this.colors[3]] // room C - bottom row    

        //set up manually for one run through of the game
        this.verbalGoal = "Move all " + 'Red' + " blocks to room " + "A1";
        // this.verbalGoal = "Move all " + random_color + " blocks to room "+ random_room
        // this.goalConfiguration = [this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room A - top row
        //                             this.colors[3],this.colors[3],this.colors[3], this.colors[3], // room B - top row
        //                             this.colors[5],this.colors[3],this.colors[3],this.colors[3], // room C - top row
        //                             this.colors[2],this.colors[3],this.colors[3],this.colors[3], //room A - mid row
        //                             this.colors[3],this.colors[1],this.colors[3],this.colors[0], // room B - mid row
        //                             this.colors[5],this.colors[3],this.colors[4],this.colors[6], // room C - mid row
        //                             this.colors[1],this.colors[4],this.colors[6], this.colors[4], // room A - bottom row
        //                             this.colors[2],this.colors[0],this.colors[3],this.colors[5], // room B - bottom row
        //                             this.colors[6],this.colors[1],this.colors[2],this.colors[0]] // room C - bottom row                   
        this.goalConfiguration = this.redToA1;
       
        this.cluespast = [];


        this.roundCounter = 0;//iterated value to move through the word pairs
        this.smallRoundCounter = 0;//iterated value to record the 3 trials for each word pair
        this.pairnumber = 33;//the number of pairs in the total experiment, should be 57
        this.pracpairnumber=3;
        this.optionTimeArray = [0];
        this.id;
        this.randomCode;
        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver


    });

    stager.extendStep('consent', {
        frame: 'consent.htm',
        donebutton: false,
        cb: function(){
            var a = W.gid('agree');
            a.onclick = function() { node.game.doneButton.enable() };
       }
    });

    stager.extendStep('idGet', {
        frame: 'idGet.htm',
        cb: function(){
            this.randomCode = Math.floor(Math.random() * 90000) + 10000;

            this.idWid = node.widgets.append('CustomInput', W.gid('container'), {//apend customInput widget with 1 mandatory input
               id: 'clueGive',
               //mainText: 'What is your final clue?',
               type: 'int',
               className: 'centered',
               //root: 'cbrd',
               requiredChoice: true
           });
       },
        done: function() {//send clue to other player and clue and time info to database
            this.id = this.idWid.getValues().value;
            return;
        }
    });

    stager.extendStep('instructions', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            //Helper
            CLUEGIVER:{
                frame: 'instructionsCG.htm',
            },
            //Architect
            GUESSER:{
                frame: 'instructions.htm',
                cb: function(){
                    W.setInnerHTML('containerbottom2', '<p>Your goal is to: '+ this.verbalGoal)
                }
            }
        }
    });

    stager.extendStep('helperOptionsprac', {
        role: function() { return this.role; },//This code is repeated to maintain roles throughout steps of experiment
        partner: function() { return this.partner; },

        roles: {
            //helper side blocks are not updating, architect side are updating 
            CLUEGIVER:{
                frame: 'helperChoice.htm',
                donebutton: true,
                cb: function() {
                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]
               
                // var dragid = 0;
                var config = this.currentConfiguration;
                var dragid = 0;
                var dropid = 0;
                var total = 0;
                var dragtarget = W.getElementById("blocks");
                // not all items should be "draggable" in the table
                // we could check for whether there is anything non-white above a particular index
                dragtarget.addEventListener('dragstart', dragStart);

                // code for modifying drag target

                function reduceDragArray(indexArray, configArray) {
                    var newArr = indexArray.reduce(function(a, e, i) {
                    // only push if cell is non-white
                    if(configArray[e] !=="white"){
                            // if the index is not in the first row
                        if (e > 11){
                            // if the element on top is white, then it's draggable
                            if(configArray[e-12] === "white"){a.push(e);}
                        }
                        else {
                            a.push(e);
                        }
                    }                     
                    return a;
                    }, []);
                    return newArr
                }
                
                var fulldragindices= Array(this.currentConfiguration.length).fill().map((x,i)=>i)
                console.log("fulldragindices ="+fulldragindices);
                var validDragargets = reduceDragArray(fulldragindices, this.currentConfiguration)
                
                console.log("validDragargets ="+validDragargets);

                // convert to table cell IDs

                var filteredDragTableIDs = validDragargets.map(x => {
                    if (x < 9){
                        return "row1" + "cell0"+ (x + 1) ;
                    }
                    else if (x < 12){
                        return "row1" + "cell"+ (x + 1) ;
                    }else if(x < 24){
                        var val = (x-12)+1
                        if(val < 10){return "row2" + "cell0"+ ((x-12)+1);}
                        else{return "row2" + "cell"+ ((x-12)+1);}
                    }
                    else{
                        var val = (x-24)+1
                        if(val < 10){return "row3" + "cell0"+ ((x-24)+1);}
                        else{return "row3" + "cell"+ ((x-24)+1);}
                    }
                })

                console.log("filteredDragTableIDs ="+filteredDragTableIDs);
                
                // code for modifying drop targets

                var droptarget = W.getElementById("blocks"); 
                // need to make this only some specific drag choices
                // could try to filter for only "white" cells

                var filtereddropIndices = this.currentConfiguration.reduce(function(a, e, i) {
                    if (e === 'white')
                        a.push(i);
                    return a;
                }, []);
                console.log("filtered table indices="+filtereddropIndices);

                // ultimately we want to further restrict this to only white cells that
                // have something non-white below them, but for now 

                // logic for more filtering: if the color of the cell at the bottom is white too then exclude
                // x+12

                function reduceDropArray(indexArray, configArray) {
                    var newArr = indexArray.reduce(function(a, e, i) {
                    if (e-12 < 36){
                        if(configArray[e+12] !== "white"){a.push(e);}
                    }
                    else{a.push(e);}    
                    return a;
                }, []);
                return newArr
                }

             var validWhiteBoxes = reduceDropArray(filtereddropIndices, this.currentConfiguration) 
                

             console.log("validWhiteBoxes="+validWhiteBoxes);


                var filteredDropTableIDs = validWhiteBoxes.map(x => {
                    if (x < 9){
                        return "row1" + "cell0"+ (x + 1) ;
                    }
                    else if (x < 12){
                        return "row1" + "cell"+ (x + 1) ;
                    }else if(x < 24){
                        var val = (x-12)+1
                        if(val < 10){return "row2" + "cell0"+ ((x-12)+1);}
                        else{return "row2" + "cell"+ ((x-12)+1);}
                    }
                    else{
                        var val = (x-24)+1
                        if(val < 10){return "row3" + "cell0"+ ((x-24)+1);}
                        else{return "row3" + "cell"+ ((x-24)+1);}
                    }
                })

                console.log("filtered table IDS="+filteredDropTableIDs);

                // we restrict dropping to these "white" cells only

                droptarget.addEventListener('dragenter', dragEnter)
                droptarget.addEventListener('dragover', dragOver);
                droptarget.addEventListener('dragleave', dragLeave);
                droptarget.addEventListener('drop', drop);

                    function dragStart(e) {
                        if(filteredDragTableIDs.includes(e.target.id)){
                        console.log('drag starts...');
                        e.dataTransfer.setData('text/plain', e.target.id);
                        setTimeout(() => {
                            e.target.classList.add('hide');
                        }, 0);

                        }
                        }
                    function dragEnter(e) {
                        
                        if(filteredDropTableIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                        }
                    }

                    function dragOver(e) {

                        if(filteredDropTableIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                        }
                    }

                    function dragLeave(e) {
                        if(filteredDropTableIDs.includes(e.target.id)){
                        e.target.classList.remove('drag-over');
                        }
                    }
                    function drop(e) {

                        if(filteredDropTableIDs.includes(e.target.id)){
                        
                        e.target.classList.remove('drag-over');
                        // get the draggable element
                        const id = e.dataTransfer.getData('text/plain');
                        const draggable = W.getElementById(id);
                        dragid = id;
                        dropid = JSON.parse(JSON.stringify(e.target.id));
                        console.log("dragid="+dragid);
                        console.log("dropid="+dropid);
                        // add it to the drop target
                        e.target.appendChild(draggable);
                    
                        // display the draggable element
                        draggable.classList.remove('hide');
                        // call the function that records these move IDs
                        setTotalValue();
                        }
                        
                    }                

                function setTotalValue(){

                // if it gets into this function, it will change the drag and dropids and value of total
                
                total = "move a block from " + dragid + " to " + dropid;
                console.log("inside total = "+total)
                
                node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    player: node.player.id,
                    stage: node.game.getCurrentGameStage(),
                    Guess1: total
                }); 
                node.game.memory.tag("GUESS");

                var choice = total.substr(total.length - 24); 
                var choiceMove = choice.split(" to ");
                // now moveChoice contains "row1cell01" and "row2cell02"
                
                var choiceMove_from = choiceMove[0];

                var toMove = choiceMove[1];//this.positions[moveChoice[1]]

                var from_row = Number(choiceMove_from.charAt(3));// rowX
                var from_cell = Number(choiceMove_from.substr(choiceMove_from.length - 2));// rowXcellXY
                
 
                var to_row= Number(toMove.charAt(3)); // rowX
                var to_cell = Number(toMove.substr(toMove.length - 2));// rowXcellXY

                W.setInnerHTML('cluepast', "row " + from_row  + " cell " + from_cell+  " to row " + to_row+ " cell "+ to_cell);

                // once we have the row/cell to/from, we change the current configuration of those specific cell
                
                // for each row increment, there is a +12 in index
                // for each cell increment, there is +1 in index
                // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27


                var fromIndex = (from_row-1)*12 + (from_cell-1);
                var toIndex = (to_row-1)*12 + (to_cell-1);
                config[toIndex] = config[fromIndex];
                // and moveFromID becomes white
                config[fromIndex] = "white";
                }

                // called when no action is taken

                node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    player: node.player.id,
                    stage: node.game.getCurrentGameStage(),
                    Guess1: total
                }); 
                      
                node.game.memory.tag("GUESS");

                W.setInnerHTML('clue2', "You are the Helper. Please move a block OR choose whether you want to ask the architect a yes/no question or pass." ),
                
                this.answerCounter = 0;

                // player could also choose to ask a question or pass
                // in which case we need a different event listener

                var el = W.getElementById("gbrd");


                this.clicker2 = function (e){//event listener that receives two words and then ends the step
                    var target = e.target;
                    //var myDiv = W.getElementById("alist");
                    if(target.className.match("button button2")){
        
                        //myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML;
                        node.say('GUESS', node.game.partner, target.innerHTML);
                        node.set({GUESS_1_FINAL : target.innerHTML});
                        node.set({GUESS_1_FINAL_TIME : node.timer.getTimeSince('step')})
                        node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                            player: node.player.id,
                            stage: node.game.getCurrentGameStage(),
                            Guess1: target.innerHTML
                        }); 
                        node.game.memory.tag("GUESS");//tag this memory for easy access later
                        el.removeEventListener('click', this.clicker2);
                        node.done(); 
                }

                }
                el.addEventListener('click', this.clicker2);
                this.currentConfiguration = config;   
                },
                done: function() {
                    debugger;
                    if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                        this.isGoalConfiguration = true;
                        node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    }
                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;
                    node.say('GUESS', node.game.partner, choiceTXT);
                    return;
                }

            },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,//disable done button so they cannot proceed without their partner finishing
                frame: 'studyboard.htm',
                cb: function() {//set the board for the guesser
                    // debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    //     // node.say('END_GAME', 'SERVER', true);
                    // }
                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    W.getElementById("goalrow1cell01").style.backgroundColor = this.goalConfiguration[0]
                    W.getElementById("goalrow1cell02").style.backgroundColor = this.goalConfiguration[1]
                    W.getElementById("goalrow1cell03").style.backgroundColor = this.goalConfiguration[2]
                    W.getElementById("goalrow1cell04").style.backgroundColor = this.goalConfiguration[3]
                    W.getElementById("goalrow1cell05").style.backgroundColor = this.goalConfiguration[4]
                    W.getElementById("goalrow1cell06").style.backgroundColor = this.goalConfiguration[5]
                    W.getElementById("goalrow1cell07").style.backgroundColor = this.goalConfiguration[6]
                    W.getElementById("goalrow1cell08").style.backgroundColor = this.goalConfiguration[7]
                    W.getElementById("goalrow1cell09").style.backgroundColor = this.goalConfiguration[8]
                    W.getElementById("goalrow1cell10").style.backgroundColor = this.goalConfiguration[9]
                    W.getElementById("goalrow1cell11").style.backgroundColor = this.goalConfiguration[10]
                    W.getElementById("goalrow1cell12").style.backgroundColor = this.goalConfiguration[11]
                    
                    W.getElementById("goalrow2cell01").style.backgroundColor = this.goalConfiguration[12]
                    W.getElementById("goalrow2cell02").style.backgroundColor = this.goalConfiguration[13]
                    W.getElementById("goalrow2cell03").style.backgroundColor = this.goalConfiguration[14]
                    W.getElementById("goalrow2cell04").style.backgroundColor = this.goalConfiguration[15]
                    W.getElementById("goalrow2cell05").style.backgroundColor = this.goalConfiguration[16]
                    W.getElementById("goalrow2cell06").style.backgroundColor = this.goalConfiguration[17]
                    W.getElementById("goalrow2cell07").style.backgroundColor = this.goalConfiguration[18]
                    W.getElementById("goalrow2cell08").style.backgroundColor = this.goalConfiguration[19]
                    W.getElementById("goalrow2cell09").style.backgroundColor = this.goalConfiguration[20]
                    W.getElementById("goalrow2cell10").style.backgroundColor = this.goalConfiguration[21]
                    W.getElementById("goalrow2cell11").style.backgroundColor = this.goalConfiguration[22]
                    W.getElementById("goalrow2cell12").style.backgroundColor = this.goalConfiguration[23]
                    
                    W.getElementById("goalrow3cell01").style.backgroundColor = this.goalConfiguration[24]
                    W.getElementById("goalrow3cell02").style.backgroundColor = this.goalConfiguration[25]
                    //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("goalrow3cell03").style.backgroundColor = this.goalConfiguration[26]
                    W.getElementById("goalrow3cell04").style.backgroundColor = this.goalConfiguration[27]
                    W.getElementById("goalrow3cell05").style.backgroundColor = this.goalConfiguration[28]
                    W.getElementById("goalrow3cell06").style.backgroundColor = this.goalConfiguration[29]
                    W.getElementById("goalrow3cell07").style.backgroundColor = this.goalConfiguration[30]
                    W.getElementById("goalrow3cell08").style.backgroundColor = this.goalConfiguration[31]
                    W.getElementById("goalrow3cell09").style.backgroundColor = this.goalConfiguration[32]
                    W.getElementById("goalrow3cell10").style.backgroundColor = this.goalConfiguration[33]
                    W.getElementById("goalrow3cell11").style.backgroundColor = this.goalConfiguration[34]
                    W.getElementById("goalrow3cell12").style.backgroundColor = this.goalConfiguration[35]

                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                        W.setInnerHTML('helperChoice', "The helper has chosen to " + msg.data); 
                        this.cluespast.push(that.clueReceived);
                        node.done();
                    });
                    
                },
                done: function() {
                    // debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    // }
                    node.say('GUESS', node.game.partner);
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                    });
                    node.set({guesserID: this.id});
                    node.set({guesserRandCode: this.randomCode});
                    return;
                }
            }
        }
    });

    stager.extendStep('helperAction', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            //guesser is the cluegiver
            CLUEGIVER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                frame: 'feedbackCG.htm',
                cb: function() {
                    // debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    // }

                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]
                    
                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate
                    
                    //var myDiv = W.getElementById("cganswers");                    
                    if(["Ask a yes/no question"].includes(choiceTXT)){
                      //  myDiv.innerHTML = "You chose: " +choiceTXT;

                       this.clueGive2 = node.widgets.append('CustomInput', W.gid('containerbottom2'), {//apend customInput widget with 1 mandatory input
                       id: 'clueGive',
                       mainText: 'Enter your yes/no question here:',
                       type: 'text',
                       className: 'centered',
                       root: 'cbrd',
                       requiredChoice: true
                   });
                        
                    }
                    else{
                      node.done();
                    }
                
                },
                done: function() {//send clue to other player and clue and time info to database
                    // debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    // }
                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate

                    if(["Ask a yes/no question"].includes(choiceTXT)){

                    this.cluespast.push(this.clueGive2.getValues().value);
                    node.say('CLUE', node.game.partner, this.clueGive2.getValues().value);
                    }

                    else if(["Pass"].includes(choiceTXT)){
                    
                    this.cluespast.push("Pass");
                    node.say('CLUE', node.game.partner, "Pass");
                    }

                    else{

                        //extract values from "total" which is contained in guess1
                        // total = "move a block from " + dragid + " to " + dropid;
                    
                        
                        //var tofrom = this.movesToFrom2.getValues().forms['FROM'].choice + " MoveBlockTo " + this.movesToFrom2.getValues().forms['TO'].choice;
                        this.cluespast.push(choiceTXT);

                    node.say('CLUE', node.game.partner, choiceTXT);

                    }

                    // node.set({clueFinal : this.clueGive2.getValues().value});
                    // node.set({TBFinal : this.clueGive2.getValues().timeBegin});
                    // node.set({TEFinal : this.clueGive2.getValues().timeEnd});

                    return;
                }

            },
            //architect is the helper 
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,
                frame: 'studyboard.htm',
            
                cb: function() {
                    // debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    // }

                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
        
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]
                    
                    W.getElementById("goalrow1cell01").style.backgroundColor = this.goalConfiguration[0]
                    W.getElementById("goalrow1cell02").style.backgroundColor = this.goalConfiguration[1]
                    W.getElementById("goalrow1cell03").style.backgroundColor = this.goalConfiguration[2]
                    W.getElementById("goalrow1cell04").style.backgroundColor = this.goalConfiguration[3]
                    W.getElementById("goalrow1cell05").style.backgroundColor = this.goalConfiguration[4]
                    W.getElementById("goalrow1cell06").style.backgroundColor = this.goalConfiguration[5]
                    W.getElementById("goalrow1cell07").style.backgroundColor = this.goalConfiguration[6]
                    W.getElementById("goalrow1cell08").style.backgroundColor = this.goalConfiguration[7]
                    W.getElementById("goalrow1cell09").style.backgroundColor = this.goalConfiguration[8]
                    W.getElementById("goalrow1cell10").style.backgroundColor = this.goalConfiguration[9]
                    W.getElementById("goalrow1cell11").style.backgroundColor = this.goalConfiguration[10]
                    W.getElementById("goalrow1cell12").style.backgroundColor = this.goalConfiguration[11]
                    
                    W.getElementById("goalrow2cell01").style.backgroundColor = this.goalConfiguration[12]
                    W.getElementById("goalrow2cell02").style.backgroundColor = this.goalConfiguration[13]
                    W.getElementById("goalrow2cell03").style.backgroundColor = this.goalConfiguration[14]
                    W.getElementById("goalrow2cell04").style.backgroundColor = this.goalConfiguration[15]
                    W.getElementById("goalrow2cell05").style.backgroundColor = this.goalConfiguration[16]
                    W.getElementById("goalrow2cell06").style.backgroundColor = this.goalConfiguration[17]
                    W.getElementById("goalrow2cell07").style.backgroundColor = this.goalConfiguration[18]
                    W.getElementById("goalrow2cell08").style.backgroundColor = this.goalConfiguration[19]
                    W.getElementById("goalrow2cell09").style.backgroundColor = this.goalConfiguration[20]
                    W.getElementById("goalrow2cell10").style.backgroundColor = this.goalConfiguration[21]
                    W.getElementById("goalrow2cell11").style.backgroundColor = this.goalConfiguration[22]
                    W.getElementById("goalrow2cell12").style.backgroundColor = this.goalConfiguration[23]
                    
                    W.getElementById("goalrow3cell01").style.backgroundColor = this.goalConfiguration[24]
                    W.getElementById("goalrow3cell02").style.backgroundColor = this.goalConfiguration[25]
                    //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("goalrow3cell03").style.backgroundColor = this.goalConfiguration[26]
                    W.getElementById("goalrow3cell04").style.backgroundColor = this.goalConfiguration[27]
                    W.getElementById("goalrow3cell05").style.backgroundColor = this.goalConfiguration[28]
                    W.getElementById("goalrow3cell06").style.backgroundColor = this.goalConfiguration[29]
                    W.getElementById("goalrow3cell07").style.backgroundColor = this.goalConfiguration[30]
                    W.getElementById("goalrow3cell08").style.backgroundColor = this.goalConfiguration[31]
                    W.getElementById("goalrow3cell09").style.backgroundColor = this.goalConfiguration[32]
                    W.getElementById("goalrow3cell10").style.backgroundColor = this.goalConfiguration[33]
                    W.getElementById("goalrow3cell11").style.backgroundColor = this.goalConfiguration[34]
                    W.getElementById("goalrow3cell12").style.backgroundColor = this.goalConfiguration[35]
                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;    
                    node.on.data('CLUE', function(msg) {
                        that.clueReceived = msg.data;
                        this.cluespast.push(that.clueReceived);
                        node.done();
                    });

                
                },
                done: function(){
                    debugger;
                    
                //     if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                //         this.isGoalConfiguration = true;
                //         node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                // }
                }
            }
        }
    });

    //Functionality is change current configuration
    stager.extendStep('guessOptionsprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                },
                donebutton: false,
                frame: 'studyboardCG.htm',
                cb: function() {

                    // need to change the block configuration for Helper if a move has been made

                    //could use cluespast here
                    debugger;
        //             if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
        //                 this.isGoalConfiguration = true;
        //                 node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
        // }
                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate

                    if(["Ask a yes/no question"].includes(choiceTXT)){

                    W.setInnerHTML('cluepasttxt', "You chose to ask a question. ");

                    // then just present original configuration

                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]
                    }

                    else if(["Pass"].includes(choiceTXT)){

                    W.setInnerHTML('cluepasttxt', "You chose to pass your turn.");

                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    }

                    else{

                    W.setInnerHTML('cluepasttxt', "You chose to move a block from: ");
                    

                    // get the latest value from cluespast
                    // it will be of the form // total = "move a block from rowXcellXY to rowXcellXY"

                    var moveInfo = this.cluespast.at(-1)
                    // get last 
                    var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = choiceString.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    W.setInnerHTML('cluepast', "row " + row_from  + " cell " + cell_from+  " to row " + row_to+ " cell "+ cell_to);

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                  //moveToID becomes the color of moveFromID
                    // this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // // and moveFromID becomes white
                    // this.currentConfiguration[moveFromID] = "white"
                
                        // having made changes to currentConfiguration, now make the table

                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    }

                var that;//force proceed when clue is sent from other player
                if (this.guessesReceived !== null) node.done();
                that = this;    
                node.on.data('ANSWER', function(msg) {
                    that.guessesReceived = msg.data;
                    this.cluespast.push(that.guessesReceived);
                    node.done();
                });

                },

            done: function() {
                debugger;
                // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                //     this.isGoalConfiguration = true;
                // }
                    node.say('ANSWER', node.game.partner);
                    node.on.data('ANSWER', function(msg) {
                        that.guessesReceived = msg.data;
                    });
                    //node.set({guesserID: this.id});
                    //node.set({guesserRandCode: this.randomCode});
                    return;
            }

                
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                //donebutton: false,
                
                cb: function() {

                    // debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
    
                    // }
                    // here we want to tell the architect what the Helper did and also change the block positions

                    var moveChoice1 = this.clueReceived

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes("move a block from ")){                        

                        W.setInnerHTML('cluepasttxt', "The helper selected to move a block from: ");
                        var moveInfo = this.cluespast.at(-1)
                    // get last 
                    var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = choiceString.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    W.setInnerHTML('cluepast', "row " + row_from  + " cell " + cell_from+  " to row " + row_to+ " cell "+ cell_to);

                    // // animation code

                    // var imgObj = null;
                    // var animate ;
                    
                    // function init() {
                    // imgObj = document.getElementById(moveChoice_from);
                    // imgObj.style.position= 'relative'; 
                    // imgObj.style.left = '0px'; 
                    // }
                    // function moveRight() {
                    // imgObj.style.left = parseInt(imgObj.style.left) + 10 + 'px';
                    // animate = setTimeout(moveRight,20);    // call moveRight in 20msec
                    // }
                    // function stop() {
                    // clearTimeout(animate);
                    // imgObj.style.left = '0px'; 
                    // }
                    
                    // window.onload = init;

                    // moveRight();

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                  //moveToID becomes the color of moveFromID
                    this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.currentConfiguration[moveFromID] = "white"

                        // having made changes to currentConfiguration, now make the table

                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]
                        
                        W.getElementById("goalrow1cell01").style.backgroundColor = this.goalConfiguration[0]
                        W.getElementById("goalrow1cell02").style.backgroundColor = this.goalConfiguration[1]
                        W.getElementById("goalrow1cell03").style.backgroundColor = this.goalConfiguration[2]
                        W.getElementById("goalrow1cell04").style.backgroundColor = this.goalConfiguration[3]
                        W.getElementById("goalrow1cell05").style.backgroundColor = this.goalConfiguration[4]
                        W.getElementById("goalrow1cell06").style.backgroundColor = this.goalConfiguration[5]
                        W.getElementById("goalrow1cell07").style.backgroundColor = this.goalConfiguration[6]
                        W.getElementById("goalrow1cell08").style.backgroundColor = this.goalConfiguration[7]
                        W.getElementById("goalrow1cell09").style.backgroundColor = this.goalConfiguration[8]
                        W.getElementById("goalrow1cell10").style.backgroundColor = this.goalConfiguration[9]
                        W.getElementById("goalrow1cell11").style.backgroundColor = this.goalConfiguration[10]
                        W.getElementById("goalrow1cell12").style.backgroundColor = this.goalConfiguration[11]
                        
                        W.getElementById("goalrow2cell01").style.backgroundColor = this.goalConfiguration[12]
                        W.getElementById("goalrow2cell02").style.backgroundColor = this.goalConfiguration[13]
                        W.getElementById("goalrow2cell03").style.backgroundColor = this.goalConfiguration[14]
                        W.getElementById("goalrow2cell04").style.backgroundColor = this.goalConfiguration[15]
                        W.getElementById("goalrow2cell05").style.backgroundColor = this.goalConfiguration[16]
                        W.getElementById("goalrow2cell06").style.backgroundColor = this.goalConfiguration[17]
                        W.getElementById("goalrow2cell07").style.backgroundColor = this.goalConfiguration[18]
                        W.getElementById("goalrow2cell08").style.backgroundColor = this.goalConfiguration[19]
                        W.getElementById("goalrow2cell09").style.backgroundColor = this.goalConfiguration[20]
                        W.getElementById("goalrow2cell10").style.backgroundColor = this.goalConfiguration[21]
                        W.getElementById("goalrow2cell11").style.backgroundColor = this.goalConfiguration[22]
                        W.getElementById("goalrow2cell12").style.backgroundColor = this.goalConfiguration[23]
                        
                        W.getElementById("goalrow3cell01").style.backgroundColor = this.goalConfiguration[24]
                        W.getElementById("goalrow3cell02").style.backgroundColor = this.goalConfiguration[25]
                        //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("goalrow3cell03").style.backgroundColor = this.goalConfiguration[26]
                        W.getElementById("goalrow3cell04").style.backgroundColor = this.goalConfiguration[27]
                        W.getElementById("goalrow3cell05").style.backgroundColor = this.goalConfiguration[28]
                        W.getElementById("goalrow3cell06").style.backgroundColor = this.goalConfiguration[29]
                        W.getElementById("goalrow3cell07").style.backgroundColor = this.goalConfiguration[30]
                        W.getElementById("goalrow3cell08").style.backgroundColor = this.goalConfiguration[31]
                        W.getElementById("goalrow3cell09").style.backgroundColor = this.goalConfiguration[32]
                        W.getElementById("goalrow3cell10").style.backgroundColor = this.goalConfiguration[33]
                        W.getElementById("goalrow3cell11").style.backgroundColor = this.goalConfiguration[34]
                        W.getElementById("goalrow3cell12").style.backgroundColor = this.goalConfiguration[35]

                        // after seeing new block configuration, the architect makes their move

                        // now architect moves blocks

                        var dragid = 0;
                        var dropid = 0;
                        var total = 0;
                        var dragtarget = W.getElementById("gbrd");
                        // not all items should be "draggable" in the table
                        // we could check for whether there is anything non-white above a particular index
                        dragtarget.addEventListener('dragstart', dragStart);
        
                        // code for modifying drag target
        
                        function reduceDragArray(indexArray, configArray) {
                            var newArr = indexArray.reduce(function(a, e, i) {
                            // only push if cell is non-white
                            if(configArray[e] !=="white"){
                                // if the index is not in the first row
                            if (e > 11){
                                // if the element on top is white, then it's draggable
                                if(configArray[e-12] === "white"){a.push(e);}
                            }
                            else{a.push(e);}}    
                            return a;
                            }, []);
                            return newArr
                        }
                        
                        var fulldragindices= Array(this.currentConfiguration.length).fill().map((x,i)=>i)
                        console.log("fulldragindices ="+fulldragindices);
                        var validDragargets = reduceDragArray(fulldragindices, this.currentConfiguration)
                        
                        console.log("validDragargets ="+validDragargets);
        
                        // convert to table cell IDs
        
                        var filteredDragTableIDs = validDragargets.map(x => {
                            if (x < 9){
                                return "row1" + "cell0"+ (x + 1) ;
                            }
                            else if (x < 12){
                                return "row1" + "cell"+ (x + 1) ;
                            }else if(x < 24){
                                var val = (x-12)+1
                                if(val < 10){return "row2" + "cell0"+ ((x-12)+1);}
                                else{return "row2" + "cell"+ ((x-12)+1);}
                            }
                            else{
                                var val = (x-24)+1
                                if(val < 10){return "row3" + "cell0"+ ((x-24)+1);}
                                else{return "row3" + "cell"+ ((x-24)+1);}
                            }
                        })
        
                        console.log("filteredDragTableIDs ="+filteredDragTableIDs);
                        
                        // code for modifying drop targets
        
                        var droptarget = W.getElementById("gbrd"); 
                        // need to make this only some specific drag choices
                        // could try to filter for only "white" cells
        
                        var filtereddropIndices = this.currentConfiguration.reduce(function(a, e, i) {
                            if (e === 'white')
                                a.push(i);
                            return a;
                        }, []);
                        console.log("filtered table indices="+filtereddropIndices);
        
                        // ultimately we want to further restrict this to only white cells that
                        // have something non-white below them, but for now 
        
                        // logic for more filtering: if the color of the cell at the bottom is white too then exclude
                        // x+12
        
                        function reduceDropArray(indexArray, configArray) {
                            var newArr = indexArray.reduce(function(a, e, i) {
                            if (e-12 < 36){
                                if(configArray[e+12] !== "white"){a.push(e);}
                            }
                            else{a.push(e);}    
                            return a;
                        }, []);
                          return newArr
                        }
        
                     var validWhiteBoxes = reduceDropArray(filtereddropIndices, this.currentConfiguration) 
                        
        
                     console.log("validWhiteBoxes="+validWhiteBoxes);
        
        
                        var filteredDropTableIDs = validWhiteBoxes.map(x => {
                            if (x < 9){
                                return "row1" + "cell0"+ (x + 1) ;
                            }
                            else if (x < 12){
                                return "row1" + "cell"+ (x + 1) ;
                            }else if(x < 24){
                                var val = (x-12)+1
                                if(val < 10){return "row2" + "cell0"+ ((x-12)+1);}
                                else{return "row2" + "cell"+ ((x-12)+1);}
                            }
                            else{
                                var val = (x-24)+1
                                if(val < 10){return "row3" + "cell0"+ ((x-24)+1);}
                                else{return "row3" + "cell"+ ((x-24)+1);}
                            }
                        })
        
                        console.log("filtered table IDS="+filteredDropTableIDs);
        
                        // we restrict dropping to these "white" cells only
        
                        droptarget.addEventListener('dragenter', dragEnter)
                        droptarget.addEventListener('dragover', dragOver);
                        droptarget.addEventListener('dragleave', dragLeave);
                        droptarget.addEventListener('drop', drop);
        
                            function dragStart(e) {
                                if(filteredDragTableIDs.includes(e.target.id)){
                                console.log('drag starts...');
                                e.dataTransfer.setData('text/plain', e.target.id);
                                setTimeout(() => {
                                    e.target.classList.add('hide');
                                }, 0);
        
                                }
                                }
                            function dragEnter(e) {
                                
                                if(filteredDropTableIDs.includes(e.target.id)){
                                e.preventDefault();
                                e.target.classList.add('drag-over');
                                }
                            }
        
                            function dragOver(e) {
        
                                if(filteredDropTableIDs.includes(e.target.id)){
                                e.preventDefault();
                                e.target.classList.add('drag-over');
                                }
                            }
        
                            function dragLeave(e) {
                                if(filteredDropTableIDs.includes(e.target.id)){
                                e.target.classList.remove('drag-over');
                                }
                            }
                            function drop(e) {
        
                                if(filteredDropTableIDs.includes(e.target.id)){
                                
                                e.target.classList.remove('drag-over');
                                // get the draggable element
                                const id = e.dataTransfer.getData('text/plain');
                                const draggable = W.getElementById(id);
                                dragid = id;
                                dropid = JSON.parse(JSON.stringify(e.target.id));
                                console.log("dragid="+dragid);
                                console.log("dropid="+dropid);
                                // add it to the drop target
                                e.target.appendChild(draggable);
                            
                                // display the draggable element
                                draggable.classList.remove('hide');
                                // call the function that records these move IDs
                                setTotalValue();
                                }
                                
                            }                 

                function setTotalValue(){

                // if it gets into this function, it will change the drag and dropids and value of total
                
                total = "move a block from " + dragid + " to " + dropid;
                console.log("inside total = "+total)
                
                node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    player: node.player.id,
                    stage: node.game.getCurrentGameStage(),
                    Guess1: total
                }); 
             
                node.game.memory.tag("GUESS");
                }

                // called when no action is taken

                node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    player: node.player.id,
                    stage: node.game.getCurrentGameStage(),
                    Guess1: total
                }); 
             
                node.game.memory.tag("GUESS");

                    }

                    else if (moveChoice1.includes("Pass")){
                        W.setInnerHTML('cluepasttxt', "The helper chose to pass their turn.");

                        // if they passed their turn, display is same as initial

                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                        W.getElementById("goalrow1cell01").style.backgroundColor = this.goalConfiguration[0]
                        W.getElementById("goalrow1cell02").style.backgroundColor = this.goalConfiguration[1]
                        W.getElementById("goalrow1cell03").style.backgroundColor = this.goalConfiguration[2]
                        W.getElementById("goalrow1cell04").style.backgroundColor = this.goalConfiguration[3]
                        W.getElementById("goalrow1cell05").style.backgroundColor = this.goalConfiguration[4]
                        W.getElementById("goalrow1cell06").style.backgroundColor = this.goalConfiguration[5]
                        W.getElementById("goalrow1cell07").style.backgroundColor = this.goalConfiguration[6]
                        W.getElementById("goalrow1cell08").style.backgroundColor = this.goalConfiguration[7]
                        W.getElementById("goalrow1cell09").style.backgroundColor = this.goalConfiguration[8]
                        W.getElementById("goalrow1cell10").style.backgroundColor = this.goalConfiguration[9]
                        W.getElementById("goalrow1cell11").style.backgroundColor = this.goalConfiguration[10]
                        W.getElementById("goalrow1cell12").style.backgroundColor = this.goalConfiguration[11]
                        
                        W.getElementById("goalrow2cell01").style.backgroundColor = this.goalConfiguration[12]
                        W.getElementById("goalrow2cell02").style.backgroundColor = this.goalConfiguration[13]
                        W.getElementById("goalrow2cell03").style.backgroundColor = this.goalConfiguration[14]
                        W.getElementById("goalrow2cell04").style.backgroundColor = this.goalConfiguration[15]
                        W.getElementById("goalrow2cell05").style.backgroundColor = this.goalConfiguration[16]
                        W.getElementById("goalrow2cell06").style.backgroundColor = this.goalConfiguration[17]
                        W.getElementById("goalrow2cell07").style.backgroundColor = this.goalConfiguration[18]
                        W.getElementById("goalrow2cell08").style.backgroundColor = this.goalConfiguration[19]
                        W.getElementById("goalrow2cell09").style.backgroundColor = this.goalConfiguration[20]
                        W.getElementById("goalrow2cell10").style.backgroundColor = this.goalConfiguration[21]
                        W.getElementById("goalrow2cell11").style.backgroundColor = this.goalConfiguration[22]
                        W.getElementById("goalrow2cell12").style.backgroundColor = this.goalConfiguration[23]
                        
                        W.getElementById("goalrow3cell01").style.backgroundColor = this.goalConfiguration[24]
                        W.getElementById("goalrow3cell02").style.backgroundColor = this.goalConfiguration[25]
                        //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("goalrow3cell03").style.backgroundColor = this.goalConfiguration[26]
                        W.getElementById("goalrow3cell04").style.backgroundColor = this.goalConfiguration[27]
                        W.getElementById("goalrow3cell05").style.backgroundColor = this.goalConfiguration[28]
                        W.getElementById("goalrow3cell06").style.backgroundColor = this.goalConfiguration[29]
                        W.getElementById("goalrow3cell07").style.backgroundColor = this.goalConfiguration[30]
                        W.getElementById("goalrow3cell08").style.backgroundColor = this.goalConfiguration[31]
                        W.getElementById("goalrow3cell09").style.backgroundColor = this.goalConfiguration[32]
                        W.getElementById("goalrow3cell10").style.backgroundColor = this.goalConfiguration[33]
                        W.getElementById("goalrow3cell11").style.backgroundColor = this.goalConfiguration[34]
                        W.getElementById("goalrow3cell12").style.backgroundColor = this.goalConfiguration[35]

                        // now architect moves blocks

                var dragid = 0;
                var dropid = 0;
                var total = 0;
                var dragtarget = W.getElementById("gbrd");
                // not all items should be "draggable" in the table
                // we could check for whether there is anything non-white above a particular index
                dragtarget.addEventListener('dragstart', dragStart);

                // code for modifying drag target

                function reduceDragArray(indexArray, configArray) {
                    var newArr = indexArray.reduce(function(a, e, i) {
                    // only push if cell is non-white
                    if(configArray[e] !=="white"){
                        // if the index is not in the first row
                    if (e > 11){
                        // if the element on top is white, then it's draggable
                        if(configArray[e-12] === "white"){a.push(e);}
                    }
                    else{a.push(e);}}    
                    return a;
                    }, []);
                    return newArr
                }
                
                var fulldragindices= Array(this.currentConfiguration.length).fill().map((x,i)=>i)
                console.log("fulldragindices ="+fulldragindices);
                var validDragargets = reduceDragArray(fulldragindices, this.currentConfiguration)
                
                console.log("validDragargets ="+validDragargets);

                // convert to table cell IDs

                var filteredDragTableIDs = validDragargets.map(x => {
                    if (x < 9){
                        return "row1" + "cell0"+ (x + 1) ;
                    }
                    else if (x < 12){
                        return "row1" + "cell"+ (x + 1) ;
                    }else if(x < 24){
                        var val = (x-12)+1
                        if(val < 10){return "row2" + "cell0"+ ((x-12)+1);}
                        else{return "row2" + "cell"+ ((x-12)+1);}
                    }
                    else{
                        var val = (x-24)+1
                        if(val < 10){return "row3" + "cell0"+ ((x-24)+1);}
                        else{return "row3" + "cell"+ ((x-24)+1);}
                    }
                })

                console.log("filteredDragTableIDs ="+filteredDragTableIDs);
                
                // code for modifying drop targets

                var droptarget = W.getElementById("gbrd"); 
                // need to make this only some specific drag choices
                // could try to filter for only "white" cells

                var filtereddropIndices = this.currentConfiguration.reduce(function(a, e, i) {
                    if (e === 'white')
                        a.push(i);
                    return a;
                }, []);
                console.log("filtered table indices="+filtereddropIndices);

                // ultimately we want to further restrict this to only white cells that
                // have something non-white below them, but for now 

                // logic for more filtering: if the color of the cell at the bottom is white too then exclude
                // x+12

                function reduceDropArray(indexArray, configArray) {
                    var newArr = indexArray.reduce(function(a, e, i) {
                    if (e-12 < 36){
                        if(configArray[e+12] !== "white"){a.push(e);}
                    }
                    else{a.push(e);}    
                    return a;
                }, []);
                  return newArr
                }

             var validWhiteBoxes = reduceDropArray(filtereddropIndices, this.currentConfiguration) 
                

             console.log("validWhiteBoxes="+validWhiteBoxes);


                var filteredDropTableIDs = validWhiteBoxes.map(x => {
                    if (x < 9){
                        return "row1" + "cell0"+ (x + 1) ;
                    }
                    else if (x < 12){
                        return "row1" + "cell"+ (x + 1) ;
                    }else if(x < 24){
                        var val = (x-12)+1
                        if(val < 10){return "row2" + "cell0"+ ((x-12)+1);}
                        else{return "row2" + "cell"+ ((x-12)+1);}
                    }
                    else{
                        var val = (x-24)+1
                        if(val < 10){return "row3" + "cell0"+ ((x-24)+1);}
                        else{return "row3" + "cell"+ ((x-24)+1);}
                    }
                })

                console.log("filtered table IDS="+filteredDropTableIDs);

                // we restrict dropping to these "white" cells only

                droptarget.addEventListener('dragenter', dragEnter)
                droptarget.addEventListener('dragover', dragOver);
                droptarget.addEventListener('dragleave', dragLeave);
                droptarget.addEventListener('drop', drop);

                    function dragStart(e) {
                        if(filteredDragTableIDs.includes(e.target.id)){
                        console.log('drag starts...');
                        e.dataTransfer.setData('text/plain', e.target.id);
                        setTimeout(() => {
                            e.target.classList.add('hide');
                        }, 0);

                        }
                        }
                    function dragEnter(e) {
                        
                        if(filteredDropTableIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                        }
                    }

                    function dragOver(e) {

                        if(filteredDropTableIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                        }
                    }

                    function dragLeave(e) {
                        if(filteredDropTableIDs.includes(e.target.id)){
                        e.target.classList.remove('drag-over');
                        }
                    }
                    function drop(e) {

                        if(filteredDropTableIDs.includes(e.target.id)){
                        
                        e.target.classList.remove('drag-over');
                        // get the draggable element
                        const id = e.dataTransfer.getData('text/plain');
                        const draggable = W.getElementById(id);
                        dragid = id;
                        dropid = JSON.parse(JSON.stringify(e.target.id));
                        console.log("dragid="+dragid);
                        console.log("dropid="+dropid);
                        // add it to the drop target
                        e.target.appendChild(draggable);
                    
                        // display the draggable element
                        draggable.classList.remove('hide');
                        // call the function that records these move IDs
                        setTotalValue();
                        }
                        
                    }                

                function setTotalValue(){

                // if it gets into this function, it will change the drag and dropids and value of total
                
                total = "move a block from " + dragid + " to " + dropid;
                console.log("inside total = "+total)
                
                node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    player: node.player.id,
                    stage: node.game.getCurrentGameStage(),
                    Guess1: total
                }); 
             
                node.game.memory.tag("GUESS");
                }

                // called when no action is taken

                node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    player: node.player.id,
                    stage: node.game.getCurrentGameStage(),
                    Guess1: total
                }); 
             
                node.game.memory.tag("GUESS");


                    }

                    else{
                        W.setInnerHTML('cluepasttxt', "The helper decided to ask you a question: ");
                        W.setInnerHTML('clue2', "");
                        W.setInnerHTML('cluepast', moveChoice1 ); 

                        // if they selected a question, then keep display the same as initial

                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                        W.getElementById("goalrow1cell01").style.backgroundColor = this.goalConfiguration[0]
                        W.getElementById("goalrow1cell02").style.backgroundColor = this.goalConfiguration[1]
                        W.getElementById("goalrow1cell03").style.backgroundColor = this.goalConfiguration[2]
                        W.getElementById("goalrow1cell04").style.backgroundColor = this.goalConfiguration[3]
                        W.getElementById("goalrow1cell05").style.backgroundColor = this.goalConfiguration[4]
                        W.getElementById("goalrow1cell06").style.backgroundColor = this.goalConfiguration[5]
                        W.getElementById("goalrow1cell07").style.backgroundColor = this.goalConfiguration[6]
                        W.getElementById("goalrow1cell08").style.backgroundColor = this.goalConfiguration[7]
                        W.getElementById("goalrow1cell09").style.backgroundColor = this.goalConfiguration[8]
                        W.getElementById("goalrow1cell10").style.backgroundColor = this.goalConfiguration[9]
                        W.getElementById("goalrow1cell11").style.backgroundColor = this.goalConfiguration[10]
                        W.getElementById("goalrow1cell12").style.backgroundColor = this.goalConfiguration[11]
                        
                        W.getElementById("goalrow2cell01").style.backgroundColor = this.goalConfiguration[12]
                        W.getElementById("goalrow2cell02").style.backgroundColor = this.goalConfiguration[13]
                        W.getElementById("goalrow2cell03").style.backgroundColor = this.goalConfiguration[14]
                        W.getElementById("goalrow2cell04").style.backgroundColor = this.goalConfiguration[15]
                        W.getElementById("goalrow2cell05").style.backgroundColor = this.goalConfiguration[16]
                        W.getElementById("goalrow2cell06").style.backgroundColor = this.goalConfiguration[17]
                        W.getElementById("goalrow2cell07").style.backgroundColor = this.goalConfiguration[18]
                        W.getElementById("goalrow2cell08").style.backgroundColor = this.goalConfiguration[19]
                        W.getElementById("goalrow2cell09").style.backgroundColor = this.goalConfiguration[20]
                        W.getElementById("goalrow2cell10").style.backgroundColor = this.goalConfiguration[21]
                        W.getElementById("goalrow2cell11").style.backgroundColor = this.goalConfiguration[22]
                        W.getElementById("goalrow2cell12").style.backgroundColor = this.goalConfiguration[23]
                        
                        W.getElementById("goalrow3cell01").style.backgroundColor = this.goalConfiguration[24]
                        W.getElementById("goalrow3cell02").style.backgroundColor = this.goalConfiguration[25]
                        //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("goalrow3cell03").style.backgroundColor = this.goalConfiguration[26]
                        W.getElementById("goalrow3cell04").style.backgroundColor = this.goalConfiguration[27]
                        W.getElementById("goalrow3cell05").style.backgroundColor = this.goalConfiguration[28]
                        W.getElementById("goalrow3cell06").style.backgroundColor = this.goalConfiguration[29]
                        W.getElementById("goalrow3cell07").style.backgroundColor = this.goalConfiguration[30]
                        W.getElementById("goalrow3cell08").style.backgroundColor = this.goalConfiguration[31]
                        W.getElementById("goalrow3cell09").style.backgroundColor = this.goalConfiguration[32]
                        W.getElementById("goalrow3cell10").style.backgroundColor = this.goalConfiguration[33]
                        W.getElementById("goalrow3cell11").style.backgroundColor = this.goalConfiguration[34]
                        W.getElementById("goalrow3cell12").style.backgroundColor = this.goalConfiguration[35]
                        // after question has been displayed, architect responds with yes/no

                        this.yesNoArchitect = node.widgets.append('ChoiceTable', W.gid('containerbottom2'), {
                            id: 'yesno',
                            mainText: "Select your response to the Helper's question:",
                            choices: [
                                '<button  class="button button2">Yes</button>',
                                        '<button  class="button button2">No</button>',
                            ],
                            title: false,
                            requiredChoice: true
                        });
                        
                    }

                },
                done: function() {
                    debugger;
                    if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                        this.isGoalConfiguration = true;
                        node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    }
                    // need to store the values being generated

                    var moveChoice1 = this.clueReceived

                    

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes("move a block from ")) {
                        // if there was a move from the helper
                    // then there will also be a move from the guesser which we need to record
                    // get total value
                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate

                    this.cluespast.push(choiceTXT);

                    node.say('ANSWER', node.game.partner, choiceTXT);

                    }

                    else if(moveChoice1.includes("Pass")){
                        // get total value
                        var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate
                        this.cluespast.push(choiceTXT);
                    node.say('ANSWER', node.game.partner, choiceTXT);
                    }

                    else{

                    var answer = this.yesNoArchitect.getValues().choice
                    this.cluespast.push(answer);

                    node.say('ANSWER', node.game.partner, answer);

                    }
                    return;
 
                }
            }
        }
    });

//updates need to be made to guessFinalprac to continue throuhg rounds
    stager.extendStep('guessFinalprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                    
                },
                donebutton: true,
                frame: 'feedbackCG.htm',
                cb: function() {
                    debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
    
                    // }
                    var moveChoice1 = this.cluespast.at(-1)

                    this.lastConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));

                    // moveChoice will either be a question string or of the form "rowXcellXY MoveBlockTo rowXcellXY" or "Pass"

                    if (moveChoice1.includes("move a block from ")){

                        W.setInnerHTML('cluepasttxt', "The Architect has moved a block from: ");
                        // if the Architect moved
                        var moveInfo = this.cluespast.at(-1)
                    // get last 
                    var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = choiceString.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    W.setInnerHTML('cluepast', "row " + row_from  + " cell " + cell_from+  " to row " + row_to+ " cell "+ cell_to);

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                  //moveToID becomes the color of moveFromID
                    this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.currentConfiguration[moveFromID] = "white"

                        
                        // having made changes to currentConfiguration, now make the table for helper

                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                        // now record the response of the Helper

                        // they just click done 


                    // var el = W.getElementById("blocks");

                    // var el = W.getElementById("gbrd");


                    // this.clicker2 = function (e){//event listener that receives two words and then ends the step
                    //     var target = e.target;
                    //     //var myDiv = W.getElementById("alist");
                    //     if(target.className.match("button button2")){
                        
                    //         //myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML;
                    //         node.say('GUESS', node.game.partner, target.innerHTML);
                    //         node.set({GUESS_1_FINAL : target.innerHTML});
                    //         node.set({GUESS_1_FINAL_TIME : node.timer.getTimeSince('step')})
                    //         node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    //             player: node.player.id,
                    //             stage: node.game.getCurrentGameStage(),
                    //             Guess1: target.innerHTML
                    //         });
                    //         node.game.memory.tag("GUESS");//tag this memory for easy access later
                    //         el.removeEventListener('click', this.clicker2);
                    //         node.done(); 
                    // }

                    // }
                    // el.addEventListener('click', this.clicker2);

                }

                else{
                    // if the architect answered a question

                    W.setInnerHTML('cluepasttxt', "The Architect has answered your question: ");
                    W.setInnerHTML('cluepast', this.yesno[this.cluespast.at(-1)]);
                    
                    // display board in most recent format

                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    // next Helper makes a move

                    // var el = W.getElementById("blocks");

                    // var el = W.getElementById("gbrd");


                    // this.clicker2 = function (e){//event listener that receives two words and then ends the step
                    //     var target = e.target;
                    //     //var myDiv = W.getElementById("alist");
                    //     if(target.className.match("button button2")){
                        
                    //         //myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML;
                    //         node.say('GUESS', node.game.partner, target.innerHTML);
                    //         node.set({GUESS_1_FINAL : target.innerHTML});
                    //         node.set({GUESS_1_FINAL_TIME : node.timer.getTimeSince('step')})
                    //         node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                    //             player: node.player.id,
                    //             stage: node.game.getCurrentGameStage(),
                    //             Guess1: target.innerHTML
                    //         });
                    //         node.game.memory.tag("GUESS");//tag this memory for easy access later
                    //         el.removeEventListener('click', this.clicker2);
                    //         node.done(); 
                    // }

                    // }
                    // el.addEventListener('click', this.clicker2);

                }
                
                },
        done:  function(){
            debugger;
            // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
            //     this.isGoalConfiguration = true;
            //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
            //     debugger;
            // }
            node.say('GUESS', node.game.partner);
            return;
        }
        },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,//disable done button so they cannot proceed without their partner finishing
                frame: 'studyboard.htm',
                cb: function() {//set the board for the guesser

                    // here we need to change the positions
                    debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    // }
                    var moveChoice1 = this.cluespast.at(-1)

                    this.lastConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes("move a block from ")){
                        // if the Architect moved
                        W.setInnerHTML('cluepasttxt', "You selected to move a block from: ");
                        var moveInfo = this.cluespast.at(-1)
                    // get last 
                    var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = choiceString.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    W.setInnerHTML('cluepast', "row " + row_from  + " cell " + cell_from+  " to row " + row_to+ " cell "+ cell_to);

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                  //moveToID becomes the color of moveFromID

                  //this is where the configuration is upddates 
                    this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.currentConfiguration[moveFromID] = "white"

                        
                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    W.getElementById("goalrow1cell01").style.backgroundColor = this.goalConfiguration[0]
                    W.getElementById("goalrow1cell02").style.backgroundColor = this.goalConfiguration[1]
                    W.getElementById("goalrow1cell03").style.backgroundColor = this.goalConfiguration[2]
                    W.getElementById("goalrow1cell04").style.backgroundColor = this.goalConfiguration[3]
                    W.getElementById("goalrow1cell05").style.backgroundColor = this.goalConfiguration[4]
                    W.getElementById("goalrow1cell06").style.backgroundColor = this.goalConfiguration[5]
                    W.getElementById("goalrow1cell07").style.backgroundColor = this.goalConfiguration[6]
                    W.getElementById("goalrow1cell08").style.backgroundColor = this.goalConfiguration[7]
                    W.getElementById("goalrow1cell09").style.backgroundColor = this.goalConfiguration[8]
                    W.getElementById("goalrow1cell10").style.backgroundColor = this.goalConfiguration[9]
                    W.getElementById("goalrow1cell11").style.backgroundColor = this.goalConfiguration[10]
                    W.getElementById("goalrow1cell12").style.backgroundColor = this.goalConfiguration[11]
                    
                    W.getElementById("goalrow2cell01").style.backgroundColor = this.goalConfiguration[12]
                    W.getElementById("goalrow2cell02").style.backgroundColor = this.goalConfiguration[13]
                    W.getElementById("goalrow2cell03").style.backgroundColor = this.goalConfiguration[14]
                    W.getElementById("goalrow2cell04").style.backgroundColor = this.goalConfiguration[15]
                    W.getElementById("goalrow2cell05").style.backgroundColor = this.goalConfiguration[16]
                    W.getElementById("goalrow2cell06").style.backgroundColor = this.goalConfiguration[17]
                    W.getElementById("goalrow2cell07").style.backgroundColor = this.goalConfiguration[18]
                    W.getElementById("goalrow2cell08").style.backgroundColor = this.goalConfiguration[19]
                    W.getElementById("goalrow2cell09").style.backgroundColor = this.goalConfiguration[20]
                    W.getElementById("goalrow2cell10").style.backgroundColor = this.goalConfiguration[21]
                    W.getElementById("goalrow2cell11").style.backgroundColor = this.goalConfiguration[22]
                    W.getElementById("goalrow2cell12").style.backgroundColor = this.goalConfiguration[23]
                    
                    W.getElementById("goalrow3cell01").style.backgroundColor = this.goalConfiguration[24]
                    W.getElementById("goalrow3cell02").style.backgroundColor = this.goalConfiguration[25]
                    //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("goalrow3cell03").style.backgroundColor = this.goalConfiguration[26]
                    W.getElementById("goalrow3cell04").style.backgroundColor = this.goalConfiguration[27]
                    W.getElementById("goalrow3cell05").style.backgroundColor = this.goalConfiguration[28]
                    W.getElementById("goalrow3cell06").style.backgroundColor = this.goalConfiguration[29]
                    W.getElementById("goalrow3cell07").style.backgroundColor = this.goalConfiguration[30]
                    W.getElementById("goalrow3cell08").style.backgroundColor = this.goalConfiguration[31]
                    W.getElementById("goalrow3cell09").style.backgroundColor = this.goalConfiguration[32]
                    W.getElementById("goalrow3cell10").style.backgroundColor = this.goalConfiguration[33]
                    W.getElementById("goalrow3cell11").style.backgroundColor = this.goalConfiguration[34]
                    W.getElementById("goalrow3cell12").style.backgroundColor = this.goalConfiguration[35]

                    }    // close the movement if
                    
                    else{  

                        W.setInnerHTML('cluepasttxt', "You have answered the Helper's question with: ");
                        W.setInnerHTML('cluepast', this.yesno[this.cluespast.at(-1)]);
                        // if the answer was yes/no the
                    W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    W.getElementById("goalrow1cell01").style.backgroundColor = this.goalConfiguration[0]
                    W.getElementById("goalrow1cell02").style.backgroundColor = this.goalConfiguration[1]
                    W.getElementById("goalrow1cell03").style.backgroundColor = this.goalConfiguration[2]
                    W.getElementById("goalrow1cell04").style.backgroundColor = this.goalConfiguration[3]
                    W.getElementById("goalrow1cell05").style.backgroundColor = this.goalConfiguration[4]
                    W.getElementById("goalrow1cell06").style.backgroundColor = this.goalConfiguration[5]
                    W.getElementById("goalrow1cell07").style.backgroundColor = this.goalConfiguration[6]
                    W.getElementById("goalrow1cell08").style.backgroundColor = this.goalConfiguration[7]
                    W.getElementById("goalrow1cell09").style.backgroundColor = this.goalConfiguration[8]
                    W.getElementById("goalrow1cell10").style.backgroundColor = this.goalConfiguration[9]
                    W.getElementById("goalrow1cell11").style.backgroundColor = this.goalConfiguration[10]
                    W.getElementById("goalrow1cell12").style.backgroundColor = this.goalConfiguration[11]
                    
                    W.getElementById("goalrow2cell01").style.backgroundColor = this.goalConfiguration[12]
                    W.getElementById("goalrow2cell02").style.backgroundColor = this.goalConfiguration[13]
                    W.getElementById("goalrow2cell03").style.backgroundColor = this.goalConfiguration[14]
                    W.getElementById("goalrow2cell04").style.backgroundColor = this.goalConfiguration[15]
                    W.getElementById("goalrow2cell05").style.backgroundColor = this.goalConfiguration[16]
                    W.getElementById("goalrow2cell06").style.backgroundColor = this.goalConfiguration[17]
                    W.getElementById("goalrow2cell07").style.backgroundColor = this.goalConfiguration[18]
                    W.getElementById("goalrow2cell08").style.backgroundColor = this.goalConfiguration[19]
                    W.getElementById("goalrow2cell09").style.backgroundColor = this.goalConfiguration[20]
                    W.getElementById("goalrow2cell10").style.backgroundColor = this.goalConfiguration[21]
                    W.getElementById("goalrow2cell11").style.backgroundColor = this.goalConfiguration[22]
                    W.getElementById("goalrow2cell12").style.backgroundColor = this.goalConfiguration[23]
                    
                    W.getElementById("goalrow3cell01").style.backgroundColor = this.goalConfiguration[24]
                    W.getElementById("goalrow3cell02").style.backgroundColor = this.goalConfiguration[25]
                    //W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("goalrow3cell03").style.backgroundColor = this.goalConfiguration[26]
                    W.getElementById("goalrow3cell04").style.backgroundColor = this.goalConfiguration[27]
                    W.getElementById("goalrow3cell05").style.backgroundColor = this.goalConfiguration[28]
                    W.getElementById("goalrow3cell06").style.backgroundColor = this.goalConfiguration[29]
                    W.getElementById("goalrow3cell07").style.backgroundColor = this.goalConfiguration[30]
                    W.getElementById("goalrow3cell08").style.backgroundColor = this.goalConfiguration[31]
                    W.getElementById("goalrow3cell09").style.backgroundColor = this.goalConfiguration[32]
                    W.getElementById("goalrow3cell10").style.backgroundColor = this.goalConfiguration[33]
                    W.getElementById("goalrow3cell11").style.backgroundColor = this.goalConfiguration[34]
                    W.getElementById("goalrow3cell12").style.backgroundColor = this.goalConfiguration[35]
                }
                    
                

                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                        this.cluespast.push(that.clueReceived);
                        node.done();
                    });
                },
                done: function() {
                    debugger;
                    // if((JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)) && this.isGoalConfiguration == false){
                    //     this.isGoalConfiguration = true;
                    //     node.game.goalsSwitchCase(this.currentConfiguration, this.shapeColor, this.goalRoom);
                    //  }
                    node.say('GUESS', node.game.partner);
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                    });
                    node.set({guesserID: this.id});
                    node.set({guesserRandCode: this.randomCode});
                    return;
                }
            }
        }

    });

    //     /// CODE HASNT BEEN UPDATED AFTER THIS!!
    // /// onc goal check need to ensure that feedbackprac is 
    // stager.extendStep('feedbackprac', {//tells each player whether the guesser was successful
    //     role: function() { return this.role; },
    //     partner: function() { return this.partner; },

    //     roles: {
    //         CLUEGIVER:{
    //             frame: 'feedbackCG.htm',
    //             cb: function() {
    //                 var myDiv = W.getElementById("cganswers");
    //                 var myDiv2 = W.getElementById("cgcorrect");
    //                 var myDiv3 = W.getElementById("cgnextstep");
    //                 if(JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)){
    //                     myDiv.innerHTML = "Helper the game is finished";
    //                 myDiv2.innerHTML = "Click done to move forward ";
    //                 myDiv3.innerHTML = "The statistics will be calculated.";
    //                 }

    //                 myDiv.innerHTML = "Helper click done to continue the game";

    //                 // this.smallRoundCounter += 1;
    //                 //var myDiv4 = W.getElementById("cgnextboard");
    //                 // if(this.pairList[this.roundCounter].includes(this.guess1Received)&&this.pairList[this.roundCounter].includes(this.guess2Received)){//if they were correct it ends the stage and moves on to the next word pair
    //                 //     myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is CORRECT!";
    //                 //     myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
    //                 //     myDiv3.innerHTML = "";
    //                 //     this.roundCounter += 1;
    //                 //     this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
    //                 //     var j;
    //                 //     for(j=0; j < this.smallRoundCounter; j++){
    //                 //         this.cluespast.pop();
    //                 //     }
    //                 //     this.smallRoundCounter = 0;
    //                 //     if(this.roundcounter%3 == 0){
    //                 //         myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
    //                 //     }
    //                 //     if(this.roundCounter == this.pracpairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
    //                 //         node.say('END_GAME', 'SERVER', true);
    //                 //     }
    //                 // }
    //                 // else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
    //                 //     myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
    //                 //     myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
    //                 //     myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
    //                 //     this.roundCounter += 1;
    //                 //     this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
    //                 //     var k;
    //                 //     for(k=0; k < this.smallRoundCounter; k++){
    //                 //         this.cluespast.pop();
    //                 //     }
    //                 //     this.smallRoundCounter = 0;
    //                 //     if(this.roundcounter%3 == 0){
    //                 //         myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
    //                 //     }
    //                 //     if(this.roundCounter == this.pracpairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
    //                 //         node.say('END_GAME', 'SERVER', true);
    //                 //     }
    //                 // }
    //                 // else{//if they are wrong and it isn't the third trial players get another chance
    //                 //     myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
    //                 //     myDiv2.innerHTML = "You will now choose a different clue for the same word pair. Please click Done.";
    //                 //     myDiv3.innerHTML = "";
    //                 //     this.smallRoundCounter += 1;
    //                 // }
    //             }
    //         },
    //         GUESSER:{
    //             frame: 'feedbackGuesser.htm',
    //             cb: function() {
    //                 // var guess1TXT = node.game.memory.resolveTag("guess1").Guess1;//use tags to get our response from memory and validate
    //                 // var guess2TXT = node.game.memory.resolveTag("guess2").Guess2;

    //                 var myDiv = W.getElementById("ganswers");
    //                 var myDiv2 = W.getElementById("gcorrect");
    //                 var myDiv3 = W.getElementById("gnextstep");
    //                 if(JSON.stringify(this.currentConfiguration) == JSON.stringify(this.goalConfiguration)){
    //                     myDiv.innerHTML = "Architec the game is finished";
    //                     myDiv2.innerHTML = "Click done to move forward ";
    //                 myDiv3.innerHTML = "The statistics will be calculated.";
    //                 }

    //                 myDiv.innerHTML = "Architect click done to continue the game";
    //                 // myDiv.innerHTML = "Architec the game is finished";
    //                 // myDiv2.innerHTML = "Click done to move forward ";
    //                 // myDiv3.innerHTML = "The statistics will be calculated.";
    //                 // if(this.pairList[this.roundCounter].includes(guess1TXT)&&this.pairList[this.roundCounter].includes(guess2TXT)){//if they were correct it ends the stage and moves on to the next word pair
    //                 //     myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is CORRECT!";
    //                 //     myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
    //                 //     myDiv3.innerHTML = "";
    //                 //     this.roundCounter += 1;
    //                 //     var j;
    //                 //     for(j=0; j < this.smallRoundCounter; j++){
    //                 //         this.cluespast.pop();
    //                 //     }
    //                 //     this.smallRoundCounter = 0;
    //                 //     if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
    //                 //         node.say('END_GAME', 'SERVER', true);
    //                 //     }
    //                 // }
    //                 // else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
    //                 //     myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
    //                 //     myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
    //                 //     myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
    //                 //     this.roundCounter += 1;
    //                 //     var l;
    //                 //     for(l=0; l < this.smallRoundCounter; l++){
    //                 //         this.cluespast.pop();
    //                 //     }
    //                 //     this.smallRoundCounter = 0;
    //                 //     if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
    //                 //         node.say('END_GAME', 'SERVER', true);
    //                 //     }
    //                 // }
    //                 // else{//if they are wrong and it isn't the third trial players get another chance
    //                 //     myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
    //                 //     myDiv2.innerHTML = "The Speaker will now choose a different clue for the same word pair. Please click Done.";
    //                 //     myDiv3.innerHTML = "";
    //                 //     this.smallRoundCounter += 1;
    //                 // }
    //             }
    //         }
    //     }
    // });
    // /// CODE HASNT BEEN UPDATED AFTER THIS!!


    stager.extendStep('endprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'pracend.htm',
            },
            GUESSER:{
                frame: 'pracend.htm',
            }
        }
    });

    stager.extendStep('clueOptions', {
        role: function() { return this.role; },//This code is repeated to maintain roles throughout steps of experiment
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'clueboard.htm',
                init: function() {
                    node.game.clueReceived = null;
                },
                cb: function() {
                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),//Initialize board with values from our array each round
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);

                    W.setInnerHTML('trgtWords', this.pairList[this.roundCounter][this.randomOrder] + " and " + this.pairList[this.roundCounter][1-this.randomOrder]);
                    node.set({target1: this.pairList[this.roundCounter][this.randomOrder]});
                    node.set({target2: this.pairList[this.roundCounter][1-this.randomOrder]});

                    this.cluesGive = node.widgets.append('CustomInputGroup', W.gid('containerbottom'), {//create customInputGroup widget for clue options, only the first is mandatory
                       id: 'cluesGive',
                       orientation: 'H',
                       required: true,


                       //mainText: 'Please list possible clues.',
                       sharedOptions: {
                          type: 'text',
                          width: '80%'
                       },
                       items: [
                           {
                               id: 'clue1',
                               mainText: 'Option 1',
                               requiredChoice: true
                           },
                           {
                               id: 'clue2',
                               mainText: 'Option 2',
                               requiredChoice: true
                           }//,
                        //    {
                        //        id: 'clue3',
                        //        mainText: 'Option 3',
                        //        requiredChoice: true
                        //    },
                        //    {
                        //        id: 'clue4',
                        //        mainText: 'Option 4'
                        //    },
                        //    {
                        //        id: 'clue5',
                        //        mainText: 'Option 5'
                        //    },
                        //    {
                        //        id: 'clue6',
                        //        mainText: 'Option 6'
                        //    },
                        //    {
                        //        id: 'clue7',
                        //        mainText: 'Option 7'
                        //    },
                        //    {
                        //        id: 'clue8',
                        //        mainText: 'Option 8'
                        //    }
                       ],
                       validation: function(res, values) {
                           // Custom validation (only reports about last word).

                           if (values.clue1 && node.game.inArrayCaseInsensitive(values.clue1, node.game.boardboard[node.game.roundCounter])) {
                               res.err = 'You have used a forbidden word: ' + values.clue1;
                           }

                           if (values.clue2 && node.game.inArrayCaseInsensitive(values.clue2, node.game.boardboard[node.game.roundCounter])) {
                               res.err = 'You have used a forbidden word: ' + values.clue2;
                           }
                        //    if (values.clue3 && node.game.inArrayCaseInsensitive(values.clue3, node.game.boardboard[node.game.roundCounter])) {
                        //        res.err = 'You have used a forbidden word: ' + values.clue3;
                        //    }
                        //    if (values.clue4 && node.game.inArrayCaseInsensitive(values.clue4, node.game.boardboard[node.game.roundCounter])) {
                        //        res.err = 'You have used a forbidden word: ' + values.clue4;
                        //    }
                        //    if (values.clue5 && node.game.inArrayCaseInsensitive(values.clue5, node.game.boardboard[node.game.roundCounter])) {
                        //        res.err = 'You have used a forbidden word: ' + values.clue5;
                        //    }
                        //    if (values.clue6 && node.game.inArrayCaseInsensitive(values.clue6, node.game.boardboard[node.game.roundCounter])) {
                        //        res.err = 'You have used a forbidden word: ' + values.clue6;
                        //    }
                        //    if (values.clue7 && node.game.inArrayCaseInsensitive(values.clue7, node.game.boardboard[node.game.roundCounter])) {
                        //        res.err = 'You have used a forbidden word: ' + values.clue7;
                        //    }
                        //    if (values.clue8 && node.game.inArrayCaseInsensitive(values.clue8, node.game.boardboard[node.game.roundCounter])) {
                        //        res.err = 'You have used a forbidden word: ' + values.clue8;
                        //    }

                           return res;
                       },

                       oninput: function(res, input, that) {
                           var values = {};
                           values[input.it] = res;
                           that.validation(res, values);
                       }


                   });
                },
                done: function() {//this sens all data to the logic client and stores the values
                    node.set({clueGiverID: this.id}),
                    node.set({clueGiverRandCode: this.randomCode}),


                    node.set({clueOption1 : this.cluesGive.getValues().items['clue1'].value}),
                    node.set({TBOption1 : this.cluesGive.getValues().items['clue1'].timeBegin}),
                    node.set({TEOption1 : this.cluesGive.getValues().items['clue1'].timeEnd}),

                    node.set({clueOption2 : this.cluesGive.getValues().items['clue2'].value}),
                    node.set({TBOption2 : this.cluesGive.getValues().items['clue2'].timeBegin}),
                    node.set({TEOption2 : this.cluesGive.getValues().items['clue2'].timeEnd}),

                    // node.set({clueOption3 : this.cluesGive.getValues().items['clue3'].value}),
                    // node.set({TBOption3 : this.cluesGive.getValues().items['clue3'].timeBegin}),
                    // node.set({TEOption3 : this.cluesGive.getValues().items['clue3'].timeEnd}),

                    // node.set({clueOption4 : this.cluesGive.getValues().items['clue4'].value}),
                    // node.set({TBOption4 : this.cluesGive.getValues().items['clue4'].timeBegin}),
                    // node.set({TEOption4 : this.cluesGive.getValues().items['clue4'].timeEnd}),

                    // node.set({clueOption5 : this.cluesGive.getValues().items['clue5'].value}),
                    // node.set({TBOption5 : this.cluesGive.getValues().items['clue5'].timeBegin}),
                    // node.set({TEOption5 : this.cluesGive.getValues().items['clue5'].timeEnd}),

                    // node.set({clueOption6 : this.cluesGive.getValues().items['clue6'].value}),
                    // node.set({TBOption6 : this.cluesGive.getValues().items['clue6'].timeBegin}),
                    // node.set({TEOption6 : this.cluesGive.getValues().items['clue6'].timeEnd}),

                    // node.set({clueOption7 : this.cluesGive.getValues().items['clue7'].value}),
                    // node.set({TBOption7 : this.cluesGive.getValues().items['clue7'].timeBegin}),
                    // node.set({TEOption7 : this.cluesGive.getValues().items['clue7'].timeEnd}),

                    // node.set({clueOption8 : this.cluesGive.getValues().items['clue8'].value}),
                    // node.set({TBOption8 : this.cluesGive.getValues().items['clue8'].timeBegin}),
                    // node.set({TEOption8 : this.cluesGive.getValues().items['clue8'].timeEnd}),

                    node.say('CLUES', node.game.partner, this.cluesGive.getValues().items['clue1'].value);//this sends a signal to the other player so their step ends
                    return;
                }

            },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,//disable done button so they cannot proceed without their partner finishing
                frame: 'studyboard.htm',
                cb: function() {//set the board for the guesser

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//this block forces the end of the step on receiving data
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('CLUES', function(msg) {
                        that.clueReceived = msg.data;
                        node.done();
                    });
                },
                done: function() {
                    node.set({guesserID: this.id});
                    node.set({guesserRandCode: this.randomCode});
                    return;
                }
            }
        }
    });

    stager.extendStep('clueFinal', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'clueboard.htm',
                cb: function() {
                    W.setInnerHTML('containerbottom2', "Please type your FINAL clue below and click Done:"),

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    this.clueGive2 = node.widgets.append('CustomInput', W.gid('containerbottom2'), {//apend customInput widget with 1 mandatory input
                       id: 'clueGive',
                       //mainText: 'What is your final clue?',
                       type: 'text',
                       className: 'centered',
                       root: 'cbrd',
                       requiredChoice: true,
                       validation: function(value) {
                           var res;
                           res = { value: value };
                           // Custom validation (only reports about last word).

                           if (node.game.inArrayCaseInsensitive(value, node.game.boardboard[node.game.roundCounter])) {
                               res.err = 'You have used a forbidden word: ' + value;
                           }
                           return res;
                       },
                       oninput: function(res, input, that) {
                           that.validation(res, input);
                       }
                   });
                },
                done: function() {//send clue to other player and clue and time info to database
                    this.cluespast.push(this.clueGive2.getValues().value);

                    node.say('CLUE', node.game.partner, this.clueGive2.getValues().value);

                    node.set({clueFinal : this.clueGive2.getValues().value});
                    node.set({TBFinal : this.clueGive2.getValues().timeBegin});
                    node.set({TEFinal : this.clueGive2.getValues().timeEnd});

                    return;
                }

            },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,
                frame: 'studyboard.htm',

                cb: function() {
                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('CLUE', function(msg) {
                        that.clueReceived = msg.data;
                        this.cluespast.push(that.clueReceived);
                        node.done();
                    });
                },
            }
        }
    });

    stager.extendStep('guessOptions', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                },
                donebutton: false,
                frame: 'studyboardCG.htm',
                cb: function() {

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//force proceed when guess is sent from other player
                    if (this.guessesReceived !== null) node.done();
                    that = this;
                    node.on.data('GUESSES', function(msg) { node.done();
                        that.guessesReceived = true;
                        node.done();
                    });


                }
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                doneButton: false,
                cb: function() {

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    if(this.smallRoundCounter==0){//show clue given by other player
                        W.setInnerHTML('cluepasttxt', "Your first clue is ");
                        W.setInnerHTML('cluepast', this.clueReceived + ".");
                    }
                    if(this.smallRoundCounter==1){
                        W.setInnerHTML('cluepasttxt', "Your first clue was ");
                        W.setInnerHTML('cluepast', this.cluespast[this.cluespast.length-2] + ".");
                        W.setInnerHTML('cluepast0txt', "Your second clue is ");
                        W.setInnerHTML('cluepast0', this.clueReceived + ".");
                    }
                    if(this.smallRoundCounter==2){
                        W.setInnerHTML('cluepasttxt', "Your first clue was ");
                        W.setInnerHTML('cluepast', this.cluespast[this.cluespast.length-3] + ".");
                        W.setInnerHTML('cluepast0txt', "Your second clue was ");
                        W.setInnerHTML('cluepast0', this.cluespast[this.cluespast.length-2] + ".");
                        W.setInnerHTML('cluepast1txt', "Your third clue is ");
                        W.setInnerHTML('cluepast1', this.clueReceived + ".");
                    }

                    var el = W.getElementById("gbrd");
                    this.clicker = function (e){//add event listener to record button presses of game board
                        var target = e.target;
                        var myDiv = W.getElementById("glist");
                        if(target.className.match("button button1") || target.className.match("button button2")){
                        myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML+", ";
                        node.game.doneButton.enable();
                        node.game.memory.add({
                            player: node.player.id,
                            stage: node.game.getCurrentGameStage(),
                            GuessOptions: target.innerHTML,
                            GUESS_OPTIONS_TIME: node.timer.getTimeSince('step'),
                            customTimeStamp: node.timer.getTimeSince('start')
                        });
                    }
                    },
                    el.addEventListener('click', this.clicker);//add event listener
                },
                done: function() {//send signal for other player to end step, removes event listener so that these values cannot change
                    var el = W.getElementById("gbrd");
                    el.removeEventListener('click', this.clicker);
                    node.say('GUESSES', node.game.partner);
                    var memArray = node.game.memory.select('GuessOptions').and('customTimeStamp','!in', this.optionTimeArray).fetch();
                    var i;

                    for (i=0; i<memArray.length; i++) {//make into for loop with a bunch of if statements

                        if(i == 0){
                            node.set({GuessOption1 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION1_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }

                        if(i == 1){
                            node.set({GuessOption2 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION2_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 2){
                            node.set({GuessOption3 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION3_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 3){
                            node.set({GuessOption4 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION4_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 4){
                            node.set({GuessOption5 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION5_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 5){
                            node.set({GuessOption6 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION6_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 6){
                            node.set({GuessOption7 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION7_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 7){
                            node.set({GuessOption8 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION8_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }

                        this.optionTimeArray.push(memArray[i].customTimeStamp);

                    }
                }
            }
        }
    });

    stager.extendStep('guessFinal', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guess1Received = null;
                    node.game.guess2Received = null;
                },
                donebutton: false,
                frame: 'studyboardCG.htm',
                cb: function() {

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//receives two messages, one for each guessed word. ends after receiving the second one
                    if (this.guess2Received !== null) node.done();
                    that = this;
                    node.on.data('GUESS1', function(msg) {
                        that.guess1Received = msg.data;
                    });
                    node.on.data('GUESS2', function(msg) {
                        that.guess2Received = msg.data;
                        node.done();
                    });
                }
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                donebutton: false,
                cb: function() {
                    W.setInnerHTML('clue2', "Please select your FINAL guesses." ),
                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);

                    this.answerCounter = 0;

                    var el = W.getElementById("gbrd");


                    this.clicker2 = function (e){//event listener that receives two words and then ends the step
                        var target = e.target;
                        var myDiv = W.getElementById("alist");
                        if(target.className.match("button button1") || target.className.match("button button2")){

                        if(myDiv.innerHTML == " Your final answers:  "){//the condition if no word has been added, stores the first word and sends it to the partner
                            myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML;
                            node.say('GUESS1', node.game.partner, target.innerHTML);
                            node.set({GUESS_1_FINAL : target.innerHTML});
                            node.set({GUESS_1_FINAL_TIME : node.timer.getTimeSince('step')})
                            node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                                player: node.player.id,
                                stage: node.game.getCurrentGameStage(),
                                Guess1: target.innerHTML
                            });
                            node.game.memory.tag("guess1");//tag this memory for easy access later

                        }
                        else if(!myDiv.innerHTML.includes(",")) {//the condition if 1 word has been added, stores the second word, send it to the partner, and ends the step for both players
                            myDiv.innerHTML = myDiv.innerHTML + ", " + target.innerHTML;
                            node.say('GUESS2', node.game.partner, target.innerHTML);
                            node.set({GUESS_2_FINAL : target.innerHTML});
                            node.set({GUESS_2_FINAL_TIME : node.timer.getTimeSince('step')})
                            node.game.memory.add({
                                player: node.player.id,
                                stage: node.game.getCurrentGameStage(),
                                Guess2: target.innerHTML
                            });
                            node.game.memory.tag("guess2");
                            el.removeEventListener('click', this.clicker2);
                            node.done();

                        }
                    }

                    }
                    el.addEventListener('click', this.clicker2);
                },
                done: function() {
                    node.say('GUESS', node.game.partner);
                }
            }
        }

    });

    stager.extendStep('feedback', {//tells each player whether the guesser was successful
        role: function() { return this.role; },
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'feedbackCG.htm',
                cb: function() {
                    var myDiv = W.getElementById("cganswers");
                    var myDiv2 = W.getElementById("cgcorrect");
                    var myDiv3 = W.getElementById("cgnextstep");
                    if(this.pairList[this.roundCounter].includes(this.guess1Received)&&this.pairList[this.roundCounter].includes(this.guess2Received)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        if(this.roundcounter%3 == 0){
                            myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var j;
                        for(j=0; j < this.smallRoundCounter; j++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;

                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var m;
                        for(m=0; m < this.smallRoundCounter; m++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;

                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            },
            GUESSER:{
                frame: 'feedbackGuesser.htm',
                cb: function() {
                    var guess1TXT = node.game.memory.resolveTag("guess1").Guess1;//use tags to get our response from memory and validate
                    var guess2TXT = node.game.memory.resolveTag("guess2").Guess2;

                    var myDiv = W.getElementById("ganswers");
                    var myDiv2 = W.getElementById("gcorrect");
                    var myDiv3 = W.getElementById("gnextstep");
                    if(this.pairList[this.roundCounter].includes(guess1TXT)&&this.pairList[this.roundCounter].includes(guess2TXT)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        if(this.roundcounter%3 == 0){
                            myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var j;
                        for(j=0; j < this.smallRoundCounter; j++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var n;
                        for(n=0; n < this.smallRoundCounter; n++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "The Speaker will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            }
        }
    });

    stager.extendStep('demographics', {
        frame: 'demos.htm',
        cb: function() {
            this.demosnode = node.widgets.append('CustomInputGroup', W.gid('demoscontainer'), {//create customInputGroup widget for clue options, only the first is mandatory
               id: 'demosroot2',
               orientation: 'V',
               //mainText: 'Please list possible clues.',
               sharedOptions: {
               },
               items: [
                   {
                       id: 'age',
                       type: 'int',
                       mainText: 'What is your age',
                       requiredChoice: true
                   },
                   {
                       id: 'gender',
                       type: 'text',
                       mainText: 'What is your gender',
                       requiredChoice: true
                   },
                   {
                       id: 'education',
                       type: 'int',
                       mainText: 'How many years of formal education have you had (consider graduating high school to be 12 years)?',
                       requiredChoice: true

                   },
                   {
                       id: 'domHand',
                       type: 'text',
                       mainText: 'What is your dominant hand? (Left/Right/Ambidextrous)'
                   },
                   {
                       id: 'alert',
                       type: 'text',
                       mainText: 'Please indicate what time of the day you feel most alert (Morning/Afternoon/Evening/No differences)'
                   },
                   {
                       id: 'racial',
                       type: 'text',
                       mainText: 'Please indicate which racial categories apply to you, separated by commas (American Indian/Alaskan Native, Asian, Native Hawaiian or Other Pacific Islander, Black/African American, White/Caucasian, More than one race, Prefer Not to Respond)'
                   },
                   {
                       id: 'hispanic',
                       type: 'text',
                       mainText: 'Are you Hispanic or Latino? (Yes/No/Prefer Not to Respond)'

                   },
                   {
                       id: 'english',
                       type: 'text',
                       mainText: 'Is English your First Language? (Yes/No)',
                       requiredChoice: true
                   },
                   {
                       id: 'language',
                       type: 'text',
                       mainText: 'If you answered "No", what is your first language? (Please say English if you answered Yes)'
                   },
                   {
                       id: 'english5',
                       type: 'text',
                       mainText: 'Did you learn English before the age of 5?'
                   },
                   {
                       id: 'englishAge',
                       type: 'int',
                       mainText: 'If you answered "No", at what age did you learn English? (Enter 0 if you answered "Yes")'
                   },
                   {
                       id: 'msc',
                       type: 'text',
                       mainText: 'Is there anything we should know about, which might have affected your performance during the test session? (e.g., lack of sleep, feeling ill etc.)'
                   }
               ]

           });
        },
        done: function() {//this sens all data to the logic client and stores the values
            node.set({ID: this.id}),
            node.set({RandCode: this.randomCode}),
            node.set({age : this.demosnode.getValues().items['age'].value}),
            node.set({gender : this.demosnode.getValues().items['gender'].value}),
            node.set({education : this.demosnode.getValues().items['education'].value}),
            node.set({domHand : this.demosnode.getValues().items['domHand'].value}),
            node.set({alert : this.demosnode.getValues().items['alert'].value}),
            node.set({racial : this.demosnode.getValues().items['racial'].value}),
            node.set({hispanic : this.demosnode.getValues().items['hispanic'].value}),
            node.set({english : this.demosnode.getValues().items['english'].value}),
            node.set({language : this.demosnode.getValues().items['language'].value}),
            node.set({english5 : this.demosnode.getValues().items['english5'].value}),
            node.set({englishAge : this.demosnode.getValues().items['englishAge'].value}),
            node.set({msc : this.demosnode.getValues().items['msc'].value});
            return;
        }
    });

    stager.extendStep('end', {
        donebutton: false,
        frame: 'end.htm',
        cb: function() {
            //node.game.visualTimer.setToZero();
            var myDiv = W.getElementById("compcode");
            myDiv.innerHTML = "Your completion code is: " + this.randomCode;
        }
    });
};
