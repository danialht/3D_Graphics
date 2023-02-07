
// SETTING CANVAS

const mainCanvas = document.querySelector(".mainCanvas") ;
mainCanvas.width = window.innerWidth / 2 ;
mainCanvas.height = window.innerHeight / 2;
let WIDTH = window.innerWidth / 2 ;
let HEIGHT = window.innerHeight / 2 ;

var ctx = mainCanvas.getContext("2d") ;
ctx.fillStyle = "rgb(255, 255, 255)" ;


// SETTING CUBE

let len = 50 ;
const point = []
for(let i = 0 , size = 0 ; i < 2 ; i++){
    for(let j = 0 ; j < 2 ; j++){
        for(let k = 0 ; k < 2 ; k++){
            let p = new Point(i*len , j*len , k*len) ;
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