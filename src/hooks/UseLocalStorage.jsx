import { useEffect } from "react";
import { useState } from "react";

export const UseLocalStorage = (key, initialValue) => {

    // Getting what is originally saved
    const [value, setValue] = useState(() => {
        try {
            const localValue = window.localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : initialValue;
        }
        catch (err){
            console.log(err);
            return initialValue;
        }
    })
    
    // Saving to local storage
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])
    
    return [value, setValue];
}

export default UseLocalStorage
