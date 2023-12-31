import {FormEvent, SyntheticEvent, useEffect, useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {resetPassword} from "../../../services/actions/reset-password";
import {useDispatch} from "../../../services/hooks/use-dispatch";
import {useSelector} from "../../../services/hooks/use-selector";

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const successRequesReset = useSelector((state) => state.resetPassword)
    const navigate = useNavigate()
    const [valueToken, setToken] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const inputRef = useRef(null)
    const location = useLocation();
    const isFromForgotPassword = location.state?.from === "/forgot-password"

    const getNewPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let submitData = {
            "password": valuePassword,
            "token": valueToken
        }
        dispatch(resetPassword(submitData))
    }

    useEffect(() => {
        if (successRequesReset.success && isFromForgotPassword) {
            navigate("/login");
        }
    }, [successRequesReset]);

    return (
        <div className={styles.parent}>
            <form onSubmit={getNewPassword} className={styles.main}>
                <p className="text text_type_main-medium pb-6">
                    Восстановление пароля
                </p>
                <Input
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setValuePassword(e.target.value)}
                    value={valuePassword}
                    name={'password'}
                    error={false}
                    icon={'ShowIcon'}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setToken(e.target.value)}
                    value={valueToken}
                    name={'token'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
                <Button htmlType="submit" type="primary" size="large">
                    Сохранить
                </Button>
                <div className={`${styles.textBlocks} pt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                        <span className="ml-2">
                            <Link to='/login'>
                                Войти
                            </Link>
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}