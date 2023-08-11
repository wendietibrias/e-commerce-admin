import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProductInput {
    title:string;
    category:string | number | any;
    description:string;
    excerpt:string;
    price:string | number;
    stock:string | number;
    productImage:any;
}

export interface IProductOuput extends IProductInput {
   id:number;
   productImage: {
      url:string;
      publicId:string;
   },
   admin: {
      name:string;
      email:string;
   },
   category: {
      title:string;
      slug:string;
   }   
}

export const productApi = createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery({ 
        baseUrl:`${process.env.REACT_APP_BASE_API_URL}/product`,
        prepareHeaders:(headers) => {
           const token = JSON.parse(localStorage.getItem("wmart-admin-token") || "null");
           headers.set('Authorization',`Bearer ${token}`);

           return headers;
        }
    }),
    tagTypes:["Product"],
    endpoints:(builder)=>({
        getAllProduct:builder.query({
            query:(searchTerm : string | null)=>`/all-product?category=${searchTerm}`,
            providesTags:["Product"]
        }),
        getProduct:builder.query({
            query:(id : number | string | undefined) => `/detail/${id}`
        }),
        createProduct:builder.mutation({
            query:(formData : any) => ({
                url:`/create`,
                method:'POST',
                body: formData
            })
        }),
        updateProduct:builder.mutation({
             query:({ formData,id }) => ({
                url:`/update/${id}`,
                method:'POST',
                body:formData
             })
        }),
        deleteProduct:builder.mutation({
            query:(id : number) => ({
                url:`/delete/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:["Product"]
        })
    })
});

export const { useGetAllProductQuery,useGetProductQuery } = productApi;
export const { useCreateProductMutation,useUpdateProductMutation,useDeleteProductMutation } = productApi;