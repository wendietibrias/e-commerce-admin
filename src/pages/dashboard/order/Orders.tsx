import { useGetAllUserOrderQuery } from "../../../services/order.services";
import convertMoney from "../../../utils/convertMoney";

const Orders = () => {
    const {
       data:orders,
       isLoading,
       isFetching 
    } = useGetAllUserOrderQuery(null);

    return (
        <div className="w-full">
            <h2 className="text-lg font-bold text-gray-700">User Orders</h2>
            <div className="mt-5">
             <table className="items-center bg-white w-full border-collapse ">
                <thead>
                <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Order ID
                    </th>
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       Email
                     </th>
                     <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Address
                     </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Payment
                     </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Total 
                     </th>
                </tr>
                </thead>

                <tbody>
                 {orders?.data?.map((order : any , idx : number) => (
                    <tr key={idx}>
                      <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {order?.id}
                      </td>
                       <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {order?.user?.name}
                      </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {order?.user?.email}
                      </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {order?.address}
                      </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {order?.paymentMethod}
                      </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {convertMoney(order?.orderDetail?.reduce((a : number , b : any) => a + b.total, 0))}
                      </td>
                    </tr>
                 ))}
                </tbody>

      </table>
            </div>
        </div>
    )
}

export default Orders;