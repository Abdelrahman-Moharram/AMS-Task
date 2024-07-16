import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
const token = Cookies.get('access_token')

const emptyUser = {
	email:'',
	username:"",
	id:'',
	role:'',
	employee_id:'',
	company_id:''
}
interface user {
    id: string;
    username:string;
    email:string;
	role?:string 
	employee_id?:string
	company_id?:string

}
interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
    user:user
}

const initialState = {
    isAuthenticated: token? true :false,
	isLoading: token? true :false,
    user: token? jwtDecode(token): emptyUser
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuthenticated = true;
			if(action.payload)
				{
					Cookies.set('access_token', action.payload) 
					state.user = jwtDecode(action.payload)
				}
		},
		setLogout: state => {
			
			Cookies.remove('access_token')
			Cookies.remove('access')
			state.isAuthenticated = false;
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
	},
});

export const { setAuth, setLogout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;