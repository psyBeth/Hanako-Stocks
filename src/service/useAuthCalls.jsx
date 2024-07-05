import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";

const useAuthCalls = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { axiosWithToken, axiosPublic } = useAxios();

    const login = async (userInfo) => {

        dispatch(fetchStart());
    
        try {
            const { data } = await axiosPublic.post("auth/login/", userInfo);
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
            const { data } = await axiosPublic.post("/users/", userInfo);
            dispatch(registerSuccess(data));
            toastSuccessNotify("Registered successfully.");
            navigate("/stock");
        } catch (error) {
          dispatch(fetchFail()); 
          toastErrorNotify("Registry failed.") 
          console.log(error);
        };
    };

    const logout = async () => {
        dispatch(fetchStart());

        try {
            await axiosWithToken("auth/logout/");
            dispatch(logoutSuccess());
            toastSuccessNotify("Logged out successfully.");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Logout failed.");
            console.log(error);
        };
    };

  return { login, register, logout };
  
};

export default useAuthCalls;