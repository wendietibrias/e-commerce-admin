import { LuTrash,LuEdit } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useDeleteBannerMutation } from '../services/banner.services';
import toast from 'react-hot-toast';

type BannerCardProps = {
    banner: {
        id:number | string;
        title:string;
        description:string;
        createdAt:string;
        updatedAt:string;
        bannerImage:string;
    }
}

const BannerCard = ({
   banner
} : BannerCardProps) => {
  const [deleteBanner, { isLoading }] = useDeleteBannerMutation();

  const deleteBannerHandler = () => {
     deleteBanner(banner.id)
       .unwrap()
       .then((res)=>{
         toast.remove()
         toast.success(res?.message, {
            duration:6000,
            position:'top-center'
         });
       })
       .catch((err) => {
          toast.remove();
          toast.error(err?.data?.error,{
              duration:6000,
              position:'top-center'
          });
       })
  }

  return (
     <div className="w-full bg-white rounded-lg shadow-lg shadow-gray-200 p-4">
         <img src={`http://localhost:8080/banner/${banner.bannerImage}`} className="rounded-lg h-[200px] w-full object-cover" alt={banner?.title} />
         <div className="pt-3">
           <h4 className="text-gray-700 text-[13px] font-semibold">{banner?.title}</h4>
           <p className="text-[12px] text-gray-400 mt-1">{banner?.description}</p>
            <div className="flex mt-4 items-center gap-x-3">
                 <button onClick={deleteBannerHandler} className="flex items-center gap-x-1 text-[12px] font-medium text-rose-500">
                  <LuTrash/>
                  delete
                </button>
                  <Link to={`/banners/update/${banner?.id}`}>
                     <button className="flex items-center gap-x-1 text-[12px] font-medium text-green-500">
                       <LuEdit/>
                        Update
                     </button>
                  </Link>
            </div>
         </div>
     </div>
  )
}

export default BannerCard;