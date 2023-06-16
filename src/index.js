import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const {Configuration, OpenAIApi} = require("openai");

// const config = new Configuration({
//     apiKey: "17f82d1fc6fe4d0ba2a768d8836c3e89",
// })

// const openai = new OpenAIApi(config);

// //setup Server
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// //endpoint for ChatGPT
// app.post("/chat",async(req, res) => {
//     const { prompt } = req.body;

//     const completion = await openai.createCompletion({
//         model: "text-davinci-003",
//         max_tokens:512,
//         temperature:0,
//         prompt:prompt,
//     })

//     res.send(completion.data.choices[0].text);
// });

