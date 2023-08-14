import Chart from "react-apexcharts";

type GraphicChartProps = {
   revenue:number;
   orders:number;
   products:number;
}

const GraphicChart = ({
   revenue,
   orders,
   products
} : GraphicChartProps) => {
  const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["January", "Febuary" , "March" , "Mai" , "June" , "July" , "August" , "September" , "October" , "November", "December"]
        }
  };

  const series = [
        {
          name: "Revenue",
          data: [revenue]
        },
        {
          name:"Orders",
          data:[orders]
        },
        {
          name:"Products",
          data:[products]
        }
      ]

  return (
    <div className='w-full p-2 shadow-lg sm:hidden shadow-gray-200 bg-white mt-7'>
       <Chart type="bar" options={options} series={series} />
    </div>
  )
}

export default GraphicChart