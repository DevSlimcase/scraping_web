import axios from 'axios';

class Client {
    constructor(baseURL) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 5000, // Set a default timeout
        });
    }

    setHeaders(headers) {
        this.axiosInstance.defaults.headers = {
            ...this.axiosInstance.defaults.headers,
            ...headers,
        };
    }
    async get(endpoint, params = {}) {
        try {
            const response = await this.axiosInstance.get(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async post(endpoint, data = {}) {
        try {
            const response = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
}

export { Client }
