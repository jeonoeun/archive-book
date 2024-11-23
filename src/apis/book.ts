import axios from "axios";

export const searchBooks = async (query: string) => {
  try {
    const res = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
      headers: {
        Authorization: "KakaoAK 31f8e70d3ceba48d8391d158aa45fa70",
      },
      params: { query },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
