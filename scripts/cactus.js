import { SPEED } from "./config.js";

export default class Cactus{
    constructor(x,y,w,h,image){
        this.x = x;
        this.h = h;
        this.y = y-this.h+20;
        this.w = w;
        
        this.image = new Image();
        this.image.src= image;

    }
    draw(context){
         context.drawImage(this.image,this.x,this.y,this.h,this.w);
         this.move();
    }
    move(){
        this.x = this.x - SPEED;
    }

    isOutOfScreen(){
        return this.x<0;
    }
}