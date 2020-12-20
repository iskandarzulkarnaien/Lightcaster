<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      padding: 0;
      margin: 0;
    }
  </style>
  <!-- p5.js Files -->
  <script src="libs/p5.js"></script>
  <script src="libs/p5.sound.js"></script>

  <!-- Lightcaster Files -->
  <!-- Main Game -->
  <script src="game/scene.js"></script>

  <!-- Objects -->
  <script src="game/objects/baseObject.js"></script>

  <!-- Characters -->
  <script src="game/objects/characters/baseCharacter.js"></script>
  <script src="game/objects/characters/player.js"></script>
  <script src="game/objects/characters/enemy.js"></script>

  <!-- Line Type -->
  <script src="game/objects/environment/line_type/lineObject.js"></script>
  <script src="game/objects/environment/line_type/boundary.js"></script>
  <script src="game/objects/environment/line_type/unreflectiveGlass.js"></script>
  <script src="game/objects/environment/line_type/mirror.js"></script>

  <!-- Light Sources -->
  <script src="game/lights/ray.js"></script>
  <script src="game/lights/lightSource.js"></script>

</head>

# Welcome to Lightcaster!
Lightcaster is a work-in-progress game created by [Iskandar Zulkarnaien](https://github.com/iskandarzulkarnaien) (thats me!).

Use the power of lazers and reflections to get rid of the pesky enemy ships trying to shoot you down!

The game's controls can be found further down below.

If you have any questions and suggestions, or spot any bugs, feel free to let me know [here](https://github.com/iskandarzulkarnaien/Lightcaster/issues).

<body>
  <main>
  </main>
</body>

# Controls
Look Around     -   Mouse (Look Direction Follows Mouse)  
Move Forwards   -   W, Up Arrow Key  
Move Backwards  -   S, Down Arrow Key  
Strafe Left     -   A, Left Arrow Key  
Strafe Right    -   D, Right Arrow Key  
Fire Weapon     -   Left Mouse Button, Spacebar  

p.s. I'm aware of a bug where the Up/Down Arrow Keys and Spacebar moves the entire webpage in addition
to moving the player. I'm working on it! In the mean time, do stick to WASD and the Mouse!

Have fun playing!
