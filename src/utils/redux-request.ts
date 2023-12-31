import {checkResponse} from "./check-response";
import {refreshToken} from "./refresh-token";
import {AppDispatch} from "./types";

export const reduxRequest = async (url: string, options?:{ method: string;  headers: { [key: string]: string };  body?: string}, dispatch?:AppDispatch) => {
    return fetch(url, options).then(checkResponse).catch(async error => {
       if (error.message === "jwt expired") {
          const refreshData = await refreshToken(dispatch!);
          if (!refreshData.success) {
             await Promise.reject(refreshData);
          }
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          localStorage.setItem("accessToken", refreshData.accessToken)
          options!.headers.authorization = refreshData.accessToken;
          const res = await fetch(url, options);
          return await checkResponse(res);
       } else {
          return Promise.reject(error)
       }
    })
}
