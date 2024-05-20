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
    const n = orders.length + 1;
    const positions = [
        [origin.lat, origin.lng],
        ...orders.map((order) => order.position),
    ];
    const graph = Array(n)
        .fill()
        .map(() => Array(n).fill(0));
    const length = positions.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            const tmp = await getDistanceDuration(positions[i], positions[j]);
            graph[i][j] = tmp.distance;
            if (i != 0) graph[j][i] = tmp.distance;
        }
    }
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
