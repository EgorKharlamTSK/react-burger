import {useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css"
import {Link} from "react-router-dom";

export const ResetPassword = () => {
    const [valueLogin, setValueLogin] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const inputRef = useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={styles.parent}>
            <div className={styles.main}>
                <p className="text text_type_main-medium pb-6">
                    Восстановление пароля
                </p>
                <Input
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setValueLogin(e.target.value)}
                    value={valueLogin}
                    name={'email'}
                    error={false}
                    icon={'ShowIcon'}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValuePassword(e.target.value)}
                    value={valuePassword}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
                <Button htmlType="button" type="primary" size="large">
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
            </div>
        </div>
    )
}