import {URL} from "./constants";

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
    return fetch(`${URL}/ingredients`)
        .then(handleResponse)
        .then((data) => {
            if (data?.success) {
                return data.data;
            }
            return Promise.reject(data)
        });
};

export const getOrders = (allIngridients) => {
    return fetch(`${URL}/orders`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "ingredients": allIngridients
            })
        })
        .then(handleResponse)
        .then((data) => {
            if (data?.success) {
                return data;
            }
            return Promise.reject(data)
        });
}