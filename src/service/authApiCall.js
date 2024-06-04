import axios from "axios";

const login = async () => {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`);
};