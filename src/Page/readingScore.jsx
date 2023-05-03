import React, { useState, useEffect,useContext } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../Contexts/Context";
import { Link } from "react-router-dom";


function ReadingScore(props) {
    // const { article } = props.location.state.article;
    // console.log(article); 

    const {Article, setArticle} =  useContext(Context);
    

    // useEffect(() => {
    //   setArticle(Article);
    // }, [Article]);
    function generateQuestions() {
        const questions = [];
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
        <div className="container flex flex-row mx-auto">
            <div className="w-1/2 p-8">
                <h2 className="text-l font-bold mb-4 ">Article</h2>
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    rows="15"
                    value={Article}
                    readOnly
                />
                <h2 className="text-l font-bold mb-4 my-8 ">Translation</h2>
                <textarea
                    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    style={{resize: "none"}}
                    rows="15"
                    value={Article}
                    readOnly
                />
            </div>
            
            <div className="md:w-1/3 mx-16 my-8 p-4">
                <h2 className="text-2xl font-bold mb-4 ">Questions  4/5</h2>
                {generateQuestions()}
                
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
