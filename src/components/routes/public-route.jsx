import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export const PublicRoute = ({element}) => {
    const location = useLocation()

    const auth = useSelector(state => state.auth)
    const from = location.state?.from || '/';


    return auth.user.name !== '' ? element : <Navigate to={ from } />;
}