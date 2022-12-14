// Express API with database connection and data persistence

const express = require("express");
const User = require("./config");
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const querySnapshot = await User.get();
  const list = querySnapshot.docs.map((doc) => doc.data());
  res.send(list);
});

app.post("/newUser", async (req, res) => {
  const data = req.body;
  await User.add(data);
  res.send({ msg: "User added" });
});

app.listen(3000, () => console.log("App running on port 3000"));
