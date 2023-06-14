import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { BsFileText } from 'react-icons/bs';
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from '../Contexts/Context'
import Finder from '../API/Finder';


function WritingScore() {
  const navigation = useNavigate();
  const user_id = localStorage.getItem('user');
  console.log(user_id)
  const { topic, title, criteria, wordCount, essay } = useContext(Context);
  const { score, setScore } = useContext(Context);
  const { comment, setComment } = useContext(Context);
  const article_id = topic.value
  console.log(article_id)
  const handleEndTest = () => {
    console.log(user_id, essay, score, article_id, title, wordCount, criteria, comment)
    Finder.post('http://localhost:8003/api/UserWrite/create', {
      user_id, essay, score, article_id, title, wordCount, criteria, comment,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        navigation("/")
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="h-screen">
      <div className="mx-auto max-w-3xl p-6">
        <div className="bg-white shadow-lg rounded-md p-6">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-900 my-4">
              Writing Result
            </h2>
          </div>
          <div className="my-6">
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Topic:<span className="text-gray-600"> {topic.label} </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Title:<span className="text-gray-600"> {title} </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Score Criteria:<span className="text-gray-600"> {criteria}</span>
              </h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Comment:</h3>
            </div>
            <p className="text-xl border border-gray-300 text-gray-600 rounded-md p-4 my-4">{comment}</p>
            <div className="flex items-center my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Word Count:<span className="text-gray-600"> {wordCount}</span>
              </h3>
            </div>
            <div className="flex items-center my-4 justify-between">
              <div className="flex items-center my-4">
                <BsFileText className="inline-block mr-3 text-gray-400" />
                <h3 className="text-xl font-medium text-center">
                  Score: <span className="text-2xl text-red-500">{score}</span> <span className="text-gray-600"> / 100</span>
                </h3>
              </div>
              <div className="items-end">
                <button className="btn text-white btn-primary"
                  onClick={handleEndTest}
                >
                  End Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default WritingScore;