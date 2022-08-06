// canvas related vars
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
canvas.width=window.outerWidth;
canvas.height=window.innerHeight;
var cw=canvas.width;
var ch=canvas.height;
document.body.appendChild(canvas);
canvas.style.border='1px solid red';



var apple= new Image();
apple.src='./img/apple.png'

var bag = new Image();
bag.src='./img/bag.png'

var paper = new Image();
paper.src='./img/paper.png'






//Create array of trash 
var trashArray = [];
trashArray.push(apple,bag,paper);

//Randomize trash


//Generate Trash



// used to calc canvas position relative to window
function reOffset(){
    var BB=canvas.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;        
}
var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }
canvas.onresize=function(e){ reOffset(); }

// save relevant information about shapes drawn on the canvas
var shapes=[];

// drag related vars
var isDragging=false;
var startX,startY;

// hold the index of the shape being dragged (if any)
var selectedShapeIndex;

// load the image


function handleLoad(imageObj,xVal,yVal,widthVal,heightVal)
{
    console.log("behing handled");
    console.log(imageObj);
    shapes.push( {x:xVal, y:yVal, width:widthVal, height:heightVal , image:imageObj});
    drawAll();
    canvas.onmousedown=handleMouseDown;
    canvas.onmousemove=handleMouseMove;
    canvas.onmouseup=handleMouseUp;
    canvas.onmouseout=handleMouseOut;

}


function loadAllTrash(trash)
{


    

    for(let i=0;i<10;i++)
    {
        var spawnX=Math.random() * ((this.cw-150) - 0) + 0;
        var spawnY=Math.random() * ((this.ch-500) - 0) + 0;
        var randomTrash= Math.floor(Math.random() * 3);

        console.log(randomTrash);
        handleLoad(trash[randomTrash],spawnX,spawnY,150,150);
        spawnX+=200;
    }
}

window.onload= function(){
    loadAllTrash(trashArray);
}
//loadAllTrash(trashArray);


// apple.onload=function(){
//     // define one image and save it in the shapes[] array
//     shapes.push( {x:0, y:0, width:150, height:150, image:apple} );
//     // draw the shapes on the canvas
//     drawAll();
//     // listen for mouse events
//     canvas.onmousedown=handleMouseDown;
//     canvas.onmousemove=handleMouseMove;
//     canvas.onmouseup=handleMouseUp;
//     canvas.onmouseout=handleMouseOut;
// };

// bag.onload=function(){
//     // define one image and save it in the shapes[] array
//     shapes.push( {x:150, y:0, width:150, height:150, image:bag} );
//     // draw the shapes on the canvas
//     drawAll();
//     // listen for mouse events
//     canvas.onmousedown=handleMouseDown;
//     canvas.onmousemove=handleMouseMove;
//     canvas.onmouseup=handleMouseUp;
//     canvas.onmouseout=handleMouseOut;
// };
// put your image src here!


// given mouse X & Y (mx & my) and shape object
// return true/false whether mouse is inside the shape
function isMouseInShape(mx,my,shape){
    // is this shape an image?
    if(shape.image){
        // this is a rectangle
        var rLeft=shape.x;
        var rRight=shape.x+shape.width;
        var rTop=shape.y;
        var rBott=shape.y+shape.height;
        // math test to see if mouse is inside image
        if( mx>rLeft && mx<rRight && my>rTop && my<rBott){
            return(true);
        }
    }
    // the mouse isn't in any of this shapes
    return(false);
}

function handleMouseDown(e){
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position
    startX=parseInt(e.clientX-offsetX);
    startY=parseInt(e.clientY-offsetY);
    // test mouse position against all shapes
    // post result if mouse is in a shape
    for(var i=0;i<shapes.length;i++){
        if(isMouseInShape(startX,startY,shapes[i])){
            // the mouse is inside this shape
            // select this shape
            selectedShapeIndex=i;
            // set the isDragging flag
            isDragging=true;
            // and return (==stop looking for 
            //     further shapes under the mouse)
            return;
        }
    }
}

function handleMouseUp(e){
    // return if we're not dragging
    if(!isDragging){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging=false;
}

function handleMouseOut(e){
    // return if we're not dragging
    if(!isDragging){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging=false;
}

function handleMouseMove(e){
    // return if we're not dragging
    if(!isDragging){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // calculate the current mouse position         
    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);
    // how far has the mouse dragged from its previous mousemove position?
    var dx=mouseX-startX;
    var dy=mouseY-startY;
    // move the selected shape by the drag distance
    var selectedShape=shapes[selectedShapeIndex];
    selectedShape.x+=dx;
    selectedShape.y+=dy;
    // clear the canvas and redraw all shapes
    drawAll();
    // update the starting drag position (== the current mouse position)
    startX=mouseX;
    startY=mouseY;
}

// clear the canvas and 
// redraw all shapes in their current positions
function drawAll(){
    ctx.clearRect(0,0,cw,ch);
    for(var i=0;i<shapes.length;i++){
        var shape=shapes[i];
        if(shape.image){
            // it's an image
            ctx.drawImage(shape.image,shape.x,shape.y,150,150);
            drawBin();
        }
    }
}
  //Draw temporary bins 
  function drawBin(amount)
  {
    console.log("entered");
    ctx.fillStyle="#000000";
    ctx.beginPath();
    ctx.arc(400, 700, 40, 0, Math.PI * 2);
    ctx.fill();

    
    ctx.beginPath();
    ctx.arc(900, 700, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1400, 700, 40, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBin(3);

