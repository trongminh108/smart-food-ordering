export const USERS = [
    {
        id: '1',
        username: 'limbo_sfo',
        full_name: 'limbo coffee',
        password: 'limbo_sfo',
        gmail: 'limbo_sfo@gmail.com',
        avatar: '',
        phone_number: '0772104719',
        current_address: [],
        delivery_address: [],
        is_agent: true,
        is_deliver: false,
        face_recognition: '',
    },
    {
        id: '2',
        username: 'trongminh108',
        full_name: 'Luu Minh Trong',
        password: 'trongminh108',
        gmail: 'lmtrong.ctc2020@gmail.com',
        avatar: '',
        phone_number: '0772104719',
        current_address: [10.400696929273314, 105.5029581237249],
        delivery_address: [],
        is_agent: false,
        is_deliver: false,
        face_recognition: '',
    },
    {
        id: '3',
        username: 'trongminh_deliver',
        full_name: 'Minh Deliver',
        password: 'trongminh_deliver',
        gmail: 'luuminhtrong1412@gmail.com',
        avatar: '',
        phone_number: '0799913081',
        current_address: [10.400696929273314, 105.5029581237249],
        delivery_address: [],
        is_agent: false,
        is_deliver: true,
        face_recognition: '',
    },
];

export const AGENTS = [
    {
        id: '1',
        id_user: '1',
        name: 'LIMBO COFFEE',
        address: [10.387973895202244, 105.42367147467304],
        avatar: '',
        images: ['../../../assets/images/limbo_agents/limbo1.jpg'],
        phone_number: '0772104719',
        rating: 4.5,
        comments: 100,
    },
];

export const CATEGORIES = [
    { id: '1', name: 'Nước' },
    { id: '2', name: 'Cơm' },
    { id: '3', name: 'Món nước' },
    { id: '4', name: 'Cà phê' },
    { id: '5', name: 'Nước ép' },
    { id: '6', name: 'Sinh tố' },
    { id: '7', name: 'Nước ngọt' },
    { id: '8', name: 'Trà' },
];

export const PRODUCTS = [
    {
        id: '1',
        id_category: '4',
        id_agent: '1',
        name: 'Cà phê',
        images: ['../../../assets/images/products/cf.jpg'],
        image: require('../../assets/images/products/cf.jpg'),
        description: '',
        sold: 150,
        price: 15000,
        rating: 3.5,
    },
    {
        id: '2',
        id_category: '8',
        id_agent: '1',
        name: 'Lipton',
        images: ['../../../assets/images/products/lipton.jpg'],
        image: require('../../assets/images/products/lipton.jpg'),
        description: '',
        sold: 200,
        price: 20000,
        rating: 4,
    },
    {
        id: '3',
        id_category: '4',
        id_agent: '1',
        name: 'Cà phê sữa',
        images: ['../../../assets/images/products/cfsua.jpg'],
        image: require('../../assets/images/products/cfsua.jpg'),
        description: '',
        sold: 130,
        price: 20000,
        rating: 4,
    },
    {
        id: '4',
        id_category: '8',
        id_agent: '1',
        name: 'Trà đào',
        images: ['../../../assets/images/products/tradao.jpg'],
        image: require('../../assets/images/products/tradao.jpg'),
        description: '',
        sold: 250,
        price: 30000,
        rating: 4,
    },
    {
        id: '5',
        id_category: '5',
        id_agent: '1',
        name: 'Nước ép cam',
        images: ['../../../assets/images/products/camep.jpg'],
        image: require('../../assets/images/products/camep.jpg'),
        description: '',
        sold: 300,
        price: 25000,
        rating: 4,
    },
];

export const DELIVERS = [
    {
        id: '1',
        id_user: '3',
        phone_number: '0772104719',
        rating: '4.2',
        comment: 10,
    },
];

export const ORDERS = [
    {
        id: '1',
        id_agent: '1',
        id_deliver: '1',
        id_user: '2',
        address: 'An Giang',
        distance: 11.4,
        delivery_fee: 0,
        discount: 0,
        total_price: 0,
        //pending, active, success, failed
        status: 'pending',
    },
];
