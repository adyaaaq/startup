import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ----------------------
// Products
// ----------------------
export const getProducts = () => api.get('/products').then((res) => res.data);
export const getProduct = (id) =>
    api.get(`/products/${id}`).then((res) => res.data);
export const createProduct = (data) =>
    api.post('/products', data).then((res) => res.data);
export const updateProduct = (id, data) =>
    api.put(`/products/${id}`, data).then((res) => res.data);
export const deleteProduct = (id) =>
    api.delete(`/products/${id}`).then((res) => res.data);

// ----------------------
// Users
// ----------------------
export const getUsers = () => api.get('/users').then((res) => res.data);
export const getUser = (id) => api.get(`/users/${id}`).then((res) => res.data);
export const createUser = (data) =>
    api.post('/users', data).then((res) => res.data);
export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data).then((res) => res.data);
export const deleteUser = (id) =>
    api.delete(`/users/${id}`).then((res) => res.data);
export const loginUser = (data) =>
    api.post('/users/login', data).then((res) => res.data);

// ----------------------
// Orders
// ----------------------
export const getOrders = () => api.get('/orders').then((res) => res.data);
export const getOrdersByUser = (userId) =>
    api.get(`/orders/user/${userId}`).then((res) => res.data);
export const createOrder = (data) =>
    api.post('/orders', data).then((res) => res.data);
export const deleteOrder = (id) =>
    api.delete(`/orders/${id}`).then((res) => res.data);

// ----------------------
// Location
// ----------------------
export const getLocations = () => api.get('/locations').then((res) => res.data);
export const getLocationsByUser = (userId) =>
    api.get(`/locations/user/${userId}`).then((res) => res.data);
export const createLocation = (data) =>
    api.post('/locations', data).then((res) => res.data);
export const updateLocation = (id, data) =>
    api.put(`/locations/${id}`, data).then((res) => res.data);
export const deleteLocation = (id) =>
    api.delete(`/locations/${id}`).then((res) => res.data);

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,

    getOrders,
    getOrdersByUser,
    createOrder,
    deleteOrder,

    getLocations,
    getLocationsByUser,
    createLocation,
    updateLocation,
    deleteLocation,
};
