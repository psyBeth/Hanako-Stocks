import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess, registerSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";


const useAuthCalls = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (userInfo) => {

        dispatch(fetchStart());
    
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}auth/login`,
                userInfo
            );
            dispatch(loginSuccess(data));
            toastSuccessNotify("Login succeed.");
            navigate("/stock");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Login failed.")
            console.log(error);
        };
    };

    const register = async (userInfo) => {
        dispatch(fetchStart());

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}users`,
                userInfo
            );
            dispatch(registerSuccess(data));
            navigate("/stock");
        } catch (error) {
          dispatch(fetchFail());  
        };
    };

    const logout = async () => {};

  return { login, register }
}

export default useAuthCalls