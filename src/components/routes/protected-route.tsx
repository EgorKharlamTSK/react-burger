import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {FC} from "react";
import {IProtectedRouteElement} from "../../utils/types";

export const ProtectedRouteElement:FC<IProtectedRouteElement> = ({ element, anonymous = false }) => {
    const isLoggedIn = useSelector((state:any) => state.profileData.isAuthLoading);
    const userData = useSelector((state:any) => state.profileData.isAuth)
    const location = useLocation();

    if (isLoggedIn) {
        return <p>Загрузка</p>;
    }

    if (anonymous && userData) {
        const { from } = location.state || {from: {pathname: "/"}};
        return <Navigate to={ from } />;
    }

    if (!anonymous && !userData) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return element;
};