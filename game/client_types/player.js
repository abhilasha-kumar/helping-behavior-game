/**
 * # Player type implementation of the game stages
 * Copyright(c) 2022 Abhilasha Kumar kumaraa@iu.edu
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

    
        // Setup page: header + frame.
        header = W.generateHeader();
        
        frame = W.generateFrame();


        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);

        //this.visualTimer = node.widgets.append('VisualTimer', header);

        this.doneButton = node.widgets.append('DoneButton', header, {
            text: 'Continue'
        });

        this.positions = ["A1", "A2", "B1", "B2", "C1", "C2"]
        this.colors = ["red", "blue", "green", "white"] // possible colors: white is used when there is no "block"
        this.shape = ["square", "circle"]

        this.yesno = ["YES", "NO"]

        // there are 3 colors : RBG and 2 shapes: square/circle and 3 of each combination
        // 3 red circles, 3 red squares
        // 3 blue circles, 3 blue squares
        // 3 green circles, 3 green squares

        // set initial configuration of the 27 cells - 9 in each row. 12 colored and 15 white


        this.initialConfiguration = [this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room A - top row
                                    this.colors[3],this.colors[3],this.colors[3], this.colors[3], // room B - top row
                                    this.colors[1],this.colors[3],this.colors[3],this.colors[3], // room C - top row
                                    this.colors[2],this.colors[3],this.colors[3],this.colors[3], //room A - mid row
                                    this.colors[0],this.colors[1],this.colors[3],this.colors[0], // room B - mid row
                                    this.colors[1],this.colors[3],this.colors[0],this.colors[2], // room C - mid row
                                    this.colors[1],this.colors[0],this.colors[2], this.colors[3], // room A - bottom row
                                    this.colors[2],this.colors[0],this.colors[3],this.colors[1], // room B - bottom row
                                    this.colors[2],this.colors[1],this.colors[2],this.colors[0]] // room C - bottom r

        // set currentConfig - this changes as players make moves                            

        this.currentConfiguration = [this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room A - top row
                                    this.colors[3],this.colors[3],this.colors[3], this.colors[3], // room B - top row
                                    this.colors[1],this.colors[3],this.colors[3],this.colors[3], // room C - top row
                                    this.colors[2],this.colors[3],this.colors[3],this.colors[3], //room A - mid row
                                    this.colors[0],this.colors[1],this.colors[3],this.colors[0], // room B - mid row
                                    this.colors[1],this.colors[3],this.colors[0],this.colors[2], // room C - mid row
                                    this.colors[1],this.colors[0],this.colors[2], this.colors[3], // room A - bottom row
                                    this.colors[2],this.colors[0],this.colors[3],this.colors[1], // room B - bottom row
                                    this.colors[2],this.colors[1],this.colors[2],this.colors[0]] // room C - bottom row

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
                                    this.shape[1],this.shape[0],this.shape[0],this.shape[0]]   // room C - bottom row                         

        this.cluespast = [];
        this.goalAchieved = 0;


        this.roundCounter = 0;//iterated value to move through the goals
        this.attempts = 0;//iterated value to record the 3 trials for each word pair
        this.max_attempts = 4;
        this.goalnumber = 2;//the number of pairs in the total experiment, should be 57
        
        this.pracpairnumber=3;
        this.optionTimeArray = [0];
        this.id;
        this.randomCode;
        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver

        // set goal configuration and verbal goal
        // get a random color and room
        // create non-white colors array for creating goal
        // this "random" choice is happening separately for architect & builder - NOT ideal

        

        
        // maybe we need a list of goals 

        this.goal1 = [this.colors[0],this.shape[0],this.positions[0]]
        this.goal2 = [this.colors[1],this.shape[0],this.positions[0]]
        this.goal3 = [this.colors[0],this.shape[1],this.positions[0]]

        this.goalList = [this.goal1, this.goal2,this.goal3]

        var randomGoalList = [].concat(this.goalList);
        randomGoalList.sort(function(){
            return 0.5 - Math.random();
            });
        console.log("goal_list:"+this.goalList);
        console.log("randomGoalList:"+randomGoalList);


        

        // actual goal depends on the color and room generated above
        // logic might be to count number of "colors" in a given portion of the table

        this.goalroom = this.goalList[this.roundCounter][2].split("")[0]
        this.goalroomnumber = this.goalList[this.roundCounter][2].split("")[1]

        this.goalindices = []

        if(this.goalroom == "A"){
            // index is within 0:3, 12:15, 24:27
            if(this.goalroomnumber == "1"){
                this.goalindices = [0,1,12,13,24,25]
            }
            else {
                this.goalindices = [2,3,14,15,26,27]
            }
        }

        else if(this.goalroom == "B"){
            // index is within 4:7, 16:19, 28:31
            if(this.goalroomnumber == "1"){
                this.goalindices = [4,5,16,17,28,29]
            }
            else {
                this.goalindices = [6,7,18,19,30,31]
            }
        }

        else{ // room C
           // index is within 8:11, 20:23, 32:35
           if(this.goalroomnumber == "1"){
            this.goalindices = [8,9, 20,21, 32,33]
        }
        else {
            this.goalindices = [10,11, 22,23, 34,35]
        } 
        }

        // once we have the goal indices, we count up the number of random_color occurrences in those indices within
        // the currentConfiguration
        
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

    stager.extendStage('instructions', {
        frame: 'game_instructions.htm',
    });

    stager.extendStep('rolesAssigned', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'instructionsCG.htm' // cpnfitionalizw
            },
            GUESSER:{
                frame: 'instructions.htm'
            }
        }
    });

    stager.extendStep('helperOptionsprac', {
        role: function() { return this.role; },//This code is repeated to maintain roles throughout steps of experiment
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                },
                frame: 'helperChoice.htm',
                donebutton: false,
                cb: function() {


                    if(this.cluespast.length >0){ // if this is not the first step
                        // figure out update message based on whether a move was made or not
                    var moveChoice1 = this.cluespast.at(-1)
                
                    W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                    W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts),
                    W.setInnerHTML('clue2', "Please select whether you want to help by moving a block, ask the architect a yes/no question, or pass." )
                            

                    if (moveChoice1.includes("move a block from ")){

                        W.setInnerHTML('cluepasttxt', "The Architect has moved a: ");
                            // if the Architect moved
                        var moveInfo = this.cluespast.at(-1)
                        // remove unwanted characters
    
                        moveInfo = moveInfo.replace('move a block from ', '');
                        moveInfo = moveInfo.replace('circle', '');
                        
                        //var choiceString = moveInfo.substr(moveInfo.length - 24); 
                        var moveChoice = moveInfo.split(" to ");
                        
                        // now moveChoice contains "row1cell01" and "row2cell02"
                        var moveChoice_from = moveChoice[0];
    
                        var moveTo = moveChoice[1]//this.positions[moveChoice[1]]
    
                        var row_from = Number(moveChoice_from.charAt(3)) // rowX
                        var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                        
    
                        var row_to= Number(moveTo.charAt(3)) // rowX
                        var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY
    
                        
    
                        // once we have the row/cell to/from, we change the current configuration of those specific cell
                        
                        // for each row increment, there is a +12 in index
                        // for each cell increment, there is +1 in index
                        // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                        // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                        // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
      
    
                        var moveFromID = (row_from-1)*12 + (cell_from-1)
                        var moveToID = (row_to-1)*12 + (cell_to-1)
    
                        var moved_color = this.currentConfiguration[moveFromID]
                        var moved_shape = this.currentShape[moveFromID]
    
                        // need to figure out room
                        var movedfrom_room = "X"
                        if([0,1,12,13,24,25].includes(moveFromID)){movedfrom_room = "A1"}
                        else if([2,3,14,15,26,27].includes(moveFromID)) {movedfrom_room = "A2"}
                        else if([4,5,16,17,28,29].includes(moveFromID)) {movedfrom_room = "B1"}
                        else if([6,7,18,19,30,31].includes(moveFromID)) {movedfrom_room = "B2"}
                        else if([8,9, 20,21, 32,33].includes(moveFromID)) {movedfrom_room = "C1"}
                        else {movedfrom_room = "C2"}
    
                        var movedto_room = "X"
                        if([0,1,12,13,24,25].includes(moveToID)){movedto_room = "A1"}
                        else if([2,3,14,15,26,27].includes(moveToID)) {movedto_room = "A2"}
                        else if([4,5,16,17,28,29].includes(moveToID)) {movedto_room = "B1"}
                        else if([6,7,18,19,30,31].includes(moveToID)) {movedto_room = "B2"}
                        else if([8,9, 20,21, 32,33].includes(moveToID)) {movedto_room = "C1"}
                        else {movedto_room = "C2"}
                        
                        W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room+  " to room " + movedto_room);
    
    
                      //moveToID becomes the color of moveFromID
                        this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                        // and moveFromID becomes white
                        this.currentConfiguration[moveFromID] = "white"
    
                        // change shapes too
    
                        this.currentShape[moveToID] = this.currentShape[moveFromID]
                    }
    
                    else{
                        // if the architect answered a question
    
                        
                        var qplusa = this.cluespast.at(-1)
                        var q = qplusa.split('---')[0]
                        W.setInnerHTML('cluepasttxt', "You asked the Architect: <span style='color:red;'>  "+ q + "</span>. The Architect's answer is: ");
                        var a = qplusa.split('---')[1]
                        W.setInnerHTML('cluepast',  this.yesno[a]);
    
                    }

                }
    
                    // display board
    

                    if(this.currentShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]}     
                    
                    if(this.currentShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]}     
                    
                    if(this.currentShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]}     
                    
                    if(this.currentShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]}     
                    
                    if(this.currentShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]}     
                    
                    if(this.currentShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]}     
                    
                    if(this.currentShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]}     
                    
                    if(this.currentShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]}     
                    
                    if(this.currentShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]}     
                    
                    if(this.currentShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]}     
                    
                    if(this.currentShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]}     

                    if(this.currentShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]}     

                    if(this.currentShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]}     

                    if(this.currentShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]}     

                    if(this.currentShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]}     

                    if(this.currentShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]}     

                    if(this.currentShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]}     

                    if(this.currentShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]}     

                    if(this.currentShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]}     
                    
                    if(this.currentShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]}                      
                    if(this.currentShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]}  
                    
                    if(this.currentShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]}  

                    if(this.currentShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]}  

                    if(this.currentShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]}  

                    
                    if(this.currentShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]}  
                    
                    if(this.currentShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]}

                    if(this.currentShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]}

                    if(this.currentShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]}

                    if(this.currentShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]}

                    if(this.currentShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]}

                    if(this.currentShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]}

                    if(this.currentShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]}

                    if(this.currentShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.currentShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]}

                    if(this.currentShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]}

                    if(this.currentShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]}
                
                
               // now record click
                this.answerCounter = 0;
                // record click

                var el = W.getElementById("gbrd");


                this.clicker2 = function (e){//event listener that receives two words and then ends the step
                    var target = e.target;
                    //var myDiv = W.getElementById("alist");
                    if(target.className.match("button button2")){
        
                        //myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML;
                        node.say('GUESS', node.game.partner, target.innerHTML);
                        node.set({helperChoice : target.innerHTML});
                        node.set({helperChoiceTime : node.timer.getTimeSince('step')})
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
                   
                },
                done: function() {
                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;
                    node.say('GUESS', node.game.partner, choiceTXT);
                    node.set({goalnumber: this.roundCounter+1});
                    node.set({helperID: this.id});
                    node.set({helperRandCode: this.randomCode});
                    node.set({helperMove: 999});
                    node.set({helperQuestion: 999});
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

                    this.verbalGoal = "Move all " + this.goalList[this.roundCounter][0] +  " " + this.goalList[this.roundCounter][1] + "s to room "+ this.goalList[this.roundCounter][2]

                    W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                    W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts),
                    W.setInnerHTML('goal', "Goal: " + this.verbalGoal);

                    if(this.cluespast.length>0){ // if this is not the first turn

                        // here we need to change the positions

                    var moveChoice1 = this.cluespast.at(-1)

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes("move a block from ")){
                        // if the Architect moved
                        W.setInnerHTML('cluepasttxt', "You selected to move a: ");
                        var moveInfo = this.cluespast.at(-1)
                    // remove unwanted characters

                    moveInfo = moveInfo.replace('move a block from ', '');
                    moveInfo = moveInfo.replace('circle', '');
                    
                    //var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = moveInfo.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                    var moved_color = this.currentConfiguration[moveFromID]
                    var moved_shape = this.currentShape[moveFromID]

                    // need to figure out room
                    var movedfrom_room = "X"
                    if([0,1,12,13,24,25].includes(moveFromID)){movedfrom_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveFromID)) {movedfrom_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveFromID)) {movedfrom_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveFromID)) {movedfrom_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveFromID)) {movedfrom_room = "C1"}
                    else {movedfrom_room = "C2"}

                    var movedto_room = "X"
                    if([0,1,12,13,24,25].includes(moveToID)){movedto_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveToID)) {movedto_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveToID)) {movedto_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveToID)) {movedto_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveToID)) {movedto_room = "C1"}
                    else {movedto_room = "C2"}
                    
                    W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room+  " to room " + movedto_room);


                  //moveToID becomes the color of moveFromID
                    this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.currentConfiguration[moveFromID] = "white"

                    // change shapes also

                    this.currentShape[moveToID]  = this.currentShape[moveFromID]


                    }    // close the movement if
                    
                    else{  

                    var qplusa = this.cluespast.at(-1)
                    var q = qplusa.split('---')[0]
                    W.setInnerHTML('cluepasttxt', "The Helper asked you: <span style='color:red;'>"+ q + "</span>. You responded with: ");
                    var a = qplusa.split('---')[1]
                    W.setInnerHTML('cluepast', this.yesno[a]);
                        
                        
                }


                    }

                    if(this.currentShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]}     
                    
                    if(this.currentShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]}     
                    
                    if(this.currentShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]}     
                    
                    if(this.currentShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]}     
                    
                    if(this.currentShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]}     
                    
                    if(this.currentShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]}     
                    
                    if(this.currentShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]}     
                    
                    if(this.currentShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]}     
                    
                    if(this.currentShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]}     
                    
                    if(this.currentShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]}     
                    
                    if(this.currentShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]}     

                    if(this.currentShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]}     

                    if(this.currentShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]}     

                    if(this.currentShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]}     

                    if(this.currentShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]}     

                    if(this.currentShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]}     

                    if(this.currentShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]}     

                    if(this.currentShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]}     

                    if(this.currentShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]}     
                    
                    if(this.currentShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]}                      
                    if(this.currentShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]}  
                    
                    if(this.currentShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]}  

                    if(this.currentShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]}  

                    if(this.currentShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]}  

                    
                    if(this.currentShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]}  
                    
                    if(this.currentShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]}

                    if(this.currentShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]}

                    if(this.currentShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]}

                    if(this.currentShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]}

                    if(this.currentShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]}

                    if(this.currentShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]}

                    if(this.currentShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]}

                    if(this.currentShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.currentShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]}

                    if(this.currentShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]}

                    if(this.currentShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]}

                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                        if (msg.data == "I'll help!"){
                        W.setInnerHTML('helperChoice', "The helper has chosen to help!"); 
                        }
                        else if(msg.data == "Ask a yes/no question"){
                        W.setInnerHTML('helperChoice', "The helper is asking you a question."); }
                        
                        this.cluespast.push(that.clueReceived);
                        node.done();
                    });
                    
                },
                done: function() {
                    node.say('GUESS', node.game.partner);
                    //node.on.data('GUESS', function(msg) {
                      //  that.clueReceived = msg.data;
                    //});
                    node.set({goalnumber: this.roundCounter+1});
                    node.set({architectID: this.id});
                    node.set({architectRandCode: this.randomCode});
                    node.set({architectMove: 999});
                    node.set({architectAnswer: 999});
                    return;
                }
            }
        }
    });

    stager.extendStep('helperAction', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            //helper is the cluegiver
            CLUEGIVER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                frame: 'helperActiondisplay.htm',
                donebutton: false,
                cb: function() {

                    if(this.currentShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]}     
                    
                    if(this.currentShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]}     
                    
                    if(this.currentShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]}     
                    
                    if(this.currentShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]}     
                    
                    if(this.currentShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]}     
                    
                    if(this.currentShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]}     
                    
                    if(this.currentShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]}     
                    
                    if(this.currentShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]}     
                    
                    if(this.currentShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]}     
                    
                    if(this.currentShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]}     
                    
                    if(this.currentShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]}     

                    if(this.currentShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]}     

                    if(this.currentShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]}     

                    if(this.currentShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]}     

                    if(this.currentShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]}     

                    if(this.currentShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]}     

                    if(this.currentShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]}     

                    if(this.currentShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]}     

                    if(this.currentShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]}     
                    
                    if(this.currentShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]}                      
                    if(this.currentShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]}  
                    
                    if(this.currentShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]}  

                    if(this.currentShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]}  

                    if(this.currentShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]}  

                    
                    if(this.currentShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]}  
                    
                    if(this.currentShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]}

                    if(this.currentShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]}

                    if(this.currentShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]}

                    if(this.currentShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]}

                    if(this.currentShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]}

                    if(this.currentShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]}

                    if(this.currentShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]}

                    if(this.currentShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.currentShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]}

                    if(this.currentShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]}

                    if(this.currentShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]}

                W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts);
                
                
                
                var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate
                var question = 1;
                    
            if(["I'll help!"].includes(choiceTXT)){
                   
                

                W.setInnerHTML("clue2", "You chose to help the architect. You may now drag and drop ONE unobstructed block to any location. Click Continue when you are done.")
                var dragid = 0;
                var dropid = 0;
                var total = 0;
                var dragtarget = W.getElementById("blocks");

                var drag_count = 0;

                
                // not all items should be "draggable" in the table
                // we could check for whether there is anything non-white above a particular index
                

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

                var droptarget = W.getElementById("blocks"); 
                // need to make this only some specific drag choices
                // could try to filter for only "white" cells

                var filtereddropIndices = this.currentConfiguration.reduce(function(a, e, i) {
                    if (e === 'white')
                        a.push(i);
                    return a;
                }, []);
                console.log("filtereddropIndices="+filtereddropIndices);

                // ultimately we want to further restrict this to only white cells that
                // have something non-white below them

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

                var circlefilteredDropTableIDs = filteredDropTableIDs.map(i => 'circle' + i);

                console.log("filteredDropTableIDs="+filteredDropTableIDs);
                console.log("circlefilteredDropTableIDs="+circlefilteredDropTableIDs);

                var totalDropIDs = filteredDropTableIDs.concat(circlefilteredDropTableIDs);

                console.log("totalDropIDs="+totalDropIDs);

                // we restrict dropping to these "white" cells only

                

                dragtarget.addEventListener('dragstart', dragStart);
                droptarget.addEventListener('dragenter', dragEnter)
                droptarget.addEventListener('dragover', dragOver);
                droptarget.addEventListener('dragleave', dragLeave);
                droptarget.addEventListener('drop', drop);
                

                    function dragStart(e) {
                        
                        if(drag_count == 0){
                        if(filteredDragTableIDs.includes(e.target.id)){
                        console.log('drag starts...');
                        
                        console.log('targetid='+e.target.id);
                        e.dataTransfer.setData('text/plain', e.target.id);
                        e.target.style.opacity = .7;

                        
                        //setTimeout(() => {
                          //  e.target.classList.add('hide');
                        //}, 1000);
                        }
                        else{alert("You can only drag/drop ONE unobstructed block on a turn!");}

                        }
                        }
                    function dragEnter(e) {

                        if(drag_count == 0){
                        if(totalDropIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                        }
                    }
                    
                    }

                    function dragOver(e) {

                        if(drag_count == 0){

                        if(totalDropIDs.includes(e.target.id)){
                        e.preventDefault();
                        e.target.classList.add('drag-over');
                        }
                    }
                    
                    }

                    function dragLeave(e) {
                        if(drag_count == 0){
                        if(totalDropIDs.includes(e.target.id)){
                        e.target.classList.remove('drag-over');
                        }
                    }
                    
                    }
                    function drop(e) {

                        if(drag_count == 0){

                        if(totalDropIDs.includes(e.target.id)){
                        
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
                        //draggable.classList.remove('hide');
                        
                        node.game.doneButton.enable(); // only enable when we have a valid drop location
                        drag_count = 1
                        console.log("drag_count"+drag_count);
                        question == 0;
                        // call the function that records these move IDs
                        setTotalValue();
                        }

                        }
                        else{alert("You can only drag/drop ONE unobstructed block on a turn!");}
                    
                        
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

               

                // player could also choose to ask a question or pass
                // in which case we need a different event listener
            }
                    
            else if(["Ask a yes/no question"].includes(choiceTXT)){

                node.once('PLAYING', function() {
                    node.game.doneButton.enable();
                    });

                this.clueGive2 = node.widgets.append('CustomInput', W.gid('containerbottom2'), {//apend customInput widget with 1 mandatory input
                       id: 'clueGive',
                       mainText: 'Enter your yes/no question here:',
                       type: 'text',
                       className: 'centered',
                       requiredChoice: true
                      
                   });
                        
            }
                    else{
                      node.done();
                    }
                
                    
                },
                done: function() {//send clue to other player and clue and time info to database
                    

                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate

                    if(["Ask a yes/no question"].includes(choiceTXT)){

                    this.cluespast.push(this.clueGive2.getValues().value);
                    node.set({helperQuestion: this.clueGive2.getValues().value}); 
                    node.set({helperMove: 999}); 
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

                        node.set({helperMove: choiceTXT});
                        node.set({helperQuestion: 999});

                    node.say('CLUE', node.game.partner, choiceTXT);

                    }

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

                    W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                    W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts),
                    this.verbalGoal = "Move all " + this.goalList[this.roundCounter][0] +  " " + this.goalList[this.roundCounter][1] + "s to room "+ this.goalList[this.roundCounter][2]

                    W.setInnerHTML('goal', "Goal: " + this.verbalGoal);

                    if(this.currentShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]}     
                    
                    if(this.currentShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]}     
                    
                    if(this.currentShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]}     
                    
                    if(this.currentShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]}     
                    
                    if(this.currentShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]}     
                    
                    if(this.currentShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]}     
                    
                    if(this.currentShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]}     
                    
                    if(this.currentShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]}     
                    
                    if(this.currentShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]}     
                    
                    if(this.currentShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]}     
                    
                    if(this.currentShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]}     

                    if(this.currentShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]}     

                    if(this.currentShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]}     

                    if(this.currentShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]}     

                    if(this.currentShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]}     

                    if(this.currentShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]}     

                    if(this.currentShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]}     

                    if(this.currentShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]}     

                    if(this.currentShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]}     
                    
                    if(this.currentShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]}                      
                    if(this.currentShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]}  
                    
                    if(this.currentShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]}  

                    if(this.currentShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]}  

                    if(this.currentShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]}  

                    
                    if(this.currentShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]}  
                    
                    if(this.currentShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]}

                    if(this.currentShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]}

                    if(this.currentShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]}

                    if(this.currentShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]}

                    if(this.currentShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]}

                    if(this.currentShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]}

                    if(this.currentShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]}

                    if(this.currentShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.currentShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]}

                    if(this.currentShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]}

                    if(this.currentShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]}

                    
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

                W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts)

                    //could use cluespast here

                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate

                    if(["Ask a yes/no question"].includes(choiceTXT)){ 
                        W.setInnerHTML('cluepasttxt', "You chose to ask a question: ");
                        W.setInnerHTML('cluepast',  this.cluespast.at(-1));
                        
                    }

                    else if(["Pass"].includes(choiceTXT)){
                    W.setInnerHTML('cluepasttxt', "You chose to pass your turn.");
                    }
                    else{
                    W.setInnerHTML('cluepasttxt', "You chose to move a: ");
                    
                    // get the latest value from cluespast
                    // it will be of the form 
                    // total = "move a block from rowXcellXY to rowXcellXY" OR
                    // total = "move a block from circlerowXcellXY to circlerowXcellXY"

                    var moveInfo = this.cluespast.at(-1)
                    // remove unwanted characters

                    moveInfo = moveInfo.replace('move a block from ', '');
                    moveInfo = moveInfo.replace('circle', '');
                    
                    //var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = moveInfo.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                    var moved_color = this.currentConfiguration[moveFromID]
                    var moved_shape = this.currentShape[moveFromID]

                    // need to figure out room
                    var movedfrom_room = "X"
                    if([0,1,12,13,24,25].includes(moveFromID)){movedfrom_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveFromID)) {movedfrom_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveFromID)) {movedfrom_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveFromID)) {movedfrom_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveFromID)) {movedfrom_room = "C1"}
                    else {movedfrom_room = "C2"}

                    var movedto_room = "X"
                    if([0,1,12,13,24,25].includes(moveToID)){movedto_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveToID)) {movedto_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveToID)) {movedto_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveToID)) {movedto_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveToID)) {movedto_room = "C1"}
                    else {movedto_room = "C2"}
                    
                    W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room+  " to room " + movedto_room);

                  //moveToID becomes the color of moveFromID
                    this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.currentConfiguration[moveFromID] = "white"

                    // we also change the shapes accordingly
                    this.currentShape[moveToID] = this.currentShape[moveFromID]
                    this.currentShape[moveFromID] = "square"

                        // having made changes to currentConfiguration & currentShape, now make the table
                    }

                    // now present the configuration

                    if(this.currentShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]}     
                    
                    if(this.currentShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]}     
                    
                    if(this.currentShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]}     
                    
                    if(this.currentShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]}     
                    
                    if(this.currentShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]}     
                    
                    if(this.currentShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]}     
                    
                    if(this.currentShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]}     
                    
                    if(this.currentShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]}     
                    
                    if(this.currentShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]}     
                    
                    if(this.currentShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]}     
                    
                    if(this.currentShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]}     

                    if(this.currentShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]}     

                    if(this.currentShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]}     

                    if(this.currentShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]}     

                    if(this.currentShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]}     

                    if(this.currentShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]}     

                    if(this.currentShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]}     

                    if(this.currentShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]}     

                    if(this.currentShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]}     
                    
                    if(this.currentShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]}                      
                    if(this.currentShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]}  
                    
                    if(this.currentShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]}  

                    if(this.currentShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]}  

                    if(this.currentShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]}  

                    
                    if(this.currentShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]}  
                    
                    if(this.currentShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]}

                    if(this.currentShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]}

                    if(this.currentShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]}

                    if(this.currentShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]}

                    if(this.currentShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]}

                    if(this.currentShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]}

                    if(this.currentShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]}

                    if(this.currentShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.currentShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]}

                    if(this.currentShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]}

                    if(this.currentShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]}


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
                    node.say('ANSWER', node.game.partner);
                    node.on.data('ANSWER', function(msg) {
                        that.guessesReceived = msg.data;
                    });
                    node.set({architectID: this.id});
                    node.set({architectRandCode: this.randomCode});
                    return;
            }

                
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                donebutton: false,
                
                cb: function() {

                    // here we want to tell the architect what the Helper did and also change the block positions

                    var moveChoice1 = this.clueReceived
                    W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                    W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts),
                    this.verbalGoal = "move all " + this.goalList[this.roundCounter][0] +  " " + this.goalList[this.roundCounter][1] + "s to room "+ this.goalList[this.roundCounter][2]

                    W.setInnerHTML('goal', "Goal: " + this.verbalGoal);

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

            if (moveChoice1.includes("move a block from ") || moveChoice1.includes("Pass")){

                if (moveChoice1.includes("move a block from ")){

                    W.setInnerHTML('cluepasttxt', "The helper selected to move a: ");
                    var moveInfo = this.cluespast.at(-1)
                    // remove unwanted characters

                    moveInfo = moveInfo.replace('move a block from ', '');
                    moveInfo = moveInfo.replace('circle', '');
                    
                    //var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = moveInfo.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    

                
                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                    var moved_color = this.currentConfiguration[moveFromID]
                    var moved_shape = this.currentShape[moveFromID]

                    // need to figure out room
                    var movedfrom_room = "X"
                    if([0,1,12,13,24,25].includes(moveFromID)){movedfrom_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveFromID)) {movedfrom_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveFromID)) {movedfrom_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveFromID)) {movedfrom_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveFromID)) {movedfrom_room = "C1"}
                    else {movedfrom_room = "C2"}

                    var movedto_room = "X"
                    if([0,1,12,13,24,25].includes(moveToID)){movedto_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveToID)) {movedto_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveToID)) {movedto_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveToID)) {movedto_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveToID)) {movedto_room = "C1"}
                    else {movedto_room = "C2"}
                    
                    W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room+  " to room " + movedto_room);


                  //moveToID becomes the color of moveFromID
                    this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.currentConfiguration[moveFromID] = "white"

                        // we also change the shapes accordingly
                    this.currentShape[moveToID] = this.currentShape[moveFromID]
                    this.currentShape[moveFromID] = "square"
                }
                    else {// pass
                        W.setInnerHTML('cluepasttxt', "The helper chose to pass their turn.");
                    }
                        // after seeing new block configuration, the architect makes their move

                        // now architect moves blocks

                        var dragid = 0;
                        var dropid = 0;
                        var total = 0;
                        var dragtarget = W.getElementById("gbrd");
                        // not all items should be "draggable" in the table
                        // we could check for whether there is anything non-white above a particular index
                        dragtarget.addEventListener('dragstart', dragStart);

                        var drag_count = 0;
        
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

                        var circlefilteredDropTableIDs = filteredDropTableIDs.map(i => 'circle' + i);

                        console.log("filteredDropTableIDs="+filteredDropTableIDs);
                        console.log("circlefilteredDropTableIDs="+circlefilteredDropTableIDs);

                        var totalDropIDs = filteredDropTableIDs.concat(circlefilteredDropTableIDs);

                        console.log("totalDropIDs="+totalDropIDs);
        
                        // we restrict dropping to these "white" cells only
        
                        droptarget.addEventListener('dragenter', dragEnter)
                        droptarget.addEventListener('dragover', dragOver);
                        droptarget.addEventListener('dragleave', dragLeave);
                        droptarget.addEventListener('drop', drop);
        
                            function dragStart(e) {
                                if(drag_count == 0){
                                if(filteredDragTableIDs.includes(e.target.id)){
                                console.log('drag starts...');
                                e.dataTransfer.setData('text/plain', e.target.id);
                                e.target.style.opacity = .7;
                                //setTimeout(() => {
                                  //  e.target.classList.add('hide');
                                //}, 0);
        
                                }
                                else{alert('You can only drag/drop ONE unobstructed block each turn!')}
                                }
                                
                            }
                            function dragEnter(e) {
                                if(drag_count == 0){
                                if(totalDropIDs.includes(e.target.id)){
                                e.preventDefault();
                                e.target.classList.add('drag-over');
                                }
                            }
                        }
        
                            function dragOver(e) {
                                if(drag_count == 0){
                                if(totalDropIDs.includes(e.target.id)){
                                e.preventDefault();
                                e.target.classList.add('drag-over');
                                }
                            }
                        }
        
                            function dragLeave(e) {
                                if(drag_count == 0){
                                if(totalDropIDs.includes(e.target.id)){
                                e.target.classList.remove('drag-over');
                                }
                            }
                        }
                            function drop(e) {

                                if(drag_count == 0){
        
                                if(totalDropIDs.includes(e.target.id)){
                                
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
                                node.game.doneButton.enable(); // only enable when we have a valid drop location
                                drag_count = 1
                                console.log("drag_count"+drag_count);

                            
                                // display the draggable element
                                draggable.classList.remove('hide');
                                // call the function that records these move IDs
                                setTotalValue();
                                }
                                
                            } 
                            else{alert('You can only drag/drop ONE unobstructed block each turn!')}  
                            
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
                        W.setInnerHTML('cluepasttxt', "The helper has asked you a question: ");
                        W.setInnerHTML('clue2', "");
                        W.setInnerHTML('cluepast', moveChoice1 ); 

                        

                        // if they selected a question, then keep display the same as initial

                        
                        // after question has been displayed, architect responds with yes/no

                        this.yesNoArchitect = node.widgets.append('ChoiceTable', W.gid('containerbottom2'), {
                            id: 'yesno',
                            mainText: "Select your response to the Helper's question:",
                            choices: [
                                '<button  class="button button2">Yes</button>',
                                        '<button  class="button button2">No</button>',
                            ],
                            title: false,
                            requiredChoice: true,
                            onclick: function(){node.done()}
                        });
                        
                    }

                    // display config in all cases

                    if(this.currentShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.currentConfiguration[0]}     
                    
                    if(this.currentShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.currentConfiguration[1]}     
                    
                    if(this.currentShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.currentConfiguration[2]}     
                    
                    if(this.currentShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.currentConfiguration[3]}     
                    
                    if(this.currentShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.currentConfiguration[4]}     
                    
                    if(this.currentShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.currentConfiguration[5]}     
                    
                    if(this.currentShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.currentConfiguration[6]}     
                    
                    if(this.currentShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.currentConfiguration[7]}     
                    
                    if(this.currentShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.currentConfiguration[8]}     
                    
                    if(this.currentShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]}     
                    
                    if(this.currentShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]}     

                    if(this.currentShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.currentConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]}     

                    if(this.currentShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.currentConfiguration[12]}     

                    if(this.currentShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.currentConfiguration[13]}     

                    if(this.currentShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.currentConfiguration[14]}     

                    if(this.currentShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.currentConfiguration[15]}     

                    if(this.currentShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.currentConfiguration[16]}     

                    if(this.currentShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.currentConfiguration[17]}     

                    if(this.currentShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.currentConfiguration[18]}     
                    
                    if(this.currentShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.currentConfiguration[19]}                      
                    if(this.currentShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.currentConfiguration[20]}  
                    
                    if(this.currentShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]}  

                    if(this.currentShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]}  

                    if(this.currentShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.currentConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]}  

                    
                    if(this.currentShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.currentConfiguration[24]}  
                    
                    if(this.currentShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.currentConfiguration[25]}

                    if(this.currentShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.currentConfiguration[26]}

                    if(this.currentShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.currentConfiguration[27]}

                    if(this.currentShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.currentConfiguration[28]}

                    if(this.currentShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.currentConfiguration[29]}

                    if(this.currentShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.currentConfiguration[30]}

                    if(this.currentShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.currentConfiguration[31]}

                    if(this.currentShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.currentShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]}

                    if(this.currentShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]}

                    if(this.currentShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.currentConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]}


                },
                done: function() {
                    // need to store the values being generated

                    var moveChoice1 = this.clueReceived

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes("move a block from ")) {
                        // if there was a move from the helper
                    // then there will also be a move from the guesser which we need to record
                    // get total value
                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate

                    this.cluespast.push(choiceTXT);

                    node.set({architectMove: choiceTXT});

                    node.say('ANSWER', node.game.partner, choiceTXT);

                    }

                    else if(moveChoice1.includes("Pass")){
                        // get total value
                        var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate
                        this.cluespast.push(choiceTXT);
                        node.set({architectMove: choiceTXT});
                    node.say('ANSWER', node.game.partner, choiceTXT);
                    }

                    else{

                    
                    var answer = this.yesNoArchitect.getValues().choice
                    var question_plus_answer = moveChoice1 + "---" + answer
                    this.cluespast.push(question_plus_answer);

                    node.set({architectAnswer: this.yesno[answer]});

                    node.say('ANSWER', node.game.partner, question_plus_answer);

                    }
                    return;
 
                }
            }
        }
    });
    
    stager.extendStep('feedbackprac', {//tells each player whether the guesser was successful
        role: function() { return this.role; },
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                    
                },
                donebutton: true,
                frame: 'helperActiondisplay.htm',
                cb: function() {

                    var moveChoice1 = this.cluespast.at(-1)

                W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts);
                    //W.setInnerHTML('clue2', "Please select whether you want to help, ask the architect a yes/no question, or pass." )

                    // moveChoice will either be a question string or of the form "rowXcellXY MoveBlockTo rowXcellXY" or "Pass"

                    if (moveChoice1.includes("move a block from ")){

                    W.setInnerHTML('cluepasttxt', "The Architect has moved a: ");
                        // if the Architect moved
                    var moveInfo = this.cluespast.at(-1)
                    // remove unwanted characters

                    moveInfo = moveInfo.replace('move a block from ', '');
                    moveInfo = moveInfo.replace('circle', '');
                    
                    //var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = moveInfo.split(" to ");
                    
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                    var moved_color = this.currentConfiguration[moveFromID]
                    var moved_shape = this.currentShape[moveFromID]

                    // need to figure out room
                    var movedfrom_room = "X"
                    if([0,1,12,13,24,25].includes(moveFromID)){movedfrom_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveFromID)) {movedfrom_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveFromID)) {movedfrom_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveFromID)) {movedfrom_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveFromID)) {movedfrom_room = "C1"}
                    else {movedfrom_room = "C2"}

                    var movedto_room = "X"
                    if([0,1,12,13,24,25].includes(moveToID)){movedto_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveToID)) {movedto_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveToID)) {movedto_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveToID)) {movedto_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveToID)) {movedto_room = "C1"}
                    else {movedto_room = "C2"}
                    
                    W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room+  " to room " + movedto_room);
                    console.log("inside feedback, color=" + moved_color + ", shape = "+moved_shape + " room" + movedfrom_room + movedto_room);

                    this.feedbackConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));
                    this.feedbackShape = JSON.parse(JSON.stringify(this.currentShape));


                  //moveToID becomes the color of moveFromID
                    this.feedbackConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.feedbackConfiguration[moveFromID] = "white"

                    // change shapes also

                    this.feedbackShape[moveToID]  = this.currentShape[moveFromID]


                    }    // close the movement if
                    
                    else{  

                    this.feedbackConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));
                    this.feedbackShape = JSON.parse(JSON.stringify(this.currentShape));

                    var qplusa = this.cluespast.at(-1)
                    var q = qplusa.split('---')[0]
                    W.setInnerHTML('cluepasttxt', "The Helper asked you: <span style='color:red;'>"+ q + "</span>. You responded with: ");
                    var a = qplusa.split('---')[1]
                    W.setInnerHTML('cluepast', this.yesno[a]);
                        
                        
                }
                    // config needs to change based on previous step

                    

                    if(this.feedbackShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.feedbackConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.feedbackConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.feedbackConfiguration[0]}     
                    
                    if(this.feedbackShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.feedbackConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.feedbackConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.feedbackConfiguration[1]}     
                    
                    if(this.feedbackShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.feedbackConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.feedbackConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.feedbackConfiguration[2]}     
                    
                    if(this.feedbackShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.feedbackConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.feedbackConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.feedbackConfiguration[3]}     
                    
                    if(this.feedbackShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.feedbackConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.feedbackConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.feedbackConfiguration[4]}     
                    
                    if(this.feedbackShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.feedbackConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.feedbackConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.feedbackConfiguration[5]}     
                    
                    if(this.feedbackShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.feedbackConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.feedbackConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.feedbackConfiguration[6]}     
                    
                    if(this.feedbackShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.feedbackConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.feedbackConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.feedbackConfiguration[7]}     
                    
                    if(this.feedbackShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.feedbackConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.feedbackConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.feedbackConfiguration[8]}     
                    
                    if(this.feedbackShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.feedbackConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.feedbackConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.feedbackConfiguration[9]}     
                    
                    if(this.feedbackShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.feedbackConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.feedbackConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.feedbackConfiguration[10]}     

                    if(this.feedbackShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.feedbackConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.feedbackConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.feedbackConfiguration[11]}     

                    if(this.feedbackShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.feedbackConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.feedbackConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.feedbackConfiguration[12]}     

                    if(this.feedbackShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.feedbackConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.feedbackConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.feedbackConfiguration[13]}     

                    if(this.feedbackShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.feedbackConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.feedbackConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.feedbackConfiguration[14]}     

                    if(this.feedbackShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.feedbackConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.feedbackConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.feedbackConfiguration[15]}     

                    if(this.feedbackShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.feedbackConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.feedbackConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.feedbackConfiguration[16]}     

                    if(this.feedbackShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.feedbackConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.feedbackConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.feedbackConfiguration[17]}     

                    if(this.feedbackShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.feedbackConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.feedbackConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.feedbackConfiguration[18]}     
                    
                    if(this.feedbackShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.feedbackConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.feedbackConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.feedbackConfiguration[19]}                      
                    if(this.feedbackShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.feedbackConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.feedbackConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.feedbackConfiguration[20]}  
                    
                    if(this.feedbackShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.feedbackConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.feedbackConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.feedbackConfiguration[21]}  

                    if(this.feedbackShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.feedbackConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.feedbackConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.feedbackConfiguration[22]}  

                    if(this.feedbackShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.feedbackConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.feedbackConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.feedbackConfiguration[23]}  

                    
                    if(this.feedbackShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.feedbackConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.feedbackConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.feedbackConfiguration[24]}  
                    
                    if(this.feedbackShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.feedbackConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.feedbackConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.feedbackConfiguration[25]}

                    if(this.feedbackShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.feedbackConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.feedbackConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.feedbackConfiguration[26]}

                    if(this.feedbackShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.feedbackConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.feedbackConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.feedbackConfiguration[27]}

                    if(this.feedbackShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.feedbackConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.feedbackConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.feedbackConfiguration[28]}

                    if(this.feedbackShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.feedbackConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.feedbackConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.feedbackConfiguration[29]}

                    if(this.feedbackShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.feedbackConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.feedbackConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.feedbackConfiguration[30]}

                    if(this.feedbackShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.feedbackConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.feedbackConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.feedbackConfiguration[31]}

                    if(this.feedbackShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.feedbackShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.feedbackConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.feedbackConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.feedbackConfiguration[33]}

                    if(this.feedbackShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.feedbackConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.feedbackConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.feedbackConfiguration[34]}

                    if(this.feedbackShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.feedbackConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.feedbackConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.feedbackConfiguration[35]}

                  
                      // we now figure out if the number of random_color items in the goalindices == 3

                    // get the relevant indices of the room out of currentConfiguration and currentShape

                    const checker_color = this.goalindices.map(x=>this.feedbackConfiguration[x]);
                    const checker_shape = this.goalindices.map(x=>this.feedbackShape[x]);

                    var roomContents = [checker_color, checker_shape].reduce((a, b) => a.map((v, i) => v  + b[i]));

                    // create a "combo": "redcircle"

                    var goal_combo = this.goalList[this.roundCounter][0].concat(this.goalList[this.roundCounter][1])

                    // count how often the goal_combo occurs in roomContents
                    const combo_occurrences = roomContents.filter(x => x === goal_combo).length
                    

                    console.log("goal color ="+this.random_color);
                    console.log("goal shape ="+this.random_shape);
                    console.log("goal room ="+this.random_room);
                    console.log("goalindices ="+this.goalindices);
                    console.log("goal_combo ="+goal_combo);

                    console.log("roomContents ="+roomContents);
                    
                    console.log("combo_occurrences in goalConfig ="+combo_occurrences);


                    var myDiv = W.getElementById("containerbottom2");
                    var myDiv2 = W.getElementById("containerbottom3");
                    this.verbalGoal = "move all " + this.goalList[this.roundCounter][0] +  " " + this.goalList[this.roundCounter][1] + "s to room "+ this.goalList[this.roundCounter][2]
                    if(combo_occurrences == 3){//if the target color boxes were moved to the right room
                        myDiv.innerHTML = "The goal was to: " + this.verbalGoal + ". The goal has been achieved!!";
                        myDiv2.innerHTML = "You will now move on to the next goal. Please click Done.";
                        //myDiv3.innerHTML = "";
                        node.say('ACHIEVED','SERVER', 1);

                        
                        node.set({goalSuccess: 1});

                        this.roundCounter += 1;
                        this.currentConfiguration = this.initialConfiguration
                        //this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        //if(this.roundCounter%3 == 0){
                        //    myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        //}
                        //var j;
                        this.cluespast = []
                        //for(j=0; j < this.attempts; j++){
                         //   this.cluespast.pop();
                        //}
                        this.attempts = 0;

                        if(this.roundCounter == this.goalnumber){//if the next value is equal to number of goals then we are out of goals and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    /*
                    else if(this.attempts == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var m;
                        for(m=0; m < this.attempts; m++){
                            this.cluespast.pop();
                        }
                        this.attempts = 0;

                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    */
                    else{//if they are wrong and it isn't the third trial players get another chance
                       //myDiv.innerHTML = "The goal has not been achieved. Keep going..."
                        //myDiv2.innerHTML = "You will now choose a different clue for the same word pair. Please click Done.";
                        //myDiv3.innerHTML = "";
                        
                        node.say('ACHIEVED','SERVER', 0);
                        node.set({goalSuccess: 0});
                        this.attempts += 1;
                        W.setInnerHTML("clue2", "");
                        node.done(); 
                    }
                },
                done:  function(){

                    node.say('GUESS', node.game.partner);
                    return;
                }
            },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: true,//disable done button so they cannot proceed without their partner finishing
                frame: 'studyboard.htm',
                cb: function() {//set the board for the guesser
                    W.setInnerHTML('step', "Problem: "+Number(this.roundCounter+1) + " of " + this.goalnumber),
                W.setInnerHTML('attempts', "Attempt:"+ Number(this.attempts+1) +" of "+this.max_attempts),
                    this.verbalGoal = "move all " + this.goalList[this.roundCounter][0] +  " " + this.goalList[this.roundCounter][1] + "s to room "+ this.goalList[this.roundCounter][2]

                    W.setInnerHTML("goal", "Goal:"+this.verbalGoal)

                    // here we need to change the positions

                    var moveChoice1 = this.cluespast.at(-1)

                    

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes("move a block from ")){
                        // if the Architect moved
                        W.setInnerHTML('cluepasttxt', "You selected to move a: ");
                        var moveInfo = this.cluespast.at(-1)
                    // remove unwanted characters

                    moveInfo = moveInfo.replace('move a block from ', '');
                    moveInfo = moveInfo.replace('circle', '');
                    
                    //var choiceString = moveInfo.substr(moveInfo.length - 24); 
                    var moveChoice = moveInfo.split(" to ");
                    // now moveChoice contains "row1cell01" and "row2cell02"
                    var moveChoice_from = moveChoice[0];

                    var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

                    var row_from = Number(moveChoice_from.charAt(3)) // rowX
                    var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
                    

                    var row_to= Number(moveTo.charAt(3)) // rowX
                    var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

                    

                    // once we have the row/cell to/from, we change the current configuration of those specific cell
                    
                    // for each row increment, there is a +12 in index
                    // for each cell increment, there is +1 in index
                    // row1cell01 = (row-1)*12 + (cell-1) =  0 + 0
                    // row2cell01 = (2-1)*12 + (cell -1 ) =  12 + 0
                    // row3cell4 = (3-1)*12 + (4-1) = 24 + 3 = 27
  

                    var moveFromID = (row_from-1)*12 + (cell_from-1)
                    var moveToID = (row_to-1)*12 + (cell_to-1)

                    var moved_color = this.currentConfiguration[moveFromID]
                    var moved_shape = this.currentShape[moveFromID]

                    // need to figure out room
                    var movedfrom_room = "X"
                    if([0,1,12,13,24,25].includes(moveFromID)){movedfrom_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveFromID)) {movedfrom_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveFromID)) {movedfrom_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveFromID)) {movedfrom_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveFromID)) {movedfrom_room = "C1"}
                    else {movedfrom_room = "C2"}

                    var movedto_room = "X"
                    if([0,1,12,13,24,25].includes(moveToID)){movedto_room = "A1"}
                    else if([2,3,14,15,26,27].includes(moveToID)) {movedto_room = "A2"}
                    else if([4,5,16,17,28,29].includes(moveToID)) {movedto_room = "B1"}
                    else if([6,7,18,19,30,31].includes(moveToID)) {movedto_room = "B2"}
                    else if([8,9, 20,21, 32,33].includes(moveToID)) {movedto_room = "C1"}
                    else {movedto_room = "C2"}
                    
                    W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room+  " to room " + movedto_room);

                    this.feedbackConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));
                    this.feedbackShape = JSON.parse(JSON.stringify(this.currentShape));


                  //moveToID becomes the color of moveFromID
                    this.feedbackConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                    // and moveFromID becomes white
                    this.feedbackConfiguration[moveFromID] = "white"

                    // change shapes also

                    this.feedbackShape[moveToID]  = this.currentShape[moveFromID]


                    }    // close the movement if
                    
                    else{  

                        this.feedbackConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));
                    this.feedbackShape = JSON.parse(JSON.stringify(this.currentShape));

                    var qplusa = this.cluespast.at(-1)
                    var q = qplusa.split('---')[0]
                    W.setInnerHTML('cluepasttxt', "The Helper asked you: <span style='color:red;'>"+ q + "</span>. You responded with: ");
                    var a = qplusa.split('---')[1]
                    W.setInnerHTML('cluepast', this.yesno[a]);
                        
                        
                }
                    // config needs to change based on previous step

                    

                    if(this.feedbackShape[0] == "circle"){
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.feedbackConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell01").style.backgroundColor = this.feedbackConfiguration[0]
                        W.getElementById("row1cell01").style.backgroundColor = this.feedbackConfiguration[0]}     
                    
                    if(this.feedbackShape[1] == "circle"){
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.feedbackConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell02").style.backgroundColor = this.feedbackConfiguration[1]
                        W.getElementById("row1cell02").style.backgroundColor = this.feedbackConfiguration[1]}     
                    
                    if(this.feedbackShape[2] == "circle"){
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.feedbackConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell03").style.backgroundColor = this.feedbackConfiguration[2]
                        W.getElementById("row1cell03").style.backgroundColor = this.feedbackConfiguration[2]}     
                    
                    if(this.feedbackShape[3] == "circle"){
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.feedbackConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell04").style.backgroundColor = this.feedbackConfiguration[3]
                        W.getElementById("row1cell04").style.backgroundColor = this.feedbackConfiguration[3]}     
                    
                    if(this.feedbackShape[4] == "circle"){
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.feedbackConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell05").style.backgroundColor = this.feedbackConfiguration[4]
                        W.getElementById("row1cell05").style.backgroundColor = this.feedbackConfiguration[4]}     
                    
                    if(this.feedbackShape[5] == "circle"){
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.feedbackConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell06").style.backgroundColor = this.feedbackConfiguration[5]
                        W.getElementById("row1cell06").style.backgroundColor = this.feedbackConfiguration[5]}     
                    
                    if(this.feedbackShape[6] == "circle"){
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.feedbackConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell07").style.backgroundColor = this.feedbackConfiguration[6]
                        W.getElementById("row1cell07").style.backgroundColor = this.feedbackConfiguration[6]}     
                    
                    if(this.feedbackShape[7] == "circle"){
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.feedbackConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell08").style.backgroundColor = this.feedbackConfiguration[7]
                        W.getElementById("row1cell08").style.backgroundColor = this.feedbackConfiguration[7]}     
                    
                    if(this.feedbackShape[8] == "circle"){
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.feedbackConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell09").style.backgroundColor = this.feedbackConfiguration[8]
                        W.getElementById("row1cell09").style.backgroundColor = this.feedbackConfiguration[8]}     
                    
                    if(this.feedbackShape[9] == "circle"){
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.feedbackConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell10").style.backgroundColor = this.feedbackConfiguration[9]
                        W.getElementById("row1cell10").style.backgroundColor = this.feedbackConfiguration[9]}     
                    
                    if(this.feedbackShape[10] == "circle"){
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.feedbackConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell11").style.backgroundColor = this.feedbackConfiguration[10]
                        W.getElementById("row1cell11").style.backgroundColor = this.feedbackConfiguration[10]}     

                    if(this.feedbackShape[11] == "circle"){
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.feedbackConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow1cell12").style.backgroundColor = this.feedbackConfiguration[11]
                        W.getElementById("row1cell12").style.backgroundColor = this.feedbackConfiguration[11]}     

                    if(this.feedbackShape[12] == "circle"){
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.feedbackConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell01").style.backgroundColor = this.feedbackConfiguration[12]
                        W.getElementById("row2cell01").style.backgroundColor = this.feedbackConfiguration[12]}     

                    if(this.feedbackShape[13] == "circle"){
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.feedbackConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell02").style.backgroundColor = this.feedbackConfiguration[13]
                        W.getElementById("row2cell02").style.backgroundColor = this.feedbackConfiguration[13]}     

                    if(this.feedbackShape[14] == "circle"){
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.feedbackConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell03").style.backgroundColor = this.feedbackConfiguration[14]
                        W.getElementById("row2cell03").style.backgroundColor = this.feedbackConfiguration[14]}     

                    if(this.feedbackShape[15] == "circle"){
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.feedbackConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell04").style.backgroundColor = this.feedbackConfiguration[15]
                        W.getElementById("row2cell04").style.backgroundColor = this.feedbackConfiguration[15]}     

                    if(this.feedbackShape[16] == "circle"){
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.feedbackConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell05").style.backgroundColor = this.feedbackConfiguration[16]
                        W.getElementById("row2cell05").style.backgroundColor = this.feedbackConfiguration[16]}     

                    if(this.feedbackShape[17] == "circle"){
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.feedbackConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell06").style.backgroundColor = this.feedbackConfiguration[17]
                        W.getElementById("row2cell06").style.backgroundColor = this.feedbackConfiguration[17]}     

                    if(this.feedbackShape[18] == "circle"){
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.feedbackConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell07").style.backgroundColor = this.feedbackConfiguration[18]
                        W.getElementById("row2cell07").style.backgroundColor = this.feedbackConfiguration[18]}     
                    
                    if(this.feedbackShape[19] == "circle"){
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.feedbackConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell08").style.backgroundColor = this.feedbackConfiguration[19]
                        W.getElementById("row2cell08").style.backgroundColor = this.feedbackConfiguration[19]}                      
                    if(this.feedbackShape[20] == "circle"){
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.feedbackConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell09").style.backgroundColor = this.feedbackConfiguration[20]
                        W.getElementById("row2cell09").style.backgroundColor = this.feedbackConfiguration[20]}  
                    
                    if(this.feedbackShape[21] == "circle"){
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.feedbackConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell10").style.backgroundColor = this.feedbackConfiguration[21]
                        W.getElementById("row2cell10").style.backgroundColor = this.feedbackConfiguration[21]}  

                    if(this.feedbackShape[22] == "circle"){
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.feedbackConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell11").style.backgroundColor = this.feedbackConfiguration[22]
                        W.getElementById("row2cell11").style.backgroundColor = this.feedbackConfiguration[22]}  

                    if(this.feedbackShape[23] == "circle"){
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.feedbackConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow2cell12").style.backgroundColor = this.feedbackConfiguration[23]
                        W.getElementById("row2cell12").style.backgroundColor = this.feedbackConfiguration[23]}  

                    
                    if(this.feedbackShape[24] == "circle"){
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.feedbackConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell01").style.backgroundColor = this.feedbackConfiguration[24]
                        W.getElementById("row3cell01").style.backgroundColor = this.feedbackConfiguration[24]}  
                    
                    if(this.feedbackShape[25] == "circle"){
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.feedbackConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
                        W.getElementById("circlerow3cell02").style.backgroundColor = this.feedbackConfiguration[25]
                        W.getElementById("row3cell02").style.backgroundColor = this.feedbackConfiguration[25]}

                    if(this.feedbackShape[26] == "circle"){
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.feedbackConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell03").style.backgroundColor = this.feedbackConfiguration[26]
                        W.getElementById("row3cell03").style.backgroundColor = this.feedbackConfiguration[26]}

                    if(this.feedbackShape[27] == "circle"){
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.feedbackConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell04").style.backgroundColor = this.feedbackConfiguration[27]
                        W.getElementById("row3cell04").style.backgroundColor = this.feedbackConfiguration[27]}

                    if(this.feedbackShape[28] == "circle"){
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.feedbackConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell05").style.backgroundColor = this.feedbackConfiguration[28]
                        W.getElementById("row3cell05").style.backgroundColor = this.feedbackConfiguration[28]}

                    if(this.feedbackShape[29] == "circle"){
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.feedbackConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell06").style.backgroundColor = this.feedbackConfiguration[29]
                        W.getElementById("row3cell06").style.backgroundColor = this.feedbackConfiguration[29]}

                    if(this.feedbackShape[30] == "circle"){
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.feedbackConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell07").style.backgroundColor = this.feedbackConfiguration[30]
                        W.getElementById("row3cell07").style.backgroundColor = this.feedbackConfiguration[30]}

                    if(this.feedbackShape[31] == "circle"){
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.feedbackConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell08").style.backgroundColor = this.feedbackConfiguration[31]
                        W.getElementById("row3cell08").style.backgroundColor = this.feedbackConfiguration[31]}

                    if(this.feedbackShape[32] == "circle"){
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell09").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell09").style.backgroundColor = this.currentConfiguration[32]}

                    if(this.feedbackShape[33] == "circle"){
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.feedbackConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell10").style.backgroundColor = this.feedbackConfiguration[33]
                        W.getElementById("row3cell10").style.backgroundColor = this.feedbackConfiguration[33]}

                    if(this.feedbackShape[34] == "circle"){
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.feedbackConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell11").style.backgroundColor = this.feedbackConfiguration[34]
                        W.getElementById("row3cell11").style.backgroundColor = this.feedbackConfiguration[34]}

                    if(this.feedbackShape[35] == "circle"){
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.feedbackConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = "white"}else{ 
                        W.getElementById("circlerow3cell12").style.backgroundColor = this.feedbackConfiguration[35]
                        W.getElementById("row3cell12").style.backgroundColor = this.feedbackConfiguration[35]}

                  
                    // get the relevant indices of the room out of currentConfiguration and currentShape

                    const checker_color = this.goalindices.map(x=>this.feedbackConfiguration[x]);
                    const checker_shape = this.goalindices.map(x=>this.feedbackShape[x]);

                    var roomContents = [checker_color, checker_shape].reduce((a, b) => a.map((v, i) => v  + b[i]));

                    // create a "combo": "redcircle"

                    var goal_combo = this.goalList[this.roundCounter][0].concat(this.goalList[this.roundCounter][1])

                    // count how often the goal_combo occurs in roomContents
                    const combo_occurrences = roomContents.filter(x => x === goal_combo).length
                    

                    console.log("goal color ="+this.random_color);
                    console.log("goal shape ="+this.random_shape);
                    console.log("goal room ="+this.random_room);
                    console.log("goalindices ="+this.goalindices);
                    console.log("goal_combo ="+goal_combo);

                    console.log("roomContents ="+roomContents);
                    
                    console.log("combo_occurrences in goalConfig ="+combo_occurrences);


                    var myDiv = W.getElementById("containerbottom2");
                    var myDiv2 = W.getElementById("containerbottom3");

                    this.verbalGoal = "move all " + this.goalList[this.roundCounter][0] +  " " + this.goalList[this.roundCounter][1] + "s to room "+ this.goalList[this.roundCounter][2]

                    if(combo_occurrences == 3){//if the target color boxes were moved to the right room
                        myDiv.innerHTML = "The goal was to: " + this.verbalGoal + ". The goal has been achieved!!";
                        myDiv2.innerHTML = "You will now move on to the next goal. Please click Continue.";
                        //myDiv3.innerHTML = "";
                        node.say('ACHIEVED', 'SERVER', 1);
                        node.set({goalSuccess: 1});
                        this.roundCounter += 1;
                        this.currentConfiguration = this.initialConfiguration
                        //this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        //if(this.roundCounter%3 == 0){
                        //    myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        //}
                        //var j;
                        this.cluespast = []
                        //for(j=0; j < this.attempts; j++){
                         //   this.cluespast.pop();
                        //}
                        this.attempts = 0;

                        if(this.roundCounter == this.goalnumber){//if the next value is equal to number of goals then we are out of goals and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    /*
                    else if(this.attempts == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        var m;
                        for(m=0; m < this.attempts; m++){
                            this.cluespast.pop();
                        }
                        this.attempts = 0;

                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    */
                    else{//if they are wrong and it isn't the third trial players get another chance
                        //myDiv.innerHTML = "The goal has not been achieved. Keep going..."
                        //myDiv2.innerHTML = "You will now choose a different clue for the same word pair. Please click Done.";
                        //myDiv3.innerHTML = "";
                        node.say('ACHIEVED','SERVER', 0);
                        node.set({goalSuccess: 0});
                        this.attempts += 1;
                        W.setInnerHTML("clue2", "");
                        node.done(); 
                    }
                    /*

                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                        this.cluespast.push(that.clueReceived);
                        node.done();
                    });

                    */
                },
            done: function() {
                    node.say('GUESS', node.game.partner);
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                    });
                    node.set({architectID: this.id});
                    node.set({architectRandCode: this.randomCode});
                    return;
                }            
            }
        }
    });

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

    
/*
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

    */

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
