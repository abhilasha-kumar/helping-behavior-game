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

        // define some global functions
        // (1) drawing the table
        // (2) enableDragDrop
        // (3) provideFeedback

        node.game.drawTable = function(W, shapeconfig,colorconfig ){

            if(shapeconfig[0] == "circle"){
                W.getElementById("circlerow1cell01").style.backgroundColor = colorconfig[0]
                W.getElementById("row1cell01").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell01").style.backgroundColor = colorconfig[0]
                W.getElementById("row1cell01").style.backgroundColor = colorconfig[0]}   
            
            
            if(shapeconfig[1] == "circle"){
                W.getElementById("circlerow1cell02").style.backgroundColor = colorconfig[1]
                W.getElementById("row1cell02").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell02").style.backgroundColor = colorconfig[1]
                W.getElementById("row1cell02").style.backgroundColor = colorconfig[1]}     
            
            if(shapeconfig[2] == "circle"){
                W.getElementById("circlerow1cell03").style.backgroundColor = colorconfig[2]
                W.getElementById("row1cell03").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell03").style.backgroundColor = colorconfig[2]
                W.getElementById("row1cell03").style.backgroundColor = colorconfig[2]}     
            
            if(shapeconfig[3] == "circle"){
                W.getElementById("circlerow1cell04").style.backgroundColor = colorconfig[3]
                W.getElementById("row1cell04").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell04").style.backgroundColor = colorconfig[3]
                W.getElementById("row1cell04").style.backgroundColor = colorconfig[3]}     
            
            if(shapeconfig[4] == "circle"){
                W.getElementById("circlerow1cell05").style.backgroundColor = colorconfig[4]
                W.getElementById("row1cell05").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell05").style.backgroundColor = colorconfig[4]
                W.getElementById("row1cell05").style.backgroundColor = colorconfig[4]}     
            
            if(shapeconfig[5] == "circle"){
                W.getElementById("circlerow1cell06").style.backgroundColor = colorconfig[5]
                W.getElementById("row1cell06").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell06").style.backgroundColor = colorconfig[5]
                W.getElementById("row1cell06").style.backgroundColor = colorconfig[5]}     
            
            if(shapeconfig[6] == "circle"){
                W.getElementById("circlerow1cell07").style.backgroundColor = colorconfig[6]
                W.getElementById("row1cell07").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell07").style.backgroundColor = colorconfig[6]
                W.getElementById("row1cell07").style.backgroundColor = colorconfig[6]}     
            
            if(shapeconfig[7] == "circle"){
                W.getElementById("circlerow1cell08").style.backgroundColor = colorconfig[7]
                W.getElementById("row1cell08").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell08").style.backgroundColor = colorconfig[7]
                W.getElementById("row1cell08").style.backgroundColor = colorconfig[7]}     
            
            if(shapeconfig[8] == "circle"){
                W.getElementById("circlerow1cell09").style.backgroundColor = colorconfig[8]
                W.getElementById("row1cell09").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell09").style.backgroundColor = colorconfig[8]
                W.getElementById("row1cell09").style.backgroundColor = colorconfig[8]}     
            
            if(shapeconfig[9] == "circle"){
                W.getElementById("circlerow1cell10").style.backgroundColor = colorconfig[9]
                W.getElementById("row1cell10").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell10").style.backgroundColor = colorconfig[9]
                W.getElementById("row1cell10").style.backgroundColor = colorconfig[9]}     
            
            if(shapeconfig[10] == "circle"){
                W.getElementById("circlerow1cell11").style.backgroundColor = colorconfig[10]
                W.getElementById("row1cell11").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell11").style.backgroundColor = colorconfig[10]
                W.getElementById("row1cell11").style.backgroundColor = colorconfig[10]}     

            if(shapeconfig[11] == "circle"){
                W.getElementById("circlerow1cell12").style.backgroundColor = colorconfig[11]
                W.getElementById("row1cell12").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell12").style.backgroundColor = colorconfig[11]
                W.getElementById("row1cell12").style.backgroundColor = colorconfig[11]}     

            if(shapeconfig[12] == "circle"){
                 W.getElementById("circlerow1cell13").style.backgroundColor = colorconfig[12]
                W.getElementById("row1cell13").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell13").style.backgroundColor = colorconfig[12]
                W.getElementById("row1cell13").style.backgroundColor = colorconfig[12]}     
                
            
            if(shapeconfig[13] == "circle"){
                W.getElementById("circlerow1cell14").style.backgroundColor = colorconfig[13]
                W.getElementById("row1cell14").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell14").style.backgroundColor = colorconfig[13]
                W.getElementById("row1cell14").style.backgroundColor = colorconfig[13]}     

            if(shapeconfig[14] == "circle"){
                W.getElementById("circlerow1cell15").style.backgroundColor = colorconfig[14]
                W.getElementById("row1cell15").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell15").style.backgroundColor = colorconfig[14]
                W.getElementById("row1cell15").style.backgroundColor = colorconfig[14]}     
            
            if(shapeconfig[15] == "circle"){
                W.getElementById("circlerow1cell16").style.backgroundColor = colorconfig[15]
                W.getElementById("row1cell16").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell16").style.backgroundColor = colorconfig[15]
                W.getElementById("row1cell16").style.backgroundColor = colorconfig[15]}     

            if(shapeconfig[16] == "circle"){
                W.getElementById("circlerow1cell17").style.backgroundColor = colorconfig[16]
                W.getElementById("row1cell17").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell17").style.backgroundColor = colorconfig[16]
                W.getElementById("row1cell17").style.backgroundColor = colorconfig[16]}     

            if(shapeconfig[17] == "circle"){
                W.getElementById("circlerow1cell18").style.backgroundColor = colorconfig[17]
                W.getElementById("row1cell18").style.backgroundColor = "white"}else{
                W.getElementById("circlerow1cell18").style.backgroundColor = colorconfig[17]
                W.getElementById("row1cell18").style.backgroundColor = colorconfig[17]} 
                
                

        // row 2

        if(shapeconfig[18] == "circle"){
            W.getElementById("circlerow2cell01").style.backgroundColor = colorconfig[18]
            W.getElementById("row2cell01").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell01").style.backgroundColor = colorconfig[18]
            W.getElementById("row2cell01").style.backgroundColor = colorconfig[18]}     
        
        if(shapeconfig[19] == "circle"){
            W.getElementById("circlerow2cell02").style.backgroundColor = colorconfig[19]
            W.getElementById("row2cell02").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell02").style.backgroundColor = colorconfig[19]
            W.getElementById("row2cell02").style.backgroundColor = colorconfig[19]}     
        
        if(shapeconfig[20] == "circle"){
            W.getElementById("circlerow2cell03").style.backgroundColor = colorconfig[20]
            W.getElementById("row2cell03").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell03").style.backgroundColor = colorconfig[20]
            W.getElementById("row2cell03").style.backgroundColor = colorconfig[20]}     
        
        if(shapeconfig[21] == "circle"){
            W.getElementById("circlerow2cell04").style.backgroundColor = colorconfig[21]
            W.getElementById("row2cell04").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell04").style.backgroundColor = colorconfig[21]
            W.getElementById("row2cell04").style.backgroundColor = colorconfig[21]}     
        
        if(shapeconfig[22] == "circle"){
            W.getElementById("circlerow2cell05").style.backgroundColor = colorconfig[22]
            W.getElementById("row2cell05").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell05").style.backgroundColor = colorconfig[22]
            W.getElementById("row2cell05").style.backgroundColor = colorconfig[22]}     
        
        if(shapeconfig[23] == "circle"){
            W.getElementById("circlerow2cell06").style.backgroundColor = colorconfig[23]
            W.getElementById("row2cell06").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell06").style.backgroundColor = colorconfig[23]
            W.getElementById("row2cell06").style.backgroundColor = colorconfig[23]}     
        
        if(shapeconfig[24] == "circle"){
            W.getElementById("circlerow2cell07").style.backgroundColor = colorconfig[24]
            W.getElementById("row2cell07").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell07").style.backgroundColor = colorconfig[24]
            W.getElementById("row2cell07").style.backgroundColor = colorconfig[24]}     
        
        if(shapeconfig[25] == "circle"){
            W.getElementById("circlerow2cell08").style.backgroundColor = colorconfig[25]
            W.getElementById("row2cell08").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell08").style.backgroundColor = colorconfig[25]
            W.getElementById("row2cell08").style.backgroundColor = colorconfig[25]}     
        
        if(shapeconfig[26] == "circle"){
            W.getElementById("circlerow2cell09").style.backgroundColor = colorconfig[26]
            W.getElementById("row2cell09").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell09").style.backgroundColor = colorconfig[26]
            W.getElementById("row2cell09").style.backgroundColor = colorconfig[26]}     
        
        if(shapeconfig[27] == "circle"){
            W.getElementById("circlerow2cell10").style.backgroundColor = colorconfig[27]
            W.getElementById("row2cell10").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell10").style.backgroundColor = colorconfig[27]
            W.getElementById("row2cell10").style.backgroundColor = colorconfig[27]}     
        
        if(shapeconfig[28] == "circle"){
            W.getElementById("circlerow2cell11").style.backgroundColor = colorconfig[28]
            W.getElementById("row2cell11").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell11").style.backgroundColor = colorconfig[28]
            W.getElementById("row2cell11").style.backgroundColor = colorconfig[28]}     

        if(shapeconfig[29] == "circle"){
            W.getElementById("circlerow2cell12").style.backgroundColor = colorconfig[29]
            W.getElementById("row2cell12").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell12").style.backgroundColor = colorconfig[29]
            W.getElementById("row2cell12").style.backgroundColor = colorconfig[29]}     

        if(shapeconfig[30] == "circle"){
            W.getElementById("circlerow2cell13").style.backgroundColor = colorconfig[30]
            W.getElementById("row2cell13").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell13").style.backgroundColor = colorconfig[30]
            W.getElementById("row2cell13").style.backgroundColor = colorconfig[30]}     
        
        if(shapeconfig[31] == "circle"){
            W.getElementById("circlerow2cell14").style.backgroundColor = colorconfig[31]
            W.getElementById("row2cell14").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell14").style.backgroundColor = colorconfig[31]
            W.getElementById("row2cell14").style.backgroundColor = colorconfig[31]}     

        if(shapeconfig[32] == "circle"){
            W.getElementById("circlerow2cell15").style.backgroundColor = colorconfig[32]
            W.getElementById("row2cell15").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell15").style.backgroundColor = colorconfig[32]
            W.getElementById("row2cell15").style.backgroundColor = colorconfig[32]}     
        
        if(shapeconfig[33] == "circle"){
            W.getElementById("circlerow2cell16").style.backgroundColor = colorconfig[33]
            W.getElementById("row2cell16").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell16").style.backgroundColor = colorconfig[33]
            W.getElementById("row2cell16").style.backgroundColor = colorconfig[33]}     

        if(shapeconfig[34] == "circle"){
            W.getElementById("circlerow2cell17").style.backgroundColor = colorconfig[34]
            W.getElementById("row2cell17").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell17").style.backgroundColor = colorconfig[34]
            W.getElementById("row2cell17").style.backgroundColor = colorconfig[34]}     

        if(shapeconfig[35] == "circle"){
            W.getElementById("circlerow2cell18").style.backgroundColor = colorconfig[35]
            W.getElementById("row2cell18").style.backgroundColor = "white"}else{
            W.getElementById("circlerow2cell18").style.backgroundColor = colorconfig[35]
            W.getElementById("row2cell18").style.backgroundColor = colorconfig[35]} 
        
       // row 3
       
       if(shapeconfig[36] == "circle"){
        W.getElementById("circlerow3cell01").style.backgroundColor = colorconfig[36]
        W.getElementById("row3cell01").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell01").style.backgroundColor = colorconfig[36]
        W.getElementById("row3cell01").style.backgroundColor = colorconfig[36]}     
    
    if(shapeconfig[37] == "circle"){
        W.getElementById("circlerow3cell02").style.backgroundColor = colorconfig[37]
        W.getElementById("row3cell02").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell02").style.backgroundColor = colorconfig[37]
        W.getElementById("row3cell02").style.backgroundColor = colorconfig[37]}     
    
    if(shapeconfig[38] == "circle"){
        W.getElementById("circlerow3cell03").style.backgroundColor = colorconfig[38]
        W.getElementById("row3cell03").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell03").style.backgroundColor = colorconfig[38]
        W.getElementById("row3cell03").style.backgroundColor = colorconfig[38]}     
    
    if(shapeconfig[39] == "circle"){
        W.getElementById("circlerow3cell04").style.backgroundColor = colorconfig[39]
        W.getElementById("row3cell04").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell04").style.backgroundColor = colorconfig[39]
        W.getElementById("row3cell04").style.backgroundColor = colorconfig[39]}     
    
    if(shapeconfig[40] == "circle"){
        W.getElementById("circlerow3cell05").style.backgroundColor = colorconfig[40]
        W.getElementById("row3cell05").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell05").style.backgroundColor = colorconfig[40]
        W.getElementById("row3cell05").style.backgroundColor = colorconfig[40]}     
    
    if(shapeconfig[41] == "circle"){
        W.getElementById("circlerow3cell06").style.backgroundColor = colorconfig[41]
        W.getElementById("row3cell06").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell06").style.backgroundColor = colorconfig[41]
        W.getElementById("row3cell06").style.backgroundColor = colorconfig[41]}     
    
    if(shapeconfig[42] == "circle"){
        W.getElementById("circlerow3cell07").style.backgroundColor = colorconfig[42]
        W.getElementById("row3cell07").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell07").style.backgroundColor = colorconfig[42]
        W.getElementById("row3cell07").style.backgroundColor = colorconfig[42]}     
    
    if(shapeconfig[43] == "circle"){
        W.getElementById("circlerow3cell08").style.backgroundColor = colorconfig[43]
        W.getElementById("row3cell08").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell08").style.backgroundColor = colorconfig[43]
        W.getElementById("row3cell08").style.backgroundColor = colorconfig[43]}     
    
    if(shapeconfig[44] == "circle"){
        W.getElementById("circlerow3cell09").style.backgroundColor = colorconfig[44]
        W.getElementById("row3cell09").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell09").style.backgroundColor = colorconfig[44]
        W.getElementById("row3cell09").style.backgroundColor = colorconfig[44]}     
    
    if(shapeconfig[45] == "circle"){
        W.getElementById("circlerow3cell10").style.backgroundColor = colorconfig[45]
        W.getElementById("row3cell10").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell10").style.backgroundColor = colorconfig[45]
        W.getElementById("row3cell10").style.backgroundColor = colorconfig[45]}     
    
    if(shapeconfig[46] == "circle"){
        W.getElementById("circlerow3cell11").style.backgroundColor = colorconfig[46]
        W.getElementById("row3cell11").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell11").style.backgroundColor = colorconfig[46]
        W.getElementById("row3cell11").style.backgroundColor = colorconfig[46]}     

    if(shapeconfig[47] == "circle"){
        W.getElementById("circlerow3cell12").style.backgroundColor = colorconfig[47]
        W.getElementById("row3cell12").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell12").style.backgroundColor = colorconfig[47]
        W.getElementById("row3cell12").style.backgroundColor = colorconfig[47]}     

    if(shapeconfig[48] == "circle"){
        W.getElementById("circlerow3cell13").style.backgroundColor = colorconfig[48]
        W.getElementById("row3cell13").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell13").style.backgroundColor = colorconfig[48]
        W.getElementById("row3cell13").style.backgroundColor = colorconfig[48]}     
    
    if(shapeconfig[49] == "circle"){
        W.getElementById("circlerow3cell14").style.backgroundColor = colorconfig[49]
        W.getElementById("row3cell14").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell14").style.backgroundColor = colorconfig[49]
        W.getElementById("row3cell14").style.backgroundColor = colorconfig[49]}     

    if(shapeconfig[50] == "circle"){
        W.getElementById("circlerow3cell15").style.backgroundColor = colorconfig[50]
        W.getElementById("row3cell15").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell15").style.backgroundColor = colorconfig[50]
        W.getElementById("row3cell15").style.backgroundColor = colorconfig[50]}     
    
    if(shapeconfig[51] == "circle"){
        W.getElementById("circlerow3cell16").style.backgroundColor = colorconfig[51]
        W.getElementById("row3cell16").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell16").style.backgroundColor = colorconfig[51]
        W.getElementById("row3cell16").style.backgroundColor = colorconfig[51]}     

    if(shapeconfig[52] == "circle"){
        W.getElementById("circlerow3cell17").style.backgroundColor = colorconfig[52]
        W.getElementById("row3cell17").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell17").style.backgroundColor = colorconfig[52]
        W.getElementById("row3cell17").style.backgroundColor = colorconfig[52]}     

    if(shapeconfig[53] == "circle"){
        W.getElementById("circlerow3cell18").style.backgroundColor = colorconfig[53]
        W.getElementById("row3cell18").style.backgroundColor = "white"}else{
        W.getElementById("circlerow3cell18").style.backgroundColor = colorconfig[53]
        W.getElementById("row3cell18").style.backgroundColor = colorconfig[53]} 

    // row4

    if(shapeconfig[54] == "circle"){
        W.getElementById("circlerow4cell01").style.backgroundColor = colorconfig[54]
        W.getElementById("row4cell01").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell01").style.backgroundColor = colorconfig[54]
        W.getElementById("row4cell01").style.backgroundColor = colorconfig[54]}     
    
    if(shapeconfig[55] == "circle"){
        W.getElementById("circlerow4cell02").style.backgroundColor = colorconfig[55]
        W.getElementById("row4cell02").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell02").style.backgroundColor = colorconfig[55]
        W.getElementById("row4cell02").style.backgroundColor = colorconfig[55]}     
    
    if(shapeconfig[56] == "circle"){
        W.getElementById("circlerow4cell03").style.backgroundColor = colorconfig[56]
        W.getElementById("row4cell03").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell03").style.backgroundColor = colorconfig[56]
        W.getElementById("row4cell03").style.backgroundColor = colorconfig[56]}     
    
    if(shapeconfig[57] == "circle"){
        W.getElementById("circlerow4cell04").style.backgroundColor = colorconfig[57]
        W.getElementById("row4cell04").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell04").style.backgroundColor = colorconfig[57]
        W.getElementById("row4cell04").style.backgroundColor = colorconfig[57]}     
    
    if(shapeconfig[58] == "circle"){
        W.getElementById("circlerow4cell05").style.backgroundColor = colorconfig[58]
        W.getElementById("row4cell05").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell05").style.backgroundColor = colorconfig[58]
        W.getElementById("row4cell05").style.backgroundColor = colorconfig[58]}     
    
    if(shapeconfig[59] == "circle"){
        W.getElementById("circlerow4cell06").style.backgroundColor = colorconfig[59]
        W.getElementById("row4cell06").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell06").style.backgroundColor = colorconfig[59]
        W.getElementById("row4cell06").style.backgroundColor = colorconfig[59]}     
    
    if(shapeconfig[60] == "circle"){
        W.getElementById("circlerow4cell07").style.backgroundColor = colorconfig[60]
        W.getElementById("row4cell07").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell07").style.backgroundColor = colorconfig[60]
        W.getElementById("row4cell07").style.backgroundColor = colorconfig[60]}     
    
    if(shapeconfig[61] == "circle"){
        W.getElementById("circlerow4cell08").style.backgroundColor = colorconfig[61]
        W.getElementById("row4cell08").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell08").style.backgroundColor = colorconfig[61]
        W.getElementById("row4cell08").style.backgroundColor = colorconfig[61]}     
    
    if(shapeconfig[62] == "circle"){
        W.getElementById("circlerow4cell09").style.backgroundColor = colorconfig[62]
        W.getElementById("row4cell09").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell09").style.backgroundColor = colorconfig[62]
        W.getElementById("row4cell09").style.backgroundColor = colorconfig[62]}     
    
    if(shapeconfig[63] == "circle"){
        W.getElementById("circlerow4cell10").style.backgroundColor = colorconfig[63]
        W.getElementById("row4cell10").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell10").style.backgroundColor = colorconfig[63]
        W.getElementById("row4cell10").style.backgroundColor = colorconfig[63]}     
    
    if(shapeconfig[64] == "circle"){
        W.getElementById("circlerow4cell11").style.backgroundColor = colorconfig[64]
        W.getElementById("row4cell11").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell11").style.backgroundColor = colorconfig[64]
        W.getElementById("row4cell11").style.backgroundColor = colorconfig[64]}     

    if(shapeconfig[65] == "circle"){
        W.getElementById("circlerow4cell12").style.backgroundColor = colorconfig[65]
        W.getElementById("row4cell12").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell12").style.backgroundColor = colorconfig[65]
        W.getElementById("row4cell12").style.backgroundColor = colorconfig[65]}     

    if(shapeconfig[66] == "circle"){
        W.getElementById("circlerow4cell13").style.backgroundColor = colorconfig[66]
        W.getElementById("row4cell13").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell13").style.backgroundColor = colorconfig[66]
        W.getElementById("row4cell13").style.backgroundColor = colorconfig[66]}     
    
    if(shapeconfig[67] == "circle"){
        W.getElementById("circlerow4cell14").style.backgroundColor = colorconfig[67]
        W.getElementById("row4cell14").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell14").style.backgroundColor = colorconfig[67]
        W.getElementById("row4cell14").style.backgroundColor = colorconfig[67]}     

    if(shapeconfig[68] == "circle"){
        W.getElementById("circlerow4cell15").style.backgroundColor = colorconfig[68]
        W.getElementById("row4cell15").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell15").style.backgroundColor = colorconfig[68]
        W.getElementById("row4cell15").style.backgroundColor = colorconfig[68]}     
    
    if(shapeconfig[69] == "circle"){
        W.getElementById("circlerow4cell16").style.backgroundColor = colorconfig[69]
        W.getElementById("row4cell16").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell16").style.backgroundColor = colorconfig[69]
        W.getElementById("row4cell16").style.backgroundColor = colorconfig[69]}     

    if(shapeconfig[70] == "circle"){
        W.getElementById("circlerow4cell17").style.backgroundColor = colorconfig[70]
        W.getElementById("row4cell17").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell17").style.backgroundColor = colorconfig[70]
        W.getElementById("row4cell17").style.backgroundColor = colorconfig[70]}     

    if(shapeconfig[71] == "circle"){
        W.getElementById("circlerow4cell18").style.backgroundColor = colorconfig[71]
        W.getElementById("row4cell18").style.backgroundColor = "white"}else{
        W.getElementById("circlerow4cell18").style.backgroundColor = colorconfig[71]
        W.getElementById("row4cell18").style.backgroundColor = colorconfig[71]} 

    // row5
    if(shapeconfig[72] == "circle"){
        W.getElementById("circlerow5cell01").style.backgroundColor = colorconfig[72]
        W.getElementById("row5cell01").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell01").style.backgroundColor = colorconfig[72]
        W.getElementById("row5cell01").style.backgroundColor = colorconfig[72]}     
    
    if(shapeconfig[73] == "circle"){
        W.getElementById("circlerow5cell02").style.backgroundColor = colorconfig[73]
        W.getElementById("row5cell02").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell02").style.backgroundColor = colorconfig[73]
        W.getElementById("row5cell02").style.backgroundColor = colorconfig[73]}     
    
    if(shapeconfig[74] == "circle"){
        W.getElementById("circlerow5cell03").style.backgroundColor = colorconfig[74]
        W.getElementById("row5cell03").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell03").style.backgroundColor = colorconfig[74]
        W.getElementById("row5cell03").style.backgroundColor = colorconfig[74]}     
    
    if(shapeconfig[75] == "circle"){
        W.getElementById("circlerow5cell04").style.backgroundColor = colorconfig[75]
        W.getElementById("row5cell04").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell04").style.backgroundColor = colorconfig[75]
        W.getElementById("row5cell04").style.backgroundColor = colorconfig[75]}     
    
    if(shapeconfig[76] == "circle"){
        W.getElementById("circlerow5cell05").style.backgroundColor = colorconfig[76]
        W.getElementById("row5cell05").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell05").style.backgroundColor = colorconfig[76]
        W.getElementById("row5cell05").style.backgroundColor = colorconfig[76]}     
    
    if(shapeconfig[77] == "circle"){
        W.getElementById("circlerow5cell06").style.backgroundColor = colorconfig[77]
        W.getElementById("row5cell06").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell06").style.backgroundColor = colorconfig[77]
        W.getElementById("row5cell06").style.backgroundColor = colorconfig[77]}     
    
    if(shapeconfig[78] == "circle"){
        W.getElementById("circlerow5cell07").style.backgroundColor = colorconfig[78]
        W.getElementById("row5cell07").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell07").style.backgroundColor = colorconfig[78]
        W.getElementById("row5cell07").style.backgroundColor = colorconfig[78]}     
    
    if(shapeconfig[79] == "circle"){
        W.getElementById("circlerow5cell08").style.backgroundColor = colorconfig[79]
        W.getElementById("row5cell08").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell08").style.backgroundColor = colorconfig[79]
        W.getElementById("row5cell08").style.backgroundColor = colorconfig[79]}     
    
    if(shapeconfig[80] == "circle"){
        W.getElementById("circlerow5cell09").style.backgroundColor = colorconfig[80]
        W.getElementById("row5cell09").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell09").style.backgroundColor = colorconfig[80]
        W.getElementById("row5cell09").style.backgroundColor = colorconfig[80]}     
    
    if(shapeconfig[81] == "circle"){
        W.getElementById("circlerow5cell10").style.backgroundColor = colorconfig[81]
        W.getElementById("row5cell10").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell10").style.backgroundColor = colorconfig[81]
        W.getElementById("row5cell10").style.backgroundColor = colorconfig[81]}     
    
    if(shapeconfig[82] == "circle"){
        W.getElementById("circlerow5cell11").style.backgroundColor = colorconfig[82]
        W.getElementById("row5cell11").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell11").style.backgroundColor = colorconfig[82]
        W.getElementById("row5cell11").style.backgroundColor = colorconfig[82]}     

    if(shapeconfig[83] == "circle"){
        W.getElementById("circlerow5cell12").style.backgroundColor = colorconfig[83]
        W.getElementById("row5cell12").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell12").style.backgroundColor = colorconfig[83]
        W.getElementById("row5cell12").style.backgroundColor = colorconfig[83]}     

    if(shapeconfig[84] == "circle"){
        W.getElementById("circlerow5cell13").style.backgroundColor = colorconfig[84]
        W.getElementById("row5cell13").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell13").style.backgroundColor = colorconfig[84]
        W.getElementById("row5cell13").style.backgroundColor = colorconfig[84]}     
    
    if(shapeconfig[85] == "circle"){
        W.getElementById("circlerow5cell14").style.backgroundColor = colorconfig[85]
        W.getElementById("row5cell14").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell14").style.backgroundColor = colorconfig[85]
        W.getElementById("row5cell14").style.backgroundColor = colorconfig[85]}     

    if(shapeconfig[86] == "circle"){
        W.getElementById("circlerow5cell15").style.backgroundColor = colorconfig[86]
        W.getElementById("row5cell15").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell15").style.backgroundColor = colorconfig[86]
        W.getElementById("row5cell15").style.backgroundColor = colorconfig[86]}     
    
    if(shapeconfig[87] == "circle"){
        W.getElementById("circlerow5cell16").style.backgroundColor = colorconfig[87]
        W.getElementById("row5cell16").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell16").style.backgroundColor = colorconfig[87]
        W.getElementById("row5cell16").style.backgroundColor = colorconfig[87]}     

    if(shapeconfig[88] == "circle"){
        W.getElementById("circlerow5cell17").style.backgroundColor = colorconfig[88]
        W.getElementById("row5cell17").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell17").style.backgroundColor = colorconfig[88]
        W.getElementById("row5cell17").style.backgroundColor = colorconfig[88]}     

    if(shapeconfig[89] == "circle"){
        W.getElementById("circlerow5cell18").style.backgroundColor = colorconfig[89]
        W.getElementById("row5cell18").style.backgroundColor = "white"}else{
        W.getElementById("circlerow5cell18").style.backgroundColor = colorconfig[89]
        W.getElementById("row5cell18").style.backgroundColor = colorconfig[89]} 

    // row6
    if(shapeconfig[90] == "circle"){
        W.getElementById("circlerow6cell01").style.backgroundColor = colorconfig[90]
        W.getElementById("row6cell01").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell01").style.backgroundColor = colorconfig[90]
        W.getElementById("row6cell01").style.backgroundColor = colorconfig[90]}     
    
    if(shapeconfig[91] == "circle"){
        W.getElementById("circlerow6cell02").style.backgroundColor = colorconfig[91]
        W.getElementById("row6cell02").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell02").style.backgroundColor = colorconfig[91]
        W.getElementById("row6cell02").style.backgroundColor = colorconfig[91]}     
    
    if(shapeconfig[92] == "circle"){
        W.getElementById("circlerow6cell03").style.backgroundColor = colorconfig[92]
        W.getElementById("row6cell03").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell03").style.backgroundColor = colorconfig[92]
        W.getElementById("row6cell03").style.backgroundColor = colorconfig[92]}     
    
    if(shapeconfig[93] == "circle"){
        W.getElementById("circlerow6cell04").style.backgroundColor = colorconfig[93]
        W.getElementById("row6cell04").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell04").style.backgroundColor = colorconfig[93]
        W.getElementById("row6cell04").style.backgroundColor = colorconfig[93]}     
    
    if(shapeconfig[94] == "circle"){
        W.getElementById("circlerow6cell05").style.backgroundColor = colorconfig[94]
        W.getElementById("row6cell05").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell05").style.backgroundColor = colorconfig[94]
        W.getElementById("row6cell05").style.backgroundColor = colorconfig[94]}     
    
    if(shapeconfig[95] == "circle"){
        W.getElementById("circlerow6cell06").style.backgroundColor = colorconfig[95]
        W.getElementById("row6cell06").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell06").style.backgroundColor = colorconfig[95]
        W.getElementById("row6cell06").style.backgroundColor = colorconfig[95]}     
    
    if(shapeconfig[96] == "circle"){
        W.getElementById("circlerow6cell07").style.backgroundColor = colorconfig[96]
        W.getElementById("row6cell07").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell07").style.backgroundColor = colorconfig[96]
        W.getElementById("row6cell07").style.backgroundColor = colorconfig[96]}     
    
    if(shapeconfig[97] == "circle"){
        W.getElementById("circlerow6cell08").style.backgroundColor = colorconfig[97]
        W.getElementById("row6cell08").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell08").style.backgroundColor = colorconfig[97]
        W.getElementById("row6cell08").style.backgroundColor = colorconfig[97]}     
    
    if(shapeconfig[98] == "circle"){
        W.getElementById("circlerow6cell09").style.backgroundColor = colorconfig[98]
        W.getElementById("row6cell09").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell09").style.backgroundColor = colorconfig[98]
        W.getElementById("row6cell09").style.backgroundColor = colorconfig[98]}     
    
    if(shapeconfig[99] == "circle"){
        W.getElementById("circlerow6cell10").style.backgroundColor = colorconfig[99]
        W.getElementById("row6cell10").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell10").style.backgroundColor = colorconfig[99]
        W.getElementById("row6cell10").style.backgroundColor = colorconfig[99]}     
    
    if(shapeconfig[100] == "circle"){
        W.getElementById("circlerow6cell11").style.backgroundColor = colorconfig[100]
        W.getElementById("row6cell11").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell11").style.backgroundColor = colorconfig[100]
        W.getElementById("row6cell11").style.backgroundColor = colorconfig[100]}     

    if(shapeconfig[101] == "circle"){
        W.getElementById("circlerow6cell12").style.backgroundColor = colorconfig[101]
        W.getElementById("row6cell12").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell12").style.backgroundColor = colorconfig[101]
        W.getElementById("row6cell12").style.backgroundColor = colorconfig[101]}     

    if(shapeconfig[102] == "circle"){
        W.getElementById("circlerow6cell13").style.backgroundColor = colorconfig[102]
        W.getElementById("row6cell13").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell13").style.backgroundColor = colorconfig[102]
        W.getElementById("row6cell13").style.backgroundColor = colorconfig[102]}     
    
    if(shapeconfig[103] == "circle"){
        W.getElementById("circlerow6cell14").style.backgroundColor = colorconfig[103]
        W.getElementById("row6cell14").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell14").style.backgroundColor = colorconfig[103]
        W.getElementById("row6cell14").style.backgroundColor = colorconfig[103]}     

    if(shapeconfig[104] == "circle"){
        W.getElementById("circlerow6cell15").style.backgroundColor = colorconfig[104]
        W.getElementById("row6cell15").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell15").style.backgroundColor = colorconfig[104]
        W.getElementById("row6cell15").style.backgroundColor = colorconfig[104]}     
    
    if(shapeconfig[105] == "circle"){
        W.getElementById("circlerow6cell16").style.backgroundColor = colorconfig[105]
        W.getElementById("row6cell16").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell16").style.backgroundColor = colorconfig[105]
        W.getElementById("row6cell16").style.backgroundColor = colorconfig[105]}     

    if(shapeconfig[106] == "circle"){
        W.getElementById("circlerow6cell17").style.backgroundColor = colorconfig[106]
        W.getElementById("row6cell17").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell17").style.backgroundColor = colorconfig[106]
        W.getElementById("row6cell17").style.backgroundColor = colorconfig[106]}     

    if(shapeconfig[107] == "circle"){
        W.getElementById("circlerow6cell18").style.backgroundColor = colorconfig[107]
        W.getElementById("row6cell18").style.backgroundColor = "white"}else{
        W.getElementById("circlerow6cell18").style.backgroundColor = colorconfig[107]
        W.getElementById("row6cell18").style.backgroundColor = colorconfig[107]} 

        
    return W;    

     /*

            // row7
            if(this.currentShape[108] == "circle"){
                W.getElementById("circlerow7cell01").style.backgroundColor = this.currentConfiguration[108]
                W.getElementById("row7cell01").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell01").style.backgroundColor = this.currentConfiguration[108]
                W.getElementById("row7cell01").style.backgroundColor = this.currentConfiguration[108]}     
            
            if(this.currentShape[109] == "circle"){
                W.getElementById("circlerow7cell02").style.backgroundColor = this.currentConfiguration[109]
                W.getElementById("row7cell02").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell02").style.backgroundColor = this.currentConfiguration[109]
                W.getElementById("row7cell02").style.backgroundColor = this.currentConfiguration[109]}     
            
            if(this.currentShape[110] == "circle"){
                W.getElementById("circlerow7cell03").style.backgroundColor = this.currentConfiguration[110]
                W.getElementById("row7cell03").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell03").style.backgroundColor = this.currentConfiguration[110]
                W.getElementById("row7cell03").style.backgroundColor = this.currentConfiguration[110]}     
            
            if(this.currentShape[111] == "circle"){
                W.getElementById("circlerow7cell04").style.backgroundColor = this.currentConfiguration[111]
                W.getElementById("row7cell04").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell04").style.backgroundColor = this.currentConfiguration[111]
                W.getElementById("row7cell04").style.backgroundColor = this.currentConfiguration[111]}     
            
            if(this.currentShape[112] == "circle"){
                W.getElementById("circlerow7cell05").style.backgroundColor = this.currentConfiguration[112]
                W.getElementById("row7cell05").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell05").style.backgroundColor = this.currentConfiguration[112]
                W.getElementById("row7cell05").style.backgroundColor = this.currentConfiguration[112]}     
            
            if(this.currentShape[113] == "circle"){
                W.getElementById("circlerow7cell06").style.backgroundColor = this.currentConfiguration[113]
                W.getElementById("row7cell06").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell06").style.backgroundColor = this.currentConfiguration[113]
                W.getElementById("row7cell06").style.backgroundColor = this.currentConfiguration[113]}     
            
            if(this.currentShape[114] == "circle"){
                W.getElementById("circlerow7cell07").style.backgroundColor = this.currentConfiguration[114]
                W.getElementById("row7cell07").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell07").style.backgroundColor = this.currentConfiguration[114]
                W.getElementById("row7cell07").style.backgroundColor = this.currentConfiguration[114]}     
            
            if(this.currentShape[115] == "circle"){
                W.getElementById("circlerow7cell08").style.backgroundColor = this.currentConfiguration[115]
                W.getElementById("row7cell08").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell08").style.backgroundColor = this.currentConfiguration[115]
                W.getElementById("row7cell08").style.backgroundColor = this.currentConfiguration[115]}     
            
            if(this.currentShape[116] == "circle"){
                W.getElementById("circlerow7cell09").style.backgroundColor = this.currentConfiguration[116]
                W.getElementById("row7cell09").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell09").style.backgroundColor = this.currentConfiguration[116]
                W.getElementById("row7cell09").style.backgroundColor = this.currentConfiguration[116]}     
            
            if(this.currentShape[117] == "circle"){
                W.getElementById("circlerow7cell10").style.backgroundColor = this.currentConfiguration[117]
                W.getElementById("row7cell10").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell10").style.backgroundColor = this.currentConfiguration[117]
                W.getElementById("row7cell10").style.backgroundColor = this.currentConfiguration[117]}     
            
            if(this.currentShape[118] == "circle"){
                W.getElementById("circlerow7cell11").style.backgroundColor = this.currentConfiguration[118]
                W.getElementById("row7cell11").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell11").style.backgroundColor = this.currentConfiguration[118]
                W.getElementById("row7cell11").style.backgroundColor = this.currentConfiguration[118]}     

            if(this.currentShape[119] == "circle"){
                W.getElementById("circlerow7cell12").style.backgroundColor = this.currentConfiguration[119]
                W.getElementById("row7cell12").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell12").style.backgroundColor = this.currentConfiguration[119]
                W.getElementById("row7cell12").style.backgroundColor = this.currentConfiguration[119]}     

            if(this.currentShape[120] == "circle"){
                W.getElementById("circlerow7cell13").style.backgroundColor = this.currentConfiguration[120]
                W.getElementById("row7cell13").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell13").style.backgroundColor = this.currentConfiguration[120]
                W.getElementById("row7cell13").style.backgroundColor = this.currentConfiguration[120]}     
            
            if(this.currentShape[121] == "circle"){
                W.getElementById("circlerow7cell14").style.backgroundColor = this.currentConfiguration[121]
                W.getElementById("row7cell14").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell14").style.backgroundColor = this.currentConfiguration[121]
                W.getElementById("row7cell14").style.backgroundColor = this.currentConfiguration[121]}     

            if(this.currentShape[122] == "circle"){
                W.getElementById("circlerow7cell15").style.backgroundColor = this.currentConfiguration[122]
                W.getElementById("row7cell15").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell15").style.backgroundColor = this.currentConfiguration[122]
                W.getElementById("row7cell15").style.backgroundColor = this.currentConfiguration[122]}     
            
            if(this.currentShape[123] == "circle"){
                W.getElementById("circlerow7cell16").style.backgroundColor = this.currentConfiguration[123]
                W.getElementById("row7cell16").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell16").style.backgroundColor = this.currentConfiguration[123]
                W.getElementById("row7cell16").style.backgroundColor = this.currentConfiguration[123]}     

            if(this.currentShape[124] == "circle"){
                W.getElementById("circlerow7cell17").style.backgroundColor = this.currentConfiguration[124]
                W.getElementById("row7cell17").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell17").style.backgroundColor = this.currentConfiguration[124]
                W.getElementById("row7cell17").style.backgroundColor = this.currentConfiguration[124]}     

            if(this.currentShape[125] == "circle"){
                W.getElementById("circlerow7cell18").style.backgroundColor = this.currentConfiguration[125]
                W.getElementById("row7cell18").style.backgroundColor = "white"}else{
                W.getElementById("circlerow7cell18").style.backgroundColor = this.currentConfiguration[125]
                W.getElementById("row7cell18").style.backgroundColor = this.currentConfiguration[125]} 

            // row8
            if(this.currentShape[126] == "circle"){
                W.getElementById("circlerow8cell01").style.backgroundColor = this.currentConfiguration[126]
                W.getElementById("row8cell01").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell01").style.backgroundColor = this.currentConfiguration[126]
                W.getElementById("row8cell01").style.backgroundColor = this.currentConfiguration[126]}     
            
            if(this.currentShape[127] == "circle"){
                W.getElementById("circlerow8cell02").style.backgroundColor = this.currentConfiguration[127]
                W.getElementById("row8cell02").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell02").style.backgroundColor = this.currentConfiguration[127]
                W.getElementById("row8cell02").style.backgroundColor = this.currentConfiguration[127]}     
            
            if(this.currentShape[128] == "circle"){
                W.getElementById("circlerow8cell03").style.backgroundColor = this.currentConfiguration[128]
                W.getElementById("row8cell03").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell03").style.backgroundColor = this.currentConfiguration[128]
                W.getElementById("row8cell03").style.backgroundColor = this.currentConfiguration[128]}     
            
            if(this.currentShape[129] == "circle"){
                W.getElementById("circlerow8cell04").style.backgroundColor = this.currentConfiguration[129]
                W.getElementById("row8cell04").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell04").style.backgroundColor = this.currentConfiguration[129]
                W.getElementById("row8cell04").style.backgroundColor = this.currentConfiguration[129]}     
            
            if(this.currentShape[130] == "circle"){
                W.getElementById("circlerow8cell05").style.backgroundColor = this.currentConfiguration[130]
                W.getElementById("row8cell05").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell05").style.backgroundColor = this.currentConfiguration[130]
                W.getElementById("row8cell05").style.backgroundColor = this.currentConfiguration[130]}     
            
            if(this.currentShape[131] == "circle"){
                W.getElementById("circlerow8cell06").style.backgroundColor = this.currentConfiguration[131]
                W.getElementById("row8cell06").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell06").style.backgroundColor = this.currentConfiguration[131]
                W.getElementById("row8cell06").style.backgroundColor = this.currentConfiguration[131]}     
            
            if(this.currentShape[132] == "circle"){
                W.getElementById("circlerow8cell07").style.backgroundColor = this.currentConfiguration[132]
                W.getElementById("row8cell07").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell07").style.backgroundColor = this.currentConfiguration[132]
                W.getElementById("row8cell07").style.backgroundColor = this.currentConfiguration[132]}     
            
            if(this.currentShape[133] == "circle"){
                W.getElementById("circlerow8cell08").style.backgroundColor = this.currentConfiguration[133]
                W.getElementById("row8cell08").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell08").style.backgroundColor = this.currentConfiguration[133]
                W.getElementById("row8cell08").style.backgroundColor = this.currentConfiguration[133]}     
            
            if(this.currentShape[134] == "circle"){
                W.getElementById("circlerow8cell09").style.backgroundColor = this.currentConfiguration[134]
                W.getElementById("row8cell09").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell09").style.backgroundColor = this.currentConfiguration[134]
                W.getElementById("row8cell09").style.backgroundColor = this.currentConfiguration[134]}     
            
            if(this.currentShape[135] == "circle"){
                W.getElementById("circlerow8cell10").style.backgroundColor = this.currentConfiguration[135]
                W.getElementById("row8cell10").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell10").style.backgroundColor = this.currentConfiguration[135]
                W.getElementById("row8cell10").style.backgroundColor = this.currentConfiguration[135]}     
            
            if(this.currentShape[136] == "circle"){
                W.getElementById("circlerow8cell11").style.backgroundColor = this.currentConfiguration[136]
                W.getElementById("row8cell11").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell11").style.backgroundColor = this.currentConfiguration[136]
                W.getElementById("row8cell11").style.backgroundColor = this.currentConfiguration[136]}     

            if(this.currentShape[137] == "circle"){
                W.getElementById("circlerow8cell12").style.backgroundColor = this.currentConfiguration[137]
                W.getElementById("row8cell12").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell12").style.backgroundColor = this.currentConfiguration[137]
                W.getElementById("row8cell12").style.backgroundColor = this.currentConfiguration[137]}     

            if(this.currentShape[138] == "circle"){
                W.getElementById("circlerow8cell13").style.backgroundColor = this.currentConfiguration[138]
                W.getElementById("row8cell13").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell13").style.backgroundColor = this.currentConfiguration[138]
                W.getElementById("row8cell13").style.backgroundColor = this.currentConfiguration[138]}     
            
            if(this.currentShape[139] == "circle"){
                W.getElementById("circlerow8cell14").style.backgroundColor = this.currentConfiguration[139]
                W.getElementById("row8cell14").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell14").style.backgroundColor = this.currentConfiguration[139]
                W.getElementById("row8cell14").style.backgroundColor = this.currentConfiguration[139]}     

            if(this.currentShape[140] == "circle"){
                W.getElementById("circlerow8cell15").style.backgroundColor = this.currentConfiguration[140]
                W.getElementById("row8cell15").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell15").style.backgroundColor = this.currentConfiguration[140]
                W.getElementById("row8cell15").style.backgroundColor = this.currentConfiguration[140]}     
            
            if(this.currentShape[141] == "circle"){
                W.getElementById("circlerow8cell16").style.backgroundColor = this.currentConfiguration[141]
                W.getElementById("row8cell16").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell16").style.backgroundColor = this.currentConfiguration[141]
                W.getElementById("row8cell16").style.backgroundColor = this.currentConfiguration[141]}     

            if(this.currentShape[142] == "circle"){
                W.getElementById("circlerow8cell17").style.backgroundColor = this.currentConfiguration[142]
                W.getElementById("row8cell17").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell17").style.backgroundColor = this.currentConfiguration[142]
                W.getElementById("row8cell17").style.backgroundColor = this.currentConfiguration[142]}     

            if(this.currentShape[143] == "circle"){
                W.getElementById("circlerow8cell18").style.backgroundColor = this.currentConfiguration[143]
                W.getElementById("row8cell18").style.backgroundColor = "white"}else{
                W.getElementById("circlerow8cell18").style.backgroundColor = this.currentConfiguration[143]
                W.getElementById("row8cell18").style.backgroundColor = this.currentConfiguration[143]} 

            // row9

            if(this.currentShape[144] == "circle"){
                W.getElementById("circlerow9cell01").style.backgroundColor = this.currentConfiguration[144]
                W.getElementById("row9cell01").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell01").style.backgroundColor = this.currentConfiguration[144]
                W.getElementById("row9cell01").style.backgroundColor = this.currentConfiguration[144]}     
            
            if(this.currentShape[145] == "circle"){
                W.getElementById("circlerow9cell02").style.backgroundColor = this.currentConfiguration[145]
                W.getElementById("row9cell02").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell02").style.backgroundColor = this.currentConfiguration[145]
                W.getElementById("row9cell02").style.backgroundColor = this.currentConfiguration[145]}     
            
            if(this.currentShape[146] == "circle"){
                W.getElementById("circlerow9cell03").style.backgroundColor = this.currentConfiguration[146]
                W.getElementById("row9cell03").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell03").style.backgroundColor = this.currentConfiguration[146]
                W.getElementById("row9cell03").style.backgroundColor = this.currentConfiguration[146]}     
            
            if(this.currentShape[147] == "circle"){
                W.getElementById("circlerow9cell04").style.backgroundColor = this.currentConfiguration[147]
                W.getElementById("row9cell04").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell04").style.backgroundColor = this.currentConfiguration[147]
                W.getElementById("row9cell04").style.backgroundColor = this.currentConfiguration[147]}     
            
            if(this.currentShape[148] == "circle"){
                W.getElementById("circlerow9cell05").style.backgroundColor = this.currentConfiguration[148]
                W.getElementById("row9cell05").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell05").style.backgroundColor = this.currentConfiguration[148]
                W.getElementById("row9cell05").style.backgroundColor = this.currentConfiguration[148]}     
            
            if(this.currentShape[149] == "circle"){
                W.getElementById("circlerow9cell06").style.backgroundColor = this.currentConfiguration[149]
                W.getElementById("row9cell06").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell06").style.backgroundColor = this.currentConfiguration[149]
                W.getElementById("row9cell06").style.backgroundColor = this.currentConfiguration[149]}     
            
            if(this.currentShape[150] == "circle"){
                W.getElementById("circlerow9cell07").style.backgroundColor = this.currentConfiguration[150]
                W.getElementById("row9cell07").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell07").style.backgroundColor = this.currentConfiguration[150]
                W.getElementById("row9cell07").style.backgroundColor = this.currentConfiguration[150]}     
            
            if(this.currentShape[151] == "circle"){
                W.getElementById("circlerow9cell08").style.backgroundColor = this.currentConfiguration[151]
                W.getElementById("row9cell08").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell08").style.backgroundColor = this.currentConfiguration[151]
                W.getElementById("row9cell08").style.backgroundColor = this.currentConfiguration[151]}     
            
            if(this.currentShape[152] == "circle"){
                W.getElementById("circlerow9cell09").style.backgroundColor = this.currentConfiguration[152]
                W.getElementById("row9cell09").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell09").style.backgroundColor = this.currentConfiguration[152]
                W.getElementById("row9cell09").style.backgroundColor = this.currentConfiguration[152]}     
            
            if(this.currentShape[153] == "circle"){
                W.getElementById("circlerow9cell10").style.backgroundColor = this.currentConfiguration[153]
                W.getElementById("row9cell10").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell10").style.backgroundColor = this.currentConfiguration[153]
                W.getElementById("row9cell10").style.backgroundColor = this.currentConfiguration[153]}     
            
            if(this.currentShape[154] == "circle"){
                W.getElementById("circlerow9cell11").style.backgroundColor = this.currentConfiguration[154]
                W.getElementById("row9cell11").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell11").style.backgroundColor = this.currentConfiguration[154]
                W.getElementById("row9cell11").style.backgroundColor = this.currentConfiguration[154]}     

            if(this.currentShape[155] == "circle"){
                W.getElementById("circlerow9cell12").style.backgroundColor = this.currentConfiguration[155]
                W.getElementById("row9cell12").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell12").style.backgroundColor = this.currentConfiguration[155]
                W.getElementById("row9cell12").style.backgroundColor = this.currentConfiguration[155]}     

            if(this.currentShape[156] == "circle"){
                W.getElementById("circlerow9cell13").style.backgroundColor = this.currentConfiguration[156]
                W.getElementById("row9cell13").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell13").style.backgroundColor = this.currentConfiguration[156]
                W.getElementById("row9cell13").style.backgroundColor = this.currentConfiguration[156]}     
            
            if(this.currentShape[157] == "circle"){
                W.getElementById("circlerow9cell14").style.backgroundColor = this.currentConfiguration[157]
                W.getElementById("row9cell14").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell14").style.backgroundColor = this.currentConfiguration[157]
                W.getElementById("row9cell14").style.backgroundColor = this.currentConfiguration[157]}     

            if(this.currentShape[158] == "circle"){
                W.getElementById("circlerow9cell15").style.backgroundColor = this.currentConfiguration[158]
                W.getElementById("row9cell15").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell15").style.backgroundColor = this.currentConfiguration[158]
                W.getElementById("row9cell15").style.backgroundColor = this.currentConfiguration[158]}     
            
            if(this.currentShape[159] == "circle"){
                W.getElementById("circlerow9cell16").style.backgroundColor = this.currentConfiguration[159]
                W.getElementById("row9cell16").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell16").style.backgroundColor = this.currentConfiguration[159]
                W.getElementById("row9cell16").style.backgroundColor = this.currentConfiguration[159]}     

            if(this.currentShape[160] == "circle"){
                W.getElementById("circlerow9cell17").style.backgroundColor = this.currentConfiguration[160]
                W.getElementById("row9cell17").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell17").style.backgroundColor = this.currentConfiguration[160]
                W.getElementById("row9cell17").style.backgroundColor = this.currentConfiguration[160]}     

            if(this.currentShape[161] == "circle"){
                W.getElementById("circlerow9cell18").style.backgroundColor = this.currentConfiguration[161]
                W.getElementById("row9cell18").style.backgroundColor = "white"}else{
                W.getElementById("circlerow9cell18").style.backgroundColor = this.currentConfiguration[161]
                W.getElementById("row9cell18").style.backgroundColor = this.currentConfiguration[161]} 

            // row10
            if(this.currentShape[162] == "circle"){
                W.getElementById("circlerow10cell01").style.backgroundColor = this.currentConfiguration[162]
                W.getElementById("row10cell01").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell01").style.backgroundColor = this.currentConfiguration[162]
                W.getElementById("row10cell01").style.backgroundColor = this.currentConfiguration[162]}     
            
            if(this.currentShape[163] == "circle"){
                W.getElementById("circlerow10cell02").style.backgroundColor = this.currentConfiguration[163]
                W.getElementById("row10cell02").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell02").style.backgroundColor = this.currentConfiguration[163]
                W.getElementById("row10cell02").style.backgroundColor = this.currentConfiguration[163]}     
            
            if(this.currentShape[164] == "circle"){
                W.getElementById("circlerow10cell03").style.backgroundColor = this.currentConfiguration[164]
                W.getElementById("row10cell03").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell03").style.backgroundColor = this.currentConfiguration[164]
                W.getElementById("row10cell03").style.backgroundColor = this.currentConfiguration[164]}     
            
            if(this.currentShape[165] == "circle"){
                W.getElementById("circlerow10cell04").style.backgroundColor = this.currentConfiguration[165]
                W.getElementById("row10cell04").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell04").style.backgroundColor = this.currentConfiguration[165]
                W.getElementById("row10cell04").style.backgroundColor = this.currentConfiguration[165]}     
            
            if(this.currentShape[166] == "circle"){
                W.getElementById("circlerow10cell05").style.backgroundColor = this.currentConfiguration[166]
                W.getElementById("row10cell05").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell05").style.backgroundColor = this.currentConfiguration[166]
                W.getElementById("row10cell05").style.backgroundColor = this.currentConfiguration[166]}     
            
            if(this.currentShape[167] == "circle"){
                W.getElementById("circlerow10cell06").style.backgroundColor = this.currentConfiguration[167]
                W.getElementById("row10cell06").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell06").style.backgroundColor = this.currentConfiguration[167]
                W.getElementById("row10cell06").style.backgroundColor = this.currentConfiguration[167]}     
            
            if(this.currentShape[168] == "circle"){
                W.getElementById("circlerow10cell07").style.backgroundColor = this.currentConfiguration[168]
                W.getElementById("row10cell07").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell07").style.backgroundColor = this.currentConfiguration[168]
                W.getElementById("row10cell07").style.backgroundColor = this.currentConfiguration[168]}     
            
            if(this.currentShape[169] == "circle"){
                W.getElementById("circlerow10cell08").style.backgroundColor = this.currentConfiguration[169]
                W.getElementById("row10cell08").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell08").style.backgroundColor = this.currentConfiguration[169]
                W.getElementById("row10cell08").style.backgroundColor = this.currentConfiguration[169]}     
            
            if(this.currentShape[170] == "circle"){
                W.getElementById("circlerow10cell09").style.backgroundColor = this.currentConfiguration[170]
                W.getElementById("row10cell09").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell09").style.backgroundColor = this.currentConfiguration[170]
                W.getElementById("row10cell09").style.backgroundColor = this.currentConfiguration[170]}     
            
            if(this.currentShape[171] == "circle"){
                W.getElementById("circlerow10cell10").style.backgroundColor = this.currentConfiguration[171]
                W.getElementById("row10cell10").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell10").style.backgroundColor = this.currentConfiguration[171]
                W.getElementById("row10cell10").style.backgroundColor = this.currentConfiguration[171]}     
            
            if(this.currentShape[172] == "circle"){
                W.getElementById("circlerow10cell11").style.backgroundColor = this.currentConfiguration[172]
                W.getElementById("row10cell11").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell11").style.backgroundColor = this.currentConfiguration[172]
                W.getElementById("row10cell11").style.backgroundColor = this.currentConfiguration[172]}     

            if(this.currentShape[173] == "circle"){
                W.getElementById("circlerow10cell12").style.backgroundColor = this.currentConfiguration[173]
                W.getElementById("row10cell12").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell12").style.backgroundColor = this.currentConfiguration[173]
                W.getElementById("row10cell12").style.backgroundColor = this.currentConfiguration[173]}     

            if(this.currentShape[174] == "circle"){
                W.getElementById("circlerow10cell13").style.backgroundColor = this.currentConfiguration[174]
                W.getElementById("row10cell13").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell13").style.backgroundColor = this.currentConfiguration[174]
                W.getElementById("row10cell13").style.backgroundColor = this.currentConfiguration[174]}     
            
            if(this.currentShape[175] == "circle"){
                W.getElementById("circlerow10cell14").style.backgroundColor = this.currentConfiguration[175]
                W.getElementById("row10cell14").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell14").style.backgroundColor = this.currentConfiguration[175]
                W.getElementById("row10cell14").style.backgroundColor = this.currentConfiguration[175]}     

            if(this.currentShape[176] == "circle"){
                W.getElementById("circlerow10cell15").style.backgroundColor = this.currentConfiguration[176]
                W.getElementById("row10cell15").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell15").style.backgroundColor = this.currentConfiguration[176]
                W.getElementById("row10cell15").style.backgroundColor = this.currentConfiguration[176]}     
            
            if(this.currentShape[177] == "circle"){
                W.getElementById("circlerow10cell16").style.backgroundColor = this.currentConfiguration[177]
                W.getElementById("row10cell16").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell16").style.backgroundColor = this.currentConfiguration[177]
                W.getElementById("row10cell16").style.backgroundColor = this.currentConfiguration[177]}     

            if(this.currentShape[178] == "circle"){
                W.getElementById("circlerow10cell17").style.backgroundColor = this.currentConfiguration[178]
                W.getElementById("row10cell17").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell17").style.backgroundColor = this.currentConfiguration[178]
                W.getElementById("row10cell17").style.backgroundColor = this.currentConfiguration[178]}     

            if(this.currentShape[179] == "circle"){
                W.getElementById("circlerow10cell18").style.backgroundColor = this.currentConfiguration[179]
                W.getElementById("row10cell18").style.backgroundColor = "white"}else{
                W.getElementById("circlerow10cell18").style.backgroundColor = this.currentConfiguration[179]
                W.getElementById("row10cell18").style.backgroundColor = this.currentConfiguration[179]} 
            
        */

    };

    node.game.getMovement = function(moveInfo ){
        moveInfo = moveInfo.replace('move a block from ', '');
        moveInfo = moveInfo.replace('circle', '');
        
        var moveChoice = moveInfo.split(" to ");
        
        // now moveChoice contains "row1cell01" and "row2cell02"
        var moveChoice_from = moveChoice[0];

        var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

        var row_from = Number(moveChoice_from.charAt(3)) // rowX
        var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
        

        var row_to= Number(moveTo.charAt(3)) // rowX
        var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

        // once we have the row/cell to/from, we change the current configuration of those specific cell
        
        // for each row increment, there is a +18 in index
        // for each cell increment, there is +1 in index
        // row1cell01 = (row-1)*18 + (cell-1) =  0 + 0
        // row2cell01 = (2-1)*18 + (1 -1 ) =  18 + 0
        // row3cell4 = (3-1)*18 + (4-1) = 36 + 3 = 39


        var moveFromID = (row_from-1)*18 + (cell_from-1)
        var moveToID = (row_to-1)*18 + (cell_to-1)

        var moved_color = this.currentConfiguration[moveFromID]
        var moved_shape = this.currentShape[moveFromID]

        // need to figure out room
        var movedfrom_room = "X"
        if([0,1,2,18, 19, 20, 36,37,38,54,55,56,72,73,74,90,91,92].includes(moveFromID)){movedfrom_room = "A1"}
        else if([3,4,5,21,22,23,39,40,41,57,58,59,75,76,77,93,94,95].includes(moveFromID)) {movedfrom_room = "A2"}
        else if([6,7,8,24,25,26,42,43,44,60,61,62,78,79,80,96,97,98].includes(moveFromID)) {movedfrom_room = "B1"}
        else if([9,10,11,27,28,29,45,46,47,63,64,65,81,82,83,99,100,101].includes(moveFromID)) {movedfrom_room = "B2"}
        else if([12,13,14,30,31,32,48,49,50,66,67,68,84,85,86,102,103,104].includes(moveFromID)) {movedfrom_room = "C1"}
        else {movedfrom_room = "C2"}

        var movedto_room = "X"
        if([0,1,2,18, 19, 20, 36,37,38,54,55,56,72,73,74,90,91,92].includes(moveToID)){movedto_room = "A1"}
        else if([3,4,5,21,22,23,39,40,41,57,58,59,75,76,77,93,94,95].includes(moveToID)) {movedto_room = "A2"}
        else if([6,7,8,24,25,26,42,43,44,60,61,62,78,79,80,96,97,98].includes(moveToID)) {movedto_room = "B1"}
        else if([9,10,11,27,28,29,45,46,47,63,64,65,81,82,83,99,100,101].includes(moveToID)) {movedto_room = "B2"}
        else if([12,13,14,30,31,32,48,49,50,66,67,68,84,85,86,102,103,104].includes(moveToID)) {movedto_room = "C1"}
        else {movedto_room = "C2"}
        
        return {moved_color, moved_shape, movedfrom_room, movedto_room, moveToID, moveFromID, moveChoice};

    };

    node.game.numMoves = function(W){
        // a fn that calculates how many of the target blocks are open and obstructed
        // this is for literal architect basically
    }

    node.game.enableDragDrop = function(W){

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
            if (e > 17){
                // if the element on top is white, then it's draggable
                if(configArray[e-18] === "white"){a.push(e);}
            }
            else{a.push(e);}}    
            return a;
            }, []);
            return newArr
        }
        
        var fulldragindices= Array(this.currentConfiguration.length).fill().map((x,i)=>i)
        var validDragargets = reduceDragArray(fulldragindices, this.currentConfiguration)
        
        // convert to table cell IDs

        var filteredDragTableIDs = validDragargets.map(x => {
            if (x < 9){
                return "row1" + "cell0"+ (x + 1) ;
            }
            else if (x < 18){
                return "row1" + "cell"+ (x + 1) ;
            }
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
        });
        
        // code for modifying drop targets

        var droptarget = W.getElementById("blocks"); 
        // need to make this only some specific drag choices
        // could try to filter for only "white" cells

        var filtereddropIndices = this.currentConfiguration.reduce(function(a, e, i) {
            if (e === 'white')
                a.push(i);
            return a;
        }, []);

        // ultimately we want to further restrict this to only white cells that
        // have something non-white below them

        // logic for more filtering: if the color of the cell at the bottom is white too then exclude
        // x+18

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

        var validWhiteBoxes = reduceDropArray(filtereddropIndices, this.currentConfiguration) 
        
        var filteredDropTableIDs = validWhiteBoxes.map(x => {
            if (x < 9){
                return "row1" + "cell0"+ (x + 1) ;
            }
            else if (x < 18){
                return "row1" + "cell"+ (x + 1) ;
            }
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
        })

        var circlefilteredDropTableIDs = filteredDropTableIDs.map(i => 'circle' + i);


        var totalDropIDs = filteredDropTableIDs.concat(circlefilteredDropTableIDs);

        // we restrict dropping to these "white" cells only

        dragtarget.addEventListener('dragstart', dragStart);
        droptarget.addEventListener('dragenter', dragEnter)
        droptarget.addEventListener('dragover', dragOver);
        droptarget.addEventListener('dragleave', dragLeave);
        droptarget.addEventListener('drop', drop);
        

            function dragStart(e) {
                
                if(drag_count == 0){
                    console.log('targetid='+e.target.id);
                if(filteredDragTableIDs.includes(e.target.id)){
                console.log('drag starts...');
                
                
                e.dataTransfer.setData('text/plain', e.target.id);
                e.target.style.opacity = .7;

                
                //setTimeout(() => {
                    //  e.target.classList.add('hide');
                //}, 1000);
                }
                else{alert("You can only drag/drop ONE UNOBSTRUCTED block on a turn!");}

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
                const done_button = W.getElementById('done');
                done_button.disabled = false;
                //node.game.doneButton.enable(); // only enable when we have a valid drop location
                drag_count = 1
                console.log("drag_count"+drag_count);
                // call the function that records these move IDs
                setTotalValue();
                }

                }
                else{alert("You can only drag/drop ONE UNOBSTRUCTED block on a turn!");}
            
                
            }                

        function setTotalValue(){

        // if it gets into this function, it will change the drag and dropids and value of total
        
        total = "move a block from " + dragid + " to " + dropid;
        console.log("inside total = "+total)
        
        
        node.game.memory.add({
            player: node.player.id,
            stage: node.game.getCurrentGameStage(),
            totalmove: total
        }); 
  
        node.game.memory.tag("MOVE");
        }

        // called when no action is taken

        node.game.memory.add({
            player: node.player.id,
            stage: node.game.getCurrentGameStage(),
            totalmove: total
        }); 

    };

    node.game.findMoveable = function(){
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
        
        var fulldragindices= Array(this.currentConfiguration.length).fill().map((x,i)=>i)
        var validDragargets = reduceDragArray(fulldragindices, this.currentConfiguration)
        
        return validDragargets;

    }

    node.game.provideFeedback = function(){

        var goal = this.goalList[this.roundCounter]
        // depending on what the goal is, the checking function does different things
        console.log("inside provideFeedback")
        var goal_components = goal.split(" ")
        var action = goal_components[0]
        var color = goal_components[1]
        //var location = goal_components[2]

        console.log("action=", action)
        console.log("color=", color)
        
        // get the relevant indices of the room out of currentConfiguration and currentShape

        const checker_color = this.goalindices.map(x=>this.currentConfiguration[x]);
        const checker_shape = this.goalindices.map(x=>this.currentShape[x]);

        var roomContents = [checker_color, checker_shape].reduce((a, b) => a.map((v, i) => v  + b[i]));
        console.log("roomContents="+roomContents)

        // need to have different conditions here
        var success = 0

        if(action == "clear"){
            console.log("inside clear")
            var goal_combo  = "whitesquare"
            const combo_occurrences = roomContents.filter(x => x === goal_combo).length
            console.log("combo=",combo_occurrences)
            if(combo_occurrences == roomContents.length){success = 1}
        }
        else if (action == "move"){
            console.log("inside move")
            var goal_combo = color + "square"
            const combo_occurrences = roomContents.filter(x => x === goal_combo).length
            console.log("combo=",combo_occurrences)
            if(combo_occurrences == 10){success = 1}
        }
        else if(action == "remove"){
            console.log("inside remove")
            var goal_combo = color + "square"
            const combo_occurrences = roomContents.filter(x => x === goal_combo).length
            if(combo_occurrences == 0){success = 1}
        }
        else if(action == "cover" || action == "uncover"){
            console.log("inside cover/uncover")
            // find indices corresponding to goal color
            const color_relevant = this.goalindices.filter(x => this.currentConfiguration[x] === color)
            console.log("color_relevant=",color_relevant)
            // compute open vs. obstructed

            var moveable = node.game.findMoveable()
            console.log("moveable=",moveable)
            var obstructed = color_relevant.filter(x => !moveable.includes(x))
            console.log("obstructed=",obstructed)
            var open = color_relevant.filter(x => !obstructed.includes(x))
            console.log("open=",open)

            if(action == "cover" && open.length == 0){success = 1}
            if(action == "uncover" && obstructed.length == 0){success = 1}

        }


        if(success == 1){
            return 1;
        }
        else{//if they are wrong and it isn't the third trial players get another chance            
            node.say('ACHIEVED','SERVER', 0);
            console.log("no success message")
            node.set({goalSuccess: 0});
            return 0;
        }
        
    };


    node.game.countObstructions = function(obstructed, countsamecolor = false, goal_color = []){
        // given a set of obstructed blocks, count the number of obstructions for each
        console.log("inside counting obstructions")
        console.log("obstructed=",obstructed)
        var dict = new Object();
        for (var i = 0; i < obstructed.length; i++){
            console.log("o_i = ", i)
            var o = obstructed[i]
            console.log("o = ", o)

            var row = ~~(o/18);
            console.log("row = ", row)
            for (var r_i = 1; r_i < row + 1; r_i++){
                console.log("r_i=", r_i)
                var index = o - (18*r_i)
                if(index >0){
                    dict[index] = 0
                    if(countsamecolor == false){
                        if(this.currentConfiguration[index] != "white" && dict[index] == 0){dict[index] = 1}
                    }
                    else{
                        if(this.currentConfiguration[index] != "white" && dict[index] == 0 && this.currentConfiguration[index] != goal_color){dict[index] = 1}
                    }
                }
            }
        }

        const sumValues = Object.values(dict).reduce((a, b) => a + b, 0)
        return sumValues
    }

  

    node.game.optimalMoves = function(action, color, goal_location){

        // depending on what the goal is, the checking function does different things
        console.log("inside optimalMoves")
        console.log("action=", action)
        console.log("color=", color)
        console.log("goal_location=", goal_location)
        
        var moveable = node.game.findMoveable()
        console.log("moveable=",moveable)
        const color_relevant = this.goalindices.filter(x => this.currentConfiguration[x] === color)
        
        if(action == "move"){
            // check which color indices are not in location
            var allindices = Array.from({length: 108}, (item, index) => index);
            const color_relevant = allindices.filter(x => this.currentConfiguration[x] === color)
            console.log("color_relevant=",color_relevant)
            var not_in_location = color_relevant.filter(x => !this.goalindices.includes(x))
            console.log("not_in_location=",not_in_location)
            var obstructed = not_in_location.filter(x => !moveable.includes(x))
            console.log("obstructed=",obstructed)
            var open = not_in_location.filter(x => !obstructed.includes(x))
            console.log("open=",open)
            var num_blockers = node.game.countObstructions(obstructed);
            var optimal = open.length + obstructed.length + num_blockers

        }
        else if(action == "remove"){
            console.log("color_relevant=",color_relevant)
            var obstructed = color_relevant.filter(x => !moveable.includes(x))
            console.log("obstructed=",obstructed)
            var open = color_relevant.filter(x => !obstructed.includes(x))
            console.log("open=",open)
            var num_blockers = node.game.countObstructions(obstructed, true, color);
            var optimal = open.length + obstructed.length + num_blockers
        }
        else if(action == "cover"){
            console.log("color_relevant=",color_relevant)
            var obstructed = color_relevant.filter(x => !moveable.includes(x))
            console.log("obstructed=",obstructed)
            var open = color_relevant.filter(x => !obstructed.includes(x))
            console.log("open=",open)
            var optimal = open.length
        }
        else if(action == "uncover"){
            console.log("color_relevant=",color_relevant)
            var obstructed = color_relevant.filter(x => !moveable.includes(x))
            console.log("obstructed=",obstructed)
            var open = color_relevant.filter(x => !obstructed.includes(x))
            console.log("open=",open)
            var num_blockers = node.game.countObstructions(obstructed);
            var optimal = num_blockers
        }
        else{ // clear
        const non_white = this.goalindices.filter(x => this.currentConfiguration[x] != "white")
        var optimal = non_white.length
        }
        return optimal
    }

    node.game.resetConfig = function(){
        console.log("inside reset config")
        this.currentConfiguration = JSON.parse(JSON.stringify(this.initialConfiguration));
        this.currentShape =  JSON.parse(JSON.stringify(this.initialShape));
        this.helperActions = []
        this.architectActions = []
        this.optCounter = 0
        this.architectScore = 0
        this.helperScore = 0
    }

    node.game.checkEnd = function(){
        if(this.roundCounter == this.goalnumber){//if the next value is equal to number of goals then we are out of goals and the experiment is over
            //node.say('END_GAME', 'SERVER', true);
            console.log("inside checkend end game message")
            return 1
        }
        else{return 0}
    }

    node.game.helpergoalAchieved = function(){
        console.log("inside helper goal achieved")
        node.say('ACHIEVED','SERVER', 1);            
        node.set({goalSuccess: 1});
        this.roundCounter += 1;
        // reset config for next round
        node.game.resetConfig();
        
        return node.game.checkEnd()
    };

   

    node.game.architectgoalAchieved = function(){
        console.log("inside architect goal achieved")
        node.say('ACHIEVED','SERVER', 1);            
        node.set({goalSuccess: 1});
        this.roundCounter += 1;
        
        return node.game.checkEnd();
        
    };

    node.game.computeGoal = function(){
        // need to compute goal relevant indices
        console.log("inside compute Goal")
        let checkend = node.game.checkEnd();
        if(checkend == 0){
            console.log("goals still remaining...")
            var goal = this.goalList[this.roundCounter].split(" ")
            

            var action = goal[0]
            var color = goal[1]
            var goal_location = goal[2]

            

            if(goal_location == "A1"){this.goalindices = [0,1,2,18, 19, 20, 36,37,38,54,55,56,72,73,74,90,91,92]}
            else if(goal_location == "A2"){this.goalindices = [3,4,5,21,22,23,39,40,41,57,58,59,75,76,77,93,94,95]}
            else if(goal_location == "A"){this.goalindices = [3,4,5,21,22,23,39,40,41,57,58,59,75,76,77,93,94,95, 0,1,2,18, 19, 20, 36,37,38,54,55,56,72,73,74,90,91,92]}
            else if(goal_location == "B1"){this.goalindices = [6,7,8,24,25,26,42,43,44,60,61,62,78,79,80,96,97,98]}
            else if(goal_location == "B2"){this.goalindices = [9,10,11,27,28,29,45,46,47,63,64,65,81,82,83,99,100,101]}
            else if(goal_location == "B"){this.goalindices = [9,10,11,27,28,29,45,46,47,63,64,65,81,82,83,99,100,101, 6,7,8,24,25,26,42,43,44,60,61,62,78,79,80,96,97,98]}
            else if(goal_location == "C1"){this.goalindices = [12,13,14,30,31,32,48,49,50,66,67,68,84,85,86,102,103,104]}
            else if(goal_location == "C2"){this.goalindices = [15,16,17,33,34,35,51,52,53,69,70,71,87,88,89,105,106,107]}
            else if(goal_location == "C"){this.goalindices = [15,16,17,33,34,35,51,52,53,69,70,71,87,88,89,105,106,107,12,13,14,30,31,32,48,49,50,66,67,68,84,85,86,102,103,104]}
            else{this.goalindices = Array.from({length: 108}, (item, index) => index);}
           
            console.log("this.goalindices="+this.goalindices)
            // compute optimal moves for a given goal
            if(this.optCounter == 0){
            this.optimalMoveCount = node.game.optimalMoves(action, color, goal_location)
            console.log("optimal moves =", this.optimalMoveCount)
            this.optCounter+=1
            }

            if(action == "clear"){this.verbalGoal = action + " all blocks " + "in " + goal_location}
            else if(action == "move"){this.verbalGoal = action + " all " + color +  " blocks"  + " to " + goal_location}
            else if(action == "cover" || action == "uncover"){this.verbalGoal = action + " all " + color +  " blocks"}
            else{this.verbalGoal = action + " all " + color +  " blocks"  + " in " + goal_location}
            
            console.log("this.verbalGoal=",this.verbalGoal)
            W.setInnerHTML('goal', "Goal: " + this.verbalGoal);
            return 0;

        }
        else{
            console.log("all goals complete!")
            return 1;
            //node.say('END_GAME', 'SERVER', true);
            //node.done();
        }
        
    }

    

    node.game.nextGoalActions = function(moveChoice = []){
        console.log("inside the click function")
        // reset config for next round
        node.game.resetConfig();
        if(moveChoice.length>0){
            var otherShape0 = moveChoice[0]
            if(otherShape0.includes("circle")){otherShape0 = otherShape0;}
            else{otherShape0 = "circle"+moveChoice[0]}

            var otherShape1 = moveChoice[1]
            if(otherShape1.includes("circle")){otherShape1 = otherShape1}
            else{otherShape1 = "circle"+moveChoice[1]}

            W.getElementById(otherShape0).style.backgroundImage = "none"
            W.getElementById(otherShape1).style.backgroundImage = "none"
        }
        W = node.game.drawTable(W, this.currentShape , this.currentConfiguration);
        node.game.computeGoal();
        W.gid('goal').style.backgroundColor = "lime"
        console.log("after computing new goal")
        W.gid("nextgoal").style.visibility = "hidden"
        var a = W.getElementById("done")
        a.style.visibility = 'visible';
        a.disabled = true;
        node.game.enableDragDrop(W);
        console.log("after enabling drag drop")
        var dots = W.gid("dotContainer")
        dots.style.visibility = "hidden"

        var dot1 = W.gid("dot1")
        dot1.style.visibility = "hidden"
        node.game.removeAnimation();
        W.setInnerHTML('cluepast0txt', "It is your turn! Please move a block, and note that the goal has changed."); 
        W.setInnerHTML('cluepasttxt', ""); 
        W.setInnerHTML('done', 'Continue');
        a.onclick = function() { node.done() };
    
}

