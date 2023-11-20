import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import styles from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {quitUser} from "../../../services/actions/quit-user";
import {CHECK_AUTH, checkAuth, editProfile, profile} from "../../../services/actions/profile";
import {getNewToken} from "../../../services/actions/update-token";

type SubmitData = {
    email?: string;
    name?: string;
    password?: string;
};

export const Profile = () => {
    const dispatch = useDispatch()
    const profileInfo = useSelector((state: any) => state.profileData)
    const navigate = useNavigate()
    const [valueName, setValueName] = useState('')
    const [valueLogin, setValueLogin] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const inputRef = useRef(null)
    const refreshToken = localStorage.getItem('refreshToken')
    const accessToken = localStorage.getItem('accessToken')
    const [changeValues, setChangeValues] = useState(false)
    const [nameChanged, setNameChanged] = useState(false);
    const [loginChanged, setLoginChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handleNameChangeValue = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValueName(e.target.value);
        setNameChanged(true);
    };
    const handleLoginChangeValue = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValueLogin(e.target.value);
        setLoginChanged(true);
    };
    const handlePasswordChangeValue = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValuePassword(e.target.value);
        setPasswordChanged(true);
    };

    const quitProfile =  async (refreshToken: string) => {
        dispatch(quitUser(refreshToken))
        navigate('/login', {replace: true})
    }
    const handleChangeProfData = () => {
        setChangeValues(true)
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let submitData:SubmitData = {};
        if (loginChanged) {
            submitData.email = valueLogin;
        }
        if (nameChanged) {
            submitData.name = valueName;
        }
        if (passwordChanged) {
            submitData.password = valuePassword;
        } else {
            submitData.password = ''
        }
        if (accessToken && submitData) {
            dispatch(editProfile(accessToken, submitData))
            setChangeValues(false)
        }
    };

    useEffect(() => {
        setValueName(profileInfo.user.name)
        setValueLogin(profileInfo.user.email)
    }, [profileInfo]);

    return(
        <div className={`${styles.main} mt-30 container pl-5`}>
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
                    to="/profile"
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
            <div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleNameChangeValue}
                        value={valueName ? valueName : "Идет загрузка имени"}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={handleChangeProfData}
                        errorText={'Ошибка'}
                        icon={'EditIcon'}
                        size={'default'}
                        extraClass="ml-1 pb-6"
                        disabled={!changeValues && true}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={handleLoginChangeValue}
                        value={valueLogin ? valueLogin : "Идет загрузка логина"}
                        name={'email'}
                        error={false}
                        icon={'EditIcon'}
                        ref={inputRef}
                        onIconClick={handleChangeProfData}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 pb-6"
                        disabled={!changeValues && true}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Пароль'}
                        onChange={handlePasswordChangeValue}
                        icon={'EditIcon'}
                        value={valuePassword ? valuePassword : ""}
                        name={'password'}
                        error={false}
                        ref={inputRef}
                        onIconClick={handleChangeProfData}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 pb-6"
                        disabled={!changeValues && true}
                    />
                    {changeValues ? (
                        <div className={styles.formBtns}>
                            <Button onClick={() => setChangeValues(false)} htmlType="button" type="primary" size="small" extraClass={`ml-2 ${styles.cancel}`}>
                                Отмена
                            </Button>
                            <Button htmlType="submit" type="primary" size="small" extraClass={`ml-2 ${styles.suc}`}>
                                Сохранить изменения
                            </Button>
                        </div>
                    ) : <></>}
                </form>
            </div>
        </div>
    )
}