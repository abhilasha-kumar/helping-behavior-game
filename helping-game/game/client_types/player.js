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

        
          
        

        this.positions = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
        this.colors = ["red", "blue", "green", "white"] // possible colors: white is used when there is no "block"

        this.yesno = ["yes", "no"]

        // set initial configuration of the 27 cells - 9 in each row. 12 colored and 15 white

        this.initialConfiguration = [this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room A - top row
                                    this.colors[3],this.colors[3],this.colors[3], this.colors[3], // room B - top row
                                    this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room C - top row
                                    this.colors[3],this.colors[3],this.colors[0],this.colors[3], //room A - mid row
                                    this.colors[2],this.colors[1],this.colors[3],this.colors[3], // room B - mid row
                                    this.colors[2],this.colors[3],this.colors[3],this.colors[3], // room C - mid row
                                    this.colors[1],this.colors[3],this.colors[2], this.colors[3], // room A - bottom row
                                    this.colors[0],this.colors[0],this.colors[1],this.colors[3], // room B - bottom row
                                    this.colors[0],this.colors[1],this.colors[2],this.colors[3]] // room C - bottom row
        
        // create a "current" array that is disconnected to the original configuration                            
        this.currentConfiguration = JSON.parse(JSON.stringify(this.initialConfiguration));                            

        // set goal configuration and verbal goal

        this.verbalGoal = ["Move all blue blocks to room A, green blocks to room B, and red blocks to room C."]

         this.goalConfiguration = [this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room A - top row
                                    this.colors[3],this.colors[3],this.colors[3], this.colors[3], // room B - top row
                                    this.colors[3],this.colors[3],this.colors[3],this.colors[3], // room C - top row
                                    this.colors[1],this.colors[1],this.colors[3],this.colors[3], //room A - mid row
                                    this.colors[3],this.colors[3],this.colors[2],this.colors[3], // room B - mid row
                                    this.colors[0],this.colors[0],this.colors[3],this.colors[3], // room C - mid row
                                    this.colors[1],this.colors[1],this.colors[3],this.colors[3], // room A - bottom row
                                    this.colors[2],this.colors[2],this.colors[2],this.colors[3], // room B - bottom row
                                    this.colors[0],this.colors[0],this.colors[3],this.colors[3]] // room C - bottom row                      

        this.board0 = ["SMELL","FAMILY","BLOW","AMP","TANK","BIRTHDAY","PUNISHMENT","HELICOPTER","BLAME","FIB","EYES","WEEP","THIRST","FOLLOWER","ANTIDOTE","PIE","BLAZE","LEAP","DATE","NAVY"];
        this.board1 = ["BENCH","GLOW","SUNNY","IDIOT","QUICK","ANALYZE","BEAM","CAVE","OAK","RED","ROBIN","TREE","FIRM","CUT","RUN","KNIGHT","TRIM","SITE","BIRD","MONTH"];
        this.board2 = ["PLANT","LACE","TIP","TENT","ARROW","POST","SUN","SILVER","ABOVE","BLUE","HOST","LOOSE","GOLD","STERN","CUP","WIND","BOWL","LUNCH","BELOW","BOW"];
        this.board3 = ["MILD","SHINE","GRAY","GUMS","LUCK","PAPER","RUDE","LANE","HOLY","ROAD","JAM","HAMMER","REGRET","CHIP","TEETH","FAIRY","TINY","TOOL","BULB","KIND"];
        this.board4 = ["GUN","HALO","JUMP","GIVE","HOPE","TRAVEL","POOR","DREAM","SPOON","GLUE","ANGEL","WEAK","LEAP","CHIEF","ANKLE","PASTE","USUAL","BET","PATH","FORK"];
        this.board5 = ["TIGER","EXAM","BUN","TRACE","HAND","STORM","SNAKE","ALARM","BEAR","HOUSE","BIRTH","TEST","DEAD","FRESH","ALIVE","TOWER","PORK","ASH","LION","HELL"];
        this.board6 = ["SIT","PINE","WHITE","IDEAL","CRUST","FLOUR","ROCK","LEMON","ELM","FOUND","RIVER","LOST","FLAT","CHAIN","FILL","STAND","TEAR","EXACT","BOOT","CLEVER"];
        this.board7 = ["HEAVY","EAST","WOOD","DIM","NEW","GLASS","HEART","FULL","TIMBER","LOVE","SOFT","METER","EMPTY","HARD","OLD","CAGE","WORN","KITCHEN","SHORT","BOOTS"];
        this.board8 = ["PEN","LAND","ICING","HAPPY","HORN","DRUM","FLOOR","RIDE","TALL","GIANT","RURAL","FINE","TILE","STYLE","CAKE","SUGAR","ARMY","SAD","SUBTLE","ACRE"];
        this.board9 = ["MALE","HAPPEN","KING","CANDLE","TOE","HAMMOCK","SILLY","TRAUMA","RAGE","WEIRD","REAL","SLEEP","FLY","WICK","GUEST","ANGER","OLIVE","SKIRT","SORE","LAYER"];
        this.board10 = ["FEET","CHAIR","FIRE","SHIP","LATE","LIST","GAS","DUNE","SAND","BOSS","TABLE","RING","BLAZE","GARAGE","CHAPEL","EARLY","PURE","DOPE","AWARE","BONE"];
        this.board11 = ["BEE","CAMEL","SOUR","DAY","MOVE","HELP","JOKE","COAL","SAME","HONEY","SIN","HALF","CORAL","NIGHT","ASSIST","PET","ENVY","LAUGH","WASH","TOAD"];
        this.board12 = ["TULIP","ZONE","CHALK","FIST","SAFE","PRISON","PAIN","MOVIE","SMILE","PINK","GRASP","TERM","AGONY","LEGAL","BEND","FILM","PAIL","BOARD","FLOWER","RUBY"];
        this.board13 = ["ROPE","FOLLOW","PONY","SOLID","TEXT","KNIFE","EAR","BLADE","TEA","SLOW","ART","LEAD","DARE","GIRL","WEST","BOOK","BASE","HORSE","STAB","BOY"];
        this.board14 = ["TUNA","WET","FLOAT","APPLE","FALL","DUSK","BOX","TALE","SIREN","WALK","EVIL","TOY","DAWN","SUIT","DRY","COLD","LOCAL","DIRTY","HOT","LIAR"];
        this.board15 = ["HILL","ZOO","TROUT","SALT","SOUTH","CLOTH","FORT","ROW","FISH","BOAT","PLANE","FOUL","ANIMAL","BUTTER","BARK","MAD","ROUGH","PEPPER","GOAL","DAMN"];
        this.board16 = ["KNOB","ERROR","FLUID","CRIB","PROOF","RETURN","WIDE","PLUM","POWER","LIGHT","BABY","PIER","WORRY","WORKER","DOOR","SMALL","POET","SOBER","LAMP","TASK"];
        this.board17 = ["TOUGH","KEY","WORST","WAG","BADGE","SOIL","WARM","SHELF","WRITE","CART","GIFT","THREAD","ANGLE","BEST","WOOL","DIRT","TAIL","SAGE","TREAT","SKILL"];
        this.board18 = ["CREDIT","FROG","MOLE","JUNK","LEASE","GAME","VINE","SHOP","GRAPE","JUICE","SPELL","SPIDER","OAR","JOIN","SKY","CROAK","WRONG","TAN","CARD","FUSE"];

        this.boardboard = [this.board0, this.board0, this.board0, this.board1, this.board1, this.board1, this.board2, this.board2, this.board2, this.board3, this.board3, this.board3, this.board4, this.board4, this.board4, this.board5, this.board5, this.board5, this.board6, this.board6, this.board6, this.board7, this.board7, this.board7, this.board8, this.board8, this.board8, this.board9, this.board9, this.board9, this.board10, this.board10, this.board10, this.board11, this.board11, this.board11,
            this.board12, this.board12, this.board12, this.board13, this.board13, this.board13, this.board14, this.board14, this.board14, this.board15, this.board15, this.board15, this.board16, this.board16, this.board16, this.board17, this.board17, this.board17, this.board18, this.board18, this.board18];

        this.pair0 = ["BLOW","BLAZE"];
        this.pair1 = ["SMELL","EYES"];
        this.pair2 = ["WEEP","FAMILY"];
        this.pair3 = ["QUICK","GLOW"];
        this.pair4 = ["TREE","OAK"];
        this.pair5 = ["CAVE","KNIGHT"];
        this.pair6 = ["GOLD","SILVER"];
        this.pair7 = ["SUN","BOWL"];
        this.pair8 = ["STERN","WIND"];
        this.pair9 = ["TEETH","GUMS"];
        this.pair10 = ["HOLY","KIND"];
        this.pair11 = ["RUDE","REGRET"];
        this.pair12 = ["JUMP","LEAP"];
        this.pair13 = ["DREAM","BET"];
        this.pair14 = ["TRAVEL","ANKLE"];
        this.pair15 = ["SNAKE","ASH"];
        this.pair16 = ["LION","TIGER"];
        this.pair17 = ["HAND","BIRTH"];
        this.pair18 = ["SIT","STAND"];
        this.pair19 = ["CRUST","BOOT"];
        this.pair20 = ["ELM","ROCK"];
        this.pair21 = ["OLD","NEW"];
        this.pair22 = ["GLASS","CAGE"];
        this.pair23 = ["EAST","SHORT"];
        this.pair24 = ["HAPPY","SAD"];
        this.pair25 = ["ARMY","DRUM"];
        this.pair26 = ["GIANT","SUBTLE"];
        this.pair27 = ["CANDLE","WICK"];
        this.pair28 = ["OLIVE","REAL"];
        this.pair29 = ["WEIRD","TRAUMA"];
        this.pair30 = ["FEET","CHAPEL"];
        this.pair31 = ["CHAIR","TABLE"];
        this.pair32 = ["GARAGE","BONE"];
        this.pair33 = ["BEE","HONEY"];
        this.pair34 = ["CAMEL","COAL"];
        this.pair35 = ["SOUR","ENVY"];
        this.pair36 = ["GRASP","PAIL"];
        this.pair37 = ["MOVIE","FILM"];
        this.pair38 = ["RUBY","SAFE"];
        this.pair39 = ["KNIFE","STAB"];
        this.pair40 = ["SLOW","SOLID"];
        this.pair41 = ["BLADE","BASE"];
        this.pair42 = ["WET","DRY"];
        this.pair43 = ["LOCAL","TOY"];
        this.pair44 = ["SIREN","BOX"];
        this.pair45 = ["FISH","TROUT"];
        this.pair46 = ["PLANE","GOAL"];
        this.pair47 = ["BUTTER","FOUL"];
        this.pair48 = ["SOBER","WIDE"];
        this.pair49 = ["DOOR","KNOB"];
        this.pair50 = ["ERROR","POET"];
        this.pair51 = ["DIRT","SOIL"];
        this.pair52 = ["SHELF","ANGLE"];
        this.pair53 = ["BADGE","TREAT"];
        this.pair54 = ["FROG","CROAK"];
        this.pair55 = ["JUICE","JUNK"];
        this.pair56 = ["SPIDER","JOIN"];
        this.cluespast = [];

        this.pairList = [this.pair0,this.pair1,this.pair2,this.pair3,this.pair4,this.pair5,this.pair6,this.pair7,this.pair8,this.pair9,this.pair10,this.pair11,this.pair12,this.pair13,this.pair14,this.pair15,this.pair16,this.pair17,this.pair18,this.pair19,this.pair20,this.pair21,this.pair22,this.pair23,this.pair24,this.pair25,this.pair26,this.pair27,this.pair28,this.pair29,this.pair30,this.pair31,this.pair32,this.pair33,this.pair34,this.pair35,this.pair36,this.pair37,this.pair38,this.pair39,this.pair40,this.pair41,this.pair42,this.pair43,this.pair44,this.pair45,this.pair46,this.pair47,this.pair48,this.pair49,this.pair50,this.pair51,this.pair52,this.pair53,this.pair54,this.pair55,this.pair56];

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
            CLUEGIVER:{
                frame: 'instructionsCG.htm',
            },
            GUESSER:{
                frame: 'instructions.htm',
                cb: function(){
                    W.setInnerHTML('containerbottom2', 'Your goal is to: '+ this.verbalGoal[0])
                }
            }
        }
    });

    stager.extendStep('helperOptionsprac', {
        role: function() { return this.role; },//This code is repeated to maintain roles throughout steps of experiment
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'helperChoice.htm',
                donebutton: false,
                cb: function() {

                    W.getElementById("row1cell1").style.backgroundColor = this.initialConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.initialConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.initialConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.initialConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.initialConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.initialConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.initialConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.initialConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.initialConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.initialConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.initialConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.initialConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.initialConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.initialConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.initialConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.initialConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.initialConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.initialConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.initialConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.initialConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.initialConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.initialConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.initialConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.initialConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.initialConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.initialConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.initialConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.initialConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.initialConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.initialConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.initialConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.initialConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.initialConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.initialConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.initialConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.initialConfiguration[35]

                   
                    
                    W.setInnerHTML('clue2', "You are the HELPER. Please select whether you want to ask the architect a yes/no question, move a block, or pass." ),
                    
                    this.answerCounter = 0;

                    var el = W.getElementById("blocks");

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
                },
                done: function() {
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

                    W.getElementById("row1cell1").style.backgroundColor = this.initialConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.initialConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.initialConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.initialConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.initialConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.initialConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.initialConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.initialConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.initialConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.initialConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.initialConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.initialConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.initialConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.initialConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.initialConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.initialConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.initialConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.initialConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.initialConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.initialConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.initialConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.initialConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.initialConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.initialConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.initialConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.initialConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.initialConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.initialConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.initialConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.initialConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.initialConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.initialConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.initialConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.initialConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.initialConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.initialConfiguration[35]

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

                    W.getElementById("row1cell1").style.backgroundColor = this.initialConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.initialConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.initialConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.initialConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.initialConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.initialConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.initialConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.initialConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.initialConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.initialConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.initialConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.initialConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.initialConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.initialConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.initialConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.initialConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.initialConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.initialConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.initialConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.initialConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.initialConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.initialConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.initialConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.initialConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.initialConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.initialConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.initialConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.initialConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.initialConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.initialConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.initialConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.initialConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.initialConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.initialConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.initialConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.initialConfiguration[35]
                    
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

                    else if(["Pass"].includes(choiceTXT)){

                        this.pass2 = node.widgets.append('ContentBox', W.gid('containerbottom2'), {//apend customInput widget with 1 mandatory input
                            
                            mainText: 'You have chosen to pass your turn. Please click Done.',
                            className: 'centered',
                        });

                    }

                    else{
                      //myDiv.innerHTML = "You chose: " +choiceTXT;
                      //var root = document.body;

                      this.movesToFrom2 = node.widgets.append('ChoiceManager', W.gid('movebottom2'), {
                        id: 'survey',
                        title: false,
                        shuffleForms: false,
                        forms: [
                            // The forms array contains "widget-like" objects.
                    
                            // For instance, they can be already instantiated widgets:
                            node.widgets.get('ChoiceTable', {
                                id: 'FROM',
                                mainText: 'Which block position do you want to change?',
                                choices: [
                                    '<button  class="button button2">A1</button>',
                                    '<button  class="button button2">A2</button>',
                                    '<button  class="button button2">A3</button>',
                                    '<button  class="button button2">B1</button>',
                                    '<button  class="button button2">B2</button>',
                                    '<button  class="button button2">B3</button>',
                                    '<button  class="button button2">C1</button>',
                                    '<button  class="button button2">C2</button>',
                                    '<button  class="button button2">C3</button>'
                                ],
                                title: false,
                                requiredChoice: true
                            }),
                            node.widgets.get('ChoiceTable', {
                                id: 'TO',
                                mainText: 'Where do you want to move the block?' ,
                                choices: [
                                    '<button  class="button button2">A1</button>',
                                    '<button  class="button button2">A2</button>',
                                    '<button  class="button button2">A3</button>',
                                    '<button  class="button button2">B1</button>',
                                    '<button  class="button button2">B2</button>',
                                    '<button  class="button button2">B3</button>',
                                    '<button  class="button button2">C1</button>',
                                    '<button  class="button button2">C2</button>',
                                    '<button  class="button button2">C3</button>'
                                ],
                                title: false,
                                requiredChoice: true
                            }),                            
                        ],
                    
                        // These options are applied to all widgets that are not already
                        // instantiated (in this case the third and fourth one).
                        formsOptions: {
                            title: false,
                            requiredChoice: true
                        }
                    });
    
                    }
                
                },
                done: function() {//send clue to other player and clue and time info to database
                    

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
                        
                        var tofrom = this.movesToFrom2.getValues().forms['FROM'].choice + " MoveBlockTo " + this.movesToFrom2.getValues().forms['TO'].choice;
                        this.cluespast.push(tofrom);

                    node.say('CLUE', node.game.partner, tofrom);

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

                    W.getElementById("row1cell1").style.backgroundColor = this.initialConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.initialConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.initialConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.initialConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.initialConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.initialConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.initialConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.initialConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.initialConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.initialConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.initialConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.initialConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.initialConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.initialConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.initialConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.initialConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.initialConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.initialConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.initialConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.initialConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.initialConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.initialConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.initialConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.initialConfiguration[23]
        
                    W.getElementById("row3cell1").style.backgroundColor = this.initialConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.initialConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.initialConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.initialConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.initialConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.initialConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.initialConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.initialConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.initialConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.initialConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.initialConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.initialConfiguration[35]
                    
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

                    //could use cluespast here

                    var choiceTXT = node.game.memory.resolveTag("GUESS").Guess1;//use tags to get our response from memory and validate

                    if(["Ask a yes/no question"].includes(choiceTXT)){

                    W.setInnerHTML('cluepasttxt', "You chose to ask a question. ");

                    // then just present original configuration

                    W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]
                    }

                    else if(["Pass"].includes(choiceTXT)){

                    W.setInnerHTML('cluepasttxt', "You chose to pass your turn.");

                    W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    }

                    else{

                    W.setInnerHTML('cluepasttxt', "You chose to move a block from: ");
                    

                    // get the latest value from cluespast

                    var moveInfo = this.cluespast.at(-1)
                    var moveChoice = moveInfo.split(" MoveBlockTo ");
                    var moveFrom = this.positions[moveChoice[0]]
                    var moveTo = this.positions[moveChoice[1]]

                    W.setInnerHTML('cluepast', moveFrom + " to " + moveTo);

                        var roomFrom = moveFrom.charAt(0)
                        var positionFrom = moveFrom.charAt(1)

                        var roomTo = moveTo.charAt(0)
                        var positionTo = moveTo.charAt(1)

                        // change color of roomFrom

                        var movedIndex = 26 // set default value

                        if(roomFrom.includes('A')){ // room A
                            if (positionFrom.includes('1')){
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[0] == "white"){
                                    if(this.currentConfiguration[12] == "white"){
                                        //  change block at index 24 to white, i.e., move it
                                        this.currentConfiguration[24] = "white"
                                        movedIndex = 24
                                    }
                                    else{ // if position 12 is nonwhite
                                        //  change block at index 12 to white, i.e., move it
                                        this.currentConfiguration[12] = "white"
                                        movedIndex = 12
                                    }
                                }
                                else{ // if position 0 is nonwhite
                                    this.currentConfiguration[0] = "white"
                                    movedIndex = 0
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[1] == "white"){
                                    if(this.currentConfiguration[13] == "white"){
                                        //  change block at index 25 to white, i.e., move it
                                        this.currentConfiguration[25] = "white"
                                        movedIndex = 25
                                    }
                                    else{ // if position 13 is nonwhite
                                        //  change block at index 13 to white, i.e., move it
                                        this.currentConfiguration[13] = "white"
                                        movedIndex = 13
                                    }
                                }
                                else{ // if position 1 is nonwhite
                                    this.currentConfiguration[1] = "white"
                                    movedIndex = 1
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 2, 14, 26
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[2] == "white"){
                                    if(this.currentConfiguration[14] == "white"){
                                        //  change block at index 26 to white, i.e., move it
                                        this.currentConfiguration[26] = "white"
                                        movedIndex = 26
                                    }
                                    else{ // if position 14 is nonwhite
                                        //  change block at index 14 to white, i.e., move it
                                        this.currentConfiguration[14] = "white"
                                        movedIndex = 14

                                    }
                                }
                                else{ // if position 2 is nonwhite
                                    this.currentConfiguration[2] = "white"
                                    movedIndex = 2
                                } 
                            }

                        }
                        else if(roomFrom.includes('B')){

                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 4, 16, 28
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[4] == "white"){
                                    if(this.currentConfiguration[16] == "white"){
                                        //  change block at index 28 to white, i.e., move it
                                        this.currentConfiguration[28] = "white"
                                        movedIndex = 28
                                    }
                                    else{ // if position 16 is nonwhite
                                        //  change block at index 16 to white, i.e., move it
                                        this.currentConfiguration[16] = "white"
                                        movedIndex = 16
                                    }
                                }
                                else{ // if position 4 is nonwhite
                                    this.currentConfiguration[4] = "white"
                                    movedIndex = 4
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[5] == "white"){
                                    if(this.currentConfiguration[17] == "white"){
                                        //  change block at index 29 to white, i.e., move it
                                        this.currentConfiguration[29] = "white"
                                        movedIndex = 29
                                    }
                                    else{ // if position 17 is nonwhite
                                        //  change block at index 17 to white, i.e., move it
                                        this.currentConfiguration[17] = "white"
                                        movedIndex = 17
                                    }
                                }
                                else{ // if position 5 is nonwhite
                                    this.currentConfiguration[5] = "white"
                                    movedIndex = 5
                                }

                            }
                            else { //b3
                                // need to change color from second column
                                // so indices 6, 18, 30
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[6] == "white"){
                                    if(this.currentConfiguration[18] == "white"){
                                        //  change block at index 30 to white, i.e., move it
                                        this.currentConfiguration[30] = "white"
                                        movedIndex = 30
                                    }
                                    else{ // if position 18 is nonwhite
                                        //  change block at index 18 to white, i.e., move it
                                        this.currentConfiguration[18] = "white"
                                        movedIndex = 18

                                    }
                                }
                                else{ // if position 6 is nonwhite
                                    this.currentConfiguration[6] = "white"
                                    movedIndex = 6
                                } 
                            }


                        }

                        else{ //room C

                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 8, 20, 32
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[8] == "white"){
                                    if(this.currentConfiguration[20] == "white"){
                                        //  change block at index 32 to white, i.e., move it
                                        this.currentConfiguration[32] = "white"
                                        movedIndex = 32
                                    }
                                    else{ // if position 20 is nonwhite
                                        //  change block at index 20 to white, i.e., move it
                                        this.currentConfiguration[20] = "white"
                                        movedIndex = 20
                                    }
                                }
                                else{ // if position 8 is nonwhite
                                    this.currentConfiguration[8] = "white"
                                    movedIndex = 8
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[9] == "white"){
                                    if(this.currentConfiguration[21] == "white"){
                                        //  change block at index 33 to white, i.e., move it
                                        this.currentConfiguration[33] = "white"
                                        movedIndex = 33
                                    }
                                    else{ // if position 21 is nonwhite
                                        //  change block at index 21 to white, i.e., move it
                                        this.currentConfiguration[21] = "white"
                                        movedIndex = 21
                                    }
                                }
                                else{ // if position 9 is nonwhite
                                    this.currentConfiguration[9] = "white"
                                    movedIndex = 9
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 10, 22, 34
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[10] == "white"){
                                    if(this.currentConfiguration[22] == "white"){
                                        //  change block at index 34 to white, i.e., move it
                                        this.currentConfiguration[34] = "white"
                                        movedIndex = 34
                                    }
                                    else{ // if position 22 is nonwhite
                                        //  change block at index 22 to white, i.e., move it
                                        this.currentConfiguration[22] = "white"
                                        movedIndex = 22

                                    }
                                }
                                else{ // if position 10 is nonwhite
                                    this.currentConfiguration[10] = "white"
                                    movedIndex = 10
                                } 
                            }

                        }

                        // also change color of roomTo

                        // roomTo's color depends on whatever roomFrom's color was
                        // specifically whatever "index" roomFrom contains
                        // and the location is the lowest white cell in that column

                        if(roomTo.includes('A')){ // room A
                            if (positionTo.includes('1')){ // A1
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is white:
                                if(this.currentConfiguration[24] == "white"){
                                    this.currentConfiguration[24] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[12] == "white"){
                                    this.currentConfiguration[12] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[0] = this.initialConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //A2
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[25] == "white"){
                                    this.currentConfiguration[25] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[13] == "white"){
                                    this.currentConfiguration[13] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[1] = this.initialConfiguration[movedIndex]
                                } 

                            }
                            else { // A3
                                // need to change color from third column
                                // so indices 2, 14, 26
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[26] == "white"){
                                    this.currentConfiguration[26] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[14] == "white"){
                                    this.currentConfiguration[14] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[2] = this.initialConfiguration[movedIndex]
                                } 
                            }

                        }
                        else if(roomTo.includes('B')){

                            if (positionTo.includes('1')){ // B1
                                // need to change color from first column
                                // so indices 4, 16, 28
                                // find the topmost index that is white:
                                if(this.currentConfiguration[28] == "white"){
                                    this.currentConfiguration[28] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[16] == "white"){
                                    this.currentConfiguration[16] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[4] = this.initialConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //A2
                                // need to change color from second column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[29] == "white"){
                                    this.currentConfiguration[29] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[17] == "white"){
                                    this.currentConfiguration[17] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[5] = this.initialConfiguration[movedIndex]
                                } 

                            }
                            else { // A3
                                // need to change color from third column
                                // so indices 6, 18, 30
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[30] == "white"){
                                    this.currentConfiguration[30] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[18] == "white"){
                                    this.currentConfiguration[18] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[6] = this.initialConfiguration[movedIndex]
                                } 
                            }
                        }

                        else{ //room C

                            if (positionTo.includes('1')){ // C1
                                // need to change color from first column
                                // so indices 8, 20, 32
                                // find the topmost index that is white:
                                if(this.currentConfiguration[32] == "white"){
                                    this.currentConfiguration[32] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[20] == "white"){
                                    this.currentConfiguration[20] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 8 is white
                                    this.currentConfiguration[8] = this.initialConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //C2
                                // need to change color from second column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[33] == "white"){
                                    this.currentConfiguration[33] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[21] == "white"){
                                    this.currentConfiguration[21] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[9] = this.initialConfiguration[movedIndex]
                                } 

                            }
                            else { // C3
                                // need to change color from third column
                                // so indices 10, 22, 34
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[34] == "white"){
                                    this.currentConfiguration[34] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[22] == "white"){
                                    this.currentConfiguration[22] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[10] = this.initialConfiguration[movedIndex]
                                } 
                            }

                        }

                        // having made changes to currentConfiguration, now make the table

                        W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
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

                    // here we want to tell the architect what the Helper did and also change the block positions

                    var moveChoice1 = this.clueReceived

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes(" MoveBlockTo ")){
                        W.setInnerHTML('cluepasttxt', "The helper selected to move a block from: ");
                        var moveChoice1 = this.clueReceived.split(" MoveBlockTo ");
                        var moveFrom = this.positions[moveChoice1[0]]
                        var moveTo = this.positions[moveChoice1[1]]

                        W.setInnerHTML('cluepast', moveFrom + " to " + moveTo);

                        // if they selected a move, then change the display accordingly

                        // find the room and positions

                        var roomFrom = moveFrom.charAt(0)
                        var positionFrom = moveFrom.charAt(1)

                        var roomTo = moveTo.charAt(0)
                        var positionTo = moveTo.charAt(1)

                        // change color of roomFrom

                        var movedIndex = 26 // set default value

                        if(roomFrom.includes('A')){ // room A
                            if (positionFrom.includes('1')){
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[0] == "white"){
                                    if(this.currentConfiguration[12] == "white"){
                                        //  change block at index 24 to white, i.e., move it
                                        this.currentConfiguration[24] = "white"
                                        movedIndex = 24
                                    }
                                    else{ // if position 12 is nonwhite
                                        //  change block at index 12 to white, i.e., move it
                                        this.currentConfiguration[12] = "white"
                                        movedIndex = 12
                                    }
                                }
                                else{ // if position 0 is nonwhite
                                    this.currentConfiguration[0] = "white"
                                    movedIndex = 0
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[1] == "white"){
                                    if(this.currentConfiguration[13] == "white"){
                                        //  change block at index 25 to white, i.e., move it
                                        this.currentConfiguration[25] = "white"
                                        movedIndex = 25
                                    }
                                    else{ // if position 13 is nonwhite
                                        //  change block at index 13 to white, i.e., move it
                                        this.currentConfiguration[13] = "white"
                                        movedIndex = 13
                                    }
                                }
                                else{ // if position 1 is nonwhite
                                    this.currentConfiguration[1] = "white"
                                    movedIndex = 1
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 2, 14, 26
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[2] == "white"){
                                    if(this.currentConfiguration[14] == "white"){
                                        //  change block at index 26 to white, i.e., move it
                                        this.currentConfiguration[26] = "white"
                                        movedIndex = 26
                                    }
                                    else{ // if position 14 is nonwhite
                                        //  change block at index 14 to white, i.e., move it
                                        this.currentConfiguration[14] = "white"
                                        movedIndex = 14

                                    }
                                }
                                else{ // if position 2 is nonwhite
                                    this.currentConfiguration[2] = "white"
                                    movedIndex = 2
                                } 
                            }

                        }
                        else if(roomFrom.includes('B')){ //room B
                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 4, 16, 28
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[4] == "white"){
                                    if(this.currentConfiguration[16] == "white"){
                                        //  change block at index 28 to white, i.e., move it
                                        this.currentConfiguration[28] = "white"
                                        movedIndex = 28
                                    }
                                    else{ // if position 16 is nonwhite
                                        //  change block at index 16 to white, i.e., move it
                                        this.currentConfiguration[16] = "white"
                                        movedIndex = 16
                                    }
                                }
                                else{ // if position 4 is nonwhite
                                    this.currentConfiguration[4] = "white"
                                    movedIndex = 4
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[5] == "white"){
                                    if(this.currentConfiguration[17] == "white"){
                                        //  change block at index 29 to white, i.e., move it
                                        this.currentConfiguration[29] = "white"
                                        movedIndex = 29
                                    }
                                    else{ // if position 17 is nonwhite
                                        //  change block at index 17 to white, i.e., move it
                                        this.currentConfiguration[17] = "white"
                                        movedIndex = 17
                                    }
                                }
                                else{ // if position 5 is nonwhite
                                    this.currentConfiguration[5] = "white"
                                    movedIndex = 5
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 6, 18, 30
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[6] == "white"){
                                    if(this.currentConfiguration[18] == "white"){
                                        //  change block at index 30 to white, i.e., move it
                                        this.currentConfiguration[30] = "white"
                                        movedIndex = 30
                                    }
                                    else{ // if position 18 is nonwhite
                                        //  change block at index 18 to white, i.e., move it
                                        this.currentConfiguration[18] = "white"
                                        movedIndex = 18

                                    }
                                }
                                else{ // if position 6 is nonwhite
                                    this.currentConfiguration[6] = "white"
                                    movedIndex = 6
                                } 
                            }
                        }

                        else{ //room C

                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 8, 20, 32
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[8] == "white"){
                                    if(this.currentConfiguration[20] == "white"){
                                        //  change block at index 32 to white, i.e., move it
                                        this.currentConfiguration[32] = "white"
                                        movedIndex = 32
                                    }
                                    else{ // if position 20 is nonwhite
                                        //  change block at index 20 to white, i.e., move it
                                        this.currentConfiguration[20] = "white"
                                        movedIndex = 20
                                    }
                                }
                                else{ // if position 8 is nonwhite
                                    this.currentConfiguration[8] = "white"
                                    movedIndex = 8
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[9] == "white"){
                                    if(this.currentConfiguration[21] == "white"){
                                        //  change block at index 33 to white, i.e., move it
                                        this.currentConfiguration[33] = "white"
                                        movedIndex = 33
                                    }
                                    else{ // if position 21 is nonwhite
                                        //  change block at index 21 to white, i.e., move it
                                        this.currentConfiguration[21] = "white"
                                        movedIndex = 21
                                    }
                                }
                                else{ // if position 9 is nonwhite
                                    this.currentConfiguration[9] = "white"
                                    movedIndex = 9
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 10, 22, 34
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[10] == "white"){
                                    if(this.currentConfiguration[22] == "white"){
                                        //  change block at index 34 to white, i.e., move it
                                        this.currentConfiguration[34] = "white"
                                        movedIndex = 34
                                    }
                                    else{ // if position 22 is nonwhite
                                        //  change block at index 22 to white, i.e., move it
                                        this.currentConfiguration[22] = "white"
                                        movedIndex = 22

                                    }
                                }
                                else{ // if position 10 is nonwhite
                                    this.currentConfiguration[10] = "white"
                                    movedIndex = 10
                                } 
                            }

                        }

                        // also change color of roomTo

                        // roomTo's color depends on whatever roomFrom's color was
                        // specifically whatever "index" roomFrom contains
                        // and the location is the lowest white cell in that column

                        if(roomTo.includes('A')){ // room A
                            if (positionTo.includes('1')){ // A1
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is white:
                                if(this.currentConfiguration[24] == "white"){
                                    this.currentConfiguration[24] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[12] == "white"){
                                    this.currentConfiguration[12] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[0] = this.initialConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //A2
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[25] == "white"){
                                    this.currentConfiguration[25] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[13] == "white"){
                                    this.currentConfiguration[13] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[1] = this.initialConfiguration[movedIndex]
                                } 

                            }
                            else { // A3
                                // need to change color from third column
                                // so indices 2, 14, 26
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[26] == "white"){
                                    this.currentConfiguration[26] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[14] == "white"){
                                    this.currentConfiguration[14] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[2] = this.initialConfiguration[movedIndex]
                                } 
                            }

                        }
                        else if(roomTo.includes('B')){

                            if (positionTo.includes('1')){ // B1
                                // need to change color from first column
                                // so indices 4, 16, 28
                                // find the topmost index that is white:
                                if(this.currentConfiguration[28] == "white"){
                                    this.currentConfiguration[28] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[16] == "white"){
                                    this.currentConfiguration[16] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[4] = this.initialConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //B2
                                // need to change color from second column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[29] == "white"){
                                    this.currentConfiguration[29] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[17] == "white"){
                                    this.currentConfiguration[17] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[5] = this.initialConfiguration[movedIndex]
                                } 

                            }
                            else { // B3
                                // need to change color from third column
                                // so indices 6, 18, 30
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[30] == "white"){
                                    this.currentConfiguration[30] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[18] == "white"){
                                    this.currentConfiguration[18] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[6] = this.initialConfiguration[movedIndex]
                                } 
                            }
                        }

                        else{ //room C

                            if (positionTo.includes('1')){ // C1
                                // need to change color from first column
                                // so indices 8, 20, 32
                                // find the topmost index that is white:
                                if(this.currentConfiguration[32] == "white"){
                                    this.currentConfiguration[32] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[20] == "white"){
                                    this.currentConfiguration[20] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 8 is white
                                    this.currentConfiguration[8] = this.initialConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //C2
                                // need to change color from second column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[33] == "white"){
                                    this.currentConfiguration[33] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[21] == "white"){
                                    this.currentConfiguration[21] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[9] = this.initialConfiguration[movedIndex]
                                } 

                            }
                            else { // C3
                                // need to change color from third column
                                // so indices 10, 22, 34
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[34] == "white"){
                                    this.currentConfiguration[34] = this.initialConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[22] == "white"){
                                    this.currentConfiguration[22] = this.initialConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[10] = this.initialConfiguration[movedIndex]
                                } 
                            }

                        }

                        // having made changes to currentConfiguration, now make the table

                        W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                        // after seeing new block configuration, the architect makes their move

                        // now architect moves blocks

                        this.movesToFromArchitect = node.widgets.append('ChoiceManager', W.gid('containerbottom2'), {
                            id: 'survey',
                            title: false,
                            shuffleForms: false,
                            forms: [
                                // The forms array contains "widget-like" objects.
                        
                                // For instance, they can be already instantiated widgets:
                                node.widgets.get('ChoiceTable', {
                                    id: 'FROM',
                                    mainText: 'Which block position do you want to change?',
                                    choices: [
                                        '<button  class="button button2">A1</button>',
                                        '<button  class="button button2">A2</button>',
                                        '<button  class="button button2">A3</button>',
                                        '<button  class="button button2">B1</button>',
                                        '<button  class="button button2">B2</button>',
                                        '<button  class="button button2">B3</button>',
                                        '<button  class="button button2">C1</button>',
                                        '<button  class="button button2">C2</button>',
                                        '<button  class="button button2">C3</button>'
                                    ],
                                    title: false,
                                    requiredChoice: true
                                }),
                                node.widgets.get('ChoiceTable', {
                                    id: 'TO',
                                    mainText: 'Where do you want to move the block?' ,
                                    choices: [
                                        '<button  class="button button2">A1</button>',
                                        '<button  class="button button2">A2</button>',
                                        '<button  class="button button2">A3</button>',
                                        '<button  class="button button2">B1</button>',
                                        '<button  class="button button2">B2</button>',
                                        '<button  class="button button2">B3</button>',
                                        '<button  class="button button2">C1</button>',
                                        '<button  class="button button2">C2</button>',
                                        '<button  class="button button2">C3</button>'
                                    ],
                                    title: false,
                                    requiredChoice: true
                                }),                            
                            ],
                        
                            // These options are applied to all widgets that are not already
                            // instantiated (in this case the third and fourth one).
                            formsOptions: {
                                title: false,
                                requiredChoice: true
                            }
                        });

                    }

                    else if (moveChoice1.includes("Pass")){
                        W.setInnerHTML('cluepasttxt', "The helper chose to pass their turn.");

                        // if they passed their turn, display is same as initial

                        W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                        // now architect moves blocks

                        this.movesToFromArchitect = node.widgets.append('ChoiceManager', W.gid('containerbottom2'), {
                            id: 'survey',
                            title: false,
                            shuffleForms: false,
                            forms: [
                                // The forms array contains "widget-like" objects.
                        
                                // For instance, they can be already instantiated widgets:
                                node.widgets.get('ChoiceTable', {
                                    id: 'FROM',
                                    mainText: 'Which block position do you want to change?',
                                    choices: [
                                        '<button  class="button button2">A1</button>',
                                        '<button  class="button button2">A2</button>',
                                        '<button  class="button button2">A3</button>',
                                        '<button  class="button button2">B1</button>',
                                        '<button  class="button button2">B2</button>',
                                        '<button  class="button button2">B3</button>',
                                        '<button  class="button button2">C1</button>',
                                        '<button  class="button button2">C2</button>',
                                        '<button  class="button button2">C3</button>'
                                    ],
                                    title: false,
                                    requiredChoice: true
                                }),
                                node.widgets.get('ChoiceTable', {
                                    id: 'TO',
                                    mainText: 'Where do you want to move the block?' ,
                                    choices: [
                                        '<button  class="button button2">A1</button>',
                                        '<button  class="button button2">A2</button>',
                                        '<button  class="button button2">A3</button>',
                                        '<button  class="button button2">B1</button>',
                                        '<button  class="button button2">B2</button>',
                                        '<button  class="button button2">B3</button>',
                                        '<button  class="button button2">C1</button>',
                                        '<button  class="button button2">C2</button>',
                                        '<button  class="button button2">C3</button>'
                                    ],
                                    title: false,
                                    requiredChoice: true
                                }),                            
                            ],
                        
                            // These options are applied to all widgets that are not already
                            // instantiated (in this case the third and fourth one).
                            formsOptions: {
                                title: false,
                                requiredChoice: true
                            }
                        });

                    }

                    else{
                        W.setInnerHTML('cluepasttxt', "The helper decided to ask you a question: ");
                        W.setInnerHTML('clue2', "Look below the board: ");
                        W.setInnerHTML('cluepast', moveChoice1 ); 

                        // if they selected a question, then keep display the same as initial

                        W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

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
                    // need to store the values being generated

                    var moveChoice1 = this.clueReceived


                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes(" MoveBlockTo ") || moveChoice1.includes("Pass")){
                        // if there was a move or a pass by the Helper
                        var tofrom = this.movesToFromArchitect.getValues().forms['FROM'].choice + " MoveBlockTo " + this.movesToFromArchitect.getValues().forms['TO'].choice
                        this.cluespast.push(tofrom);   
                        node.say('ANSWER', node.game.partner, tofrom);

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


    stager.extendStep('guessFinalprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                    
                },
                donebutton: false,
                frame: 'helperChoice.htm',
                cb: function() {

                    var moveChoice1 = this.cluespast.at(-1)

                    this.lastConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes(" MoveBlockTo ")){
                        // if the Architect moved
                        W.setInnerHTML('cluepasttxt', "The Architect selected to move a block from: ");
                        var moveChoice1 = this.cluespast.at(-1).split(" MoveBlockTo ");
                        var moveFrom = this.positions[moveChoice1[0]]
                        var moveTo = this.positions[moveChoice1[1]]

                        W.setInnerHTML('cluepast', moveFrom + " to " + moveTo);

                        // after reporting, display the changed board to helper

                        // find the room and positions

                        var roomFrom = moveFrom.charAt(0)
                        var positionFrom = moveFrom.charAt(1)

                        var roomTo = moveTo.charAt(0)
                        var positionTo = moveTo.charAt(1)

                        // change color of roomFrom

                        var movedIndex = 26 // set default value

                        // here we need to first make a disconnected copy of the last configuration
                        // so we can use it for roomTo

                        

                        if(roomFrom.includes('A')){ // room A
                            if (positionFrom.includes('1')){
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[0] == "white"){
                                    if(this.currentConfiguration[12] == "white"){
                                        //  change block at index 24 to white, i.e., move it
                                        this.currentConfiguration[24] = "white"
                                        movedIndex = 24
                                    }
                                    else{ // if position 12 is nonwhite
                                        //  change block at index 12 to white, i.e., move it
                                        this.currentConfiguration[12] = "white"
                                        movedIndex = 12
                                    }
                                }
                                else{ // if position 0 is nonwhite
                                    this.currentConfiguration[0] = "white"
                                    movedIndex = 0
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[1] == "white"){
                                    if(this.currentConfiguration[13] == "white"){
                                        //  change block at index 25 to white, i.e., move it
                                        this.currentConfiguration[25] = "white"
                                        movedIndex = 25
                                    }
                                    else{ // if position 13 is nonwhite
                                        //  change block at index 13 to white, i.e., move it
                                        this.currentConfiguration[13] = "white"
                                        movedIndex = 13
                                    }
                                }
                                else{ // if position 1 is nonwhite
                                    this.currentConfiguration[1] = "white"
                                    movedIndex = 1
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 2, 14, 26
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[2] == "white"){
                                    if(this.currentConfiguration[14] == "white"){
                                        //  change block at index 26 to white, i.e., move it
                                        this.currentConfiguration[26] = "white"
                                        movedIndex = 26
                                    }
                                    else{ // if position 14 is nonwhite
                                        //  change block at index 14 to white, i.e., move it
                                        this.currentConfiguration[14] = "white"
                                        movedIndex = 14

                                    }
                                }
                                else{ // if position 2 is nonwhite
                                    this.currentConfiguration[2] = "white"
                                    movedIndex = 2
                                } 
                            }

                        }
                        else if(roomFrom.includes('B')){ //room B
                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 4, 16, 28
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[4] == "white"){
                                    if(this.currentConfiguration[16] == "white"){
                                        //  change block at index 28 to white, i.e., move it
                                        this.currentConfiguration[28] = "white"
                                        movedIndex = 28
                                    }
                                    else{ // if position 16 is nonwhite
                                        //  change block at index 16 to white, i.e., move it
                                        this.currentConfiguration[16] = "white"
                                        movedIndex = 16
                                    }
                                }
                                else{ // if position 4 is nonwhite
                                    this.currentConfiguration[4] = "white"
                                    movedIndex = 4
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[5] == "white"){
                                    if(this.currentConfiguration[17] == "white"){
                                        //  change block at index 29 to white, i.e., move it
                                        this.currentConfiguration[29] = "white"
                                        movedIndex = 29
                                    }
                                    else{ // if position 17 is nonwhite
                                        //  change block at index 17 to white, i.e., move it
                                        this.currentConfiguration[17] = "white"
                                        movedIndex = 17
                                    }
                                }
                                else{ // if position 5 is nonwhite
                                    this.currentConfiguration[5] = "white"
                                    movedIndex = 5
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 6, 18, 30
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[6] == "white"){
                                    if(this.currentConfiguration[18] == "white"){
                                        //  change block at index 30 to white, i.e., move it
                                        this.currentConfiguration[30] = "white"
                                        movedIndex = 30
                                    }
                                    else{ // if position 18 is nonwhite
                                        //  change block at index 18 to white, i.e., move it
                                        this.currentConfiguration[18] = "white"
                                        movedIndex = 18

                                    }
                                }
                                else{ // if position 6 is nonwhite
                                    this.currentConfiguration[6] = "white"
                                    movedIndex = 6
                                } 
                            }
                        }

                        else{ //room C

                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 8, 20, 32
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[8] == "white"){
                                    if(this.currentConfiguration[20] == "white"){
                                        //  change block at index 32 to white, i.e., move it
                                        this.currentConfiguration[32] = "white"
                                        movedIndex = 32
                                    }
                                    else{ // if position 20 is nonwhite
                                        //  change block at index 20 to white, i.e., move it
                                        this.currentConfiguration[20] = "white"
                                        movedIndex = 20
                                    }
                                }
                                else{ // if position 8 is nonwhite
                                    this.currentConfiguration[8] = "white"
                                    movedIndex = 8
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[9] == "white"){
                                    if(this.currentConfiguration[21] == "white"){
                                        //  change block at index 33 to white, i.e., move it
                                        this.currentConfiguration[33] = "white"
                                        movedIndex = 33
                                    }
                                    else{ // if position 21 is nonwhite
                                        //  change block at index 21 to white, i.e., move it
                                        this.currentConfiguration[21] = "white"
                                        movedIndex = 21
                                    }
                                }
                                else{ // if position 9 is nonwhite
                                    this.currentConfiguration[9] = "white"
                                    movedIndex = 9
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 10, 22, 34
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[10] == "white"){
                                    if(this.currentConfiguration[22] == "white"){
                                        //  change block at index 34 to white, i.e., move it
                                        this.currentConfiguration[34] = "white"
                                        movedIndex = 34
                                    }
                                    else{ // if position 22 is nonwhite
                                        //  change block at index 22 to white, i.e., move it
                                        this.currentConfiguration[22] = "white"
                                        movedIndex = 22

                                    }
                                }
                                else{ // if position 10 is nonwhite
                                    this.currentConfiguration[10] = "white"
                                    movedIndex = 10
                                } 
                            }

                        }

                        // also change color of roomTo

                        // roomTo's color depends on whatever roomFrom's color was
                        // specifically whatever "index" roomFrom contains
                        // and the location is the lowest white cell in that column

                        if(roomTo.includes('A')){ // room A
                            if (positionTo.includes('1')){ // A1
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is white:
                                if(this.currentConfiguration[24] == "white"){
                                    this.currentConfiguration[24] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[12] == "white"){
                                    this.currentConfiguration[12] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[0] = this.lastConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //A2
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[25] == "white"){
                                    this.currentConfiguration[25] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[13] == "white"){
                                    this.currentConfiguration[13] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[1] = this.lastConfiguration[movedIndex]
                                } 

                            }
                            else { // A3
                                // need to change color from third column
                                // so indices 2, 14, 26
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[26] == "white"){
                                    this.currentConfiguration[26] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[14] == "white"){
                                    this.currentConfiguration[14] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[2] = this.lastConfiguration[movedIndex]
                                } 
                            }

                        }
                        else if(roomTo.includes('B')){

                            if (positionTo.includes('1')){ // B1
                                // need to change color from first column
                                // so indices 4, 16, 28
                                // find the topmost index that is white:
                                if(this.currentConfiguration[28] == "white"){
                                    this.currentConfiguration[28] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[16] == "white"){
                                    this.currentConfiguration[16] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[4] = this.lastConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //B2
                                // need to change color from second column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[29] == "white"){
                                    this.currentConfiguration[29] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[17] == "white"){
                                    this.currentConfiguration[17] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[5] = this.lastConfiguration[movedIndex]
                                } 

                            }
                            else { // B3
                                // need to change color from third column
                                // so indices 6, 18, 30
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[30] == "white"){
                                    this.currentConfiguration[30] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[18] == "white"){
                                    this.currentConfiguration[18] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[6] = this.lastConfiguration[movedIndex]
                                } 
                            }
                        }

                        else{ //room C

                            if (positionTo.includes('1')){ // C1
                                // need to change color from first column
                                // so indices 8, 20, 32
                                // find the topmost index that is white:
                                if(this.currentConfiguration[32] == "white"){
                                    this.currentConfiguration[32] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[20] == "white"){
                                    this.currentConfiguration[20] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 8 is white
                                    this.currentConfiguration[8] = this.lastConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //C2
                                // need to change color from second column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[33] == "white"){
                                    this.currentConfiguration[33] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[21] == "white"){
                                    this.currentConfiguration[21] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[9] = this.lastConfiguration[movedIndex]
                                } 

                            }
                            else { // C3
                                // need to change color from third column
                                // so indices 10, 22, 34
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[34] == "white"){
                                    this.currentConfiguration[34] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[22] == "white"){
                                    this.currentConfiguration[22] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[10] = this.lastConfiguration[movedIndex]
                                } 
                            }

                        }

                        // having made changes to currentConfiguration, now make the table for helper

                        W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                        W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                        W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                        W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                        W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                        W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                        W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                        W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                        W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                        W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                        W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                        W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                        
                        W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                        W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                        W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                        W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                        W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                        W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                        W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                        W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                        W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                        W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                        W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                        W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                        
                        W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                        W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                        W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                        W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                        W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                        W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                        W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                        W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                        W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                        W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                        W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                        W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                        // now record the response of the Helper


                    var el = W.getElementById("blocks");

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

                }

                else{
                    // if the architect answered a question

                    W.setInnerHTML('cluepasttxt', "The Architect has answered your question: ");
                    W.setInnerHTML('cluepast', this.yesno[this.cluespast.at(-1)]);
                    
                    // display board in most recent format

                    W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    // next Helper makes a move

                    var el = W.getElementById("blocks");

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
                donebutton: false,//disable done button so they cannot proceed without their partner finishing
                frame: 'studyboard.htm',
                cb: function() {//set the board for the guesser

                    // here we need to change the positions

                    var moveChoice1 = this.cluespast.at(-1)

                    this.lastConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));

                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"

                    if (moveChoice1.includes(" MoveBlockTo ")){
                        // if the Architect moved
                        W.setInnerHTML('cluepasttxt', "You selected to move a block from: ");
                        var moveChoice1 = this.cluespast.at(-1).split(" MoveBlockTo ");
                        var moveFrom = this.positions[moveChoice1[0]]
                        var moveTo = this.positions[moveChoice1[1]]

                        W.setInnerHTML('cluepast', moveFrom + " to " + moveTo);

                        // after reporting, display the changed board to helper

                        // find the room and positions

                        var roomFrom = moveFrom.charAt(0)
                        var positionFrom = moveFrom.charAt(1)

                        var roomTo = moveTo.charAt(0)
                        var positionTo = moveTo.charAt(1)

                        // change color of roomFrom

                        var movedIndex = 26 // set default value

                        // here we need to first make a disconnected copy of the last configuration
                        // so we can use it for roomTo

                        

                        if(roomFrom.includes('A')){ // room A
                            if (positionFrom.includes('1')){
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[0] == "white"){
                                    if(this.currentConfiguration[12] == "white"){
                                        //  change block at index 24 to white, i.e., move it
                                        this.currentConfiguration[24] = "white"
                                        movedIndex = 24
                                    }
                                    else{ // if position 12 is nonwhite
                                        //  change block at index 12 to white, i.e., move it
                                        this.currentConfiguration[12] = "white"
                                        movedIndex = 12
                                    }
                                }
                                else{ // if position 0 is nonwhite
                                    this.currentConfiguration[0] = "white"
                                    movedIndex = 0
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[1] == "white"){
                                    if(this.currentConfiguration[13] == "white"){
                                        //  change block at index 25 to white, i.e., move it
                                        this.currentConfiguration[25] = "white"
                                        movedIndex = 25
                                    }
                                    else{ // if position 13 is nonwhite
                                        //  change block at index 13 to white, i.e., move it
                                        this.currentConfiguration[13] = "white"
                                        movedIndex = 13
                                    }
                                }
                                else{ // if position 1 is nonwhite
                                    this.currentConfiguration[1] = "white"
                                    movedIndex = 1
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 2, 14, 26
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[2] == "white"){
                                    if(this.currentConfiguration[14] == "white"){
                                        //  change block at index 26 to white, i.e., move it
                                        this.currentConfiguration[26] = "white"
                                        movedIndex = 26
                                    }
                                    else{ // if position 14 is nonwhite
                                        //  change block at index 14 to white, i.e., move it
                                        this.currentConfiguration[14] = "white"
                                        movedIndex = 14

                                    }
                                }
                                else{ // if position 2 is nonwhite
                                    this.currentConfiguration[2] = "white"
                                    movedIndex = 2
                                } 
                            }

                        }
                        else if(roomFrom.includes('B')){ //room B
                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 4, 16, 28
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[4] == "white"){
                                    if(this.currentConfiguration[16] == "white"){
                                        //  change block at index 28 to white, i.e., move it
                                        this.currentConfiguration[28] = "white"
                                        movedIndex = 28
                                    }
                                    else{ // if position 16 is nonwhite
                                        //  change block at index 16 to white, i.e., move it
                                        this.currentConfiguration[16] = "white"
                                        movedIndex = 16
                                    }
                                }
                                else{ // if position 4 is nonwhite
                                    this.currentConfiguration[4] = "white"
                                    movedIndex = 4
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[5] == "white"){
                                    if(this.currentConfiguration[17] == "white"){
                                        //  change block at index 29 to white, i.e., move it
                                        this.currentConfiguration[29] = "white"
                                        movedIndex = 29
                                    }
                                    else{ // if position 17 is nonwhite
                                        //  change block at index 17 to white, i.e., move it
                                        this.currentConfiguration[17] = "white"
                                        movedIndex = 17
                                    }
                                }
                                else{ // if position 5 is nonwhite
                                    this.currentConfiguration[5] = "white"
                                    movedIndex = 5
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 6, 18, 30
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[6] == "white"){
                                    if(this.currentConfiguration[18] == "white"){
                                        //  change block at index 30 to white, i.e., move it
                                        this.currentConfiguration[30] = "white"
                                        movedIndex = 30
                                    }
                                    else{ // if position 18 is nonwhite
                                        //  change block at index 18 to white, i.e., move it
                                        this.currentConfiguration[18] = "white"
                                        movedIndex = 18

                                    }
                                }
                                else{ // if position 6 is nonwhite
                                    this.currentConfiguration[6] = "white"
                                    movedIndex = 6
                                } 
                            }
                        }

                        else{ //room C

                            if (positionFrom.includes('1')){
                                // need to change color from fifth column
                                // so indices 8, 20, 32
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[8] == "white"){
                                    if(this.currentConfiguration[20] == "white"){
                                        //  change block at index 32 to white, i.e., move it
                                        this.currentConfiguration[32] = "white"
                                        movedIndex = 32
                                    }
                                    else{ // if position 20 is nonwhite
                                        //  change block at index 20 to white, i.e., move it
                                        this.currentConfiguration[20] = "white"
                                        movedIndex = 20
                                    }
                                }
                                else{ // if position 8 is nonwhite
                                    this.currentConfiguration[8] = "white"
                                    movedIndex = 8
                                }
                            }
                            else if(positionFrom.includes('2')){
                                // need to change color from sixth column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[9] == "white"){
                                    if(this.currentConfiguration[21] == "white"){
                                        //  change block at index 33 to white, i.e., move it
                                        this.currentConfiguration[33] = "white"
                                        movedIndex = 33
                                    }
                                    else{ // if position 21 is nonwhite
                                        //  change block at index 21 to white, i.e., move it
                                        this.currentConfiguration[21] = "white"
                                        movedIndex = 21
                                    }
                                }
                                else{ // if position 9 is nonwhite
                                    this.currentConfiguration[9] = "white"
                                    movedIndex = 9
                                }

                            }
                            else {
                                // need to change color from second column
                                // so indices 10, 22, 34
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[10] == "white"){
                                    if(this.currentConfiguration[22] == "white"){
                                        //  change block at index 34 to white, i.e., move it
                                        this.currentConfiguration[34] = "white"
                                        movedIndex = 34
                                    }
                                    else{ // if position 22 is nonwhite
                                        //  change block at index 22 to white, i.e., move it
                                        this.currentConfiguration[22] = "white"
                                        movedIndex = 22

                                    }
                                }
                                else{ // if position 10 is nonwhite
                                    this.currentConfiguration[10] = "white"
                                    movedIndex = 10
                                } 
                            }

                        }

                        // also change color of roomTo

                        // roomTo's color depends on whatever roomFrom's color was
                        // specifically whatever "index" roomFrom contains
                        // and the location is the lowest white cell in that column

                        if(roomTo.includes('A')){ // room A
                            if (positionTo.includes('1')){ // A1
                                // need to change color from first column
                                // so indices 0, 12, 24
                                // find the topmost index that is white:
                                if(this.currentConfiguration[24] == "white"){
                                    this.currentConfiguration[24] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[12] == "white"){
                                    this.currentConfiguration[12] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[0] = this.lastConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //A2
                                // need to change color from second column
                                // so indices 1, 13, 25
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[25] == "white"){
                                    this.currentConfiguration[25] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[13] == "white"){
                                    this.currentConfiguration[13] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[1] = this.lastConfiguration[movedIndex]
                                } 

                            }
                            else { // A3
                                // need to change color from third column
                                // so indices 2, 14, 26
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[26] == "white"){
                                    this.currentConfiguration[26] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[14] == "white"){
                                    this.currentConfiguration[14] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[2] = this.lastConfiguration[movedIndex]
                                } 
                            }

                        }
                        else if(roomTo.includes('B')){

                            if (positionTo.includes('1')){ // B1
                                // need to change color from first column
                                // so indices 4, 16, 28
                                // find the topmost index that is white:
                                if(this.currentConfiguration[28] == "white"){
                                    this.currentConfiguration[28] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[16] == "white"){
                                    this.currentConfiguration[16] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 0 is white
                                    this.currentConfiguration[4] = this.lastConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //B2
                                // need to change color from second column
                                // so indices 5, 17, 29
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[29] == "white"){
                                    this.currentConfiguration[29] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[17] == "white"){
                                    this.currentConfiguration[17] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[5] = this.lastConfiguration[movedIndex]
                                } 

                            }
                            else { // B3
                                // need to change color from third column
                                // so indices 6, 18, 30
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[30] == "white"){
                                    this.currentConfiguration[30] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[18] == "white"){
                                    this.currentConfiguration[18] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[6] = this.lastConfiguration[movedIndex]
                                } 
                            }
                        }

                        else{ //room C

                            if (positionTo.includes('1')){ // C1
                                // need to change color from first column
                                // so indices 8, 20, 32
                                // find the topmost index that is white:
                                if(this.currentConfiguration[32] == "white"){
                                    this.currentConfiguration[32] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[20] == "white"){
                                    this.currentConfiguration[20] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 8 is white
                                    this.currentConfiguration[8] = this.lastConfiguration[movedIndex]
                                } 
                            }
                            else if(positionTo.includes('2')){ //C2
                                // need to change color from second column
                                // so indices 9, 21, 33
                                // find the topmost index that is non-white
                                if(this.currentConfiguration[33] == "white"){
                                    this.currentConfiguration[33] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[21] == "white"){
                                    this.currentConfiguration[21] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 1 is white
                                    this.currentConfiguration[9] = this.lastConfiguration[movedIndex]
                                } 

                            }
                            else { // C3
                                // need to change color from third column
                                // so indices 10, 22, 34
                                // find the bottom-most index that is non-white
                                if(this.currentConfiguration[34] == "white"){
                                    this.currentConfiguration[34] = this.lastConfiguration[movedIndex]
                                    
                                }
                                else if(this.currentConfiguration[22] == "white"){
                                    this.currentConfiguration[22] = this.lastConfiguration[movedIndex]
                                }
                                else{ // if position 2 is white
                                    this.currentConfiguration[10] = this.lastConfiguration[movedIndex]
                                } 
                            }

                        }

                    W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]

                    }    // close the movement if
                    
                    else{  

                        W.setInnerHTML('cluepasttxt', "You have answered the Helper's question with: ");
                        W.setInnerHTML('cluepast', this.yesno[this.cluespast.at(-1)]);
                        // if the answer was yes/no the
                    W.getElementById("row1cell1").style.backgroundColor = this.currentConfiguration[0]
                    W.getElementById("row1cell2").style.backgroundColor = this.currentConfiguration[1]
                    W.getElementById("row1cell3").style.backgroundColor = this.currentConfiguration[2]
                    W.getElementById("row1cell4").style.backgroundColor = this.currentConfiguration[3]
                    W.getElementById("row1cell5").style.backgroundColor = this.currentConfiguration[4]
                    W.getElementById("row1cell6").style.backgroundColor = this.currentConfiguration[5]
                    W.getElementById("row1cell7").style.backgroundColor = this.currentConfiguration[6]
                    W.getElementById("row1cell8").style.backgroundColor = this.currentConfiguration[7]
                    W.getElementById("row1cell9").style.backgroundColor = this.currentConfiguration[8]
                    W.getElementById("row1cell10").style.backgroundColor = this.currentConfiguration[9]
                    W.getElementById("row1cell11").style.backgroundColor = this.currentConfiguration[10]
                    W.getElementById("row1cell12").style.backgroundColor = this.currentConfiguration[11]
                    
                    W.getElementById("row2cell1").style.backgroundColor = this.currentConfiguration[12]
                    W.getElementById("row2cell2").style.backgroundColor = this.currentConfiguration[13]
                    W.getElementById("row2cell3").style.backgroundColor = this.currentConfiguration[14]
                    W.getElementById("row2cell4").style.backgroundColor = this.currentConfiguration[15]
                    W.getElementById("row2cell5").style.backgroundColor = this.currentConfiguration[16]
                    W.getElementById("row2cell6").style.backgroundColor = this.currentConfiguration[17]
                    W.getElementById("row2cell7").style.backgroundColor = this.currentConfiguration[18]
                    W.getElementById("row2cell8").style.backgroundColor = this.currentConfiguration[19]
                    W.getElementById("row2cell9").style.backgroundColor = this.currentConfiguration[20]
                    W.getElementById("row2cell10").style.backgroundColor = this.currentConfiguration[21]
                    W.getElementById("row2cell11").style.backgroundColor = this.currentConfiguration[22]
                    W.getElementById("row2cell12").style.backgroundColor = this.currentConfiguration[23]
                    
                    W.getElementById("row3cell1").style.backgroundColor = this.currentConfiguration[24]
                    W.getElementById("row3cell2").style.backgroundColor = this.currentConfiguration[25]
                    W.getElementById("row3cell3").style.backgroundColor = this.currentConfiguration[26]
                    W.getElementById("row3cell4").style.backgroundColor = this.currentConfiguration[27]
                    W.getElementById("row3cell5").style.backgroundColor = this.currentConfiguration[28]
                    W.getElementById("row3cell6").style.backgroundColor = this.currentConfiguration[29]
                    W.getElementById("row3cell7").style.backgroundColor = this.currentConfiguration[30]
                    W.getElementById("row3cell8").style.backgroundColor = this.currentConfiguration[31]
                    W.getElementById("row3cell9").style.backgroundColor = this.currentConfiguration[32]
                    W.getElementById("row3cell10").style.backgroundColor = this.currentConfiguration[33]
                    W.getElementById("row3cell11").style.backgroundColor = this.currentConfiguration[34]
                    W.getElementById("row3cell12").style.backgroundColor = this.currentConfiguration[35]
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

    stager.extendStep('feedbackprac', {//tells each player whether the guesser was successful
        role: function() { return this.role; },
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'feedbackCG.htm',
                cb: function() {
                    var myDiv = W.getElementById("cganswers");
                    var myDiv2 = W.getElementById("cgcorrect");
                    var myDiv3 = W.getElementById("cgnextstep");
                    //var myDiv4 = W.getElementById("cgnextboard");
                    if(this.pairList[this.roundCounter].includes(this.guess1Received)&&this.pairList[this.roundCounter].includes(this.guess2Received)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        var j;
                        for(j=0; j < this.smallRoundCounter; j++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundcounter%3 == 0){
                            myDiv2.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        if(this.roundCounter == this.pracpairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                        var k;
                        for(k=0; k < this.smallRoundCounter; k++){
                            this.cluespast.pop();
                        }
                        this.smallRoundCounter = 0;
                        if(this.roundcounter%3 == 0){
                            myDiv3.innerHTML = "You will now move on to the next board. Please click Done.";
                        }
                        if(this.roundCounter == this.pracpairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
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
                        var l;
                        for(l=0; l < this.smallRoundCounter; l++){
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
