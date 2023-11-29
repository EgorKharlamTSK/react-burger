import styles from "../../pages/Private/profile/profile.module.css";
import {NavLink} from "react-router-dom";
import {FC} from "react";

interface ISideBar {
    refreshToken: string | null,
    quitProfile: (refreshToken: string) => Promise<void>
}

export const ProfileSidebar: FC<ISideBar> = ({refreshToken, quitProfile}) => {
    return (
        <div className={`${styles.links} mr-15`}>
            <NavLink to={{pathname: "/profile"}}
                     className= {({isActive}) => isActive ? `active text text_type_main-medium` : `text text_type_main-medium`}
                     style={isActive => ({
                         color: isActive && "white"
                     })}
            >
                Профиль
            </NavLink>
            <NavLink
                className= {({isActive}) => isActive ? `active text text_type_main-medium` : `text text_type_main-medium`}
                style={isActive => ({
                    color: isActive && "white"
                })}
                to="/orders"
            >
                История заказов
            </NavLink>
            <NavLink
                onClick={() => {
                    refreshToken && quitProfile(refreshToken)
                }
                }
                className= {({isActive}) => isActive ? `active text text_type_main-medium` : `text text_type_main-medium`}
                style={isActive => ({
                    color: isActive && "white"
                })}
                to="/profile"
            >
                Выход
            </NavLink>
            <p className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </div>
    )
}