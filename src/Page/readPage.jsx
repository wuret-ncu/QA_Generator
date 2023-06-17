import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ReadingScore from "./readingScore";
// import { useNavigate } from "react-router-dom"
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Context } from "../Contexts/Context";
import { postRead, postReadArticleQuestion, postReadArticleChoice } from "../API/Finder";
import Finder from '../API/Finder';
// import ChatComponent from '../API/gpt';

const options = ["自訂", "Topic 1", "Medicine and Health", "Topic 3"]; // 下拉式選單的選項
const allTitle = ["", "Topic 1's Article Title.", "The Importance of Medicine and Health in Modern Society", "Topic 3's Article Title."]
const allArticle = ["", "In 2009, the Taiwu Elementary School Folk Singers were invited to perform in Belgium, France, Germany, and Luxemburg. In 2011, they were voted as one of the world’s top five performance groups by audiences of Japan Broadcasting Corporation’s Amazing Voice program. Recalling the group’s first tour in Europe, Camake Valaule, a physical education teacher and the founder of the Taiwu Elementary School Folk Singers, admitted that he felt very nervous. He was worried that the audience would fall asleep since most of the 75-minute performance was a cappella, that is, singing without instrumental sound. Surprisingly, the audience listened with full focus and high spirits. Camake said, “They told me afterward that through our performance, they had a vision of our country, our village, without having to visit it. This experience greatly boosted our confidence.” According to Camake Valaule, singing traditional ballads has helped students and their parents to re-understand their culture. “It used to be that the only ones who could sing these songs were tribal elders aged between 50 and 60. Now with the children performing the pieces, parents are beginning to ask, ‘Why do we not know how to sing these ballads?’ Many times nowadays, it is the children who teach the songs to their parents, putting back the pieces of a blurred memory.” Winning international fame, however, was neither the original intention nor the main reason why Camake founded the group in 2006. The most important thing was to make children understand why they sing these songs and to preserve and pass on their culture. Referring to the relocation of Taiwu Elementary School and Taiwu Village following Typhoon Morakot in August 2009, Camake said, “We could not take the forest or our houses in the mountains with us; but we were able to bring our culture along. As long as the children are willing to sing, I will always be there for them, singing with them and leading them to experience the meaning of the ballads.”"
  , "Medicine and health play a vital role in today's society, shaping the well-being and quality of life for individuals and communities worldwide. With advancements in medical research, technology, and healthcare systems, we have witnessed significant improvements in disease prevention, treatment, and overall health outcomes. This article will explore the importance of medicine and health, highlighting their impact on individuals, society, and global well-being.\n\nThe field of medicine encompasses a wide range of disciplines, including preventive care, diagnostics, therapeutics, and rehabilitation. It focuses not only on treating illnesses but also on promoting health and preventing diseases through vaccinations, screenings, and lifestyle modifications. The proactive approach to healthcare has resulted in the decline of certain infectious diseases and a better understanding of risk factors associated with chronic conditions.\n\nMedical advancements have revolutionized treatment options, enabling doctors to combat diseases more effectively. The development of pharmaceuticals, surgical techniques, and medical devices has expanded treatment possibilities, providing hope for individuals facing various health challenges. Additionally, breakthroughs in genetic research and personalized medicine have paved the way for tailored treatment plans, optimizing patient outcomes and reducing adverse reactions.\n\nMoreover, medicine and health have a profound impact on society as a whole. Healthy individuals contribute to a productive workforce, driving economic growth and development. Accessible healthcare services promote social equality, ensuring that everyone, regardless of socioeconomic status, can receive necessary medical attention. Governments and policymakers recognize the significance of healthcare and allocate resources to enhance healthcare infrastructure, support research, and improve public health initiatives.\n\nBeyond the individual and societal levels, medicine and health also have a global impact. The interconnectedness of our world allows diseases to spread rapidly across borders, making global health cooperation crucial. Collaborative efforts among nations, organizations, and healthcare professionals are vital in addressing public health emergencies, such as infectious disease outbreaks and natural disasters. Through knowledge sharing, resource allocation, and coordinated response strategies, we can effectively mitigate the impact of global health threats.\n\nHowever, challenges persist in the realm of medicine and health. Access to quality healthcare remains unequal, particularly in underprivileged regions. Health disparities based on socioeconomic factors, race, and gender continue to exist, highlighting the need for equitable healthcare provision. Additionally, emerging infectious diseases and antimicrobial resistance pose ongoing challenges, requiring continuous research, surveillance, and innovative interventions.\n\nIn conclusion, medicine and health are of paramount importance in modern society. They not only improve individual well-being but also shape communities and contribute to global health. By prioritizing healthcare access, promoting preventive measures, fostering medical advancements, and addressing health inequalities, we can create a healthier future for all."
  , "Topic 3's Article Content."]
