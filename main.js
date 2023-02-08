
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
ctx.fillStyle = "rgb(255, 255, 255)" ;

const SCREEN_SIZE = [WIDTH , HEIGHT] ;

// SETTING THE MAIN CAMERA

var mainCamera = new Camera( [0,0,1] , [1,0,0] , [0,0,-40] , Math.PI/4 , Math.PI/4 , SCREEN_SIZE ) ;


// SETTING CUBE

let len = 10 ;
const point = []
for(let i = 0 , size = 0 ; i < 2 ; i++){
    for(let j = 0 ; j < 2 ; j++){
        for(let k = 0 ; k < 2 ; k++){
            let p = new Point( i*len , j*len , k*len) ;
            point.push( p ) ;
        }
    }
}

const adj = [] ;

for(let i = 0 ; i < 8 ; i++){
    adj.push([]) ;
    for(let j = 0 ; j < 8 ; j++){
        adj[i].push(0) ;
    }
}

for(let i = 0 ; i < 8 ; i++){
    for(let j = 0 ; j < 8 ; j++){
        let dx = point[i].x - point[j].x ;
        let dy = point[i].y - point[j].y ;
        let dz = point[i].z - point[j].z ;
        if( len*len == dx*dx + dy*dy + dz*dz ) adj[i][j] = 1 ;
    }
}

cube = new Shape(8,point,adj) ;
shape = cube ;

mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2 ) ;


function input_control( event ){
    document.getElementById("currentInput").innerText = event.key ;
    if( event.key == "x" ){
        shape.rotate_x(0.1) ;
        ctx.clearRect(0 , 0 , WIDTH , HEIGHT ) ;
        mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2  ) ;
    }
    if( event.key == "y" ){
        shape.rotate_y(0.1) ;
        ctx.clearRect(0 , 0 , WIDTH , HEIGHT ) ;
        mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2 ) ;
    }
    if( event.key == "z" ){
        shape.rotate_z(0.1) ;
        ctx.clearRect(0 , 0 , WIDTH , HEIGHT ) ;
        mainCamera.draw_shape( ctx , shape , WIDTH/2 , WIDTH/2 ) ;
    }
}

document.addEventListener('keydown' , (event) => input_control(event) ) ;