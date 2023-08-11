import { Input,Button, LoadingSpinner,Alert } from '../../components';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetProfileAdminQuery } from '../../services/profile.services';
import { useUpdateProfileAdminMutation } from '../../services/profile.services';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { closeAlert, openAlert } from '../../slice/alert.slice';
import { setCredentials } from '../../slice/auth.slice';

const Profile = () => {
    const { alert:{ open } } = useAppSelector(state=>state);
    const { register,handleSubmit,formState:{ errors },setValue,reset } = useForm();

    const [updateProfile, { isLoading }] = useUpdateProfileAdminMutation();

    const dispatch = useAppDispatch();

    const {
        data:profile 
    } = useGetProfileAdminQuery(null);


    const submitHandler = (formData : any) => {
        updateProfile({ formData })
          .unwrap()
          .then((res)=>{
             dispatch(openAlert({
                 open:true,
                 message:res?.message,
                 variant:'success'
             }));
             reset()
             dispatch(setCredentials(res?.data?.access_token));
          })
          .catch((err)=>{
             dispatch(openAlert({
                 open:true,
                 variant:'error',
                 message:err?.data?.error
             }));
          })
          .finally(()=>{
             setTimeout(()=> dispatch(closeAlert()) ,6000);
          })
    }

    useEffect(()=>{
      if(profile && profile?.data){
         setValue('name' , profile?.data.name);
         setValue('email' ,profile?.data.email);
         setValue('phone', profile?.data?.profile?.phone);
         setValue('address', profile?.data?.profile?.address);
         setValue('city', profile?.data?.profile?.city);
         setValue('country', profile?.data?.profile?.country);
         setValue('bio', profile?.data?.profile?.bio);

      }
    },[profile]);

    return (
        <div className="w-full mt-4">
            <div className="bg-white rounded-lg shadow-lg shadow-gray-200 p-5">
               {open && <Alert/>}
               <h2 className='text-md font-bold text-gray-700'>Update profile</h2>
               <form onSubmit={handleSubmit(submitHandler)} className="w-full mt-5 flex flex-col gap-y-3">
                  <Input name="name" placeholder='Username' type="text" register={register} error={errors?.name ? true : false}/>
                  <Input name="email" placeholder='Example@gmail.com' type="email" register={register} error={errors?.email ? true : false}/>
                  <div className="grid gap-3 grid-cols-2">
                    <Input name="phone" type="text" placeholder='Phone number' register={register} error={errors?.phone ? true : false}/>
                    <Input name="country" type="text" placeholder='Country' register={register} error={errors?.country ? true : false}/>
                    <Input name="city" type="text" placeholder='City' register={register} error={errors?.city ? true : false}/>
                    <Input name="address" type="text" placeholder='Address' register={register} error={errors?.address ? true : false}/>
                  </div>
                  <textarea placeholder="Admin bio" {...register('bio',{ required:true })} className="w-full text-[13px] h-[180px] resize-none outline-none p-3 rounded-md border border-gray-300"></textarea>
                  <Button>
                    {isLoading ? <LoadingSpinner width={16} height={16} color="#fff"/> : "Update profile"}
                  </Button>
               </form>
            </div>
        </div>
    )
}

export default Profile;