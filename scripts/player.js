import { GAME_HEIGHT, GRAVITY } from "./config.js";
import Floor from "./floor.js";

export default class Player{
    constructor(){
        this.x=10;
        this.h=94;
        this.w=88;
        this.y=GAME_HEIGHT-(this.h+20);
        this.image=new Image();
        this.image.src='./assets/sprites/dino.png';
        this.runImages = ['./assets/sprites/dino1.png','./assets/sprites/dino2.png'];
        this.index = 0;
        this.image.src=this.runImages[this.index];
        this.isJumping=false;
    }

    jump(){
        if(!this.isJumping){
        this.y = this.y - (GAME_HEIGHT - this.h);
        this.isJumping= true;
        }
    }

    fall(){
        const FLOOR=GAME_HEIGHT - this.h;
        if(this.y>=FLOOR){
            this.isJumping= false;
            return ;
        }
        else{
            this.y= this.y + GRAVITY;
        }
    }


    draw(context){
        context.drawImage(this.image,this.x,this.y,this.h,this.w);
        this.walkAnimation();
        this.fall();
        
    }
    walkAnimation(){
        if(this.index >=2){
            this.index=0;
        }
        this.image.src=this.runImages[this.index];
        this.index++;
    }
}

