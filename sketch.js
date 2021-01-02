var trex, trexRun;
var ground, groundAni;
var  play=1,end=0;
var gameState = play;
var inGround;
var cloudAni;
var cg,og;
var trexC,restart,restartImage,gameover,gameoverImage;
var score=0;
var jump,die,checkpoint;

function preload()
{
  trexRun = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trexC = loadAnimation("trex_collided.png");
  
  groundAni = loadImage("ground2.png");
  
  cloudAni = loadImage ("cloud.png");
  
  restartImage = loadImage("restart.png");
  
  gameoverImage = loadImage("gameOver.png");
  
  jump = loadSound("jump.mp3");
  
  die = loadSound("die.mp3");
  
  checkpoint = loadSound("checkPoint.mp3");
  
   o1 = loadImage ("obstacle1.png");
   o2 = loadImage ("obstacle2.png");
   o3 = loadImage ("obstacle3.png");
   o4 = loadImage ("obstacle4.png");
   o5 = loadImage ("obstacle5.png");
   o6 = loadImage ("obstacle6.png");
}

function setup()
{
  createCanvas (600,250);
  trex = createSprite(40,230);
  trex.addAnimation("run",trexRun);
  trex.addAnimation("collide", trexC)
  trex.scale = 0.4;
  
  ground = createSprite(200,225);
  ground.addImage("ground", groundAni);
  ground.x = ground.width/2
  
  inGround = createSprite(200,230,600,5)
  inGround.visible = false;
  
  gameover = createSprite(width/2,50);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.7;
  restart = createSprite(width/2,80);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  
  cg = new Group();
  og = new Group();
}

function draw()
{
  background(200);
  
  if(gameState === play)
 {
     
  if(keyDown("space") && trex.y>=208)
   {
     trex.velocityY = -12;
     jump.play();
   }
  
   ground.velocityX = -(3+score*2/100);
   
   if(score%100 === 0 && score>0)
   {
      checkpoint.play();
   }
      
   trex.velocityY = trex.velocityY + 0.5;
   if(ground.x < 0 )
     {ground.x = ground.width/2}
   
   clouds();
   obstacles();
   
   score = Math.round(getFrameRate()/30)+score;
   
   if(trex.isTouching(og))
   {
     gameState = end;
     die.play();
   }
   
   gameover.visible = false;
   restart.visible = false;
  }
  
   else if(gameState === end)
  {
    ground.velocityX = 0;
    og.setVelocityXEach(0);
    cg.setVelocityXEach(0);
    og.setLifetimeEach(-1);
    cg.setLifetimeEach(-1);
    trex.changeAnimation("collide", trexC)
    
    gameover.visible = true;
   restart.visible = true;
  }
  
  textSize(20);
  text("Score: "+ score,width-100,50);
  
  
  if(mousePressedOver(restart))
  {
    reset();
  }
   trex.collide(inGround);
  
  drawSprites();
}

function clouds(){
  if(frameCount%60 === 0){
   var cloud = createSprite(600,random(100,200));
  cloud.addImage("cloud",cloudAni);
  cloud.velocityX = -3; 
  //console.log(cloud.depth);
  trex.depth=cloud.depth + 1;
  cloud.lifetime = 200;
  cg.add(cloud);
    
  }
  
 }


function obstacles()
  {

    if (frameCount%80 === 0) 
    {
      var obstacles = createSprite(600,215);
      var rn = Math.round(random(1,6));
      console.log(rn);
      obstacles.scale = 0.5;
      
      switch(rn){
          case 1 : obstacles.addImage(o1);
          break;
          case 2 : obstacles.addImage(o2);
          break;
          case 3 : obstacles.addImage(o3);
          break;
          case 4 : obstacles.addImage(o4);
          break;
          case 5 : obstacles.addImage(o5);
          break;
          case 6 : obstacles.addImage(o6);
          break;
      }
      
      
      obstacles.velocityX = -(3+score*2/100);
      obstacles.lifetime = 200;
      og.add(obstacles);
      //obstacles.score = -(3 + score*3/100);
    }
    
  }

 function reset()
{
  gameState = play;
  og.destroyEach();
  cg.destroyEach();
  trex.changeAnimation("run",trexRun);
  score = 0;
}






