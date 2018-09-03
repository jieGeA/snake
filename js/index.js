var content = document.getElementsByClassName('content')[0];
var startPage = document.getElementsByClassName('startPage')[0];
var snakeMove,
	speed = 200;
var deFeng = document.getElementById('score');
var loser = document.getElementsByClassName('loser')[0];
var loserScore = document.getElementsByClassName('loserScore')[0];
var startBtn = document.getElementsByClassName('start-btn')[0];
var startPage = document.getElementsByClassName('startPage')[0];
var img = document.getElementsByTagName('img')[0];
var leftSide = document.getElementsByClassName('left-side')[0];
var close = document.getElementsByClassName('close')[0];
init();
var flag = true;
var change = true;

function init() {
	//地图
	//	this.mapW = parseInt(content.offsetWidth);
	//getComputedStyle()中的参数不应该是字符串
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(content.offsetHeight);
	this.mapX = Math.floor(this.mapW / 20);
	this.mapY = Math.floor(this.mapH / 20);
	this.mapDiv = content;
	//食物
	this.foodH = 20;
	this.foodW = 20;
	this.foodX = 0;
	this.foodY = 0;
	//蛇
	this.snakeH = 20;
	this.snakeW = 20;
	this.snakeBody = [
		[3, 1, 'head'],
		[2, 1, 'body'],
		[1, 1, 'body']
	];
	//游戏属性
	this.direction = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	//初始得分
	this.score = 0;

	bindEvent();
}

function startGame() {

	food();
	snake();
	snakeMove = setInterval(move, speed);
}

function food() {
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.setAttribute('class', 'food');
	//一定要先除以20，确保生成的food在content里面
	this.foodX = Math.floor(Math.random() * (this.mapW / 20));
	this.foodY = Math.floor(Math.random() * (this.mapH / 20));
	food.style.left = this.foodX * 20 + 'px';
	food.style.top = this.foodY * 20 + 'px';
	//appendChild()中的参数不为字符串
	this.mapDiv.appendChild(food);
}

function snake() {
	for(var i = 0, len = this.snakeBody.length; i < len; i++) {
		var odiv = document.createElement('div');
		odiv.style.width = this.snakeW + 'px';
		odiv.style.height = this.snakeH + 'px';
		odiv.style.position = 'absolute';
		odiv.style.left = this.snakeBody[i][0] * 20 + 'px';
		odiv.style.top = this.snakeBody[i][1] * 20 + 'px';
		odiv.classList.add(this.snakeBody[i][2]);

		switch(this.direction) {
			case 'right':
				break;
			case 'left':
				odiv.style.transform = 'rotate(180deg)';
				break;
			case 'up':
				odiv.style.transform = 'rotate(270deg)';
				break;
			case 'down':
				odiv.style.transform = 'rotate(90deg)';
				break;
			default:
				break;
		}
		this.mapDiv.appendChild(odiv).classList.add('snake');

	}
}

function move() {
	//这种不行 因为这样的话先把蛇头位子给身子，此刻身子位置已经变了
	//，不是上一刻的位置了
	//	for(var i = 0; i < this.snakeBody.length-1; i++) {
	//		this.snakeBody[i+1][0] = this.snakeBody[i][0];
	//		this.snakeBody[i+1][1] = this.snakeBody[i][1];
	//	}

	for(var i = this.snakeBody.length - 1; i > 0; i--) {
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}

	switch(this.direction) {
		case 'right':
			this.snakeBody[0][0] += 1;
			break;

		case 'left':
			this.snakeBody[0][0] -= 1;
			break;

		case 'up':
			this.snakeBody[0][1] -= 1;
			break;
		case 'down':
			this.snakeBody[0][1] += 1;
			break;

		default:
			break;
	}
	removeClass('snake');
	snake();
	//判断吃食物，蛇身增加
	if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
		this.score += 1;
		console.log(this.score);
		deFeng.innerText = this.score;
		removeClass('food');
		food();
		addBody();
	}
	//判断边界
	if(this.snakeBody[0][0] < 0 || this.snakeBody[0][1] < 0 || this.snakeBody[0][0] > this.mapX || this.snakeBody[0][1] > this.mapY) {
		reload();
	}
	//判断有没有吃到自己
	for(var i = 1, len = this.snakeBody.length; i < len; i++) {
		if(this.snakeBody[0][0] == this.snakeBody[i][0] && this.snakeBody[0][1] == this.snakeBody[i][1]) {
			reload();
		}
	}
}

function reload() {
	clearInterval(snakeMove);
	removeClass('snake');
	removeClass('food');
	loserScore.innerHTML = this.score;
	loser.style.display = 'block';
	img.setAttribute('src', 'img/start.png');
	close.onclick = function() {
		loser.style.display = 'none';
		startPage.style.display = 'block';
	}
}

function removeClass(className) {
	var ele = document.getElementsByClassName(className);
	while(ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);
	}
}

function setDirection(code) {
	switch(code) {
		case 37:
			if(this.left) {
				this.direction = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
			if(this.up) {
				this.direction = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if(this.right) {
				this.direction = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if(this.down) {
				this.direction = 'down';
				this.down = false;
				this.up = false;
				this.right = true;
				this.left = true;
			}
			break;
	}
}

function bindEvent() {
	document.onkeydown = function(e) {
		e = e || window.event;
		var code = e.keyCode;
		setDirection(code);
	}
	leftSide.onclick = function() {
		if(flag) {
			startPage.style.display = 'none';
			init();
			startGame();
			img.setAttribute('src', 'img/pause.png');
			flag = false;
		} else {
			if(change) {
				clearInterval(snakeMove);
				img.setAttribute('src', 'img/start.png')
				change = false;
			} else if(!change) {
				snakeMove = setInterval(move, speed);
				change = true;
			}

		}
	}

	startBtn.onclick = function() {
		startPage.style.display = 'none';
		init();
		startGame();
		img.setAttribute('src', 'img/pause.png');
		flag = false;
	}
}

function addBody() {
	var newBody = [],
		san = this.snakeBody,
		sanLen = this.snakeBody.length;
	newBody.push(san[sanLen - 1][0], san[sanLen - 1][1], 'body');
	san.push(newBody);
	snake();
}