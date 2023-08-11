import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath:'dashboard',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/dashboard`,
        prepareHeaders:(headers) => {
           const token = JSON.parse(localStorage.getItem("wmart-admin-token") || "null");
           headers.set('Authorization',`Bearer ${token}`);

           return headers;
        }
    }),
    endpoints:(builder) => ({
        getDashboardStatistic:builder.query({
             query:() => `/statistic`
        })
    })
});

export const { useGetDashboardStatisticQuery } = dashboardApi;