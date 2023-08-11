import { useLoginHandlerMutation } from '../../services/auth.services';
import { Input,Button,Alert,LoadingSpinner } from '../../components';
import { useAppSelector,useAppDispatch } from '../../hooks/redux.hook';
import { closeAlert, openAlert } from '../../slice/alert.slice';
import { Navigate } from 'react-router-dom';
import { setCredentials } from '../../slice/auth.slice';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { alert:{ open },auth:{ token } } = useAppSelector(state=>state);
    const { register,handleSubmit,formState:{ errors } } = useForm();
    const [loginHandler, { isLoading }] = useLoginHandlerMutation();

    const dispatch = useAppDispatch();

    const submitHandler = async (formData : any) => {
        loginHandler(formData)
          .unwrap()
          .then(({ data } : { data:{ access_token:string } }) => { 
               dispatch(setCredentials(data.access_token));
           })
          .catch((err) => { 
               dispatch(openAlert({
                  message:err?.data?.error,
                  variant:"error",
                  open:true
               }));
           });

        setTimeout(()=>{
            dispatch(closeAlert());
        },6000);
    }

    if(token) {
        return <Navigate to="/" />
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
            <div className='w-[600px] rounded-md bg-white p-5 shadow-lg shadow-gray-200'>
                {open && <Alert/>}
                <div className='flex text-center flex-col gap-y-1'>
                    <h2 className='text-2xl font-bold'>Login Admin</h2>
                    <p className='text-[13px] text-gray-400'>Hello admin , please complete all credential info</p>
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className='w-full mt-6 flex flex-col gap-y-3'>
                    <Input name="name" type="text" placeholder='John Doe' register={register} error={errors.name ? true : false} />
                    <Input name="email" type="email" placeholder='Example@gmail.com' register={register} error={errors.email ? true : false}/>
                    <Input name="password" type="password" placeholder='Password' register={register} error={errors.password ? true : false}/>

                    <div className='flex items-center gap-x-2'>
                        <input type="checkbox" {...register('remember')} />
                        <span className='text-[13px] text-gray-500 font-normal'>Remember me?</span>
                    </div>
                    <Button>
                        {isLoading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login;