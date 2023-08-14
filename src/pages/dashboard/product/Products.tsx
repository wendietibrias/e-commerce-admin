import { IProductOuput, useGetAllProductQuery } from '../../../services/product.services';
import { Button,LoadingSpinner,ProductCard } from '../../../components';
import { Link,useSearchParams } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { Toaster } from 'react-hot-toast';

const Products = () => {
    const [searchParams,setSearchParams] = useSearchParams();

    const {
        data:products,
        isLoading,
    } = useGetAllProductQuery(searchParams.get('category'), { refetchOnMountOrArgChange:true });


    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h2 className='text-md font-bold mt-3 text-gray-700'>All Products ({products?.data && Array.isArray(products?.data) ? products?.data?.length : 0})</h2>
                <div>
                   <Link to="/products/create">
                      <Button>
                         <BiPlus className='text-md'/>
                         <span className="text-[12px] block">Create product</span>
                     </Button>
                   </Link>
                </div>
            </div>
            {isLoading ? (
                <div className="w-full flex justify-center items-center mt-7">
                    <LoadingSpinner width={40} height={40} color={"rgb(59 130 246)"} />
                </div>
            ) : (
                <div className="mt-5 grid grid-cols-4 sm:grid-cols-1 gap-3">
                    {products?.data && Array.isArray(products?.data) && products.data.map((product : IProductOuput, idx : number) => <ProductCard key={idx} product={product}/>)}
                </div>
            )}
            <Toaster/>
        </div>
    )
}

export default Products;