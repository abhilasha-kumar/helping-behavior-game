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




/* function for shuffling board on the server side
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
*/
function endGameFunc(msg) {//ends the game
    this.LOOP_ENDED = true;
}

function endGameFuncPrac(msg) {//ends the game
    this.LOOP_ENDED_PRAC = true;
}


module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    var channel =  gameRoom.channel;
    let db = node.game.memory;

    

    
    
    // Must implement the stages here.
    // stager.setDefaultProperty('minPlayers', [
    //     settings.MIN_PLAYERS,
    //     function() { node.game.gotoStep('demographics'); }
    // ]);
    /*
    stager.extendStage('consent', {
        
    });
    */
   /*

    stager.extendStep('idGet', {
        init: function(){
            
        }
        
        
    });

/*   
    stager.extendStep('instructions', {
        
    });
    */

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
            console.log("inside feedback logic:"+msg.data)
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

                //var unsuccessful_goal_indices  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

    
                //this.valid_goals = unsuccessful_goal_indices.map((item) => this.goalSpace[item])
    
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
                var clearGoals = getRandomSubarray(this.clearGoals, 2);
    
                var goalList = moveList.concat(coverList, uncoverList,fillList, clearGoals);

                console.log("goallist inside logic after shuffle = ",goalList)

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
                  
                //var goalList = ['fill nocolor A1', 'fill nocolor B1']
                console.log("goallist inside logic after shuffle = ",goalList)
                
                node.game.pl.each(function(player) {
                    console.log("player.id=",player.id)
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
                console.log("inside assignerCb:"+node.game.goal)
                if (node.game.goal === 1) {
                    var temp = arrayIds[0];
                    arrayIds[0] = arrayIds[1];
                    arrayIds[1] = temp;
                }
                return arrayIds;
        }
        },
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
                header: ["helperRandCode", "architectRandCode","goalnumber", "goal", "helperChoice", "helperChoiceTime","helperMove",  "architectMove", "goalSuccess"],
    
                // Saves only updates from previous save command.
                updatesOnly: true,
                flatten: true
            });
    
         }
    });

    stager.extendStep('architectMoveprac', {

        
        
        reconnect: true,
        
        cb: function(){
        

        
            node.on.data('END_GAME', endGameFuncPrac);
        },

        exit: function(){
            db.gameplayprac.save('gameplayprac.csv', {
    
                // Custom header.
                header: ["helperRandCode", "architectRandCode","goalnumber", "goal", "helperChoice", "helperChoiceTime","helperMove",   "architectMove",  "goalSuccess"],
    
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
               header: ["player","ID","RandCode","age","gender","education", "native", "asian", "black", "white", "hawaii", "hispanic"],

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
