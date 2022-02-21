const { default: axios } = require("axios");
const { Router, response } = require("express");
const router = Router();
const Axios = require("axios").default;
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");
const { v4: uuidv4 } = require("uuid");

router.get("/public/user", async (req, res) => {
  const publicWishlists = await Wishlist.find({
    status: true,
    username: user.username.toLowerCase(),
  });
  return res.status(200).json({ publicWishlists: publicWishlists });
});

router.get("/private/user", async (req, res) => {
  const privateWishlists = await Wishlist.find({
    status: false,
    username: user.username.toLowerCase(),
  });
  return res.status(200).json({ privateWishlists: privateWishlists });
});

router.get("/all/user/:username", async (req, res) => {
  const username = req.params.username;

  const wishlists = await Wishlist.find({
    username,
  });

  return res.status(200).json({ wishlists });
});

router.get("/public/global", async (req, res) => {
  const globalWishlists = await Wishlist.find({
    private: true,
  });
  return res.status(200).json({ globalWishlists });
});

router.post("/new", async (req, res) => {
  const newWishlist = await Wishlist.create({
    wishlistId: uuidv4(),
    username: req.body.username,
    name: req.body.name,
    items: [],
    status: false,
  });

  await newWishlist.save();

  return res.status(200).json(newWishlist);
});

router.post("/delete/:wishlistId", async (req, res) => {
  const wishlistId = req.params.wishlistId;

  const wishlistExists = Wishlist.exists({ wishlistId });

  if (!wishlistExists) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }

  await Wishlist.deleteOne({ wishlistId });

  return res
    .status(200)
    .json({ message: "Wishlist was successfully deleted!" });
});

router.post("/add/:username/:id", async (req, res) => {
  const username = req.params.username;
  const id = req.params.id;

  const response = await Axios.request("/id/" + id);

  const updatedWishlist = await Wishlist.updateOne(
    {
      username,
    },
    {
      $push: {
        items: {
          id: response.data.id,
          market_cap_rank: response.data.market_cap_rank,
          symbol: response.data.symbol,
          name: response.data.name,
          image: response.data.image.large,
          current_price: response.data.current_price,
          market_cap: response.data.market_cap,
          total_volume: response.data.total_volume,
          fully_diluted_valuation: response.data.fully_diluted_valuation,
          total_supply: response.data.total_supply,
          all_time_high: response.data.all_time_high,
          all_time_low: response.data.all_time_low,
          all_time_high_date: response.data.all_time_high_date,
          all_time_low_date: response.data.all_time_low_date,
        },
      },
    },
  );

  return res.status(200).json({ ...updatedWishlist });
});

router.post("/remove/:username/:id", async (req, res) => {
  const username = req.params.username;
  const id = req.params.id;

  const updatedWishlist = await Wishlist.updateOne(
    {
      username,
    },
    {
      $pull: {
        items: {
          id,
          //   market_cap_rank: response.data.market_cap_rank,
          //   symbol: response.data.symbol,
          //   name: response.data.name,
          //   image: response.data.image.large,
          //   current_price: response.data.current_price,
          //   market_cap: response.data.market_cap,
          //   total_volume: response.data.total_volume,
          //   fully_diluted_valuation: response.data.fully_diluted_valuation,
          //   total_supply: response.data.total_supply,
          //   all_time_high: response.data.all_time_high,
          //   all_time_low: response.data.all_time_low,
          //   all_time_high_date: response.data.all_time_high_date,
          //   all_time_low_date: response.data.all_time_low_date,
        },
      },
    },
  );

  return res.status(200).json({ ...updatedWishlist });
});

module.exports = router;