node.game.removeAnimation = function(){
    console.log("inside remove animation")

    // need to get all possible IDs
    var newIDs =[], cids  = W.getElementsByClassName('sphere')
    for (var i=cids.length;i--;) newIDs.push(cids[i].id);

    for (var i = 1; i < newIDs.length-1; i++) {
        W.getElementById(newIDs[i]).style.backgroundImage = "none"
        W.getElementById(newIDs[i]).innerHTML = ''
    }

}

    node.game.showAnimation = function(moveChoice, oldShape, oldColor){
        console.log("inside animation");
        node.game.drawTable(W, oldShape, oldColor);

        var otherShape0 = moveChoice[0]
        if(otherShape0.includes("circle")){otherShape0 = otherShape0;}
        else{otherShape0 = "circle"+moveChoice[0]} 

        var otherShape1 = moveChoice[1]
        if(otherShape1.includes("circle")){otherShape1 = otherShape1}
        else{otherShape1 = "circle"+moveChoice[1]}

        // add arrows going up to ceiling of table and then down
        // compute "path" of indices
        
        // now moveChoice contains "row1cell01" and "row2cell02"
        var moveChoice_from = moveChoice[0];

        var moveTo = moveChoice[1]//this.positions[moveChoice[1]]

        var row_from = Number(moveChoice_from.charAt(3)) // rowX
        var cell_from = Number(moveChoice_from.substr(moveChoice_from.length - 2))// rowXcellXY
        

        var row_to= Number(moveTo.charAt(3)) // rowX
        var cell_to = Number(moveTo.substr(moveTo.length - 2))// rowXcellXY

        var moveFromID = (row_from-1)*18 + (cell_from-1)
        var moveToID = (row_to-1)*18 + (cell_to-1)

        var top_from  = (moveFromID % 18) +1
        var top_to = (moveToID %18) + 1

        console.log("top_from=", top_from)
        console.log("top_to=", top_to)

        // need to also find intervening cells for the path

        var numcells_from = Math.floor(moveFromID/18) ;
        var numcells_to = Math.floor(moveToID/18) ;
        console.log("numcells_from", numcells_from)
        console.log("numcells_to", numcells_to)

        // now we need ids for each of these, they will always be the same "cell" and increasing rows

        var cellfromIDs = []

        for (var i = 0; i <= numcells_from; i++) {
            if(top_from < 10){cellfromIDs.push("circlerow"+(i+1)+ "cell0" + top_from);}
            else{cellfromIDs.push("circlerow"+(i+1)+ "cell" + top_from);}
            
        }

        console.log("cellfromIDs=",cellfromIDs)

        var celltoIDs = []
        
        for (var i = 0; i <= numcells_to; i++) {
            if(top_to < 10){celltoIDs.push("circlerow"+(i+1)+ "cell0" + top_to);}
            else{celltoIDs.push("circlerow"+(i+1)+ "cell" + top_to);}
            
        }

        console.log("celltoIDs=",celltoIDs)

        // also need horizontal path from top_to to top_from

        var horizontal_cells = (top_from - top_to) 

        if(horizontal_cells > 0) {horizontal_cells = horizontal_cells  - 1}
        else{horizontal_cells = horizontal_cells + 1}

        console.log("horizontal_cells=", horizontal_cells)

        var horizontalIDs = []

        for (var i = 1; i <= Math.abs(horizontal_cells); i++) {
            if(horizontal_cells > 0){ // from > to
                // going left
                if((top_from-i) < 10){horizontalIDs.push("circlerow1cell0" + (top_from-i));}
                else{horizontalIDs.push("circlerow1cell" + (top_from-i));}
            }

            else{ // from < to
               // going right
               if((top_from+i) < 10){horizontalIDs.push("circlerow1cell0" + (top_from+i)); }
               else{horizontalIDs.push("circlerow1cell" + (top_from+i)); }
            }            
        }

        console.log("horizontalIDs=",horizontalIDs)

        // now we need to draw the path

        // find ids of move itself

        setTimeout(() => {
            W.getElementById(cellfromIDs[cellfromIDs.length-1]).innerHTML = "START"
            W.getElementById(cellfromIDs[cellfromIDs.length-1]).style.color = "goldenrod"
        }, 1000); 

        setTimeout(() => {   
            for (var i = 1; i < cellfromIDs.length-1; i++) {W.getElementById(cellfromIDs[i]).style.backgroundImage = "url('uparrow.png')"}
        }, 1300); 

        setTimeout(() => {  if( (top_from - top_to) > 0){W.getElementById(cellfromIDs[0]).style.backgroundImage = "url('topleftarrow.png')"}
            else{W.getElementById(cellfromIDs[0]).style.backgroundImage = "url('toprightarrow.png')"}
            
        }, 1300); 

        setTimeout(() => {
            for (var i = 0; i < horizontalIDs.length; i++) { 
                if(horizontal_cells >= 0){W.getElementById(horizontalIDs[i]).style.backgroundImage = "url('leftarrow.png')"}
                else{W.getElementById(horizontalIDs[i]).style.backgroundImage = "url('rightarrow.png')"}
            }
        }, 1600); 

        setTimeout(() => {  
            if((top_from - top_to) >0){W.getElementById(celltoIDs[0]).style.backgroundImage = "url('topdownleftarrow.png')"}
            else{W.getElementById(celltoIDs[0]).style.backgroundImage = "url('topdownrightarrow.png')"}
        }, 1600); 

        setTimeout(() => {
            for (var i = 1; i < celltoIDs.length-1; i++) {W.getElementById(celltoIDs[i]).style.backgroundImage = "url('downarrow.png')"}
        }, 1900); 

        setTimeout(() => {
            W.getElementById(celltoIDs[celltoIDs.length-1]).innerHTML = "END"
            W.getElementById(celltoIDs[celltoIDs.length-1]).style.color = "goldenrod"
        }, 2100);

        setTimeout(() => {node.game.drawTable(W, this.currentShape, this.currentConfiguration);}, 2500); 

    }

    node.game.showDotsAnimation = function(){
        const dots = createDots();
        function createDots() {
            const el = W.gid('dot1');
            el.id = 'dot1';
            el.innerHTML = `
            <span>o</span>
            <span>o</span>
            <span>o</span>
        `
            return el;
        }
        function showDots() {W.getElementById('dotContainer').appendChild(dots);}  
        function hideDots() {W.getElementById('dot1').remove();}
        function dotTime(index) {
            if(index === 10000) return; // 100 times
            const duration = 2000;
            showDots();
            setTimeout(() => {
                hideDots();
                dotTime(index+1)
            }, duration)
        }
        function displayDots(){dotTime(0);}
        displayDots();
    }

    
        // Initialize the client.

        var frame;        
        frame = W.generateFrame();
        
        this.colors = ["red", "blue", "green", "white"] // possible colors: white is used when there is no "block"

        //this.goalList = ["move red A", "cover red all", "clear red all"]; // 124 total goals
        
        this.shape = ["square", "circle"]

        
        // set initial configuration

        this.initialConfiguration = [this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3], 
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  

                                  // last 3 rows is where the colored blocks are

                                  this.colors[0],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  this.colors[1],this.colors[0],this.colors[3],this.colors[3],this.colors[3],this.colors[3],
                                  this.colors[0],this.colors[3],this.colors[3],this.colors[3],this.colors[3],this.colors[3],

                                  this.colors[2],this.colors[1],this.colors[3],this.colors[0],this.colors[3],this.colors[3],
                                  this.colors[2],this.colors[1],this.colors[3],this.colors[3],this.colors[1],this.colors[1],
                                  this.colors[1],this.colors[0],this.colors[3],this.colors[3],this.colors[2],this.colors[3],

                                  this.colors[1],this.colors[2],this.colors[0],this.colors[2],this.colors[2],this.colors[1],
                                  this.colors[0],this.colors[2],this.colors[3],this.colors[0],this.colors[1],this.colors[2],
                                  this.colors[0],this.colors[2],this.colors[0],this.colors[2],this.colors[1],this.colors[3]
                                    
                                    
                                    ] 

        // set currentConfig - this changes as players make moves                            

        this.currentConfiguration = JSON.parse(JSON.stringify(this.initialConfiguration));
        this.oldConfig = JSON.parse(JSON.stringify(this.currentConfiguration));

        // shape is square by default, and circular otherwise 
        // logic is that if shape is "circle" then circle is updated and square is set to white or vice versa                        
        
        this.currentShape = Array(this.currentConfiguration.length).fill(this.shape[0]) // all squares for now
        this.initialShape = JSON.parse(JSON.stringify(this.currentShape));
        
        // create two variables that keep track of both player's actions at each step
        this.helperActions = []
        this.architectActions = []

        this.roundCounter = 0;//iterated value to move through the goals
        this.optCounter = 0; // counter to keep trakc of when to calculate optimal goals
        
        
        //this.id;
        this.randomCode;
        

        // set goal configuration and verbal goal
        // get a random color and room
        // create non-white colors array for creating goal
        // this "random" choice is happening separately for architect & builder - NOT ideal
        // maybe we need a list of goals 

        // need to input all possible list of goals and select only 10 out of them

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

        console.log("valid_goals=", this.valid_goals);

        // need to find goals that are not complete already from the list above

        this.goalList = this.valid_goals.slice(0,13)
        this.goalindices = []
        this.goalnumber = 5; // total number of goals for each game, set to 2 for now

        this.helperScore = 0
        this.architectScore = 0
        this.optimalMoveCount = 0
        this.totalHelp = 0

        // actual goal depends on the color and room generated above
        // logic might be to count number of "colors" in a given portion of the table

        
        // once we have the goal indices, we count up the number of random_color occurrences in those indices within
        // the currentConfiguration
        
    });

