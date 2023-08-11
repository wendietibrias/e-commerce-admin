import React from "react"

type ButtonProps = {
  children:React.ReactNode
}

const Button = ({
  children
} : ButtonProps) => {
  return (
     <button className='w-full bg-blue-500 py-2 px-2 gap-x-1 flex justify-center items-center text-white text-[13px] font-semibold rounded-md mt-4'>
       {children}
     </button>
  )
}

export default Button