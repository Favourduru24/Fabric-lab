import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function fetchWithAuth(endpoint, options = {
}) {
    const session = await getSession();

    if (!session) {
        throw new Error('Not authenticated');
    }

    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            method: options.method || 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken || session.idToken}`, 
                ...options.headers,
            },
            data: options.body || options.data, // Use `data` instead of `body` for Axios
            params: {...options},
        });

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'API request failed');
    }
}

// export async function fetchWithAuth(endpoint, options = {}) {
//     const session = await getSession();
//     if (!session) throw new Error('Not authenticated');

//     // Destructure queryParams and other config options separately
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