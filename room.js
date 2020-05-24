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

function init(){
	gameState = "loading";
	// events
	window.onmousemove = function(event){onMouseMoveHandler(event);}
  document.getElementById("buttonZoomIn").onclick = function(event){changeZoom(true)}
  document.getElementById("buttonZoomOut").onclick = function(event){changeZoom(false)}

  img = {}
  img.img = new Image(grid_width, grid_height)
  img.img.src = "javascript-logo.svg"
  img.x = 0
  img.y = 0
  img.width = grid_width
  img.height = grid_height
  img.rotate = 0

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


function message(text){
	tag = document.createElement("h1");
	document.body.appendChild(tag);
	tag.innerHTML = text;
}

function drawImageCenter(token, x, y, cx, cy, scale, rotation) {
    stage.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    stage.rotate(rotation);
    stage.drawImage(token.img, -cx, -cy, token.width * zoom, token.height * zoom);
}

function drawToken(token)  {
  drawImageCenter(token, (token.x + token.width / 2) * zoom, (token.y + token.height / 2) * zoom,
    token.width / 2 * zoom, token.height / 2 * zoom, 1, token.rotate * Math.PI / 180)
  stage.setTransform(1,0,0,1,0,0);
}

/**
* Drawing -- updates to graphics on screen
*/
function draw() {
	clearStage();
  if (img != null) {
    img.rotate = (img.rotate + 5) % 360;
    drawToken(img)
  }

  for (token of tokens) {
    if (token == selectedToken) {
      stage.fillStyle = 'green'
      stage.fillRect(token.x * zoom - SELECTED_BORDER_SIZE, token.y * zoom - SELECTED_BORDER_SIZE,
        token.width * zoom + SELECTED_BORDER_SIZE * 2, token.height * zoom + SELECTED_BORDER_SIZE * 2)
      stage.drawImage(rotateImg, (token.x + token.width) * zoom + 5, (token.y + token.height) * zoom + 5)
    }

    drawToken(token)
  }

  drawGrid();

  if (rotating != null) {
    stage.beginPath();       // Start a new path
    stage.strokeStyle = 'black'
    selectedCenterX = (selectedToken.x + selectedToken.width / 2) * zoom
    selectedCenterY = (selectedToken.y + selectedToken.height / 2) * zoom
    stage.moveTo(selectedCenterX, selectedCenterY);    // Move the pen to (30, 50)
    stage.lineTo(mouseX, mouseY);  // Draw a line to (150, 100

    stage.moveTo(selectedCenterX, selectedCenterY);    // Move the pen to (30, 50)
    stage.lineTo(rotating.startX, rotating.startY);  // Draw a line to (150, 100
    stage.stroke()
    console.log((Math.atan2(mouseY - selectedCenterY, mouseX - selectedCenterX) - Math.atan2(rotating.startY - selectedCenterY, (rotating.startX - selectedCenterX))) * 180 / Math.PI)
  }

  stage.fillStyle = transparentRed
  stage.fillRect(mouseX - mouseX % (grid_width * zoom), mouseY - mouseY % (grid_height * zoom) , grid_width * zoom, grid_height * zoom)
}

function drawGrid() {
  stage.beginPath();       // Start a new path
  stage.strokeStyle = 'black'
  for(var i = 0; i < STAGE_HEIGHT / grid_height; i++){
    stage.moveTo(0, (i + 1) * grid_height * zoom );    // Move the pen to (30, 50)
    stage.lineTo(STAGE_WIDTH * zoom, (i + 1) * grid_height * zoom);  // Draw a line to (150, 100
  }

  for(var i = 0; i < STAGE_WIDTH / grid_width; i++){
    stage.moveTo((i + 1) * grid_width * zoom, 0 );    // Move the pen to (30, 50)
    stage.lineTo((i + 1) * grid_width * zoom, STAGE_HEIGHT * zoom);  // Draw a line to (150, 100
  }
  stage.stroke();          // Render the path
}


/**
* Canvas
*/
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

function canvasMouseDown(event) {
  var e = new MouseEvent(event);
  var rect = canvas.getBoundingClientRect();
	mouseX = e.x - rect.left;
	mouseY = e.y - rect.top;

  if (selectedToken != null) {
    if (mouseX > (selectedToken.x + selectedToken.width) * zoom + 5
     && mouseY > (selectedToken.y + selectedToken.height) * zoom + 5
     && mouseX < (selectedToken.x + selectedToken.width) * zoom + 5 + rotateImg.width
     && mouseY < (selectedToken.y + selectedToken.height) * zoom + 5 + rotateImg.height)  {
       rotating = {startX: mouseX, startY: mouseY, startRot: selectedToken.rotation}
       return
     }
  }

  selectedToken = null

  for (token of tokens) {
    if (mouseX > (token.x * zoom) && mouseX < ((token.x + token.width) * zoom) &&
          mouseY > (token.y * zoom) && mouseY < ((token.y + token.height) * zoom))  {
            dragOffsetX = mouseX - token.x * zoom
            dragOffsetY = mouseY - token.y * zoom
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
	stage.clearRect(0,0,STAGE_WIDTH * zoom,STAGE_HEIGHT * zoom);
  stage.fillStyle = 'white'
  stage.fillRect(0,0,STAGE_WIDTH * zoom, STAGE_HEIGHT * zoom)
}
/**
* Mouse Methods
*/
function getMousePosition(evt){
	var e = new MouseEvent(evt);
	var rect = canvas.getBoundingClientRect();
	mouseX = e.x - rect.left;
	mouseY = e.y - rect.top;
}
function onMouseMoveHandler(evt){
	getMousePosition(evt);
  if (draggedToken != null) {
    draggedToken.x = Math.min(Math.max((mouseX - dragOffsetX) / zoom, 0), STAGE_WIDTH - draggedToken.width)
    draggedToken.y = Math.min(Math.max((mouseY - dragOffsetY) / zoom, 0), STAGE_HEIGHT - draggedToken.height)
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
