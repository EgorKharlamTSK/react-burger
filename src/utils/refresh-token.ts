import {getNewToken} from "../services/actions/update-token";
import {AppDispatch} from "./types";

export const refreshToken = async (dispatch: AppDispatch):Promise<any> => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
        throw new Error("No refresh token found in local storage")
    }
    try{
        const result = await dispatch(getNewToken(refreshToken))
        return result
    } catch (error) {
        console.error("error on new token request");
        throw error;
    }
}