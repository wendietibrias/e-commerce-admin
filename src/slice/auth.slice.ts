import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const wmartAdminToken = JSON.parse(localStorage.getItem('wmart-admin-token') || 'null');

export type AuthState = {
     token : string | null;
     payload: {
        name:string;
        email:string;
        role:string;
     } | null 
}

const authSlice = createSlice({
    name:'auth',
    initialState: {
        token:null || wmartAdminToken,
        payload:wmartAdminToken ? jwtDecode(wmartAdminToken) : null, 
    } as AuthState,
    reducers: {
       setCredentials(state : AuthState, { payload }:{ payload:string }){
          if(payload) {
              state.token = payload;
              state.payload = jwtDecode(payload);
              localStorage.setItem('wmart-admin-token' , JSON.stringify(payload));
          }

          return state;
       },
       removeCredentials(state : AuthState){
          state.token = null;
          state.payload = null;
          localStorage.removeItem('wmart-admin-token');
       }
    }
});

export const { setCredentials,removeCredentials } = authSlice.actions;
export default authSlice.reducer;