import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export interface IBannerInput {
    title:string;
    subtitle:string;
    bannerImage:any;
}

export interface IBannerOutput extends IBannerInput {
    data: {
        title:string;
        subtitle:string;
        bannerImage:string;
        createdAt:string;
        updatedAt:string;
    }
}

export const bannerApi = createApi({
    reducerPath:'bannerApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/banner`,
        prepareHeaders:(headers)=>{
            const token = JSON.parse(localStorage.getItem('wmart-admin-token') || 'null');
            headers.set(`Authorization` , `Bearer ${token}`);

            return headers;
        }
    }),
    tagTypes:["Banner"],
    endpoints:(builder) => ({
        getAllBanner:builder.query({
            query:() => `/all-banner`,
            providesTags:['Banner']
        }),
        createBanner:builder.mutation({
            query:(formData) => ({
                url:`/create`,
                method:'POST',
                body:formData
            }),
            invalidatesTags:['Banner']
        }),
        deleteBanner:builder.mutation({
            query:(id:number | string | undefined) => ({
                url:`/delete/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Banner']
        }),
        updateBanner:builder.mutation({
            query:({ formData,id }) => ({
                url:`/update/${id}`,
                method:'POST',
                body:formData
            }),
        })
    })
}) ;

export const { useGetAllBannerQuery } = bannerApi;
export const { useCreateBannerMutation,useDeleteBannerMutation,useUpdateBannerMutation } = bannerApi;