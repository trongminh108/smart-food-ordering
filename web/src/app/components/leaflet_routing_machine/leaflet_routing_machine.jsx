import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';
import { useAuth } from '@/app/contexts/auth_context';
import { ConvertOrdersToGraph, SortGraph } from '@/app/modules/directions';
import Dijkstra from '@/app/modules/dijkstra';

const SIZE_MARKER = [30, 30];
const agentMarker = L.icon({
    iconUrl: '/icons/green_map_marker.png',
    iconSize: SIZE_MARKER,
});

const defaultMarker = L.icon({
    iconUrl: '/icons/blue_map_marker.png',
    iconSize: SIZE_MARKER,
});
L.Marker.prototype.options.icon = defaultMarker;

const LeafletRoutingMachine = ({
    origin,
    ordersDeliver,
    orders,
    onClickOrderMarker,
}) => {
    const map = useMap();
    const { authState } = useAuth();

    useEffect(() => {
        async function getDirections() {
            const graph = await ConvertOrdersToGraph(origin, ordersDeliver);
            // const dijkstra = new Dijkstra(graph, 0);
            // const res = dijkstra.Solve();
            const newGraph = SortGraph(graph);
            console.log('[GRAPH]: ', graph);
            console.log('[NEW GRAPH]: ', newGraph);
        }
        getDirections();

        const waypoints = [L.latLng(origin.lat, origin.lng)];
        ordersDeliver.forEach((order) => {
            const pos = L.latLng(order.position[0], order.position[1]);
            waypoints.push(pos);
        });

        const control = L.Routing.control({
            waypoints: waypoints,
            lineOptions: {
                styles: [
                    {
                        color: 'blue',
                        weight: 4,
                        opacity: 0.7,
                    },
                ],
            },
            show: true,
            draggableWaypoints: false,
        }).addTo(map);

        orders.forEach((order, index) => {
            const marker = L.marker(
                L.latLng(order.position[0], order.position[1])
            ).addTo(map);
            marker.bindPopup(order.recipient);
            marker.on('mouseover', (e) => {
                e.target.openPopup();
            });
            marker.on('mouseout', (e) => {
                e.target.closePopup();
            });
            marker.on('click', (e) => onClickOrderMarker(e, order));
        });

        const agentMarkerEvent = L.marker([origin.lat, origin.lng], {
            icon: agentMarker,
        }).addTo(map);
        agentMarkerEvent.bindPopup(authState?.user?.agent?.name || 'NO NAME');
        agentMarkerEvent.on('mouseover', (e) => {
            e.target.openPopup();
        });
        agentMarkerEvent.on('mouseout', (e) => {
            e.target.closePopup();
        });
        agentMarkerEvent.on('click', (e) => console.log('[AGENT MARKER]: ', e));

        return () => {
            map.removeControl(control);
        };
    }, [map, orders, origin, ordersDeliver]);
    return null;
};

export default LeafletRoutingMachine;
