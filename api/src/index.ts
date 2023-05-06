import express, { Express, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import swaggerDocument from "./swagger_output.json";
import sequelizeConnection from "./config/connection";
import errorMiddleware from './middleware/error.middleware';
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', Router);
app.use(errorMiddleware);
app.use(urlencoded)

sequelizeConnection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
