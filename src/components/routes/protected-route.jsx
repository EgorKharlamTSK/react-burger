import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
export const ProtectedRouteElement = ({element}) => {
    const auth = useSelector(state => state.auth)
    const [isUserLoaded, setUserLoaded] = useState(false)

    const init = async () => {
        if (auth.success) {
            setUserLoaded(true)
        }
    }

    useEffect(() => {
        init()
    }, [])

    if (!auth.success) {
        return <Navigate to="/login" replace />;
    }

    return auth.user.name ? element : null;
}
