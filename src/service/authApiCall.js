import axios from "axios";

export const login = async (userInfo) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}auth/login`,
            userInfo
        );
        console.log(data);
        // token shows on console
    } catch (error) {
        console.log(error);
    };
};