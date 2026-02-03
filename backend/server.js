const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./models/Expense");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
    .then(() => console.log("MongoDB Connected"));

app.post("/expenses", async (req, res) => {
    const expense = new Expense(req.body);
    await expense.save();
    res.json(expense);
});

app.get("/expenses", async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

app.delete("/expenses/:id", async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
