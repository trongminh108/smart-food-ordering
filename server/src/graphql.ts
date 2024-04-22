
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateAgentInput {
    id_user?: Nullable<string>;
    name?: Nullable<string>;
    address?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    avatar?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    phone_number?: Nullable<string>;
    rating?: Nullable<number>;
    comments_quantity?: Nullable<number>;
}

export class UpdateAgentInput {
    id: string;
    id_user?: Nullable<string>;
    name?: Nullable<string>;
    address?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    avatar?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    phone_number?: Nullable<string>;
    rating?: Nullable<number>;
    comments_quantity?: Nullable<number>;
}

export class CreateCategoryInput {
    id: string;
    name?: Nullable<string>;
}

export class UpdateCategoryInput {
    id: string;
    name?: Nullable<string>;
}

export class CreateCommentInput {
    id_reviewer?: Nullable<string>;
    id_object?: Nullable<string>;
    comment_content?: Nullable<string>;
    rating?: Nullable<number>;
}

export class UpdateCommentInput {
    id: string;
    id_reviewer?: Nullable<string>;
    id_object?: Nullable<string>;
    comment_content?: Nullable<string>;
    rating?: Nullable<number>;
}

export class CreateDeliverInput {
    id_user?: Nullable<string>;
    phone_number?: Nullable<string>;
    rating?: Nullable<number>;
    comments_quantity?: Nullable<number>;
}

export class UpdateDeliverInput {
    id: string;
    id_user?: Nullable<string>;
    phone_number?: Nullable<string>;
    rating?: Nullable<number>;
    comments_quantity?: Nullable<number>;
}

export class CreateFavoriteInput {
    exampleField?: Nullable<number>;
}

export class UpdateFavoriteInput {
    id: number;
}

export class CreateLocationInput {
    exampleField?: Nullable<number>;
}

export class UpdateLocationInput {
    id: number;
}

export class LocationInput {
    lat?: Nullable<number>;
    lng?: Nullable<number>;
}

export class CreateOrderInput {
    id_agent?: Nullable<string>;
    id_deliver?: Nullable<string>;
    id_user?: Nullable<string>;
    recipient?: Nullable<string>;
    phone_number?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    address?: Nullable<string>;
    distance?: Nullable<number>;
    delivery_fee?: Nullable<number>;
    discount?: Nullable<number>;
    total_quantity?: Nullable<number>;
    total_price?: Nullable<number>;
    status?: Nullable<string>;
}

export class UpdateOrderInput {
    id: string;
    id_agent?: Nullable<string>;
    id_deliver?: Nullable<string>;
    id_user?: Nullable<string>;
    recipient?: Nullable<string>;
    phone_number?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    address?: Nullable<string>;
    distance?: Nullable<number>;
    delivery_fee?: Nullable<number>;
    discount?: Nullable<number>;
    total_quantity?: Nullable<number>;
    total_price?: Nullable<number>;
    status?: Nullable<string>;
}

export class CreateOrderDetailInput {
    id_order?: Nullable<string>;
    id_product?: Nullable<string>;
    quantity?: Nullable<number>;
    discount?: Nullable<number>;
    subtotal?: Nullable<number>;
}

export class UpdateOrderDetailInput {
    id: string;
    id_order?: Nullable<string>;
    id_product?: Nullable<string>;
    quantity?: Nullable<number>;
    discount?: Nullable<number>;
    subtotal?: Nullable<number>;
}

export class CreatePaymentDetailInput {
    id_user?: Nullable<string>;
    id_order?: Nullable<string>;
    payment_method?: Nullable<string>;
    id_transaction?: Nullable<string>;
    total_paid?: Nullable<number>;
}

export class UpdatePaymentDetailInput {
    id: string;
    id_user?: Nullable<string>;
    id_order?: Nullable<string>;
    payment_method?: Nullable<string>;
    id_transaction?: Nullable<string>;
    total_paid?: Nullable<number>;
}

export class CreateProductInput {
    id_category?: Nullable<string>;
    id_agent?: Nullable<string>;
    name?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    description?: Nullable<string>;
    sold?: Nullable<number>;
    price?: Nullable<number>;
    rating?: Nullable<number>;
}

