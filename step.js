function Get_st0(){
  this.o1=0;
  this.o2=0;
  sound[11].loop();
  this.place=function(){

    image(img[0],width/2,height/2);
    tint(255,this.o1);
    image(img[1],width/2,height/2,200,91);
    tint(255,this.o2);
    fill(255,255,255,180);
    stroke(0,29,156,50);
    strokeWeight(0.5);
    textSize(14);
    text("계속하려면_스페이스_바를_누르세요.",width/2,height*0.75);
    noStroke();
    this.o1=this.o1 + 25;
    this.o2=this.o2 + 15;
    if(this.o1>=255){
      this.o1=255;}
    if(this.o2>=255){
      this.o2=0;
    }
  }
}

function BtnWrapper(_x,_y,_w,_h,_t,_s){
  this.x=_x;
  this.y=_y;
  this.w=_w;
  this.h=_h;
  this.t=_t;
  this.s=_s;
  rectMode(CENTER);
  fill(255,100);
  if(resX>this.x-this.w/2&&resX<this.x+this.w/2&&resY>this.y-this.h/2&&resY<this.y+this.h/2){
    this.a=255;
    rect(this.x,this.y,this.w-5,this.h,this.h/2);
    activeBtn=true;
  } else {
    activeBtn=false;
  }
  image(img[4],this.x,this.y,this.w+15,this.h+15);
  noStroke();
  fill(255);
  textSize(_s);
  text(this.t,this.x,this.y+this.h/2-8);
}

function Get_st1(){
    this.place=function(){
      st0=false;
      if(sCount>3){
        fill(255);
        image(img[0],width/2,height/2);
        textSize(14);

        text("차원_이동이_시작됩니다.",width/2,height/2-15);
        text("잠시_화면_밖으로_나가주십시오.",width/2,height/2+5);
        textSize(30);text("<-",width/2-goutX,height/2);text("->",width/2+goutX,height/2);
        BtnWrapper(width/2,height*0.75,60,23,"지금_이동하기",11);
        }
      textSize(17);
      if(sCount<3&&sCount>0.1){fill(255,0,0);rect(width/2,height/2+24,170,21);fill(255);text("즉시_화면_밖으로_나가주십시오!",width/2,height/2+30)}
      textSize(30);fill(255);
      if(sCount<3&&sCount>2){text("3",width/2,height/2);} else
      if(sCount<2&&sCount>1){text("2",width/2,height/2);} else
      if(sCount<1&&sCount>0.1){text("1",width/2,height/2);}
      if(sCount<3&&sCount>2.95){sound[3].play();sound[0].stop();} else
      if(sCount<2&&sCount>1.95){sound[4].play();} else
      if(sCount>1&&sCount<1.05){sound[5].play();back=wc.get();}
      if(sCount>0&&sCount<0.05){sound[1].play();back.loadPixels();st2=true;}
    }
}

function Get_st2(){
  this.place=function(){
    st1=false;
    stroke(255);
    strokeWeight(2);
    line(width*0.3,0,width*0.3,height);
    line(width*0.7,0,width*0.7,height);
    noStroke();
    fill(255,0,0,150);
    rectMode(CORNER);
    rect(0,0,width*0.3,height);
    rect(width*0.7,0,width,height);
    fill(255);
    textSize(14);
    text("선_안쪽으로_들어오십시오.",width/2,height/2);
    BtnWrapper(width/2,height*0.75,60,23,"화면_재설정",11);

    // guideline in //
    if(randomX>width*0.3&&randomX<width*0.35){
      st3=true;
      sound[1].stop();
      sound[2].play();
    }
  }
}

