const tspBruteForce = (graph) => {
    const vertices = graph.length;
    const permutations = getPermutations([...Array(vertices).keys()].slice(1)); // Lấy tất cả các hoán vị của các đỉnh (trừ đỉnh 0)

    let minPath = [];
    let minCost = Infinity;

    for (let perm of permutations) {
        const currentCost = calculatePathCost(graph, [0, ...perm, 0]);
        if (currentCost < minCost) {
            minCost = currentCost;
            minPath = [0, ...perm, 0];
        }
    }

    return { minPath, minCost };
};

const calculatePathCost = (graph, path) => {
    let cost = 0;
    for (let i = 0; i < path.length - 1; i++) {
        cost += graph[path[i]][path[i + 1]];
    }
    return cost;
};

const getPermutations = (array) => {
    if (array.length === 0) return [[]];
    const result = [];

    array.forEach((item, index) => {
        const rest = [...array.slice(0, index), ...array.slice(index + 1)];
        const restPerms = getPermutations(rest);
        restPerms.forEach((perm) => {
            result.push([item, ...perm]);
        });
    });

    return result;
};

// Ví dụ sử dụng
const graph = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0],
];

const { minPath, minCost } = tspBruteForce(graph);
console.log(`Đường đi Hamilton có trọng số nhỏ nhất: ${minPath}`);
console.log(`Tổng trọng số: ${minCost}`);
