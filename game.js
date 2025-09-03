const game = {
  plays: "red",
  winner: false,
  moves: 0,
};

var game_rounds = 0;
var dice;
var red_current = 0;
var python_red = false;
var python_white = false;
var white_current = 0;
var white_tsitsipas = false;
var red_tsitsipas = false;
var move_tsitsipas = 0;
var move_red = false;
var move_white = false



function setPositions() {
  var positions = [];
  var snakePositions = [13, 20, 28, 44, 58, 59, 65, 72, 78];
  var snakeNewPositions = [11, 10, 7, 34, 48, 39, 25, 52, 69];
  var ladderPositions = [5, 16, 21, 37, 42, 54, 60, 67, 73];
  var ladderNewPositions = [33, 36, 61, 56, 53, 64, 80, 77, 76];

  for (var i = 1; i <= 80; i++) {
    positions[i] = new Object();
    positions[i].from = i;

    if (snakePositions.indexOf(i) != -1) {
      positions[i].to = snakeNewPositions[snakePositions.indexOf(i)];
      positions[i].type = "Snake";
    } else if (ladderPositions.indexOf(i) != -1) {
      positions[i].to = ladderNewPositions[ladderPositions.indexOf(i)];
      positions[i].type = "Ladders";
    } else if (i === 29 || i === 46) {
      positions[i].to = i;
      positions[i].type = "pythonEffect";
    } else {
      positions[i].to = i;
      positions[i].type = "Normal";
    }
  }
  return positions;
}

var cells = setPositions();
for (var i = 1; i <= 80; i++) {
  console.log(
    "Cell: " +
    i +
    " type: " +
    cells[i].type +
    " From: " +
    cells[i].from +
    " To: " +
    cells[i].to
  );
}




function changePlayerTurn(dice) {
  if (dice != 6) {
    if (game.plays == "red") {
      game.plays = "white";
    } else {
      game.plays = "red";
    }
  }
}


function reset_place(pos) {
  var player = getPlayerTurn();

  if (red_current == pos && white_current == pos) {
    if (getPlayerTurn() == "red") {

      document.getElementById("position" + pos).innerHTML = "<img  src='imagesWhite/" + pos + ".png'  height=70 width=70></div>";
    } else {
      document.getElementById("position" + pos).innerHTML = "<img  src='imagesRed/" + pos + ".png'  height=70 width=70></div>";
    }


  } else {
    document.getElementById("position" + pos).innerHTML = "<img  src='images/" + pos + ".png'  height=70 width=70></div>";
  }



}

function getPlayerTurn() {
  return game.plays;
}




function checktype(pos) {
  if (pos == 29 || pos == 46) {
    pythonmode();
  }
  if (python_red == true && getPlayerTurn() == "red") {
    if (cells[pos].type == "Snake") {
      cells[pos].to = cells[pos].from;
    }

  }
  if (python_white == true && getPlayerTurn() == "white") {
    if (cells[pos].type == "Snake") {

      cells[pos].to = cells[pos].from;
    }

  }




  return cells[pos].to;
}





function dice_Number(number) {
  switch (number) {
    case 1:
      document.getElementById("dice").innerHTML = "<img  src='imagesDice/one.png'  height=70 width=70></div>";
    case 2:
      document.getElementById("dice").innerHTML = "<img  src='imagesDice/two.png'  height=70 width=70></div>";
      break;
    case 3:
      document.getElementById("dice").innerHTML = "<img  src='imagesDice/three.png'  height=70 width=70></div>";
      break;
    case 4:
      document.getElementById("dice").innerHTML = "<img  src='imagesDice/four.png'  height=70 width=70></div>";
      break;
    case 5:
      document.getElementById("dice").innerHTML = "<img  src='imagesDice/five.png'  height=70 width=70></div>";
      break;
    case 6:
      document.getElementById("dice").innerHTML = "<img  src='imagesDice/six.png'  height=70 width=70></div>";
      break;

  }
}



