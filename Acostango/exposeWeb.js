import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const app = express();



app.use(express.static("dist"));

app.get("*", function (req, res) {
  res.sendFile("index.html", {
    root: join(__dirname, "/dist"),
  });
});

//Escuchar puerto 9000
app.listen(9000);