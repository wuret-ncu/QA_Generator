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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Writing Result
            </h2>
            {/* <Link to="/" className="text-gray-500 hover:text-gray-700">
              <GrEdit className="inline-block mr-1 -mt-1" /> Edit Writing
            </Link> */}
          </div>
          <div className="my-6">
            <div className="flex items-center mb-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Topic:Cooking</h3>
            </div>
            <div className="flex items-center mb-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Title:How to Make a Cup of Coffee</h3>
            </div>
            <div className="flex items-center mb-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Score Criteria:TOEIC
              </h3>
            </div>
            <div className="flex items-center mb-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">Comment:</h3>
            </div>
            <p className="border border-gray-300 rounded-md p-2">Your article was clear and well-organized, with good grammar and accuracy. However, it lacked originality and didn't offer any new insights. Overall, a solid effort.</p>
            <div className="flex items-center my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Word Count: 750
              </h3>
            </div>
            <div className="flex items-center my-4">
              <BsFileText className="inline-block mr-3 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900">
                Score: 85 / 100
              </h3>
            </div>
            </div>
            <div className="flex justify-end">
                <Link
                    to="/"
                    className="btn text-white btn-primary"
                    >
                    End Test
                </Link>
            </div>
        </div>
      </div> 
    </div>);
};
export default WritingScore;