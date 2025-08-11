import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function fetchWithAuth(endpoint, options = {}) {
    const session = await getSession();

    if (!session) {
        throw new Error('Not authenticated');
    }

    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            method: options.method || 'GET',
            // headers: {
            //     Authorization: `Bearer ${session.accessToken || session.idToken}`, // Check your NextAuth token key
            //     ...options.headers,
            // },
            data: options.body || options.data, // Use `data` instead of `body` for Axios
            params: options.params,
        });

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'API request failed');
    }
}