export class UpdateProductInput {
    id: string;
    id_category?: Nullable<string>;
    id_agent?: Nullable<string>;
    name?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    description?: Nullable<string>;
    sold?: Nullable<number>;
    price?: Nullable<number>;
    rating?: Nullable<number>;
}

export class CreateUserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
    full_name?: Nullable<string>;
    gmail?: Nullable<string>;
    avatar?: Nullable<string>;
    phone_number?: Nullable<string>;
    current_address?: Nullable<string>;
    delivery_address?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    is_agent?: Nullable<boolean>;
    is_deliver?: Nullable<boolean>;
    face_recognition?: Nullable<string>;
}

export class UpdateUserInput {
    id: string;
    username?: Nullable<string>;
    password?: Nullable<string>;
    full_name?: Nullable<string>;
    gmail?: Nullable<string>;
    avatar?: Nullable<string>;
    phone_number?: Nullable<string>;
    current_address?: Nullable<string>;
    delivery_address?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    is_agent?: Nullable<boolean>;
    is_deliver?: Nullable<boolean>;
    face_recognition?: Nullable<string>;
}

export class CreateVoucherInput {
    id_agent?: Nullable<string>;
    code?: Nullable<string>;
    from?: Nullable<string>;
    to?: Nullable<string>;
    discount?: Nullable<number>;
    is_percentage?: Nullable<boolean>;
    is_valid?: Nullable<boolean>;
    is_all_products?: Nullable<boolean>;
    usage_limit?: Nullable<number>;
}

export class UpdateVoucherInput {
    id: string;
    id_agent?: Nullable<string>;
    code?: Nullable<string>;
    from?: Nullable<string>;
    to?: Nullable<string>;
    discount?: Nullable<number>;
    is_percentage?: Nullable<boolean>;
    is_valid?: Nullable<boolean>;
    is_all_products?: Nullable<boolean>;
    usage_limit?: Nullable<number>;
}

export class CreateVouchersProductInput {
    id_voucher?: Nullable<string>;
    id_product?: Nullable<string>;
}

export class UpdateVouchersProductInput {
    id: string;
    id_voucher?: Nullable<string>;
    id_product?: Nullable<string>;
}

export class Agent {
    __typename?: 'Agent';
    id: string;
    id_user?: Nullable<string>;
    name?: Nullable<string>;
    address?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    avatar?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    phone_number?: Nullable<string>;
    rating?: Nullable<number>;
    comments_quantity?: Nullable<number>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract agents(): Nullable<Agent>[] | Promise<Nullable<Agent>[]>;

    abstract agent(id: string): Nullable<Agent> | Promise<Nullable<Agent>>;

    abstract agentByUserID(id: string): Nullable<Agent> | Promise<Nullable<Agent>>;

    abstract categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract comments(): Nullable<Comment>[] | Promise<Nullable<Comment>[]>;

