import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { BsFileText } from 'react-icons/bs';
import { useContext } from "react";
import { Context } from '../Contexts/Context'


function WritingScore() {
  const { selectedOption, title, scoringCriteria, wordCount } = useContext(Context);
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
              <h3 className="text-xl font-medium text-gray-900">Topic:<span className="text-gray-600"> {selectedOption.value} </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Title:<span className="text-gray-600"> {title} </span></h3>
            </div>
            <div className="flex items-center mb-4 my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Score Criteria:<span className="text-gray-600"> {scoringCriteria}</span>
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
                Word Count:<span className="text-gray-600"> {wordCount}</span>
              </h3>
            </div>
            <div className="flex items-center my-4 justify-between">
              <div className="flex items-center my-4">
                <BsFileText className="inline-block mr-3 text-gray-400" />
                <h3 className="text-xl font-medium text-center">
                  Score: <span className="text-2xl text-red-500">85</span> <span className="text-gray-600"> / 100</span>
                </h3>
              </div>
              <div className="items-end">
                <Link
                  to="/"
                  className="btn text-white btn-primary"
                >
                  End Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default WritingScore;