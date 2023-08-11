
import React from 'react';
import Chart from "react-apexcharts";

const GraphicChart = () => {
  const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["January","Febuary","March","Apr", "June","July","August" , "September","October","November","December"]
        }
  };

  const series = [
        {
          name: "Revenue",
          data: [30, 40, 45, 50, 49, 60, 70, 91,55,55,55,55]
        },
        {
          name:"Orders",
          data:[1]
        },
        {
          name:"Customers",
          data:[10]
        }
      ]

  return (
    <div className='w-full p-2 shadow-lg shadow-gray-200 bg-white mt-7'>
       <Chart type="bar" options={options} series={series} />
    </div>
  )
}

export default GraphicChart