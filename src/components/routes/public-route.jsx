import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export const PublicRoute = ({element}) => {
    const auth = useSelector(state => state.auth)

    return auth.user.name !== '' ? element : <Navigate to="/" replace />;
}