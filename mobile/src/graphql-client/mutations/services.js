import { useLazyQuery, useMutation } from '@apollo/client';
import {
    addOrderDetails,
    addOrder,
    login,
    registerUser,
    updateOrder,
} from './mutations';
import { getOrdersByUserID } from '../queries/orders';
import { getAgentByID, getAllAgents } from '../queries/agents';

export function useAddOrderDetailsMutation() {
    const [createOrderDetails] = useMutation(addOrderDetails);

    async function handleCreateOrderDetails(orderDetails) {
        try {
            const { data } = await createOrderDetails({
                variables: {
                    createOrderDetailInput: orderDetails,
                },
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
                update: updateCacheOrder,
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
            });
            return data.updateOrder;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    return handleUpdateOrder;
}

const updateCacheOrder = async (cache, { data: { createOrder } }) => {
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