function Get_st3(){
  rectMode(CORNER);
  rect(0,0,width,height);
  this.outRed=100;
  this.dmgRed=0;
  this.damage=function(){
    wcW=random(310,330);
    wcH=random(230,250);
    wcWs=330;
    wcHs=250;
    this.hpRed=map(curHP,100,0,0,200);if(curHP<=0){this.hpRed=0;}
    tint(255,this.hpRed);
    image(img[5],width/2,height/2);
    noTint();
    this.dmgRed-=15;if(this.dmgRed<=0){this.dmgRed=0;wcW=320;wcH=240;wcWs=320;wcHs=240;}
    fill(255,0,0,this.dmgRed);
    rectMode(CORNER);
    rect(0,0,width,height);
  }
  this.state=function(){
    noFill();
    stroke(255);strokeWeight(3);
    arc(25,25,28,28,radians(tRemain),radians(270));
    fill(255);noStroke();
    textSize(7);
    text("level",25,21);
    textSize(14);
    text(lvUp,25,33);
  }


  /*Atk area*/
  // inner Atk - getting faster
  this.r=0;rSpd=1;
  if(lvUp>=7){rSpd=rSpd;} // after lv7,static
  //outer Atk - static value
  this.r2=0;this.r2Spd=10;
  // Atk size
  this.rRad=random(41,55);

  //start function
  this.attack=function(){
    /*inner Atk*/ image(img[2],this.x,this.y,this.r,this.r);this.r=this.r + rSpd;
    /*outer atk*/ if(this.r>30){this.r2=this.r2+this.r2Spd;image(img[3],this.x,this.y,this.r2,this.r2);}
    //next atk
    if(this.r2>this.rRad){
      this.r=0;
      this.r2=0;
      this.x=random(randomX,randomX+105);
      this.y=random(randomY-120,randomY);
      sound[10].play();
     }

    // Atked

      //boundary out
      if(randomX===0||randomX>width-5){
        /*hp reduce*/curHP-=2;
        //red screen
        this.outRed-=1;if(this.outRed<10){this.outRed=100;}
        fill(255,0,0,this.outRed);
        rectMode(CORNER);
        rect(0,0,width,height);
        fill(255);textSize(20);text("화면_안쪽으로_들어오십시오",width/2,height/2);
        noFill();
      }
      if(this.r>=34){this.r=34}
      if(this.r>=34&&this.x+this.r2>=randomX+33&&this.x-this.r2<=randomX+62&&this.y+this.r2>=randomY-85&&this.y-this.r2<=randomY+20){
        curHP-=5+(lvUp*0.5);
        this.dmgRed=130;sound[9].play();
      }
    //ingame hp0
    if(curHP<=0){
    var grade=0;this.r=0;this.x=0;this.y=0;
    this.dmgRed=0;this.outRed=0;
    st4=true;
    fill(255);
    textSize(14);

    sound[11].loop();
    sound[7].play();
   } // end hp0
  } // end attack
}

function Get_st4(){
  this.screenshot=function(){
    scoreGo=milingame;
    score=nf(scoreGo*0.037,1,0);
    text("점수:"+score,width/2,height*0.7);
    var saveY=year();var saveMo=month();var saveD=day();var saveH=hour();var saveMi=minute();var saveS=second();
    save("wev"+saveY+saveMo+saveD+"_"+saveH+saveMi+saveS+".jpg");
  }
  this.score=function(){
    if(lvUp>=1 && lvUp<=2){this.grade="수고하셨습니다."} else
    if(lvUp==3){this.grade="오~운동좀_하셨나봐요?"}
    if(lvUp==4){this.grade="이정도만_해도_잘한겁니다~"} else
    if(lvUp==5){this.grade="대단합니다._복싱에_재능이_있으시네요!"} else
    if(lvUp==6){this.grade="놀랍습니다!_혹시_복싱선수세요?"} else
    if(lvUp>=7){this.grade="당신은_위빙의_달인_위브마스터!!"} else
    fill(0,50);
    rect(width/2,height/2,width,height);
    BtnWrapper(width/2,height*0.75,50,23,"재도전",12);
    fill(255);
    textAlign(CORNER);textSize(18);
    text("최종난이도:"+lvUp,width/2-77,height*0.35);
    text("점수:"+score,width/2,height*0.35);
    textAlign(CENTER);textSize(30);
    text("훈련이_종료되었습니다.",width/2-10,height/2);
    textSize(16);
    text(this.grade,width/2,height*0.6);

  }
}
