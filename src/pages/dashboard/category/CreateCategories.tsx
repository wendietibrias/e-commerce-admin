import { Button, Input,Alert,LoadingSpinner } from '../../../components';
import { useForm } from 'react-hook-form';
import { useAddCategoriesMutation } from '../../../services/category.services';
import { useAppSelector,useAppDispatch } from '../../../hooks/redux.hook';
import { closeAlert, openAlert } from '../../../slice/alert.slice';

const CreateCategories = () => {
    const { alert:{ open } } = useAppSelector(state=>state);
    const { register,handleSubmit,formState:{ errors },reset } = useForm();
    const [addCategories, { isLoading }] = useAddCategoriesMutation();

    const dispatch = useAppDispatch();

    const submitHandler =  (formData : any) => {
        addCategories(formData)
         .unwrap()
         .then((res)=>{
            dispatch(openAlert({
                open:true,
                message:res?.message,
                variant:"success"
            }));

            reset();
         })
         .catch((err)=>{
             dispatch(openAlert({
                 open:true,
                 message:err?.data?.error,
                 variant:"error"
             }));
         })
         .finally(() => {
             setTimeout(()=> dispatch(closeAlert()) ,6000)
         });
    }

    return (
        <div className="w-full mt-3">
          <div className='w-full bg-white rounded-lg p-5'>
             {open && <Alert/>}
              <div className="flex justify-between items-center">
                <h2 className='text-md font-bold text-gray-700'>Create category</h2>
             </div>
             <form onSubmit={handleSubmit(submitHandler)} className="w-full mt-5 flex flex-col gap-y-3">
               <Input type="text" name="title" placeholder='Category title' register={register} error={errors?.title ? true : false} />
               <Input type="text" name="slug" placeholder='Category slug' register={register} error={errors?.slug ? true : false} />
               <Button>
                 {isLoading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Create category"}
               </Button>
             </form>
          </div>
        </div>
    )
}

export default CreateCategories;