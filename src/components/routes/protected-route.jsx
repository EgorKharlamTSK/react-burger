import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
export const ProtectedRouteElement = ({element}) => {
    const auth = useSelector(state => state.auth)
    const [isUserLoaded, setUserLoaded] = useState(false)
    const location = useLocation()
    const init = async () => {
        if (auth.success) {
            setUserLoaded(true)
        }
    }

    useEffect(() => {
        init()
    }, [])

    if (!auth.success) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return auth.user.name ? element : null;
}