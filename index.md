<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lightcaster</title>
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

# Welcome to Lightcaster
Lightcaster is a work-in-progress game created by [Iskandar Zulkarnaien](https://github.com/iskandarzulkarnaien) (thats me!).
It is my first game development project, and is built using the [p5.js](https://p5js.org) library. 
At its core, Lightcaster is a game about light and optics and aims to invoke in its players the same
sense of wonder and curiosity I had about Physics when I was growing up.

Lightcaster is heavily inspired by Daniel Shiffman's (AKA: 'The Coding Train' on YouTube)
[video](https://www.youtube.com/watch?v=TOEi6T2mtHo) on Raycasting, which I found to be totally cool
and gave me the idea of creating a game based on rays and reflections.

The game controls can be found further down below.

If you have any questions or spot any bugs, feel free to file a bug report [here](https://github.com/iskandarzulkarnaien/Lightcaster/issues)

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
