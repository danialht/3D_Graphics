
// a point in the 3D - space

class Point{
    constructor( x , y , z  ){
        this.x = x ;
        this.y = y ;
        this.z = z ;
    }

    draw( ctx , x_0 , y_0 ){
        ctx.beginPath() ;
        ctx.moveTo(this.x + x_0 , this.y + y_0) ;
        ctx.arc( this.x + x_0 , this.y + y_0 , 1 , Math.PI * 2 , false) ;
        ctx.stroke() ;
        ctx.closePath() ;
    }

    rotate_x(theta){
        let x = this.x ;
        let y = this.y ;
        let z = this.z ;
        this.x = x ; 
        this.y = y * Math.cos(theta) - z * Math.sin(theta) ;
        this.z = y * Math.sin(theta) + z * Math.cos(theta) ;
    }
    rotate_y(theta){
        let x = this.x ;
        let y = this.y ;
        let z = this.z ;
        this.x = x * Math.cos(theta) + z * Math.sin(theta) ;
        this.y = y ;
        this.z = - x * Math.sin(theta) + z * Math.cos(theta) ;
    }
    rotate_z(theta){
        let x = this.x ;
        let y = this.y ;
        let z = this.z ;
        this.x = x * Math.cos(theta) - y * Math.sin(theta);
        this.y = x * Math.sin(theta) + y * Math.cos(theta);
        this.z = z ;
    }
};

// a 3D shape in space

class Shape{
    constructor( n , point , adj ){
        this.n = n ; // number of points
        this.point = point ; // array of points
        this.adj = adj ; // adjacency matrix
    }
    draw( ctx , x_0 , y_0 ){
        for(let i = 0 ; i < this.n ; i++){
            this.point[i].draw( ctx , x_0 , y_0 ) ;
        }
        for(let i = 0 ; i < this.n ; i++){
            for(let j = i+1 ; j < this.n ; j++){
                if( this.adj[i][j] == 1 ){
                    ctx.beginPath() ;
                    ctx.moveTo( this.point[i].x + x_0 , this.point[i].y + y_0 ) ;
                    ctx.lineTo( this.point[j].x + x_0 , this.point[j].y + y_0 ) ;
                    ctx.stroke() ;
                    ctx.closePath() ;
                }
            }
        }
    }
    rotate_x(theta){
        for(let i = 0 ; i < this.n ; i++){
            this.point[i].rotate_x( theta ) ;
        }
    }
    rotate_y(theta){
        for(let i = 0 ; i < this.n ; i++){
            this.point[i].rotate_y( theta ) ;
        }
    }
    rotate_z(theta){
        for(let i = 0 ; i < this.n ; i++){
            this.point[i].rotate_z( theta ) ;
        }
    }
};