/*

    stager.extendStep('consent', {
        frame: 'consent.htm',
        cb: function(){
            var a = W.gid('agree');
            a.onclick = function() { node.done() };
       }
    });


/*
    stager.extendStep('idGet', {
        frame: 'idGet.htm',
        cb: function(){
            console.log("inside idGET")
            this.randomCode = Math.floor(Math.random() * 90000) + 10000;

            this.idWid = node.widgets.append('CustomInput', W.gid('getid'), {//apend customInput widget with 1 mandatory input
               id: 'clueGive',
               type: 'int',
               className: 'centered',
               requiredChoice: true
           });

           var a = W.gid('done');
           a.onclick = function() { node.done() };
       },
        done: function() {//send clue to other player and clue and time info to database
            this.id = this.idWid.getValues().value;
            return;
        }
    });

    /*

    stager.extendStep('instructions', {
        frame: 'game_instructions.htm',
        cb: function(){
            var a = W.gid('done');
           a.onclick = function() { node.done() };
        }
    });
    */
/*
    stager.extendStep('rolesAssigned', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            helper:{
                frame: 'instructionsCG.htm', 
                cb: function(){
                    var a = W.gid('done');
                    a.onclick = function() { node.done() };
                }
            },
            architect:{
                frame: 'instructions.htm',
                cb: function(){
                    var a = W.gid('done');
                    a.onclick = function() { node.done() };
            }
            }
        }
    });

    */

    stager.extendStep('architectMoveprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            helper:{
                init: function() {
                    node.game.guessesReceived = null;
                },
                donebutton: false,
                frame: 'helperStudyBoard.htm',
                cb: function() {
                    

                    // need to change the block configuration for Helper if a move has been made
                    
                    /*
                    W.setInnerHTML('helperlastaction', "-"); 
                    W.setInnerHTML('helpercurrentaction', "Waiting for Architect..."); 

                    W.setInnerHTML('architectlastaction', "-");
                    W.setInnerHTML('architectcurrentaction', "Moving a block...");   
                    */
                    
                    // if all goals are complete, then we do nothing

                    if(this.helperActions.length > 0){ // if this is not the first trial
                        console.log("this.helperActions=",this.helperActions)
                        
                        var choiceTXT = node.game.memory.resolveTag("CHOICE").choiceoption;
                        if(["Ask a yes/no question"].includes(choiceTXT)){ 
                            node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                            W.setInnerHTML('cluepasttxt', "You chose to ask a question: ");
                            W.setInnerHTML('cluepast',  this.helperActions.at(-1));    
                        }

                        else if(["Pass"].includes(choiceTXT)){
                            node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                            W.setInnerHTML('cluepasttxt', "You chose to pass your turn.")
                            W.setInnerHTML('clue2', "Waiting for the Architect")
                            node.game.showDotsAnimation();
                        }
                        else if(["done"].includes(choiceTXT)){
                            node.game.resetConfig();
                            node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                            W.setInnerHTML('cluepasttxt', "This is your next task.")
                            node.game.helpergoalAchieved();
                            W.setInnerHTML('clue2', "Waiting for the Architect")
                            node.game.showDotsAnimation();
                        }
                        
                        else{ // previous helper move: no need for animation
                        
                        var moveInfo = this.helperActions.at(-1)
                        let { moved_color, moved_shape, movedfrom_room, movedto_room, moveToID, moveFromID, moveChoice } = node.game.getMovement(moveInfo);
                        //var oldShape = JSON.parse(JSON.stringify(this.currentShape));
                        //var oldColor = JSON.parse(JSON.stringify(this.currentConfiguration));
                        
                        //moveToID becomes the color of moveFromID
                        this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                        // and moveFromID becomes white
                        this.currentConfiguration[moveFromID] = "white"
                        // we also change the shapes accordingly
                        this.currentShape[moveToID] = this.currentShape[moveFromID]
                        this.currentShape[moveFromID] = "square"
                        
                        node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                        // evaluate
                        let checkend = node.game.computeGoal();

                        if(checkend == 0){ // if there are goals remaining, then give feedback and move on
                            var feedbackvalue = node.game.provideFeedback();
                            if(feedbackvalue == 0){
                                node.game.showDotsAnimation();
                               // W.setInnerHTML('cluepasttxt', "You chose to move a: ");
                                //W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room.charAt(0)+  " to room " + movedto_room.charAt(0));
                            }
                            else{
                                this.totalHelp  =this.optimalMoveCount - this.helperScore
                                W.setInnerHTML('cluepasttxt', "The goal was to " + this.verbalGoal + ". Goal has been achieved!!"); 
                                W.setInnerHTML('clue2', "The optimal moves were "+ this.optimalMoveCount + " and your help resulted in " + this.totalHelp +  " architect moves! Please wait for the Architect"); 
                                node.game.showDotsAnimation();
                                node.game.helpergoalAchieved();
                            }
                        }
                        else{ // no goals remaining - just wait for architect
                            
                            this.totalHelp  =this.optimalMoveCount - this.helperScore
                            W.setInnerHTML('cluepasttxt', "The goal was to " + this.verbalGoal + ". Goal has been achieved!!"); 
                            W.setInnerHTML('clue2', "The optimal moves were "+ this.optimalMoveCount + " and your help resulted in " + this.totalHelp +  " architect moves! Please wait for the Architect"); 

                            W.setInnerHTML('cluepasttxt', "The goal was to " + this.verbalGoal + ". Goal has been achieved!!"); 
                            //W.setInnerHTML('clue2', "You have completed all goals. Please wait for the Architect"); 
                            node.game.showDotsAnimation();
                        }

                    }

                }

                else{ // if first trial
                 

                    node.game.showDotsAnimation();

                    node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                    W.setInnerHTML('clue2', "Waiting for the Architect to make a move")
                }

                if (this.guessesReceived !== null) node.done();
                
                var that;//force proceed when clue is sent from other player
                that = this;    
                node.on.data('ANSWER', function(msg) {
                    that.guessesReceived = msg.data;
                    this.architectActions.push(that.guessesReceived);
                    node.done();
                });

                },

            done: function() {
                node.say('ANSWER', node.game.partner);
                node.on.data('ANSWER', function(msg) {
                    that.guessesReceived = msg.data;
                });
                
               // node.set({helperID: this.id});
                node.set({helperRandCode: this.randomCode});
                return;
            }

                
            },
    architect:{
        init: function() {
            node.game.clueReceived = null;
        },
        frame: 'architectMoveBoard.htm',
        
        cb: function() {
            console.log("inside architectMove, architect side")
            /*
            W.setInnerHTML('helperlastaction', "-"); 
            W.setInnerHTML('helpercurrentaction', "Waiting for Architect.."); 
            W.setInnerHTML('architectlastaction', "-");
            W.setInnerHTML('architectcurrentaction', "Making a move...");
            */
            W.getElementById('nextgoal').style.visibility = 'hidden';

            node.game.computeGoal();

            if(this.helperActions.length>0){ 
                // if this is not the first trial
                // here we want to tell the architect what the Helper did and also change the block positions
                var moveChoice1 = this.helperActions.at(-1)
                console.log("moveChoice1="+ moveChoice1)
                // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"
                    if (moveChoice1.includes("move a block from ") || moveChoice1.includes("Pass")){
                        if (moveChoice1.includes("move a block from ")){            
                            var moveInfo = this.helperActions.at(-1)

                            let { moved_color, moved_shape, movedfrom_room, movedto_room, moveToID, moveFromID, moveChoice } = node.game.getMovement(moveInfo);
                            var oldShape = JSON.parse(JSON.stringify(this.currentShape));
                            var oldColor = JSON.parse(JSON.stringify(this.currentConfiguration));
                            
                            //moveToID becomes the color of moveFromID
                            this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                            // and moveFromID becomes white
                            this.currentConfiguration[moveFromID] = "white"
                            // we also change the shapes accordingly
                            this.currentShape[moveToID] = this.currentShape[moveFromID]
                            this.currentShape[moveFromID] = "square"  
                            
                            // if animation is being showed then we should notify them of this

                            W.setInnerHTML('cluepasttxt', "The helper is moving the blocks now");

                            node.game.showAnimation(moveChoice, oldShape, oldColor);

                            // evaluate
                            let checkend = node.game.computeGoal();

                            if(checkend == 0){ // if there are goals remaining, then do feedback
                            var feedbackvalue = node.game.provideFeedback();
                            if(feedbackvalue == 0){
                                setTimeout(() => {
                                    node.game.removeAnimation();
                                    W.setInnerHTML('cluepasttxt', "It is your turn! Please move a block"); 
                                    W.gid('cluepasttxt').style.color = "red"  
                                    node.game.enableDragDrop(W);
                                    this.architectScore+=1
                                    console.log("this.architectScore=", this.architectScore)
                                    var a = W.gid('done');
                                    a.onclick = function() { node.done() };  

                                }, 4000);
                                //W.setInnerHTML('cluepasttxt', "The helper selected to move a: ");
                                //W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from "+ "room " + movedfrom_room.charAt(0)+  " to "+  "room " + movedto_room.charAt(0));   
                                
                            }
                            else{
                                // if goal has been achieved, they click a button to advance to the next goal   
                                    node.game.architectgoalAchieved();
                                    W.getElementById('nextgoal').style.visibility = 'visible';
                                    W.getElementById('done').style.visibility = 'hidden';
                                    W.setInnerHTML('cluepasttxt', "Goal has been achieved!!");
                                    W.gid("dot1").style.visibility = "hidden" 
                                    W.gid("dotContainer").style.visibility = "hidden"
                                    if(node.game.computeGoal()){
                                        W.getElementById('nextgoal').style.visibility = 'hidden';
                                        W.getElementById('done').style.visibility = 'visible';

                                        this.totalHelp  = this.architectScore 
                                        W.setInnerHTML('cluepast0txt', "The optimal moves were "+ this.optimalMoveCount + " and Helper's assistance resulted in " + this.totalHelp +  " moves! All goals are complete. Click Done to continue"); 

                                        
                                        W.setInnerHTML('done', 'Done');
                                        W.gid("dot1").style.visibility = "hidden" 
                                        W.gid("dotContainer").style.visibility = "hidden"
                                        node.say('END_GAME', 'SERVER', true);
                                        var a = W.gid('done');
                                        a.disabled = false;
                                        a.onclick = function() { node.done() };

                                    }
                                    else{
                                        this.totalHelp  = this.architectScore 
                                        W.setInnerHTML('cluepast0txt', "The optimal moves were "+ this.optimalMoveCount + " and Helper's assistance resulted in " + this.totalHelp +  " moves! You will now move on to the next task. Please click Next Goal to continue."); 
                                        
                                        W.setInnerHTML('nextgoal', 'Next goal');
                                        var g = W.gid('nextgoal');
                                        g.disabled = false;
                                        g.addEventListener('click', 
                                        function() {node.game.nextGoalActions(moveChoice)}
                                        );
                                    }
                                }
                                
                            }
                            else{ // no goals remaining
                                W.getElementById('nextgoal').style.visibility = 'hidden';
                                W.getElementById('done').style.visibility = 'visible';
                                W.setInnerHTML('cluepasttxt', "Goal has been achieved!!"); 
                                W.gid("dot1").style.visibility = "hidden" 
                                W.gid("dotContainer").style.visibility = "hidden"

                                this.totalHelp  = this.architectScore 
                                W.setInnerHTML('cluepast0txt', "The optimal moves were "+ this.optimalMoveCount + " and Helper's assistance resulted in " + this.totalHelp +  " moves! All goals are complete. Please click Next Goal to continue."); 
                                W.setInnerHTML('done', 'Done');
                                node.say('END_GAME', 'SERVER', true);
                                var a = W.gid('done');
                                a.disabled = false;
                                a.onclick = function() { node.done() };

                            }
                        }
                    else {// pass
                            W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                            
                            var a = W.gid('done');
                            a.onclick = function() { node.done() };
                            W.setInnerHTML('cluepasttxt', "The helper chose to pass their turn"); 
                            setTimeout(() => {
                                W.setInnerHTML('cluepast0txt', 'It is your turn! Please drag and drop a block.')
                                W.gid("cluepast0txt").style.color = "red"
                            }, 1000); 
                            node.game.enableDragDrop(W);
                            this.architectScore+= 1
                            console.log("this.architectScore=", this.architectScore)
                        }
                    }
                else if(moveChoice1.includes("done")){
                    node.game.architectgoalAchieved();
                    let checkend = node.game.checkEnd();
                    if(checkend){node.done();}
                    else{
                    node.game.nextGoalActions();
                    W.setInnerHTML('cluepasttxt', "This is your next task.");   
                    }

                }
                else{ // asked a question
                W.getElementById('done').style.visibility = 'hidden';
                
                W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                W.setInnerHTML('cluepasttxt', "The helper has asked you a question: ");
                W.setInnerHTML('cluepast', moveChoice1 ); 
                setTimeout(() => {
                    W.setInnerHTML('cluepast0txt', "Please respond with a YES or NO.");
                    W.gid("cluepast0txt").style.color = "red"

                }, 1000);
                
                
                // after question has been displayed, architect responds with yes/no

                W.gid("questiontable").style.visibility = "visible"
                W.gid("yesbutton").disabled = false
                W.gid("nobutton").disabled = false

                var el = W.getElementById("questiontable");
                this.clicker2 = function (e){
                    var target = e.target;
                    if(target.className.match("button button2")){
                        node.game.memory.add({
                            player: node.player.id,
                            stage: node.game.getCurrentGameStage(),
                            choiceoption: target.innerHTML
                        }); 
                        node.game.memory.tag("QUESTIONCHOICE");//tag this memory for easy access later
                        el.removeEventListener('click', this.clicker2);
                        node.done(); 
                    }
                }
                el.addEventListener('click', this.clicker2);

                }
            }// end not first trial if
        else {
        W.setInnerHTML('cluepast0txt', "It is your turn! Please drag and drop a block."); 
        node.game.drawTable(W, this.currentShape, this.currentConfiguration);
        node.game.enableDragDrop(W);
        this.architectScore+=1 
        console.log("this.architectScore=", this.architectScore)
        var a = W.gid('done');
        a.onclick = function() { node.done() };
        }

    }, // end cb architect
    done: function() {
        if (this.helperActions.length> 0){
            var moveChoice1 = this.helperActions.at(-1) // this.clueReceived
            node.set({goalnumber: this.roundCounter+1});
            // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"
            if (moveChoice1.includes("move a block from ")) {
                // if there was a move from the helper
                // then there will also be a move from the architect which we need to record
                // get total value
                var choiceTXT = node.game.memory.resolveTag("MOVE").totalmove;
                this.architectActions.push(choiceTXT);
                node.set({architectMove: choiceTXT});
                node.say('ANSWER', node.game.partner, choiceTXT);
            }
            else if(moveChoice1.includes("Pass")){
                // get total value
                var choiceTXT = node.game.memory.resolveTag("MOVE").totalmove;
                this.architectActions.push(choiceTXT);
                node.set({architectMove: choiceTXT});
                node.say('ANSWER', node.game.partner, choiceTXT);
            }
            else if(moveChoice1.includes("done")){
                var choiceTXT = "done";
                this.architectActions.push(choiceTXT);
                node.set({architectMove: choiceTXT});
                node.say('ANSWER', node.game.partner, choiceTXT);
            }

            else{ // answered a question
                var answer = node.game.memory.resolveTag("QUESTIONCHOICE").choiceoption;
                console.log("answer=", answer)
                var question_plus_answer = moveChoice1 + "---" + answer
                this.architectActions.push(question_plus_answer);
                node.set({architectAnswer: answer});
                node.say('ANSWER', node.game.partner, question_plus_answer);
            }
        return;
    }

    else{ // first trial, i.e. only architect move has been made, stored in Guess1 via dragdrop func
        
        var choiceTXT = node.game.memory.resolveTag("MOVE").totalmove;
        this.architectActions.push(choiceTXT);
        node.set({goalnumber: this.roundCounter+1});
        node.set({architectMove: choiceTXT});
        node.say('ANSWER', node.game.partner, choiceTXT);
    }
} // end done
} // end architect
} // end roles
}); // end step

