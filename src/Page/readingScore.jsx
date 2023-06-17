import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../Contexts/Context";
import { Link } from "react-router-dom";
import Finder from '../API/Finder';

function ReadingScore(props) {
  const user_id = localStorage.getItem('user');
  const { Article, setArticle } = useContext(Context);
  const [TestResponse, setTestResponse] = useState(null);
  const [data, setData] = useState({});
  const [TranslateArticle,setTranslateArticle] = useState("");

  useEffect(()=>{
    console.log(TestResponse);
   
    //test_id, question, answer, user_answer
    if(TestResponse){
      getData();
    }
    
  },[TestResponse])
  
  useEffect(()=>{
    console.log(TranslateArticle);
  
    
  },[TranslateArticle])

  const getData = async() =>{
    const QuestionResponse =  await Finder.get(`history/read/${TestResponse.data.id}`);
    console.log(QuestionResponse.data)
    QuestionResponse.data[0].ReadArticleQuestion.sort((a, b) => a.question.localeCompare(b.question));
    for (let i = 0 ; i<5 ;i++){
      QuestionResponse.data[0].ReadArticleQuestion[i].ReadArticleChoice.sort((a, b) => a.choice.localeCompare(b.choice));
    }

    setData(QuestionResponse.data);
  }
  
  const Translation = async (prompt) => {
    await Finder.post(
      'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
      {
        prompt:
         `Please translate the following to Traditional Chinese : '''${prompt}'''`,
        temperature: 0.4,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => {
        console.log(prompt);
        // 解析回傳的資料，並設定quizQuestions狀態
        setTranslateArticle(response.data.choices[0].text);   
        // questions.sort((a, b) => (a.question > b.question) ? 1 : -1);
      })
      .catch(error => {
        console.error(error);
      })
  }

  //初次渲染時執行
  useEffect(()=>{
    getTestData();
    Translation(Article);
  },[]);

  const getTestData = async() =>{
    const QuestionResponse =  await Finder.get(`/UserRead/getNewUserReadByUserId/${user_id}`);
    console.log(QuestionResponse.data);
    setTestResponse(QuestionResponse);
    
  }


  // 生成題目和選項
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
                qa[i].user_answer === each.choice.slice(0,1)? 
                  qa[i].user_answer === qa[i].answer? 
                    'text-green-500' // 使用者答案和正確答案一樣，設定綠色
                  :
                    'text-red-500' // 使用者答案和正確答案不一樣，設定紅色
                : 
                  qa[i].answer === each.choice.slice(0,1)? 
                    'text-green-500' // 使用者未選擇該答案，但是該答案是正確答案，設定綠色
                  : 
                   '' 
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Questions  {correct}/5</h2>
          <h2 className="text-2xl font-bold mb-4">Score: <span className={correct < 3 ? 'text-red-500' : 'text-green-500'}>{correct * 20}</span></h2>
        </div>
        {/* <h2 className="text-2xl font-bold mb-4 ">Questions  {correct}/5</h2> */}
        <div className="p-3">
          {readQuestion()}
        </div>
        <div className="flex items-center my-8">
          {/* <h3 className="text-xl font-medium text-gray-900">
            {data.length > 0 &&
            <>Test Date : <span className="text-gray-600"> {data[0].createdAt.slice(0,10)}</span></>
            }
          </h3> */}
        </div>
      </>)
    }

  return (
    <div className="container flex flex-row mx-auto">
      <div className="w-1/2 p-8">
        <h2 className="text-l font-bold mb-4 ">Article</h2>
        <textarea
          className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          style={{ resize: "none" }}
          rows="15"
          value={Article}
          readOnly
        />
        <h2 className="text-l font-bold mb-4 my-8 ">Translation</h2>
        <textarea
          className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          style={{ resize: "none" }}
          rows="15"
          value={TranslateArticle}
          readOnly
        />
      </div>

      <div className="md:w-1/3 mx-16 my-8 p-4">
        { data.length >0 &&
          <>{readHistory()}</>
        }

        {/* { data &&
          // <><h2 className="text-2xl font-bold mb-4 ">Questions  {data[0].score /20 }/5</h2>
          { readHistory()}
          // </>

        } */}
        

        <div className="flex justify-end col-span-12">
          <Link
            to="/"
            className="btn text-white btn-primary"
          >
            End Test
          </Link>

        </div>
      </div>
    </div>
  );
}


export default ReadingScore;
