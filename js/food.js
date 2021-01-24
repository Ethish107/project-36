class Food
{
  constructor(){
    this.foodS = database.ref('Food');
    this.image = loadImage("images/Milk.png");
  }
  getFoodStock(){
    this.foodS.on("value",(data) => {
      foodStock = data.val();
      push()
      fill(255);
      textSize(20);
      text("Food left : " + foodStock + " Milk Bottles",300,85);
    });
    pop()
  }

  updateFoodStock(changeVal){
    database.ref().update({Food:foodStock - changeVal});
  }

  detectFood(){
   if(foodStock!= 0){
    foodStock--;
   }
  }
  
  display(){
    var x = 40,y = 120;
    if(foodStock!= 0){
      for(var i = 0;i < foodStock; i++){

        if(i%15 === 0){
          y+= 50;
          x = 40;
        }

        image(this.image,x,y,50,50);
        x+=30;
      }
    }
  }

}