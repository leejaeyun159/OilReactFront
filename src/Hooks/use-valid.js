import { useState } from 'react';

const useValid = (valueValidFn) =>{
    const [enteredValue, setEnteredValue] = useState('');
    const [isBlur, setIsBlur] = useState(false);
    
    const valueIsValid = valueValidFn(enteredValue);
    const validError = !valueIsValid && isBlur;

    const enterChangeHandler = e =>{
        setEnteredValue(e.target.value);
    }
    const blurHandler = e =>{
        setIsBlur(true);
    }
    const reset = () =>{
        setEnteredValue('');
        setIsBlur(false);
    }
    return {
        value: enteredValue,
        isValid: valueIsValid,
        validError,
        enterChangeHandler,
        blurHandler,
        reset
    }
}
export default useValid;