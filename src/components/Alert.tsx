import { useAppSelector,useAppDispatch } from "../hooks/redux.hook";
import { AlertState, closeAlert } from "../slice/alert.slice";

const Alert = () => {
    const { message,variant } = useAppSelector(state=>state.alert) as AlertState;
    const dispatch = useAppDispatch();

    return (
        <div className={`w-full flex mb-5 justify-between items-center py-2 px-3 rounded-md ${variant === 'error' ? 'bg-rose-50 text-rose-500' : 'bg-green-50 text-green-500'}`}>
            <p className="text-[13px] font-semibold">{message}</p>
            <button onClick={()=>dispatch(closeAlert())} className="font-bold text-sm">x</button>
        </div>
    )
}

export default Alert;