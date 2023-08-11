import { useForm } from "react-hook-form";
import { Uploader } from "uploader";
import { BiPlus } from 'react-icons/bi';
import { UploadButton } from "react-uploader";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Button, Input, LoadingSpinner,Alert } from "../../../components";
import { useAppDispatch,useAppSelector } from "../../../hooks/redux.hook";
import { openAlert,closeAlert } from "../../../slice/alert.slice";
import { useUpdateBannerMutation,useGetAllBannerQuery } from '../../../services/banner.services';

const uploader = Uploader({ apiKey: "public_FW25bZsFjb727U6zupQfb98GFug5" }); // Your real API key.

const UpdateBanners = () => {  
  const { id } = useParams();
  const { alert:{ open } } = useAppSelector(state=>state);
  const { register,handleSubmit, formState:{ errors },reset,setValue } = useForm();
  
  const [files,setFiles] = useState<any>(null);
  const [updateBanner, { isLoading:loading }] = useUpdateBannerMutation();

  const dispatch = useAppDispatch();

  const {
    data:banner,
  } = useGetAllBannerQuery(null);

   const submitHandler = (data : any) => {
      updateBanner({ formData:data,id })
        .unwrap()
        .then((res)=>{
            dispatch(openAlert({
               open:true,
               variant:'success',
               message:res?.message
            }));

            reset();
        })
        .catch((err)=>{
           dispatch(openAlert({
               open:true,
               variant:'error',
               message:err?.data?.error
           }))
        })
        .finally(()=>{
           setTimeout(()=>dispatch(closeAlert()),6000);
        });
   }

   useEffect(()=>{
     if(banner && banner.data && Array.isArray(banner.data)) {
        const findBanner = banner.data.find((item : any)=>item.id == Number(id));
        
        setValue('title' , findBanner.title);
        setValue('subtitle',findBanner?.description);

        setFiles(findBanner?.bannerImage);

     }
   },[banner]);

  return (
    <div className="w-full mt-4">
      <div className="bg-white rounded-lg shadow-lg p-5 shadow-gray-200">
          {open && <Alert/>}
          <h2 className='text-md font-bold text-gray-700'>Update Banner</h2>   
          <form onSubmit={handleSubmit(submitHandler)} className="mt-5 flex flex-col gap-y-3">
              <Input name="title" type="text" placeholder="Banner title" register={register} error={errors?.title ? true : false} />
              <Input name="subtitle" type="text" placeholder="Banner subtitle" register={register} error={errors?.subtitle ? true : false} />
              {files && typeof files === "string" && <img src={`http://localhost:8080/banner/${files}`} className="w-[250px] h-[180px] rounded-lg" alt={'banner-image'} />}
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
                 {loading ? <LoadingSpinner width={16} height={16} color="#fff" /> : "Update banner"}
              </Button>
          </form>
      </div>
    </div>
  )
}

export default UpdateBanners