import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {

    const [test, setTest] = useState(false)
    const [Article, setArticle] = useState('請輸入自訂文章');
    const [historyPageId, setHistoryPageId] = useState();
    const [historyType, setHistoryType] = useState('');

    const [selectedOption, setSelectedOption] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [scoringCriteria, setScoringCriteria] = useState('');
    const [wordCount, setWordCount] = useState(0);

    return (
        <Context.Provider value={{ test, setTest, Article, setArticle, historyPageId, setHistoryPageId, historyType, setHistoryType, selectedOption, setSelectedOption, title, setTitle, content, setContent, scoringCriteria, setScoringCriteria, wordCount, setWordCount }}>
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

