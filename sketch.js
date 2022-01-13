var play = 1
var end = 0
var serve = 2

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostImg2;

var invisibleBlockGroup, invisibleBlock;
var gameState = serve
var score;
var startdoor;
var startclimber;
var startinvisibleBlock;
var topEdge;
var leftEdge;
var rightEdge;
       

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  ghostImg2 = loadAnimation("ghost-jumping.png ")
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);

  topEdge = createSprite(300,-100,600,10);
  leftEdge = createSprite(-5,300,10,600);
  rightEdge = createSprite(605,300,10,600);


  

  tower.addImage("tower",towerImg);
  tower.velocityY = 0;

  ghost = createSprite(200,425,50,50);
  ghost.addAnimation("ghost",ghostImg);
  ghost.addAnimation("ghost2",ghostImg2);
  ghost.scale = 0.3;
  // ghost.debug = true;
  ghost.setCollider("rectangle", -20,0,100,300)

  

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  score = 0;
  
  startdoor = createSprite(200,420);
  startdoor.addImage(doorImg);
  startdoor.depth = 1

  startclimber = createSprite(200,475);
  startclimber.addImage(climberImg);
  

  startinvisibleBlock = createSprite(200,480);
  startinvisibleBlock.width = startclimber.width;
  startinvisibleBlock.height = 2;
  //startinvisibleBlock.debug = true;  

  //startclimber.debug = true;

  doorsGroup.add(startdoor);
  climbersGroup.add(startclimber);
  invisibleBlockGroup.add(startinvisibleBlock);


  
}

function draw() {



  background(200);
  drawSprites();

  textSize(20);
  fill("white")
  text("Puntuación: "+ score, 400,50);



  if(tower.y > 600){
      tower.y = 400}

  if(gameState == serve){

    textSize(30);
    text("Presiona la barra espaciadora",110,200)
    text("para iniciar",220,240)
    
    if (keyDown ("space")){
      gameState = play
    }
    
  }

  if(gameState == play){

    startdoor.velocityY = 2
    startclimber.velocityY = 2
    startinvisibleBlock.velocityY = 2

    tower.velocityY = 2;

    if(keyDown("left_arrow")){
      ghost.x -= 3;
      ghost.mirrorX(1)
    }
  
    if(keyDown("right_arrow")){
      ghost.x += 3;
      ghost.mirrorX(-1)
    }
  
    if(keyDown("space")){
      ghost.velocityY -= 5;
      ghost.changeAnimation("ghost2",ghostImg2)
    }else{
      ghost.changeAnimation("ghost",ghostImg)
    }
  
    ghost.velocityY += 0.8;

    ghost.collide(climbersGroup);
    ghost.collide(topEdge);
    ghost.collide(rightEdge);
    ghost.collide(leftEdge);



    if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){ 
      ghost.destroy(); 
      gameState = end}
  

  spawnDoors();
  
  score = score + Math.round(getFrameRate()/60);}

  if(gameState == end){
    textSize(40);
    text("Game Over :(", 200,300)

    

    tower.velocityY = 0

    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
    invisibleBlockGroup.setVelocityYEach(0);
    
    

    }

    
    

    
}

function spawnDoors(){
  //escribe el codigo para aparecer las puertas de la torre
  if(frameCount % 240 == 0){

    door = createSprite(200,-50);
    door.addImage(doorImg);

    climber = createSprite(200,10);
    climber.addImage(climberImg);
    

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //invisibleBlock.debug = true;  

    door.x = Math.round(random(120,400));
    door.velocityY = 2;

    climber.x = door.x;
    climber.velocityY = 2; 

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleBlock.y += 10;

    ghost.depth = door.depth && climber.depth;
    ghost.depth += 1;

    door.lifetime = 700;
    climber.lifetime = 700;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);



    //climber.debug = true; 
    
  }
}