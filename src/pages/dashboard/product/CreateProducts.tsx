import { Button, Input,Alert, LoadingSpinner } from "../../../components";
import { useCreateProductMutation } from "../../../services/product.services";
import { ICategoryOutput, useGetAllCategoriesQuery } from "../../../services/category.services";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { openAlert,closeAlert } from "../../../slice/alert.slice";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const uploader = Uploader({ apiKey: "public_FW25bZsFjb727U6zupQfb98GFug5" }); // Your real API key.

const CreateProducts = () => {
  const dispatch = useAppDispatch();

  const { alert:{ open } } = useAppSelector(state=>state);
  const { register,handleSubmit,formState:{ errors },reset } = useForm();

  const [createProduct ,{ isLoading }] = useCreateProductMutation();
  const [files,setFiles] = useState<any>(null);

  const { 
     data:categories,
     isLoading:loading
   } = useGetAllCategoriesQuery(null);

   const submitHandler = (data : any) => {
       const formData = new FormData();
       formData.append('title' , data.title);
       formData.append('excerpt', data.excerpt);
       formData.append('price' , data.price);
       formData.append('stock' , data.stock);
       formData.append('description',data.description);
       formData.append('category',data.category);
       formData.append('productImage',files[0].originalFile.file);

       createProduct(formData)
         .unwrap()
         .then((res)=>{
             dispatch(openAlert({
                 open:true,
                 message:res.message,
                 variant:"success"
             }))
             
             setFiles(null);
             reset();
         })
         .catch((err) => {
             dispatch(openAlert({
                 open:true,
                 message:err?.data?.error,
                 variant:"error"
             }));
         })
         .finally(() => {
             setTimeout(()=> dispatch(closeAlert()) ,6000);
         });
   }

  return (
    <div className="mt-3 w-full">
        <div className="p-5 rounded-lg shadow-lg bg-white shadow-gray-200">
          {open && <Alert/>}
            <div className="flex justify-between items-center">
              <h2 className='text-md font-bold text-gray-700'>Create product</h2>
            </div>
             <form onSubmit={handleSubmit(submitHandler)} className="mt-5 flex flex-col gap-y-3">
                <Input name="title" placeholder="Product title" type="text" register={register} error={errors?.title ? true : false}/>
                <Input name="excerpt" placeholder="Product excerpt" type="text" register={register} error={errors?.excerpt ? true : false}/>
                <Input name="price" placeholder="Product price" type="number" register={register} error={errors?.price ? true : false}/>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                  <Input type="number" name="stock" placeholder="Product stock" register={register} error={errors?.stock ? true : false}/>
                  <div className="w-full flex flex-col gap-y-2">
                    <label className="text-[13px] font-medium text-gray-500">Category</label>
                    <select {...register('category', { required:true })} className={`w-full rounded-md border ${errors?.category ? "border-rose-400" : "border-gray-300"} p-3 text-[13px] text-gray-500 outline-none`}>
                        {categories?.data && Array.isArray(categories?.data) && categories?.data?.map((category : ICategoryOutput ,idx : number) => (
                            <option value={category?.id} key={idx}>{category?.title}</option>
                        ))}
                    </select>
                    {errors?.category && <p className="text-[13px] font-medium text-rose-500">category field required</p>}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <label className="text-[13px] font-medium text-gray-500">Description</label>
                    <textarea {...register('description', { required:true })} placeholder="Product description" className={`w-full h-[180px] rounded-md border text-[13px] ${errors?.description ? "border-rose-400":"border-gray-300"} outline-none p-3 resize-none`}></textarea>
                    {errors?.description && <p className="text-[13px] font-medium text-rose-500">description field required</p>}

                </div>
            <UploadButton uploader={uploader}
              options={{ multi: true }}
              onComplete={setFiles}>
              {({onClick}) =>
              <div className="mt-2 flex items-center gap-x-2">
                <button className="border-dotted border-2 border-blue-500 flex items-center gap-x-1 text-blue-500 t text-[13px] font-semibold rounded-md p-3" onClick={onClick}>
                  <BiPlus className="text-lg font-bold" />
                  Upload a file
               </button>
               {files && Array.isArray(files) && <p className="text-[13px] font-medium text-gray-500">{files[0]?.filePath}</p>}
              </div>
            }
          </UploadButton>
              <Button>
                  {isLoading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Create product"}
              </Button>
             </form>
        </div>
    </div>
  )
}

export default CreateProducts