stager.extendStep('helperOptionsprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },

        roles: {
            helper:{
                init: function() {
                    node.game.guessesReceived = null;
                },
                frame: 'helperChoice.htm',
                cb: function() {
                    console.log("inside helperChoice!!!!")
                    
                    //const info = W.getElementById("helperinfo")
                    //info.style.border = "3px solid red"
                    /*
                    W.setInnerHTML('helperlastaction', "-"); 
                    W.setInnerHTML('helpercurrentaction', "Making a decision..."); 
                    W.setInnerHTML('architectlastaction', "-");
                    W.setInnerHTML('architectcurrentaction', "Waiting for Helper...");
                    */
                    // figure out update message based on whether a move was made or not
                    var moveChoice1 = this.architectActions.at(-1)
                    console.log("architect's moveChoice1=",moveChoice1)
                    let checkend = node.game.computeGoal();
                
                    if (moveChoice1.includes("move a block from ")){
                        var moveInfo = this.architectActions.at(-1)
                        let { moved_color, moved_shape, movedfrom_room, movedto_room, moveToID, moveFromID, moveChoice } = node.game.getMovement(moveInfo);
                        
                        // if the Architect moved
                        var oldShape = JSON.parse(JSON.stringify(this.currentShape));
                        var oldColor = JSON.parse(JSON.stringify(this.currentConfiguration));
                        

                        //moveToID becomes the color of moveFromID
                        this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                        // and moveFromID becomes white
                        this.currentConfiguration[moveFromID] = "white"
                        // we also change the shapes accordingly
                        this.currentShape[moveToID] = this.currentShape[moveFromID]
                        this.currentShape[moveFromID] = "square"
                        // draw
                        W.setInnerHTML('cluepasttxt', "The Architect is moving the blocks now");
                        W.gid('cluepasttxt').style.color = "red"
                        node.game.showAnimation(moveChoice, oldShape, oldColor);
                        // evaluate
                        let checkend = node.game.computeGoal();

                        if(checkend == 0){ // if goals remaining, then provide feedback
                            var feedbackvalue = node.game.provideFeedback();
                            if(feedbackvalue == 0){
                                setTimeout(() => {
                                    W.setInnerHTML('cluepasttxt', "It is your turn! Choose your action"); 
                                    W.gid('cluepasttxt').style.color = "red"  
                                    W.gid("help").disabled = false
                                    W.gid("ask").disabled = false
                                    W.gid("pass").disabled = false    

                                }, 3000);
                                //W.setInnerHTML('cluepasttxt', "The Architect chose to move a: ");
                                //W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room.charAt(0)+  " to room " + movedto_room.charAt(0));
                            }
                            else{

                                this.totalHelp  = this.optimalMoveCount  - this.helperScore
                                W.setInnerHTML('cluepasttxt', "The goal was to " + this.verbalGoal + ". Goal has been achieved!!"); 
                                W.setInnerHTML('clue2', "The optimal moves were "+ this.optimalMoveCount + " and your help resulted in " + this.totalHelp +  " moves! Click done to continue to the next task"); 

                                
                                W.gid("help").style.visibility = "hidden"
                                W.gid("ask").style.visibility = "hidden"
                                W.gid("pass").style.visibility = "hidden" 
                                node.say('GUESS', node.game.partner, "done"); 
                                node.game.memory.add({
                                    player: node.player.id,
                                    stage: node.game.getCurrentGameStage(),
                                    choiceoption: "done"
                                }); 
                                node.game.memory.tag("CHOICE");              
                                var d = W.gid("nextgoal")
                                d.disabled = false
                                d.style.visibility = "visible"
                                d.onclick = function() { node.done() };
                
                            }
                        }
                    else{
                        this.totalHelp  = this.optimalMoveCount  - this.helperScore
                                W.setInnerHTML('cluepasttxt', "The goal was to " + this.verbalGoal + ". Goal has been achieved!!"); 
                                W.setInnerHTML('clue2', "The optimal moves were "+ this.optimalMoveCount + " and your help resulted in " + this.totalHelp +  " moves! Click done to continue to the next task"); 
                        }
                    }
                    
                    else if(moveChoice1.includes("done")){
                        node.done();
                    }

                    else{
                        W.gid("help").disabled = false
                        W.gid("ask").disabled = false
                        W.gid("pass").disabled = false
                        // if the architect answered a question
                        var qplusa = this.architectActions.at(-1)
                        var q = qplusa.split('---')[0]
                        W.setInnerHTML('cluepasttxt', "You asked the Architect: <span style='color:red;'>  "+ q + "</span>. The Architect's answer is: ");
                        var a = qplusa.split('---')[1]
                        W.setInnerHTML('cluepast',  a);
                        setTimeout(() => {
                            W.setInnerHTML('clue2', 'It is your turn! Choose your action.')
                            W.gid("clue2").style.color = "red"
                        }, 3000);
                        
                        W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                    }

            if(checkend == 0){
               // now record click
               // this needs to be delayed if there was a move
                var el = W.getElementById("gbrd");
                this.clicker2 = function (e){
                    var target = e.target;
                    if(target.className.match("button button2")){
                        node.say('GUESS', node.game.partner, target.innerHTML);
                        node.set({helperChoice : target.innerHTML});
                        node.set({helperChoiceTime : node.timer.getTimeSince('step')})
                        node.game.memory.add({
                            player: node.player.id,
                            stage: node.game.getCurrentGameStage(),
                            choiceoption: target.innerHTML
                        }); 
                        node.game.memory.tag("CHOICE");//tag this memory for easy access later
                        el.removeEventListener('click', this.clicker2);
                        node.done(); 
                    }
                }
                el.addEventListener('click', this.clicker2);
            }
            else{
                W.gid("help").style.visibility = "hidden"
                W.gid("ask").style.visibility = "hidden"
                W.gid("pass").style.visibility = "hidden"
                
                node.say('GUESS', node.game.partner, "done");
                node.say('END_GAME', 'SERVER', true);
                node.done();
                
            }
                   
            }, // end helper cb function
        done: function() { 
        var moveChoice1 = this.architectActions.at(-1)   
        if(moveChoice1.includes("done")){
            node.say('CHOICE', node.game.partner, "done");
            this.helperActions.push("done");
            node.set({goalnumber: this.roundCounter+1});
            //node.set({helperID: this.id});
            node.set({helperRandCode: this.randomCode});
            node.set({helperMove: 999});
            node.set({helperQuestion: 999});
            return;

        }
        else{
            var choiceTXT = node.game.memory.resolveTag("CHOICE").choiceoption;
            node.say('CHOICE', node.game.partner, choiceTXT);
            this.helperActions.push(choiceTXT);
            node.set({goalnumber: this.roundCounter+1});
            //node.set({helperID: this.id});
            node.set({helperRandCode: this.randomCode});
            node.set({helperMove: 999});
            node.set({helperQuestion: 999});
            return;
        }
        }

        }, //end helper function
    architect:{
        init: function() {
            node.game.clueReceived = null;
        },
        frame: 'architectStudyBoard.htm',
        cb: function() {//set the board for the architect
                    W.gid("nextgoal").style.visibility = "hidden"
                    /*
                    W.setInnerHTML('helperlastaction', "-"); 
                    W.setInnerHTML('helpercurrentaction', "Making a decision.."); 
                    W.setInnerHTML('architectlastaction', "-");
                    W.setInnerHTML('architectcurrentaction', "Waiting for Helper...");
                    */
                    node.game.computeGoal();

                    //let checkend = node.game.computeGoal();
                    
                    // here we need to change the positions
                    var moveChoice1 = this.architectActions.at(-1)
                    // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"
                    if (moveChoice1.includes("move a block from ")){
                        // if the Architect moved
                        var moveInfo = this.architectActions.at(-1)

                        let { moved_color, moved_shape, movedfrom_room, movedto_room, moveToID, moveFromID, moveChoice } = node.game.getMovement(moveInfo);
                        //var oldShape = JSON.parse(JSON.stringify(this.currentShape));
                        //var oldColor = JSON.parse(JSON.stringify(this.currentConfiguration));
                        

                        //moveToID becomes the color of moveFromID
                        this.currentConfiguration[moveToID] = this.currentConfiguration[moveFromID]
                        // and moveFromID becomes white
                        this.currentConfiguration[moveFromID] = "white"
                        // we also change the shapes accordingly
                        this.currentShape[moveToID] = this.currentShape[moveFromID]
                        this.currentShape[moveFromID] = "square"
                        // draw
                        node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                        // evaluate
                        let checkend = node.game.computeGoal();
                        if(checkend == 0){ // goals still remaining

                            var feedbackvalue = node.game.provideFeedback();
                            if(feedbackvalue == 0){
                                node.game.showDotsAnimation();
                                //W.setInnerHTML('cluepasttxt', "You chose to move a: ");
                                //W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room.charAt(0)+  " to room " + movedto_room.charAt(0));
                            }
                            else{ // if goal has been achieved
                                //W.gid("nextgoal").style.visibility = "visible"
                                
                                this.totalHelp  = this.architectScore 
                                W.setInnerHTML('cluepasttxt', "Goal has been achieved!!"); 
                                W.setInnerHTML('cluepast0txt', "The optimal moves were "+ this.optimalMoveCount + " and Helper's assistance resulted in " + this.totalHelp +  " moves! You will now move on to the next task. Waiting for the Helper"); 
                                
                                node.game.showDotsAnimation();
                                //W.setInnerHTML('nextgoal', 'Next goal');
                                //var g = W.gid('nextgoal');
                                //g.disabled = false;
                                //g.addEventListener('click', 
                                //function() {node.game.nextGoalActions(moveChoice)}
                                //  );
                                    
                            }
                        }
                        else{ // goals done
                            node.game.computeGoal();
                            W.setInnerHTML('cluepasttxt', ""); 
                            W.setInnerHTML('cluepast0txt', "Goals are complete. Waiting for the Helper"); 
                            node.game.showDotsAnimation();
                        }
                        
                    } // close the movement if
                    else if(moveChoice1.includes("done")){
                        W.setInnerHTML('cluepasttxt', ""); 
                        W.setInnerHTML('cluepast0txt', "Waiting for the Helper");
                        node.game.showDotsAnimation();
                    }   
                    else{  // if architect answered a question  
                        W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                        var qplusa = this.architectActions.at(-1)
                        console.log("qplusa=",qplusa)
                        var q = qplusa.split('---')[0]
                        W.setInnerHTML('cluepasttxt', "The Helper asked you: <span style='color:red;'>"+ q + "</span>. You responded with: ");
                        var a = qplusa.split('---')[1]
                        W.setInnerHTML('cluepast', a);  
                        node.game.showDotsAnimation();
                    }
                    
                    
                    var that;//force proceed when clue is sent from other player
                    that = this; 
                    if (this.clueReceived !== null) node.done();
                    node.on.data('GUESS', function(msg) {
                        that.clueReceived = msg.data;
                        this.helperActions.push(that.clueReceived);
                        var feedbackvalue = node.game.provideFeedback();
                        if(feedbackvalue == 0){ node.done();}
                        else{setTimeout(() => {node.done();}, 5000);}
                    });
                    
                },
                done: function() {
                    node.say('GUESS', node.game.partner);
                    node.set({goalnumber: this.roundCounter+1});
                    //node.set({architectID: this.id});
                    node.set({architectRandCode: this.randomCode});
                    node.set({architectMove: 999});
                    node.set({architectAnswer: 999});
                    return;
                }
            }
        }
    });

    stager.extendStep('helperAction', { // if goal has been achieved then we need to "done" this step entirely
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
        helper:{
            init: function() {
                node.game.clueReceived = null;
            },
            frame: 'helperActiondisplay.htm',
            donebutton: false,
            cb: function() {
                W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                let checkend = node.game.computeGoal();

                if(checkend == 0){ // goals remaining
                
                
                var choiceTXT = this.helperActions.at(-1) 
                if(["I'll help!"].includes(choiceTXT)){
                    node.once('PLAYING', function() {
                        const help_button = W.getElementById("helpbutton")
                        help_button.style.backgroundColor = "DarkSeaGreen"
                        });
                    W.setInnerHTML("cluepasttxt", "Please drag and drop an unobstructed block to any location.")   
                    W.setInnerHTML("clue2", "Click Continue when you are done")
                    node.game.enableDragDrop(W);
                    this.helperScore+=1 
                    console.log("helperScore=", this.helperScore)
                    var a = W.gid('done');
                    a.onclick = function() { node.done() };
                }
                    
                else if(["Ask a yes/no question"].includes(choiceTXT)){
                    node.once('PLAYING', function() {
                        W.gid("dotContainer").style.visibility = "hidden"
                        W.gid("dot1").style.visibility = "hidden"
                        const done_button = W.getElementById('done');
                        done_button.disabled = false;
                        const ask_button = W.getElementById("askbutton")
                        ask_button.style.backgroundColor = "DarkSeaGreen"
                    });
                    this.clueGive2 = node.widgets.append('CustomInput', W.gid('containerbottom2'), {
                       id: 'clueGive',
                       mainText: 'Enter your yes/no question here:',
                       type: 'text',
                       className: 'centered',
                       requiredChoice: true  
                   });
                   var a = W.gid('done');
                   a.onclick = function() { node.done() };
                        
                }
                else{ // pass
                    node.done();
                }
            }
            else{// goals are complete
                node.done();
            }
        }, // end cb func
    done: function() {
        var choiceTXT = node.game.memory.resolveTag("CHOICE").choiceoption;
        if(["Ask a yes/no question"].includes(choiceTXT)){
            this.helperActions.push(this.clueGive2.getValues().value);
            node.set({helperQuestion: this.clueGive2.getValues().value}); 
            node.set({helperMove: 999}); 
            node.say('CLUE', node.game.partner, this.clueGive2.getValues().value);
        }
        else if(["Pass"].includes(choiceTXT)){
            this.helperActions.push("Pass");
            node.say('CLUE', node.game.partner, "Pass");
        }
        else if(["done"].includes(choiceTXT)){
            this.helperActions.push("done")
            node.say('CLUE', node.game.partner, "done");
        }
        else{
            // move
            choiceTXT = node.game.memory.resolveTag("MOVE").totalmove
            this.helperActions.push(choiceTXT);
            node.set({helperMove: choiceTXT});
            node.set({helperQuestion: 999});
            node.say('CLUE', node.game.partner, choiceTXT);
        }

        return;
    }

}, // end helper func

architect:{
    init: function() {
        node.game.clueReceived = null;
    },
    donebutton: false,
    frame: 'architectStudyBoard.htm',

    cb: function() {
        /*
        W.setInnerHTML('helperlastaction', "-"); 
        W.setInnerHTML('helpercurrentaction', "Making a decision.."); 
        W.setInnerHTML('architectlastaction', "-");
        W.setInnerHTML('architectcurrentaction', "Waiting for Helper...");
        */

        node.game.computeGoal();

        W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);

        var choiceTXT = this.helperActions.at(-1) 
        if(["I'll help!"].includes(choiceTXT)){
            W.setInnerHTML('cluepast0txt', 'The helper is moving a block')
            node.game.showDotsAnimation();
        }

        else if(["Ask a yes/no question"].includes(choiceTXT)){
            W.setInnerHTML('cluepast0txt', 'The helper is typing a question')
            node.game.showDotsAnimation();
        }

        var that;//force proceed when clue is sent from other player
        if (this.clueReceived !== null) node.done();
        that = this;    
        node.on.data('CLUE', function(msg) {
            that.clueReceived = msg.data;
            this.helperActions.push(that.clueReceived);
            node.done();
        });

        

                
    }, // end cb
 } // end architect func
} // end roles
}); // end step

