//set width and height variables for game
var width = 480;
var height = 320;
//create game object and initialize the canvas
var game = new Phaser.Game(width, height, Phaser.AUTO, null, {preload: preload, create: create, update: update});

//initialize some variables
var player;
var food;
var cursors;
var speed = 175;
var score = 0;
var scoreText;

function preload() {
	//set background color of canvas
	game.stage.backgroundColor = '#eee';

	//load assets
	game.load.image('player', 'asset/blue-square.png');
	game.load.image('food', 'asset/red-square.png');
}
function create() {
	//start arcade physics engine
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//initialize keyboard arrows for the game controls
	cursors = game.input.keyboard.createCursorKeys();

	//add player sprite
	player = game.add.sprite(width*0.5, height*0.5, 'player');
	//set anchor point to center of the sprite
	player.anchor.set(0.5);
	//enable physics for the player body
	game.physics.enable(player, Phaser.Physics.ARCADE);
	//make the player collide with the bounds of the world
	player.body.collideWorldBounds = true;

	//create a group called food and add 4 food pieces to the game
	food = game.add.group();
	food.create(width*0.1, height*0.1, 'food');
	food.create(width*0.9, height*0.1, 'food');
	food.create(width*0.1, height*0.9, 'food');
	food.create(width*0.9, height*0.9, 'food');
	food.create(width*0.3, height*0.8, 'food');
	food.create(width*0.7, height*0.2, 'food');

	//set the anchors of their sprites to the center
	for (var i in food.children) {
		food.children[i].anchor.set(0.5);
	}
	//enable physics for the food
	game.physics.enable(food, Phaser.Physics.ARCADE);

	//place score text on the screen
	scoreText = game.add.text(5, 3, score);
}
function update() {

	//move the player up and down based on keyboard arrows
	if (cursors.up.isDown) {
		player.body.velocity.y = -speed;
	}
	else if (cursors.down.isDown) {
		player.body.velocity.y = speed;
	}
	else {
		player.body.velocity.y = 0;
	}

	//move the player right and left based on keyboard arrows
	if (cursors.left.isDown) {
		player.body.velocity.x = -speed;
	}
	else if (cursors.right.isDown) {
		player.body.velocity.x = speed;
	}
	else {
		player.body.velocity.x = 0;
	}
	// let makeFood = Math.random()*100
	// 	if(makeFood>99){

	// 		//food.add()
	// }
		
	//game.physics.enable(food, Phaser.Physics.ARCADE);
	

	//call eatFood function when the player and a piece of food overlap
	game.physics.arcade.overlap(player, food, eatFood);
}

//eatFood function
function eatFood(player, food) {
	//remove the piece of food
	food.kill();
	//update the score
	score++;
	scoreText.text = score;

	
}

// var game;
 
// // size of each tile, in pixels
// var gridSize = 40;
 
// // colors to be used in game
// var colorsInGame = [0xff0000, 0xff8800, 0x00ff00, 0x0000ff, 0xff00ff, 0x555555];
 
// // how many circles in game?
// var circlesInGame = 3;
 
// // creation of the game
// window.onload = function() {	
// 	game = new Phaser.Game(320, 480);
//      game.state.add("PlayGame", playGame);
//      game.state.start("PlayGame");
// }
 
 
// var playGame = function(game){}
 
// playGame.prototype = {
//      preload: function(){
          
//           // preloading the assets
//           game.load.spritesheet("circles", "circles.png", gridSize, gridSize);
//           game.load.image("background", "background.png");          
//      },
//      create: function(){
          
//           // set background color to white                                                                                     
//           game.stage.backgroundColor = "#ffffff";
          
//           // adding a group containing all circles
//           this.circleGroup = game.add.group();
          
//           // possibleColors will contain the same items as colorsInGame array,
//           // just repeated (circlesInGame - 1) times.
//           // we want to have more circles with the same color, but not ALL circle with the same color
//            this.possibleColors = [];
//           for(var i = 0; i < colorsInGame.length; i++){
//                for(var j = 0; j < circlesInGame - 1; j++){
//                     this.possibleColors.push(colorsInGame[i])     
//                } 
//           }
          
//           // boardWidth and boardHeight will determine the width and height of the game board,
//           // according to game size and grid size.
//           // we subtract 2 from both boardWidth and boardHeight because we don't want
//           // tiles to be at the very edge of the canvas
//           var boardWidth = game.width / gridSize - 2;
//           var boardHeight = game.height / gridSize - 2;
          
//           // creation of an array with all possible grid positions
//           this.positionsArray = [];
//           for(var i = 0; i < (boardWidth) * (boardHeight); i++){
//                this.positionsArray.push(i);     
//           }
          
