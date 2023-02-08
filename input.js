table = document.getElementById("table_of_points") ;
let point_count = 0 ;
let is_first_index = 1 ;
let first_index ;
function get_index(index){
    if(is_first_index){
        document.getElementById("btn_" + index).hidden = 1 ;
        let count = 0 ;
        for(let i = 0 ; i < shape.n ; i++){
            if(adj[index][i]){ count++ ; document.getElementById("btn_" + i).hidden = 1 ;}
        }
        if(count == shape.n - 1 ){
            for(let i = 0 ; i < shape.n ; i++){
                document.getElementById("btn_" + i).hidden = 0 ;
            }
            return ;
        }
        is_first_index = 0 ;
        first_index = index ;
    }
    else{
        for(let i = 0 ; i < shape.n ; i++) document.getElementById("btn_" + i).hidden = 0 ;
        shape.adj[index][first_index] = 1 ;
        shape.adj[first_index][index] = 1 ;
        is_first_index = 1 ;
        mainCamera.draw_shape( ctx , shape , WIDTH/2 , HEIGHT/2 ) ;
    }
}

function add_point(){
    let x = document.getElementById("x_input").value ;
    let y = document.getElementById("y_input").value ;
    let z = document.getElementById("z_input").value ;
    if( !x.length || !y.length || !z.length ) return ;
    let index = point_count;
    str = "<tr><td>" + index + "</td><td>" + x + "</td><td>" + y + "</td><td>" + z + "</td>" + "<td><input id = \"btn_"+index+"\" type = \"button\" onclick = \"get_index("+index+")\" value = \"Connect\"></td></tr>"
    table.innerHTML += str ;
    point_count++ ;
    update_shape( x , y , z ) ;
}