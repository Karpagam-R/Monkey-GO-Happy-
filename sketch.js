var bg,bg_image;
var monkey, monkey_image;
var ground;
var bananasGroup, banana_image;
var obstaclesGroup, obstacle_image;
var gameOver;
var score;

function preload(){
  
  bg_image=loadImage("jungle.jpg");
  
  monkey_image = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  banana_image = loadImage("Banana.png");
  
  obstacle_image = loadImage("stone.png"); 

}

function setup() {
  createCanvas(800,400);
  
  bg=createSprite(400,0,800,400);
  bg.addImage("bg1",bg_image);
  bg.scale=1.5;
  bg.x=bg.width/2;
  bg.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("runningMonkey",monkey_image);
  monkey.scale = 0.07;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(bg.x<100){
    bg.x=bg.width/2;
  }
  
  if(keyDown("space")) {
      monkey.velocityY = -12;
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  
  if(bananasGroup.isTouching(monkey)){
    bananasGroup.destroyEach();
    score = score + 2;
  }
  
  switch(score){
    case 10: monkey.scale=0.12;
             break;
    case 20: monkey.scale=0.14;
             break;
    case 30: monkey.scale=0.16;
             break;
    case 40: monkey.scale=0.18;
             break;  
    default: break;
    }
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.07;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage("banana",banana_image);
    banana.scale = 0.05;
    
    banana.velocityX = -5;
    
    banana.lifetime = 165;
    
    monkey.depth = banana.depth + 1;
    
    bananasGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("obstacle",obstacle_image);
    obstacle.scale = 0.2;
    
    obstacle.lifetime = 140;
    
    obstaclesGroup.add(obstacle);
  }
}


  
