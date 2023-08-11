import { createSlice } from "@reduxjs/toolkit";

export type AlertState = {
    message:string;
    variant:string;
    open:boolean;
}

const alertSlice = createSlice({
    name:'alert',
    initialState:{
        message:"",
        variant:"",
        open:false 
    } as AlertState,
    reducers:{
        openAlert(state : AlertState, { payload }){
            state.message = payload.message;
            state.variant = payload.variant;
            state.open = true;

            return state;
        },
        closeAlert(state : AlertState){
            state.open = false;
            state.message = "";
            state.variant = "";

            return state;
        }
    }
});

export const { openAlert,closeAlert } = alertSlice.actions;
export default alertSlice.reducer;