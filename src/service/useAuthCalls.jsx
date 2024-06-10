import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";


const useAuthCalls = () => {

    const login = async (userInfo) => {
        const navigate = useNavigate();
    
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}auth/login`,
                userInfo
            );
            toastSuccessNotify("Login succeed.");
            navigate("/stock");
        } catch (error) {
            toastErrorNotify("Login failed.")
            console.log(error);
        };
    };


  return { login }
}

export default useAuthCalls