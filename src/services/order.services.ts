import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/order`,
        prepareHeaders:(headers) => {
            const token = JSON.parse(localStorage.getItem("wmart-admin-token") || "null") || null;
            headers.set("Authorization" , `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints:(builder) => ({
        getAllUserOrder:builder.query({
            query:() => `/all-order`
        })
    })
});

export const { useGetAllUserOrderQuery } = orderApi;
