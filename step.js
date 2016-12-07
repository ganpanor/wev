function Get_st0(){
  this.o1 = 0;
  this.o2 = 0;
  sound[11].loop();
  this.place = function(){
    image(img[0],width/2,height/2);
    tint(255,this.o1);
    image(img[1],width/2,height/2,200,91);
    tint(255,this.o2);
    fill(255,255,255,180);
    stroke(0,29,156,50);
    strokeWeight(0.5);
    textAlign(CENTER);
    textSize(14);
    text("계속하려면 스페이스_바를_누르세요.",width/2,height*0.75);
    noStroke();
    this.o1= this.o1 + 25;
    this.o2 = this.o2 + 15;
    if(this.o1>=255){
      this.o1 = 255;}
    if(this.o2>=255){
      this.o2 = 0;
    }
  }
}


function Get_st1(){
    st0 = false;

    this.place = function(){

    if(sCount>4){
      fill(255);
      image(img[0],width/2,height/2);
      text("차원_이동이_시작됩니다.",width/2,height/2-10);
      text("잠시_화면_밖으로_나와주십시오.",width/2,height/2+10);
      stroke(255);
      strokeWeight(1);
      noFill();
      rect(width/2-50,height/1.5,100,20);
      fill(255);
      rect(width/2-50,height/1.5,pgBar,20);
      noStroke();
      }
    if(sCount<4 && sCount>3.95){sound[3].play();
                  sound[0].stop();} else
    if(sCount<3 && sCount>2.95){sound[4].play();} else
    if(sCount<2 && sCount>1.95){sound[5].play();} else
    if(sCount>1 && sCount<1.05){
      //save("data/back.jpeg");
      back = wc.get();
      //back.resize(640,480);
      //back = loadImage(ddf);
      sound[1].play();//배경 캡쳐
    }
    if(int(sCount)===0){
      back.loadPixels();

      st2 = true;
    }
  }
}

function Get_st2(){
  st1 = false;
  this.place = function(){
  stroke(255);
  strokeWeight(1);
  line(width*0.3,0,width*0.3,height);
  line(width*0.7,0,width*0.7,height);
  noStroke();
  fill(255);
  text("선_안쪽으로_들어오십시오.",width/2,height/2);
  text("돌아가기",width/2-12,height*0.8);
  Rbox(width/2+14,height*0.8);
  }
}

function Get_st3(){
  this.hp = 100;

  this.hpBar = function(){
    // HP bar
    noFill(); stroke(255); strokeWeight(1.5);  // hp stroke
    rect(randomX+23,randomY-52,60,14);
    this.hp+=0.1; // hp recover
    if(this.hp>=100){this.hp=100;} // max hp
    fill(255);noStroke();
    rect(randomX+25,randomY-50,map(this.hp,100,0,54,0),10); // current hp
  }

  this.state = function(){
    text("level"+level,width/2,height*0.1);
    text(time,width/2,height*0.1+20);
  }


  /*Atk area*/
  // inner Atk
  this.r = 0;
  this.rSpd = 1+lvUp*0.4;
  //outer Atk
  this.r2 = 0;
  this.r2Spd = this.rSpd*4;
  this.rRad = random(30,50);
  if(lvUp>=7){
    this.rSpd = this.rSpd;
    this.r2Spd = this.r2Spd;
  }
  this.attack = function(){
    // inner Atk
    image(img[8],this.x,this.y,this.r,this.r);
    this.r = this.r + this.rSpd;

    //outer atk
    if(this.r>10){
      this.r2 = this.r2+this.r2Spd;
      image(img[9],this.x,this.y,this.r2,this.r2);
      }
      //filter(BLUR,0);
    //next atk
    if(this.r2>this.rRad){
      this.r = 0;
      this.r2 = 0;
      this.x = random(randomX,randomX+105);
      this.y = random(randomY-120,randomY);
     }

    // stroke(255,0,0);
    // line(randomX+30,0,randomX+30,height);
    // line(0,randomY-90,width,randomY-90);
    // line(randomX+65,0,randomX+65,height);
    // line(0,randomY+20,width,randomY+20);
    // noStroke();

    // Atked
      if(randomX === 0 || randomX > width-5){
        this.hp-= 1;
        this.o= 200-this.hp*2;
        if(this.o<50){
          this.o=this.o;
        }
        fill(255,0,0,this.o);
        rect(0,0,width,height);
        fill(255);
        text("화면_안쪽으로_들어오십시오",width/2,height/2);
        noFill();
      }

      if(this.r2>this.rRad*0.8 && this.x+this.r2>=randomX+33 && this.x-this.r2<=randomX+62 && this.y+this.r2>=randomY-85 && this.y-this.r2<=randomY+20){
        this.hp-=10+lvUp*(lvUp*0.5);

        sound[8].play();
      }

    //ingame hp0
    if(this.hp <= 0){
    var grade = 0;
    st4 = true;
    scoreGo = milingame; //게임 시작 이후 시간에 따라 점수가 나옴
    score=nf(scoreGo*0.037,1,0);
    fill(255);
    text("score:"+score,width/2,height*0.8);

    //레벨에 따른 등급 부여 *********랭킹 시스템에서 변경 고려
    if(lvUp == 2){grade = "2";} else
    if(lvUp == 3){grade = "3"} else
    if(lvUp == 4){grade = "4";} else
    if(lvUp == 5){grade = "5";} else
    if(lvUp == 6){grade = "6";} else
    if(lvUp >= 7){grade = "7";}
    text("등급:"+grade,width/2,height*0.3);

    ///*result*/
    var saveY = year();
    var saveMo = month();
    var saveD = day();
    var saveH = hour();
    var saveMi = minute();
    var saveS = second();

    //save("data/result/"+saveY+"dd.jpg"); // ********* 이미지 저장 안되는 문제 있음
    save("data/result/"+saveY+saveMo+saveD+"_"+saveH+saveMi+saveS+".jpg");
    text("재도전",width*0.9-10,height*0.1);
    Rbox(width*0.9+12,height*0.1);

    sound[11].loop();
    sound[7].play();
   } // end hp0

  } // end attack
}

function Rbox(_x,_y){
  this.x = _x;
  this.y = _y;
  rectMode(CENTER);
  fill(255);
  rect(this.x,this.y-5,12,12,3)
  rectMode(CORNER);
  fill(0);
  textSize(10);
  text("R",this.x,this.y-2);
  textSize(14);
}
