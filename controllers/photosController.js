const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fetchData = async (req, res) => {
  const { url } = req.url;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Pexels/JavaScript",
        Authorization: process.env.API_KEY,
      },
    });
    const { photos } = await response.json();
    if (photos) {
      if (photos.length > 0) {
        const neededData = photos.map((item) => {
          const {
            alt,
            url,
            src: { large },
            avg_color,
          } = item;
          return { alt, url, avg_color, src: large };
        });
        return res
          .status(200)
          .json({ data: neededData, count: neededData.length });
      }
      return res.status(404).json({ message: "No photos found for the query" });
    }
    res.status(404).json({ message: "Please try again later ..." });
  } catch (error) {
    console.log(error);
  }
};

const photos = async (req, res, next) => {
  const { page } = req.query;
  const url = `https://api.pexels.com/v1/curated?page=${page}&per_page=40`;
  req.url = { url };
  next();
};

const search = async (req, res, next) => {
  const { page, value } = req.query;
  const url = `https://api.pexels.com/v1/search?query=${value}&per_page=30&page=${page}`;
  req.url = { url };
  next();
};

module.exports = { photos, search, fetchData };
