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
                this.goalSpace = ['cover red all', 'move blue C2','clear nocolor A2', 'uncover green all','move green B', 'clear nocolor A1', 
            'clear nocolor B', 'move red C2', 'move red A', 'move green A', 'move blue A', 'move red B', 
            'clear nocolor C',  'move blue A1', 'move green C', 'uncover red all', 
            'move green A1', 'move red A1', 'cover green all', 'move red A2', 'clear nocolor A', 
            'move red B1', 'move blue B1', 'move blue C1', 'move blue B', 'move green C1', 'clear nocolor C2',
             'move blue A2', 'cover blue all', 'clear nocolor C1', 'move green C2', 'move green B1', 
              'move red C1', 'move red B2', 'move blue C', 'move green B2', 
             'move green A2', 'move blue B2', 'uncover blue all', 'clear nocolor B2', 'move red C', 'clear nocolor B1']
    
            
                var unsuccessful_goal_indices  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
    
                this.valid_goals = unsuccessful_goal_indices.map((item) => this.goalSpace[item])
    
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
    
                var goalList = getRandomSubarray(this.goalSpace, 6);
                console.log("goallist inside logic = ",goalList)
                
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
                header: ["helperRandCode", "architectRandCode","goalnumber", "helperChoice", "helperChoiceTime","helperMove",  "architectMove", "goalSuccess"],
    
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
                header: ["helperRandCode", "architectRandCode","goalnumber", "helperChoice", "helperChoiceTime","helperMove",  "helperQuestion", "architectMove", "architectAnswer", "goalSuccess"],
    
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
    

  //  stager.extendStep('feedback', {
    //    cb: function() {//when the server receives the end game msg it runs the end game function
      //      node.on.data('END_GAME', endGameFunc);
       // },
       // exit: function(){
         //   db.feedback.save('feedback.csv', {

                // Custom header.
           //     header: ["clueGiverID", "clueGiverRandCode", "guesserID", "guesserRandCode","target1","target2", "clueOption1", "TBOption1", "TEOption1", "clueOption2", "TBOption2", "TEOption2", "clueOption3", "TBOption3", "TEOption3", "clueOption4", "TBOption4", "TEOption4", "clueOption5", "TBOption5", "TEOption5", "clueOption6", "TBOption6", "TEOption6", "clueOption7", "TBOption7", "TEOption7", "clueOption8", "TBOption8", "TEOption8", "clueFinal", "TBFinal", "TEFinal", "GuessOption1", "GUESS_OPTION1_TIME", "GuessOption2", "GUESS_OPTION2_TIME", "GuessOption3", "GUESS_OPTION3_TIME", "GuessOption4", "GUESS_OPTION4_TIME", "GuessOption5", "GUESS_OPTION5_TIME", "GuessOption6", "GUESS_OPTION6_TIME", "GuessOption7", "GUESS_OPTION7_TIME", "GuessOption8", "GUESS_OPTION8_TIME", "GUESS_1_FINAL", "GUESS_1_FINAL_TIME", "GUESS_2_FINAL", "GUESS_2_FINAL_TIME"],

                // Saves only updates from previous save command.
             //   updatesOnly: true,

//                flatten: true
  //          });

    //     }
    //});

    

   // stager.extendStep('demographics', {
     //   init: function() {
       //     db.view('demographics', function() {//creates view for saving demographics
         //       return node.game.isStage('demographics');
          //  });
        //},
        //exit: function(){
          //  db.feedback.save('demographics.csv', {

                // Custom header.
            //    header: ["player","ID","RandCode","age","gender","education","domHand","alert","racial","hispanic","english","language","english5","englishAge","msc"],

                // Saves only updates from previous save command.
              //  updatesOnly: true,

                //flatten: true,

                //flattenByGroup: 'player'
            //});

         //}
    //});

    stager.extendStep('end', {
    });

    stager.setOnGameOver(function() {
    });
};
