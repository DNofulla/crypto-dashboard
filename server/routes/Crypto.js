const { default: axios } = require("axios");
const { Router, response } = require("express");
const router = Router();
const Axios = require("axios").default;

router.get("/id/:coin_name", async (req, res) => {
  try {
    let coin = req.params.coin_name;
    const response = await Axios.request({
      method: "GET",
      url: `https://coingecko.p.rapidapi.com/coins/${coin}`,
      headers: {
        "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
        "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      },
    });

    return res.status(200).json({
      id: response.data.id,
      symbol: response.data.symbol,
      name: response.data.name,
      hashing_algorithm: response.data.hashing_algorithm,
      image: {
        thumbnail: response.data.image.thumb,
        small: response.data.image.small,
        large: response.data.image.large,
      },
      current_price: response.data.market_data.current_price.usd,
      all_time_high: response.data.market_data.ath.usd,
      all_time_high_change_percent:
        response.data.market_data.ath_change_percentage.usd,
      all_time_high_date: response.data.market_data.ath_date.usd,

      all_time_low: response.data.market_data.atl.usd,
      all_time_low_change_percent:
        response.data.market_data.atl_change_percentage.usd,
      all_time_low_date: response.data.market_data.atl_date.usd,

      market_cap: response.data.market_data.market_cap.usd,
      market_cap_rank: response.data.market_data.market_cap_rank,
      fully_diluted_valuation:
        response.data.market_data.fully_diluted_valuation.usd,
      total_volume: response.data.market_data.total_volume.usd,

      high_24h: response.data.market_data.high_24h.usd,
      low_24h: response.data.market_data.low_24h.usd,
      price_change_24h:
        response.data.market_data.price_change_24h_in_currency.usd,
      total_supply: response.data.market_data.total_supply,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }
});

router.get("/list/top50", async (req, res) => {
  try {
    const response = await Axios.request({
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/markets",
      params: { vs_currency: "usd", page: "1", per_page: "50" },
      headers: {
        "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
        "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }
});

router.get("/list/top100", async (req, res) => {
  try {
    const response = await Axios.request({
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/markets",
      params: { vs_currency: "usd", page: "1", per_page: "100" },
      headers: {
        "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
        "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }
});

router.get("/list/top250", async (req, res) => {
  try {
    const response = await Axios.request({
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/markets",
      params: { vs_currency: "usd", page: "1", per_page: "250" },
      headers: {
        "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
        "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }
});

router.get("/list/top1000", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://coingecko.p.rapidapi.com/coins/markets",
    params: { vs_currency: "usd", page: "1", per_page: "250" },
    headers: {
      "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
      "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
    },
  };

  try {
    const response1 = await Axios.request({
      ...options,
      params: { ...options.params, page: "1" },
    });

    const response2 = await Axios.request({
      ...options,
      params: { ...options.params, page: "2" },
    });

    const response3 = await Axios.request({
      ...options,
      params: { ...options.params, page: "3" },
    });

    const response4 = await Axios.request({
      ...options,
      params: { ...options.params, page: "4" },
    });

    const coins = [
      ...response1.data,
      ...response2.data,
      ...response3.data,
      ...response4.data,
    ].sort((coin1, coin2) => coin1.market_cap_rank - coin2.market_cap_rank);

    return res.status(200).json({
      coins,
    });
  } catch (error) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }
});

router.get("/graph/:coin_name", async (req, res) => {
  let duration = "30";
  const coin = req.params.coin_name;

  if (req.body.time) {
    duration = req.body.time;
  }

  const options = {
    method: "GET",
    url: `https://coingecko.p.rapidapi.com/coins/${coin}/market_chart`,
    params: { vs_currency: "usd", days: duration },
    headers: {
      "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
      "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
    },
  };

  try {
    const response = await Axios.request(options);

    return res.status(200).json({ prices: response.data.prices });
  } catch (error) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }
});

module.exports = router;
