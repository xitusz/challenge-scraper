const axios = require("axios");
const cheerio = require("cheerio");

const baseUrl =
  "https://webscraper.io/test-sites/e-commerce/static/computers/laptops";

const fetchPage = async (url) => {
  try {
    const response = await axios.get(url);

    return cheerio.load(response.data);
  } catch (err) {
    console.error(`Erro ao buscar a página ${url}:`, err);
    return null;
  }
};

const getTotalPages = async () => {
  try {
    const $ = await fetchPage(baseUrl);
    const totalPages = parseInt($(".pagination li").last().prev().text());

    return totalPages;
  } catch (err) {
    console.error(`Erro ao buscar o total de páginas:`, err);
    return 1;
  }
};

const sortedLaptops = (laptops) => {
  try {
    return laptops.sort((a, b) => a.price - b.price);
  } catch (err) {
    console.error(`Erro ao ordenar os laptops:`, err);
    return laptops;
  }
};

const getLaptopsFromPage = ($, searchTerm) => {
  try {
    let laptops = [];

    $(".card").each((_i, elem) => {
      const title = $(elem).find(".title").text();

      if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
        const price = parseFloat(
          $(elem).find(".price").text().replace("$", "")
        );
        const description = $(elem).find(".description").text();
        const rating = $(elem)
          .find(".ratings p[data-rating]")
          .attr("data-rating");
        const reviews = $(elem).find(".review-count").text();

        laptops.push({ title, price, description, rating, reviews });
      }
    });

    return laptops;
  } catch (err) {
    console.error(`Erro ao buscar os laptops da página:`, err);
    return [];
  }
};

const getLaptops = async (searchTerm) => {
  try {
    const totalPages = await getTotalPages();
    let laptops = [];

    for (let page = 1; page <= totalPages; page++) {
      const $ = await fetchPage(`${baseUrl}?page=${page}`);

      if (!$) return [];

      laptops.push(...getLaptopsFromPage($, searchTerm));
    }

    return sortedLaptops(laptops);
  } catch (err) {
    console.error(`Erro ao buscar os laptops:`, err);
    return [];
  }
};

module.exports = { getLaptops, getTotalPages };
