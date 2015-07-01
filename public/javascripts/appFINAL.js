var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'myFirstPhaserGame', { preload: preload, create: create, update: update});

function preload(){
  game.load.image('background', 'images/background.png');
  game.load.spritesheet('froggy', 'images/frog.png', 216, 218);
  game.load.audio('ribbit', 'sounds/ribbit.mp3');
  game.load.image('water', 'images/water.png');
  game.load.image('rock', 'images/rock.png');
  game.load.image('line', 'images/blank_line.png');
  game.load.image('cloud', 'images/cloud.png');
  game.load.spritesheet('bird', 'images/bird1.png', 84, 80);
}

function create(){
  var background = game.add.image(-100, 0, 'background');
  background.scale.x = game.rnd.realInRange(1.87, 1.87);
  background.scale.y = game.rnd.realInRange(1.87, 1.87);

  cloud = game.add.sprite(335, -50, 'cloud');
  game.physics.arcade.enable(cloud);
  cloud.body.velocity.x = 5;

  rock = game.add.sprite(105, 560, 'rock');

  ledge = game.add.sprite(140, 595, 'line');
  game.physics.arcade.enable(ledge);
  ledge.body.immovable = true;


  //Added after our background so that the frog is not hidden by the background
  frog = game.add.sprite(175, 500, 'froggy')
  frog.scale.x = game.rnd.realInRange(.18, .18);
  frog.scale.y = game.rnd.realInRange(.18, .18);
  //Pass our frog into our game physics as an argument
  game.physics.arcade.enable(frog);
  //Give our frog downward (positive y-axis) gravity level of 1000
  frog.body.gravity.y = 1000;

  frog.animations.add('openClose', [0, 1], 2, true);
  frog.animations.play('openClose');


  var ribbit = game.add.audio('ribbit');
  //Calling javascript's .play() within our create method will make sounds play the moment that the game begins
  ribbit.play();

  water = game.add.image(-525, 625, 'water');

  //Add it
  birdie = game.add.sprite(750, -30, 'bird');
  //Resize it
  birdie.scale.x = game.rnd.realInRange(1.8, 1.8);
  birdie.scale.y = game.rnd.realInRange(1.8, 1.8);
  //Give it physics
  game.physics.arcade.enable(birdie);
  //Make it move
  birdie.body.velocity.x = -180;
  //Make it stay
  birdie.body.collideWorldBounds = true;
  //Make it bounce
  birdie.body.bounce.setTo(1, 1);

  //creating bird animations
  birdie.animations.add('left', [0, 1, 2, 1], 6, true);
  birdie.animations.add('right', [9, 10, 11, 10], 6, true);
  birdie.animations.add('down', [18, 19, 20, 19], 6, true);
  birdie.animations.add('left_down', [6, 7, 8, 7], 6, true);
  birdie.animations.add('right_down', [15, 16, 17, 16], 6, true);
  birdie.animations.add('up', [21, 22, 23, 22], 6, true);
  birdie.animations.add('left_up', [3, 4, 5, 4], 6, true);
  birdie.animations.add('right_up', [12, 13, 14, 13], 6, true);

  //initializing our directional keys on our keyboard
  cursors = game.input.keyboard.createCursorKeys();
}

function update(){
  game.physics.arcade.collide(frog, ledge);

  //matching animations with directions
  if (birdie.body.velocity.x >= 180 && birdie.body.velocity.y >= 180) {
        birdie.animations.play('right_down')
  } else if (birdie.body.velocity.x <= -180 && birdie.body.velocity.y >= 180) {
      birdie.animations.play('left_down')
  } else if (birdie.body.velocity.x >= 180 && birdie.body.velocity.y <= -180) {
      birdie.animations.play('right_up')
  } else if (birdie.body.velocity.x <= -180 && birdie.body.velocity.y <= -180) {
      birdie.animations.play('left_up')
  } else if (birdie.body.velocity.x >= 140) {
      birdie.animations.play('right')
  } else if (birdie.body.velocity.x <= -140) {
      birdie.animations.play('left')
  } else if (birdie.body.velocity.y > 0 && (birdie.body.velocity.x < 140 && birdie.body.velocity.x > -140)) {
      if (birdie.body.velocity.y < 600) {
          birdie.animations.play('down')
      } else {
          birdie.animations.play('fall')
      }
  }
  else if (birdie.body.velocity.y < 0 && (birdie.body.velocity.x < 140 && birdie.body.velocity.x > -140)) {
      birdie.animations.play('up')
  }

  //setting up controls
  if (cursors.up.isDown) {
    if (cursors.left.isDown) {

        birdie.body.velocity.y = -180;
        birdie.body.velocity.x = -180;

    } else if (cursors.right.isDown) {

        birdie.body.velocity.y = -180;
        birdie.body.velocity.x = 180;

    } else {

        birdie.body.velocity.y = -180;
        birdie.body.velocity.x *= .99;
    }

  } else if (cursors.down.isDown) {

      if (cursors.left.isDown) {

          birdie.body.velocity.y = 180;
          birdie.body.velocity.x = -180;

      } else if (cursors.right.isDown) {

          birdie.body.velocity.y = 180;
          birdie.body.velocity.x = 180;

      } else {
          birdie.body.velocity.y = 180;
          birdie.body.velocity.x *= .99;
      }

  } else if (cursors.left.isDown) {
      birdie.body.velocity.x = -180;
      birdie.body.velocity.y *= .5;

  } else if (cursors.right.isDown) {
      birdie.body.velocity.x = 180;
      birdie.body.velocity.y *= .5;
  }
}
