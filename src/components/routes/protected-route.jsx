import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRouteElement = ({ element, anonymous = false }) => {
    const isLoggedIn = useSelector(state => state.profileData.isAuthLoading);
    const userData = useSelector(state => state.profileData.isAuth)
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