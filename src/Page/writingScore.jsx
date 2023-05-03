// import React from "react";
// import { Link } from "react-router-dom";

// const WritingScore = (props) => {
//   const { topic, title, content, wordCount, score } = props;

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
//       <div className="p-6 bg-white rounded-lg shadow-lg w-96">
//         <h2 className="text-3xl font-bold mb-4 text-center">
//           Writing Analysis
//         </h2>
//         <div className="mb-4">
//           <span className="font-bold mr-2">Topic:</span>
//           {topic}
//         </div>
//         <div className="mb-4">
//           <span className="font-bold mr-2">Title:</span>
//           {title}
//         </div>
//         <div className="mb-4">
//           <span className="font-bold mr-2">Content:</span>
//           <div className="bg-gray-200 rounded-md p-2">{content}</div>
//         </div>
//         <div className="mb-4">
//           <span className="font-bold mr-2">Word Count:</span>
//           {wordCount}
//         </div>
//         <div className="mb-4">
//           <span className="font-bold mr-2">Score:</span>
//           {score}
//         </div>
//         <div className="flex justify-center">
//           <Link
//             to="/"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             OK
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WritingScore;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { BsFileText } from 'react-icons/bs';

const WritingScore = (props) => {
  const {
    topic,
    title,
    scoreCriteria,
    comment,
    wordCount,
    score,
    onOkButtonClick,
  } = props;

  
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