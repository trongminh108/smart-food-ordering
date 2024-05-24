import { useMutation } from '@apollo/client';
import {
    addOrderDetails,
    addOrder,
    login,
    registerUser,
    updateOrder,
} from './mutations';
import { getOrdersByAgentID, getOrdersByUserID } from '../queries/orders';
import {
    addProduct,
    removeProduct,
    updateProduct,
} from '../mutations/products';

import { updateAgent, removeAgent } from './agent';

//============================================== PRODUCTS ==================================================
export function useAddProductMutation() {
    const [createProduct] = useMutation(addProduct);

    async function handleCreateProduct(product) {
        try {
            const { data } = await createProduct({
                variables: {
                    createProductInput: product,
                },
            });
            return data.createProduct;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleCreateProduct;
}

export function useUpdateProductMutation() {
    const [UpdateProduct] = useMutation(updateProduct);

    async function handleUpdateProduct(product) {
        try {
            const { data } = await UpdateProduct({
                variables: {
                    updateProductInput: product,
                },
            });
            return data.updateProduct;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleUpdateProduct;
}

export function useRemoveProductMutation() {
    const [RemoveProduct] = useMutation(removeProduct);

    async function handleRemoveProduct(id) {
        try {
            const { data } = await RemoveProduct({
                variables: {
                    removeProductId: id,
                },
            });
            return data.removeProduct;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleRemoveProduct;
}

//============================================== AUTH ==================================================
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

//============================================== ORDERS ==================================================
export function useUpdateOrderMutation() {
    const [UpdateOrder] = useMutation(updateOrder);

    async function handleUpdateOrder(order) {
        try {
            const { data } = await UpdateOrder({
                variables: {
                    updateOrderInput: order,
                },
                // update: cacheUpdateOrderMutation,
                // refetchQueries: {
                //     query: getOrdersByAgentID,
                //     variables: {
                //         ordersByAgentIdId: order.id_agent,
                //     },
                // },
            });
            return data.updateOrder;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleUpdateOrder;
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

//============================================== ORDER DETAILS==================================================
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

//============================================== FACE ID AUTH ==================================================
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

//============================================== AGENT ==================================================
export function useUpdateAgentMutation() {
    const [UpdateAgent] = useMutation(updateAgent);

    async function handleUpdateAgent(agent) {
        try {
            const { data } = await UpdateAgent({
                variables: {
                    updateAgentInput: agent,
                },
            });
            return data.updateAgent;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleUpdateAgent;
}

export function useRemoveAgentMutation() {
    const [RemoveAgent] = useMutation(removeAgent);

    async function handleRemoveAgent(id) {
        try {
            const { data } = await RemoveAgent({
                variables: {
                    removeAgentId: id,
                },
            });
            return data.removeAgent;
        } catch (error) {
            console.log('[SERVICES REMOVE AGENT]: ', error);
        }
        return null;
    }
    return handleRemoveAgent;
}
