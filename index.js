// canvas related vars
var canvas=document.getElementById("game");
var ctx=canvas.getContext("2d");
canvas.width=(8/10)*window.outerWidth;
canvas.height=window.innerHeight;
var cw=canvas.width;
var ch=canvas.height;

var clientWidth = document.getElementById('game').clientWidth;
var clientHeight = document.getElementById('game').clientHeight;

var score = document.getElementById("score");


//variables to keep track of attempts
var successfulTries=0;
var failedTries=0;


// save relevant information about shapes drawn on the canvas
var shapes=[];
var dontDraw=[];


// drag related vars
var isDragging=false;
var itemDraggging;
var startX,startY;
var initialClickX;
var initialClickY;

// hold the index of the shape being dragged (if any)
var selectedShapeIndex;

// load the image

var trash = [];
var recycle = [];
var compost = []

var trash1= new Image();
trash1.src='./img/trash/trash1.png'
var trash2= new Image();
trash2.src='./img/trash/trash2.png'
var trash3= new Image();
trash3.src='./img/trash/trash3.png'
var trash4= new Image();
trash4.src='./img/trash/trash4.png'
var trash5= new Image();
trash5.src='./img/trash/trash5.png'

var compost1 = new Image();
compost1.src='./img/compost/compost1.png'
var compost2 = new Image();
compost2.src='./img/compost/compost2.png'
var compost3 = new Image();
compost3.src='./img/compost/compost3.png'
var compost4 = new Image();
compost4.src='./img/compost/compost4.png'
var compost5 = new Image();
compost5.src='./img/compost/compost5.png'

var recycle1 = new Image();
recycle1.src='./img/recycle/recycle1.png'
var recycle2 = new Image();
recycle2.src='./img/recycle/recycle2.png'
var recycle3 = new Image();
recycle3.src='./img/recycle/recycle3.png'
var recycle4 = new Image();
recycle4.src='./img/recycle/recycle4.png'
var recycle5 = new Image();
recycle5.src='./img/recycle/recycle5.png'

// wrong messages
// var wrongCompost = new Image();
wrongCompost = './img/Wrong_Answer_Speech_Bubble/Wrong_Compost-removebg-preview.png';
// var WrongRecycle = new Image();
WrongRecycle = './img/Wrong_Answer_Speech_Bubble/WrongRecycle-removebg-preview__1_-removebg-preview.png';
// var WrongTrash = new Image();
WrongTrash = './img/Wrong_Answer_Speech_Bubble/WrongTrash-removebg-preview.png';

// right messages
var rightMessages = [];
// var right1 = new Image();
right1 = './img/NEWfin-tastic-removebg-preview.png'
// var right2 = new Image();
right2 = './img/Correct_Answer_Speech_Bubbles/TurtelyAwesome.png'
// var right3 = new Image(); 
right3 = './img/Correct_Answer_Speech_Bubbles/Sandtastic.png'
// var right4 = new Image();
right4 = './img/Correct_Answer_Speech_Bubbles/Sofishticated.png'
// var right5 = new Image();
right5 = './img/Correct_Answer_Speech_Bubbles/YeahBuoy.png'

messageBub = document.getElementById("message");
messageBub.style.display = "none";

trash.push(trash1,trash2,trash3,trash4,trash5);
compost.push(compost1,compost2,compost3,compost4,compost5);
recycle.push(recycle1,recycle2,recycle3,recycle4,recycle5);
rightMessages.push(right1,right2,right3,right4,right5);



var background = new Image();
background.src='./img/background.png'


var bin1 = new Image();
var bin2 = new Image();
var bin3 = new Image();

bin1.src='./img/bin1.png'
bin2.src='./img/bin2.png'
bin3.src='./img/bin3.png'

const pBar = document.querySelector(".progress");


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


function handleLoad(imageObj,xVal,yVal,widthVal,heightVal,trash)
{
    // console.log("behing handled");
    // console.log(imageObj);
    shapes.push( {x:xVal, y:yVal, width:widthVal, height:heightVal , image:imageObj, type:trash});
    //    shapes.push( {x:xVal, y:yVal, width:widthVal, height:heightVal , image:imageObj,type:trash});

    drawAll();
    canvas.onmousedown=handleMouseDown;
    canvas.onmousemove=handleMouseMove;
    canvas.onmouseup=handleMouseUp;
    canvas.onmouseout=handleMouseOut;

}


function loadAllTrash(trashArray,trashType)
{

    for(let i=0;i<5;i++)
    {
        var spawnX=Math.random() * ((this.cw-150) - 0) + 0;
        var spawnY=Math.random() * ((this.ch-500) - 0) + 0;
        // console.log(spawnX,spawnY);

        var randomTrash= Math.floor(Math.random() * 5);

        // console.log(randomTrash);
        handleLoad(trashArray[randomTrash],spawnX,spawnY,150,150,trashType);
        spawnX+=200;
    }

 
}

