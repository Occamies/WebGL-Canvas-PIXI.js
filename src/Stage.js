import * as PIXI from 'pixi.js'
export default class Stage {

  constructor() {
    this.targetWidth = 1700;
    this.targetHeight =768;
    this.targetCenter = 1024; //centers interactive area for objects(not background)

    this.appWidth = window.innerWidth;
    this.appHeight = window.innerHeight;

    this.scaleFactor = this.appWidth/this.targetWidth;


    this.app = new PIXI.Application({
      autoResize: true,
      resolution: devicePixelRatio,
      backgroundColor: 0xcccccc,
      width: this.appWidth,
      height: this.appHeight,
      antialias: true,
      resulution: window.devicePixelRatio || 1
    })

    document.body.appendChild(this.app.view)

    this.app.view.style.width = this.appWidth + "px";
    this.app.view.style.height = this.appHeight + "px";

    this.bg = new PIXI.Container();
      this.bg.x = this.appWidth/2;
      this.bg.y = this.appHeight/2;
      this.bg.pivot.x = this.targetWidth *0.5;
      this.bg.pivot.y = this.targetHeight *0.5;
      this.bg.interactive = true;
      this.app.stage.addChild(this.bg);
      //this.bg.interactiveChildren = false;
      this.bg.getBounds();
      this.bg.scale.x = this.bg.scale.y = this.scaleFactor;
      this.bg.scale.y = this.bg.scale.x = this.appHeight / this.targetHeight;

      this.scene = new PIXI.Container();
      this.scene.x = this.appWidth/2;
      this.scene.y = 0
      this.scene.pivot.x = this.targetCenter * 0.5;
      this.app.stage.addChild(this.scene);
      this.scene.getBounds();
      this.scene.scale.x = this.scene.scale.y = this.scaleFactor;
      this.scene.scale.y = this.scene.scale.x = this.appHeight / this.targetHeight;

      this.app.renderer.resize(this.appWidth, this.appHeight)

      

  }//END constructor

  get  stageInfo(){

    let si = {
      appwidth: this.appWidth,
      appHeight: this.appHeight,
      targetHeight: this.targetHeight,
      targetWidth: this.targetWidth,
      scaleFactor: this.scaleFactor,
      app: this.app
    }

    return si

  }

}//END class