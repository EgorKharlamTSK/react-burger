import {ProfileSidebar} from "../profile-sidebar/profile-sidebar";
import {useDispatch} from "../../services/hooks/use-dispatch";
import {useNavigate} from "react-router-dom";
import {quitUser} from "../../services/actions/quit-user";
import styles from "./orders.module.css"
import {OrderItem} from "../order-item/order-item";
import {connect as connectWS, disconnect as disConnectWS} from "../../services/actions/ws-actions";
import {ORDER_URL} from "../../utils/constants";
import {useEffect} from "react";
import {useSelector} from "../../services/hooks/use-selector";
import {IOrders, IWsFeedsItem} from "../../utils/types";

export const Orders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const refreshToken = localStorage.getItem('refreshToken')
    const accessToken = localStorage.getItem('accessToken')?.toString()
    const orders = useSelector(state => state.wsFeeds.orders)

    const connect = () => dispatch(connectWS(`${ORDER_URL}?token=${accessToken}`))
    const disconnect = () => dispatch(disConnectWS())

    useEffect(() => {
        connect()
        return () => {
            disconnect()
        }
    }, []);

    const quitProfile =  async (refreshToken: string) => {
        dispatch(quitUser(refreshToken))
        navigate('/login', {replace: true})
    }

    return (
        <div className={`${styles.main} mt-30 container pl-5`}>
            <ProfileSidebar refreshToken={refreshToken} quitProfile={quitProfile} />
            <div className={styles.feedItem}>
                {orders ? orders?.orders.map((item: IWsFeedsItem) => {
                   return <OrderItem
                       key={item.number}
                       data={item}
                   />
                }) :
                <p>Идет загрузка заказов</p>}
            </div>
        </div>
    )
}