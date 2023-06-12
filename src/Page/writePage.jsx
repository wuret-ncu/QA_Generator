import { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { RadioGroup, Radio } from 'react-radio-group';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Link } from "react-router-dom";
import Finder from '../API/Finder';
import { data } from 'autoprefixer';
import { useNavigate } from "react-router-dom"
import { Context } from '../Contexts/Context';
import { WritingContext } from '../Contexts/writingContext';


const options = [
  { value: 'collegeEntranceExam', label: '學測' },
  { value: 'nationalExam', label: '會考' },
  { value: 'TOEIC', label: '多益' },
];
const scoringCriteriaOptions = [
  { value: "collegeEntranceExam", label: "College Entrance Exam" },
  { value: "TOEIC", label: "TOEIC" },
  { value: "GED", label: "GED" },
  // { value: "other", label: "other" },
];

// const TopicOptions = [
// ];


function WritingPage() {
  const navigation = useNavigate();
  const [topicOption, setTopicOptions] = useState('');
  const { selectedOption, setSelectedOption } = useContext(Context);
  const { title, setTitle } = useContext(Context);
  const { content, setContent } = useContext(Context);
  const { scoringCriteria, setScoringCriteria } = useContext(Context);
  const { wordCount, setWordCount } = useContext(Context);

  const handleSubmit = () => {
    navigation("/WritingScore")
  };

  const handleScoringCriteriaChange = (value) => {
    setScoringCriteria(value);
    console.log(value)
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    console.log(value)
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value)
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(e.target.value)
    setWordCount(content.split(/\s+/).filter((word) => word !== '').length);
  };

  useEffect(() => {
    Finder.get('http://localhost:8003/api/WriteArticle/getTopic', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const data = response.data;
        const options = data.map(topic => ({ value: topic, label: topic }));
        setTopicOptions(options);
        console.log(options);
        // 导航到 "/login"
      })
      .catch(error => console.error(error))
  }, []);

  return (
    <div className="container mx-auto my-8">
      {/* Main Content */}
      <main className="flex-1 p-6 flex">
        {/* Writing Area */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-4">Writing</h2>
          <TextareaAutosize
            className="border-2 border-gray-400 rounded-md p-2 w-11/12 focus:outline-none focus:border-blue-500 resize-none"
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
            className="border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 mb-4"
            options={topicOption}
            value={selectedOption}
            onChange={handleOptionChange}
            placeholder="Select a topic"
          />

          <h2 className="text-lg font-bold mb-4">Title</h2>
          <div className="col-span-8">
            <input
              type="text"
              className="w-full border-2 border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mb-4"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <h2 className="text-lg font-bold mb-4">Word Count</h2>
          <div className="mb-4 text-gray-500"> {wordCount}</div>

          <div className="col-span-12">
            <p className="text-lg font-bold mb-4">Scoring Criteria</p>

            <RadioGroup className="flex items-center space-x-4 mb-8" name="scoringCriteria" selectedValue={scoringCriteria} onChange={handleScoringCriteriaChange}>
              {scoringCriteriaOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 text-lg">
                  <Radio className="text-brand" value={option.value} />
                  <span>{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="col-span-12">
            <button className="btn text-white btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>

            {/* <button className="btn text-white btn-primary">Submit</button> */}
          </div>
        </div >

      </main >
    </div >
  );
};

export default WritingPage;        