/*

stager.extendStep('feedbackprac', {//tells each player whether the goal was achieved or not
    role: function() { return this.role; },
    partner: function() { return this.partner; },

    roles: {
        helper:{
            init: function() {
                node.game.guessesReceived = null;
                
            },
            donebutton: true,
            frame: 'helperStudyBoard.htm',
            cb: function() {

                W.setInnerHTML('role', "Your role: "+ "Helper"),
                W.setInnerHTML('turn', "Turn:"+ "Architect"),

                W.setInnerHTML('helperlastaction', "-"); 
                W.setInnerHTML('helpercurrentaction', "Waiting for Architect..."); 

                W.setInnerHTML('architectlastaction', "-");
                W.setInnerHTML('architectcurrentaction', "Moving a block...");
            
                var choiceTXT = node.game.memory.resolveTag("CHOICE").choiceoption;
                if(["Ask a yes/no question"].includes(choiceTXT)){ 
                    W.setInnerHTML('cluepasttxt', "You chose to ask a question: ");
                    W.setInnerHTML('cluepast',  this.helperActions.at(-1));    
                    W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                }

                else if(["Pass"].includes(choiceTXT)){
                    W.setInnerHTML('cluepasttxt', "You chose to pass your turn.");
                    W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                }
                else{
                W.setInnerHTML('cluepasttxt', "You chose to move a: ");
                var moveInfo = this.helperActions.at(-1)

                let { moved_color, moved_shape, movedfrom_room, movedto_room, moveToID, moveFromID, moveChoice } = node.game.getMovement(moveInfo);
                W.getElementById(moveChoice[0]).style.border = "3px solid Gold"
                W.getElementById(moveChoice[1]).style.border = "3px solid Gold"
                
                W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from room " + movedfrom_room.charAt(0)+  " to room " + movedto_room.charAt(0));
                //moveToID becomes the color of moveFromID
                this.feedbackConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));
                this.feedbackShape = JSON.parse(JSON.stringify(this.currentShape));
                this.feedbackConfiguration[moveToID] = this.feedbackConfiguration[moveFromID]
                // and moveFromID becomes white
                this.feedbackConfiguration[moveFromID] = "white"
                // we also change the shapes accordingly
                this.feedbackShape[moveToID] = this.feedbackShape[moveFromID]
                this.feedbackShape[moveFromID] = "square"
                W = node.game.drawTable(W, this.feedbackShape, this.feedbackConfiguration);
                }
        
                // moveChoice will either be a question string or of the form "rowXcellXY MoveBlockTo rowXcellXY" or "Pass"                
                
                node.game.provideFeedback(W);
                console.log("afterProvideFeedback helper")            
                W.setInnerHTML('clue2', "Please wait for the Architect...");
            }, // close cb
            done:  function(){
                node.say('GUESS', node.game.partner);
                return;
                }
            }, // close helper
        architect:{
            init: function() {
                node.game.clueReceived = null;
            },
            donebutton: true,//disable done button so they cannot proceed without their partner finishing
            frame: 'architectMoveBoard.htm',
            cb: function() {//set the board for the architect
                W.setInnerHTML('helperlastaction', "-"); 
            W.setInnerHTML('helpercurrentaction', "Waiting for Architect.."); 
            W.setInnerHTML('architectlastaction', "-");
            W.setInnerHTML('architectcurrentaction', "Making a move...");

            var actualGoal = this.goalList[this.roundCounter][2];
            var direction = 0;
            if (actualGoal.charAt(1) ==1){direction = "left"}
            else{direction = "right"}

            this.verbalGoal = "Move all " + this.goalList[this.roundCounter][0] +  " " + this.goalList[this.roundCounter][1] + "s to the " + direction + " side of room "+  actualGoal.charAt(0)

            W.setInnerHTML('role', "Your role: "+ "Architect"),
            W.setInnerHTML('turn', "Turn:"+ "Architect"),
            W.setInnerHTML('goal', "Goal: " + this.verbalGoal);

            if(this.trial>0){ 
                // if this is not the first trial
                // here we want to tell the architect what the Helper did and also change the block positions
                var moveChoice1 = this.helperActions.at(-1)
                console.log("moveChoice1 inside feedbackprac architect="+moveChoice1)
                // moveChoice will either be a question string or of the form "A2 to B2" or "Pass"
                    if (moveChoice1.includes("move a block from ") || moveChoice1.includes("Pass")){
                        if (moveChoice1.includes("move a block from ")){
                            this.oldConfig = JSON.parse(JSON.stringify(this.currentConfiguration));
                            // draw out old config    
                            W = node.game.drawTable(W, this.currentShape, this.oldConfig);
                                        
                            W.setInnerHTML('cluepasttxt', "The helper selected to move a: ");
                            var moveInfo = this.helperActions.at(-1)
                            let { moved_color, moved_shape, movedfrom_room, movedto_room, moveToID, moveFromID, moveChoice } = node.game.getMovement(moveInfo);
                            setTimeout(() => {W.getElementById(moveChoice[0]).style.border = "3px solid Gold"}, 1000);
                            setTimeout(() => {W.getElementById(moveChoice[1]).style.border = "3px solid Gold"}, 3000);
                            setTimeout(() => {W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);}, 4000);

                            var movedirection1 = 0;
                            if (movedfrom_room.charAt(1) ==1){movedirection1 = "left"} else{movedirection1 = "right"}

                            var movedirection2 = 0;
                            if (movedto_room.charAt(1) ==1){movedirection2 = "left"} else{movedirection2 = "right"}

                            W.setInnerHTML('cluepast', moved_color + " " + moved_shape + " from the "+ movedirection1 + " side of room " + movedfrom_room.charAt(0)+  " to the "+ movedirection2+  " side of room " + movedto_room.charAt(0));
                            //moveToID becomes the color of moveFromID
                            this.feedbackConfiguration = JSON.parse(JSON.stringify(this.currentConfiguration));
                            this.feedbackShape = JSON.parse(JSON.stringify(this.currentShape));
                            this.feedbackConfiguration[moveToID] = this.feedbackConfiguration[moveFromID]
                            // and moveFromID becomes white
                            this.feedbackConfiguration[moveFromID] = "white"
                            // we also change the shapes accordingly
                            this.feedbackShape[moveToID] = this.feedbackShape[moveFromID]
                            this.feedbackShape[moveFromID] = "square"
                        }
                    else {// pass
                            W.setInnerHTML('cluepasttxt', "The helper chose to pass their turn.");
                            W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
                        }
                    }
                else{ // asked a question
                W.getElementById('done').style.visibility = 'hidden';
                W.setInnerHTML('cluepasttxt', "The helper has asked you a question: ");
                W.setInnerHTML('clue2', "");
                W.setInnerHTML('cluepast', moveChoice1 ); 
                W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
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
            } // end not first trial if

        W = node.game.drawTable(W, this.currentShape, this.currentConfiguration);
        node.game.provideFeedback(W);
        console.log("afterProvideFeedback architect")            
        //node.game.memory.tag("GUESS");                    
    }, // close cb
    done: function() {
        node.say('GUESS', node.game.partner);
        node.on.data('GUESS', function(msg) {
            this.clueReceived = msg.data;
        });
        node.set({architectID: this.id});
        node.set({architectRandCode: this.randomCode});
        return;
    }            
        } // close architect
    } // close roles
}); // close step

*/

stager.extendStep('endprac', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            helper:{
                frame: 'pracend.htm',
                cb: function(){

                    


                    var a = W.gid("done")
                    a.onclick = function(){node.done()};
                }
            },
            architect:{
                frame: 'pracend.htm',
                cb: function(){
                    
                    var a = W.gid("done")
                    a.onclick = function(){node.done()};
                }
                
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
        frame: 'end.htm',
        cb: function() {
            //node.game.visualTimer.setToZero();
            var myDiv = W.getElementById("compcode");
            myDiv.innerHTML = "Your completion code is: " + this.randomCode;
        }
    });
};
