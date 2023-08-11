import { Link } from "react-router-dom";
import { IProductOuput } from "../services/product.services";
import { LuTrash,LuEdit } from 'react-icons/lu';
import { useDeleteProductMutation } from '../services/product.services';
import toast from "react-hot-toast";
import convertMoney from "../utils/convertMoney";

type ProductCardProps = {
    product: IProductOuput
}

const ProductCard = ({
    product
} : ProductCardProps) => {   
    const [deleteProduct , { isLoading }] = useDeleteProductMutation();

    const deleteProductHandler = () => {
       toast.loading('deleting product' ,{
         position:'top-center'
       });

        if(product.id) {
           deleteProduct(product.id)
             .unwrap()
             .then((res : any)=>{
                toast.remove();
                return toast.success(res.message,{
                    position:'top-center',
                    duration:6000
                 });
             })
             .catch((err : any)=>{
                 toast.remove();
                 return toast.error(err?.data?.error, {
                    position:'top-center',
                    duration:6000
                 });
             })
        }
    }

    return (
        <div className="w-full bg-white shadow-lg shadow-gray-200 rounded-lg p-4">
          <div className="w-full h-[190px] bg-gray-100 flex justify-center items-center rounded-lg">
             <img src={product?.productImage?.url} alt={product?.title} className="w-[55%]" />
          </div>
             <div className="pt-4">
                 <div className="flex justify-between items-center">
                    <h4 className="text-gray-700 text-[12px] font-semibold">{product?.title}</h4>
                    <h4 className="text-blue-500 font-bold text-[12px]">{convertMoney(Number(product?.price))}</h4>
                 </div>
                 <p className="text-[12px] mt-[2px] font-medium text-gray-400">{product?.stock} stocks</p>
        
                 <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-x-3">
                     <button onClick={deleteProductHandler} className="flex items-center gap-x-1 text-[12px] font-medium text-rose-500">
                      <LuTrash/>
                      delete
                     </button>
                     <Link to={`/products/update/${product?.id}`}>
                     <button className="flex items-center gap-x-1 text-[12px] font-medium text-green-500">
                        <LuEdit/>
                        Update
                      </button>
                     </Link>
                    </div>
 
                 </div>
             </div>
        </div>
    )
}

export default ProductCard;