    abstract comment(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract delivers(): Nullable<Deliver>[] | Promise<Nullable<Deliver>[]>;

    abstract deliver(id: string): Nullable<Deliver> | Promise<Nullable<Deliver>>;

    abstract favorites(): Nullable<Favorite>[] | Promise<Nullable<Favorite>[]>;

    abstract favorite(id: number): Nullable<Favorite> | Promise<Nullable<Favorite>>;

    abstract getAddressFromLocation(location: LocationInput): string | Promise<string>;

    abstract getDistanceBetweenLocation(origins: LocationInput, destinations: LocationInput): DistanceMatrix | Promise<DistanceMatrix>;

    abstract orders(): Nullable<Order>[] | Promise<Nullable<Order>[]>;

    abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract ordersByUserID(id: string): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;

    abstract ordersByAgentID(id: string): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;

    abstract orderDetails(): Nullable<OrderDetail>[] | Promise<Nullable<OrderDetail>[]>;

    abstract orderDetail(id: string): Nullable<OrderDetail> | Promise<Nullable<OrderDetail>>;

    abstract orderDetailsByOrderID(id: string): Nullable<Nullable<OrderDetail>[]> | Promise<Nullable<Nullable<OrderDetail>[]>>;

    abstract paymentDetails(): Nullable<PaymentDetail>[] | Promise<Nullable<PaymentDetail>[]>;

    abstract paymentDetail(id: string): Nullable<PaymentDetail> | Promise<Nullable<PaymentDetail>>;

    abstract products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract userByUsername(username: string): Nullable<User> | Promise<Nullable<User>>;

    abstract userByGmail(gmail: string): Nullable<User> | Promise<Nullable<User>>;

    abstract vouchers(): Nullable<Voucher>[] | Promise<Nullable<Voucher>[]>;

    abstract voucher(id: string): Nullable<Voucher> | Promise<Nullable<Voucher>>;

    abstract vouchersProducts(): Nullable<VouchersProduct>[] | Promise<Nullable<VouchersProduct>[]>;

    abstract vouchersProduct(id: string): Nullable<VouchersProduct> | Promise<Nullable<VouchersProduct>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createAgent(createAgentInput: CreateAgentInput): Agent | Promise<Agent>;

    abstract updateAgent(updateAgentInput: UpdateAgentInput): Agent | Promise<Agent>;

    abstract removeAgent(id: string): Nullable<Agent> | Promise<Nullable<Agent>>;

    abstract login(username: string, password: string): Auth | Promise<Auth>;

    abstract loginWithFaceID(face_id: string): Auth | Promise<Auth>;

    abstract register(username: string, password: string, gmail: string): User | Promise<User>;

    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract removeCategory(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;

    abstract updateComment(updateCommentInput: UpdateCommentInput): Comment | Promise<Comment>;

    abstract removeComment(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract createDeliver(createDeliverInput: CreateDeliverInput): Deliver | Promise<Deliver>;

    abstract updateDeliver(updateDeliverInput: UpdateDeliverInput): Deliver | Promise<Deliver>;

    abstract removeDeliver(id: string): Nullable<Deliver> | Promise<Nullable<Deliver>>;

    abstract createFavorite(createFavoriteInput: CreateFavoriteInput): Favorite | Promise<Favorite>;

    abstract updateFavorite(updateFavoriteInput: UpdateFavoriteInput): Favorite | Promise<Favorite>;

    abstract removeFavorite(id: number): Nullable<Favorite> | Promise<Nullable<Favorite>>;

    abstract removeGgMapApi(id: number): Nullable<GgMapApi> | Promise<Nullable<GgMapApi>>;

    abstract createOrder(createOrderInput: CreateOrderInput): Order | Promise<Order>;

    abstract updateOrder(updateOrderInput: UpdateOrderInput): Order | Promise<Order>;

    abstract removeOrder(id: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract removeOrderByUserID(id: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract removeAllDataOrder(): string | Promise<string>;

    abstract createOrderDetail(createOrderDetailInput: CreateOrderDetailInput): OrderDetail | Promise<OrderDetail>;

    abstract updateOrderDetail(updateOrderDetailInput: UpdateOrderDetailInput): OrderDetail | Promise<OrderDetail>;

    abstract removeOrderDetail(id: string): Nullable<OrderDetail> | Promise<Nullable<OrderDetail>>;

    abstract removeOrderDetailsByOrderID(id?: Nullable<string>): Nullable<Nullable<OrderDetail>[]> | Promise<Nullable<Nullable<OrderDetail>[]>>;

    abstract removeAllDataOrderDetails(): string | Promise<string>;

    abstract createPaymentDetail(createPaymentDetailInput: CreatePaymentDetailInput): PaymentDetail | Promise<PaymentDetail>;

    abstract updatePaymentDetail(updatePaymentDetailInput: UpdatePaymentDetailInput): PaymentDetail | Promise<PaymentDetail>;

    abstract removePaymentDetail(id: string): Nullable<PaymentDetail> | Promise<Nullable<PaymentDetail>>;

    abstract createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(updateProductInput: UpdateProductInput): Product | Promise<Product>;

    abstract removeProduct(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract createVoucher(createVoucherInput: CreateVoucherInput): Voucher | Promise<Voucher>;

    abstract updateVoucher(updateVoucherInput: UpdateVoucherInput): Voucher | Promise<Voucher>;

    abstract removeVoucher(id: string): Nullable<Voucher> | Promise<Nullable<Voucher>>;

    abstract createVouchersProduct(createVouchersProductInput: CreateVouchersProductInput): VouchersProduct | Promise<VouchersProduct>;

    abstract updateVouchersProduct(updateVouchersProductInput: UpdateVouchersProductInput): VouchersProduct | Promise<VouchersProduct>;

    abstract removeVouchersProduct(id: string): Nullable<VouchersProduct> | Promise<Nullable<VouchersProduct>>;
}

export class Auth {
    __typename?: 'Auth';
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export class ErrorMessage {
    __typename?: 'ErrorMessage';
    message: string;
}

export class Category {
    __typename?: 'Category';
    id: string;
    name?: Nullable<string>;
}

export class Comment {
    __typename?: 'Comment';
    id: string;
    id_reviewer?: Nullable<string>;
    id_object?: Nullable<string>;
    comment_content?: Nullable<string>;
    rating?: Nullable<number>;
}

export class Deliver {
    __typename?: 'Deliver';
    id: string;
    id_user?: Nullable<string>;
    phone_number?: Nullable<string>;
    rating?: Nullable<number>;
    comments_quantity?: Nullable<number>;
}

export class Favorite {
    __typename?: 'Favorite';
    exampleField?: Nullable<number>;
}

export class GgMapApi {
    __typename?: 'GgMapApi';
    result?: Nullable<string>;
}

export class DistanceMatrix {
    __typename?: 'DistanceMatrix';
    distance?: Nullable<number>;
    duration?: Nullable<number>;
}

export class Location {
    __typename?: 'Location';
    lat?: Nullable<number>;
    lng?: Nullable<number>;
}

export class Order {
    __typename?: 'Order';
    id: string;
    id_agent?: Nullable<string>;
    agent?: Nullable<Agent>;
    id_deliver?: Nullable<string>;
    id_user?: Nullable<string>;
    recipient?: Nullable<string>;
    order_details?: Nullable<Nullable<OrderDetail>[]>;
    user?: Nullable<User>;
    phone_number?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    address?: Nullable<string>;
    distance?: Nullable<number>;
    delivery_fee?: Nullable<number>;
    discount?: Nullable<number>;
    total_quantity?: Nullable<number>;
    total_price?: Nullable<number>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    status?: Nullable<string>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract pubInfoOrder(): string | Promise<string>;

    abstract pubNewOrder(id_agent: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract pubUserStatusOrder(id_user: string): Nullable<Order> | Promise<Nullable<Order>>;
}

export class OrderDetail {
    __typename?: 'OrderDetail';
    id: string;
    id_order?: Nullable<string>;
    id_product?: Nullable<string>;
    product?: Nullable<Product>;
    quantity?: Nullable<number>;
    discount?: Nullable<number>;
    subtotal?: Nullable<number>;
}

export class PaymentDetail {
    __typename?: 'PaymentDetail';
    id: string;
    id_user?: Nullable<string>;
    id_order?: Nullable<string>;
    payment_method?: Nullable<string>;
    id_transaction?: Nullable<string>;
    total_paid?: Nullable<number>;
}

export class Product {
    __typename?: 'Product';
    id: string;
    id_category?: Nullable<string>;
    id_agent?: Nullable<string>;
    name?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    description?: Nullable<string>;
    sold?: Nullable<number>;
    price?: Nullable<number>;
    rating?: Nullable<number>;
}

export class User {
    __typename?: 'User';
    id: string;
    username?: Nullable<string>;
    password?: Nullable<string>;
    full_name?: Nullable<string>;
    gmail?: Nullable<string>;
    avatar?: Nullable<string>;
    phone_number?: Nullable<string>;
    current_address?: Nullable<string>;
    delivery_address?: Nullable<string>;
    position?: Nullable<Nullable<number>[]>;
    is_agent?: Nullable<boolean>;
    agent?: Nullable<Agent>;
    is_deliver?: Nullable<boolean>;
    face_recognition?: Nullable<string>;
}

export class Voucher {
    __typename?: 'Voucher';
    id: string;
    id_agent?: Nullable<string>;
    code?: Nullable<string>;
    from?: Nullable<string>;
    to?: Nullable<string>;
    discount?: Nullable<number>;
    is_percentage?: Nullable<boolean>;
    is_valid?: Nullable<boolean>;
    is_all_products?: Nullable<boolean>;
    usage_limit?: Nullable<number>;
}

export class VouchersProduct {
    __typename?: 'VouchersProduct';
    id: string;
    id_voucher?: Nullable<string>;
    id_product?: Nullable<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
