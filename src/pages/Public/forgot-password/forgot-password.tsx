import {useEffect, useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {forgotPass} from "../../../services/actions/auth";
import {useDispatch} from "../../../services/hooks/use-dispatch";
import {useSelector} from "../../../services/hooks/use-selector";

export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const forgotPassStore = useSelector((state:any) => state.auth.forgotPassword)
    const [valueLogin, setValueLogin] = useState<string>('')
    const [errMsg, setErrMsg] = useState<string>('')
    const inputRef = useRef(null)
    const location = useLocation();
    const isFromForgotPassword = location.pathname === "/forgot-password"
    const handleSendEmail = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        valueLogin !== undefined && dispatch(forgotPass(valueLogin))
    }

    useEffect(() => {
        if (forgotPassStore.success && isFromForgotPassword) {
            navigate("/reset-password");
        }
    }, [forgotPassStore]);

    useEffect(() => {
        setErrMsg(forgotPassStore.message)
    }, [forgotPassStore.message]);

    return (
        <div className={styles.parent}>
            <form onSubmit={handleSendEmail} className={styles.main}>
                <p className="text text_type_main-medium pb-6">
                    Восстановление пароля
                </p>
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setValueLogin(e.target.value)}
                    value={valueLogin}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
                {errMsg ?
                    (
                        <p>
                            {errMsg}
                        </p>
                    )
                    : <></>
                }
                <Button htmlType="submit" type="primary" size="large">
                    Восстановить
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