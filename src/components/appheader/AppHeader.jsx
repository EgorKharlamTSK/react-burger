import React, {useState} from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {AppHeaderButton} from "./AppHeaderButton";
import headerStyles from './AppHeader.module.css'
export const AppHeader = () => {
    const [hoverConstr, setHoverConstr] = useState(false);
    const [hoverList, setHoverList] = useState(false);
    const [hoverLk, setHoverLk] = useState(false);

    return(
        <header className={`${headerStyles.header_bg}`}>
            <div className={`container ${headerStyles.header}`}>
                <nav className={headerStyles.btn_groups_header}>
                    <AppHeaderButton
                        text="Конструктор"
                        icon={<BurgerIcon type={hoverConstr ? 'primary' : 'secondary'} />}
                        setHover={setHoverConstr}
                    />

                    <AppHeaderButton
                        text="Лента заказов"
                        icon={<ListIcon type={hoverList ? 'primary' : 'secondary'} />}
                        setHover={setHoverList}
                    />
                </nav>
                <Logo className='-m-l-5' />
                <AppHeaderButton
                    text="Личный камбинет"
                    icon={<ProfileIcon type={hoverLk ? 'primary' : 'secondary'} />}
                    setHover={setHoverLk}
                />
            </div>
        </header>
    )
}