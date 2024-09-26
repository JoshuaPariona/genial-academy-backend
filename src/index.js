const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Botones de Redirección</title>
      </head>
      <body>
        <h1>¿Quieres continuar?</h1>
        <button onclick="location.href='/yes'">Sí</button>
        <button onclick="location.href='/no'">No</button>
      </body>
    </html>
  `);
});

app.get("/yes", (req, res) => {
  res.send("Has seleccionado Sí");
});

app.get("/no", (req, res) => {
  res.send("Has seleccionado No");
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
