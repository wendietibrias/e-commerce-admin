import { Button, Input,Alert,LoadingSpinner } from '../../../components';
import { closeAlert, openAlert } from '../../../slice/alert.slice';
import { useUpdateCategoriesMutation,useGetAllCategoriesQuery, ICategoryOutput } from '../../../services/category.services';
import { useAppSelector,useAppDispatch } from '../../../hooks/redux.hook';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const UpdateCategories = () => {
    const { id } = useParams();
    const { alert:{ open } } = useAppSelector(state=>state);
    const { register,handleSubmit,formState:{ errors },reset,setValue } = useForm();

    const [updateCategories, { isLoading }] = useUpdateCategoriesMutation();

    const dispatch = useAppDispatch();

    const {
        data:categories,
    } = useGetAllCategoriesQuery(null);

    const submitHandler = (formData : any) => {
        updateCategories({ formData,id })
          .unwrap()
          .then((res)=>{
             dispatch(openAlert({
                open:true,
                message:res?.message,
                variant:'success'
             }));

             reset();
          })
          .catch((err)=>{
            dispatch(openAlert({
                open:true,
                message:err?.data?.error,
                variant:'error'
             }));
          })
          .finally(()=>{
             setTimeout(() => dispatch(closeAlert()) ,6000);
          });
    }

    useEffect(() =>{
      if(categories && categories.data) {
         const findCategory = categories.data.find((category : ICategoryOutput)=>category?.id == Number(id));
        
         setValue('title',findCategory?.title);
         setValue('slug' , findCategory?.slug);
      }
    },[categories]);

    return (
        <div className="w-full mt-3">
            <div className='w-full bg-white rounded-lg p-5'>
                {open && <Alert/>}
                <div className="flex justify-between items-center">
                    <h2 className='text-md font-bold text-gray-700'>Update category</h2>
                </div>
               <form onSubmit={handleSubmit(submitHandler)} className="w-full mt-5 flex flex-col gap-y-3">
               <Input type="text" name="title" placeholder='Category title' register={register} error={errors?.title ? true : false} />
               <Input type="text" name="slug" placeholder='Category slug' register={register} error={errors?.slug ? true : false} />
               <Button>
                 {isLoading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Update category"}
               </Button>
             </form>
             </div>
        </div>
    )
}

export default UpdateCategories;