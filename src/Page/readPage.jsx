import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ReadingScore from "./readingScore";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Context } from "../Contexts/Context";

const options = ["自訂","Topic 1", "Topic 2", "Topic 3"]; // 下拉式選單的選項
const allTitle = ["","Topic 1's Article Title.","Topic 2's Article Title.","Topic 3's Article Title."]
const allArticle = ["","In 2009, the Taiwu Elementary School Folk Singers were invited to perform in Belgium, France, Germany, and Luxemburg. In 2011, they were voted as one of the world’s top five performance groups by audiences of Japan Broadcasting Corporation’s Amazing Voice program. Recalling the group’s first tour in Europe, Camake Valaule, a physical education teacher and the founder of the Taiwu Elementary School Folk Singers, admitted that he felt very nervous. He was worried that the audience would fall asleep since most of the 75-minute performance was a cappella, that is, singing without instrumental sound. Surprisingly, the audience listened with full focus and high spirits. Camake said, “They told me afterward that through our performance, they had a vision of our country, our village, without having to visit it. This experience greatly boosted our confidence.” According to Camake Valaule, singing traditional ballads has helped students and their parents to re-understand their culture. “It used to be that the only ones who could sing these songs were tribal elders aged between 50 and 60. Now with the children performing the pieces, parents are beginning to ask, ‘Why do we not know how to sing these ballads?’ Many times nowadays, it is the children who teach the songs to their parents, putting back the pieces of a blurred memory.” Winning international fame, however, was neither the original intention nor the main reason why Camake founded the group in 2006. The most important thing was to make children understand why they sing these songs and to preserve and pass on their culture. Referring to the relocation of Taiwu Elementary School and Taiwu Village following Typhoon Morakot in August 2009, Camake said, “We could not take the forest or our houses in the mountains with us; but we were able to bring our culture along. As long as the children are willing to sing, I will always be there for them, singing with them and leading them to experience the meaning of the ballads.”","Topic 2's Article Content.","Topic 3's Article Content."]

function ReadPage() {
  // const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(options[0]); // 當前選擇的Topic
  // const [defaultTitle, setdefaultTitle] = useState("請輸入自訂標題"); // 文章標題
  // const [defaultArticle, setdefaultArticle] = useState("請輸入自訂文章"); // 文章內容
  const [title, setTitle] = useState("請輸入自訂標題"); // 文章標題
  // const [article, setArticle] = useState("請輸入自訂文章"); // 文章內容
  const [wordCount, setWordCount] = useState(0); // 文章總字數
  const [titleReadOnly, setTitleReadOnly] = useState(false);// 標題唯讀判斷
  const [articleReadOnly, setＡrticleReadOnly] = useState(false);// 標題唯讀判斷
  
  const [showQuestions, setShowQuestions] = useState(false);

  const {Article, setArticle} =  useContext(Context);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   navigate({
  //     pathname: '/readingScore',
  //     state: { article: article }
  //   });
  // };

  // 模擬文章生成，每次選擇改變時重新生成文章
  function ReadingGenerator(){
    const a = options.indexOf(selectedOption)
    if(a===0){
      const newTitle = title;
      const newArticle = Article;
      setTitle(newTitle);
      setArticle(newArticle);
      setWordCount(newArticle.split(" ").length);
    }
    else{
      const newTitle = allTitle[a];
      const newArticle = allArticle[a];
      setTitle(newTitle);
      setArticle(newArticle);
      setWordCount(newArticle.split(" ").length);
    }
    setShowQuestions(true);
  }

  // onChange事件，更新狀態值Title value
  function handleTitleChange(event) {
    if(!titleReadOnly){
      setTitle(event.target.value);
    }
  }

  // onChange事件，更新狀態值Article value
  function handleArticleChange(event) {
    if(!articleReadOnly){
      setArticle(event.target.value);
    }
  }


  useEffect(() => {
    setWordCount(0);
    setShowQuestions(false);
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
          <label className="inline-flex items-center">
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
          <label className="inline-flex items-center ml-6">
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
          rereadOnly={titleReadOnly}
          onChange={handleTitleChange}
        />
        
        <textarea
          className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 mt-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          style={{resize: "none"}}
          rows="30"
          value={Article}
          rereadOnly={articleReadOnly}
          onChange={handleArticleChange}
        ></textarea>
        <p className="text-gray-500 mt-4 text-sm">Word Count: {wordCount}</p>
        <div className="col-span-12">
        <button
          className="btn text-white btn-primary mt-4"
          onClick={ReadingGenerator}
        >
          Generate
        </button>
        </div>

      </div>
      <div className={`md:w-1/3 mx-16 my-8 p-4 ${showQuestions ? "" : "hidden"}`}>
        <h2 className="text-2xl font-bold mb-4 ">Questions</h2>
        {generateQuestions()}
        
        <div className="flex justify-end col-span-12">
            <Link
              to="/readingScore"
              className=" btn  text-white btn-primary"
            >
              Submit
            </Link>

          </div>
      </div>
    </div>
  );
}

export default ReadPage;