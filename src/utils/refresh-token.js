import {getNewToken} from "../services/actions/update-token";

export const refreshToken = async (dispatch) => {
    const refreshToken = localStorage.getItem("refreshToken")
    try{
        await dispatch(getNewToken(refreshToken));
    } catch (error) {
        console.log("error on new token request")
    }
}