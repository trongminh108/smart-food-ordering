import { useQuery, useLazyQuery } from '@apollo/client';
import { getDistanceDurationOSM } from '../apollo-client/queries/open_street_map';
import { OPEN_STREET_MAP_DISTANCE_MATRIX_API } from '../constants/backend';
import axios from 'axios';

async function getDistanceDuration(origin, destination) {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=false`;
    const data = await axios.get(url);
    const res = data.data.routes[0];
    return {
        distance: res.distance,
        duration: res.duration,
    };
}

export async function ConvertOrdersToGraph(origin, orders) {
    const positions = [
        [origin.lat, origin.lng],
        ...orders.map((order) => order.position),
    ];
    const length = positions.length;
    const graph = Array.from({ length }, () => Array(length).fill(0));

    // Tạo list các promises API
    const promises = [];

    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            promises.push(
                getDistanceDuration(positions[i], positions[j]).then((tmp) => ({
                    i,
                    j,
                    distance: tmp.distance,
                }))
            );
        }
    }

    // Thực hiện tất cả API đồng thời và cập nhật đồ thị
    const results = await Promise.all(promises);

    results.forEach(({ i, j, distance }) => {
        graph[i][j] = distance;
        if (i != 0) graph[j][i] = distance; //đồ thị vô hướng
    });

    return graph;
}

export function SortGraph(graph, k = 0) {
    const n = graph.length;
    // const newGraph = [...graph.map((arr) => [...arr])];
    let res = Array(n)
        .fill()
        .map((_, index) => index);
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (graph[k][i] > graph[k][j]) {
                // for (let m = 0; m < n; m++) {
                //     const tmp = graph[m][i];
                //     graph[m][i] = graph[m][j];
                //     graph[m][j] = tmp;
                // }
                // res = graph.forEach((arr) => {
                //     const tmp = arr[i];
                //     arr[i] = arr[j];
                //     arr[j] = tmp;
                // });
                const tmp = res[i];
                res[i] = res[j];
                res[j] = tmp;
            }
        }
    }
    return res;
}
