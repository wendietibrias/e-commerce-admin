
import { Link } from 'react-router-dom';
import { Button,BannerCard } from '../../../components';
import { BiPlus } from 'react-icons/bi';
import { useGetAllBannerQuery } from '../../../services/banner.services';
import toast, { Toaster } from 'react-hot-toast';

const Banners = () => {
    const {
        data:banner,
        isLoading:loading 
    } = useGetAllBannerQuery(null);

    if(loading) {
        return <div>loading..</div>
    }

    return (
        <div className="w-full">
         <div className="flex justify-between items-center">
                <h2 className='text-md font-bold mt-3 text-gray-700'>Banners ({banner?.data?.length || 0})</h2>
                <div>
                   <Link to="/banners/create">
                      <Button>
                         <BiPlus className='text-md'/>
                         <span className="text-[12px] block">Create banner</span>
                     </Button>
                   </Link>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
                {banner?.data && Array.isArray(banner?.data) && banner?.data?.map((item : any,idx : number) => <BannerCard key={idx} banner={item}/>)}
            </div>
            <Toaster/>
        </div>
    )
}

export default Banners;