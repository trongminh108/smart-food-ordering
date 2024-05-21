export const greedyHamiltonianPath = (graph, start) => {
    const n = graph.length;
    const visited = new Array(n).fill(false);
    const path = [start];
    let current = start;
    visited[start] = true;
    let totalCost = 0;

    for (let i = 0; i < n - 1; i++) {
        let next = -1;
        let minCost = Infinity;

        for (let j = 0; j < n; j++) {
            if (!visited[j] && graph[current][j] < minCost) {
                next = j;
                minCost = graph[current][j];
            }
        }

        if (next !== -1) {
            visited[next] = true;
            path.push(next);
            totalCost += minCost;
            current = next;
        }
    }

    // Add the cost to return to the start to form a cycle
    totalCost += graph[current][start];
    path.push(start);

    return { path, totalCost };
};