function changePosition() {
  if (red_tsitsipas == true && getPlayerTurn() == "red") {
    switch (move_tsitsipas) {
      case 0: {
        game.moves++;
        move_red = true;

        dice = 5;
        dice_Number(5);
        red_current += dice;
        updateGui(dice, red_current);
        red_current = checktype(red_current);

        document.getElementById("position" + red_current).innerHTML = "<img  src='imagesRed/" +
          red_current +
          ".png'  height=70 width=70></div>";
        changePlayerTurn(dice);
        game_rounds++;
        move_tsitsipas++;
        break;

      }
      case 1: {
        move_red = true;
        dice = 4;
        dice_Number(4);
        game.moves++;
        move_red = true;
        if (game.moves > 2 && move_white == true) {
          reset_place(red_current);
        }


        red_current += dice;
        updateGui(dice, red_current);

        red_current = checktype(red_current);
        document.getElementById("position" + red_current).innerHTML = "<img  src='imagesRed/" +
          red_current +
          ".png'  height=70 width=70></div>";
        changePlayerTurn(dice);
        game_rounds++;
        move_tsitsipas++;
        break;

      }
      case 2: {
        move_red = true;
        dice = 4;
        dice_Number(4);
        game.moves++;
        move_red = true;
        if (game.moves > 2 && move_white == true) {
          reset_place(red_current);
        }

        red_current += dice;
        updateGui(dice, red_current);
        red_current = checktype(red_current);
        document.getElementById("position" + red_current).innerHTML = "<img  src='imagesRed/" +
          red_current +
          ".png'  height=70 width=70></div>";

      }
    }
  } else if (white_tsitsipas == true && getPlayerTurn() == "white") {
    switch (move_tsitsipas) {
      case 0: {
        move_white = true;
        game.moves++;
        dice = 5;
        dice_Number(5);
        white_current += dice;
        updateGui(dice, white_current);
        white_current = checktype(white_current);

        document.getElementById("position" + white_current).innerHTML = "<img  src='imagesWhite/" +
          white_current +
          ".png'  height=70 width=70></div>";
        changePlayerTurn(dice);
        game_rounds++;
        move_tsitsipas++;
        break;

      }
      case 1: {
        move_white = true;
        dice = 4;

        dice_Number(4);
        game.moves++;
        move_red = true;
        if (game.moves > 2 && move_red == true) {
          reset_place(white_current);
        }
        white_current += dice;
        updateGui(dice, white_current);

        white_current = checktype(white_current);
        document.getElementById("position" + white_current).innerHTML = "<img  src='imagesWhite/" +
          white_current +
          ".png'  height=70 width=70></div>";
        changePlayerTurn(dice);
        game_rounds++;
        move_tsitsipas++;
        break;

      }
      case 2: {
        move_white = true;
        dice = 4;
        dice_Number(4);
        game.moves++;
      if (game.moves > 2 && move_red==true) {
        reset_place(white_current);
      }

        white_current += dice;
        updateGui(dice, white_current);
        white_current = checktype(white_current);
        document.getElementById("position" + white_current).innerHTML = "<img  src='imagesWhite/" +
          white_current +
          ".png'  height=70 width=70></div>";

      }
    }
  } else {


    dice = Math.floor(Math.random() * 6 + 1);
    dice_Number(dice);

    if (getPlayerTurn() == "red") {
      game.moves++;
      move_red = true;
      if (game.moves > 2 && move_white == true) {
        reset_place(red_current);
      }else if(game.moves>=2){
        reset_place(red_current);
      }
      red_current += dice;
      if (red_current > 80) {
        var dif = red_current - 80;
        red_current = 80 - dif;
      }
      updateGui(dice, red_current);


      red_current = checktype(red_current);

      hasPlayerwon(red_current);




      if (white_current != red_current) {

        document.getElementById("position" + red_current).innerHTML =
          "<img  src='imagesRed/" +
          red_current +
          ".png'  height=70 width=70></div>";
      } else {
        document.getElementById("position" + red_current).innerHTML =
          "<img  src='imagesBoth/" +
          red_current +
          ".png'  height=70 width=70></div>";
      }
    } else {
      game.moves++;
      move_white = true;

      if (game.moves > 2 && move_red == true) {
        if(white_current!=0){
        reset_place(white_current);
      }}



      white_current += dice;
      if (white_current > 80) {
        var dif = white_current - 80;
        white_current = 80 - dif;

      }
      updateGui(dice, white_current);


      white_current = checktype(white_current);
      hasPlayerwon(white_current);
      // updateGui(dice, white_current);

      if (red_current != white_current) {
        document.getElementById("position" + white_current).innerHTML =
          "<img  src='imagesWhite/" +
          white_current +
          ".png'  height=70 width=70></div>";
      } else {
        document.getElementById("position" + white_current).innerHTML =
          "<img  src='imagesBoth/" +
          white_current +
          ".png'  height=70 width=70></div>";

      }



    }
    changePlayerTurn(dice);

  }
}


function updateGui(dice, pos) {
  document.getElementById("Info").innerHTML += "The player " + getPlayerTurn() + " has draw dice " + dice + " and go in place " + pos;
  if (cells[pos].type == "Snake") {
    if (getPlayerTurn() == "red" && python_red == true) {
      document.getElementById("Info").innerHTML += "The player has fall in snake  but pyhton mode is true <br>"
    } else if (getPlayerTurn() == "white" && python_white == true) {

      document.getElementById("Info").innerHTML += "The player has fall in snake  but pyhton mode is true <br>"

    } else {


      document.getElementById("Info").innerHTML += " The " + getPlayerTurn() + " has fall in snake  and will fall  from : " + pos + " to place : " + cells[pos].to + "<br>";
    }
  } else if (cells[pos].type == "Ladders") {
    document.getElementById("Info").innerHTML += " The  " + getPlayerTurn() + " find the laddder and will go upwards from" + cells[pos].from + " to place :" + cells[pos].to + "<br>";


  } else if (cells[pos].type == "pythonEffect") {

    if (getPlayerTurn() == "red") {
      pythonmode();
      document.getElementById("Info").innerHTML += " The " + getPlayerTurn() + " has go to python mode : " + python_red + "<br>";

    } else {
      pythonmode();
      document.getElementById("Info").innerHTML += " The " + getPlayerTurn() + " has go to python mode : " + python_white + "<br>";


    }

  } else {
    document.getElementById("Info").innerHTML += "<br>";
  }
  if (dice == 6) {
    document.getElementById("Info").innerHTML += "The" + getPlayerTurn() + " has thrown 6 play again <br>";
  }
  if (hasPlayerwon(cells[pos].to)) {
    document.getElementById("Info").innerHTML += ("We have winner winner chicken dinner <br>");
    document.getElementById("Info").innerHTML += ("The " + getPlayerTurn() + " is the winner of the Snake CSD Edition");
  }

}




function hasPlayerwon(player) {
  if (player == 80) {
    document.getElementById("drawdice").disabled = true;
    return true;
  }
  return false;

}


function pythonmode() {
  if (game.plays == "red") {
    python_red = true;
  } else {
    python_white = true;
  }

}



function Tsitsipasmode() {
  var x = document.getElementById("name1").value;
  var y = document.getElementById("name2").value;
  if (x === "tsitsipas") {
    red_tsitsipas = true;
  } else if (y === "tsitsipas") {
    white_tsitsipas = true;
  }
  document.getElementById("drawdice").disabled=false;
}