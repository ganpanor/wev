var wc;//capture
var wcW=320;
var wcH=240;
var wcWs=320;
var wcHs=240;
var font;
var wherep5;

var img=[];
var sound=[];

var resX;
var resY;
//btns
var startBtn;
var resetBtn;
var activeBtn=false;
// default timer
var milDf;

// INTRO //
var st0;
var intro;

// Step 1 - setting //
var st1=false;
var sett;
var milSet;
var goutX = 80;
// var pgBar

/*setTimer*/var sCount;var sTime;

// Step 2 - guide //
var st2=false;
var guide;
var milRed;
var back;
var newBack;

// Step 3 - ingame //
var st3=false;
var ingame;
var milingame;
/*lvTimer*/var time;var tCount;var tNext=10;var tRemain;
/*level*/var level=1;var lvUp=1;
/*Atk*/var randomX=0;var randomX2=0;var randomY=0;var rSpd;
var curHP=100;

// Step 4=result //
var st4=false;
var result;
//var result;
/*score*/ var score=0;var scoreGo=0;
function preload(){
  //fonts
  font=loadFont('data/font/SDSwaggerTTF.ttf');
  //background
  newBack=loadImage("data/newBack.png");
  //images
  for(var i=0;i<=5;i++){img[i]=loadImage("data/imgs/img"+i+".png");}
  //sounds
  for(var s=0;s<=12;s++){sound[s]=loadSound("data/sounds/sound"+s+".mp3");}
}

function setup() {
  colorMode(RGB,255);frameRate(20);
  wherep5=createCanvas(320,240);
  wherep5.parent("#canvasIn");
  var constraints={
    video: {
      mandatory: {maxWidth: 320,maxHeight: 240},
      optional: [{ maxFrameRate: 10 }]
    },audio: false };
  wc=createCapture(constraints);wc.hide();
  smooth();imageMode(CENTER);textAlign(CENTER);textSize(14);textFont(font);
  intro=new Get_st0();
  sett=new Get_st1();
  guide=new Get_st2();
  ingame=new Get_st3();
  result=new Get_st4();
  st0=true;
}

function draw() {
  //for button
  resX=map(mouseX,0,14/15*windowHeight,0,width);
  resY=map(mouseY,0,0.7*windowHeight,0,height);

  if(st0){intro.place();}

  //start game
  if(st0===false){
    wc.loadPixels();//cam

    ////// seperation //////
    if(st2){
      /*pixel difference value*/
      var moving=70;
      println(wc.width);
      newBack.loadPixels();//background
      for(var x=0;x < wc.width;x++){
        for(var y=0;y < wc.height;y++) {
          var i=(x + y * wc.width)*4;
            //collect pixels
            var frontR=wc.pixels[i];var frontG=wc.pixels[i+1];var frontB=wc.pixels[i+2];
            var backR=back.pixels[i];var backG=back.pixels[i+1];var backB=back.pixels[i+2];
            var newBackR=newBack.pixels[i];var newBackG=newBack.pixels[i+1];var newBackB=newBack.pixels[i+2];
            var dR=abs(frontR-backR);var dG=abs(frontG-backG);var dB=abs(frontB-backB);
            // seperate body
            if(dR < moving&&dG < moving&&dB < moving){
              wc.pixels[i]=newBackR;wc.pixels[i+1]=newBackG;wc.pixels[i+2]=newBackB;
              } else  {
              wc.pixels[i]=frontR;wc.pixels[i+1]=frontG;wc.pixels[i+2]=frontB;
              randomX=width-1-x;randomY=y;}
        } //var y
      } //var x
    } //end seperation

      wc.updatePixels();
      scale(-1,1);
      image(wc,-wcW/2,wcH/2,wcWs,wcHs);
      scale(-1,1);

    // STEP 1 - sett(capture) //
    if(st1){
      sett.place();
      goutX+=4;if(goutX>120){goutX=80};
      /*reset timer*/milSet=millis()-milDf;
      sCount=sTime-(milSet/1000);
      // pgBar=map(int(sCount),12,4,0,100);
    }

    // STEP 2 - guide //
    if(st2&&st3===false){
      guide.place();
      milRed=millis();
    }

    // STEP 3 - ingame //
    if(st3){
      //timer
      fill(255);
      milingame=millis()-milRed;// timer reset
      tCount=tNext-int(milingame/1000);time=nf(tCount,2);tRemain=map(time,20,0,-90.1,269.9);level=nf(lvUp,2);

      // 레벨업
      if(tCount===0){
      sound[6].play();
      tNext+=20;
      lvUp+=1;rSpd+=0.2;if(rSpd>=1.7){rSpd=1.7}}

      /*공격*/ ingame.attack();
      /*데미지*/ ingame.damage();
      /*현황텍스트*/ingame.state();

    } // end st3

     // STEP4 - result //
     if(st4){
       if(st3){result.screenshot();}
        st1= false;st2=false;st3=false;
        milRed=0;milingame=milingame;lvUp=1;
        result.score();
     } //end st4

    } //END CONTENTS
} //END DRAW


function keyPressed() {
  if(st0&&key==' '){
  sound[11].stop();sound[12].play();sound[0].play();
  st0=false;st1=true;sTime=13;
  milDf=millis();noTint();
  }
}

function mousePressed(){
  if(activeBtn){
    if(st1){sTime=4.1;activeBtn=false;
    sound[0].stop();
    sound[8].play();
      }
    if(st2||st4){
      if(st4===false){sound[11].loop();}
      sound[1].stop();
      sound[12].play();
      st4=false;st3=false;st2=false;st1= false;st0=true;
      activeBtn=false;
      milRed=0;milingame=0;
      lvUp=1;
      tCount=20;tNext=10;
      curHP=100;rSpd=2.5;
      //ingame=new Get_st3();
    }
  }
}
