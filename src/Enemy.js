import gsap from "gsap";
import setRandomInterval from "set-random-interval";
import { Spine } from "pixi-spine";
import * as PIXI from "pixi.js";

export default class Enemy {
  constructor(item) {

    this.resname=item.name;
    this.container = item.addTo;

    this.startFrom = 0;
    this.endAt = 0;
    this.front = 0;
    this.enemyArray= [];
    this.enemyDuration=[29,21,22,23,24,25,26,27,28,29,30,40,50];

    this.from = ["left", "right"];

    this.counter=0;

    const interval = setRandomInterval(()=>{
      
      let getFrom = this.from[Math.floor(Math.random()*this.from.length)]
      this.counter++

      if(getFrom =="left") {
        this.startFrom = -400;
        this.endAt = 1700;
        this.front = -1;
      } else {
        this.startFrom = 1700;
        this.endAt = -400;
        this.front = 1;
      }

      
      //? Start: getting enemy */
      
      this.enemyContainer = new PIXI.Container();
        this.enemyContainer.x = this.startFrom;
        this.enemyContainer.data = this.enemyDuration[Math.floor(Math.random()*this.enemyDuration.length)];
     
      this.enemyContainer.alive = true; // denne kan sættes til false hvis denne specifikke enemy er død og sikre at vi ikke interagere med den npr den er død
      this.enemyContainer.attack= true
        this.enemyContainer.id=this.counter;
        this.enemyContainer.y = 768-50;
        this.enemyContainer.scale.x = this.front;
        this.enemyContainer.zIndex = 1;
        this.container.addChild(this.enemyContainer);
     
        this.enemyArray.push(this.enemyContainer);//alle enemies bliver lagt i et array så vi kan styrre de enkelte enemies

      const alienEnemy = new Spine(this.resname.spineData);

        alienEnemy.x = 0;
        alienEnemy.y = 0;
        alienEnemy.state.setAnimation(0,"walk", true);
        this.enemyContainer.addChild(alienEnemy);

        const hitarea = new PIXI.Graphics();
          hitarea.beginFill(0xDE3249);
          hitarea.drawRect(-25, -75, 50, 50);
          hitarea.alpha = 0;
          /* hitarea.endFill(); */
          this.enemyContainer.addChild(hitarea)


          gsap.to(this.enemyContainer, {
            duration:this.enemyContainer.data,
            x: this.endAt,
            onComplete: ()=>{

              this.container.removeChild(this.enemyArray[0]);
              this.enemyArray.shift();

            }
          })

 //? End: getting enemy */


       },1000,5000)
  }//END constructor

  get enemies(){
    return this.enemyArray;
  }
}//END class