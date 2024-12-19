import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productApi = {
    getProducts: async (page = 1, limit = 10) => {
        const response = await api.get(`/products?page=${page}&limit=${limit}`);
        return response.data;
    },

    getProduct: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    createProduct: async (productData) => {
        const response = await api.post('/products', productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};