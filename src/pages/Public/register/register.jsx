import {useEffect, useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRegistration} from "../../../services/actions/registration";
import {registrationReducer} from "../../../services/reducers/registration";

export const Register = () => {
    const dispatch = useDispatch()
    const regStore = useSelector(state => state.registration)
    const [valueName, setValueName] = useState('')
    const [valueLogin, setValueLogin] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const inputRef = useRef(null)
    const [errorText, setErrorText] = useState('')
    const handleReg = (name, login, password) => {
        dispatch(getRegistration(name, login, password))
    }

    useEffect(() => {
        if (regStore.errorMessage !== null) {
            setErrorText(regStore.errorMessage)
        }
    }, [regStore.errorMessage]);

    return (
        <div className={styles.parent}>
            <div className={styles.main}>
                <p className="text text_type_main-medium pb-6">
                    Регистрация
                </p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValueName(e.target.value)}
                    value={valueName}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 pb-6"
                />
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
                <Button htmlType="button" type="primary" size="large" onClick={() => handleReg(valueName, valueLogin, valuePassword)}>
                    Зарегистрироваться
                </Button>
                <div className={`${styles.textBlocks} pt-20`}>
                    {errorText ? (
                        <p className="text text_type_main-default" style={{color: "red"}}>
                            {errorText}
                        </p>
                    ) : (
                        <></>
                    )}
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
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