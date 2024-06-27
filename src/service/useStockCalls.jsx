import {
    fetchStart,
    fetchFail,
    getStockSuccess,
    getProPurBranFirmSuccess,
} from "../features/stockSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";

const useStockCalls = () => {
    const { axiosWithToken } = useAxios();
    const dispatch = useDispatch();

    //   const getFirms = async () => {
    //     dispatch(fetchStart())
    //     try {
    //       const { data } = await axiosWithToken("/firms/")
    //       dispatch(getFirmsSuccess(data.data))
    //     } catch (error) {
    //       dispatch(fetchFail())
    //       toastErrorNotify("Firm bilgileri çekilemedi.")
    //     }
    //   }

    //   const getSales = async () => {
    //     dispatch(fetchStart())
    //     try {
    //       const { data } = await axiosWithToken("/sales/")
    //       dispatch(getSalesSuccess(data.data))
    //     } catch (error) {
    //       dispatch(fetchFail())
    //       toastErrorNotify("Sales bilgileri çekilemedi.")
    //     }
    //   }

    const getStocks = async (url = "firms") => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken(`/${url}/`)
            const apiData = data.data
            dispatch(getStockSuccess({ apiData, url }))
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${url} data cannot be pulled.`)
        }
    }

    const getProPurBranFirm = async () => {
        dispatch(fetchStart())
        try {
            const [products, purchases, brands, firms] = await Promise.all([
                axiosWithToken("/products/"),
                axiosWithToken("/purchases/"),
                axiosWithToken("/brands/"),
                axiosWithToken("/firms/"),
            ])
            dispatch(
                getProPurBranFirmSuccess([
                    products?.data?.data,
                    purchases?.data?.data,
                    brands?.data?.data,
                    firms?.data?.data,
                ])
            )
        } catch (error) {
            dispatch(fetchFail())
        }
    }

    const deleteStock = async (url = "firms", id) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.delete(`/${url}/${id}/`)
            toastSuccessNotify(`${url} data is deleted.`)
            getStocks(url)
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${url} data cannot be deleted.`)
        }
    }

    const postStock = async (url = "firms", info) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.post(`/${url}/`, info)
            toastSuccessNotify(`${url} data added.`)
            getStocks(url)
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${url} data cannot be added.`)
        }
    }

    const putStock = async (url = "firms", info) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.put(`/${url}/${info._id}`, info)
            toastSuccessNotify(`${url} data updated...`)
            getStocks(url)
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${url} data cannot be updated...`)
        }
    }

    return { getStocks, deleteStock, postStock, putStock, getProPurBranFirm };
};

export default useStockCalls;