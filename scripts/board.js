import { FRAME_RATE, GAME_HEIGHT, GAME_WIDTH,MAX,MIN } from "./config.js";

import Player from "./player.js";

import Floor from "./floor.js";
import Cactus from "./cactus.js";



window.addEventListener('load',gamestart);

let player;
let floor;

let context;

function gamestart(){
    prepareCanvas();
    loadSprites();
    gameLoop();
    bindEvents();
}

function bindEvents(){
    window.addEventListener('keyup',doJump);
}

function doJump(event){
    if(event.code === 'Space'){
        player.jump();
    }
}


function prepareCanvas(){

  const canvas =   document.querySelector('#canvas');
  canvas.width=GAME_WIDTH;
  canvas.height=GAME_HEIGHT;
   context = canvas.getContext('2d');
}

function loadSprites(){
     player = new Player();
     floor= new Floor();
     loadCactus();
}

 let cactusArray = [];

function loadCactus(){
    const cactusArr = ['./assets/sprites/cactus1.png','./assets/sprites/cactus2.png','./assets/sprites/cactus3.png'];

     let GAP=1;

    for(var c of cactusArr){
       
       
        const cactus = new Cactus(GAME_WIDTH*GAP,GAME_HEIGHT,48,100,c);
        GAP++;
        cactusArray.push(cactus);
    }
}

function generateRandomNumber(){
   return  Math.floor(Math.random() * (MAX-MIN+1))+ MIN;
}

let delay = 0;


function generateRandomCactus(){
    if(delay>=70){
        delay=0;
    setTimeout(()=>{
       loadCactus();
    },generateRandomNumber());
}
else{
    delay++;
}
}



function printCactus(context){
    for(let cactus of cactusArray){
        cactus.draw(context);
    }
}

function removeUnusedCactus(){
    cactusArray.filter(c=>!c.isOutOfScreen())
}


function printGameOver(){
    context.font='bold 48px serif';
    context.fillStyle='grey';
    context.fillText('Game Over',GAME_WIDTH/3,GAME_HEIGHT/2);
}


function gameLoop(){
    clearScreen();
    if(isCollisionHappens()){
        printGameOver(context);
         player.draw(context);
    floor.draw(context);
    printCactus(context);
     generateRandomCactus();
     removeUnusedCactus();
     score();
    }
    else{
    player.draw(context);
    floor.draw(context);
    printCactus(context);
     generateRandomCactus();
     removeUnusedCactus();
     score();
    setTimeout(function(){
        requestAnimationFrame(gameLoop);
    },FRAME_RATE)
}
}

function clearScreen(){
    context.fillStyle='white';
    context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
}

function isCollide(cactus){
  return  player.x < cactus.x+ cactus.w && player.x +player.w > cactus.x
    && player.y < cactus.y + cactus.h && player.y + player.h > cactus.y;
}

let scoreValue =0 ;

function score(){
     if (!localStorage.maxScore) {
        localStorage.maxScore = 0;
    }
     const maxScore = parseInt(localStorage.maxScore, 10);

     if (scoreValue > maxScore) {
        localStorage.maxScore = scoreValue;
    }


    context.font='bold 36px serif';
    context.fillStyle='grey';
    context.fillText(scoreValue.toString().padStart(5,0),GAME_WIDTH-100,40);
    context.fillText(localStorage.maxScore.toString().padStart(5,0),GAME_WIDTH-200,40);

    scoreValue++;
}



function isCollisionHappens(){

  return  cactusArray.some(c=>isCollide(c));
    
}

