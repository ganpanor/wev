var wc; //capture
var font;
var wherep5;

var img = [];
var sound = [];

// default timer
var milDf;

// INTRO //
var st0;
var intro;

// Step 1 - setting //
var st1 = false;
var sett;
var milSet;
var pgBar

/*setTimer*/
var sCount; var sTime = 4;

// Step 2 - guide //
var st2 = false;
var guide;
var milRed;
var back;
var newBack;

// Step 3 - ingame //
var st3 = false;
var ingame;
var milingame;
/*lvTimer*/
var time; var tCount; var tNext = 10;
/*level*/
var level=1; var lvUp = 1;

var randomX = 0; var randomX2 = 0; var randomY = 0;

// Step 4 = result //
var st4 = false;
//var result;
/*score*/ var score=0;var scoreGo = 0;
var playing = false;
function preload(){

  font = loadFont('data/font/SDSwaggerTTF.ttf');
  //load background
  newBack = loadImage("data/newBack.png");

  //load images
  for(var i=0;i<=17;i++){
    img[i] = loadImage("data/imgs/img"+i+".png");
  }

  //load sounds
  for(var s=0;s<=12;s++){
    sound[s] = loadSound("data/sounds/sound"+s+".mp3");
  }
}

function setup() {
  colorMode(RGB, 255);
  frameRate(20);
  wherep5 = createCanvas(320,240);
  wherep5.parent("#canvasIn");
  var constraints = {
    video: {
      mandatory: {
        maxWidth: 320,
        maxHeight: 240
      },
      optional: [
        { maxFrameRate: 10 }
      ]
    },
    audio: false
  };
  wc = createCapture(constraints);
  wc.hide();
  textFont(font);
  textSize(24);
  imageMode(CENTER);
  intro = new Get_st0();
  sett = new Get_st1();
  guide = new Get_st2();
  ingame = new Get_st3();
  //result = new Get_st4();
  st0 = true;
  smooth();

}

function draw() {

  if(st0){
    intro.place();
  }

  if(st0 === false){
    wc.loadPixels(); //cam

  if(st2){
    /*pixel difference value*/
    var moving = 70;
    println(wc.width);
    newBack.loadPixels(); //background

    for(var x = 0; x < wc.width; x++){
      for(var y = 0; y < wc.height; y++) {
        var i = (x + y * wc.width)*4;
        //var j = ((wc.width-1-x) + y * wc.width)*4; //좌우 반전 되기 때문에 거꾸로 불러와야함

          var frontR = wc.pixels[i];var frontG = wc.pixels[i+1];var frontB = wc.pixels[i+2];
          var backR = back.pixels[i];var backG = back.pixels[i+1];var backB = back.pixels[i+2];
          var newBackR = newBack.pixels[i];var newBackG = newBack.pixels[i+1];var newBackB = newBack.pixels[i+2];
          var dR = abs(frontR-backR);var dG = abs(frontG-backG);var dB = abs(frontB-backB);

          // 몸 배경 영역 분리
          if(dR < moving && dG < moving && dB < moving){
            wc.pixels[i] = newBackR;wc.pixels[i+1] = newBackG;wc.pixels[i+2] = newBackB;
            } else  {
            wc.pixels[i] = frontR;wc.pixels[i+1] = frontG;wc.pixels[i+2] = frontB;
            randomX = width-1-x;randomY = y;}
      } //var y
    } //var x
  }// end guide

  if(playing === true){ //if st4==true -> Don't have to call cam
    wc.updatePixels();
    scale(-1,1);
    image(wc,-width/2,height/2);
    scale(-1,1);
  }

  // STEP 1 - sett(capture) //
  if(st1){
    sett.place();
    milSet = millis()-milDf; //timer reset
    sCount = sTime-(milSet/1000);
    pgBar = map(int(sCount),12,4,0,100);
  }

  // STEP 2 - guide //
  if(st2 && st3 === false){
    guide.place();
    milRed = millis();

    // guideline in //
    if(randomX>100 && randomX <110){
      st3 = true;
      sound[1].stop();
      sound[2].play();
    }
  }

  // STEP 3 - ingame //
  if(st3){
    //timer
    fill(255);
    milingame = millis()-milRed; // timer reset
    tCount = tNext-int(milingame/1000);
    time = nf(tCount , 2);
    level = nf(lvUp,1);

    // 레벨업
    if(tCount === 0){
    sound[6].play();
    tNext+=20;
    lvUp+=1;}

    /*현황텍스트*/ingame.state();
    /*체력바*/ingame.hpBar();
    /*공격*/ ingame.attack();

  } // end st3

   // STEP4 - result //
   if(st4){
      st1= false;st2 = false;st3 = false;playing = false;
      milRed = 0;milingame = 0;
      lvUp = 1;
   } //end st4

  // reset //
      if(st4 ===false && key=='r' || key=='R'){
        sound[11].loop();
      }
  if(key=='r' || key=='R'){
      st0 = true;st1= false;st2 = false;st3 = false;st4 = false;playing = false;
      milRed = 0;milingame = 0;
      lvUp = 1;
      spd1 = 2;spd2 = 8;
      tCount = 20;tNext = 10;
      ingame = new Get_st3();
    }


  } //END CONTENTS
} //END DRAW


function keyPressed() {
  if(st0 && key == ' '){
  st0 = false;
  sound[11].stop();
  sound[12].play();
  noTint();
  st1 = true;
  playing = true;
  milDf = millis();
  sound[0].play();
  }
  if(key == " "){
    wt = 150;
  }
}
