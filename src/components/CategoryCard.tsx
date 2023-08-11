import { ICategoryOutput } from "../services/category.services";
import { LuEdit } from 'react-icons/lu';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CategoryCard = ({
    category
} : {category:ICategoryOutput}) => {
    return (
        <div className="w-full bg-white rounded-md p-4 shadow-md shadow-gray-200">
            <h4 className="text-gray-700 font-bold text-md">{category?.title}</h4>
            <p className="text-gray-400 mt-1 font-medium  text-[13px]">{category?.products?.length} products</p>
            <div className="flex items-center gap-x-3 mt-4">
                <Link to={`/categories/update/${category.id}`}>
                <button className="flex items-center gap-x-1 text-[12px] font-medium text-green-500">
                    <LuEdit/>
                    Update
                </button>
                </Link>
                <Link to={`/products?category=${category?.slug}`}>
                   <button className="flex items-center gap-x-1 text-[12px] font-medium text-blue-500">
                    <AiOutlineEye/>
                    See product
                  </button>
                </Link>
            </div>
        </div>
    )
}

export default CategoryCard;