let ReadArticleId = 0

function ReadPage() {

  const { } = useContext(Context);
  const navigation = useNavigate();
  const [selectedOption, setSelectedOption] = useState(options[0]); // 當前選擇的Topic
  const [title, setTitle] = useState("請輸入自訂標題"); // 文章標題
  const [wordCount, setWordCount] = useState(0); // 文章總字數
  const [titleReadOnly, setTitleReadOnly] = useState(false);// 標題唯讀判斷
  const [articleReadOnly, setＡrticleReadOnly] = useState(false);// 標題唯讀判斷
  const [showQuestions, setShowQuestions] = useState(false);
  const [showGenerator, setShowGenerator] = useState(true);
  let data = [];
  let choice = [];
  const user_id = localStorage.getItem('user');
  const [questions, setQuestion] = useState([]);
  const { Article, setArticle } = useContext(Context);
  const [GPTdata, setGPTData] = useState(null);
  // let questionList = [];
  const [questionList, setquestionList] = useState([]);
  // let choiceAList = [];
  // let choiceBList = [];
  // let choiceCList = [];
  // let choiceDList = [];
  const [choiceAList, setchoiceAList] = useState([]);
  const [choiceBList, setchoiceBList] = useState([]);
  const [choiceCList, setchoiceCList] = useState([]);
  const [choiceDList, setchoiceDList] = useState([]);



  // let answerL = [];
  let userAnswerL = ["", "", "", "", ""];
  const [answerList, setanswerList] = useState([]);
  const [userAnswerList, setuserAnswerList] = useState(["","","","",""]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [TestId, setTestId] = useState(0);
  const [QuestionId, setQuestionId] = useState(0);
  // const [selectedValue, setSelectedValue] = useState('');
  // const [questionNumber, setQuestionNumber] = useState(0);

  const createUserRead = async (user_id, article_id, score, correct_answer) => {
    try {
      const response = await Finder.post("/UserRead/create", {
        user_id, article_id, score, correct_answer,
        headers: { 'Content-Type': 'application/json' }
      });
      // data = response.data;
      setTestId(response.data.id);
      console.log(response);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (TestId != 0) {
      console.log(TestId);
      console.log("===============");
      const create = async () => {
        for (let i = 0; i < 5; i++) {
          console.log(questionList[i], answerList[i]);
          const response = await Finder.post("/ReadArticleQuestion/create", { test_id: TestId, question: questionList[i], answer: answerList[i], user_answer: userAnswerList[i] });
          console.log(response.data);
          createChoice(response.data.id, choiceAList[i]);
          createChoice(response.data.id, choiceBList[i]);
          createChoice(response.data.id, choiceCList[i]);
          createChoice(response.data.id, choiceDList[i]);
        }

        navigation("/readingScore");
      }

      create()
      // navigation("/readingScore");
      //createQuestion();
    }
  }, [TestId])

  // const createQuestion = async (test_id, question, answer, user_answer) => {
  //   try {
  //     const response = await Finder.post("/ReadArticleQuestion/create", {
  //       test_id, question, answer, user_answer,
  //       headers: { 'Content-Type': 'application/json' }
  //     });
  //     data = response.data;
  //     //setQuestionId(response.data.id);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };

  useEffect(() => {
    if (QuestionId != 0) {
      createChoice();
    }
  }, [QuestionId])

  const createChoice = async (question_id, choice) => {
    try {
      const response = await Finder.post("/ReadArticleChoice/create", {
        question_id, choice,
        headers: { 'Content-Type': 'application/json' }
      });
      data = response.data;
    } catch (err) {
      console.log(err)
    }
  };

  const handleOptionChange = (event, questionIndex) => {
    userAnswerL[questionIndex] = event.target.value;
    if(userAnswerL.every(answer => answer !== "")){
      setuserAnswerList(userAnswerL);
      setCanSubmit(true);
    };
    console.log(userAnswerL);
   

    // const SubmitBool = flase;
    
  };

  useEffect(()=>{
    // console.log(userAnswerList);
    // const SubmitBool = userAnswerList.every(answer => answer !== "");
    // console.log(SubmitBool);
    // setCanSubmit(SubmitBool);
  },[userAnswerList]);

  const createTest = async () => {

    try {
      // setuserAnswerList();
      let correctNum = 0;
      console.log(answerList);
      console.log(userAnswerList);
      for (let i = 0; i < 5; i++) {
        if (answerList[i] == userAnswerList[i]) {
          correctNum += 1;
        }
      }

      await createUserRead(user_id, 1, correctNum * 20, correctNum);

      // for (let i = 0;i < 5; i++){
      //   await createQuestion(TestId, questionList[i], answerList[i], userAnswerList[i]);
      // }

      // for (let i = 0;i < 5; i++){
      //   await createChoice(QuestionId, choiceAList[i]);
      //   await createChoice(QuestionId, choiceBList[i]);
      //   await createChoice(QuestionId, choiceCList[i]);
      //   await createChoice(QuestionId, choiceDList[i]);
      // }
    }
    catch (err) {
      console.log(err)
    }


  }

  // const fetchGPT = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/openai');
  //     const jsonData = await response.json();
  //     // setGPTData(jsonData);
  //     console.log(jsonData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (choiceAList.length > 0) {
      generateQuestions();
    }
  }, [choiceAList, choiceBList, choiceCList, choiceDList])

  const fetchGPTData = async (prompt) => {
    await Finder.post(
      'https://qag02.openai.azure.com/openai/deployments/QAG02/completions?api-version=2022-12-01&api-key=1343d3e41dd14a498bb8461abd5d59dc',
      {
        prompt:
          `Generate a multiple-choice quiz from the text below. The quiz must contain 5 questions. Each correct answer can't be in the same option(A, B, C, D) and each answer choice should be on a separate line, with a blank line separating each question. Finally, give me the correct answer to each question.\n\n'''
         Example input:
         A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich. Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars. Neutron stars have a radius on the order of 10 kilometers (6.2 mi) and a mass of about 1.4 solar masses. They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.
         
         Example output:
         Q1. What is a neutron star?
         A. The collapsed core of a massive supergiant star
         B. The smallest and densest stellar object
         C. A white hole
         D. A quark star
         
         ans: A
         '''\n\nactual context:${prompt}`,
        temperature: 0.4,
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
        console.log(prompt);
        // 解析回傳的資料，並設定quizQuestions狀態
        const questions = response.data.choices[0].text
        console.log(questions);
        console.log("----------");


        // const splitQuestions = questions.match(/Q\d+\..+?(?=\nQ\d+\.|\n$)/gs);
        // const splitChoices = questions.match(/(?<=\n)[A-D]\..+(?=\n[A-D]\.|$)/gs);
        // console.log(splitChoices);
        // const regex = /Q\d+\.\s+/g; // 正則表達式來匹配問題的開始位置
        const regex = /\Q.*\?/g;
        console.log(questions.match(regex))
        setquestionList(questions.match(regex));

        const ChoiceA_regex = /^A\..*$/gm;
        const ChoiceB_regex = /^B\..*$/gm;
        const ChoiceC_regex = /^C\..*$/gm;
        const ChoiceD_regex = /^D\..*$/gm;
        // questionList = questions.match(regex);
        // questionList = splitQuestions.map(question => question.trim());

        // choiceAList = splitChoices.map(choice => choice.split('\n')[0]);
        // choiceBList = splitChoices.map(choice => choice.split('\n')[1]);
        // choiceCList = splitChoices.map(choice => choice.split('\n')[2]);
        // choiceDList = splitChoices.map(choice => choice.split('\n')[3]);

        setchoiceAList(questions.match(ChoiceA_regex));
        setchoiceBList(questions.match(ChoiceB_regex));
        setchoiceCList(questions.match(ChoiceC_regex));
        setchoiceDList(questions.match(ChoiceD_regex));

        // for (let i = 0; i <= 4; i++){
        //   createQuestion(test_id, questionList[0], answer, user_answer);
        // }
        // const regex = /ans:\s*([A-Z])/g;

        const Answer_regex = /ans:\s+(\w)/gm;
        setanswerList([...questions.matchAll(Answer_regex)].map(match => match[1]));
        console.log(answerList);
      })
      .catch(error => {
        console.error(error);
      })
  }

  // 模擬文章生成，每次選擇改變時重新生成文章
  async function ReadingGenerator() {

    const a = options.indexOf(selectedOption)
    if (a === 0) {
      const newTitle = title;
      const newArticle = Article;
      const data = { topic: "自訂", title: newTitle, article: newArticle };

      postRead(data)
        .then(response => {
          // 处理成功响应的数据
          ReadArticleId = response.data.id;
          console.log(response.data.id);
        })
        .catch(error => {
          // 处理请求错误
          console.error(error);
        });


      setTitle(newTitle);
      setArticle(newArticle);
      setWordCount(newArticle.split(" ").length);
    }
    else {
      const newTitle = allTitle[a];
      const newArticle = allArticle[a];
      setTitle(newTitle);
      setArticle(newArticle);
      setWordCount(newArticle.split(" ").length);
    }
    setShowGenerator(false);
    setShowQuestions(true);
    setTitleReadOnly(true);
    setＡrticleReadOnly(true);

    // console.log(allArticle[a]);
    await fetchGPTData(allArticle[a]);
    // await fetchQuestion();
    //generateQuestions();
  }

  // onChange事件，更新狀態值Title value
  function handleTitleChange(event) {
    if (!titleReadOnly) {
      setTitle(event.target.value);
    }
  }

  // onChange事件，更新狀態值Article value
  function handleArticleChange(event) {
    if (!articleReadOnly) {
      setArticle(event.target.value);
    }

  }


  useEffect(() => {
    setWordCount(0);
    setShowQuestions(false);
    setShowGenerator(true);
    if (selectedOption === "自訂") {
      setTitleReadOnly(false);
      setＡrticleReadOnly(false);
      setTitle("請輸入自訂標題");
      setArticle("請輸入自訂文章");
    } else {
      setTitleReadOnly(true);
      setＡrticleReadOnly(true);
      setTitle("請點擊Generator以生成標題");
      setArticle("請點擊Generator以生成文章");
    }

  }, [selectedOption]);

  // 生成題目和選項
  async function generateQuestions() {
    setQuestion([]);
    for (let i = 1; i <= 5; i++) {
      // await fetchChoice(i);
      // console.log(choice);
      // console.log("-----------");
      setQuestion((prevState) => [...prevState,
      <div key={i} className="mb-4">
        {/* <p className="font-bold mb-2">Question {i}. {data.length > 0 ? data[i - 1].question : ""}</p> */}
        <p className="font-bold mb-2">{questionList[i - 1]}</p>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-indigo-600"
            name={`question${i}`}
            // value={choice.length > 0 ? choice[0].choice : ""}
            value="A"
            // checked={selectedValue === choiceAList[i-1]}
            onChange={(event) => handleOptionChange(event, i - 1)}
          />
          {/* <span className="ml-2">{choice.length > 0 ? choice[0].choice : ""}</span> */}
          <span className="ml-2">{choiceAList[i - 1]}</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio text-indigo-600"
            name={`question${i}`}
            // value={choice.length > 0 ? choice[1].choice : ""}
            value="B"
            // checked={target.value}
            // checked={selectedValue === choiceBList[i-1]}
            onChange={(event) => handleOptionChange(event, i - 1)}
          />
          {/* <span className="ml-2">{choice.length > 0 ? choice[1].choice : ""}</span> */}
          <span className="ml-2">{choiceBList[i - 1]}</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio text-indigo-600"
            name={`question${i}`}
            // value={choice.length > 0 ? choice[2].choice : ""}
            // checked={selectedValue === choiceCList[i-1]}
            onChange={(event) => handleOptionChange(event, i - 1)}
            value="C"
          />
          {/* <span className="ml-2">{choice.length > 0 ? choice[2].choice : ""}</span> */}
          <span className="ml-2">{choiceCList[i - 1]}</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio text-indigo-600"
            name={`question${i}`}
            // value={choice.length > 0 ? choice[3].choice : ""}
            value="D"
            // checked={selectedValue === choiceDList[i-1]}
            onChange={(event) => handleOptionChange(event, i - 1)}
          />
          {/* <span className="ml-2">{choice.length > 0 ? choice[3].choice : ""}</span> */}
          <span className="ml-2">{choiceDList[i - 1]}</span>
        </label>
      </div>
      ]);
      // questions.push(

      // );
    }
    // return questions;
  }

  return (
    <div className="container flex flex-row mx-auto">

      <div className="w-1/2 p-8">
        <select
          className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={title}
          readOnly={titleReadOnly}
          onChange={handleTitleChange}
        />

        <textarea
          className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          style={{ resize: "none" }}
          rows="30"
          value={Article}
          readOnly={articleReadOnly}
          onChange={handleArticleChange}
        ></textarea>
        {/* <ChatComponent /> */}
        <p className="text-gray-500 mt-4 text-sm">Word Count: {wordCount}</p>
        <div className={`col-span-12 ${showGenerator ? "" : "hidden"}`}>
          <button
            className="btn text-white btn-primary mt-4"
            onClick={ReadingGenerator}
          >
            Generate
          </button>
        </div>

        {/* <div className={`col-span-12 ${showGenerator ? "" : "hidden"}`}>
          <button
            className="btn text-white btn-primary mt-4"
            onClick={fetchGPTData}
          >
            Test
          </button>
        </div> */}

      </div>
      <div className={`md:w-1/3 mx-16 my-8 p-4 ${showQuestions ? "" : "hidden"}`}>
        <h2 className="text-2xl font-bold mb-4 ">Questions</h2>
        {questions}

        <div className="flex justify-end col-span-12">
          {canSubmit ? (
            <Link
              className="btn text-white btn-primary"
              onClick={createTest}
            >
              Submit
            </Link>
          ) : (
            <button className="btn text-white btn-primary" disabled>
              Submit
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default ReadPage;