import {useState} from "react";

export function useForms(inputValues={}) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}