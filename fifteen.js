// Jessica Harris
//Overview of solution: this game was made by using youtube tutorials on the varous pseudo code and creating various id's and classes to be as organized as possible;
//Key design features forJS page is onload, checkMove, onouseout, mouseover,onclick,
//Testing for the JS was trying out different ways to make the code shorter its defintely not less than 100 but I did it alone so
//i tried while keeping it functional, so I watched various youtube videos
"use strict";

//variables for the puzzle 
var gamePiece; 
var notify;
var timer;
var spaceY;
var spaceX;


 window.onload = function () // executes script once website and content is fully loaded
{

	var puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div'); //retrieve element within puzzlearea

	for (var i=0; i<gamePiece.length; i++) //loop that correlates to line 44 in fifteen.css to reduce redundancy

	{

		gamePiece[i].className = 'puzzlepiece'; //setting up the puzzle piece code using the class name

		gamePiece[i].style.left = (i%4*100)+'px'; //calculates the position for puzzle pieces from the left of the screen

		gamePiece[i].style.top = (parseInt(i/4)*100) + 'px'; //calculates the position for puzzle pieces from the top of the screen

		gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top; 
		//calculates the position of the background picture so in moves in relation to the puzzle pieces


		gamePiece[i].onmouseover = function() //event when the mouse pointer is moved on the piece
		{
			if (checkMove(parseInt(this.innerHTML))) //validates when a move is made with pointer
			{
				this.style.border = "3px solid red"; //changes to red when a puzzle piece is near an empty space
				this.style.color = "#006600"; //text color 
				this.style.textDecoration = "underline"; //underlines the number of the puzzle piece

                this.style.backgroundImage="url('https://codd.cs.gsu.edu/~jharris296/WP/PW/2/Jessica%20Harris/Background.jpg')"; 
                //makes cookies the background image
			}

		};


      //activates whenever mouse moves out of puzzle piece
      //reverts to its original size border
      //reverts color; gets rid of solid text 
		gamePiece[i].onmouseout = function() 
		{

			this.style.border = "2px solid black"; 

			this.style.color = "#000000"; 
			this.style.textDecoration = "none"; 
		};


//"on click" activates when mouse clicks on a puzzle piece
		gamePiece[i].onclick = function() 
		{
		//if statemnt checks if the puzzle piece can move into an empty space
		//moves into an empty space if true
		//checks when the all the 15 pieces are in its right space
		// calls function that alerts the player that they have won
	if (checkMove(parseInt(this.innerHTML))) 
			{
				swap(this.innerHTML-1); 

				if (finish())
				{

					win(); 

				}

			return;

			}
		};
	}

	var shuffle = document.getElementById('shufflebutton'); //initializes the shuffle button

	spaceX = '300px'; 
	spaceY = '300px';

	shuffle.onclick = function() //method to get output whenever the shuffle button is clicked instead of php method
	{

		for (var i=0; i<300; i++) 
		{

			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece

			if (rand == 0)
			{

				var temp = up(spaceX, spaceY); 

				if ( temp != -1)
				{

					swap(temp);

				}

			}

			if (rand == 1)
			{

				var temp = down(spaceX, spaceY);

				if ( temp != -1) 
				{

					swap(temp);

				}

			}

			if (rand == 2)
			{

				var temp = left(spaceX, spaceY);

				if ( temp != -1)
				{
					swap(temp);

				}
			}

			if (rand == 3)
			{
				var temp = right(spaceX, spaceY);

				if (temp != -1)
				{

					swap(temp);

				}
			}
		}
	};
};



function checkMove(position) // returns true whenever a piece can move to an empty space
{

	if (left(spaceX, spaceY) == (position-1))
	{

		return true;

	}
	if (down(spaceX, spaceY) == (position-1))

	{

		return true;

	}
	if (up(spaceX, spaceY) == (position-1))

	{

		return true;

	}
	if (right(spaceX, spaceY) == (position-1))
	{

		return true;

	}

}

//decreases the value of "notify"gets body element in html then goes back to original page backgroun ans tells the user if they have won the game 
function Notify()
{

	notify --;  

	if (notify == 0) //tester for reaching the end
	{
		var body = document.getElementsByTagName('body'); 

		body[0].style.backgroundImage= "none"; 

		alert('You Made It in Time! Press Shuffle to Play Again! '); 

		var para=document.getElementsByClassName('description');
	    para[0].style.visibility="visible";

		return;
	}
	else  (notify % 2) 
	{
		var body = document.getElementsByTagName('body'); 

	    body[0].style.backgroundImage= "url('https://codd.cs.gsu.edu/~jharris296/WP/PW/2/Jessica%20Harris/Winner.jpg')";
	    //sets background pic to show user that they had completed the puzzle
	}
    timer= setTimeout(Notify, 200); //notifies the user for 2 secs
}

function win() //notifies user that they have won and provides notify variabl
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundImage= "url('https://codd.cs.gsu.edu/~jharris296/WP/PW/2/Jessica%20Harris/Completion.jpg')";
	notify = 10;
	timer= setTimeout(Notify, 200);
	var para=document.getElementsByClassName('description');
	para[0].style.visibility="hidden";
}

function finish() //function for when  end of the game and checks for each direction of the pieces
{
	var flag = true;
	for (var i = 0; i < gamePiece.length; i++) //for each puzzle piece 
	{
		var top = parseInt(gamePiece[i].style.top);
		var left = parseInt(gamePiece[i].style.left);
		if (left != (i%4*100) || top != parseInt(i/4)*100) 
		{
			flag = false;
			break;
		}
	}
	return flag;
}

function left(x, y) //calculates how far to the left a puzzlepiece should position
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);
	if (cordX > 0)
	{
		for (var i = 0; i < gamePiece.length; i++) 
		{

			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function right (x, y) //function for accurate position
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);
	if (cordX < 300)
	{
		for (var i =0; i<gamePiece.length; i++){
			if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 

}
function up(x, y) //function for accurate position
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);
	if (cordY > 0)
	{
		for (var i=0; i<gamePiece.length; i++)
		{
			if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 
			{
				return i;
			}
		} 
	}

	else 
	{
		return -1;
	}
}

function down (x, y) //calculates how far down a puzzlepiece should position
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);
	if (cordY < 300)
	{
		for (var i=0; i<gamePiece.length; i++)
		{

			if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}
function swap (position) //moves the puzzle piece by switching position with an empty space
{
	var temp = gamePiece[position].style.top;
	gamePiece[position].style.top = spaceY;
	spaceY = temp;
	temp = gamePiece[position].style.left;
	gamePiece[position].style.left = spaceX;
	spaceX = temp;
}

