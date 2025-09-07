import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const baseQueryWithReauth = fetchBaseQuery({
     baseUrl: 'http://localhost:4000',
     credentials: 'include',
     prepareHeaders: async (headers) => {

    const session = await getSession();

    if (!session) {
        throw new Error('Not authenticated');
    }

       if(session) {
           headers.set("Authorization", `Bearer ${session.idToken}`)
       }

       return headers
     }
})

export const apiSlice = createApi({
     baseQuery: baseQueryWithReauth,
     tagTypes: ['Design'],
     endpoints: builder => ({})
})