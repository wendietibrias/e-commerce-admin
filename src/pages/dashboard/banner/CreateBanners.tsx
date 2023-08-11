import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { BiPlus } from 'react-icons/bi';
import { Button, Input, LoadingSpinner,Alert } from "../../../components";
import { useAppDispatch,useAppSelector } from "../../../hooks/redux.hook";
import { openAlert,closeAlert } from "../../../slice/alert.slice";
import { useCreateBannerMutation } from "../../../services/banner.services";

const uploader = Uploader({ apiKey: "public_FW25bZsFjb727U6zupQfb98GFug5" }); // Your real API key.

const CreateBanners = () => {
    const dispatch = useAppDispatch();

    const { alert:{ open } } = useAppSelector(state=>state);
    const { register,handleSubmit, formState:{ errors },reset } = useForm();
 
    const [createBanner, { isLoading:loading }] = useCreateBannerMutation();
    const [files,setFiles] = useState<any>(null);

    const submitHandler = (data : any) => {
        const formData = new FormData();
        formData.append('title' , data?.title);
        formData.append('subtitle' , data?.subtitle);
        formData.append('bannerImage' , files ? files[0]?.originalFile?.file : null);

         createBanner(formData)
          .unwrap()
          .then((res)=>{
             dispatch(openAlert({
                 open:true,
                 message:res?.message,
                 variant:'success'
             }));

             reset();
          })
          .catch((err) => {
             dispatch(openAlert({
                 open:true,
                 variant:'error',
                 message:err?.data?.error
             }));
          })
          .finally(() => {
              setTimeout(()=>dispatch(closeAlert()),6000);
          });
    }

    return (
        <div className="w-full mt-3">
            <div className="p-5 rounded-lg bg-white shadow-lg shadow-gray-200">
             {open && <Alert/>}   
             <div className="flex justify-between items-center">
                <h2 className='text-md font-bold text-gray-700'>Add Banner</h2>
             </div>
             <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-y-3 mt-5">
                 <Input name="title" type="text" placeholder="Banner title" register={register} error={errors?.title ? true : false} />
                 <Input name="subtitle" type="text" placeholder="Banner subtitle" register={register} error={errors?.subtitle ? true : false} />
                 <UploadButton uploader={uploader}
                    options={{ multi: true }}
                    onComplete={setFiles}>
                    {({onClick}) =>
                    <div className="mt-2 flex items-center gap-x-2">
                        <button className="border-dotted border-2 border-blue-500 flex items-center gap-x-1 text-blue-500 t text-[13px] font-semibold rounded-md p-3" onClick={onClick}>
                        <BiPlus className="text-lg font-bold" />
                        Upload a banner
                    </button>
                    {files && Array.isArray(files) && <p className="text-[13px] font-medium text-gray-500">{files[0].filePath}</p>}
                    </div>
                    }
                    </UploadButton>
                 <Button>
                    {loading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Add banner"}
                 </Button>
             </form>
            </div>
        </div>
    )
}

export default CreateBanners;