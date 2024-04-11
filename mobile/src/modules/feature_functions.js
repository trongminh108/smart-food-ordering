export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

// export const updateState(setState, data){
//     setState((pre)=> {...pre, data});
// }
