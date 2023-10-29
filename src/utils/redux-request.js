import {checkResponse} from "./check-response";
import PropTypes from "prop-types";

export const reduxRequest = (url, options) => {
   return fetch(url, options).then(checkResponse)
}

reduxRequest.propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.shape({
        method: PropTypes.string,
        headers: PropTypes.shape({
            "Content-type": PropTypes.string
        }),
        body: PropTypes.shape({
            data: PropTypes.object
        }),
    })
}