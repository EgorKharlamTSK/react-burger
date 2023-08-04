import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../../utils/data";

export const BurgerConstructorList = () => {
    const firstItem = data.shift()
    const lastItem = data[data.length - 1]

    return (
        <div className={`pt-25`} style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', height: '73vh'}}>
            <ConstructorElement
                key={firstItem._id}
                type="top"
                isLocked={true}
                text={firstItem.name}
                price={firstItem.price}
                thumbnail={firstItem.image_mobile}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', height: '80vh'}}>
                {data && data.length !== 0 ?
                    data.map((item) => {
                        if(item !== firstItem && item !== lastItem){
                            return <ConstructorElement
                                key={item._id}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        }
                    }) : null
                }
            </div>

            <ConstructorElement
                key={lastItem._id}
                type="bottom"
                isLocked={true}
                text={lastItem.name}
                price={lastItem.price}
                thumbnail={lastItem.image_mobile}
            />
        </div>
    )
}