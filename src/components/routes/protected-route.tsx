import { Navigate, useLocation } from "react-router-dom";
import {FC} from "react";
import {IProtectedRouteElement} from "../../utils/types";
import {useSelector} from "../../services/hooks/use-selector";

export const ProtectedRouteElement:FC<IProtectedRouteElement> = ({ element, anonymous = false }) => {
    const isLoggedIn = useSelector((state) => state.profileData.isAuthLoading);
    const userData = useSelector((state) => state.profileData.isAuth)
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