const express = require("express");
const bodyparse = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 5000;
const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().min(2).max(3).required(),
});

app.use(express.json());
// app.use(bodyparse.urlencoded({extended:true}))

let users = [
  { name: "shlomy", age: 22, email: "shlomy123@gmail.com" },
  { name: "andrey", age: 20, email: "andrey123@gmail.com" },
  { name: "david", age: 25, email: "david123@gmail.com" },
  { name: "thomas", age: 24, email: "thomas123@gmail.com" },
  { name: "yuvi", age: 21, email: "yuvi123@gmail.com" },
  { name: "berale", age: 28, email: "beerale123@gmail.com" },
];

console.log(users);

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const nameParam = req.params.id;
  let userId = users.find((user, id) => {
    return user.name === nameParam;
  });
  res.json(userId);
});

app.put("/users/update", (req, res) => {
  const index = users.findIndex((user) => {
    return user.name === req.body.name;
  });
  users[index] = req.body;

  res.json({ message: "Form Submitted" });
});

app.delete("/users/delete", (req, res) => {
  const index = users.findIndex((user) => {
    return user.name === req.body.name;
  });
  users.splice(index, 1);
  res.json({ message: "Form Submitted" });
});

app.post("/users/create", (req, res) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.send(error.details);
  }
  res.json({ message: "Form Submitted" });
  users.push(req.body);
});

app.listen(PORT, () => {
  console.log("listening to port 5000.....");
});
