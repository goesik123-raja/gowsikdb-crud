const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    https://gowsikdb-crud.onrender.com,
    methods: ["PUT", "GET", "POST", "DELETE"]
}));

app.use(express.json());

const FoodModel = require("./models/food");

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.lsxuxwt.mongodb.net/?appName=Cluster0/food")
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


//  READ
app.get("/read", async (req, res) => {
    try {
        const food = await FoodModel.find();
        res.send(food);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});


// UPDATE
app.put("/update", async (req, res) => {
    const { id, newfoodname } = req.body;

    try {
        const updated = await FoodModel.findByIdAndUpdate(
            id,
            { foodname: newfoodname },
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


//  DELETE
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


//  SERVER
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
