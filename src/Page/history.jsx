import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../Contexts/Context";
import { Link } from "react-router-dom";
import { BsFileText } from 'react-icons/bs';
import Finder from '../API/Finder';
import { useNavigate } from "react-router-dom"

function History() {

    const { historyPageId, setHistoryPageId } = useContext(Context);
    const { historyType, setHistoryType } = useContext(Context);
    const { history, setHistory } = useContext(Context);
    const { historyIndex, setHistoryIndex } = useContext(Context);

    const [data, setData] = useState({});
    const [article, setArticle] = useState();
    const [title, setTitle] = useState();

    useEffect(()=>{
    console.log(historyIndex)
    },[historyIndex])

    useEffect(()=>{
      console.log(data[0]);
      if(data.length >0){
        if(historyType === 'read'){
          setArticle(data[0].ReadArticle.article)
          setTitle(data[0].ReadArticle.title)
        }else{
          setArticle(data[0].essay)
          setTitle(data[0].title)
        }
      }
   
    
    },[data])

    const fetchRead = async () => {
      try {
        const response = await Finder.get(`/history/read/${historyPageId}`);
        response.data[0].ReadArticleQuestion.sort((a, b) => a.question.localeCompare(b.question));
        for (let i = 0 ; i<5 ;i++){
          response.data[0].ReadArticleQuestion[i].ReadArticleChoice.sort((a, b) => a.choice.localeCompare(b.choice));
        }
        setData(response.data);
      } catch (err) {
        console.log(err)
      } 
    };

    const fetchWrite = async () => {
      console.log('test')
      try {
        const response = await Finder.get(`/history/write/${historyPageId}`);        
        setData(response.data)

      } catch (err) {
        console.log(err)
      } 
    };

    useEffect(() => {
      console.log(historyType)
      if(historyPageId !==''){
        if(historyType === 'read'){
          fetchRead()
        }else{
          fetchWrite()
        }
      }
      
    }, [historyPageId]);


    useEffect(() => {

      console.log(historyPageId)
    }, [historyPageId]);

    function writeHistory(){
      if(data[0].UserWriteArticle){
        return <>
          <div className="flex items-center justify-center">   
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Writing Result
            </h2>
          </div>
          <div>
            <div className="flex items-center my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-center">
                Score : <span className="text-2xl text-red-500">{data[0].score}</span> <span className="text-gray-600"> / 100</span>
              </h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Topic : <span className="text-gray-600"> {data[0].UserWriteArticle.topic} </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Title : <span className="text-gray-600"> {data[0].title} </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Score Criteria : <span className="text-gray-600"> {data[0].criteria} </span>
              </h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Comment : </h3>
            </div>
            <p className="text-xl border border-gray-300 text-gray-600 rounded-md p-4 my-4">{data[0].comment}</p>
            <div className="flex items-center my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Word Count : <span className="text-gray-600"> {data[0].wordCount} </span>
              </h3>
            </div>
            <div className="flex items-center my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
              Test Date : <span className="text-gray-600"> {data[0].createdAt.slice(0,10)} </span>
              </h3>
            </div>
        </div></>
    }
  }


    function readQuestion(){
      console.log(data)
      if(data[0].ReadArticleQuestion){

        const qa = data[0].ReadArticleQuestion
        console.log(qa)
        const questions = [];
        for (let i = 0; i < qa.length; i++) {
          const options = qa[i].ReadArticleChoice;
          questions.push(
            <div key={i} className="mb-4">
              <p className="font-bold mb-2">{i+1}. {qa[i].question}</p>
              { options.map((each, index) => {return( 
                <label key={index} className={`inline-flex items-center ml-6 ${
                  qa[i].user_answer === each.choice.slice(0,1)
                    ? qa[i].user_answer === qa[i].answer
                      ? 'text-green-500' // 使用者答案和正確答案一樣，設定綠色
                      : 'text-red-500' // 使用者答案和正確答案不一樣，設定紅色
                    : qa[i].answer === each.choice.slice(0,1)
                    ? 'text-green-500' // 使用者未選擇該答案，但是該答案是正確答案，設定綠色
                    : ''
                }`}>
      
                <input
                  type="radio"
                  className="form-radio text-indigo-600 text-green-500"
                  name={`question${i}`}
                  value={each.choice}
                  checked={each.choice.slice(0,1) === qa[i].user_answer}
                  disabled
                />
                <span className="ml-2">{each.choice}</span>
              </label>
              )})}
              {/* <label className="inline-flex items-center text-red-500">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  name={`question${i}`}
                />
                <span className="ml-2">{options[0].choice}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  name={`question${i}`}
                  value={options[1].choice}
                />
                <span className="ml-2">{options[1].choice}</span>
              </label>
              <label className="inline-flex items-center ml-6 text-green-500">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  name={`question${i}`}
                  value={options[2].choice}
                />
                <span className="ml-2">{options[2].choice}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  name={`question${i}`}
                  value={options[3].choice}
                />
                <span className="ml-2">{options[3].choice}</span>
              </label> */}
            </div>
          );
        }
        return questions;
      }
    }

    function readHistory() {
      const correct = (data[0].score)/20;
        return (
        <>
        <h2 className="text-2xl font-bold mb-4 ">Questions  {correct}/5</h2>
          <div className="p-3">
            {readQuestion()}
          </div>
          <div className="flex items-center my-8">
            <h3 className="text-xl font-medium text-gray-900">
              {data.length > 0 &&
              <>Test Date : <span className="text-gray-600"> {data[0].createdAt.slice(0,10)}</span></>
              }
            </h3>
          </div>
        </>)
      }
  

      const LastHistory = async() =>{
        if(historyIndex === 0){
          alert('第一筆了')
        }else{
          console.log(history[historyIndex-1]);
          const newHistory = history[historyIndex-1]
          setHistoryIndex(historyIndex-1)
          setHistoryPageId(newHistory.id);
          const type = newHistory.UserWriteArticle ? 'write' : 'read';
          console.log(type)
          setHistoryType(type);
        }
      }

      function NextHistory(){
        if(historyIndex === history.length -1){
          alert('最後一筆了')
        }else{
          console.log(history[historyIndex+1]);
          const newHistory = history[historyIndex+1]
          setHistoryIndex(historyIndex+1)
          setHistoryPageId(newHistory.id);
          const type = newHistory.UserWriteArticle ? 'write' : 'read';
          console.log(type)
          setHistoryType(type);
        }
      }


    return ( 
        <div className="container flex mx-auto">
            <div className="w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4 ">Article</h2>
                {historyType === 'read' &&
                 <div className="text-xl ">Title :  {title}</div>
                }
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    value={article ? article : ''}
                    rows="30"
                    readOnly
                />
                {/* <h2 className="text-2xl font-bold mb-4 my-8 ">Translation</h2>
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    rows="15"
                    readOnly
                /> */}
            </div>
            
            <div className="md:w-1/2 mx-8 my-8 h-screen">
                { data.length >0 &&
                  <>{historyType === 'read' ? readHistory() : writeHistory()}</>
                }
                <div className="flex my-6 justify-end col-span-12">
                    <Link
                    to="/analysis"
                    className="btn text-white btn-primary"
                    >
                    Return
                    </Link>
                </div>
                <div className="my-6 flex justify-between">
                  <div className="col">
                      <Link
                      //to="/analysis"
                      onClick={e => LastHistory()}
                      className=""
                      >
                      &lt; 上一篇
                      </Link>
                  </div>
                  <div className="col">
                      <Link
                      onClick={e => NextHistory()}
                      className=""
                      >
                      下一篇 &gt;
                      </Link>
                  </div>
                </div>
            </div>
        </div>
  )
}

export default History