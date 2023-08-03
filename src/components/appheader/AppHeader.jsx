import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {AppHeaderButton} from "./AppHeaderButton";
import headerStyles from './AppHeader.module.css'
export const AppHeader = () => {
    return(
        <header className={`container ${headerStyles.header}`}>
            <nav className={headerStyles.btn_groups_header}>
                <AppHeaderButton
                    text="Конструктор"
                    icon={<BurgerIcon type="secondary" />}
                    iconHover={<BurgerIcon type="primary" />}
                />
                <AppHeaderButton
                    text="Лента заказов"
                    icon={<ListIcon type="secondary" />}
                    iconHover={<ListIcon type="primary" />}
                />
            </nav>
            <Logo className='-m-l-5' />
            <AppHeaderButton
                text="Личный камбинет"
                icon={<ProfileIcon type="secondary" />}
                iconHover={<ProfileIcon type="primary" />}
            />
        </header>
    )
}