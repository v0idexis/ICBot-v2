const axios = require("axios");
var TinyURL = require("tinyurl");
const newsapi = process.env.NEWS_API;
const api = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${newsapi}`;
// const api = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a7eac679277542249131f57f759e5eed`;

const getnews = async () => {
  try {
    const res = await axios.get(api);
    const data = await res.data;

    const article1 = await res.data.articles[0];
    const img = await article1.urlToImage.error ? "https://www.ridetraffix.com/wp-content/uploads/2019/09/TopTen.jpg" : article1.urlToImage;

    let news = ``;

    for (let i = 0; i <= 9; i++) {
      var article = await res.data.articles[i];
      var a_title = await article.title;
      var t_url = await article.url;
      var a_url = await TinyURL.shorten(t_url);
      // console.log(a_url);
      if (i <= 9) {
        news += `${a_title}\nlink : ${a_url}\n\n`;
      } else {
        news += `${a_title}\nlink : ${a_url}`;
      }
    }

    // console.log(news);
    return [news, img];
  } catch (error) {
    console.error(error);
  }
};

// getnews();

module.exports = { getnews };
