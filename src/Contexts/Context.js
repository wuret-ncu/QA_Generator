import {useState, createContext} from "react";

export const Context = createContext();

export const ContextProvider = (props) =>{

        const [ test, setTest ] = useState(false)
        const [Article, setArticle] = useState('請輸入自訂文章');

        return (
            <Context.Provider value={{  test, setTest ,Article, setArticle }}>
                {props.children}
            </Context.Provider>
        )
}

// export const Article = createContext();
// export const ArticleProvider = (props) =>{

//     const [Article, setArticle] = useState('');

//     return (
//         <Context.Provider value={{  Article, setArticle }}>
//             {props.children}
//         </Context.Provider>
//     )
// }

