import React from "react";

type ScoreBoardProps = {
    title:string;
    children:React.ReactNode
}

const ScoreBoard = ({
    title,
    children
} : ScoreBoardProps) => {
  return (
    <div className={`w-full bg-white shadow-lg shadow-gray-200 rounded-md p-5`}>
        {children}
        <h5 className="text-[13px] mt-1 font-medium text-gray-500">{title}</h5>
    </div>
  )
}

export default ScoreBoard