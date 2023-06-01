import axios from "axios";

// export default axios.create({ baseURL: "http://localhost:5006/api/v1/school",});
export default axios.create({ baseURL: "http://localhost:8003/api",});

export const postRead = (data) => {
    return axios.post("http://localhost:8003/api/ReadArticle/create",data)
};

export const postReadArticleQuestion = (data) => {
    return axios.post("http://localhost:8003/api/ReadArticleQuestion/create",data)
};

export const postReadArticleChoice = (data) => {
    return axios.post("http://localhost:8003/api/ReadArticleChoice/create",data)
};

export const getReadArticleQuestion = (test_id) => {
    return axios.post("http://localhost:8003/api/ReadArtileQuestion/getByTestId",test_id)
};
