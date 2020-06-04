import React, { Component } from 'react'

export default class PlayArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
           zoom: 1,
           STAGE_WIDTH: 1280,
           STAGE_HEIGHT: 1280,
           grid_width: 64,
           grid_height: 64,
           mouseX: 0,
           mouseY: 0,
           gameState: 'loading',
           img: null,
           tokens: [],
           draggedToken: null,
           selectedToken: null,
           dragOffsetX: 0,
           dragOffsetY: 0,
           transparentRed: "rgba(255, 0, 0, 0.5)",
           rotating: null,
           SELECTED_BORDER_SIZE: 4,
           stage: null
        }
        this.canvasMouseUp = this.canvasMouseUp.bind(this);
        this.canvasMouseDown = this.canvasMouseDown.bind(this);
        this.mouseLeavesCanvas = this.mouseLeavesCanvas.bind(this);
        this.canvasContextMenu = this.canvasContextMenu.bind(this);
        this.dropOnCanvas = this.dropOnCanvas.bind(this);
        this.canvasDragOver = this.canvasDragOver.bind(this);
        this.mouseWheel = this.mouseWheel.bind(this);
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.setState({
            stage: canvas.getContext('2d')
        });

        canvas.width = this.state.STAGE_WIDTH * this.state.zoom;
        canvas.height = this.state.STAGE_HEIGHT * this.state.zoom;
        // canvas.ondrop = function(event){ handleDrop(event)}
        // canvas.ondragover = function(event) {allowDrop(event)}

        // canvas.addEventListener('mousedown', function(event) {canvasMouseDown(event)});
        // canvas.addEventListener('mouseup', function(event) {canvasMouseUp(event)});
        // canvas.addEventListener('mouseleave', function(event) {draggedToken = null});
        // canvas.addEventListener("contextmenu", function(e) {
        //     e.preventDefault();
        // });
        setInterval(() => this.draw(), 10000/30);
    }

    /**
    *----- CANVAS DRAWING ----
    */
    draw() {
        this.state.stage.setTransform(this.state.zoom,0,0,this.state.zoom,0,0);
        this.drawGrid();

        this.state.stage.fillStyle = this.state.transparentRed;
        this.state.stage.fillRect(
            this.state.mouseX - this.state.mouseX % (this.state.grid_width),
            this.state.mouseY - this.state.mouseY % (this.state.grid_height),
            this.state.grid_width, this.state.grid_height
        )
    }

    drawGrid() {
        this.state.stage.beginPath();
        this.state.stage.lineWidth = "1"
        this.state.stage.strokeStyle = 'black'
        for(var i = 0; i < this.state.STAGE_HEIGHT / this.state.grid_height; i++){
             this.state.stage.moveTo(0, (i + 1) * this.state.grid_height );
             this.state.stage.lineTo(this.state.STAGE_WIDTH, (i + 1) * this.state.grid_height);
        }

        for(var i = 0; i < this.state.STAGE_WIDTH / this.state.grid_width; i++){
             this.state.stage.moveTo((i + 1) * this.state.grid_width, 0 );
             this.state.stage.lineTo((i + 1) * this.state.grid_width, this.state.STAGE_HEIGHT);
        }
        this.state.stage.stroke();
    }

    /**
    *----- EVENT HANDLING ----
    */
    canvasMouseDown(e) {
        console.log('mouse down', e);
    }

    canvasMouseUp(e) {
        console.log('mouse up', e);
    }

    mouseLeavesCanvas(e) {
        console.log('mouse leaves canvas', e);
    }

    canvasContextMenu(e) {
        e.preventDefault();
        console.log('custom context menu', e);
    }

    dropOnCanvas(e) {
        console.log('drop on canvas', e);
    }

    canvasDragOver(e) {
        console.log('drop over canvas', e);
    }

    mouseWheel(e) {
        console.log('mouse wheel', e)
    }

    render() {
        return (
            <div id="map">
                <canvas
                    id="mapCanvas"
                    ref="canvas"
                    onMouseDown={this.canvasMouseDown}
                    onMouseUp={this.canvasMouseUp}
                    onMouseLeave={this.mouseLeavesCanvas}
                    onContextMenu={this.canvasContextMenu}
                    onDrop={this.dropOnCanvas}
                    onDragOver={this.canvasDragOver}
                    onWheel={this.mouseWheel}
                />
            </div>
        )
    }
}