window.onload= function(){
    loadAllTrash(compost,"compost");
    loadAllTrash(recycle,"recycle");
    loadAllTrash(trash,"trash");

}// put your image src here!


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
    // console.log(startX);
    // test mouse position against all shapes
    // post result if mouse is in a shape
    for(var i=0;i<shapes.length;i++){
        if(isMouseInShape(startX,startY,shapes[i])){
            initialClickX=shapes[i].x;
            initialClickY=shapes[i].y;
            
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

// update progress bar finction
function updateProgressBar(progressBar, value) {
    value = Math.round(value *100);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
}

function handleMouseUp(e){
    // return if we're not dragging
    if(!isDragging){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging=false;

    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);

    //trash bin
    if(mouseX>0 && mouseX<0+300 && mouseY>(3/5)*clientHeight && mouseY<(3/5)*clientHeight+300 && shapes[selectedShapeIndex].type=="trash")
    {
        console.log("successful trash categorization");
        successfulTries++;
        messageBub.src = rightMessages[Math.round(Math.random()*5)];
        messageBub.style.display = "block";
        updateProgressBar(pBar, successfulTries/15)
        dontDraw.push(selectedShapeIndex);
        drawAll();
        


    }
    else if(mouseX>(1/3)*clientWidth && mouseX<(1/3)*clientWidth+300 && mouseY>(3/5)*clientHeight && mouseY<(3/5)*clientHeight+300 && shapes[selectedShapeIndex].type=="recycle")
    {
        console.log("successful recycling categorization");
        successfulTries++;
        messageBub.src = rightMessages[Math.round(Math.random()*5)];
        messageBub.style.display = "block";
        console.log(successfulTries/15);
        updateProgressBar(pBar, successfulTries/15);
        dontDraw.push(selectedShapeIndex);
        drawAll();

    }
    else if(mouseX>(2/3)*clientWidth && mouseX<(2/3)*clientWidth+300 && mouseY>(3/5)*clientHeight && mouseY<(3/5)*clientHeight+300 && shapes[selectedShapeIndex].type=="compost")
    {
        console.log("successful composting categorization");
        successfulTries++;
        messageBub.src = rightMessages[Math.round(Math.random()*5)];
        messageBub.style.display = "block";
        updateProgressBar(pBar, successfulTries/15)
        dontDraw.push(selectedShapeIndex);
        drawAll();

    }
    else if(mouseX>0 && mouseX<0+300 && mouseY>(3/5)*clientHeight && mouseY<(3/5)*clientHeight+300 && shapes[selectedShapeIndex].type!="trash")
    {
        console.log("failed trash categorization");
        failedTries++;
        messageBub.style.display = "block";
        messageBub.src = WrongTrash;
        var selectedShape=shapes[selectedShapeIndex];
        selectedShape.x=initialClickX;
        selectedShape.y=initialClickY;
        drawAll();

    }
    else if(mouseX>(1/3)*clientWidth && mouseX<(1/3)*clientWidth+300 && mouseY>(3/5)*clientHeight && mouseY<(3/5)*clientHeight+300 && shapes[selectedShapeIndex].type!="recycle")
    {
        console.log("failed recycling categorization");
        failedTries++;
        messageBub.style.display = "block";
        messageBub.src = WrongRecycle;
        var selectedShape=shapes[selectedShapeIndex];
        selectedShape.x=initialClickX;
        selectedShape.y=initialClickY;
        drawAll();

    }
    else if(mouseX>(2/3)*clientWidth && mouseX<(2/3)*clientWidth+300 && mouseY>(3/5)*clientHeight && mouseY<(3/5)*clientHeight+300 && shapes[selectedShapeIndex].type!="compost")
    {
        console.log("failed compost categorization");
        failedTries++;
        messageBub.style.display = "block";
        messageBub.src = wrongCompost;
        var selectedShape=shapes[selectedShapeIndex];
        selectedShape.x=initialClickX;
        selectedShape.y=initialClickY;
        drawAll();

    }
    console.log(`Successful tries ${successfulTries}`);


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
    if(successfulTries==5)
    {
        document.getElementById("earth1").src='./img/earth5.png';

    }
    ctx.drawImage(background,0,0,clientWidth,clientHeight);
    drawBin();
    for(var i=0;i<shapes.length;i++){

        if(dontDraw.includes(i))
        {
        }
        else{
            var shape=shapes[i];

            if(shape.image){
                // it's an image
                ctx.drawImage(shape.image,shape.x,shape.y,150,150);
            }
        }
    }
}
  //Draw temporary bins 
  function drawBin(amount)
  {

    ctx.drawImage(bin1,0,(3/5)*clientHeight,300,300);
    ctx.drawImage(bin2,(1/3)*clientWidth,(3/5)*clientHeight,300,300);
    ctx.drawImage(bin3,(2/3)*clientWidth,(3/5)*clientHeight,300,300);
    
  }

  drawBin(3);


  //Need to finish 
  //Add music to game
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
  
var music=0;
var mySound = new sound("music.wav");

function turnMusicOn()
{
    // console.log("entered");
    if(music==0)
    {
        // console.log("turn music on");
        mySound.play();
        music=1;
    }
    else{
        mySound.pause();
        music=0;
    }
}