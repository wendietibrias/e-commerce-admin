import { BiPlus } from 'react-icons/bi';
import { Button,CategoryCard,LoadingSpinner } from '../../../components';
import { Link } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../../services/category.services';
import { ICategoryOutput } from '../../../services/category.services';

const Categories = () => {
 
    const {
        data:categories,
        isLoading,
        isFetching
    } = useGetAllCategoriesQuery(null,{ refetchOnMountOrArgChange:true });

    return (
        <div className="w-full">
          <div className="flex justify-between items-center">
                <h2 className='text-md mt-3 font-bold text-gray-700'>All Categories ({categories?.data && Array.isArray(categories?.data) ? categories.data.length : 0})</h2>
                <div>
                    <Link to="/categories/create">
                       <Button>
                         <BiPlus className='text-md'/>
                          <span className="text-[12px] block">Create category</span>
                       </Button>
                    </Link>
                </div>
            </div>
            {isLoading ? (
                 <div className="w-full flex justify-center items-center mt-7">
                    <LoadingSpinner width={40} height={40} color={"rgb(59 130 246)"} />
                </div>
            ) : (
                <div className='grid mt-5 grid-cols-3 gap-3'>
                    {categories?.data?.map((category : ICategoryOutput, idx : number) => <CategoryCard category={category} key={idx} />)}
                </div>
            )}
        </div>
    )
}

export default Categories;