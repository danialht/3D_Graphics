
// SETTING CANVAS

const mainCanvas = document.querySelector(".mainCanvas") ;

/*mainCanvas.width = window.innerWidth / 2 ;
mainCanvas.height = window.innerHeight / 2;
let WIDTH = window.innerWidth / 2 ;
let HEIGHT = window.innerHeight / 2 ;*/

mainCanvas.width = 500 ;
mainCanvas.height = 500 ;
let WIDTH = 500 ;
let HEIGHT = 500 ;

var ctx = mainCanvas.getContext("2d") ;
ctx.fillStyle = "rgb(255, 0, 0)" ;

const SCREEN_SIZE = [WIDTH , HEIGHT] ;

// SETTING THE MAIN CAMERA

var mainCamera = new Camera( [0,0,1] , [1,0,0] , [0,0,-40] , Math.PI/4 , Math.PI/4 , SCREEN_SIZE ) ;


let p = new Point(0,0,0) ;
shape = new Shape(0 , [] , [] ) ;

function update_adj( index1 , index2 ){
    shape.adj[index1][index2] = shape.adj[index1][index2] = 1 ;
}

// RESPONDING TO INPUT

function input_control( event ){
    if( event.key == "x" ){
        shape.rotate_x(0.1) ;
        mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2  ) ;
    }
    if( event.key == "y" ){
        shape.rotate_y(0.1) ;
        mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2 ) ;
    }
    if( event.key == "z" ){
        shape.rotate_z(0.1) ;
        mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2 ) ;
    }
}


function draw_convex_hull(){
    let ch = new convex_hull_algo1( shape.point , shape.n ) ;
    shape.adj = ch.solve( shape ) ;
    mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2  ) ;
    ch.get_vertices() ;
    
}


document.addEventListener('keydown' , (event) => input_control(event) ) ;
