const express = require("express");
const scraperRouter = require("./routes/scraperRouter");

const app = express();
const port = 3000;

app.use("/", scraperRouter);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
