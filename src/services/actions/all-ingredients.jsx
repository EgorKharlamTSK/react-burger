import {URL} from "./../../utils/constants";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST"
export  const GET_INGREDIENTS_REQUEST_SUCCESS = "GET_INGREDIENTS_REQUEST_SUCCESS"
export  const GET_INGREDIENTS_REQUEST_FALIURE = "GET_INGREDIENTS_REQUEST_FALIURE"

export const getAllIngredients = () => (dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    fetch(`${URL}/ingredients`)
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error('Error on fetch')
            }
        })
        .then((data) => {
            dispatch({type: GET_INGREDIENTS_REQUEST_SUCCESS, payload: data.data})
        })
        .catch((error) => {
            console.log(error.message)
            dispatch({type: GET_INGREDIENTS_REQUEST_FALIURE})
        })
}