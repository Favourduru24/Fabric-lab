import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function fetchWithAuth(endpoint, options = {}) {
    const session = await getSession();

    if (!session) {
        throw new Error('Not authenticated');
    }

    const { params, ...axiosConfig } = options;

    // DEBUG: Log the request details
    console.log('API Request:', {
        url: `${API_URL}${endpoint}`,
        params: params,
        method: options.method || 'GET'
    });

    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            method: options.method || 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken || session.idToken}`, 
                'Content-Type': 'application/json',
                ...options.headers,
            },
            data: options.body || options.data,
            params: params,
            ...axiosConfig,
        });

        // DEBUG: Log the response
        console.log('API Response:', {
            status: response.status,
            data: response.data
        });

        return response.data;
    } catch (error) {
        console.error("API Error Details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
        });
        
        if (error.response?.status === 401) {
            throw new Error('Session expired. Please log in again.');
        } else if (error.response?.status === 404) {
            throw new Error('Resource not found.');
        } else if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('API request failed. Please try again.');
        }
    }
}


// export async function fetchWithAuth(endpoint, options = {}) {
//     const session = await getSession();
//     if (!session) throw new Error('Not authenticated');

//     // Destructure params and other config options separately
//     const { queryParams, ...axiosConfig } = options;

//     try {
//         const response = await axios({
//             url: `${API_URL}${endpoint}`,
//             method: axiosConfig.method || 'GET',
//             headers: {
//                 Authorization: `Bearer ${session.accessToken}`,
//                 ...axiosConfig.headers,
//             },
//             data: axiosConfig.data,
//             params: queryParams, // This is now clean: only the intended search/filter parameters
//         });
//         return response.data;
//     } catch (error) {
//         console.error("API Error:", error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || 'API request failed');
//     }
// }