const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    foodname: {type: String,required: true},description: {type: String,required: true}
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;