// . Tổ chức dữ liệu:
// 	+ graph[n][n]: matrix trọng số của đồ thị n đỉnh
// 	+ distance[n]: list lưu trữ khoảng cách từ đỉnh s đến các đỉnh còn lại
// 	+ isVisit[n]: list kiểm tra các đỉnh đã có độ dài tối ưu từ đỉnh s hay chưa
//  + previous[n]: previous[i]=j thì đỉnh j là đỉnh trước của đỉnh i trên đường đi ngắn nhất

export default class Dijkstra {
    static INFINITY = Number.MAX_SAFE_INTEGER;

    constructor(graph, start) {
        this.graph = graph;
        this.n = graph.length;
        this.previous = Array(this.n).fill(start);
        this.isVisit = Array(this.n).fill(false);
        this.isVisit[start] = true;
        for (let i = 0; i < this.n; i++)
            for (let j = 0; j < this.n; j++)
                if (i != j && this.graph[i][j] === 0)
                    this.graph[i][j] = Dijkstra.INFINITY;
        this.d = [...this.graph[start]];
    }

    ReGenGraph() {
        const tmp = [
            ...this.graph.map((arr, idx) => {
                if (idx === 0) return null;
                arr.shift();
                // arr[0] = 0;
                return arr;
            }),
        ];
        console.log('[Re GRAPH]: ', tmp);
    }

    Solve() {
        for (let i = 0; i < this.n - 1; i++) {
            let min = Dijkstra.INFINITY;
            let u = null;
            for (let j = 0; j < this.n; j++) {
                if (min > this.d[j] && !this.isVisit[j]) {
                    min = this.d[j];
                    u = j;
                }
                if (u) this.isVisit[u] = true;
            }
            for (let v = 0; v < this.n; v++) {
                if (!this.isVisit[v]) {
                    const tmp = this.d[u] + this.graph[u][v];
                    if (this.d[v] > tmp) {
                        this.d[v] = tmp;
                        this.previous[v] = u;
                    }
                }
            }
        }
        return {
            duration: this.d,
            previous: this.previous,
        };
    }
}
