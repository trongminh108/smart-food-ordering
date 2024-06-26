import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import {
    addOrderDetails,
    addOrder,
    login,
    registerUser,
    updateOrder,
} from './mutations';
import { getOrderByID, getOrdersByUserID } from '../queries/orders';
import { getAgentByID, getAllAgents } from '../queries/agents';
import { loginWithFaceID } from './auth';

export function useAddOrderDetailsMutation() {
    const [createOrderDetails] = useMutation(addOrderDetails);

    async function handleCreateOrderDetails(orderDetails) {
        try {
            const { data } = await createOrderDetails({
                variables: {
                    createOrderDetailInput: orderDetails,
                },
                update: updateCacheAddOrderDetails,
            });
            return data.createOrderDetail;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    return handleCreateOrderDetails;
}

export function useAddOrderMutation() {
    const [createOrder] = useMutation(addOrder);

    async function handleCreateOrder(order) {
        try {
            const { data } = await createOrder({
                variables: {
                    createOrderInput: order,
                },
                update: updateCacheAddOrder,
            });
            return data.createOrder;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleCreateOrder;
}

export function useLoginMutation() {
    const [loginFunc] = useMutation(login);

    async function handleLogin(username, password) {
        try {
            const { data } = await loginFunc({
                variables: {
                    username: username,
                    password: password,
                },
            });
            return data.login;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    return handleLogin;
}

export function useLoginWithFaceIDMutation() {
    const [loginFunc] = useMutation(loginWithFaceID);

    async function handleLogin(face_id) {
        try {
            const { data } = await loginFunc({
                variables: {
                    faceId: face_id,
                },
            });
            return data.loginWithFaceID;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    return handleLogin;
}

export function useRegisterMutation() {
    const [registerFunc] = useMutation(registerUser);

    async function handleRegister(username, password, gmail) {
        try {
            const { data } = await registerFunc({
                variables: {
                    username: username,
                    password: password,
                    gmail: gmail,
                },
            });
            return data.register;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleRegister;
}

export function useUpdateOrderMutation() {
    const [useUpdateOrder] = useMutation(updateOrder);

    async function handleUpdateOrder(order) {
        try {
            const { data } = await useUpdateOrder({
                variables: {
                    updateOrderInput: order,
                },
                update: cacheUpdateOrderMutation,
            });
            return data.updateOrder;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleUpdateOrder;
}

const updateCacheAddOrder = async (cache, { data: { createOrder } }) => {
    // console.log(createOrder);
    if (createOrder.id_user) {
        const data = await cache.readQuery({
            query: getOrdersByUserID,
            variables: {
                ordersByUserIdId: createOrder.id_user,
            },
        });
        if (data) {
            const newData = {
                ordersByUserID: [createOrder, ...data?.ordersByUserID],
            };
            await cache.writeQuery({
                query: getOrdersByUserID,
                variables: {
                    ordersByUserIdId: createOrder.id_user,
                },
                data: newData,
            });
            // console.log('In data cache: ', newData);
        }
    }
};

const cacheUpdateOrderMutation = async (cache, { data: { updateOrder } }) => {
    if (updateOrder.id_user) {
        const data = await cache.readQuery({
            query: getOrdersByUserID,
            variables: {
                ordersByUserIdId: updateOrder.id_user,
            },
        });
        if (data) {
            const newData = data.ordersByUserID.map((order) => {
                if (order.id === updateOrder.id) {
                    return { ...order, ...updateOrder };
                }
                return order;
            });
            await cache.writeQuery({
                query: getOrdersByUserID,
                variables: {
                    ordersByUserIdId: updateOrder.id_user,
                },
                data: { ordersByUserID: newData },
            });
            // console.log('In data cache: ', newData);
        }
    }
};

export const updateCacheAddOrderDetails = async (
    cache,
    { data: createOrderDetail }
) => {
    // const data = await cache.readQuery({
    //     query: getOrderByID,
    //     variables: {
    //         orderId: createOrderDetail.id_order,
    //     },
    // });
    // console.log('[DATA]: ', createOrderDetail);
    // if (data) {
    //     if (!data.has('order_details')) data.set(order_details, []);
    //     data.order_details.push(createOrderDetail);
    //     const dataOrders = await cache.readQuery({
    //         query: getOrdersByUserID,
    //         variables: {
    //             ordersByUserIdId: data.id_user,
    //         },
    //     });
    //     if (dataOrders) {
    //         const newData = dataOrders.ordersByUserID.map((order) => {
    //             if (order.id === data.id) {
    //                 return { ...order, ...data };
    //             }
    //             return order;
    //         });
    //         await cache.writeQuery({
    //             query: getOrdersByUserID,
    //             variables: {
    //                 ordersByUserIdId: updateOrder.id_user,
    //             },
    //             data: { ordersByUserID: newData },
    //         });
    //     }
    // }
};
