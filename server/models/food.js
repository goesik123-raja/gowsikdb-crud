const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    foodname: String,
    description: String
});

// EXACT COLLECTION NAME
module.exports = mongoose.model("Food", FoodSchema, "foods");