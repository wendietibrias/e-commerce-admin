import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthResponseLogin {
    message:string;
    status:number | string;
    data: {
        access_token:string;
    }
}

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({ baseUrl:`${process.env.REACT_APP_BASE_API_URL}/auth` }),
    endpoints:(builder) => ({
        loginHandler:builder.mutation<AuthResponseLogin , Partial<AuthResponseLogin>>({
             query:(body) => ({
                 url:`/login`,
                 method:'POST',
                 body:body
             }),
        })
    })
});

export const { useLoginHandlerMutation } = authApi;