export const checkResponse = (res) => {
    if(res.ok) {
        return res.json()
    } else {
        throw new Error('Error on fetch')
    }
}