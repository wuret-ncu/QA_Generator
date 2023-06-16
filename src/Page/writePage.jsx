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
// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: '17f82d1fc6fe4d0ba2a768d8836c3e89',
// });

//const openai = new OpenAIApi(configuration);

// const options = [
//   { value: 'collegeEntranceExam', label: '學測' },
//   { value: 'nationalExam', label: '會考' },
//   { value: 'TOEIC', label: '多益' },
// ];
const criteriaOptions = [
  { value: "TOEIC", label: "TOEIC" },
  { value: "TOEFL", label: "TOEFL" },
  { value: "IELTS", label: "IELTS" },
  // { value: "other", label: "other" },
];

// const TopicOptions = [
// ];


function WritingPage() {
  const navigation = useNavigate();
  const { score, setScore } = useContext(Context);
  const { comment, setComment } = useContext(Context);
  const [topicOption, setTopicOptions] = useState('');
  const { topic, setTopic } = useContext(Context);
  const { title, setTitle } = useContext(Context);
  const { essay, setEssay } = useContext(Context);
  const { criteria, setCriteria } = useContext(Context);
  const { wordCount, setWordCount } = useContext(Context);

  // const handleSubmit = async () => {
  //   openaiFinder.post(
  //     'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
  //     {
  //       prompt: `Use TOEIC's writing scoring standard to objectively score the above composition, including the accuracy of vocabulary and grammar, coherence and structure, logical thinking, completeness and coherence of information, etc., out of 100, what score would you give, and output directly Score will do, must not contain anything other than numbers:.
  //       The following are examples:
  //       input:
  //       Topic: Nature Science
  //       Title: The Galaxy: A Cosmic Marvel
  //       Essay: The galaxy, a celestial wonderland of stars and mysteries, has fascinated humanity for centuries. Spanning vast distances, it mesmerizes with its breathing beauty and intrigues with its enigmas. From the majestic Milky Way, our cosmic home, to the diverse array of galaxies, each with its own unique formation, the galaxy holds endless fascination. Stellar nurseries, where stars are born, captivate with their ethereal splendor. The discovery of exoplanets beyond our solar system fuels our quest for other habitable worlds. Yet, amid st these marvels , dark matter and dark energy remain elusive, intriguing researchers with their invisible presence. The galaxy stands as a testament to the limitless wonders of the universe, inspiring us to explore and unravel its mysteries. Its grandeur serves as a constant reminder of our place in the vast cosmic tapestry. Let us gaze at the night sky in awe, ever humbled by the magnificence of the galaxy and driven by the unquenchable thirst for knowledge, to explore the universe that lies beyond.
  //       output: 90

  //       Actual input:
  //       Topic: ${topic}
  //       Title: ${title}
  //       Essay: ${essay}
  //       output:`,
  //       temperature: 0.7,
  //       max_tokens: 2,
  //       top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //     .then(response => {
  //       // 解析回傳的資料，並設定quizQuestions狀態
  //       const score = response.data.choices[0].text
  //       console.log(score)
  //       setScore(parseInt(score));

  //       // navigation("/WritingScore")
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  //   openaiFinder.post(
  //     'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
  //     {
  //       prompt: `Use TOEIC's writing review standards to objectively comment on the following compositions, including vocabulary and grammar accuracy, coherence and structure, logical thinking, information integrity and coherence, etc. Please give suggestions and analysis within 150 words:
  //         Topic: ${topic}
  //         Title: ${title}
  //         Essay: ${essay}`,
  //       temperature: 0.7,
  //       max_tokens: 1000,
  //       top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //     .then(response => {
  //       // 解析回傳的資料，並設定quizQuestions狀態
  //       const comment = response.data.choices[0].text
  //       console.log(comment)
  //       setComment(comment);

  //       // navigation("/WritingScore")
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  //   navigation("/WritingScore")
  // };
  const handleSubmit = async () => {
    try {
      const scorePromise = openaiFinder.post(
        'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
        {
          prompt: `Use TOEIC's writing scoring standard to objectively score the above composition, including the accuracy of vocabulary and grammar, coherence and structure, logical thinking, completeness and coherence of information, etc., out of 100, what score would you give, and output directly Score will do, must not contain anything other than numbers:.
          The following are examples:
          input:
          Topic: Nature Science
          Title: The Galaxy: A Cosmic Marvel
          Essay: The galaxy, a celestial wonderland of stars and mysteries, has fascinated humanity for centuries. Spanning vast distances, it mesmerizes with its breathing beauty and intrigues with its enigmas. From the majestic Milky Way, our cosmic home, to the diverse array of galaxies, each with its own unique formation, the galaxy holds endless fascination. Stellar nurseries, where stars are born, captivate with their ethereal splendor. The discovery of exoplanets beyond our solar system fuels our quest for other habitable worlds. Yet, amid st these marvels , dark matter and dark energy remain elusive, intriguing researchers with their invisible presence. The galaxy stands as a testament to the limitless wonders of the universe, inspiring us to explore and unravel its mysteries. Its grandeur serves as a constant reminder of our place in the vast cosmic tapestry. Let us gaze at the night sky in awe, ever humbled by the magnificence of the galaxy and driven by the unquenchable thirst for knowledge, to explore the universe that lies beyond.
          output: 90
          
          Actual input:
          Topic: ${topic}
          Title: ${title}
          Essay: ${essay}
          output:`,
          temperature: 0.7,
          max_tokens: 2,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const commentPromise = openaiFinder.post(
        'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
        {
          prompt: `Use TOEIC's writing review standards to objectively comment on the following compositions, including vocabulary and grammar accuracy, coherence and structure, logical thinking, information integrity and coherence, etc. Please give suggestions and comment within 100 words:
            Topic: ${topic}
            Title: ${title}
            Essay: ${essay}`,
          temperature: 0.7,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const [scoreResponse, commentResponse] = await Promise.all([scorePromise, commentPromise]);

      const score = scoreResponse.data.choices[0].text;
      const comment = commentResponse.data.choices[0].text;

      console.log(score);
      console.log(comment)
      setScore(parseInt(score));
      setComment(comment);

      navigation("/WritingScore");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCriteriaChange = (value) => {
    setCriteria(value);
    console.log(value)
    //callopenaiapi
    // openaiFinder.post(
    //   'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
    //   {
    //     prompt: `Use TOEIC's writing scoring standard to objectively score the above composition, including the accuracy of vocabulary and grammar, coherence and structure, logical thinking, completeness and coherence of information, etc., out of 100, what score would you give, and output directly Score will do, must not contain anything other than numbers:.
    //     The following are examples:
    //     input:
    //     Topic: Nature Science
    //     Title: The Galaxy: A Cosmic Marvel
    //     Essay: The galaxy, a celestial wonderland of stars and mysteries, has fascinated humanity for centuries. Spanning vast distances, it mesmerizes with its breathing beauty and intrigues with its enigmas. From the majestic Milky Way, our cosmic home, to the diverse array of galaxies, each with its own unique formation, the galaxy holds endless fascination. Stellar nurseries, where stars are born, captivate with their ethereal splendor. The discovery of exoplanets beyond our solar system fuels our quest for other habitable worlds. Yet, amid st these marvels , dark matter and dark energy remain elusive, intriguing researchers with their invisible presence. The galaxy stands as a testament to the limitless wonders of the universe, inspiring us to explore and unravel its mysteries. Its grandeur serves as a constant reminder of our place in the vast cosmic tapestry. Let us gaze at the night sky in awe, ever humbled by the magnificence of the galaxy and driven by the unquenchable thirst for knowledge, to explore the universe that lies beyond.
    //     output: 90

    //     Actual input:
    //     Topic: Nature Science
    //     Title: Exploring the Vast Marvels of the Galaxy: A Journey through the Universe:
    //     Essay: The galaxy, a vast and awe-inspiring expansion, has captivated humanity's imagination for centuries. With its countless stars, planets, and mysteries waiting to be unraveled, the galaxy serves as a constant reminder of the limitless wonders of the universe. In this article, we embark on a journey through the galaxy, delving into its mesmerizing beauty and shedding light on the latest discoveries that continue to astound scientists and space enthusiasts alike.
    //     The galaxy, with its grandeur and mystique, continues to fuel our curiosity and inspire us to explore the universe. From the Milky Way to distant galaxies, stellar nurseries to exoplanets, and the enigma of dark matter and dark energy, each revelation unveils new wond ers and opens up infinite possibilities. As we gaze into the night sky, let us continue to marvel at the galaxy's beauty, and may our insatiable quest for knowledge carry us ever closer to understanding the vastness of our cosmic home.
    //     output:`,
    //     temperature: 0.7,
    //     max_tokens: 3,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )
    //   .then(response => {
    //     // 解析回傳的資料，並設定quizQuestions狀態
    //     const questions = response.data.choices[0].text
    //     console.log(questions)
    //     setScore(questions);
    //   })
    //   .catch(error => {
    //     console.error('123');
    //   })
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