import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "hello" });
});

app.get("/api/universities", (req, res) => {
  res.status(200).send({ msg: "hello" });
});

app.post("/api/universities", (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

app.get("/api/universities/:id", (req, res) => {
  res.status(200).send({ msg: "hello" });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
