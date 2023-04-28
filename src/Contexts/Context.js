import {useState, createContext} from "react";

export const Context = createContext();

export const ContextProvider = (props) =>{

        const [ test, setTest ] = useState('123')
    
        return (
            <Context.Provider value={{  test, setTest }}>
                {props.children}
            </Context.Provider>
        )
    }

