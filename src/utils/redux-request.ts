import {checkResponse} from "./check-response";
import PropTypes from "prop-types";
import {refreshToken} from "./refresh-token";
import {TDispatch} from "./types";

export const reduxRequest = async (url: string, options?:{ method: string;  headers: { [key: string]: any };  body?: any;}, dispatch?:TDispatch) => {
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
