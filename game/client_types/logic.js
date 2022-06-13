/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2022 Abhilasha Kumar (kumaraa@iu.edu)
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var J = ngc.JSUS;


function endGameFunc(msg) {//ends the game
    this.LOOP_ENDED = true;
}

function endGameFuncPrac(msg) {//ends the game
    //console.log("ending the game");
    this.LOOP_ENDED_PRAC = true;
}


module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    var channel =  gameRoom.channel;
    let db = node.game.memory;
    let final_config = []

    

    



    stager.extendStage('gameplayprac', {
        init: function() {//create view for results storage
            db.view('gameplayprac', function() {
             return node.game.isStage('gameplayprac');
         });
        }
    });


    stager.extendStep('gameplayprac', {
        
        cb: function(){
            node.on.data('END_GAME', endGameFuncPrac);
        },

        
        
        /*
        matcher: {//assign roles for gameplay
            roles: ['CLUEGIVER','GUESSER'],
            match: 'roundrobin',
            fixedRoles: false
        },
        reconnect: true,
        */

    });

    /*

    stager.extendStep('feedbackprac', {

        cb: function() {//when the server receives the end game msg it runs the end game function

           node.on.data('ACHIEVED', function(msg) {
            ////console.log("inside feedback logic:"+msg.data)
               if (msg.data === 1){node.game.goal = 1}
               else {node.game.goal = 0 }
           }),

            node.on.data('END_GAME', endGameFuncPrac);
        },
        exit: function(){
            db.feedbackprac.save('feedbackprac.csv', {

                // Custom header.
                header: ["helperID", "helperRandCode", "architectID", "architectRandCode","goalnumber", "helperChoice", "helperChoiceTime","helperMove",  "helperQuestion", "architectMove", "architectAnswer", "goalSuccess"],

                // Saves only updates from previous save command.
                updatesOnly: true,

                flatten: true
            });

         }
    });

    */

    

    

    stager.extendStep('rolesAssigned', {
        init: function(){

            // each dyad gets a new set of goals AND a new starting configuration 

            function createConfig(){
                function shuffle(array){
        
                    let currentIndex = array.length,  randomIndex;
                    
                    // While there remain elements to shuffle.
                    while (currentIndex != 0) {
                    
                        // Pick a remaining element.
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex--;
                    
                        // And swap it with the current element.
                        [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                    }
                    
                    return array;
                      
                }

                var red = Array(10).fill("red")
                var blue = Array(10).fill("blue")
                var green = Array(10).fill("green")
                var white = Array(24).fill("white")
        
                var config = red.concat(blue, green, white);
        
                var shuffledArr = shuffle(config)
        
                for (var i = 0; i < 2; i++){
                    for (var e = 0; e < shuffledArr.length; e++) {
                  
                      if (e < 36 && shuffledArr[e] !== "white" && shuffledArr[e + 18] === "white") {
                        shuffledArr[e + 18] = shuffledArr[e];
                        shuffledArr[e] = "white";
                      }
                    }
                  }
                  
    
                ////console.log("config inside logic  = ",shuffledArr)

                var otherWhite = Array(54).fill("white")
                var finalArr = otherWhite.concat(shuffledArr);
                final_config = finalArr;

                
                node.game.pl.each(function(player) {
                    ////console.log("player.id=",player.id)
                    // Get the value saved in the registry and send it.
                    node.say('CONFIG', player.id, finalArr);
                });
            }

            node.on.data('create_config', createConfig);

            function calculateGoals() {

                // separate out move/cover/uncover/clear/full goals

                this.moveGoals = ['move green B2', 'move blue A', 'move green C1', 'move red C','move green C2',
                'move red A1', 'move blue B1', 'move red B1', 'move blue A2', 'move green B', 'move red C1', 
                'move green B1', 'move blue C2', 'move red A', 'move blue A1', 'move green A2',
                'move blue B', 'move red A2', 'move red B', 'move blue C1','move blue B2','move green A1',
                'move red B2',  'move red C2', 'move green A', 'move blue C', 'move green C']

                this.coverGoals = ['cover red all','cover green all', 'cover blue all']
                this.uncoverGoals = [ 'uncover red all', 'uncover green all','uncover blue all']
                this.fillGoals = ['fill nocolor A1','fill nocolor B1','fill nocolor C1','fill nocolor B2', 'fill nocolor A2', 'fill nocolor C2' ]

                this.clearGoals = [ 'clear nocolor C2',  'clear nocolor A1',  'clear nocolor C1',
                    'clear nocolor A2',  'clear nocolor C',
                    'clear nocolor B2', 'clear nocolor B',  
                      'clear nocolor A',   'clear nocolor B1']
    
                function getRandomSubarray(arr, size) {
                    var shuffled = arr.slice(0), i = arr.length, temp, index;
                    while (i--) {
                        index = Math.floor((i + 1) * Math.random());
                        temp = shuffled[index];
                        shuffled[index] = shuffled[i];
                        shuffled[i] = temp;
                    }
                    return shuffled.slice(0, size);
                }

                var moveList = getRandomSubarray(this.moveGoals, 2);
                var coverList = getRandomSubarray(this.coverGoals, 2);
                var uncoverList = getRandomSubarray(this.uncoverGoals, 2);
                var fillList = getRandomSubarray(this.fillGoals, 2);
                var clearList = getRandomSubarray(this.clearGoals, 2);

                // check if these goals have less than 3 optimal moves, and resample if so
                // now that we have the config stored, we can compute the optimal moves for each goal and resample if theres less than 3 moves                

                function findMoveable(){
                    // finds moveable indices in any configuration
                    function reduceDragArray(indexArray, configArray) {
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
                    
                    var fulldragindices= Array(final_config.length).fill().map((x,i)=>i)
                    var validDragargets = reduceDragArray(fulldragindices, final_config)
                    
                    return validDragargets;
                }

                function countObstructions(obstructed, countsamecolor = false, goal_color = []){
                    // given a set of obstructed blocks, count the number of obstructions for each
                    var dict = new Object();
                    for (var i = 0; i < obstructed.length; i++){
                        var o = obstructed[i]
            
                        var row = ~~(o/18);
                        for (var r_i = 1; r_i < row + 1; r_i++){
                            var index = o - (18*r_i)
                            if(index >0){
                                dict[index] = 0
                                if(countsamecolor == false){
                                    if(final_config[index] != "white" && dict[index] == 0){dict[index] = 1}
                                }
                                else{
                                    if(final_config[index] != "white" && dict[index] == 0 && final_config[index] != goal_color){dict[index] = 1}
                                }
                            }
                        }
                    }
            
                    const sumValues = Object.values(dict).reduce((a, b) => a + b, 0)
                    return sumValues
                }

                function optimalMovesfunction(goal){

                    var goal = goal.split(" ")
            

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
                

                    // depending on what the goal is, the checking function does different things
                    var moveable = findMoveable(final_config)
                    const color_relevant = goalindices.filter(x => final_config[x] === color)
                    
                    if(action == "move"){
                        // check which color indices are not in location
                        var allindices = Array.from({length: 108}, (item, index) => index);
                        const color_relevant = allindices.filter(x => final_config[x] === color)
                        //console.log("color_relevant=",color_relevant)
                        var not_in_location = color_relevant.filter(x => !goalindices.includes(x))
                        //console.log("not_in_location=",not_in_location)
                        var obstructed = not_in_location.filter(x => !moveable.includes(x))
                        //console.log("obstructed=",obstructed)
                        var open = not_in_location.filter(x => !obstructed.includes(x))
                        //console.log("open=",open)
                        var num_blockers = countObstructions(obstructed);
                        var optimal = open.length + obstructed.length + num_blockers
            
                    }
                    else if(action == "remove"){
                        //console.log("color_relevant=",color_relevant)
                        var obstructed = color_relevant.filter(x => !moveable.includes(x))
                        //console.log("obstructed=",obstructed)
                        var open = color_relevant.filter(x => !obstructed.includes(x))
                        //console.log("open=",open)
                        var num_blockers = countObstructions(obstructed, true, color);
                        var optimal = open.length + obstructed.length + num_blockers
                    }
                    else if(action == "cover"){
                        //console.log("color_relevant=",color_relevant)
                        var obstructed = color_relevant.filter(x => !moveable.includes(x))
                        //console.log("obstructed=",obstructed)
                        var open = color_relevant.filter(x => !obstructed.includes(x))
                        //console.log("open=",open)
                        var optimal = open.length
                    }
                    else if(action == "uncover"){
                        //console.log("color_relevant=",color_relevant)
                        var obstructed = color_relevant.filter(x => !moveable.includes(x))
                        //console.log("obstructed=",obstructed)
                        var open = color_relevant.filter(x => !obstructed.includes(x))
                        //console.log("open=",open)
                        var num_blockers = countObstructions(obstructed);
                        var optimal = num_blockers
                    }
                    else if(action == "fill"){ // fill
                        const white = goalindices.filter(x => final_config[x] == "white")
                        var optimal = white.length
            
                    }
                    else{ // clear
                    const non_white = goalindices.filter(x => final_config[x] != "white")
                    var optimal = non_white.length
                    }
                    return optimal
                }

                
                function checkGoal(current_goal_list, overall_goal_list){

                    for(var i = 0; i < current_goal_list.length; i++){
                        var opt_test = optimalMovesfunction(current_goal_list[i])
                        // while opt_test < 3, keep trying to find a better goal
                        var newgoal = current_goal_list[i]
                        while(opt_test < 3){
                            newgoal = getRandomSubarray(overall_goal_list, 1)[0];
                            // this could be the same goal as before or already in the list, so keep trying
                            while(current_goal_list.includes(newgoal)){
                                newgoal = getRandomSubarray(overall_goal_list, 1)[0];
                            }
                            opt_test = optimalMovesfunction(newgoal)
                        }
                        // replace current_goal_list with new goal
                        current_goal_list[i]=newgoal
    
                    }

                    return current_goal_list;

                }

                // loop through each type of goal individually to ensure no goal is less than 3 moves
                
        
                coverList = checkGoal(coverList, this.coverGoals)
                uncoverList = checkGoal(uncoverList, this.uncoverGoals)
                moveList = checkGoal(moveList, this.moveGoals)
                clearList = checkGoal(clearList, this.clearGoals)
                fillList = checkGoal(fillList, this.fillGoals)

                var goalList = moveList.concat(coverList, uncoverList,fillList, clearList);

                function shuffle(array) {
                    let currentIndex = array.length,  randomIndex;
                  
                    // While there remain elements to shuffle.
                    while (currentIndex != 0) {
                  
                      // Pick a remaining element.
                      randomIndex = Math.floor(Math.random() * currentIndex);
                      currentIndex--;
                  
                      // And swap it with the current element.
                      [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                    }
                  
                    return array;
                  }

                goalList = shuffle(goalList);
                                  
                node.game.pl.each(function(player) {
                    ////console.log("player.id=",player.id)
                    // Get the value saved in the registry and send it.
                    node.say('GOAL_LIST', player.id, goalList);
                });
            }
    
                node.on.data('compute_goal', calculateGoals);
        },
        matcher: {//assign roles for gameplay
            roles: ['helper','architect'],
            match: 'roundrobin',
            fixedRoles: false,
            reInit:true,
            rounds: 1,
            //cycle: 'mirror_invert'
            assignerCb: function(arrayIds) {
                ////console.log("inside assignerCb:"+node.game.goal)
                if (node.game.goal === 1) {
                    var temp = arrayIds[0];
                    arrayIds[0] = arrayIds[1];
                    arrayIds[1] = temp;
                }
                return arrayIds;
        }
        },

        cb: function() {//create view for results storage
            gameRoom.computeBonus({
                amt: true,
                dump: true,
                addDisconnected: true,
                // other options depending on your game situation.
             });
         }
    });

    

    stager.extendStep('helperOptionsprac', {
        
        cb: function() {
            node.on.data('END_GAME', endGameFuncPrac);
            /*include for board shuffling
            var board = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];

            var sboard = shuffle(board);
            */
        },
       

    });

    stager.extendStep('helperAction', {
        cb: function(){
            node.on.data('END_GAME', endGameFuncPrac);
        },
        exit: function(){
            db.gameplayprac.save('gameplayprac.csv', {
    
                // Custom header.
                header: [ "helperRandCode", "architectRandCode", "config", "goalnumber", "goal", "helperChoice", "helperChoiceTime","helperMove",  "architectMove", "architectChoiceTime", "goalSuccess"],
    
                // Saves only updates from previous save command.
                updatesOnly: true,
                flatten: true
            });
    
         }
    });

    stager.extendStep('architectMoveprac', {

        
        
        //reconnect: true,
        
        cb: function(){
            node.on.data('END_GAME', endGameFuncPrac);
        },

        exit: function(){
            db.gameplayprac.save('gameplayprac.csv', {
    
                // Custom header.
                header: ["helperRandCode", "architectRandCode", "config", "goalnumber", "goal", "helperChoice", "helperChoiceTime","helperMove",   "architectMove", "architectChoiceTime", "goalSuccess"],
    
                // Saves only updates from previous save command.
                updatesOnly: true,
                flatten: true
            });
    
         }
        
    });


    stager.extendStep('endprac', {

    });

     


   // stager.extendStage('gameplay', {
     //   init: function() {//create view for results storage
       //     db.view('feedback', function() {
         //   return node.game.isStage('gameplay');
        //});


        //},

    //});



//    stager.extendStep('clueOptions', {
  //      cb: function() {
            /*include for board shuffling
            var board = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];

            var sboard = shuffle(board);
            */
    //    }

//    });
    
    

    stager.extendStep('demographics', {
      init: function() {
        db.view('demographics', function() {//creates view for saving demographics
                return node.game.isStage('demographics');
            });
        },
        exit: function(){
            db.demographics.save('demographics.csv', {

                // Custom header.
                

               header: ["player","age","gender","education", "hawaii","native", "asian", "black", "white",  "hispanic", "more", "no"],

                // Saves only updates from previous save command.
                updatesOnly: true,

                flatten: true,

                flattenByGroup: 'player'
            });

         }
    });

    

    

     

    stager.extendStep('end', {
    });

    stager.setOnGameOver(function() {
    });
};
