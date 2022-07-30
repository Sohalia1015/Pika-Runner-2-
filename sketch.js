
var cloud, cloudImg 
var grass, grassImg

var gloom
var oddish
var vileplume

var gloomImg
var oddishImg
var vileplumeImg

var pikachu, pika_running, pika_collided

var gameOver, gameOverImg
var restart, restartImg

var invisibleGround

const PLAY = 1 
const END = 0
var gameState = PLAY


function preload(){
cloudImg = loadImage("cloud.png")
grassImg = loadImage("grass.png.png")

gloomImg = loadAnimation("gloom1.png", "gloom2.png")
oddishImg = loadAnimation("oddish1.png", "oddish2.png")
vileplumeImg = loadAnimation("vileplume1.png", "vileplume2.png")

pika_running = loadAnimation("pikachu1.png", "pikachu2.png")
pika_collided = loadAnimation("pikaPoisoned1.png", "pikaPoisoned2.png")

gameOverImg = loadImage("game_over_PNG58.png")
restartImg = loadImage("restart.png")

}

function setup() {
 createCanvas(1200, 300)
 
 pikachu = createSprite(50,160,20,50)
 pikachu.addAnimation("Pikachu", pika_running)
 pikachu.addAnimation("collided",pika_collided)
 pikachu.scale = 0.1
 
 grass = createSprite(200,150,400,20);
   grass.addImage(grassImg);
   grass.x = grass.width /2;
   grass.velocityX = -4;
 
   restart = createSprite(300, 125)
   restart.addImage(restartImg)
   restart.scale = 0.5
 
   gameOver = createSprite(300, 100)
   gameOver.addImage(gameOverImg)
   gameOver.scale = 0.1
   
   invisibleGround = createSprite(200,240,400,10);
   invisibleGround.visible = false;

  
   
   console.log("Hello"+ 5);

   obstaclesGroup = new Group()

   pikachu.setCollider("circle",0,0,25)
   pikachu.debug = false
 
 }

function draw() {
 background("aquamarine")
 pikachu.collide(invisibleGround)

 if(gameState === PLAY){
    if(keyDown("space")&& pikachu.y >= 130) {
        pikachu.velocityY = -10;
      }
  
      pikachu.velocityY = pikachu.velocityY + 0.8
      if (grass.x < 450){
        grass.x = width/2;
      }

      gameOver.visible = false
      restart.visible = false

      spawnObstacles()

      
  if(pikachu.isTouching(obstaclesGroup)){
      gameState = END
  }
  
 }

 if(gameState === END){
  grass.velocityX = 0
  gameOver.visible = true
  pikachu.changeAnimation("collided", pika_collided)

  obstaclesGroup.setVelocityXEach(0)
 }


 drawSprites()
}
 
function spawnObstacles() {
  if (frameCount % 45 === 0){
    vileplume = createSprite(1200, 220 , 20, 20)
    vileplume.velocityX = -10
    gloom = createSprite(1200, 220, 20, 20)
    gloom.velocityX = -10
    oddish = createSprite(1200, 220, 20, 20)
    oddish.velocityX = -10
    rand = Math.round(random(1, 3))
    switch(rand){
     case 1: oddish.addAnimation("Img1", oddishImg)
     break;
    case 2: vileplume.addAnimation("Img2", vileplumeImg)
     break;
     case 3: gloom.addAnimation("Img3", gloomImg)
    break;
     default: break
    }
    vileplume.scale = 0.1
    oddish.scale = 0.1
    gloom.scale = 0.1
  
    obstaclesGroup.add(vileplume)
    obstaclesGroup.add(gloom)
    obstaclesGroup.add(oddish)

    vileplume.lifetime = 1000
    gloom.lifetime = 1000
    oddish.lifetime = 1000
  
  }
  }
  