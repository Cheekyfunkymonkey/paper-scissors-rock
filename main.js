// strict mode
"use strict";

(() => {
  // rock = 0, scissors = 1, paper = 2
  const HAND_FORMS = [0, 1, 2];

  // X-axis of hand
  const HAND_X = [20, 400, 770];

  // Hand width of each form
  const HAND_WIDTH = [360, 340, 430];
  const IMAGE_PATH = "images/paper-scissors-rock.png";

  // Speed of changing hand form
  const speed = 10;

  // Whether the game is paused or not
  let isPaused = false;

  // This counter is used to decide what hand form is displayed.
  let currentFrame = 0;

  function main() {
    const canvas = document.getElementById("screen");
    const context = canvas.getContext("2d");
    const imageObj = new Image();
    currentFrame = 0;

    imageObj.onload = function() {
      function loop() {
        currentFrame++;
        if (!isPaused) {
          draw(canvas, context, imageObj, currentFrame);
        }

        //How often the picture is changed. e.g. If "speed" is 10, 1000 / 10 = 100ms
        setTimeout(loop, 1000 / speed);
      }
      loop();
    };
    imageObj.src = IMAGE_PATH;
  }

  function draw(canvas, context, imageObj, frame) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const handIndex = frame % HAND_FORMS.length;
    const sx = HAND_X[handIndex];
    const swidth = HAND_WIDTH[handIndex];

    context.drawImage(
      imageObj,
      sx,
      0,
      swidth,
      imageObj.height,
      0,
      0,
      swidth,
      canvas.height
    );
  }

  function setButtonAction() {
    const rock = document.getElementById("rock");
    const scissors = document.getElementById("scissors");
    const paper = document.getElementById("paper");
    const restart = document.getElementById("restart");

    function onClick(event) {
      const myHandType = parseInt(event.target.value, 10);
      const opponentHandType = parseInt(currentFrame % HAND_FORMS.length, 10);
      isPaused = true;

      judge(myHandType, opponentHandType);
    }

    paper.addEventListener("click", onClick);
    scissors.addEventListener("click", onClick);
    rock.addEventListener("click", onClick);
    restart.addEventListener("click", () => {
      window.location.reload();
    });
  }

  function judge(myHandType, opponentHandType) {
    const result = (myHandType - Math.abs(opponentHandType) + 3) % 3;

    if (result === 0) {
      alert("Draw!");
    } else if (result === 1) {
      alert("You lose...");
    } else {
      alert("You win!");
    }
  }

  setButtonAction();
  main();
})();