//           // pickedColors is the array which will contain all colors actually used in this game
//           this.pickedColors = [];
          
//           // repeating this loop circlesInGame times
//           for(var i = 0; i < circlesInGame; i++){
               
//                // choosing a random position for the circle.
//                // this position won't be available anymore as we remove it from positionsArray 
//                var randomPosition = Phaser.ArrayUtils.removeRandomItem(this.positionsArray);              
               
//                // determining circle x and y position in pixels
//                var posX = (1 + randomPosition % (boardWidth)) * gridSize;
//                var posY = (1 + Math.floor(randomPosition / boardWidth)) * gridSize;
               
//                // creating the circle as a button which calls circleSelected function
//                var circle = game.add.button(posX, posY, "circles", this.circleSelected, this);
               
//                // adding the circle to circleGroup group 
//                this.circleGroup.add(circle);
               
//                // tinting the circle with a possible color and removing the color
//                // from the array of possible colors.
//                // we also save its tint color in a property called tintColor
//                circle.tintColor = Phaser.ArrayUtils.removeRandomItem(this.possibleColors)
//                circle.tint = circle.tintColor;
               
//                // adding the tint color to pickedColors array, if not already in the array
//                if(this.pickedColors.indexOf(circle.tint) == -1){
//                     this.pickedColors.push(circle.tint);     
//                }
               
//                // choosima a random direction: 1 = left, 2 = up, 3 = right, 4 = down
//                var randomDirection = game.rnd.integerInRange(1, 4);
               
//                // a temporary object which will be used to handle circle tween
//                var tweenObject = {};
               
//                // according to random direction...
//                switch(randomDirection){
//                     case 1:
//                          // left: circle is placed just outside left border and the tween
//                          // will bring it to its initial x position
//                          circle.x = - gridSize;
//                          tweenObject.x = posX;
//                          break;
//                     case 2:
//                          // up: circle is placed just outside upper border and the tween
//                          // will bring it to its initial y position
//                          circle.y = - gridSize;
//                          tweenObject.y = posY;
//                          break;
//                     case 3:
//                          // left: circle is placed just outside right border and the tween
//                          // will bring it to its initial x position
//                          circle.x = game.width + gridSize;
//                          tweenObject.x = posX;
//                          break;
//                     case 4:
//                          // left: circle is placed just outside bottom border and the tween
//                          // will bring it to its initial y position
//                          circle.y = game.height + gridSize;
//                          tweenObject.y = posY;
//                          break;
//                }
               
//                // adding the tween to circle. This will create the "enter in the stage" effect
//                game.add.tween(circle).to(tweenObject, 500, Phaser.Easing.Cubic.Out, true);     
//           }
          
//           // after two seconds, let's cover the screen
//           game.time.events.add(Phaser.Timer.SECOND * 2, this.fadeOut, this);
          
            
//      },
     
//      // this function will cover the screen with a random color
//      fadeOut: function(){
     
//           // filling the entire canvas with a tile sprite
//           this.cover = game.add.tileSprite(0, 0, game.width, game.height, "background");
          
//           // giving the cover a tint color picked among circle colors 
//           this.cover.tint = Phaser.ArrayUtils.getRandomItem(this.pickedColors);
          
//           // setting the cover to transparent
//           this.cover.alpha = 0;
          
//           // tweening the cover to fully opaque
//           var coverTween = game.add.tween(this.cover).to({
//                alpha: 1
//           }, 200, Phaser.Easing.Linear.None, true);   
          
//           // once the cover is fully opaque...
//           coverTween.onComplete.add(function(){
          
//                // bring to top circleGroup as it was hidden by the cover
//                game.world.bringToTop(this.circleGroup);
               
//                // for each circle in circleGroup group...
//                this.circleGroup.forEach(function(item){
               
//                     // tinting it white
//                     item.tint = 0xffffff;
                    
//                     // setting it to frame 1 to show just a white ring
//                     item.frame = 1;
//                })
//           }, this)       
//      },
     
//      // this function will be called each time a circle is touched
//      // b is the circle
//      circleSelected: function(b){
     
//           // if the screen is already fully covered...
//           if(this.cover != undefined && this.cover.alpha == 1){
               
//                // if the circle has the same tint color of the cover...
//                // (we use tintColor property we previously saved, because circle tint color now is white)
//                if(b.tintColor == this.cover.tint){
//                     // then destrot it
//                     b.destroy();
//                }
//                else{
//                     // if not, show the actual color of the circle
//                     b.tint = b.tintColor
//                     b.frame = 0;
//                }
//           }
//      }
// }