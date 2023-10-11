import {URL} from "../../utils/constants";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export  const GET_ORDER_REQUEST_SUCCESS = "GET_ORDER_REQUEST_SUCCESS"
export  const GET_ORDER_REQUEST_FALIURE = "GET_ORDER_REQUEST_FALIURE"

export const getOrders = (allIngredients) => (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST})
    fetch(`${URL}/orders`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "ingredients": allIngredients
        })
    })
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error('Error on fetch')
            }
        })
        .then((data) => {
            dispatch({type: GET_ORDER_REQUEST_SUCCESS, payload: data.data})
        })
        .catch((error) => {
            console.log(error.message)
            dispatch({type: GET_ORDER_REQUEST_FALIURE})
        })
}