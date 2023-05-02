import {useState, createContext} from "react";

export const Context = createContext();

export const ContextProvider = (props) =>{

        const [ test, setTest ] = useState(false)
    
        return (
            <Context.Provider value={{  test, setTest }}>
                {props.children}
            </Context.Provider>
        )
    }

