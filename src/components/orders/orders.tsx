import {ProfileSidebar} from "../profile-sidebar/profile-sidebar";
import {useDispatch} from "../../services/hooks/use-dispatch";
import {useNavigate} from "react-router-dom";
import {quitUser} from "../../services/actions/quit-user";
import styles from "./orders.module.css"
import {FeedItem} from "../feed-item/feed-item";
export const Orders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const refreshToken = localStorage.getItem('refreshToken')

    const quitProfile =  async (refreshToken: string) => {
        dispatch(quitUser(refreshToken))
        navigate('/login', {replace: true})
    }

    return (
        <div className={`${styles.main} mt-30 container pl-5`}>
            <ProfileSidebar refreshToken={refreshToken} quitProfile={quitProfile} />
            <div className={styles.feedItem}>
                <FeedItem />
            </div>
        </div>
    )
}