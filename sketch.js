var dog,happyDog,Dog,foodStock,foodS,feedButton,addFood,feedTime,lastFeed;
var database;


function preload(){
  Dog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {

  database = firebase.database();

  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(Dog);
  dog.scale=0.15;

  feedTime = database.ref('fedTime');
  feedTime.on("value",(data) => {
    lastFeed = data.val();
  });

  addFood = createButton("Add Milk Bottle");
  addFood.position(500, 190);
  addFood.mousePressed(plusFood);

  feedButton = createButton("Feed Dog");
  feedButton.position(620,190);
  feedButton.mousePressed(feedDog);

  food = new Food();

}

function draw() {
  background(46,139,87);
 
  food.getFoodStock();

  if(lastFeed){
    fill("255");
    textSize(20);
    if(lastFeed > 12){
      text("Last Feed time: " + lastFeed%12 + " PM",300,40);
    }else if(lastFeed<=12){
      text("Last Feed time" + lastFeed + " AM",300,40);
    }else{
      text("Last Feed time" + lastFeed,300,40)
    }
  }

  food.display();

  drawSprites();
  fill("blue");
text(mouseX + " " + mouseY,mouseX,mouseY);
}

//function to read food Stock


//function to update food stock and last fed time
 function feedDog(){
   dog.addImage(happyDog);
   

   if(foodStock){
     food.updateFoodStock(1);
   }

   lastFeed = hour();

   database.ref().update({FeedTime:lastFeed});

 }

//function to add food in stock
function plusFood(){
  foodStock++;
  database.ref().update({Food: foodStock});
}