import { useMutation } from '@apollo/client';
import { addOrderDetails, addOrder } from '../mutations/mutations';

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
    }
    return handleCreateOrder;
}
