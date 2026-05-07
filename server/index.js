const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();


app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://gowsikdb-crud.vercel.app/crud"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());


const FoodModel = require("./models/food");


mongoose.connect("mongodb+srv://admin:admin@cluster0.lsxuxwt.mongodb.net/food?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error:", err));



app.post("/insert", async (req, res) => {
    const { foodname, description } = req.body;

    try {
        const food = new FoodModel({ foodname, description });
        const result = await food.save();

        res.status(200).json(result); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error inserting data" });
    }
});


//  READ
app.get("/read", async (req, res) => {
    try {
        const food = await FoodModel.find();

        console.log("DATA:", food); 
        res.status(200).json(food); 
    } catch (err) {
        res.status(500).json({ error: "Error fetching data" });
    }
});


//  UPDATE
app.put("/update", async (req, res) => {
    const { id, newfoodName } = req.body;

    try {
        const updated = await FoodModel.findByIdAndUpdate(
            id,
            { foodname: newfoodName },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Food not found" });
        }

        res.status(200).json(updated); // 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Update error" });
    }
});


//  DELETE
app.delete("/delete/:id", async (req, res) => {
    try {
        const deleted = await FoodModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Food not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete error" });
    }
});


//  SERVER
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});