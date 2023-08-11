type InputProps = {
    name:string;
    type:string;
    register:any;
    error:boolean;
    placeholder:string;
}

const Input = ({
  name,
  type,
  register,
  error,
  placeholder
} : InputProps) => {
    return (
        <div className="w-full flex flex-col gap-y-1">
            <label className="font-medium text-[13px] text-gray-500 capitalize">{name}</label>
            <input type={type} name={name} placeholder={placeholder} {...register(name,{ required:true })} className={`w-full p-3 rounded-md outline-none border ${error ? "border-rose-400" : "border-gray-300"} text-[13px]`}/>
            {error && <p className="text-rose-500 text-[13px] font-medium mt-1">{`${name} field is required`}</p>}
        </div>
    )
}

export default Input;