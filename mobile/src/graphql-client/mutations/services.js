import { useMutation } from '@apollo/client';
import { addOrderDetails, addOrder, login, registerUser } from './mutations';

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
