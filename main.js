
// SETTING CANVAS

const mainCanvas = document.querySelector(".mainCanvas") ;
mainCanvas.width = window.innerWidth / 2 ;
mainCanvas.height = window.innerHeight / 2;
let WIDTH = window.innerWidth / 2 ;
let HEIGHT = window.innerHeight / 2 ;

var ctx = mainCanvas.getContext("2d") ;
ctx.fillStyle = "rgb(255, 255, 255)" ;

let len = 50 ;

let point0 = new Point(0,0,0) ;
let point1 = new Point(len,0,0) ;
let point2 = new Point(len,len,0) ;
let point3 = new Point(0,len,0) ;
let point4 = new Point(0,0,len) ;
let point5 = new Point(len,0,len) ;
let point6 = new Point(len,len,len) ;
let point7 = new Point(0,len,len) ;

const point = [ point0 , point1 , point2 , point3 , point4 , point5 , point6 , point7 ] ;

adj = [
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
] ;

adj[0][1] = 1 ;
adj[1][2] = 1 ;
adj[2][3] = 1 ;
adj[0][3] = 1 ;
adj[4][5] = 1 ;
adj[5][6] = 1 ;
adj[6][7] = 1 ;
adj[4][7] = 1 ;
adj[0][4] = 1 ;
adj[1][5] = 1 ;
adj[2][6] = 1 ;
adj[3][7] = 1 ;



let shape = new Shape( 8 , point , adj ) ;
shape.draw( ctx , WIDTH/2 , HEIGHT/2 ) ;

function input_control( event ){
    document.getElementById("currentInput").innerText = event.key ;
    if( event.key == "x" ){
        shape.rotate_x(0.1) ;
        ctx.clearRect(0 , 0 , WIDTH , HEIGHT ) ;
        shape.draw( ctx , WIDTH/2 , HEIGHT/2 ) ;
    }
    if( event.key == "y" ){
        shape.rotate_y(0.1) ;
        ctx.clearRect(0 , 0 , WIDTH , HEIGHT ) ;
        shape.draw( ctx , WIDTH/2 , HEIGHT/2 ) ;
    }
    if( event.key == "z" ){
        shape.rotate_z(0.1) ;
        ctx.clearRect(0 , 0 , WIDTH , HEIGHT ) ;
        shape.draw( ctx , WIDTH/2 , HEIGHT/2 ) ;
    }
}

document.addEventListener('keydown' , (event) => input_control(event) ) ;

