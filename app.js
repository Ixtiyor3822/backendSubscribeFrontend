const express = require("express");
const app = express();
const cors = require("cors");
const start = require("./helper/db");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Youtube subscribe uchun backed qismi.",
      version: "1.0.0",
      description:
        "Bu backend loyiha youtube dagi kanallarning jamlanmasi hisoblanadi.",
      license: {
        name: "ISC",
      },
      contact: {
        name: "Ixtiyor Sadullayev",
        url: "https://github.com/Ixtiyor3822",
        email: "jonquin9999@gmail.com",
      },
      servers: {
        url: "http://localhostL:5000",
      },
    },
  },
  apis: ["./router/kanal.js"],
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

start();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Orign", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, PATCH,DELETE , POST,  GET"
    );
    return res.status(200).json({});
  }
  next();
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.get("/", (req, res) => {
  res.status(200).send("Subscriber backend ga hush kelibsiz");
});

app.use("/", require("./router/kanal"));

app.use((req, res, next) => {
  const error = new Error(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: "Bunday so`rov yo`q." });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`sizning portingiz `, 5000);
});
