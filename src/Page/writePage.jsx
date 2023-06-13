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
import axios from 'axios';
import openaiFinder from '../API/openaiFinder';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '17f82d1fc6fe4d0ba2a768d8836c3e89',
});

const openai = new OpenAIApi(configuration);

const options = [
  { value: 'collegeEntranceExam', label: '學測' },
  { value: 'nationalExam', label: '會考' },
  { value: 'TOEIC', label: '多益' },
];
const criteriaOptions = [
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
  const { topic, setTopic } = useContext(Context);
  const { title, setTitle } = useContext(Context);
  const { essay, setEssay } = useContext(Context);
  const { criteria, setCriteria } = useContext(Context);
  const { wordCount, setWordCount } = useContext(Context);

  const handleSubmit = () => {
    navigation("/WritingScore")
  };

  const handleCriteriaChange = (value) => {
    setCriteria(value);
    console.log(value)
    //callopenaiapi
    openaiFinder.post(
      'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
      {
        prompt:
          'Generate a multiple choice quiz from the text below. Quiz should contain at least 5 questions. Each answer choice should be on a separate line, with a blank line separating each question.\n\nA neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich. Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars. Neutron stars have a radius on the order of 10 kilometers (6.2 mi) and a mass of about 1.4 solar masses. They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.\n\nExample:\nQ1. What is a neutron star?\nA. The collapsed core of a massive supergiant star\nB. The smallest and densest stellar object\nC. A white hole\nD. A quark star',
        temperature: 0.8,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => {
        // 解析回傳的資料，並設定quizQuestions狀態
        const questions = response.data.choices[0].text
        console.log(questions)
      })
      .catch(error => {
        console.error('123');
      })
  };
  //callopenaiapi

  const handleTopicChange = (value) => {
    setTopic(value);
    console.log(value)
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value)
  };

  const handleEssayChange = (e) => {
    setEssay(e.target.value);
    console.log(e.target.value)
    setWordCount(essay.split(/\s+/).filter((word) => word !== '').length);
  };

  // const [quizQuestions, setQuizQuestions] = useState([]);
  useEffect(() => {
    Finder.get('http://localhost:8003/api/WriteArticle/getTopic', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const data = response.data;
        const options = data.map(topics => ({ value: topics.id, label: topics.topic }));
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
            value={essay}
            onChange={handleEssayChange}
            minRows={10}
            maxRows={31}
          />
        </div>

        <div className="w-1/3 mr-6">
          <h2 className="text-lg font-bold mb-4">Topic</h2>
          <Select
            className="border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 mb-4"
            options={topicOption}
            value={topic}
            onChange={handleTopicChange}
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

            <RadioGroup className="flex items-center space-x-4 mb-8" name="scoringCriteria" selectedValue={criteria} onChange={handleCriteriaChange}>
              {criteriaOptions.map((option) => (
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