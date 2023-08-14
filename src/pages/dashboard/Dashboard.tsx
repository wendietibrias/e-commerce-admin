import { MdOutlinePayment } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import { LiaBoxOpenSolid } from 'react-icons/lia';
import { ScoreBoard,GraphicChart } from '../../components';
import { useGetDashboardStatisticQuery } from '../../services/dashboard.services';
import convertMoney from '../../utils/convertMoney';

const Dashboard = () => {
 
  const {
    data:statistic,
    isLoading
  } = useGetDashboardStatisticQuery(null);

 if(isLoading) {
    return (
       <div>Loading...</div>
    )
 }

  return (
    <div className='w-full'>
       <div className="grid grid-cols-3 sm:grid-cols-1 gap-3">
         <ScoreBoard title="Revenue">
           <div className="flex items-center justify-between">
              <h3 className='text-gray-700 font-bold text-2xl'>{convertMoney(statistic?.data?.revenue || 0)}</h3>
              <MdOutlinePayment className="text-xl text-gray-700" />
           </div>
         </ScoreBoard>
             <ScoreBoard title="Orders">
           <div className="flex items-center justify-between">
              <h3 className='text-gray-700 font-bold text-2xl'>{statistic?.data?.orders || 0}</h3>
              <GrTransaction className="text-xl text-gray-700" />
           </div>
         </ScoreBoard>
             <ScoreBoard title="Total products">
           <div className="flex items-center justify-between">
              <h3 className='text-gray-700 font-bold text-2xl'>{statistic?.data?.products || 0}</h3>
              <LiaBoxOpenSolid className="text-xl text-gray-700" />
           </div>
         </ScoreBoard>
       </div>
       <GraphicChart revenue={statistic?.data?.revenue} orders={statistic?.data?.orders} products={statistic?.data?.products}/>
    </div>
  )
}

export default Dashboard