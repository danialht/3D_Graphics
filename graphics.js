
// dot product of two vectors in the space

function dot_product( A , B ){
    let ret = 0 ;
    for(let i = 0 ; i < 3 ; i++) ret += A[i] * B[i] ;
    return ret ;
}


// a point in the 3D - space

class Point{
    constructor( x , y , z  ){
        this.x = x ;
        this.y = y ;
        this.z = z ;
        this.r = [ x , y , z ] ;
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
        this.r = [ this.x , this.y , this.z ] ;
    }
    rotate_y(theta){
        let x = this.x ;
        let y = this.y ;
        let z = this.z ;
        this.x = x * Math.cos(theta) + z * Math.sin(theta) ;
        this.y = y ;
        this.z = - x * Math.sin(theta) + z * Math.cos(theta) ;
        this.r = [ this.x , this.y , this.z ] ;
    }
    rotate_z(theta){
        let x = this.x ;
        let y = this.y ;
        let z = this.z ;
        this.x = x * Math.cos(theta) - y * Math.sin(theta);
        this.y = x * Math.sin(theta) + y * Math.cos(theta);
        this.z = z ;
        this.r = [ this.x , this.y , this.z ] ;
    }
};

// a 3D shape in space

class Shape{
    constructor( n , point , adj ){
        this.n = n ; // number of points
        this.point = point ; // array of points
        this.adj = adj ; // adjacency matrix
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



class Camera{
    constructor( Z , X , R , theta_x , theta_y , SCREEN_SIZE ){
        // Z and X shows whrere the camera is pointing
        // R is where the camera actually is
        this.theta_x = theta_x ;
        this.theta_y = theta_y ;
        this.SCREEN_SIZE = SCREEN_SIZE ;
        this.R = R ;
        this.Z = [0,0,0] ;
        this.Y = [0,0,0] ;
        this.X = [0,0,0] ;
        this.Z[0] = Z[0] ;
        this.Z[1] = Z[1] ;
        this.Z[2] = Z[2] ;
        this.X[0] = X[0] ;
        this.X[1] = X[1] ;
        this.X[2] = X[2] ;
        this.Y[0] = this.Z[1] * this.X[2] - this.Z[2] * this.X[1] ;
        this.Y[1] = this.Z[2] * this.X[0] - this.X[2] * this.Z[0] ; 
        this.Y[2] = this.Z[0] * this.X[1] - this.Z[1] * this.X[0] ;
    }
    get_point_position( point ){
        const dr = [0,0,0] ;
        for(let i = 0  ; i < 3 ; i++){
            dr[i] = point.r[i] - this.R[i] ;
        }
        let x_image = dot_product( dr , this.X ) / dot_product( dr , this.Z ) ;
        let y_image = dot_product( dr , this.Y ) / dot_product( dr , this.Z ) ;
        x_image = this.SCREEN_SIZE[0] * x_image / Math.tan(this.theta_x) ;
        y_image = this.SCREEN_SIZE[1] * y_image / Math.tan(this.theta_y) ;
        const ret = [ x_image , y_image ] ;
        return ret ;
    }
    draw_shape( ctx , shape , x_0 , y_0 ){
        
        for(let i = 0 ; i < shape.n ; i++){
            for(let j = i+1 ; j < shape.n ; j++){
                if( shape.adj[i][j] == 1 ){
                    ctx.beginPath() ;
                    let pos1 = this.get_point_position(shape.point[i]) ;
                    let pos2 = this.get_point_position(shape.point[j]) ;
                    ctx.moveTo( x_0 + pos1[0] , y_0 + pos1[1] ) ;
                    ctx.lineTo( x_0 + pos2[0] , y_0 + pos2[1]) ;
                    ctx.stroke() ;
                    ctx.closePath() ;
                }
            }
        }
        
    }

};