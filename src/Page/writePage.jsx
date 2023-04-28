import { useState } from 'react';
import Select from 'react-select';

import TextareaAutosize from '@mui/base/TextareaAutosize';


// const options = [
//   { value: 'collegeEntranceExam', label: '學測' },
//   { value: 'nationalExam', label: '會考' },
//   { value: 'TOEIC', label: '多益' },
// ];

const TopicOptions = [
  { value:'自訂', label: '自訂' },
  { value: 'Topic1', label: 'Topic1' },
  { value: 'TOETopic2IC', label: 'Topic2' },
];


function WritingPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStandard, setSelectedStandard] = useState(null);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleStandardChange = (selectedStandard) => {
    setSelectedStandard(selectedStandard.target.value);
  };

  const wordCount = content.split(/\s+/).filter((word) => word !== '').length;
  return (
    <div className="flex flex-row mx-auto">
      {/* Main Content */}
      <main className="flex-1 p-6 flex">
        {/* Sidebar */}
        {/* Writing Area */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-4">Writing</h2>
        <TextareaAutosize
          className="border border-gray-400 p-2 w-11/12 h-64 mb-4 resize-none"
          placeholder="Start writing here..."
          value={content}
          onChange={handleContentChange}
          minRows={10}
          maxRows={31}
        />
        </div>
        <div className="w-1/3 mr-6">
          <h2 className="text-lg font-bold mb-4">Topic</h2>
          <Select
            className="mb-4"
            options={TopicOptions}
            value={selectedOption}
            onChange={handleOptionChange}
            placeholder="Select a topic"
          />
          <h2 className="text-lg font-bold mb-4">Title</h2>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full mb-4"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          <h2 className="text-lg font-bold mb-4">Word Count</h2>
          <div className="mb-4">{wordCount}</div>

          {/* <h2 className="text-lg font-bold mb-4">Scoring Criteria</h2> 
          <Select
            id="scoring"
            options={options}
            value={selectedStandard}
            onChange={handleStandardChange}
            className="flex-1"
          /> */}
          
          {/* Scoring Criteria */}
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-4">WScoring Criteria</h2>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  name="scoringCriteria"
                  value="collegeEntranceExam"
                  checked={selectedStandard === 'collegeEntranceExam'}
                  onChange={handleStandardChange}
                  className="mr-2"
                />
                學測
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="scoringCriteria"
                  value="nationalExam"
                  checked={selectedStandard === 'nationalExam'}
                  onChange={handleStandardChange}
                  className="mr-2"
                />
                會考
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="scoringCriteria"
                  value="toeic"
                  checked={selectedStandard === 'toeic'}
                  onChange={handleStandardChange}
                  className="mr-2"
                />
                多益
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="scoringCriteria"
                  value="other"
                  checked={selectedStandard === 'other'}
                  onChange={handleStandardChange}
                  className="mr-2"
                />
                其他
              </label>
            </div>
          </div>

          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>

        </div>
        
      </main>
    </div>
  );
};

export default WritingPage;        