const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ CORS FIX
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://gowsikdb-crud.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// ✅ MODEL IMPORT
const FoodModel = require("./models/food");

// ✅ MongoDB CONNECT (correct DB name)
mongoose.connect("mongodb+srv://admin:admin@cluster0.lsxuxwt.mongodb.net/food?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// 🔹 INSERT
app.post("/insert", async (req, res) => {
    const { foodname, description } = req.body;

    try {
        const food = new FoodModel({
            foodname,
            description
        });

        const result = await food.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error inserting data");
    }
});


// 🔹 READ
app.get("/read", async (req, res) => {
    try {
        const food = await FoodModel.find();
        console.log("DATA:", food); // ✅ DEBUG
        res.send(food);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});


// 🔹 UPDATE
app.put("/update", async (req, res) => {
    const { id, newfoodName } = req.body;

    try {
        const updated = await FoodModel.findByIdAndUpdate(
            id,
            { foodname: newfoodName },
            { new: true }
        );

        if (!updated) {
            return res.status(404).send("Food not found");
        }

        res.send("Updated successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Update error");
    }
});


// 🔹 DELETE
app.delete("/delete/:id", async (req, res) => {
    try {
        const deleted = await FoodModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).send("Food not found");
        }

        res.send("Deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Delete error");
    }
});


// 🔹 SERVER
app.listen(3001, () => {
    console.log("Server running on port 3001");
});