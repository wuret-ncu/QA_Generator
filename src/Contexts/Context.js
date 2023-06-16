import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {

    const [test, setTest] = useState(false)
    const [Article, setArticle] = useState('請輸入自訂文章');
    const [history, setHistory] = useState([]);
    const [historyPageId, setHistoryPageId] = useState();
    const [historyType, setHistoryType] = useState('');
    const [historyIndex, setHistoryIndex] = useState();
    

    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [essay, setEssay] = useState('');
    const [criteria, setCriteria] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');

    return (
        <Context.Provider value={{ test, setTest, Article, setArticle, history, setHistory, historyPageId, setHistoryPageId, historyType, setHistoryType, historyIndex, setHistoryIndex, topic, setTopic, title, setTitle, essay, setEssay, criteria, setCriteria, wordCount, setWordCount,score, setScore, comment, setComment}}>
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

