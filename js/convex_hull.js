
class convex_hull_algo1 {

    constructor(pts, n) {
        this.pts = [];
        for (let i = 0; i < n; i++) {
            this.pts.push(pts[i].r);
        }
        this.vertex = new Set();
        this.n = n;
    }

    solve(shape) {
        let test = false;
        let pos;
        let neg;
        let zero;
        const new_adj = shape.adj;
        for (let i = 0; i < this.n; i++) {
            for (let j = i + 1; j < this.n; j++) {
                for (let k = j + 1; k < this.n; k++) {
                    if (j == 5 && k == 6) test = true;
                    zero = 0;
                    neg = 0;
                    pos = 0;
                    for (let x = 0, u; x < this.n; x++) {
                        if (x == i || x == j || x == k) continue;
                        // vec(i,j) * vec(i,k) . vec(i,x)
                        u = dot_product(cross_product(vec_from_to(this.pts[i], this.pts[j]), vec_from_to(this.pts[i], this.pts[k])), vec_from_to(this.pts[i], this.pts[x]));
                        if (u == 0) zero++;
                        else if (u > 0) pos++;
                        else neg++;
                    }
                    if (neg == 0 || pos == 0) {
                        //alert( '(i,j,k) = (' + i + ',' + j + ',' + k + ')' ) ;
                        //alert( zero + ',' + neg + ',' + pos ) ;
                        this.vertex.add(i);
                        this.vertex.add(j);
                        this.vertex.add(k);
                        new_adj[i][j] = 1;
                        new_adj[i][k] = 1;
                        new_adj[k][j] = 1;
                        new_adj[j][i] = 1;
                        new_adj[k][i] = 1;
                        new_adj[j][k] = 1;
                    }

                }
            }
        }
        return new_adj;
    }

    get_vertices() {
        const ans = [];
        let it = this.vertex.values();
        for (const v of it) {
            ans.push(v);
        }
        return ans;
    }

};