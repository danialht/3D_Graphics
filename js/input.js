table = document.getElementById("table_of_points");
let point_count = 0;
let is_first_index = 1;
let first_index;
function get_index(index) {
    if (is_first_index) {
        if (shape.n == 1) return;
        document.getElementById("btn_" + index).hidden = 1;
        let count = 0;
        for (let i = 0; i < shape.n; i++) {
            if (shape.adj[index][i]) {
                count++;
                document.getElementById("btn_" + i).className = "btn_disconnect";
                document.getElementById("btn_" + i).value = "Disconnect";
            }
        }
        is_first_index = 0;
        first_index = index;
    }
    else {
        for (let i = 0; i < shape.n; i++) {
            document.getElementById("btn_" + i).className = "btn_connect";
            document.getElementById("btn_" + i).value = "Connect";
            document.getElementById("btn_" + i).hidden = 0;
        }
        shape.adj[index][first_index] ^= 1;
        shape.adj[first_index][index] ^= 1;
        is_first_index = 1;

        mainCamera.draw_shape(ctx, shape, WIDTH / 2, HEIGHT / 2);
    }
}


function add_point() {
    let x = String(parseInt(document.getElementById("x_input").value));
    let y = String(parseInt(document.getElementById("y_input").value));
    let z = String(parseInt(document.getElementById("z_input").value));
    if (x == "NaN" || y == "NaN" || z == "NaN") return;
    let index = point_count;
    str = "<tr id = \"row_" + index + "\"><td>" + index + "</td><td>" + x + "</td><td>" + y + "</td><td>" + z + "</td>" + "<td><input type = \"button\" id = \"btn_" + index + "\" class = \"btn_connect\" value = \"Connect\" onclick = \"get_index(" + index + ")\">"
    //str += "<input type = \"button\" value = \"Remove\" class = \"remove_button\" onclick = \"remove_button(" + index + ")\"></td></tr>"
    table.innerHTML += str;
    point_count++;
    shape.add_point(parseInt(x), parseInt(y), parseInt(z));
    mainCamera.draw_shape(ctx, shape, WIDTH / 2, HEIGHT / 2);
}