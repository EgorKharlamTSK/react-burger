import {getNewToken} from "../services/actions/update-token";
import {IRefreshData, TDispatch} from "./types";

export const refreshToken = async (dispatch: TDispatch): Promise<IRefreshData> => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
        throw new Error("No refresh token found in local storage")
    }
    try{
        const result:IRefreshData = await getNewToken(refreshToken)(dispatch)
        return result
    } catch (error) {
        console.error("error on new token request");
        throw error;
    }
}