import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { Howl, Howler } from "howler";
import Stage from "./Stage";

export default class NewGame {

  constructor() {

    this.myStage = new Stage();
    this.scene = this.myStage.scene;
    this.scene.sortableChildren = true;
    this.background = this.myStage.bg;

   let assets = [

   ]

    let placementX = [ 
      100, 
      200, 
      300
    ]

    const loader = PIXI.Loader.shared
      .add(assets)


      .load((loader, res) => {

        let bg = PIXI.Texture.from("../assets/images/background.jpg")
        let _bg = new PIXI.Sprite(bg);
        this.background.addChild(_bg);


        let spriteX = [200, 600, 1050];
        let assets = [
          "../assets/images/left_box.png",
          "../assets/images/middle_box.png",
          "../assets/images/right_box.png"
        ];
        let startAtY = -500;
        let spriteY = 768-150;
        
        this.counter = -1

        let myInterval = setInterval( ()=>{
         this.counter ++;

         let boxTexture = PIXI.Texture. from(assets[this.counter])
         let boxes = new PIXI.Sprite(boxTexture);
         boxes.anchor.set(.5)
         boxes.x = spriteX[this.counter];
         boxes.y = startAtY;
         boxes.interactive = true;
         boxes.buttonMode = true;
         this.scene.addChild(boxes)

         gsap.to(boxes, {
          y: spriteY,
          duration: 1,
          ease: "bounce"

         })

        boxes.on("pointerdown", (event)=>{
          gsap.to(event.currentTarget, {
            y: -500,
            duration: 1,
            ease: "easeInOut"
          })
        })

          if (this.counter === assets.length-1) {
            clearInterval(myInterval)
          }

          
        },2000  )
        


      })//END loader



  } // END constructor
} // END class
