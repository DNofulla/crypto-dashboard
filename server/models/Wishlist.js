const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Wishlist = new Schema({
  wishlistId: { type: String, unique: true, required: true },
  username: { type: String, unique: false, required: true },
  name: { type: String, unique: false, required: true },
  items: [
    new Schema({
      id: { type: String, unique: true, required: true },
      market_cap_rank: { type: String, unique: false, required: true },
      symbol: { type: String, unique: true, required: true },
      name: { type: String, unique: true, required: true },
      image: { type: String, unique: true, required: true },
      current_price: { type: String, unique: false, required: true },
      market_cap: { type: String, unique: false, required: true },
      total_volume: { type: String, unique: false, required: true },
      fully_diluted_valuation: { type: String, unique: false, required: true },
      total_supply: { type: String, unique: false, required: true },
      all_time_high: { type: String, unique: false, required: true },
      all_time_low: { type: String, unique: false, required: true },
      all_time_high_date: { type: String, unique: false, required: true },
      all_time_low_date: { type: String, unique: false, required: true },
    }),
  ],
  status: { type: Boolean, unique: false, required: true },
});

module.exports = mongoose.model("Wishlist", Wishlist);
