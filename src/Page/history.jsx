import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../Contexts/Context";
import { Link } from "react-router-dom";
import { BsFileText } from 'react-icons/bs';


function history() {

    //const {Article, setArticle} = useContext(Context);
    

    // useEffect(() => {
    //   setArticle(Article);
    // }, [Article]);

    function writeHistory(){
        return <>
      
          <div className="flex items-center justify-center">   
            <h2 className="text-2xl font-bold text-gray-900 my-4">
              Writing Result
            </h2>
          </div>
          <div className="my-6">
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Topic:<span className="text-gray-600"> Cooking </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Title:<span className="text-gray-600"> How to Make a Cup of Coffee </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Score Criteria:<span className="text-gray-600"> TOEIC </span>
              </h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Comment:</h3>
            </div>
            <p className="text-xl border border-gray-300 text-gray-600 rounded-md p-4 my-4">Your article was clear and well-organized, with good grammar and accuracy. However, it lacked originality and didn't offer any new insights. Overall, a solid effort. Your article was clear and well-organized, with good grammar and accuracy. However, it lacked originality and didn't offer any new insights. Overall, a solid effort.</p>
            <div className="flex items-center my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Word Count:<span className="text-gray-600"> 750 </span>
              </h3>
            </div>
            <div className="flex items-center my-4 justify-between">
              <div className="flex items-center my-4">
                <BsFileText className="inline-block mr-3 text-gray-400" />
                <h3 className="text-xl font-medium text-center">
                  Score: <span className="text-2xl text-red-500">85</span> <span className="text-gray-600"> / 100</span>
                </h3>
              </div>
              
            </div>
        </div></>
    }


    function readHistory() {
        const questions = [<h2 className="text-2xl font-bold mb-4 ">Questions  4/5</h2>];
        for (let i = 1; i <= 5; i++) {
          const options = [
            `Option ${i}A`,
            `Option ${i}B`,
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
  
    return ( 
        <div className="container flex mx-auto">
            <div className="w-1/2 p-8">
                <h2 className="text-xl font-bold mb-4 ">Article</h2>
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    rows="15"
                    readOnly
                />
                <h2 className="text-xl font-bold mb-4 my-8 ">Translation</h2>
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    rows="15"
                    readOnly
                />
            </div>
            
            <div className="md:w-1/3 mx-16 my-8 p-4">
                
                {writeHistory()}
                
                <div className="flex justify-end col-span-12">
                    <Link
                    to="/"
                    className="btn text-white btn-primary"
                    >
                    Return
                    </Link>

                </div>
            </div>
        </div>
  )
}

export default history