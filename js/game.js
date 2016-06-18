/* Keys.js */
var Keys = {Left:false,Right:false,MouseDown:false};

// Keyboard Controls
window.onkeydown = function() {
	switch(event.keyCode) {
		case 37:
			Keys.Left = true;
		break;
		case 39:
			Keys.Right = true;
		break;
	}
}

window.onkeyup = function() {
	switch(event.keyCode) {
		case 37:
			Keys.Left = false;
		break;
		case 39:
			Keys.Right = false;
		break;
	}
}

function findDistance(p1,p2){  
  return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
}

/* Player.js */
var Player = function(){

this.x = 100;
this.y = 100;
this.h = 180;
this.w = 75;
this.centerx = 0;
this.centery = 0;
this.direction="r";

this.aviao = new Image;
this.aviao.onload = function(){
	console.log("Imagem do avião carregada");	  	  
};
this.aviao.src = "img/aviao.jpg";


this.update = function() {
	// Update code goes here.
	if ( Keys.Left == true && this.x >=0 )  
		this.x = this.x - 4;

	if ( Keys.Right == true && (this.x+this.w) <= Game.canvas.width ) 
		this.x = this.x + 4;
}

this.draw = function() {
	if (this.aviao) {
		Game.ctx.drawImage(this.aviao, 0, 0, 230, 180);
	}

	Game.ctx.font = '180px Engagement';
	Game.ctx.font = 'Engagement';
  	Game.ctx.fillStyle = 'black';
  	Game.ctx.fillText ('A', this.x, this.y, this.w, this.h);

  	// Exemplo Retangulo:
  	Game.ctx.beginPath();
  	Game.ctx.fillStyle="red";
	Game.ctx.rect(this.x,this.y,this.w,this.h);	
	Game.ctx.stroke();
}

};

/* Game.js */

var Game = { };
var Player1 = new Player();

// Game Variables
Game.canvas = document.getElementById('myCanvas');
Game.ctx = myCanvas.getContext('2d');
Game.fps = 30;

Game.bg = new Image;
Game.bg.onload = function(){
	console.log("Imagem de fundo carregado");	  	  
};
Game.bg.src = "img/background.jpg";

// Core Methods
Game.run = function() {
	// Run code goes here.
	Game.draw();
	Game.update();
}

Game.update = function() {
	// Update code goes here.
	Player1.update();
}

Game.draw = function() {
	// Draw code goes here.
	Game.clear();
	Player1.draw();
}

Game.clear = function() {
	// Limpa o canvas:
	Game.ctx.fillStyle="#FFFFFF";
	Game.ctx.fillRect(0,0, Game.canvas.width, Game.canvas.height);

	// Imagem de fundo:
	if (this.bg) {
		Game.ctx.drawImage(this.bg, 0, 0, 600, 480);
	}

	// Letreiro:
	Game.ctx.font = '180px Engagement';
  	Game.ctx.fillStyle = 'black';
  	Game.ctx.textBaseline = 'top';
  	Game.ctx.fillText ('   vi   o', 230, 300);
}

Game.canvas.onmousedown = function(e) {
	if ( e.offsetX >= Player1.x && e.offsetX <= (Player1.x + Player1.w) && e.offsetY >= Player1.y && e.offsetY <= (Player1.y + Player1.h) ) {
		Keys.MouseDown = true;
		Player1.centerx = e.offsetX - Player1.x;
		Player1.centery = e.offsetY - Player1.y;				
	}
}

Game.canvas.onmouseup = function(e) {
	Keys.MouseDown = false;
}

Game.canvas.onmousemove = function(e) {
	if ( Keys.MouseDown == true ) {
		Player1.x = e.offsetX - Player1.centerx;
		Player1.y = e.offsetY - Player1.centery;

		console.log("Movimentação: ("+ Player1.x + "," + Player1.y + ")");
	}
}

Game._intervalId = setInterval(Game.run, 1000 / Game.fsp);