import express from "express"
import * as dotenv from "dotenv"
import connect from "./config/db.config.js"
import userRoute from "./routes/user.routes.js"
import scheduleRoute from "./routes/schedule.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

connect()
app.use("/user", userRoute)
app.use("/schedule", scheduleRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server up and running on port http://localhost:${process.env.PORT} `)
})