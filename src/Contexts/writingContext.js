import { useState, createContext } from "react";
export const WritingContext = createContext();

export const WritingContextProvider = (props) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [scoringCriteria, setScoringCriteria] = useState('');
    // const [test, setTest] = useState(false)
    // const [Article, setArticle] = useState('請輸入自訂文章');
    // const [historyPageId, setHistoryPageId] = useState();
    // const [historyType, setHistoryType] = useState('');
    return (
        <WritingContext.Provider value={{ selectedOption, setSelectedOption, title, setTitle, content, setContent, scoringCriteria, setScoringCriteria }}>
            {props.children}
        </WritingContext.Provider>
    )
}

