import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import styles from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {quitUser} from "../../../services/actions/quit-user";
import {editProfile, profile} from "../../../services/actions/profile";

export const Profile = () => {
    const dispatch = useDispatch()
    const quitProfStore = useSelector(state => state.quitUser)
    const loginStore = useSelector(state => state.auth)
    const profileInfo = useSelector(state => state.profileData)

    const [valueName, setValueName] = useState('')
    const [valueLogin, setValueLogin] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const inputRef = useRef(null)
    const refreshToken = localStorage.getItem('refreshToken')
    const accessToken = loginStore.accessToken
    const [changeValues, setChangeValues] = useState(false)
    // const accessToken = loginStore.accessToken.replace('Bearer ', '').trim()
    const [nameChanged, setNameChanged] = useState(false);
    const [loginChanged, setLoginChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handleNameChangeValue = e => {
        setValueName(e.target.value);
        setNameChanged(true);
    };
    const handleLoginChangeValue = e => {
        setValueLogin(e.target.value);
        setLoginChanged(true);
    };
    const handlePasswordChangeValue = e => {
        setValuePassword(e.target.value);
        setPasswordChanged(true);
    };

    const quitProfile = (refreshToken) => {
        dispatch(quitUser(refreshToken))
    }

    const handleChangeProfData = () => {
        setChangeValues(true)
    }

    const handleSubmit = e => {
        e.preventDefault();
        let submitData = {};
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
        dispatch(editProfile(accessToken, submitData))
    };


    useEffect(() => {
        dispatch(profile(accessToken))
        if (profileInfo.isLoading) {
            setValueName(profileInfo.user.name)
            setValueLogin(profileInfo.user.email)
        }
    }, []);

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
                >
                    История заказов
                </NavLink>
                <NavLink
                    onClick={() => quitProfile(refreshToken)}
                    className= {({isActive}) => isActive ? `active text text_type_main-medium` : `text text_type_main-medium`}
                    style={isActive => ({
                        color: isActive && "white"
                    })}
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
                        value={valueName}
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
                        value={valueLogin}
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
                        value={valuePassword}
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