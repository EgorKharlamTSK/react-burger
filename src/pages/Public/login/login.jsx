import {useEffect, useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css"
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../../../services/actions/auth";
import {useForms} from "../../../services/hooks/use-forms";
import {editProfile} from "../../../services/actions/profile";

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginStore = useSelector(state => state.auth)
    const [valueLogin, setValueLogin] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const inputRef = useRef(null)

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(getAuth(valueLogin, valuePassword))
    }

    useEffect(() => {
        if (loginStore.success === true) {
            navigate("/")
            localStorage.setItem("refreshToken", loginStore.refreshToken)
        }
    }, [loginStore]);

    if (loginStore.success === true) {
        return (
            <Navigate to="/" replace />
        )
    }

    return (
        <div className={styles.parent}>
            <form onSubmit={(e) => handleLogin(e)} className={styles.main}>
                <p className="text text_type_main-medium pb-6">
                    Вход
                </p>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={e => setValueLogin(e.target.value)}
                    value={valueLogin}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    onChange={e => setValuePassword(e.target.value)}
                    icon={'ShowIcon'}
                    value={valuePassword}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
                <Button htmlType="submit" type="primary" size="large" >
                    Вход
                </Button>
                <div className={`${styles.textBlocks} pt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                        <span className="ml-2">
                            <Link to='/register'>
                                Зарегистрироваться
                            </Link>
                        </span>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pt-4">
                        Забыли пароль?
                        <span className="ml-2">
                            <Link to='/forgot-password'>
                                Восстановить пароль
                            </Link>
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}