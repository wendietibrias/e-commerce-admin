import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const profileApi = createApi({
    reducerPath:'profileApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/profile`,
        prepareHeaders:(headers) => {
           const token = JSON.parse(localStorage.getItem("wmart-admin-token") || "null");
           headers.set(`Authorization` , `Bearer ${token}`);

           return headers;
        }
    }),
    tagTypes:['ProfileAdmin'],
    endpoints:(builder) => ({
        getProfileAdmin:builder.query({
            query:() => `/get-profile`,
            providesTags:["ProfileAdmin"]
        }),
        updateProfileAdmin:builder.mutation({
            query:({ formData }) => ({
                url:`/update`,
                method:'PUT',
                body:formData
            }),
            invalidatesTags:['ProfileAdmin']
        })
    })
});

export const { useGetProfileAdminQuery } = profileApi;
export const { useUpdateProfileAdminMutation } = profileApi;