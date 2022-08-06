var apple = document.getElementById("apple");
var moving = false;

apple.addEventListener("mousedown", initialClick, false);




function move(e){
    console.log("entered");
    var newX = e.clientX - 10;
    var newY = e.clientY - 10;
  
    image.style.left = newX + "px";
    image.style.top = newY + "px";
}

function initialClick(e) {
    console.log("mousedown");
    if(moving){
      document.removeEventListener("mousemove", move);
      moving = !moving;
      return;
    }
    
    moving = !moving;
    image = this;
  
    document.addEventListener("mousemove", move, false);
  
  }  


  function buildcanvas(){
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    make_pic(ctx);
  }

  function make_pic(ctx)
  {
    var apple = document.getElementById("apple");
    ctx.drawImage(apple,0,0,50,50);
  }


$(window).mousemove(function(event) {
  $("#apple").css({"left" : event.pageX, "top" : event.pageY});
});

  // //Draw temporary bins 
  // function drawBin(amount)
  // {
  //   ctx.fillStyle="#000000";
  //   ctx.beginPath();
  //   ctx.arc(90, 270, 40, 0, Math.PI * 2);
  //   ctx.fill();

  //   ctx.arc(240, 270, 40, 0, Math.PI * 2);
  //   ctx.fill();

  //   ctx.arc(390, 270, 40, 0, Math.PI * 2);
  //   ctx.fill();
  // }


buildcanvas();
 //var canvas = document.getElementById('myCanvas');
// var apple = document.getElementById("apple");
// var apple = document.getElementById("apple");

// var bag = document.getElementById("bag");
// var paper = document.getElementById("paper");
 //var context = canvas.getContext('2d');
// var ballRadius = 10;

// let object = []
// var is_dragging=false;

// context.drawImage(apple,0,0,50,50);
// context.drawImage(bag,0,0,50,50);
// context.drawImage(paper,0,0,50,50);


// //Class for trash object 
// //Will change as we incorporate HTML elements 
// class Trash{
//     constructor(xpoint,ypoint,radius)
//     {
//         this.xpoint = xpoint;
//         this.ypoint = ypoint;
//         this.radius = radius;

//     }

//     draw(context)
//     {
//         context.beginPath();
//         context.arc(this.xpoint,this.ypoint,this.radius,0,Math.PI*2);
//         context.fillStyle = "#0095DD";
//         context.fill()
//         context.closePath();

//     }
// }

// //Temporary object for testing purposes 

//  test = new Trash(100,100,40)


// function drawRandomTrash( maxWidth,  minWidth,  maxHeight, minHeight) {
    
    
//     for (let i = 0; i < 10; i++) {

//         var randomX = Math.random() * (maxWidth - minWidth) + minWidth;

//         var randomY = Math.random() * (maxHeight - minHeight) + minHeight;

//         console.log(i);

//         let trash = new Trash(randomX, randomY, ballRadius);
//         trash.draw(context);
//     }
//   }

//   function getMousePos(canvas, evt) {
//     var rect = canvas.getBoundingClientRect();
//     return {
//       x: evt.clientX - rect.left,
//       y: evt.clientY - rect.top
//     };
//   }


//   //Draw temporary bins 
// function drawBin(amount)
// {
//     context.fillStyle="#000000";
//     context.beginPath();
//     context.arc(90, 270, 40, 0, Math.PI * 2);
//     context.fill();

//     context.arc(240, 270, 40, 0, Math.PI * 2);
//     context.fill();

//     context.arc(390, 270, 40, 0, Math.PI * 2);
//     context.fill();
    

// }

// drawRandomTrash(470,0,200,10);
// test.draw(context);
// drawBin(1)


// let is_trash_clicked = function(x,y,trash)
// {
//     shape_left=test.xpoint-40;
//     shape_right=test.xpoint+40;
//     shape_top=test.ypoint-40;
//     shape_bottom=test.ypoint+40;

//     if(shape_left<x && shape_right>x && shape_top<y && shape_bottom>y)
//     {
//         console.log("true")
//         return true;
//     }

//     return false;
// }

// let mouse_down = function(event)
// {
//     let startX = parseInt(event.clientX);
//     let startY=parseInt(event.clientY);
//     console.log(startX,startY);

//     if(is_trash_clicked(startX,startY,this.test))
//     {
//         is_dragging=true;
        
//         return;
//     }

//     console.log(is_dragging);
// }

// let mouse_out = function(event)
// {
//     if(!is_dragging)
//     {
//         return;
//     }

//     event.preventDefault();
//     is_dragging=false;
// }

// let mouse_up = function(event)
// {
//     if(!is_dragging)
//     {
//         return;
//     }

//     event.preventDefault();
//     is_dragging=false;
// }

// let draw_trash = function()
// {
//     context.clearRect(test.xpoint,test.ypoint,80,80)
// }
// let mouse_move = function(event)
// {
//     if(!is_dragging)
//     {
//         return false;
//     }
//     else{
//         console.log("touched")
//         event.preventDefault();
//         let mouseX= parseInt(event.clientX);
//         let mouseY= parseInt(event.clientY);
//         let dx= mouseX-parseInt(test.xpoint);
//         let dy=mouseY-parseInt(test.ypoint);
//         test.xpoint+=dx;
//         test.ypoint+=dy;
//         test.draw(context);

//     }
// }

// //Trash to Bin Collision

//     //Success Collision


//     //False Collision 


// //Generate False Categorization Signal (Pop Up)


// //Generate True Categorization Signal (Change of Expression)




//   canvas.onmousedown=mouse_down;
//   canvas.onmouseup=mouse_up;
//   canvas.onmouseout=mouse_out;
//   canvas.onmousemove=mouse_move;


