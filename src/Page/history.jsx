import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../Contexts/Context";
import { Link } from "react-router-dom";
import { BsFileText } from 'react-icons/bs';
import Finder from '../API/Finder';

function History() {

    const { historyPageId, setHistoryPageId } = useContext(Context);
    const { historyType, setHistoryType } = useContext(Context);
    const [data, setData] = useState({});
    
    useEffect(()=>{
console.log(data);
    },[data])

    const fetchRead = async () => {
      try {
        const response = await Finder.get(`/history/read/${historyPageId}`);
        setData(response.data);
      } catch (err) {
        console.log(err)
      } 
    };

    const fetchWrite = async () => {
      try {
        const response = await Finder.get(`/history/write/${historyPageId}`);
        setData(response.data)
        
      } catch (err) {
        console.log(err)
      } 
    };
    useEffect(() => {
      if(historyType === 'read'){
        fetchRead()
      }else{
        fetchWrite()
      }
    
    }, [historyType]);


    useEffect(() => {

      console.log(historyPageId)
    }, [historyPageId]);

    function writeHistory(){
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
              <h3 className="text-xl font-medium text-gray-900">Title : <span className="text-gray-600"> {data[0].UserWriteArticle.title} </span></h3>
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
                Word Count : <span className="text-gray-600"> {data[0].words} </span>
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


    function readQuestion(){
      const questions = [];
      for (let i = 1; i <= 5; i++) {
        const options = [
          `Option ${i}AOption ${i}AOption ${i}AOption ${i}AOption ${i}A`,
          `Option ${i}BOption ${i}AOption ${i}AOption ${i}AOption`,
          `Option ${i}C`,
          `Option ${i}D`,
        ];
        questions.push(
          <div key={i} className="mb-4">
            <p className="font-bold mb-2">Question {i}</p>
            <label className="inline-flex items-center text-red-500">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name={`question${i}`}
                value={options[0]}
              />
              <span className="ml-2">{options[0]}</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name={`question${i}`}
                value={options[1]}
              />
              <span className="ml-2">{options[1]}</span>
            </label>
            <label className="inline-flex items-center ml-6 text-green-500">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name={`question${i}`}
                value={options[2]}
              />
              <span className="ml-2">{options[2]}</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name={`question${i}`}
                value={options[3]}
              />
              <span className="ml-2">{options[3]}</span>
            </label>
          </div>
        );
      }
      return questions;
    }

    function readHistory() {
        return (<>
        <h2 className="text-2xl font-bold mb-4 ">Questions  4/5</h2>
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
  
    return ( 
        <div className="container flex mx-auto">
            <div className="w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4 ">Article</h2>
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    rows="15"
                    readOnly
                />
                <h2 className="text-2xl font-bold mb-4 my-8 ">Translation</h2>
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    rows="15"
                    readOnly
                />
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
                      to="/analysis"
                      className=""
                      >
                      &lt; 上一篇
                      </Link>
                  </div>
                  <div className="col">
                      <Link
                      to="/analysis"
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