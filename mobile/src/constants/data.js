export const USERS = [
    {
        id: '661884fb903a56f42717e85c',
        username: 'limbo_sfo',
        full_name: 'limbo coffee',
        password: 'limbo_sfo',
        gmail: 'limbo_sfo@gmail.com',
        avatar: 'limbo2.jpg',
        phone_number: '0772104719',
        current_address: 'An Giang',
        delivery_address: 'An Giang',
        position: [10.387973895202244, 105.42367147467304],
        is_agent: true,
        is_deliver: false,
        face_recognition: '',
    },
    {
        id: '66188519903a56f42717e85e',
        username: 'trongminh108',
        full_name: 'Luu Minh Trong',
        password: 'trongminh108',
        gmail: 'lmtrong.ctc2020@gmail.com',
        avatar: 'Logo.png',
        phone_number: '0772104719',
        current_address: 'An Giang',
        delivery_address: 'An Giang',
        position: [10.400696929273314, 105.5029581237249],
        is_agent: false,
        is_deliver: false,
        face_recognition: '',
    },
    {
        id: '66188536903a56f42717e860',
        username: 'trongminh_deliver',
        full_name: 'Minh Deliver',
        password: 'trongminh_deliver',
        gmail: 'luuminhtrong1412@gmail.com',
        avatar: '',
        phone_number: '0799913081',
        current_address: 'An Giang',
        delivery_address: 'An Giang',
        position: [10.400696929273314, 105.5029581237249],
        is_agent: false,
        is_deliver: true,
        face_recognition: '',
    },
    {
        id: '66188743903a56f42717e864',
        username: 'quephat_agent',
        full_name: 'Que Phat',
        password: 'quephat_agent',
        gmail: 'quephat_sfo1412@gmail.com',
        avatar: '',
        phone_number: '0799913081',
        current_address: 'An Giang',
        delivery_address: 'An Giang',
        position: [10.377884789653113, 105.44100996598907],
        is_agent: true,
        is_deliver: false,
        face_recognition: '',
    },
];

export const AGENTS = [
    {
        id: '661885da903a56f42717e862',
        id_user: '661884fb903a56f42717e85c',
        name: 'LIMBO COFFEE',
        address: 'An Giang',
        position: [10.387973895202244, 105.42367147467304],
        avatar: 'limbo2.jpg',
        images: ['limbo1.jpg'],
        phone_number: '0772104719',
        rating: 4.5,
        comments_quantity: 100,
    },
    {
        id: '6618887e903a56f42717e866',
        id_user: '66188743903a56f42717e864',
        name: 'QUÁN CƠM QUẾ PHÁT',
        address: 'An Giang',
        position: [10.377884789653113, 105.44100996598907],
        avatar: 'quephat1.jpg',
        images: ['quephat1.jpg'],
        phone_number: '0772104719',
        rating: 4.4,
        comments_quantity: 99,
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

    {
        id_category: '66188985fba92ebee6e166da',
        id_agent: '6618887e903a56f42717e866',
        name: 'Cơm sườn',
        images: ['comsuon.jpg'],
        description: '',
        sold: 305,
        price: 30000,
        rating: 4.5,
    },
    {
        id_category: '66188985fba92ebee6e166da',
        id_agent: '6618887e903a56f42717e866',
        name: 'Cơm gà xối mỡ',
        images: ['comgaxoimo.jpg'],
        description: '',
        sold: 315,
        price: 30000,
        rating: 4.5,
    },
    {
        id_category: '66188985fba92ebee6e166db',
        id_agent: '6618887e903a56f42717e866',
        name: 'Phở',
        images: ['pho.jpg'],
        description: '',
        sold: 400,
        price: 25000,
        rating: 4.5,
    },
    {
        id_category: '66188985fba92ebee6e166db',
        id_agent: '6618887e903a56f42717e866',
        name: 'Hủ Tiếu',
        images: ['hutieu.jpg'],
        description: '',
        sold: 100,
        price: 25000,
        rating: 4,
    },
];

export const DELIVERS = [
    {
        id: '66189048903a56f42717e86a',
        id_user: '66188536903a56f42717e860',
        phone_number: '0772104719',
        rating: 4.2,
        comments_quantity: 10,
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
