window.onload = init;
var zoom = 1
var stage;
var STAGE_WIDTH = 1280;
var STAGE_HEIGHT = 1280;
var grid_width = 64
var grid_height = 64
var mouseX = 0;
var mouseY = 0;
var gameState;
var img = null
var tokens = []
var draggedToken = null
var selectedToken = null
var dragOffsetX = 0
var dragOffsetY = 0
var transparentRed = "rgba(255, 0, 0, 0.5)"
var rotateImg;
var rotating = null
var SELECTED_BORDER_SIZE = 4
var altPressed = false

function init(){
	gameState = "loading";
	// events
	window.onmousemove = function(event){onMouseMoveHandler(event);}
  document.getElementById("buttonZoomIn").onclick = function(event){changeZoom(true)}
  document.getElementById("buttonZoomOut").onclick = function(event){changeZoom(false)}
	window.addEventListener('keydown', function(event) {handleKeyDown(event)});
  window.addEventListener('keyup', function(event) {handleKeyUp(event)});

  rotateImg = new Image()
  rotateImg.src = "rotate.png"

	initCanvas();
	gameState = "play";

  dummy = {}
  dummy.img = new Image()
  dummy.img.src = "javascript-logo.svg"
  dummy.x = 256
  dummy.y = 256
  dummy.width = grid_width
  dummy.height = grid_height
  dummy.z = 0
  dummy.rotate = 0
  tokens.push(dummy)

  var loopInterval = setInterval(loop, 1000/30);
}

function handleKeyDown(event) {
	if (event.key === 'Alt') {
		event.preventDefault()
		altPressed = true
	}
}

function handleKeyUp(event) {
	if (event.key === 'Alt') {
		altPressed = false
	}
}

function initCanvas(){
	canvas = document.getElementById("mapCanvas");
	context = canvas.getContext('2d');
	canvas.width=STAGE_WIDTH * zoom;
	canvas.height=STAGE_HEIGHT * zoom;
  canvas.ondrop = function(event){ handleDrop(event)}
  canvas.ondragover = function(event) {allowDrop(event)}

  canvas.addEventListener('mousedown', function(event) {canvasMouseDown(event)});
  canvas.addEventListener('mouseup', function(event) {canvasMouseUp(event)});
  canvas.addEventListener('mouseleave', function(event) {draggedToken = null});
	canvas.addEventListener("contextmenu", function(e) {
  	e.preventDefault();
	});

	stage = context;
  Split(["#map", "#chat"], {
    gutterSize: 5,
    sizes: [80,20]
  });

  Split(["#chatOut", "#chatIn"], {
    direction: 'vertical',
    gutterSize: 5,
    sizes: [80,20]
  });
}

function changeZoom(zoomIn) {
  zoom = zoom * (zoomIn ? 2 : 0.5);
  canvas.width = STAGE_WIDTH * zoom;
  canvas.height = STAGE_HEIGHT * zoom
  map = document.getElementById("map")
  if (canvas.width > map.clientWidth) {
    map.style.removeProperty("justify-content")
  } else {
    map.style.setProperty("justify-content", "center")
  }
}

function loop(){
	draw();
}

function drawImageCenter(token, x, y, cx, cy, rotation) {
    stage.setTransform(zoom, 0, 0, zoom, x * zoom, y * zoom); // sets scale and origin
    stage.rotate(rotation);
    stage.drawImage(token.img, -cx, -cy, token.width, token.height);
}

function drawToken(token)  {
	if (token.rotate != 0) {
  	drawImageCenter(token, (token.x + token.width / 2), (token.y + token.height / 2),
    	token.width / 2, token.height / 2, token.rotate * Math.PI / 180)
  	stage.setTransform(zoom,0,0,zoom,0,0);
	} else {
		stage.drawImage(token.img, token.x, token.y, token.width, token.height);
	}
}

/**
* Drawing -- updates to graphics on screen
*/
function draw() {
	clearStage();
	stage.setTransform(zoom,0,0,zoom,0,0);

  drawTokens();

  drawGrid();

  if (rotating != null) {
    rotateSelected()
  }

  stage.fillStyle = transparentRed
  stage.fillRect(mouseX - mouseX % (grid_width), mouseY - mouseY % (grid_height) , grid_width, grid_height)
}

