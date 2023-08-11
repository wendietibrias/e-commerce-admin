import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICategoryOutput {
    id:number;
    title:string;
    slug:string;
    createdAt:string;
    updatedAt:string;
    admin:{
        name:string;
        email:string;
    },
    products:any[]
}

export interface ICategoryInput {
    title:string;
    slug:string;
}

export const categoryApi = createApi({
    reducerPath:"categoryApi",
    baseQuery:fetchBaseQuery({ 
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/category`,
        prepareHeaders:(headers) => {
           const token = JSON.parse(localStorage.getItem("wmart-admin-token") || "null");
           headers.set('Authorization',`Bearer ${token}`);

           return headers;
        }
     }),
     tagTypes:["Categories"],
     endpoints:(builder) => ({
         getAllCategories:builder.query({
             query:() => `/all-category`,
             providesTags:["Categories"]
         }),
         addCategories:builder.mutation({
             query:(body : ICategoryInput) => ({
                url:`/create`,
                method:'POST',
                body
             })
         }),
         updateCategories:builder.mutation({
            query:({ formData,id }) => ({
                url:`/update/${id}`,
                method:'PUT',
                body:formData
            })
         })
     })
})

export const { useGetAllCategoriesQuery } = categoryApi;
export const { useAddCategoriesMutation,useUpdateCategoriesMutation } = categoryApi;