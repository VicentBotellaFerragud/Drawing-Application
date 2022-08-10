//Variables that hold the references for the toolbar/sidebar and the canvas:
const toolbar = document.getElementById('toolbar');
const canvas = document.getElementById('drawing-board');

//Variable that holds the drawing context of the canvas:
const ctx = canvas.getContext('2d');

//Variables that hold the distance there is (both vertically and horizontally) between the canvas and the rest of the view:
const canvasOffsetX = canvas.offsetLeft; //As from left to right the canvas starts where the toolbar/sidebar ends, this variable has a value of 80 (the total width of the toolbar/sidebar).
const canvasOffsetY = canvas.offsetTop; //As from top to bottom the canvas starts where the screen view starts, this variable has a value of 0.

//Variables that hold the canvas width and height. They ensure that the canvas occupies the maximum possible view without invading the 
//toolbar/sidebar space:
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false; //By default the user does not draw.
let lineWidth = 5; //By default the drawing line will have a width of 5px.

//Variables that will hold the coordinates where the user starts drawing.
let startX;
let startY;

/* This part of the code handles the toolbar/sidebar functionalities */

toolbar.addEventListener('click', e => {

    //If the user clicks the "clear" button...
    if (e.target.id === 'clear') {

        //The canvas is cleared... 
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Because the clearRect method sets every pixel to white in the provided area.

    }

});

//Handles the input changes.
toolbar.addEventListener('change', e => {

    //If the user picks a different color...
    if(e.target.id === 'stroke') {

        //The stroke color will be the one picked by the user.
        ctx.strokeStyle = e.target.value;

    }

    //If the user picks a different line width...
    if(e.target.id === 'lineWidth') {

        //The line width will be the one picked by the user.
        lineWidth = e.target.value;

    }
    
});

/* The rest of the code handles the drawing */ 

const draw = (e) => {

    //If the user is not painting...
    if(!isPainting) {

        //The function just breaks.
        return;

    }

    ctx.lineWidth = lineWidth; //Sets the line width to the (by the user) passed-in value.
    ctx.lineCap = 'round'; //Sets the line cap to "round".

    //The lineTo method draws the line the user wants. The "e.clientX - canvasOffsetX" is crucial, because the "e.clientX" coordinate
    //comes from the entire width of the view and this would make the line start to be drawn at a later point than the one the user wants. 
    //Let's not forget that the canvas width starts at pixel 80 (when the toolbar/sidebar ends).
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);

    //The stroke method colors the line drawn by the user. If this method wasn't called, the line would only be colored once the 
    //mouseup event was triggered.
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {

    //When the mousedown event is triggered this variable is set to "true".
    isPainting = true;

    //These variables hold (when the mousedown event is triggered) the mouse coordinates (the position where the user starts drawing from).
    startX = e.clientX;
    startY = e.clientY;

});

canvas.addEventListener('mouseup', e => {

    //When the mouseup event is triggered this variable is set to "false".
    isPainting = false;

    //The stroke method colors the line drawn by the user.
    ctx.stroke(); 

    //The beginPath method closes the "path" drawn by the user. This way, when the user starts drawing again, the previously drawn line 
    //is ignored. If this method wasn't called, the previous mousedown event would always make the old line "reach" the new line before 
    //the user could start drawing again.
    ctx.beginPath();

});

//The draw function is called if the mousemove event is triggered.
canvas.addEventListener('mousemove', draw);

/**
 * THIS MAY INTEREST YOU!
 * The 'mousedown' event is triggered whenever a mouse button is pressed.
 * The 'mouseup' event is triggered whenever a mouse button is released.
 * The 'mousemove' event is triggered whenever the mouse is moved.
 */