function drawTokens() {
	for (token of tokens) {
    if (token == selectedToken) {
      stage.strokeStyle = 'blue'
			stage.lineWidth = "3"
      stage.strokeRect(token.x - SELECTED_BORDER_SIZE, token.y - SELECTED_BORDER_SIZE,
        token.width + SELECTED_BORDER_SIZE * 2, token.height + SELECTED_BORDER_SIZE * 2)
      stage.drawImage(rotateImg, (token.x + token.width) + 5, (token.y + token.height) + 5)
    }

    drawToken(token)
  }
}

function drawGrid() {
  stage.beginPath();
	stage.lineWidth = "1"
  stage.strokeStyle = 'black'
  for(var i = 0; i < STAGE_HEIGHT / grid_height; i++){
    stage.moveTo(0, (i + 1) * grid_height );
    stage.lineTo(STAGE_WIDTH, (i + 1) * grid_height);
  }

  for(var i = 0; i < STAGE_WIDTH / grid_width; i++){
    stage.moveTo((i + 1) * grid_width, 0 );
    stage.lineTo((i + 1) * grid_width, STAGE_HEIGHT);
  }
  stage.stroke();
}

function rotateSelected() {
	selectedCenterX = (selectedToken.x + selectedToken.width / 2)
	selectedCenterY = (selectedToken.y + selectedToken.height / 2)

	angle = (Math.atan2(mouseY - selectedCenterY, mouseX - selectedCenterX) -
		Math.atan2(rotating.startY - selectedCenterY, (rotating.startX - selectedCenterX))) * 180 / Math.PI
	if (!altPressed)
		selectedToken.rotate = ((rotating.startRot + angle) - ((rotating.startRot + angle) % 45)) % 360
	else
		selectedToken.rotate = (rotating.startRot + angle) % 360
}



function canvasMouseDown(event) {
	if (rotating) {
		if (event.button == 0) {
			rotating = null
		} else if (event.button == 2) {
			window.event.returnValue = false;
			selectedToken.rotate = rotating.startRot
			rotating = null
		}
		return
	}

	// Check to see if we are clicking on the rotate button of the selected token
  if (selectedToken != null) {
    if (mouseX > (selectedToken.x + selectedToken.width)+ 5
     && mouseY > (selectedToken.y + selectedToken.height) + 5
     && mouseX < (selectedToken.x + selectedToken.width) + 5 + rotateImg.width
     && mouseY < (selectedToken.y + selectedToken.height) + 5 + rotateImg.height)  {
       rotating = {startX: mouseX, startY: mouseY, startRot: selectedToken.rotate}
       return
     }
  }

  selectedToken = null

  for (token of tokens) {
    if (mouseX > (token.x) && mouseX < ((token.x + token.width)) &&
          mouseY > (token.y) && mouseY < ((token.y + token.height)))  {
            dragOffsetX = mouseX - token.x
            dragOffsetY = mouseY - token.y
            draggedToken = token
            selectedToken = token
            break
    }
  }
}

function canvasMouseUp(event) {
  draggedToken = null
}

function allowDrop(e) {
  e.preventDefault();
}

function handleDrop(e) {
  var url = e.dataTransfer.getData("Text")
  e.preventDefault();
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  console.log(url)
  img = new Image()
  img.src = url
  // See the section on the DataTransfer object.

  return false;
}

/**
* Stage Methods
*/
function clearStage(){
	stage.clearRect(0,0,STAGE_WIDTH,STAGE_HEIGHT);
  stage.fillStyle = 'white'
  stage.fillRect(0,0,STAGE_WIDTH, STAGE_HEIGHT)
}
/**
* Mouse Methods
*/
function getMousePosition(evt){
	var e = new MouseEvent(evt);
	var rect = canvas.getBoundingClientRect();
	mouseX = (e.x - rect.left) / zoom;
	mouseY = (e.y - rect.top) / zoom;
}
function onMouseMoveHandler(evt){
	getMousePosition(evt);
  if (draggedToken != null) {

		if (altPressed) {
			newX = mouseX - dragOffsetX
			newY = mouseY - dragOffsetY
		} else {
			newX = mouseX
			newX = newX - (newX % grid_width)

			newY = mouseY
			newY = newY - (newY % grid_height)
		}

    draggedToken.x = Math.min(Math.max((newX), 0), STAGE_WIDTH - draggedToken.width)
    draggedToken.y = Math.min(Math.max((newY), 0), STAGE_HEIGHT - draggedToken.height)
  }
}
/**
* MouseEvent Class
* Creates a global reference to the mouse position via mouseX and mouseY
*/
function MouseEvent(e){
	e?this.e=e:this.e=window.event;
	e.pageX?this.x=e.pageX:this.x=e.clientX;
	e.pageY?this.y=e.pageY:this.y=e.clientY;
}
